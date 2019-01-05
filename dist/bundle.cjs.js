'use strict';

const staticTemplate = document.createElement('template');

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
            text-align: left;
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

class FeaturedDropdown extends HTMLElement {
    constructor() {
        super();

        this.rootNode = this.attachShadow({ mode: 'open' });
        this.rootNode.appendChild(staticTemplate.content.cloneNode(true));

        this.selectedOptionNode = this.rootNode.querySelector('.selected-option');
        this.optionsNode = this.rootNode.querySelector('.options');
        this.expandedClassName = 'options--expanded';

        this._options = this._options || [];
        this._chosenOption = this._chosenOption || { label: '(no options)', value: null };

        this.onExpandClick = this.onExpandClick.bind(this);
        this.onOutsideClick = this.onOutsideClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    set options(options) {
        this._options = options;
        this.renderOptions();
    }

    set chosenOption(option) {
        this._chosenOption = option;
        this.renderSelectedOption();
    }

    connectedCallback() {
        this.selectedOptionNode.addEventListener('click', this.onExpandClick);
        document.addEventListener('click', this.onOutsideClick);

        this.renderOptions();
        this.renderSelectedOption();
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.onOutsideClick);
        this.selectedOptionNode.removeEventListener('click', this.onExpandClick);
    }

    onExpandClick() {
        if (this._options && this._options.length) {
            this.optionsNode.classList.add(this.expandedClassName);
        }
    }

    collapse() {
        this.optionsNode.classList.remove(this.expandedClassName);
    }

    onOutsideClick(event) {
        if (event.target !== this && !event.target.slot) {
            this.collapse();
        }
    }

    onChangeHandler(event) {
        const selectedOption = JSON.parse(event.target.getAttribute('value'));
        this._chosenOption = selectedOption;

        this.collapse();
        this.renderOptions();
        this.renderSelectedOption();
        this.dispatchEvent(
            new CustomEvent('featuredDropdownValueChanged', { detail: selectedOption })
        );
    }

    renderSelectedOption() {
        this.rootNode.querySelector(
            '.selected-option__label'
        ).innerHTML = this._chosenOption.label;
    }

    renderOptions() {
        const optionsHTML = this._options
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

        this.optionsNode.innerHTML = optionsHTML;
        this.rootNode.querySelectorAll('option').forEach(option => {
            option.onclick = this.onChangeHandler;
        });
    }
}

customElements.define('featured-dropdown', FeaturedDropdown);
