webpackJsonp([28],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactRouter = __webpack_require__(2);
	
	var _ContactStore = __webpack_require__(106);
	
	var _ContactStore2 = _interopRequireDefault(_ContactStore);
	
	__webpack_require__(107);
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
	  getInitialState: function getInitialState() {
	    return {
	      contacts: _ContactStore2['default'].getContacts(),
	      loading: true
	    };
	  },
	
	  componentWillMount: function componentWillMount() {
	    _ContactStore2['default'].init();
	  },
	
	  componentDidMount: function componentDidMount() {
	    _ContactStore2['default'].addChangeListener(this.updateContacts);
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    _ContactStore2['default'].removeChangeListener(this.updateContacts);
	  },
	
	  updateContacts: function updateContacts() {
	    if (!this.isMounted()) return;
	
	    this.setState({
	      contacts: _ContactStore2['default'].getContacts(),
	      loading: false
	    });
	  },
	
	  render: function render() {
	    var contacts = this.state.contacts.map(function (contact) {
	      return _react2['default'].createElement(
	        'li',
	        { key: contact.id },
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/contact/' + contact.id },
	          contact.first
	        )
	      );
	    });
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'App' },
	      _react2['default'].createElement(
	        'div',
	        { className: 'ContactList' },
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/contact/new' },
	          'New Contact'
	        ),
	        _react2['default'].createElement(
	          'ul',
	          null,
	          contacts
	        )
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: 'Content' },
	        this.props.children
	      )
	    );
	  }
	});
	
	var Index = _react2['default'].createClass({
	  displayName: 'Index',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'h1',
	      null,
	      'Address Book'
	    );
	  }
	});
	
	var Contact = _react2['default'].createClass({
	  displayName: 'Contact',
	
	  getStateFromStore: function getStateFromStore(props) {
	    var _ref = props ? props.params : this.props.params;
	
	    var id = _ref.id;
	
	    return {
	      contact: _ContactStore2['default'].getContact(id)
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return this.getStateFromStore();
	  },
	
	  componentDidMount: function componentDidMount() {
	    _ContactStore2['default'].addChangeListener(this.updateContact);
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    _ContactStore2['default'].removeChangeListener(this.updateContact);
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState(this.getStateFromStore(nextProps));
	  },
	
	  updateContact: function updateContact() {
	    if (!this.isMounted()) return;
	
	    this.setState(this.getStateFromStore());
	  },
	
	  destroy: function destroy() {
	    var id = this.props.params.id;
	
	    _ContactStore2['default'].removeContact(id);
	    this.props.router.push('/');
	  },
	
	  render: function render() {
	    var contact = this.state.contact || {};
	    var name = contact.first + ' ' + contact.last;
	    var avatar = contact.avatar || 'http://placecage.com/50/50';
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'Contact' },
	      _react2['default'].createElement('img', { height: '50', src: avatar, key: avatar }),
	      _react2['default'].createElement(
	        'h3',
	        null,
	        name
	      ),
	      _react2['default'].createElement(
	        'button',
	        { onClick: this.destroy },
	        'Delete'
	      )
	    );
	  }
	});
	
	var NewContact = _react2['default'].createClass({
	  displayName: 'NewContact',
	
	  createContact: function createContact(event) {
	    var _this = this;
	
	    event.preventDefault();
	
	    _ContactStore2['default'].addContact({
	      first: _reactDom.findDOMNode(this.refs.first).value,
	      last: _reactDom.findDOMNode(this.refs.last).value
	    }, function (contact) {
	      _this.props.router.push('/contact/' + contact.id);
	    });
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'form',
	      { onSubmit: this.createContact },
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement('input', { type: 'text', ref: 'first', placeholder: 'First name' }),
	        _react2['default'].createElement('input', { type: 'text', ref: 'last', placeholder: 'Last name' })
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement(
	          'button',
	          { type: 'submit' },
	          'Save'
	        ),
	        ' ',
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/' },
	          'Cancel'
	        )
	      )
	    );
	  }
	});
	
	var NotFound = _react2['default'].createClass({
	  displayName: 'NotFound',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'h2',
	      null,
	      'Not found'
	    );
	  }
	});
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.IndexRoute, { component: Index }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'contact/new', component: NewContact }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'contact/:id', component: Contact }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '*', component: NotFound })
	  )
	), document.getElementById('example'));

