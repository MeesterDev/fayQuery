;(function(){
	/** @export */
	function $(sourceOrSelector) {
		return $.$(document, sourceOrSelector);
	}

	/** @export */
	$.$ = function(base, sourceOrSelector) {
        if (sourceOrSelector instanceof HTMLElement) {
            return new $.FayQuery([sourceOrSelector]);
        } else if (typeof sourceOrSelector === 'string') {
            return new $.FayQuery(base.querySelectorAll(sourceOrSelector));
        } else if (isArraySource(sourceOrSelector)) {
			return new $.FayQuery(sourceOrSelector);
		} else if ('from' in Array && typeof Array.from === 'function') {
            return new $.FayQuery(Array.from(sourceOrSelector));
        }

        console.warn("Cannot reliably determine how to make a list from", sourceOrSelector);

		return new $.FayQuery([]);
	}

	function isArraySource(source) {
		return Array.isArray(source)
			|| (source instanceof HTMLCollection)
			|| (source instanceof NodeList);
	}

	/**
     * @constructor
     * @export
     */
	$.FayQuery = function(list) {
		for (var i = 0; i < list.length; i++) {
			this[i] = list[i];
		}
		this.length = list.length;
	}

	/** @export */
	$.FayQuery.prototype.get = function(prop) {
		if (this.length > 0) {
			return this[0][prop];
		}

		return undefined;
	}

	/** @export */
	$.FayQuery.prototype.getAttribute = function(name) {
		if (this.length > 0) {
			return this[0].getAttribute(name);
		}

		return undefined;
	}

	/** @export */
	$.FayQuery.prototype.set = function(prop, value) {
		for (var i = 0; i < this.length; i++) {
			this[i][prop] = value;
		}

		return this;
	}

	/** @export */
	$.FayQuery.prototype.setAttribute = function(prop, value) {
		for (var i = 0; i < this.length; i++) {
			this[i].setAttribute(prop, value);
		}

		return this;
	}

	/** @export */
	$.FayQuery.prototype.setStyle = function(styleObject) {
        for (var i = 0; i < this.length; i++) {
            for (var prop in styleObject) {
                if (styleObject.hasOwnProperty(prop)) {
                    this[i].style[prop] = styleObject[prop];
                }
            }
        }

		return this;
	}

	/** @export */
	$.FayQuery.prototype.setInnerHTML = function(s) {
		for (var i = 0; i < this.length; i++) {
			this[i].innerHTML = s;
		}

		return this;
	}

	/** @export */
	$.FayQuery.prototype.addEventListener = function() {
		for (var i = 0; i < this.length; i++) {
            this[i].addEventListener.apply(this[i], arguments);
		}
		return this;
	}

	/** @export */
	$.FayQuery.prototype.removeEventListener = function() {
		for (var i = 0; i < this.length; i++) {
            this[i].removeEventListener.apply(this[i], arguments);
		}
		return this;
	}

    /** @export */
	$.remove = function(element) {
		if (element.parentNode) {
			element.parentNode.removeChild(element);
		}
	}

	/** @export */
	$.FayQuery.prototype.remove = function() {
		for (var i = 0; i < this.length; i++) {
			$.remove(this[i]);
		}

		return this;
	}

    /** @export */
	$.hasClass = function(element, className) {
		return element.classList.contains(className);
	}

	/** @export */
	$.FayQuery.prototype.hasClass = function(className) {
		for (var i = 0; i < this.length; i++) {
			if ($.hasClass(this[i], className)) {
				return true;
			}
		}

		return false;
	}

	/** @export */
	$.FayQuery.prototype.allHaveClass = function(className) {
		for (var i = 0; i < this.length; i++) {
			if (!$.hasClass(this[i], className)) {
				return false;
			}
		}

		return true;
	}

    /** @export */
	$.addClass = function(element, className) {
		element.classList.add(className);
	}

	/** @export */
	$.FayQuery.prototype.addClass = function(className) {
		for (var i = 0; i < this.length; i++) {
			$.addClass(this[i], className);
		}
		return this;
	}

    /** @export */
	$.removeClass = function(element, className) {
		element.classList.remove(className);
	}

	/** @export */
	$.FayQuery.prototype.removeClass = function(className) {
		for (var i=0; i < this.length; i++) {
			$.removeClass(this[i], className);
		}
		return this;
	}

    /** @export */
	$.toggleClass = function(element, className) {
        element.classList.toggle(className);
	}

	/** @export */
	$.FayQuery.prototype.toggleClass = function(className) {
		for (var i=0; i < this.length; i++) {
			$.toggleClass(this[i], className);
		}
		return this;
	}

	/** @export */
	$.FayQuery.prototype.each = function(callback) {
		var args = Array.prototype.slice.call(arguments, 1);
		args.push(0);

		for (var i = 0; i < this.length; i++) {
			args[args.length-1] = i;
            if (callback.apply(this[i], args) === false) {
                break;
            }
		}

		return this;
	}

    /** @export */
	$.getText = function(element) {
		return element.innerText || element.textContent;
	}

	/** @export */
	$.FayQuery.prototype.getText = function() {
		if (this.length > 0) {
			return $.getText(this[0]);
		}

		return undefined;
	}

	window['fayQuery'] = $;
	if (!('$' in window)) {
		window['$'] = $;
	}

	window['getFayQuery'] = function() {
		return $;
	}
})();