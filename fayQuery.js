//Aimed at Chrome (last 2 to 3 years), firefox (last 2 to 3 years), IE9+, Opera 10+, Safari 4+
//Some specific functions may require a newer browser
//The idea behind this library is not to provide cross-browser stuff, but to make a very light library with as little extra code to support older browsers
//As of now the only cross-browser code present is the dataset generation for IE9 and 10.

/* CORE */

function $(m) {
	return $.$(document, m);
}

$.$ = function(el, m) {
	if (m instanceof HTMLElement) {
		return new $.CustomList([m]);
	} else if ((m instanceof Array) || (m instanceof HTMLCollection) || (m instanceof NodeList)) {
		return new $.CustomList(m);
	}
	var r = el.querySelectorAll(m);
	for (var i = 0; i < r.length; i++) {
		if (!r[i].dataset) {
			r[i].dataset = $.createDataSet(r[i]);
		}
	}
	return new $.CustomList(r);
}

//Alas, normal datasets are supported only in IE11+, so we still have some code for older browsers
$.createDataSet = function(el) { //generate the dataset (just an object, not a string map)
	var r = {}
	for (var i = 0; i < el.attributes.length; i++) {
		if (el.attributes[i].name.substring(0, 5) == "data-") {
			var n = el.attributes[i].name.substring(5),
			m = n.match(/-(.)/);
			while (m != null) {
				n = n.replace(m[0], m[1].toUpperCase());
				m = n.match(/-(.)/);
			}
			r[n] = el.attributes[i].value;
		}
	}
	return r;
}

$.CustomList = function(list) {
	for (var i = 0; i < list.length; i++) {
		this[i] = list[i];
	}
	this.length = list.length;
}

/* DEFAULT MANIPULATION FUNCTIONS */
//Probably something like Chrome 1+, Firefox 1+, IE9+, Opera 7+, Safari 1+

$.CustomList.prototype.get = function(p) { //Returns the property for the first item in the NodeList (regardless of whether it is defined or not)
	if (this.length > 0) {
		return this[0][p];
	} else {
		return undefined;
	}
}

$.CustomList.prototype.set = function(p, v) {
	for (var i = 0; i < this.length; i++) {
		this[i][p] = v;
	}
	return this;
}

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
}

$.CustomList.prototype.setInnerHTML = function(s) {
	for (var i = 0; i < this.length; i++) {
		this[i].innerHTML = s;
	}
	return this;
}

$.CustomList.prototype.addEventListener = function() {
	for (var i = 0; i < this.length; i++) {
		this[i].addEventListener(arguments[0], arguments[1], arguments[2], arguments[3]);
	}
	return this;
}

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

$.CustomList.prototype.remove = function() {
	for (var i = 0; i < this.length; i++) {
		$.remove(this[i]);
	}

	return this;
}

$.hasClass = function(el, c) {
	return el.className.search(new RegExp('\\b'+c+'\\b', "g")) != -1;
}

$.CustomList.prototype.hasClass = function(c) {
	for (var i = 0; i < this.length; i++) {
		if ($.hasClass(this[i], c)) {
			return true;
		}
	}

	return false;
}

$.CustomList.prototype.allHaveClass = function(c) {
	for (var i = 0; i < this.length; i++) {
		if (!$.hasClass(this[i], c)) {
			return false;
		}
	}

	return true;
}

$.addClass = function(el, c) {
	if (el.className.search(new RegExp('\\b'+c+'\\b', "g")) == -1) {
		el.className += " "+c;
	}
}

$.CustomList.prototype.addClass = function(c) {
	for (var i = 0; i < this.length; i++) {
		$.addClass(this[i], c);
	}
	return this;
}

$.removeClass = function(el, c) {
	el.className = el.className.replace(new RegExp(' ?\\b'+c+'\\b', 'g'), ''); 
}

$.CustomList.prototype.removeClass = function(c) {
	for (var i=0; i < this.length; i++) {
		$.removeClass(this[i], c);
	}
	return this;
}

$.toggleClass = function(el, c) {
	if ($.hasClass(el, c)) {
		$.removeClass(el, c);
	} else {
		$.addClass(el, c);
	}
}

