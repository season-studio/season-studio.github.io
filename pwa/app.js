(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('regenerator-runtime'), require('jszip')) :
    typeof define === 'function' && define.amd ? define(['regenerator-runtime', 'jszip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.regeneratorRuntime, global.JSZip));
})(this, (function (require$$0, JSZip) { 'use strict';

    var __STAMP__ = "461017264446495257";
    var __VERSION__ = "1.0.0";

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
    var JSZip__default = /*#__PURE__*/_interopDefaultLegacy(JSZip);

    const $private$1 = Symbol("season-tip-private");
    const $resolve = Symbol("season-tip-resolve");
    const $options = Symbol("season-tip-options");
    const $timerId = Symbol("season-tip-timerid");
    const $result$1 = Symbol("season-tip-result");

    const FlexAlignMap = {
        "center": "center",
        "left": "flex-start",
        "right": "flex-end",
        "top": "flex-start",
        "bottom": "flex-end",
        "start": "flex-start",
        "end": "flex-end"
    };

    /**
     * get the top zindex in the current view
     */
    function getTopZIndex() {
        return [...document.body.querySelectorAll("*")].reduce((r, e) => 
                    Math.max(r, Number(window.getComputedStyle(e).zIndex) || 0), 
                0) + 1;
    }

    /**
     * set an element to the top z-index
     * @param {*} _element 
     */
    function setTopZIndex(_element) {
        let topZ = getTopZIndex();
        if ((Number(_element.style.zIndex) !== (topZ - 1)) || (topZ === 1)) {
            _element.style.zIndex = topZ;
        }
    }

    const transitionEndEventName = {
        transition: 'transitionend',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd',
        OTransition: 'oTransitionEnd otransitionend'
    };
    let transitionEndEvent = undefined;

    for (let name in transitionEndEventName) {
        if (document.body.style[name] !== undefined) {
            transitionEndEvent = transitionEndEventName[name];
            break;
        }
    }

    /**
     * close the tip
     * must be call as the method of an instance
     * @param {*} _result the value as the result of the promise, only effected when the tip show as a promise
     */
    function close(_result) {
        this[$result$1] = _result;
        const obj = this[$private$1];
        const opt = this[$options];
        const fn = () => {
            (typeof obj.remove === "function") && setTimeout(() => obj.remove(), 0);
            this[$timerId] && (clearTimeout(this[$timerId]), this[$timerId] = undefined);
            const onclose = (opt && opt.onclose);
            typeof onclose === "function" && onclose(this, _result);
            typeof this[$resolve] === "function" && (this[$resolve](_result), delete this[$resolve]);
        };
        if ((obj instanceof Element) && obj.isConnected) {
            if (transitionEndEvent && (0 !== opt.fadeOutTime)) {
                if (!isNaN(opt.fadeOutTime)) {
                    obj.setAttribute("style", `--fadeout-time:${opt.fadeOutTime}s;${obj.getAttribute("style")}`);
                }
                obj.className = `${obj.className} -season-tip-fadeout`;
                obj.addEventListener(transitionEndEvent, fn, { once: true });
            } else {
                fn();
            }
        }
    }

    const SYM_TYPE_ATTR = "season-tip-type";
    const TIP_SELECTOR = `${SYM_TYPE_ATTR}="tip"`;
    const HTML_TIP_CONTAINER = `<div class="-season-tip-container" ${TIP_SELECTOR} />`;

    /**
     * show tip
     * @param {*} _tip the text of the tip
     * @param {String|Object} _opt the type or the option object, this parameter can be ignore for normal tip
     * @param {String} [_opt.type=undefined] the type of the tip, can be set as "info", "warn", "error", "normal"
     * @param {Boolean} [_opt.closable=false] if the tip can be close manually
     * @param {Number} [_opt.timeout] timeout for close the tip automatically, the default value is 0ms if the closable is set to true, else is 3000ms
     * @return {tip} the instance of the tip
     */
    function tip$2(_tip, _opt) {
        // check the parameters
        _opt = _opt || { type: "normal" };
        (typeof _opt !== "object") && (_opt = { type: String(_opt) });

        if (this instanceof tip$2) {
            // construct the instance
            const div = document.createElement("div");
            if (div) {
                this[$private$1] = div;
                this[$options] = _opt;
                div.setAttribute("class", "-season-tip-box");
                div.setAttribute("d-season-tip-type", _opt.type||"normal");
                _opt.customTag && div.setAttribute(_opt.customTag, _opt.customTag);
                div.insertAdjacentHTML("beforeend", `<div class="-season-tip-icon"></div><div class="-season-tip-text">${String(_tip || "").replace("\n", "<br />")}</div>`);
                if (_opt.closable) {
                    div.insertAdjacentHTML("beforeend", '<div class="-season-tip-close-button" />');
                    const closeBtn = div.querySelector(".-season-tip-close-button");
                    closeBtn && closeBtn.addEventListener("click", close.bind(this));
                }
            }
        } else {
            // create an instance and show
            const obj = new tip$2(_tip, _opt);
            obj && obj.show();
            return obj;
        }
    }

    /**
     * declare the prototype of the tip class
     */
    tip$2.prototype = {
        close,
        show(_parent) {
            const div = this[$private$1];
            if ((this instanceof tip$2) && div && (!div.isConnected)) {
                // prepare the container
                (_parent instanceof HTMLElement) || (_parent = document.body);
                let container = _parent.querySelector(`[${TIP_SELECTOR}]`);
                if (!container) {
                    _parent.insertAdjacentHTML("afterbegin", HTML_TIP_CONTAINER);
                    container = _parent.querySelector(`[${TIP_SELECTOR}]`);
                }
                // show
                if (container) {
                    setTopZIndex(container);
                    container.insertAdjacentElement("afterbegin", div);
                    setTimeout(() => div.className = "-season-tip-box -season-tip-fadein", 0);
                    const timeout = (Number(this[$options].timeout) || (this[$options].closable ? 0 : 3000));
                    timeout && (this[$timerId] = setTimeout(close.bind(this), timeout));
                }
            }
        }
    };

    const IconCollection = {
        info: '<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="#40a9ff" stroke-width="4"><g><path d="M47.979 10C27.0038 10 10 27.0038 10 47.979 10 68.9542 27.0038 85.958 47.979 85.958 68.9542 85.958 85.958 68.9542 85.958 47.979 85.9674 27.0132 68.9788 10.0094 48.013 10 48.0017 10 47.9903 10 47.979 10ZM47.979 83.958C28.1083 83.958 12 67.8497 12 47.979 12 28.1083 28.1083 12 47.979 12 67.8497 12 83.958 28.1083 83.958 47.979 83.9354 67.8403 67.8403 83.9354 47.979 83.958Z"/><path d="M49 35 41 35 41 37 47 37 47 67 40 67 40 69 56 69 56 67 49 67 49 35Z"/><circle cx="46.814" cy="26.5" r="2.25"/></g></svg>',
        ok: '<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="#0b0" stroke-width="4"><g><path d="M48 10C27.0071 9.99393 9.98408 27.0071 9.978 48 9.97193 68.9929 26.9851 86.0159 47.978 86.022 68.9709 86.0281 85.9939 69.0149 86 48.022 86 48.018 86 48.014 86 48.01 86.011 27.0287 69.0113 10.011 48.03 10 48.02 10 48.01 10 48 10ZM48 84.021C28.1117 84.0271 11.9841 67.9093 11.978 48.021 11.9719 28.1327 28.0897 12.0051 47.978 11.999 67.8663 11.9929 83.9939 28.1107 84 47.999 84 48.0037 84 48.0083 84 48.013 83.9802 67.8888 67.8758 83.9981 48 84.024Z"/><path d="M41.5 60.086 29 47.586 27.586 49 41.5 62.914 70.914 33.5 69.5 32.086 41.5 60.086Z"/></g></svg>',
        error: '<svg width="26" height="26" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" stroke="red" stroke-width="4"><g><path d="M48 10C27.0071 9.99393 9.98408 27.0071 9.978 48 9.97193 68.9929 26.9851 86.0159 47.978 86.022 68.9709 86.0281 85.9939 69.0149 86 48.022 86 48.018 86 48.014 86 48.01 86.011 27.0287 69.0113 10.011 48.03 10 48.02 10 48.01 10 48 10ZM48 84.021C28.1117 84.0271 11.9841 67.9093 11.978 48.021 11.9719 28.1327 28.0897 12.0051 47.978 11.999 67.8663 11.9929 83.9939 28.1107 84 47.999 84 48.0037 84 48.0083 84 48.013 83.9802 67.8888 67.8758 83.9981 48 84.024Z"/><path d="M62.041 32.557 47.998 46.6 33.955 32.557 32.541 33.971 46.584 48.014 32.541 62.057 33.955 63.471 47.998 49.428 62.041 63.471 63.455 62.057 49.412 48.014 63.455 33.971 62.041 32.557Z"/></g></svg>',
        question: '<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="green" stroke-width="4"><g><path d="M47.979 10C27.0038 10 10 27.0038 10 47.979 10 68.9542 27.0038 85.958 47.979 85.958 68.9542 85.958 85.958 68.9542 85.958 47.979 85.9674 27.0132 68.9788 10.0094 48.013 10 48.0017 10 47.9903 10 47.979 10ZM47.979 83.958C28.1083 83.958 12 67.8497 12 47.979 12 28.1083 28.1083 12 47.979 12 67.8497 12 83.958 28.1083 83.958 47.979 83.9354 67.8403 67.8403 83.9354 47.979 83.958Z"/><path d="M49.345 27.079C42.7414 26.3273 36.7789 31.0712 36.0272 37.6748 35.9759 38.1257 35.9501 38.5792 35.95 39.033L37.95 39.033C37.9522 33.4936 42.4446 29.0048 47.984 29.007 53.5235 29.0093 58.0122 33.5017 58.01 39.0411 58.0086 42.4915 56.2337 45.6991 53.311 47.533 49.4115 49.9087 47.0166 54.131 46.979 58.697L48.979 58.697C49.0205 54.819 51.0627 51.2376 54.379 49.227 60.0072 45.6952 61.7066 38.2696 58.1748 32.6414 56.2307 29.5434 52.9829 27.4979 49.349 27.083Z"/><circle cx="48" cy="67" r="2"/></g></svg>',
        warn: '<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="#faad14" stroke-width="4"><g><path d="M90.6 80 51.5 12C50.4365 10.0946 48.0298 9.41212 46.1244 10.4756 45.4848 10.8326 44.957 11.3604 44.6 12L5.4 80C4.30371 81.9275 4.9775 84.3787 6.90497 85.475 7.5129 85.8208 8.20061 86.0017 8.9 86L87.1 86C89.3174 86.0055 91.1195 84.2124 91.125 81.995 91.1268 81.2956 90.9458 80.6079 90.6 80ZM88.839 83.019C88.4799 83.637 87.8146 84.0123 87.1 84L8.9 84C8.18507 84.0125 7.5195 83.6367 7.161 83.018 6.78807 82.3997 6.77737 81.6284 7.133 81L46.348 12.971C46.8768 12.0316 48.0671 11.6987 49.0065 12.2276 49.3275 12.4082 49.5908 12.676 49.766 13L88.852 80.971C89.2186 81.6057 89.2137 82.389 88.839 83.019Z"/><path d="M48 73.98C47.3953 73.9976 46.8116 73.7577 46.394 73.32 45.9625 72.8895 45.7274 72.3003 45.744 71.691 45.7194 71.0835 45.953 70.4939 46.387 70.068 46.8156 69.6456 47.3985 69.4172 48 69.436 48.6136 69.4208 49.208 69.6503 49.652 70.074 50.1 70.4898 50.3446 71.0802 50.322 71.691 50.3367 72.3033 50.0911 72.8932 49.646 73.314 49.212 73.7526 48.6168 73.9934 48 73.98Z"/><path d="M46.901 62.6 46.578 30.787 49.289 30.787 48.966 62.6 46.901 62.6Z"/></g></svg>'
    };

    function confirm$1(_tip, _opt) {
        // check the parameters
        _opt = _opt || { };
        (typeof _opt !== "object") && (_opt = ((_opt instanceof Array) ? { buttons: _opt } : { icon: String(_opt) }));
        (arguments[2] !== undefined) && (_opt.buttons = arguments[2]);
        _opt.buttons ? (_opt.buttons instanceof Array || (_opt.buttons = [String(_opt.buttons)])) : (_opt.buttons = ['Close']);
        Number(_opt.default) || (_opt.default = 0);

        if (this instanceof confirm$1) {
            // construct the instance
            Object.defineProperty(this, "result", {
                get: () => this[$result]
            });
            const div = document.createElement("div");
            if (div) {
                this[$private$1] = div;
                this[$options] = _opt;
                div.setAttribute("class", `-season-tip-mask-container`);
                _opt.customTag && div.setAttribute(_opt.customTag, _opt.customTag);
                div.insertAdjacentHTML("beforeend", 
                    `<div class="-season-tip-dialog -season-confirm-box">
                    <div class="-season-confirm-info-line">
                        ${IconCollection[_opt.icon] || ""}<div class="-season-confirm-info">${String(_tip).replace("\n", "<br />")}</div>
                    </div>
                    <div class="-season-tip-button-bar" ${_opt.buttonAlign ? `style="justify-content:${FlexAlignMap[_opt.buttonAlign]||_opt.buttonAlign};"` : ""}>
                        ${_opt.buttons ? _opt.buttons.map((t, i) => `<div class="-season-tip-button ${i === _opt.default ? "-season-tip-button-default" : ""}" d-index="${i}">${t}</div>`).join("") : ""}
                    </div>
                </div>`);
            }
        } else {
            // create an instance and show
            const obj = new confirm$1(_tip, _opt);
            return obj.show();
        }
    }

    function onConfirmTimer(_this, _button, _caption, _timeout) {
        _button.textContent = `${_caption} (${_timeout})`;
        if (_timeout) {
            this[$timerId] = setTimeout(onConfirmTimer, 1000, _this, _button, _caption, _timeout - 1);
        } else {
            this[$timerId] = undefined;
            _this.close(Number(_button.getAttribute("d-index")));
        }
    }

    confirm$1.prototype = {
        close,
        show(_parent) {
            return new Promise((resolve, reject) => {
                const div = this[$private$1];
                if ((this instanceof confirm$1) && div && (!div.isConnected)) {
                    this[$resolve] = resolve;
                    (_parent instanceof HTMLElement) || (_parent = document.body);
                    setTopZIndex(div);
                    _parent.insertAdjacentElement("afterbegin", div);
                    setTimeout(() => div.className = "-season-tip-mask-container -season-tip-fadein", 0);
                    [...div.querySelectorAll(".-season-tip-button")].forEach(button => {
                        button.addEventListener("click", e => {
                            this.close(Number(e.target.getAttribute("d-index")));
                        }, { once: true });
                    });
                    const timeout = Number(this[$options].timeout);
                    const defaultButton = div.querySelector(".-season-tip-button-default");
                    if (timeout && defaultButton) {
                        const buttonText = defaultButton.textContent;
                        defaultButton.textContent = `${buttonText} (${timeout})`;
                        this[$timerId] = setTimeout(onConfirmTimer, 1000, this, defaultButton, buttonText, timeout - 1);
                    }
                } else {
                    reject(new Error("Reactive"));
                }
            });
        }
    };

    function input$1(_title, _tip, _opt) {
        let opt = {};
        if (typeof _title === "string") {
            opt.title = _title;
        } else if (arguments.length === 1) {
            Object.assign(opt, _title);
        } 
        if (typeof _tip === "string") {
            opt.tip = _tip;
        } else if (arguments.length === 2) {
            Object.assign(opt, _tip);
        }
        if (_opt) {
            Object.assign(opt, _opt);
        }

        if (this instanceof input$1) {
            // construct the instance
            Object.defineProperty(this, "result", {
                get: () => this[$result$1]
            });
            const div = document.createElement("div");
            if (div) {
                this[$private$1] = div;
                this[$options] = opt;
                div.setAttribute("class", `-season-tip-mask-container`);
                opt.customTag && div.setAttribute(opt.customTag, opt.customTag);
                isNaN(opt.fadeOutTime) && (opt.fadeOutTime = 0.3);
                div.insertAdjacentHTML("beforeend", 
                    `<div class="-season-tip-dialog">
                    ${opt.title ? `<h4 style="margin-top:0">${opt.title}</h4>` : ""}
                    <input class="-season-tip-input" type="text" placeholder="${opt.tip||""}" />
                    <div class="-season-tip-button-bar" ${opt.buttonAlign ? `style="justify-content:${FlexAlignMap[opt.buttonAlign]||opt.buttonAlign};"` : ""}>
                        <div class="-season-tip-button -season-tip-button-default" d-button-submit="1">${opt.submitText || "Submit"}</div>
                        ${(opt.hideCancel || opt.forbitCancel) ? "" : `<div class="-season-tip-button" d-button-cancel="1">${opt.cancelText || "Cancel"}</div>`}
                    </div>
                </div>`);
            }
        } else {
            const dlg = new input$1(opt);
            return dlg.show(opt.position);
        }
    }

    input$1.prototype = {
        close,
        show(_position) {
            return new Promise((resolve, reject) => {
                const div = this[$private$1];
                if ((this instanceof input$1) && div && (!div.isConnected)) {
                    const opt = this[$options];
                    this[$resolve] = resolve;
                    this[$result$1] = undefined;

                    opt.hideMask && div.setAttribute("style", "background: none !important;");
                    _position || (_position = opt.position);
                    if (_position) {
                        let dlg = div.querySelector(".-season-tip-dialog");
                        dlg && dlg.setAttribute("style", `
                        position: absolute;
                        left: ${isNaN(_position.x) ? "auto" : (_position.x + "px")};
                        top: ${isNaN(_position.y) ? "auto" : (_position.y + "px")};
                        right: ${isNaN(_position.rx) ? "auto" : (_position.rx + "px")};
                        bottom: ${isNaN(_position.ry) ? "auto" : (_position.ry + "px")};
                    `);
                    }

                    setTopZIndex(div);
                    document.body.insertAdjacentElement("beforeend", div);
                    setTimeout(() => div.className = "-season-tip-mask-container -season-tip-fadein", 0);

                    let btn = div.querySelector("[d-button-submit]");
                    const fnSubmit = () => {
                        let input = div.querySelector("input");
                        this.close(input ? String(input.value) : undefined);
                    };
                    btn && btn.addEventListener("click", fnSubmit, { once: true });
                    btn = div.querySelector("[d-button-cancel]");
                    btn && (!opt.forbitCancel) && btn.addEventListener("click", e => {
                        this.close(undefined);
                    }, { once: true });
                    opt.forbitCancel || div.addEventListener("click", e => {
                        (e.target === div) && this.close(undefined);
                    }, { once: true });

                    let input = div.querySelector("input");
                    if (input) {
                        const fnKeydown = e => {
                            if (13 === e.keyCode) {
                                fnSubmit();
                                e.target.removeEventListener("keydown", fnKeydown);
                            }
                        };
                        input.addEventListener("keydown", fnKeydown);
                        input.value = (opt.default || "");
                        input.select();
                        input.focus();
                    }
                } else {
                    reject(new Error("Reactive"));
                }
            });
        }
    };

    const $hasImage = Symbol("season.tip.popup.hasimage");

    function popup$1(_list, _refElement, _opt) {
        (_list instanceof Array) || (_list = [String(_list)]);
        let opt = {};
        if (_refElement instanceof Element) {
            opt.refElement = _refElement;
        } else if (arguments.length === 2) {
            Object.assign(opt, _refElement);
        }
        _opt && Object.assign(opt, _opt);
        
        if (this instanceof popup$1) {
            // construct the instance
            Object.defineProperties(this, {
                result: {
                    get: () => this[$result$1]
                },
                count: {
                    value: _list.length,
                    writable: false
                }
            });
            const div = document.createElement("div");
            if (div) {
                this[$private$1] = div;
                this[$options] = opt;
                div.setAttribute("class", `-season-tip-dialog -season-tip-popup-box`);
                div.setAttribute("tabIndex", "0");
                opt.customTag && div.setAttribute(opt.customTag, opt.customTag);
                isNaN(opt.fadeOutTime) && (opt.fadeOutTime = 0.1);
                opt.style && div.setAttribute("style", opt.style);
                this[$hasImage] = [false, ..._list].reduce((r, i) => (r || (i && i.image)));
                div.insertAdjacentHTML("beforeend", _list.map((item, index) => {
                    return ((null !== item) && (undefined !== item)) 
                                ? `<a d-select-index="${index}">
                                ${((typeof item !== "string") && item.image) ? `<img src="${item.image}" ${item.imageInvert ? 'd-image-invert="1"' : ""} />` : ""}<span>${item.text || String(item)}</span>
                               </a>`
                                : '<div d-separate-horizontal="1"></div>';
                }).join(""));
            }
        } else {
            const dlg = new popup$1(_list, opt);
            return dlg.show(opt.refElement);
        }
    }

    popup$1.prototype = {
        close,
        show(_refElement) {
            return new Promise((resolve, reject) => {
                const div = this[$private$1];
                if ((this instanceof popup$1) && div && (!div.isConnected)) {
                    const opt = this[$options];
                    this[$resolve] = resolve;
                    this[$result$1] = undefined;

                    document.body.insertAdjacentElement("beforeend", div);
                    setTimeout(() => div.className = "-season-tip-dialog -season-tip-popup-box -season-tip-fadein", 0);
                    div.addEventListener("blur", (e) => {
                        this.close(undefined);
                    }, { once: true });
                    [...div.querySelectorAll("[d-select-index]")].forEach(item => {
                        item.addEventListener("click", (e) => {
                            this.close(Number(item.getAttribute("d-select-index")));
                        });
                    });

                    let imageRef = div.querySelector("[d-select-index] span");
                    imageRef = ((this[$hasImage] && imageRef) ? `${parseInt(imageRef.getBoundingClientRect().height)}px` : "0px");
                    div.style.setProperty("--image-size", imageRef);

                    _refElement || (_refElement = opt.refElement);
                    if (_refElement instanceof Element) {
                        const { width, height } = div.getBoundingClientRect();
                        const { left:refLeft, right:refRight, top:refTop, bottom:refBottom } = _refElement.getBoundingClientRect();
                        const { innerWidth:winWidth, innerHeight:winHeight } = window;
                        const positionStyle = String(opt.position).toLowerCase().split("&");
                        
                        let left = "auto", right = "auto", top = "auto", bottom = "auto";
                        if (positionStyle.includes("top")) {
                            bottom = refTop;
                        } else if (positionStyle.includes("top-align")) {
                            top = refTop;
                        } else if (positionStyle.includes("bottom-align")) {
                            bottom = refBottom;
                        } else {
                            top = refBottom;
                        }
                        if (Number(bottom)) {
                            if ((bottom - height) < 0) {
                                bottom = "auto";
                                top = 0;
                            } else {
                                bottom = `${winHeight - bottom}px`;
                            }
                        }
                        if (Number(top)) {
                            if ((top + height) > winHeight) {
                                top = Math.max(0, winHeight - height);
                            }
                            top = `${top}px`;
                        }
                        if (positionStyle.includes("left")) {
                            right = refLeft;
                        } else if (positionStyle.includes("right")) {
                            left = refRight;
                        } else if (positionStyle.includes("right-align")) {
                            right = refRight;
                        } else {
                            left = refLeft;
                        }
                        if (Number(right)) {
                            if ((right - width) < 0) {
                                right = "auto";
                                left = 0;
                            } else {
                                right = `${winWidth - right}px`;
                            }
                        }
                        if (Number(left)) {
                            if ((left + width) > winWidth) {
                                left = Math.max(0, winWidth - width);
                            }
                            left = `${left}px`;
                        }
                        div.setAttribute("style", `left:${left};right:${right};top:${top};bottom:${bottom};--image-size:${imageRef};${opt.style||""}`);
                    }

                    setTopZIndex(div);
                    div.focus();
                } else {
                    reject(new Error("Reactive"));
                }
            });
        }
    };

    popup$1.bindElement = function (_refElement, _event, _cb, _list, _opt) {
        if (_refElement instanceof Element) {
            _refElement.addEventListener(_event || "click", () => {
                popup$1(_list, _refElement, _opt).then((typeof _cb === "function") ? _cb: console.log);
            });
        }
    };

    const tip = tip$2;
    const confirm = confirm$1;
    const input = input$1;
    const popup = popup$1;

    var tip$1 = {
        install(Vue, options) {
            if (!Vue) return;

            Vue.prototype.$tip = tip$2;
            Vue.prototype.$confirm = confirm$1;
            Vue.prototype.$input = input$1;
            Vue.prototype.$popup = popup$1;
        },
        tip,
        confirm,
        input,
        popup
    };

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
          var gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }

          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }

          _next(undefined);
        });
      };
    }

    var regenerator = require$$0__default["default"];

    var DEF_TIMEOUT = 3000;
    var gLastError = undefined;

    function getLastError() {
      return gLastError;
    }

    function clearLastError() {
      gLastError = undefined;
    }

    function getWorkerComm(_timeout) {
      _timeout || (_timeout = DEF_TIMEOUT);
      var startTick = Date.now();

      var fn = function fn(r) {
        if (navigator.serviceWorker.controller) {
          r(navigator.serviceWorker.controller);
        } else {
          if (Date.now() - startTick < _timeout) {
            setTimeout(fn, 10, r);
          } else {
            r(undefined);
          }
        }
      };

      return new Promise(fn);
    }

    var AppWorker = Object.create('serviceWorker' in navigator ? {
      getLastError: getLastError,
      clearLastError: clearLastError,
      addMessenger: function addMessenger(_cb) {
        if (typeof _cb === "function") {
          var fn = function fn(msg) {
            _cb(msg ? msg.data : undefined);
          };

          navigator.serviceWorker.addEventListener("message", fn);
          return fn;
        }
      },
      removeMessenger: function removeMessenger(_fn) {
        navigator.serviceWorker.removeEventListener("message", _fn);
      },
      getMessage: function getMessage() {
        return new Promise(function (r) {
          navigator.serviceWorker.addEventListener("message", function (msg) {
            r(msg ? msg.data : undefined);
          }, {
            once: true
          });
        });
      },
      postMessage: function postMessage(_msgType, _param, _timeout) {
        return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
          var comm;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  clearLastError();
                  _context.next = 4;
                  return getWorkerComm(_timeout);

                case 4:
                  comm = _context.sent;

                  if (!comm) {
                    _context.next = 8;
                    break;
                  }

                  comm.postMessage({
                    msg: _msgType,
                    param: _param
                  });
                  return _context.abrupt("return", comm);

                case 8:
                  _context.next = 13;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context["catch"](0);
                  gLastError = _context.t0;

                case 13:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 10]]);
        }))();
      },
      sendMessage: function sendMessage(_msgType, _param, _timeout) {
        return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
          var comm;
          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  clearLastError();
                  _context2.next = 4;
                  return getWorkerComm(_timeout);

                case 4:
                  comm = _context2.sent;

                  if (!comm) {
                    _context2.next = 9;
                    break;
                  }

                  _context2.next = 8;
                  return new Promise(function (resolve, reject) {
                    var channel = new MessageChannel();
                    var timeId = setTimeout(reject, _timeout || DEF_TIMEOUT, undefined);

                    channel.port1.onmessage = function (e) {
                      timeId && clearTimeout(timeId);
                      resolve(e.data);
                    };

                    comm.postMessage({
                      msg: _msgType,
                      param: _param
                    }, [channel.port2]);
                  });

                case 8:
                  return _context2.abrupt("return", _context2.sent);

                case 9:
                  _context2.next = 14;
                  break;

                case 11:
                  _context2.prev = 11;
                  _context2.t0 = _context2["catch"](0);
                  gLastError = _context2.t0;

                case 14:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[0, 11]]);
        }))();
      },
      start: function start(_script, _opt, _cb, _catch) {
        return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
          var registration;
          return regenerator.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  clearLastError();
                  _context3.next = 4;
                  return navigator.serviceWorker.register(_script, _opt || {});

                case 4:
                  registration = _context3.sent;
                  typeof _cb === "function" && _cb(registration);
                  return _context3.abrupt("return", registration);

                case 9:
                  _context3.prev = 9;
                  _context3.t0 = _context3["catch"](0);
                  gLastError = _context3.t0;

                  if (!(typeof _catch === "function")) {
                    _context3.next = 16;
                    break;
                  }

                  _catch(_context3.t0);

                  _context3.next = 17;
                  break;

                case 16:
                  throw _context3.t0;

                case 17:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[0, 9]]);
        }))();
      }
    } : {
      getLastError: getLastError,
      clearLastError: clearLastError,
      addMessenger: function addMessenger(_cb) {},
      removeMessenger: function removeMessenger(_fn) {},
      getMessage: function getMessage() {
        return new Promise(function (resolve, reject) {
          gLastError = new Error("ServiceWorker is not supported");
          reject();
        });
      },
      postMessage: function postMessage(_msgType, _param, _timeout) {
        return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
          return regenerator.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }))();
      },
      sendMessage: function sendMessage(_msgType, _param, _timeout) {
        return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5() {
          return regenerator.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }))();
      },
      start: function start(_script, _opt, _cb, _catch) {
        return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6() {
          return regenerator.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }))();
      }
    });

    const $instance = Symbol("class.definder.instance");

    function singletonClass(_name, _definder) {
        if (_definder) {
            (arguments.length < 2) && (_definder = _name, _name = undefined);
            const _ = {
                constructor: _definder.$constructor,
                [_name]: function () {
                    if (this instanceof _[_name]) {
                        if (_[$instance]) {
                            throw new Error(`${_name || "This"} is a singleton class`);
                        }
                        (typeof _.constructor === "function") && _.constructor.apply(this, [...arguments]);
                        _[$instance] = this;
                    } else {
                        return _[$instance] || new _[_name](...arguments);
                    }    
                }
            };

            const prototype = _[_name].prototype;
            for (let key in _definder) {
                let item = _definder[key];
                item && (
                    (typeof item === "function") 
                        ? (prototype[key] = item)
                        : (((undefined === item.enumerable) && (item.enumerable = true)), Object.defineProperty(prototype, key, item))
                );
            }
            return _[_name];
        }
    }

    /**
     * get the top z-index in the given element
     * @param {HTMLElement} _element the container element, document.body will be taken as default if this parameter is ignored
     * @returns {Number} the top z-index
     */

    /**
     * invoke a link without displaying
     * @param {String} _url the URL of the link
     * @param {Object} _opt optional parameter, the members in which will be set into the <a> element
     */
     function dynInvokeLink(_url, _opt) {
        if (_url) {
            const aElement = document.createElement("a");
            if (aElement) {
                aElement.href = _url;
                aElement.rel = "noopener";
                if (_opt) {
                    for (const name in _opt) {
                        aElement[name] = _opt[name];
                    }
                }
                aElement.click();
            }
        }
    }

    function onContentClick() {
      if (this.download) {
        dynInvokeLink(this.download, {
          download: this.download.substr(this.download.lastIndexOf("/") + 1)
        });
      } else if (this.href) {
        window.open(this.href, "blank");
      }
    }

    var WelcomeApp = singletonClass("WelcomeApp", {
      $constructor: function $constructor() {
        this.$rootElement = document.getElementById("welcome-app");
      },
      refresh: function refresh() {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
          var contentBox, resp;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  contentBox = _this.$rootElement.querySelector(".welcome-app-content-box");
                  contentBox.innerHTML = "";
                  _context.next = 5;
                  return fetch("./home-content.json");

                case 5:
                  resp = _context.sent;
                  _context.next = 8;
                  return resp.json();

                case 8:
                  resp = _context.sent;
                  resp.forEach(function (item) {
                    var itemDiv = document.createElement("div");
                    itemDiv.setAttribute("class", "welcome-app-content");
                    itemDiv.setAttribute("d-content-desc", item.desc || "");
                    itemDiv.insertAdjacentHTML("afterbegin", "<img src=\"".concat(item.image, "\" /><div>").concat(item.title, "</div>"));
                    itemDiv.addEventListener("click", onContentClick.bind(item));
                    contentBox.appendChild(itemDiv);
                  });
                  _context.next = 16;
                  break;

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context["catch"](0);
                  tip$2("Fail in fresh home contents", {
                    type: "error",
                    timeout: 1700,
                    closable: true
                  });
                  console.error("Fail in fresh home contents", _context.t0);

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 12]]);
        }))();
      },
      hide: function hide() {
        this.$rootElement && this.$rootElement.remove();
      },
      show: function show() {
        var container = document.querySelector(".--app-container");
        this.$rootElement && container && (container.innerHTML = "", container.appendChild(this.$rootElement));
      }
    });

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }

    const $private = Symbol("season.urlparams.private");

    class URLGetParams {
        constructor (_searchStr) {
            const params = (this[$private] = {});
            String(_searchStr).split("&").forEach(item => {
                let { 0:name, 1:value } = item.split("=");
                params[name] = ((undefined === value) ? true : decodeURIComponent(value));
            });
        }

        get(_name) {
            return this[$private][_name];
        }

        getAll(_name) {
            return this[$private][_name];
        }

        has(_name) {
            return Object.hasOwnProperty.call(this[$private], _name);
        }

        keys() {
            return Object.keys(this[$private]);
        }

        * entries() {
            const params = this[$private];
            for (let key in params) {
                yield [key, params[key]];
            }
        }

        forEach(_cb, _thisArg) {
            if (typeof _cb === "function") {
                const params = this[$private];
                for (let key in params) {
                    _cb.call(_thisArg, params[key], key, this);
                }
            }
        }
    }

    const URLParams = (('URLSearchParams' in window) ? window.URLSearchParams : URLGetParams);

    var WaitTip = singletonClass("WaitTip", {
      $constructor: function $constructor() {
        this.$rootElement = document.getElementById("waiting-box");
        this.close();
        this.$rootElement.style.display = "";
      },
      show: function show(_text) {
        var obj = this.$rootElement.querySelector("#waiting-text");
        obj.textContent = _text || "";
        !this.$rootElement.isConnected && document.body.appendChild(this.$rootElement);
        return this;
      },
      close: function close() {
        this.$rootElement.remove();
        return this;
      },
      wait: function wait() {
        var _this = this;

        for (var _len = arguments.length, _promises = new Array(_len), _key = 0; _key < _len; _key++) {
          _promises[_key] = arguments[_key];
        }

        Promise.all(_promises).then(function () {
          _this.close();
        });
      }
    });

    var $pkgRec = Symbol("package.manager.private.record");
    var reloadMenuItem = {
      text: "Reload App",
      action: "reload"
    };
    var packageMenuItem = {
      image: "./assets/icon-cube.svg",
      imageInvert: true,
      text: "Load Package",
      action: "package"
    };
    var homeMenuItem = {
      //image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTc3LDUyTDQ4LDI0TDEzLDU3TDgsNTJMNDgsMTRMODcsNTJMODIsNTdMNzcsNTJ2MzNoLTIzdi0yNGgtMTJ2MjRoLTIzdi0zMyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiIC8+PC9zdmc+",
      image: "./assets/icon-home.svg",
      imageInvert: true,
      text: "Home Page"
    };
    var PackageManager = singletonClass("PackageManager", {
      $constructor: function $constructor() {
        this.$menuList = [];
        var btnElement = document.querySelector(".--app-home-button");
        btnElement && popup$1.bindElement(btnElement, "click", this.onMenuInvoke.bind(this), this.$menuList, {
          position: "right-align",
          customTag: "d-app-menu-button"
        });
        btnElement = document.querySelector(".--app-return-button");
        btnElement && btnElement.addEventListener("click", function () {
          history.back();
        });
        this.$menuBar = document.querySelector(".--app-menu-bar");
        this.$ob = new MutationObserver(this.onDomChanged.bind(this));
        this.$ob.observe(document.body, {
          childList: true,
          attributes: true,
          subtree: true
        });
        this.freshList();

        this._$_default_();
      },
      current: {
        get: function get() {
          return this[$pkgRec];
        }
      },
      currentPath: {
        get: function get() {
          return this[$pkgRec] ? "/.pwa.vir/".concat(this[$pkgRec]) : ".";
        }
      },
      onDomChanged: function onDomChanged() {
        if (!this.$menuBar.isConnected) {
          document.body.insertAdjacentElement("afterbegin", this.$menuBar);
        }
      },
      freshList: function freshList() {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
          var menuList, response, packageList;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  menuList = _this.$menuList;
                  menuList.splice(0, menuList.length);
                  _context.prev = 2;
                  _context.next = 5;
                  return fetch("./pkgs/context.json");

                case 5:
                  response = _context.sent;
                  _context.next = 8;
                  return response.json();

                case 8:
                  packageList = _context.sent;

                  if (!(packageList instanceof Array)) {
                    _context.next = 13;
                    break;
                  }

                  menuList.splice.apply(menuList, [0, 0].concat(_toConsumableArray(packageList)));
                  _context.next = 14;
                  break;

                case 13:
                  throw new Error("Package context must be an array");

                case 14:
                  _context.next = 19;
                  break;

                case 16:
                  _context.prev = 16;
                  _context.t0 = _context["catch"](2);
                  console.error("$[PackageManager] Fail in load package list", _context.t0);

                case 19:
                  menuList.length > 0 && menuList.push(null);
                  menuList.splice(menuList.length, 0, packageMenuItem, homeMenuItem, null, reloadMenuItem);

                case 21:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[2, 16]]);
        }))();
      },
      onMenuInvoke: function onMenuInvoke(_index) {
        var menuItem = this.$menuList[_index];

        if (menuItem) {
          if (undefined === menuItem.action) {
            this._$_default_();
          } else {
            var action = "_$_".concat(menuItem.action, "_");

            if (typeof this[action] === "function") {
              WaitTip().show("Loading...").wait(new Promise(function (r) {
                return setTimeout(r, 1000);
              }), this[action](menuItem));
            } else {
              tip$2("\"".concat(menuItem.text || String(menuItem), "\" unknown!"), {
                type: "error",
                closable: true,
                timeout: 1700
              });
            }
          }
        }
      },
      _$_default_: function _$_default_() {
        var params = new URLParams(location.search.substr(1));

        if (params.has("pkg")) {
          WaitTip().show("Loading...").wait(new Promise(function (r) {
            return setTimeout(r, 1000);
          }), this._$_package_({
            "package": params.get("pkg")
          }));
        } else {
          WelcomeApp().show();
        }
      },
      _$_reload_: function _$_reload_(_menuItem) {
        return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
          var ret;
          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return AppWorker.sendMessage("reload-application");

                case 2:
                  ret = _context2.sent;

                  if (ret) {
                    if (0 === ret.ret) {
                      location.reload();
                    } else {
                      tip$2("Fail in reloading application(".concat(ret.ret, ")!"), {
                        type: "error",
                        closable: true,
                        timeout: 1700
                      });
                    }
                  }

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      },
      _$_package_: function _$_package_(_menuItem) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
          var lastError, context, packageName, pkg, keyCode, keyHash, mapTree, item, relPath, mapRet, entryFile, container, entryFolder;
          return regenerator.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  lastError = undefined;
                  context = undefined;
                  packageName = _menuItem["package"];

                  if (packageName) {
                    _context3.next = 9;
                    break;
                  }

                  _context3.next = 6;
                  return input$1("Input package code", {
                    hideCancel: true,
                    buttonAlign: "center"
                  });

                case 6:
                  packageName = _context3.sent;

                  if (packageName) {
                    _context3.next = 9;
                    break;
                  }

                  return _context3.abrupt("return");

                case 9:
                  if (context) {
                    _context3.next = 22;
                    break;
                  }

                  _context3.prev = 10;
                  _context3.next = 13;
                  return fetch("/.pwa.vir/".concat(packageName, "/context.json"));

                case 13:
                  context = _context3.sent;
                  _context3.next = 16;
                  return context.json();

                case 16:
                  context = _context3.sent;
                  _context3.next = 22;
                  break;

                case 19:
                  _context3.prev = 19;
                  _context3.t0 = _context3["catch"](10);
                  context = undefined; //lastError = error;

                case 22:
                  if (context) {
                    _context3.next = 88;
                    break;
                  }

                  _context3.prev = 23;
                  _context3.next = 26;
                  return fetch("./pkgs/".concat(packageName, ".zip"));

                case 26:
                  context = _context3.sent;
                  _context3.next = 29;
                  return context.blob();

                case 29:
                  context = _context3.sent;
                  _context3.next = 32;
                  return new JSZip__default["default"]().loadAsync(context);

                case 32:
                  pkg = _context3.sent;
                  _context3.t1 = JSON;
                  _context3.next = 36;
                  return pkg.file("context.json").async("string");

                case 36:
                  _context3.t2 = _context3.sent;
                  context = _context3.t1.parse.call(_context3.t1, _context3.t2);
                  new URLParams(location.search.substr(1)).get("pkg") === packageName && (context.keepAlive = true);
                  keyCode = undefined;

                  if (!context.crypt) {
                    _context3.next = 50;
                    break;
                  }

                  keyHash = undefined;

                case 42:
                  _context3.next = 44;
                  return input$1("Input the access code:", "");

                case 44:
                  keyCode = _context3.sent;
                  keyHash = CryptoJS.MD5(keyCode).toString();

                  if (keyCode && keyHash !== context.crypt) {
                    tip$2("The access key is incorrect!", {
                      type: "error",
                      closable: true,
                      timeout: 1000
                    });
                    keyHash = undefined;
                  }

                case 47:
                  if (keyCode && !keyHash) {
                    _context3.next = 42;
                    break;
                  }

                case 48:
                  if (keyCode) {
                    _context3.next = 50;
                    break;
                  }

                  throw new Error("Need an access code");

                case 50:
                  mapTree = {};
                  pkg.forEach(function (relPath, file) {
                    if (!file.dir) {
                      mapTree["".concat(context.keepAlive ? ":" : "").concat(packageName, "/").concat(relPath)] = String(relPath);
                    }
                  });
                  _context3.t3 = regenerator.keys(mapTree);

                case 53:
                  if ((_context3.t4 = _context3.t3()).done) {
                    _context3.next = 73;
                    break;
                  }

                  item = _context3.t4.value;
                  relPath = mapTree[item];

                  if (!(relPath.endsWith(".html") || relPath.endsWith(".htm") || relPath.endsWith(".js") || relPath.endsWith(".css"))) {
                    _context3.next = 68;
                    break;
                  }

                  _context3.t5 = Blob;
                  _context3.t6 = CryptoJS.AES;
                  _context3.next = 61;
                  return pkg.file(mapTree[item]).async("string");

                case 61:
                  _context3.t7 = _context3.sent;
                  _context3.t8 = keyCode;
                  _context3.t9 = _context3.t6.decrypt.call(_context3.t6, _context3.t7, _context3.t8).toString(CryptoJS.enc.Utf8);
                  _context3.t10 = [_context3.t9];
                  mapTree[item] = new _context3.t5(_context3.t10);
                  _context3.next = 71;
                  break;

                case 68:
                  _context3.next = 70;
                  return pkg.file(mapTree[item]).async("blob");

                case 70:
                  mapTree[item] = _context3.sent;

                case 71:
                  _context3.next = 53;
                  break;

                case 73:
                  _context3.t11 = context.keepAlive;

                  if (_context3.t11) {
                    _context3.next = 77;
                    break;
                  }

                  _context3.next = 77;
                  return AppWorker.sendMessage("clear-virtual-response", {
                    keepAlive: false
                  });

                case 77:
                  _context3.next = 79;
                  return AppWorker.sendMessage("map-virtual-response", mapTree);

                case 79:
                  mapRet = _context3.sent;

                  if (!(0 !== mapRet.ret)) {
                    _context3.next = 82;
                    break;
                  }

                  throw new Error("Fail in mapping virtual response(".concat(mapRet.ret, ")"));

                case 82:
                  _context3.next = 88;
                  break;

                case 84:
                  _context3.prev = 84;
                  _context3.t12 = _context3["catch"](23);
                  context = undefined;
                  lastError = _context3.t12;

                case 88:
                  if (!context) {
                    _context3.next = 110;
                    break;
                  }

                  _context3.prev = 89;
                  _context3.next = 92;
                  return fetch("/.pwa.vir/".concat(packageName, "/").concat(context.entry));

                case 92:
                  entryFile = _context3.sent;
                  _context3.next = 95;
                  return entryFile.text();

                case 95:
                  entryFile = _context3.sent;
                  container = document.querySelector(".--app-container");
                  WelcomeApp().hide();
                  container.innerHTML = "";
                  container.insertAdjacentHTML("beforeend", entryFile);
                  entryFolder = String(context.entry).substr(0, String(context.entry).lastIndexOf("/")) || "."; // update meta,link,style

                  _toConsumableArray(container.querySelectorAll("meta,link,style")).map(function (oriItem) {
                    try {
                      oriItem.remove();
                      var newItem = document.createElement(oriItem.tagName);
                      oriItem.getAttributeNames().forEach(function (attr) {
                        return newItem.setAttribute(attr, oriItem.getAttribute(attr));
                      });
                      var filePath = String(newItem.getAttribute("href") || "");

                      if (filePath) {
                        if (filePath.indexOf("://") < 0 && !filePath.startsWith("/")) {
                          newItem.setAttribute("href", "/.pwa.vir/".concat(packageName, "/").concat(entryFolder, "/").concat(filePath));
                        }
                      }

                      newItem.innerHTML = oriItem.innerHTML;
                      return newItem;
                    } catch (error) {
                      lastError = error;
                    }
                  }).reverse().forEach(function (item) {
                    try {
                      item && container.insertAdjacentElement("afterbegin", item);
                    } catch (error) {
                      lastError = error;
                    }
                  }); // update script


                  _toConsumableArray(container.querySelectorAll("script")).map(function (oriItem) {
                    try {
                      oriItem.remove();
                      var newItem = document.createElement("script");
                      oriItem.getAttributeNames().forEach(function (attr) {
                        return newItem.setAttribute(attr, oriItem.getAttribute(attr));
                      });
                      var filePath = String(newItem.getAttribute("src"));

                      if (filePath) {
                        if (filePath.indexOf("://") < 0 && !filePath.startsWith("/")) {
                          newItem.setAttribute("src", "/.pwa.vir/".concat(packageName, "/").concat(entryFolder, "/").concat(filePath));
                        }
                      }

                      newItem.innerHTML = oriItem.innerHTML;
                      return newItem;
                    } catch (error) {
                      lastError = error;
                    }
                  }).forEach(function (item) {
                    try {
                      item && container.append(item);
                    } catch (error) {
                      lastError = error;
                    }
                  });

                  _this2[$pkgRec] = packageName;
                  _context3.next = 110;
                  break;

                case 106:
                  _context3.prev = 106;
                  _context3.t13 = _context3["catch"](89);
                  lastError = _context3.t13;
                  context = undefined;

                case 110:
                  context ? lastError ? console.warn("Load \"".concat(packageName, "\" finished with exception"), lastError) : console.log("Load \"".concat(packageName, "\" success")) : (tip$2("Fail in loading package! ".concat(lastError ? "\n".concat(lastError.message) : ""), {
                    type: "error",
                    closable: true,
                    timeout: 1000
                  }), console.error("Load \"".concat(packageName, "\" failed"), lastError));

                case 111:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[10, 19], [23, 84], [89, 106]]);
        }))();
      }
    });

    function pwaMain() {
      window["$aw"] = AppWorker;
      window["$wa"] = WelcomeApp;
      console.log("$[PWA Start]");
      window["$tip"] = tip$1;
      window["$tip"]["WaitTip"] = WaitTip;
      WaitTip();
      WelcomeApp().refresh();
      window["$package"] = PackageManager();
    }

    AppWorker.start("./sw.js").then(pwaMain)["catch"](function (error) {
      console.error("$[Service worker registration failed]", error);
    });

}));
//# sourceMappingURL=app.js.map
