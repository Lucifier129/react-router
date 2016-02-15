webpackJsonp([29],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactAddonsCssTransitionGroup = __webpack_require__(59);
	
	var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);
	
	var _reactRouter = __webpack_require__(2);
	
	__webpack_require__(109);
	
	var App = (function (_React$Component) {
	  _inherits(App, _React$Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  App.prototype.render = function render() {
	    var pathname = this.props.location.pathname;
	
	    // Only take the first-level part of the path as key, instead of the whole path.
	    var key = pathname.split('/')[1] || 'root';
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/page1' },
	            'Page 1'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/page2' },
	            'Page 2'
	          )
	        )
	      ),
	      _react2['default'].createElement(
	        _reactAddonsCssTransitionGroup2['default'],
	        {
	          component: 'div', transitionName: 'swap',
	          transitionEnterTimeout: 500, transitionLeaveTimeout: 500
	        },
	        _react2['default'].cloneElement(this.props.children || _react2['default'].createElement('div', null), { key: key })
	      )
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	var Page1 = (function (_React$Component2) {
	  _inherits(Page1, _React$Component2);
	
	  function Page1() {
	    _classCallCheck(this, Page1);
	
	    _React$Component2.apply(this, arguments);
	  }
	
	  Page1.prototype.render = function render() {
	    var pathname = this.props.location.pathname;
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'Image' },
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'Page 1'
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/page1/tab1' },
	            'Tab 1'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/page1/tab2' },
	            'Tab 2'
	          )
	        )
	      ),
	      _react2['default'].createElement(
	        _reactAddonsCssTransitionGroup2['default'],
	        {
	          component: 'div', transitionName: 'example',
	          transitionEnterTimeout: 500, transitionLeaveTimeout: 500
	        },
	        _react2['default'].cloneElement(this.props.children || _react2['default'].createElement('div', null), { key: pathname })
	      )
	    );
	  };
	
	  return Page1;
	})(_react2['default'].Component);
	
	var Page2 = (function (_React$Component3) {
	  _inherits(Page2, _React$Component3);
	
	  function Page2() {
	    _classCallCheck(this, Page2);
	
	    _React$Component3.apply(this, arguments);
	  }
	
	  Page2.prototype.render = function render() {
	    var pathname = this.props.location.pathname;
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'Image' },
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'Page 2'
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/page2/tab1' },
	            'Tab 1'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/page2/tab2' },
	            'Tab 2'
	          )
	        )
	      ),
	      _react2['default'].createElement(
	        _reactAddonsCssTransitionGroup2['default'],
	        {
	          component: 'div', transitionName: 'example',
	          transitionEnterTimeout: 500, transitionLeaveTimeout: 500
	        },
	        _react2['default'].cloneElement(this.props.children || _react2['default'].createElement('div', null), { key: pathname })
	      )
	    );
	  };
	
	  return Page2;
	})(_react2['default'].Component);
	
	var Tab1 = (function (_React$Component4) {
	  _inherits(Tab1, _React$Component4);
	
	  function Tab1() {
	    _classCallCheck(this, Tab1);
	
	    _React$Component4.apply(this, arguments);
	  }
	
	  Tab1.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      { className: 'Image' },
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Tab 1'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	      )
	    );
	  };
	
	  return Tab1;
	})(_react2['default'].Component);
	
	var Tab2 = (function (_React$Component5) {
	  _inherits(Tab2, _React$Component5);
	
	  function Tab2() {
	    _classCallCheck(this, Tab2);
	
	    _React$Component5.apply(this, arguments);
	  }
	
	  Tab2.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      { className: 'Image' },
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Tab 2'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	      )
	    );
	  };
	
	  return Tab2;
	})(_react2['default'].Component);
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(
	      _reactRouter.Route,
	      { path: 'page1', component: Page1 },
	      _react2['default'].createElement(_reactRouter.Route, { path: 'tab1', component: Tab1 }),
	      _react2['default'].createElement(_reactRouter.Route, { path: 'tab2', component: Tab2 })
	    ),
	    _react2['default'].createElement(
	      _reactRouter.Route,
	      { path: 'page2', component: Page2 },
	      _react2['default'].createElement(_reactRouter.Route, { path: 'tab1', component: Tab1 }),
	      _react2['default'].createElement(_reactRouter.Route, { path: 'tab2', component: Tab2 })
	    )
	  )
	), document.getElementById('example'));