/***/ },

/***/ 62:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 106:
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var API = 'http://addressbook-api.herokuapp.com/contacts';
	
	var _contacts = {};
	var _initCalled = false;
	var _changeListeners = [];
	
	var ContactStore = {
	
	  init: function init() {
	    if (_initCalled) return;
	
	    _initCalled = true;
	
	    getJSON(API, function (err, res) {
	      res.contacts.forEach(function (contact) {
	        _contacts[contact.id] = contact;
	      });
	
	      ContactStore.notifyChange();
	    });
	  },
	
	  addContact: function addContact(contact, cb) {
	    postJSON(API, { contact: contact }, function (res) {
	      _contacts[res.contact.id] = res.contact;
	      ContactStore.notifyChange();
	      if (cb) cb(res.contact);
	    });
	  },
	
	  removeContact: function removeContact(id, cb) {
	    deleteJSON(API + '/' + id, cb);
	    delete _contacts[id];
	    ContactStore.notifyChange();
	  },
	
	  getContacts: function getContacts() {
	    var array = [];
	
	    for (var id in _contacts) {
	      array.push(_contacts[id]);
	    }return array;
	  },
	
	  getContact: function getContact(id) {
	    return _contacts[id];
	  },
	
	  notifyChange: function notifyChange() {
	    _changeListeners.forEach(function (listener) {
	      listener();
	    });
	  },
	
	  addChangeListener: function addChangeListener(listener) {
	    _changeListeners.push(listener);
	  },
	
	  removeChangeListener: function removeChangeListener(listener) {
	    _changeListeners = _changeListeners.filter(function (l) {
	      return listener !== l;
	    });
	  }
	
	};
	
	localStorage.token = localStorage.token || Date.now() * Math.random();
	
	function getJSON(url, cb) {
	  var req = new XMLHttpRequest();
	  req.onload = function () {
	    if (req.status === 404) {
	      cb(new Error('not found'));
	    } else {
	      cb(null, JSON.parse(req.response));
	    }
	  };
	  req.open('GET', url);
	  req.setRequestHeader('authorization', localStorage.token);
	  req.send();
	}
	
	function postJSON(url, obj, cb) {
	  var req = new XMLHttpRequest();
	  req.onload = function () {
	    cb(JSON.parse(req.response));
	  };
	  req.open('POST', url);
	  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	  req.setRequestHeader('authorization', localStorage.token);
	  req.send(JSON.stringify(obj));
	}
	
	function deleteJSON(url, cb) {
	  var req = new XMLHttpRequest();
	  req.onload = cb;
	  req.open('DELETE', url);
	  req.setRequestHeader('authorization', localStorage.token);
	  req.send();
	}
	
	exports['default'] = ContactStore;
	module.exports = exports['default'];

/***/ },

/***/ 107:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(108);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(63)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./app.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(62)();
	// imports
	
	
	// module
	exports.push([module.id, "body {\r\n  font-family: \"Helvetica Neue\", Arial;\r\n  font-weight: 200;\r\n}\r\n\r\na {\r\n  color: hsl(200, 50%, 50%);\r\n}\r\n\r\na.active {\r\n  color: hsl(20, 50%, 50%);\r\n}\r\n\r\n#example {\r\n  position: absolute;\r\n}\r\n\r\n.App {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  width: 500px;\r\n  height: 500px;\r\n}\r\n\r\n.ContactList {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n  width: 300px;\r\n  overflow: auto;\r\n  padding: 20px;\r\n}\r\n\r\n.Content {\r\n  position: absolute;\r\n  left: 300px;\r\n  top: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  border-left: 1px solid #ccc;\r\n  overflow: auto;\r\n  padding: 40px;\r\n}\r\n\r\n", ""]);
	
	// exports


