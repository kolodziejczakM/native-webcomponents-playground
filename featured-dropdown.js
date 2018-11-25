const staticTemplate = document.createElement('template');
window.ShadyCSS && ShadyCSS.prepareTemplate(staticTemplate, 'featured-dropdown');

staticTemplate.innerHTML = `
    <style>
        :host,
        :host * {
            box-sizing: border-box;
        }

        :host {
            --light-gray: #d3d3d3;
            --gray: #a9a9a9;
            --black: #000;
            --white: #fff;
            --icon-dimension: 25px;

            font-family: 'sans-serif, Helvetica';
            font-size: 14px;
            cursor: pointer;
            color: var(--black);
        }

        .dropdown {
            position: relative;
            border: 1px solid var(--gray);
            border-radius: 5px;
        }

        .selected-option {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 10px;
        }

        .options {
            display: none;
        }

        .options--expanded {
            position: absolute;
            border: 1px solid var(--gray);
            width: 100%;
            display: block;
            padding: 0;
            margin: 0;
        }

        .option {
            padding: 10px;
            background: var(--white);
        }

        .option:hover {
            background: var(--light-gray);
        }

        ::slotted(*) {
            width: var(--icon-dimension);
            height: var(--icon-dimension);
        }
    </style>

    <div class="dropdown">
        <div class="selected-option">
            <span class="selected-option__label"><!-- dynamic render--></span>
            <slot name="dropdown-arrow">Your icon here</slot>
        </div>
        <ul class="options">
            <!-- dynamic render -->
        </ul>
    </div>
`;

// Custom elements have four special instance methods which will run at different times:

// 1. connectedCallback ~~ componentDidMount / componentDidUpdate,

// 2. attributeChangedCallback == componentWillReceiveProps / getDerivedStateFromProps,

// 3. disconnectedCallback == componentWillUnmount,

// 4. adoptedCallback - when adoptNode is called, after disconnectedCallback and before connectedCallback
// will run when it disconnects from its original document, then the adoptedCallback, and finally the connectedCallback when it connects to your document.

// All defined as null by default.

class FeaturedDropdown extends HTMLElement {
    // Attributes that you want to observe - any change in them will fire attributeChangedCallback
    static get observedAttributes() {
        return ['chosen-option'];
    }

    constructor() {
        super();

        // shadowDOM support for older browsers
        // open means that ou can access the shadow DOM using JavaScript written in the main page context,
        // for example using the Element.shadowRoot property
        // node.cloneNode is another way for deep cloning
        window.ShadyCSS && ShadyCSS.styleElement(this);
        this.rootNode = this.attachShadow({ mode: 'open' });
        this.rootNode.appendChild(staticTemplate.content.cloneNode(true));

        // Set default values of properties.
        this.options = [];
        this.chosenOption = { label: '(no options)', value: null };
        this.isExpanded = false;

        // binding assigned methods (like in React)
        this.onExpandClick = this.onExpandClick.bind(this);
        this.onOutsideClick = this.onOutsideClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    connectedCallback() {
        // initialize properties that depend on light DOM
        this.setOptions(this.getOptions());
        this.setChosenOption(this.getChosenOption());

        // attaching needed event listeners
        this.rootNode.querySelector('.selected-option').onclick = this.onExpandClick;
        document.addEventListener('click', this.onOutsideClick);

        // render dynamic content (list && selected option)
        this.renderOptions();
        this.renderSelectedOption();
    }

    attributeChangedCallback() {
        this.renderOptions();
        this.renderSelectedOption();
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.onOutsideClick);
    }

    getOptions() {
        return JSON.parse(this.getAttribute('options')) || this.options;
    }

    setOptions(value) {
        this.setAttribute('options', JSON.stringify(value));
    }

    getChosenOption() {
        return JSON.parse(this.getAttribute('chosen-option')) || this.chosenOption;
    }

    setChosenOption(value) {
        const valueStringified = typeof value === 'string' ? value : JSON.stringify(value);

        this.setAttribute('chosen-option', valueStringified);
    }

    onExpandClick() {
        if (this.getOptions().length) {
            this.isExpanded = true;
            this.rootNode.querySelector('.options').classList.add('options--expanded');
        }
    }

    collapse() {
        this.isExpanded = false;
        this.rootNode.querySelector('.options').classList.remove('options--expanded');
    }

    onOutsideClick(event) {
        if (event.target !== this && !event.target.slot) {
            this.collapse();
        }
    }

    onChangeHandler(event) {
        const selectedOption = event.target.getAttribute('value');
        this.setChosenOption(selectedOption);
        this.collapse();

        // 'reactish' method with callback - not preferred here; you have to know scope (window in that case)
        window[this.getAttribute('on-change-handler')](selectedOption);

        // event appraoch; preferred
        this.dispatchEvent(new CustomEvent('dropdownValueChanged', { detail: selectedOption }));
    }

    renderSelectedOption() {
        this.rootNode.querySelector('.selected-option__label').innerHTML =
        this.getChosenOption().label;
    }

    renderOptions() {
        const optionsHTML = this.getOptions()
            .map(
                option => `
            <option
                class="option"
                value='${JSON.stringify(option)}'
            >
                ${option.label}
            </option>`
            )
            .join(' ');

        this.rootNode.querySelector('.options').innerHTML = optionsHTML;
        this.rootNode.querySelectorAll('option').forEach(option => {
            option.onclick = this.onChangeHandler;
        });
    }
}

// register new tag and associate it with the class
customElements.define('featured-dropdown', FeaturedDropdown);