/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react/lib/ReactCSSTransitionGroup\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(110);
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

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(62)();
	// imports
	
	
	// module
	exports.push([module.id, ".Image {\r\n  position: absolute;\r\n  height: 400px;\r\n  width: 400px;\r\n}\r\n\r\n.swap-enter {\r\n  opacity: 0.01;\r\n  transform: translateX(5em);\r\n  transition: all .5s ease-in;\r\n}\r\n\r\n.swap-enter.swap-enter-active {\r\n  opacity: 1;\r\n  transform: translateX(0);\r\n}\r\n\r\n.swap-leave {\r\n  opacity: 1;\r\n  transform: translateX(0);\r\n  transition: all .5s ease-in;\r\n}\r\n\r\n.swap-leave.swap-leave-active {\r\n  opacity: 0;\r\n  transform: translateX(-5em);\r\n}\r\n\r\n.example-enter {\r\n  opacity: 0.01;\r\n  transition: opacity .5s ease-in;\r\n}\r\n\r\n.example-enter.example-enter-active {\r\n  opacity: 1;\r\n}\r\n\r\n.example-leave {\r\n  opacity: 1;\r\n  transition: opacity .5s ease-in;\r\n}\r\n\r\n.example-leave.example-leave-active {\r\n  opacity: 0;\r\n}\r\n", ""]);
	
	// exports