$.CustomList.prototype.toggleClass = function(c) {
	for (var i=0; i < this.length; i++) {
		$.toggleClass(this[i], c);
	}
	return this;
}

$.CustomList.prototype.run = function(f) {
	var args = Array.prototype.slice.call(arguments, 1), r;
	args.push(0);
	for (var i = 0; i < this.length; i++) {
		args[args.length-1] = i;
		r = f.apply(this[i], args);
	}
	return this;
}

$.CustomList.prototype.each = function(f) {
	var args = Array.prototype.slice.call(arguments, 1), r;
	for (var i = 0; i < this.length; i++) {
		if (f.apply(this[i], args) === false) {
			break;
		}
	}
	return this;
}

$.getText = function(el) {
	return el.innerText || (document.createTextNode(el.innerHTML.replace(/<br>/g, String.fromCharCode(13, 10)))).textContent;
}

$.CustomList.prototype.getText = function() {
	if (this.length > 0) {
		return $.getText(this[0]);
	} else {
		return undefined;
	}
}

/* REQUEST */
//Chrome 1+, Firefox 1+, IE7+, Opera, Safari 1.2+
//with FormData or HTMLFormElement: Chrome 6+, Firefox 4+, IE10+, Opera 12+, Safari?

$.toQueryString = function(obj) {
	var parts = [];
	for (var property in obj) {
		if (obj.hasOwnProperty(property)) {
			parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
		}
	}

	return parts.join('&');
}

$.Request = function(url, method, data, doneHandler, failedHandler, finalFailedHandler, callBeforeSend, uploadProgressHandler, progressHandler) {
	this.xhr = new XMLHttpRequest();
	this.xhr.open(method, url, true);

	if (typeof data === 'object') {
		if ((!FormData) || !(data instanceof FormData)) {
			data = $.toQueryString(data);
			this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
	} else if (data instanceof HTMLFormElement) {
		if (FormData) {
			data = new FormData(data);
		} else {
			console.error('I require FormData for this method.');
		}
	}

	var _this = this;
	this.xhr.onreadystatechange = function(e) {
		if (_this.xhr.readyState == 4) {
			if (_this.xhr.status == 200) {
				doneHandler(e, _this.xhr);
			} else if (typeof failedHandler === "function") {
				failedHandler(e, _this.xhr);
			} else if (failedHandler > 0) {
				_this.resend(url, method, data, doneHandler, failedHandler-1, finalFailedHandler, callBeforeSend, uploadProgressHandler, progressHandler);
			} else {
				finalFailedHandler(e, _this.xhr);
			}
		}
	}

	if (typeof uploadProgressHandler === 'function') {
		this.xhr.upload.addEventListener("progress", uploadProgressHandler);
	}
	if (typeof uploadHandler === 'function') {
		this.xhr.upload.addEventListener("progress", uploadHandler);
	}
	
	if (typeof callBeforeSend === "function") {
		callBeforeSend(this.xhr, data);
	}
	this.xhr.send(data);
}

$.Request.prototype.abort = function() {
	this.xhr.abort();
}

$.Request.prototype.resend = function(url, method, data, doneHandler, failedHandler, finalFailedHandler, callBeforeSend, uploadProgressHandler, progressHandler) {
	this.xhr = new XMLHttpRequest();
	this.xhr.open(method, url, true);

	var _this = this;
	this.xhr.onreadystatechange = function(e) {
		if (_this.xhr.readyState == 4) {
			if (_this.xhr.status == 200) {
				doneHandler(e, _this.xhr);
			} else if (typeof failedHandler === "function") {
				failedHandler(e, _this.xhr);
			} else if (failedHandler > 0) {
				_this.resend(url, method, data, doneHandler, failedHandler-1, finalFailedHandler, callBeforeSend, uploadProgressHandler, progressHandler);
			} else {
				finalFailedHandler(e, _this.xhr);
			}
		}
	}

	if (typeof uploadProgressHandler === 'function') {
		this.xhr.upload.addEventListener("progress", uploadProgressHandler);
	}
	if (typeof uploadHandler === 'function') {
		this.xhr.upload.addEventListener("progress", uploadHandler);
	}

	if (typeof callBeforeSend === "function") {
		callBeforeSend(this.xhr, data);
	}
	this.xhr.send(data);
}
