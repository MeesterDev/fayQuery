;(function(){
	/** @export */
	function $(m) {
		return $.$(document, m);
	}

	/** @export */
	$.$ = function(el, m) {
		if (m instanceof HTMLElement) {
			return new $.CustomList([m]);
		} else if ((m instanceof Array) || (m instanceof HTMLCollection) || (m instanceof NodeList)) {
			return new $.CustomList(m);
		}
		var r = el.querySelectorAll(m);
		return new $.CustomList(r);
	}

	/** @constructor */
	$.CustomList = function(list) {
		for (var i = 0; i < list.length; i++) {
			this[i] = list[i];
		}
		this.length = list.length;
	}

	/* DEFAULT MANIPULATION FUNCTIONS */

	/** @export */
	$.CustomList.prototype.get = function(p) { //Returns the property for the first item in the list (regardless of whether it is defined or not)
		if (this.length > 0) {
			return this[0][p];
		} else {
			return undefined;
		}
	}

	/** @export */
	$.CustomList.prototype.getAttribute = function(p) { //Returns the attribute for the first item in the list (regardless of whether it is defined or not)
		if (this.length > 0) {
			return this[0].getAttribute(p);
		} else {
			return undefined;
		}
	}

	/** @export */
	$.CustomList.prototype.set = function(p, v) {
		for (var i = 0; i < this.length; i++) {
			this[i][p] = v;
		}
		return this;
	}

	/** @export */
	$.CustomList.prototype.setAttribute = function(p, v) {
		for (var i = 0; i < this.length; i++) {
			this[i].setAttribute(p, v);
		}
		return this;
	}

	/** @export */
	$.CustomList.prototype.append = function(p, v) {
		for (var i = 0; i < this.length; i++) {
			var cv = this[i][p]
			this[i][p] = (typeof cv === 'undefined') ? v : cv + v;
		}
		return this;
	}

	/** @export */
	$.CustomList.prototype.appendAttribute = function(p, v) {
		for (var i = 0; i < this.length; i++) {
			var cv = this[i].getAttribute(v);
			this[i].setAttribute(p, (typeof cv === 'string') ? cv + v : v);
		}
		return this;
	}

	/** @export */
	$.CustomList.prototype.setStyle = function(s) {
		if ((s instanceof String) || (typeof s === "string")) {
			for (var i = 0; i < this.length; i++) {
				this[i].style.cssText += ";" + s;
			}
		} else {
			for (var i = 0; i < this.length; i++) {
				for (var p in s) {
					this[i].style[p] = s[p];
				}
			}
		}
		return this;
	}

	/** @export */
	$.CustomList.prototype.setInnerHTML = function(s) {
		for (var i = 0; i < this.length; i++) {
			this[i].innerHTML = s;
		}
		return this;
	}

	/** @export */
	$.CustomList.prototype.addEventListener = function() {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener(arguments[0], arguments[1], arguments[2], arguments[3]);
		}
		return this;
	}

	/** @export */
	$.CustomList.prototype.removeEventListener = function() {
		for (var i = 0; i < this.length; i++) {
			this[i].removeEventListener(arguments[0], arguments[1], arguments[2], arguments[3]);
		}
		return this;
	}

	$.remove = function(el) {
		if (el.parentNode) {
			el.parentNode.removeChild(el);
		}
	}

	/** @export */
	$.CustomList.prototype.remove = function() {
		for (var i = 0; i < this.length; i++) {
			$.remove(this[i]);
		}

		return this;
	}

	$.hasClass = function(el, c) {
		return el.classList.contains(c);
	}

	/** @export */
	$.CustomList.prototype.hasClass = function(c) {
		for (var i = 0; i < this.length; i++) {
			if ($.hasClass(this[i], c)) {
				return true;
			}
		}

		return false;
	}

	/** @export */
	$.CustomList.prototype.allHaveClass = function(c) {
		for (var i = 0; i < this.length; i++) {
			if (!$.hasClass(this[i], c)) {
				return false;
			}
		}

		return true;
	}

	$.addClass = function(el, c) {
		el.classList.add(c);
	}

	/** @export */
	$.CustomList.prototype.addClass = function(c) {
		for (var i = 0; i < this.length; i++) {
			$.addClass(this[i], c);
		}
		return this;
	}

	$.removeClass = function(el, c) {
		el.classList.remove(c); 
	}

	/** @export */
	$.CustomList.prototype.removeClass = function(c) {
		for (var i=0; i < this.length; i++) {
			$.removeClass(this[i], c);
		}
		return this;
	}

	$.toggleClass = function(el, c) {
		el.classList.toggle(c);
	}

	/** @export */
	$.CustomList.prototype.toggleClass = function(c) {
		for (var i=0; i < this.length; i++) {
			$.toggleClass(this[i], c);
		}
		return this;
	}

	/** @export */
	$.CustomList.prototype.run = function(f) {
		var args = Array.prototype.slice.call(arguments, 1);
		args.push(0);
		for (var i = 0; i < this.length; i++) {
			args[args.length-1] = i;
			f.apply(this[i], args);
		}
		return this;
	}

	/** @export */
	$.CustomList.prototype.each = function(f) {
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < this.length; i++) {
			if (f.apply(this[i], args) === false) {
				break;
			}
		}
		return this;
	}

	$.getText = function(el) {
		return el.innerText || el.textContent;
	}

	/** @export */
	$.CustomList.prototype.getText = function() {
		if (this.length > 0) {
			return $.getText(this[0]);
		} else {
			return undefined;
		}
	}

	window.fayQuery = $;
	if (!('$' in window)) {
		window.$ = $;
	}

	window.getFayQuery = function() {
		return $;
	}
})();