/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9uZXN0ZWQtYW5pbWF0aW9ucy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4uL34vcmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwL2luZGV4LmpzPzU0OGYiLCJ3ZWJwYWNrOi8vLy4uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanM/NDJjYioqIiwid2VicGFjazovLy8uLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/ZTc5ZioqIiwid2VicGFjazovLy8uL25lc3RlZC1hbmltYXRpb25zL2FwcC5jc3M/ZjEwNSIsIndlYnBhY2s6Ly8vLi9uZXN0ZWQtYW5pbWF0aW9ucy9hcHAuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7cUNBQ0YsQ0FBVzs7MERBQ0UsRUFBbUM7Ozs7d0NBQ25CLENBQWM7O3FCQUMzRCxHQUFXOztLQUVaLEdBQUc7YUFBSCxHQUFHOztZQUFILEdBQUc7MkJBQUgsR0FBRzs7Ozs7QUFBSCxNQUFHLFdBQ1AsTUFBTSxxQkFBRztTQUNDLFFBQVEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBaEMsUUFBUTs7O0FBR2hCLFNBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTTs7QUFFNUMsWUFDRTs7O09BQ0U7OztTQUNFOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsUUFBUTs7WUFBYztVQUFLO1NBQ3hDOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsUUFBUTs7WUFBYztVQUFLO1FBQ3JDO09BQ0w7OztBQUNFLG9CQUFTLEVBQUMsS0FBSyxFQUFDLGNBQWMsRUFBQyxNQUFNO0FBQ3JDLGlDQUFzQixFQUFFLEdBQUksRUFBQyxzQkFBc0IsRUFBRSxHQUFJOztTQUV4RCxtQkFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLEtB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O0FBQ0E7QUFDQSxpQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEU7Ozs7Ozs7QUNwQkE7QUFDQTs7O0FBR0E7QUFDQSxtQ0FBa0MseUJBQXlCLG9CQUFvQixtQkFBbUIsS0FBSyxxQkFBcUIsb0JBQW9CLGlDQUFpQyxrQ0FBa0MsS0FBSyx1Q0FBdUMsaUJBQWlCLCtCQUErQixLQUFLLHFCQUFxQixpQkFBaUIsK0JBQStCLGtDQUFrQyxLQUFLLHVDQUF1QyxpQkFBaUIsa0NBQWtDLEtBQUssd0JBQXdCLG9CQUFvQixzQ0FBc0MsS0FBSyw2Q0FBNkMsaUJBQWlCLEtBQUssd0JBQXdCLGlCQUFpQixzQ0FBc0MsS0FBSyw2Q0FBNkMsaUJBQWlCLEtBQUs7O0FBRWh6QiIsImZpbGUiOiJuZXN0ZWQtYW5pbWF0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xyXG5pbXBvcnQgUmVhY3RDU1NUcmFuc2l0aW9uR3JvdXAgZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJ1xyXG5pbXBvcnQgeyBicm93c2VySGlzdG9yeSwgUm91dGVyLCBSb3V0ZSwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcclxuaW1wb3J0ICcuL2FwcC5jc3MnXHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHRoaXMucHJvcHMubG9jYXRpb25cclxuXHJcbiAgICAvLyBPbmx5IHRha2UgdGhlIGZpcnN0LWxldmVsIHBhcnQgb2YgdGhlIHBhdGggYXMga2V5LCBpbnN0ZWFkIG9mIHRoZSB3aG9sZSBwYXRoLlxyXG4gICAgY29uc3Qga2V5ID0gcGF0aG5hbWUuc3BsaXQoJy8nKVsxXSB8fCAncm9vdCdcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi9wYWdlMVwiPlBhZ2UgMTwvTGluaz48L2xpPlxyXG4gICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL3BhZ2UyXCI+UGFnZSAyPC9MaW5rPjwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgICA8UmVhY3RDU1NUcmFuc2l0aW9uR3JvdXBcclxuICAgICAgICAgIGNvbXBvbmVudD1cImRpdlwiIHRyYW5zaXRpb25OYW1lPVwic3dhcFwiXHJcbiAgICAgICAgICB0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXs1MDB9IHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9ezUwMH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4gfHwgPGRpdiAvPiwgeyBrZXk6IGtleSB9KX1cclxuICAgICAgICA8L1JlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2UxIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSB0aGlzLnByb3BzLmxvY2F0aW9uXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJJbWFnZVwiPlxyXG4gICAgICAgIDxoMT5QYWdlIDE8L2gxPlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi9wYWdlMS90YWIxXCI+VGFiIDE8L0xpbms+PC9saT5cclxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi9wYWdlMS90YWIyXCI+VGFiIDI8L0xpbms+PC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICAgIDxSZWFjdENTU1RyYW5zaXRpb25Hcm91cFxyXG4gICAgICAgICAgY29tcG9uZW50PVwiZGl2XCIgdHJhbnNpdGlvbk5hbWU9XCJleGFtcGxlXCJcclxuICAgICAgICAgIHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9ezUwMH0gdHJhbnNpdGlvbkxlYXZlVGltZW91dD17NTAwfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbiB8fCA8ZGl2Lz4sIHsga2V5OiBwYXRobmFtZSB9KX1cclxuICAgICAgICA8L1JlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFBhZ2UyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSB0aGlzLnByb3BzLmxvY2F0aW9uXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJJbWFnZVwiPlxyXG4gICAgICAgIDxoMT5QYWdlIDI8L2gxPlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi9wYWdlMi90YWIxXCI+VGFiIDE8L0xpbms+PC9saT5cclxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi9wYWdlMi90YWIyXCI+VGFiIDI8L0xpbms+PC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICAgIDxSZWFjdENTU1RyYW5zaXRpb25Hcm91cFxyXG4gICAgICAgICAgY29tcG9uZW50PVwiZGl2XCIgdHJhbnNpdGlvbk5hbWU9XCJleGFtcGxlXCJcclxuICAgICAgICAgIHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9ezUwMH0gdHJhbnNpdGlvbkxlYXZlVGltZW91dD17NTAwfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIHtSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbiB8fCA8ZGl2Lz4sIHsga2V5OiBwYXRobmFtZSB9KX1cclxuICAgICAgICA8L1JlYWN0Q1NTVHJhbnNpdGlvbkdyb3VwPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFRhYjEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSW1hZ2VcIj5cclxuICAgICAgICA8aDI+VGFiIDE8L2gyPlxyXG4gICAgICAgIDxwPkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LCBzZWQgZG8gZWl1c21vZCB0ZW1wb3IgaW5jaWRpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1YS4gVXQgZW5pbSBhZCBtaW5pbSB2ZW5pYW0sIHF1aXMgbm9zdHJ1ZCBleGVyY2l0YXRpb24gdWxsYW1jbyBsYWJvcmlzIG5pc2kgdXQgYWxpcXVpcCBleCBlYSBjb21tb2RvIGNvbnNlcXVhdC4gRHVpcyBhdXRlIGlydXJlIGRvbG9yIGluIHJlcHJlaGVuZGVyaXQgaW4gdm9sdXB0YXRlIHZlbGl0IGVzc2UgY2lsbHVtIGRvbG9yZSBldSBmdWdpYXQgbnVsbGEgcGFyaWF0dXIuIEV4Y2VwdGV1ciBzaW50IG9jY2FlY2F0IGN1cGlkYXRhdCBub24gcHJvaWRlbnQsIHN1bnQgaW4gY3VscGEgcXVpIG9mZmljaWEgZGVzZXJ1bnQgbW9sbGl0IGFuaW0gaWQgZXN0IGxhYm9ydW0uPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFRhYjIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSW1hZ2VcIj5cclxuICAgICAgICA8aDI+VGFiIDI8L2gyPlxyXG4gICAgICAgIDxwPkNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQsIHNlZCBkbyBlaXVzbW9kIHRlbXBvciBpbmNpZGlkdW50IHV0IGxhYm9yZSBldCBkb2xvcmUgbWFnbmEgYWxpcXVhLiBVdCBlbmltIGFkIG1pbmltIHZlbmlhbSwgcXVpcyBub3N0cnVkIGV4ZXJjaXRhdGlvbiB1bGxhbWNvIGxhYm9yaXMgbmlzaSB1dCBhbGlxdWlwIGV4IGVhIGNvbW1vZG8gY29uc2VxdWF0LiBEdWlzIGF1dGUgaXJ1cmUgZG9sb3IgaW4gcmVwcmVoZW5kZXJpdCBpbiB2b2x1cHRhdGUgdmVsaXQgZXNzZSBjaWxsdW0gZG9sb3JlIGV1IGZ1Z2lhdCBudWxsYSBwYXJpYXR1ci4gRXhjZXB0ZXVyIHNpbnQgb2NjYWVjYXQgY3VwaWRhdGF0IG5vbiBwcm9pZGVudCwgc3VudCBpbiBjdWxwYSBxdWkgb2ZmaWNpYSBkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS48L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxucmVuZGVyKChcclxuICA8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cclxuICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17QXBwfT5cclxuICAgICAgPFJvdXRlIHBhdGg9XCJwYWdlMVwiIGNvbXBvbmVudD17UGFnZTF9PlxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwidGFiMVwiIGNvbXBvbmVudD17VGFiMX0gLz5cclxuICAgICAgICA8Um91dGUgcGF0aD1cInRhYjJcIiBjb21wb25lbnQ9e1RhYjJ9IC8+XHJcbiAgICAgIDwvUm91dGU+XHJcbiAgICAgIDxSb3V0ZSBwYXRoPVwicGFnZTJcIiBjb21wb25lbnQ9e1BhZ2UyfT5cclxuICAgICAgICA8Um91dGUgcGF0aD1cInRhYjFcIiBjb21wb25lbnQ9e1RhYjF9IC8+XHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0YWIyXCIgY29tcG9uZW50PXtUYWIyfSAvPlxyXG4gICAgICA8L1JvdXRlPlxyXG4gICAgPC9Sb3V0ZT5cclxuICA8L1JvdXRlcj5cclxuKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKSlcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9uZXN0ZWQtYW5pbWF0aW9ucy9hcHAuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdENTU1RyYW5zaXRpb25Hcm91cCcpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9yZWFjdC1hZGRvbnMtY3NzLXRyYW5zaXRpb24tZ3JvdXAvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDI5XG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDYyXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgMTIgMjggMjkgMzAgMzNcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQoKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KCkge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRoZWFkLmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KCk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDYzXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgMTIgMjggMjkgMzAgMzNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vYXBwLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9uZXN0ZWQtYW5pbWF0aW9ucy9hcHAuY3NzXG4gKiogbW9kdWxlIGlkID0gMTA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDI5XG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuSW1hZ2Uge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgaGVpZ2h0OiA0MDBweDtcXHJcXG4gIHdpZHRoOiA0MDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnN3YXAtZW50ZXIge1xcclxcbiAgb3BhY2l0eTogMC4wMTtcXHJcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg1ZW0pO1xcclxcbiAgdHJhbnNpdGlvbjogYWxsIC41cyBlYXNlLWluO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dhcC1lbnRlci5zd2FwLWVudGVyLWFjdGl2ZSB7XFxyXFxuICBvcGFjaXR5OiAxO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dhcC1sZWF2ZSB7XFxyXFxuICBvcGFjaXR5OiAxO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcclxcbiAgdHJhbnNpdGlvbjogYWxsIC41cyBlYXNlLWluO1xcclxcbn1cXHJcXG5cXHJcXG4uc3dhcC1sZWF2ZS5zd2FwLWxlYXZlLWFjdGl2ZSB7XFxyXFxuICBvcGFjaXR5OiAwO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01ZW0pO1xcclxcbn1cXHJcXG5cXHJcXG4uZXhhbXBsZS1lbnRlciB7XFxyXFxuICBvcGFjaXR5OiAwLjAxO1xcclxcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuNXMgZWFzZS1pbjtcXHJcXG59XFxyXFxuXFxyXFxuLmV4YW1wbGUtZW50ZXIuZXhhbXBsZS1lbnRlci1hY3RpdmUge1xcclxcbiAgb3BhY2l0eTogMTtcXHJcXG59XFxyXFxuXFxyXFxuLmV4YW1wbGUtbGVhdmUge1xcclxcbiAgb3BhY2l0eTogMTtcXHJcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjVzIGVhc2UtaW47XFxyXFxufVxcclxcblxcclxcbi5leGFtcGxlLWxlYXZlLmV4YW1wbGUtbGVhdmUtYWN0aXZlIHtcXHJcXG4gIG9wYWNpdHk6IDA7XFxyXFxufVxcclxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9jc3MtbG9hZGVyIS4vbmVzdGVkLWFuaW1hdGlvbnMvYXBwLmNzc1xuICoqIG1vZHVsZSBpZCA9IDExMFxuICoqIG1vZHVsZSBjaHVua3MgPSAyOVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=