module.exports=function(n){var e={};function t(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return n[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=n,t.c=e,t.d=function(n,e,o){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:o})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)t.d(o,r,function(e){return n[e]}.bind(null,r));return o},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(n,e,t){n.exports=t(1)},function(n,e,t){"use strict";function o(n){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function r(n,e){for(var t=0;t<e.length;t++){var o=e[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function i(n){if(void 0===n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function c(n){var e="function"==typeof Map?new Map:void 0;return(c=function(n){if(null===n||(t=n,-1===Function.toString.call(t).indexOf("[native code]")))return n;var t;if("function"!=typeof n)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(n))return e.get(n);e.set(n,o)}function o(){return a(n,arguments,s(this).constructor)}return o.prototype=Object.create(n.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),l(o,n)})(n)}function a(n,e,t){return(a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}()?Reflect.construct:function(n,e,t){var o=[null];o.push.apply(o,e);var r=new(Function.bind.apply(n,o));return t&&l(r,t.prototype),r}).apply(null,arguments)}function l(n,e){return(l=Object.setPrototypeOf||function(n,e){return n.__proto__=e,n})(n,e)}function s(n){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)})(n)}t.r(e);var u=document.createElement("template");window.ShadyCSS&&ShadyCSS.prepareTemplate(u,"featured-dropdown"),u.innerHTML='\n    <style>\n        :host,\n        :host * {\n            box-sizing: border-box;\n        }\n\n        :host {\n            --light-gray: #d3d3d3;\n            --gray: #a9a9a9;\n            --black: #000;\n            --white: #fff;\n            --icon-dimension: 25px;\n\n            font-family: \'sans-serif, Helvetica\';\n            font-size: 14px;\n            cursor: pointer;\n            color: var(--black);\n        }\n\n        .dropdown {\n            position: relative;\n            border: 1px solid var(--gray);\n            border-radius: 5px;\n        }\n\n        .selected-option {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            padding: 5px 10px;\n        }\n\n        .options {\n            display: none;\n        }\n\n        .options--expanded {\n            position: absolute;\n            border: 1px solid var(--gray);\n            width: 100%;\n            display: block;\n            padding: 0;\n            margin: 0;\n        }\n\n        .option {\n            padding: 10px;\n            background: var(--white);\n        }\n\n        .option:hover {\n            background: var(--light-gray);\n        }\n\n        ::slotted(*) {\n            width: var(--icon-dimension);\n            height: var(--icon-dimension);\n        }\n    </style>\n\n    <div class="dropdown">\n        <div class="selected-option">\n            <span class="selected-option__label">\x3c!-- dynamic render--\x3e</span>\n            <slot name="dropdown-arrow">Your icon here</slot>\n        </div>\n        <ul class="options">\n            \x3c!-- dynamic render --\x3e\n        </ul>\n    </div>\n';var d=function(n){function e(){var n,t,r;return function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),t=this,n=!(r=s(e).call(this))||"object"!==o(r)&&"function"!=typeof r?i(t):r,window.ShadyCSS&&ShadyCSS.styleElement(i(i(n))),n.rootNode=n.attachShadow({mode:"open"}),n.rootNode.appendChild(u.content.cloneNode(!0)),n.options=n.options||[],n.chosenOption=n.chosenOption||{label:"(no options)",value:null},n.isExpanded=n.isExpanded||!1,n.onExpandClick=n.onExpandClick.bind(i(i(n))),n.onOutsideClick=n.onOutsideClick.bind(i(i(n))),n.onChangeHandler=n.onChangeHandler.bind(i(i(n))),n}var t,a,d;return function(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),e&&l(n,e)}(e,c(HTMLElement)),t=e,(a=[{key:"connectedCallback",value:function(){this.rootNode.querySelector(".selected-option").addEventListener("click",this.onExpandClick),document.addEventListener("click",this.onOutsideClick),this.renderOptions(),this.renderSelectedOption()}},{key:"disconnectedCallback",value:function(){document.removeEventListener("click",this.onOutsideClick),this.rootNode.querySelector(".selected-option").removeEventListener("click",this.onExpandClick)}},{key:"onExpandClick",value:function(){this.options.length&&(this.isExpanded=!0,this.rootNode.querySelector(".options").classList.add("options--expanded"))}},{key:"collapse",value:function(){this.isExpanded=!1,this.rootNode.querySelector(".options").classList.remove("options--expanded")}},{key:"onOutsideClick",value:function(n){n.target===this||n.target.slot||this.collapse()}},{key:"onChangeHandler",value:function(n){var e=JSON.parse(n.target.getAttribute("value"));this.chosenOption=e,this.collapse(),this.renderOptions(),this.renderSelectedOption(),this.onChangeHandlerCallback(e),this.dispatchEvent(new CustomEvent("dropdownValueChanged",{detail:e}))}},{key:"renderSelectedOption",value:function(){this.rootNode.querySelector(".selected-option__label").innerHTML=this.chosenOption.label}},{key:"renderOptions",value:function(){var n=this,e=this.options.map(function(n){return'\n            <option\n                class="option"\n                value=\''.concat(JSON.stringify(n),"'\n            >\n                ").concat(n.label,"\n            </option>")}).join(" ");this.rootNode.querySelector(".options").innerHTML=e,this.rootNode.querySelectorAll("option").forEach(function(e){e.onclick=n.onChangeHandler})}},{key:"isExpanded",get:function(){return this.hasAttribute("is-expanded")},set:function(n){var e=Boolean(n);this.setAttribute("is-expanded",e)}}])&&r(t.prototype,a),d&&r(t,d),e}();customElements.define("featured-dropdown",d)}]);