/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9tYXN0ZXItZGV0YWlsL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcz80MmNiKiIsIndlYnBhY2s6Ly8vLi4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzP2U3OWYqIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL21hc3Rlci1kZXRhaWwvQ29udGFjdFN0b3JlLmpzIiwid2VicGFjazovLy8uL21hc3Rlci1kZXRhaWwvYXBwLmNzcz9lMTgyIiwid2VicGFjazovLy8uL21hc3Rlci1kZXRhaWwvYXBwLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7cUNBQ1csQ0FBVzs7d0NBQ2lCLENBQWM7O3lDQUNyRCxHQUFnQjs7OztxQkFDbEMsR0FBVzs7QUFFbEIsS0FBTSxHQUFHLEdBQUcsbUJBQU0sV0FBVyxDQUFDOzs7QUFDNUIsa0JBQWUsNkJBQUc7QUFDaEIsWUFBTztBQUNMLGVBQVEsRUFBRSwwQkFBYSxXQUFXLEVBQUU7QUFDcEMsY0FBTyxFQUFFLElBQUk7TUFDZDtJQUNGOztBQUVELHFCQUFrQixnQ0FBRztBQUNuQiwrQkFBYSxJQUFJLEVBQUU7SUFDcEI7O0FBRUQsb0JBQWlCLCtCQUFHO0FBQ2xCLCtCQUFhLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDcEQ7O0FBRUQsdUJBQW9CLGtDQUFHO0FBQ3JCLCtCQUFhLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDdkQ7O0FBRUQsaUJBQWMsNEJBQUc7QUFDZixTQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUNuQixPQUFNOztBQUVSLFNBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixlQUFRLEVBQUUsMEJBQWEsV0FBVyxFQUFFO0FBQ3BDLGNBQU8sRUFBRSxL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QUF5QixjQUFjLGFBQWEsZ0JBQWdCLG1CQUFtQixxQkFBcUIsb0JBQW9CLEtBQUssa0JBQWtCLHlCQUF5QixrQkFBa0IsYUFBYSxnQkFBZ0IsZUFBZSxrQ0FBa0MscUJBQXFCLG9CQUFvQixLQUFLOztBQUVodUIiLCJmaWxlIjoibWFzdGVyLWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgcmVuZGVyLCBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSdcclxuaW1wb3J0IHsgYnJvd3Nlckhpc3RvcnksIFJvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXHJcbmltcG9ydCBDb250YWN0U3RvcmUgZnJvbSAnLi9Db250YWN0U3RvcmUnXHJcbmltcG9ydCAnLi9hcHAuY3NzJ1xyXG5cclxuY29uc3QgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNvbnRhY3RzOiBDb250YWN0U3RvcmUuZ2V0Q29udGFjdHMoKSxcclxuICAgICAgbG9hZGluZzogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIENvbnRhY3RTdG9yZS5pbml0KClcclxuICB9LFxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIENvbnRhY3RTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLnVwZGF0ZUNvbnRhY3RzKVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgQ29udGFjdFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMudXBkYXRlQ29udGFjdHMpXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlQ29udGFjdHMoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNNb3VudGVkKCkpXHJcbiAgICAgIHJldHVyblxyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjb250YWN0czogQ29udGFjdFN0b3JlLmdldENvbnRhY3RzKCksXHJcbiAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IGNvbnRhY3RzID0gdGhpcy5zdGF0ZS5jb250YWN0cy5tYXAoZnVuY3Rpb24gKGNvbnRhY3QpIHtcclxuICAgICAgcmV0dXJuIDxsaSBrZXk9e2NvbnRhY3QuaWR9PjxMaW5rIHRvPXtgL2NvbnRhY3QvJHtjb250YWN0LmlkfWB9Pntjb250YWN0LmZpcnN0fTwvTGluaz48L2xpPlxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkFwcFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGFjdExpc3RcIj5cclxuICAgICAgICAgIDxMaW5rIHRvPVwiL2NvbnRhY3QvbmV3XCI+TmV3IENvbnRhY3Q8L0xpbms+XHJcbiAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgIHtjb250YWN0c31cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250ZW50XCI+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KVxyXG5cclxuY29uc3QgSW5kZXggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIDxoMT5BZGRyZXNzIEJvb2s8L2gxPlxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IENvbnRhY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGdldFN0YXRlRnJvbVN0b3JlKHByb3BzKSB7XHJcbiAgICBjb25zdCB7IGlkIH0gPSBwcm9wcyA/IHByb3BzLnBhcmFtcyA6IHRoaXMucHJvcHMucGFyYW1zXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29udGFjdDogQ29udGFjdFN0b3JlLmdldENvbnRhY3QoaWQpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGVGcm9tU3RvcmUoKVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgQ29udGFjdFN0b3JlLmFkZENoYW5nZUxpc3RlbmVyKHRoaXMudXBkYXRlQ29udGFjdClcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIENvbnRhY3RTdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLnVwZGF0ZUNvbnRhY3QpXHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5nZXRTdGF0ZUZyb21TdG9yZShuZXh0UHJvcHMpKVxyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZUNvbnRhY3QoKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNNb3VudGVkKCkpXHJcbiAgICAgIHJldHVyblxyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5nZXRTdGF0ZUZyb21TdG9yZSgpKVxyXG4gIH0sXHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBjb25zdCB7IGlkIH0gPSB0aGlzLnByb3BzLnBhcmFtc1xyXG4gICAgQ29udGFjdFN0b3JlLnJlbW92ZUNvbnRhY3QoaWQpXHJcbiAgICB0aGlzLnByb3BzLnJvdXRlci5wdXNoKCcvJylcclxuICB9LFxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBjb250YWN0ID0gdGhpcy5zdGF0ZS5jb250YWN0IHx8IHt9XHJcbiAgICBjb25zdCBuYW1lID0gY29udGFjdC5maXJzdCArICcgJyArIGNvbnRhY3QubGFzdFxyXG4gICAgY29uc3QgYXZhdGFyID0gY29udGFjdC5hdmF0YXIgfHwgJ2h0dHA6Ly9wbGFjZWNhZ2UuY29tLzUwLzUwJ1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGFjdFwiPlxyXG4gICAgICAgIDxpbWcgaGVpZ2h0PVwiNTBcIiBzcmM9e2F2YXRhcn0ga2V5PXthdmF0YXJ9IC8+XHJcbiAgICAgICAgPGgzPntuYW1lfTwvaDM+XHJcbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmRlc3Ryb3l9PkRlbGV0ZTwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5jb25zdCBOZXdDb250YWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBjcmVhdGVDb250YWN0KGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgQ29udGFjdFN0b3JlLmFkZENvbnRhY3Qoe1xyXG4gICAgICBmaXJzdDogZmluZERPTU5vZGUodGhpcy5yZWZzLmZpcnN0KS52YWx1ZSxcclxuICAgICAgbGFzdDogZmluZERPTU5vZGUodGhpcy5yZWZzLmxhc3QpLnZhbHVlXHJcbiAgICB9LCAoY29udGFjdCkgPT4ge1xyXG4gICAgICB0aGlzLnByb3BzLnJvdXRlci5wdXNoKGAvY29udGFjdC8ke2NvbnRhY3QuaWR9YClcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuY3JlYXRlQ29udGFjdH0+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9XCJmaXJzdFwiIHBsYWNlaG9sZGVyPVwiRmlyc3QgbmFtZVwiIC8+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWY9XCJsYXN0XCIgcGxhY2Vob2xkZXI9XCJMYXN0IG5hbWVcIiAvPlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8cD5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj4gPExpbmsgdG89XCIvXCI+Q2FuY2VsPC9MaW5rPlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IE5vdEZvdW5kID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiA8aDI+Tm90IGZvdW5kPC9oMj5cclxuICB9XHJcbn0pXHJcblxyXG5yZW5kZXIoKFxyXG4gIDxSb3V0ZXIgaGlzdG9yeT17YnJvd3Nlckhpc3Rvcnl9PlxyXG4gICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtBcHB9PlxyXG4gICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0luZGV4fSAvPlxyXG4gICAgICA8Um91dGUgcGF0aD1cImNvbnRhY3QvbmV3XCIgY29tcG9uZW50PXtOZXdDb250YWN0fSAvPlxyXG4gICAgICA8Um91dGUgcGF0aD1cImNvbnRhY3QvOmlkXCIgY29tcG9uZW50PXtDb250YWN0fSAvPlxyXG4gICAgICA8Um91dGUgcGF0aD1cIipcIiBjb21wb25lbnQ9e05vdEZvdW5kfSAvPlxyXG4gICAgPC9Sb3V0ZT5cclxuICA8L1JvdXRlcj5cclxuKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKSlcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9tYXN0ZXItZGV0YWlsL2FwcC5qc1xuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA2MlxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDEyIDI4IDI5IDMwIDMzXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KCkge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCgpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudCgpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA2M1xuICoqIG1vZHVsZSBjaHVua3MgPSAxIDEyIDI4IDI5IDMwIDMzXG4gKiovIiwiY29uc3QgQVBJID0gJ2h0dHA6Ly9hZGRyZXNzYm9vay1hcGkuaGVyb2t1YXBwLmNvbS9jb250YWN0cydcclxuXHJcbmxldCBfY29udGFjdHMgPSB7fVxyXG5sZXQgX2luaXRDYWxsZWQgPSBmYWxzZVxyXG5sZXQgX2NoYW5nZUxpc3RlbmVycyA9IFtdXHJcblxyXG5jb25zdCBDb250YWN0U3RvcmUgPSB7XHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChfaW5pdENhbGxlZClcclxuICAgICAgcmV0dXJuXHJcblxyXG4gICAgX2luaXRDYWxsZWQgPSB0cnVlXHJcblxyXG4gICAgZ2V0SlNPTihBUEksIGZ1bmN0aW9uIChlcnIsIHJlcykge1xyXG4gICAgICByZXMuY29udGFjdHMuZm9yRWFjaChmdW5jdGlvbiAoY29udGFjdCkge1xyXG4gICAgICAgIF9jb250YWN0c1tjb250YWN0LmlkXSA9IGNvbnRhY3RcclxuICAgICAgfSlcclxuXHJcbiAgICAgIENvbnRhY3RTdG9yZS5ub3RpZnlDaGFuZ2UoKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBhZGRDb250YWN0OiBmdW5jdGlvbiAoY29udGFjdCwgY2IpIHtcclxuICAgIHBvc3RKU09OKEFQSSwgeyBjb250YWN0OiBjb250YWN0IH0sIGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgX2NvbnRhY3RzW3Jlcy5jb250YWN0LmlkXSA9IHJlcy5jb250YWN0XHJcbiAgICAgIENvbnRhY3RTdG9yZS5ub3RpZnlDaGFuZ2UoKVxyXG4gICAgICBpZiAoY2IpIGNiKHJlcy5jb250YWN0KVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICByZW1vdmVDb250YWN0OiBmdW5jdGlvbiAoaWQsIGNiKSB7XHJcbiAgICBkZWxldGVKU09OKEFQSSArICcvJyArIGlkLCBjYilcclxuICAgIGRlbGV0ZSBfY29udGFjdHNbaWRdXHJcbiAgICBDb250YWN0U3RvcmUubm90aWZ5Q2hhbmdlKClcclxuICB9LFxyXG5cclxuICBnZXRDb250YWN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgYXJyYXkgPSBbXVxyXG5cclxuICAgIGZvciAoY29uc3QgaWQgaW4gX2NvbnRhY3RzKVxyXG4gICAgICBhcnJheS5wdXNoKF9jb250YWN0c1tpZF0pXHJcblxyXG4gICAgcmV0dXJuIGFycmF5XHJcbiAgfSxcclxuXHJcbiAgZ2V0Q29udGFjdDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICByZXR1cm4gX2NvbnRhY3RzW2lkXVxyXG4gIH0sXHJcblxyXG4gIG5vdGlmeUNoYW5nZTogZnVuY3Rpb24gKCkge1xyXG4gICAgX2NoYW5nZUxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xyXG4gICAgICBsaXN0ZW5lcigpXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbiAobGlzdGVuZXIpIHtcclxuICAgIF9jaGFuZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcclxuICB9LFxyXG5cclxuICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24gKGxpc3RlbmVyKSB7XHJcbiAgICBfY2hhbmdlTGlzdGVuZXJzID0gX2NoYW5nZUxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGwpIHtcclxuICAgICAgcmV0dXJuIGxpc3RlbmVyICE9PSBsXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmxvY2FsU3RvcmFnZS50b2tlbiA9IGxvY2FsU3RvcmFnZS50b2tlbiB8fCAoRGF0ZS5ub3coKSpNYXRoLnJhbmRvbSgpKVxyXG5cclxuZnVuY3Rpb24gZ2V0SlNPTih1cmwsIGNiKSB7XHJcbiAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuICByZXEub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHJlcS5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICBjYihuZXcgRXJyb3IoJ25vdCBmb3VuZCcpKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2IobnVsbCwgSlNPTi5wYXJzZShyZXEucmVzcG9uc2UpKVxyXG4gICAgfVxyXG4gIH1cclxuICByZXEub3BlbignR0VUJywgdXJsKVxyXG4gIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdhdXRob3JpemF0aW9uJywgbG9jYWxTdG9yYWdlLnRva2VuKVxyXG4gIHJlcS5zZW5kKClcclxufVxyXG5cclxuZnVuY3Rpb24gcG9zdEpTT04odXJsLCBvYmosIGNiKSB7XHJcbiAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuICByZXEub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY2IoSlNPTi5wYXJzZShyZXEucmVzcG9uc2UpKVxyXG4gIH1cclxuICByZXEub3BlbignUE9TVCcsIHVybClcclxuICByZXEuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpXHJcbiAgcmVxLnNldFJlcXVlc3RIZWFkZXIoJ2F1dGhvcml6YXRpb24nLCBsb2NhbFN0b3JhZ2UudG9rZW4pXHJcbiAgcmVxLnNlbmQoSlNPTi5zdHJpbmdpZnkob2JqKSlcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlSlNPTih1cmwsIGNiKSB7XHJcbiAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuICByZXEub25sb2FkID0gY2JcclxuICByZXEub3BlbignREVMRVRFJywgdXJsKVxyXG4gIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdhdXRob3JpemF0aW9uJywgbG9jYWxTdG9yYWdlLnRva2VuKVxyXG4gIHJlcS5zZW5kKClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGFjdFN0b3JlXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvbWFzdGVyLWRldGFpbC9Db250YWN0U3RvcmUuanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vYXBwLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9tYXN0ZXItZGV0YWlsL2FwcC5jc3NcbiAqKiBtb2R1bGUgaWQgPSAxMDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjhcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6IFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsIEFyaWFsO1xcclxcbiAgZm9udC13ZWlnaHQ6IDIwMDtcXHJcXG59XFxyXFxuXFxyXFxuYSB7XFxyXFxuICBjb2xvcjogaHNsKDIwMCwgNTAlLCA1MCUpO1xcclxcbn1cXHJcXG5cXHJcXG5hLmFjdGl2ZSB7XFxyXFxuICBjb2xvcjogaHNsKDIwLCA1MCUsIDUwJSk7XFxyXFxufVxcclxcblxcclxcbiNleGFtcGxlIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLkFwcCB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDA7XFxyXFxuICBsZWZ0OiAwO1xcclxcbiAgcmlnaHQ6IDA7XFxyXFxuICBib3R0b206IDA7XFxyXFxuICB3aWR0aDogNTAwcHg7XFxyXFxuICBoZWlnaHQ6IDUwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uQ29udGFjdExpc3Qge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgbGVmdDogMDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGJvdHRvbTogMDtcXHJcXG4gIHdpZHRoOiAzMDBweDtcXHJcXG4gIG92ZXJmbG93OiBhdXRvO1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLkNvbnRlbnQge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgbGVmdDogMzAwcHg7XFxyXFxuICB0b3A6IDA7XFxyXFxuICBib3R0b206IDA7XFxyXFxuICByaWdodDogMDtcXHJcXG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgI2NjYztcXHJcXG4gIG92ZXJmbG93OiBhdXRvO1xcclxcbiAgcGFkZGluZzogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2Nzcy1sb2FkZXIhLi9tYXN0ZXItZGV0YWlsL2FwcC5jc3NcbiAqKiBtb2R1bGUgaWQgPSAxMDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMjhcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9