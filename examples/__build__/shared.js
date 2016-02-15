/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		35:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".chunk.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/__build__/";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports) {

	/*!
	 * react-lite.js v0.0.22
	 * (c) 2016 Jade Gu
	 * Released under the MIT License.
	 */
	'use strict';
	
	var VNODE_TYPE = {
		ELEMENT: 1,
		COMPONENT: 2,
		STATELESS_COMPONENT: 3,
		TEXT: 4
	};
	var DIFF_TYPE = {
		CREATE: 1,
		REMOVE: 2,
		REPLACE: 3,
		UPDATE: 4
	};
	
	var COMPONENT_ID = 'liteid';
	
	var isValidElement = function isValidElement(obj) {
		return obj != null && !!obj.vtype;
	};
	
	var cloneElement = function cloneElement(originElem, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}
	
		var type = originElem.type;
		var key = originElem.key;
		var ref = originElem.ref;
	
		props = extend({ key: key, ref: ref }, originElem.props, props);
		var vnode = createElement.apply(undefined, [type, props].concat(children));
		if (vnode.ref === originElem.ref) {
			vnode.refs = originElem.refs;
		}
		return vnode;
	};
	
	var createFactory = function createFactory(type) {
		var factory = function factory() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}
	
			return createElement.apply(undefined, [type].concat(args));
		};
		factory.type = type;
		return factory;
	};
	
	var createElement = function createElement(type, props) {
		for (var _len3 = arguments.length, children = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
			children[_key3 - 2] = arguments[_key3];
		}
	
		var Vnode = undefined;
		switch (true) {
			case isStr(type):
				Vnode = Velem;
				break;
			case isComponent(type):
				Vnode = Vcomponent;
				break;
			case isStatelessComponent(type):
				Vnode = VstatelessComponent;
				break;
			default:
				throw new Error('React.createElement: unexpect type [ ' + type + ' ]');
		}
		var key = null;
		var ref = null;
		var hasRef = false;
		if (props != null) {
			if (!isUndefined(props.key)) {
				key = '' + props.key;
				delete props.key;
			}
			if (!isUndefined(props.ref)) {
				ref = props.ref;
				delete props.ref;
				hasRef = true;
			}
		}
		var vnode = new Vnode(type, mergeProps(props, children, type.defaultProps));
		vnode.key = key;
		vnode.ref = ref;
		if (hasRef && Vnode !== VstatelessComponent) {
			handleVnodeWithRef(vnode);
		}
		return vnode;
	};
	
	var diff = function diff(vnode, newVnode) {
		var type = undefined;
		switch (true) {
			case vnode === newVnode:
				return type;
			case isUndefined(newVnode):
				type = DIFF_TYPE.REMOVE;
				break;
			case isUndefined(vnode):
				type = DIFF_TYPE.CREATE;
				break;
			case vnode.type !== newVnode.type:
				type = DIFF_TYPE.REPLACE;
				break;
			case newVnode.key !== null:
				if (vnode.key === null || newVnode.key !== vnode.key) {
					type = DIFF_TYPE.REPLACE;
				} else {
					type = DIFF_TYPE.UPDATE;
				}
				break;
			case vnode.key !== null:
				type = DIFF_TYPE.REPLACE;
				break;
			default:
				type = DIFF_TYPE.UPDATE;
		}
		return type;
	};
	
	var isType = function isType(type) {
		return function (obj) {
			return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
		};
	};
	var isObj = isType('Object');
	var isStr = isType('String');
	var isFn = isType('Function');
	var isBln = isType('Boolean');
	var isArr = Array.isArray || isType('Array');
	var isUndefined = function isUndefined(obj) {
		return obj === undefined;
	};
	var isComponent = function isComponent(obj) {
		return obj && obj.prototype && 'forceUpdate' in obj.prototype;
	};
	var isStatelessComponent = function isStatelessComponent(obj) {
		return isFn(obj) && (!obj.prototype || !('forceUpdate' in obj.prototype));
	};
	
	var noop$1 = function noop() {};
	var identity = function identity(obj) {
		return obj;
	};
	
	var pipe = function pipe(fn1, fn2) {
		return function () {
			fn1.apply(this, arguments);
			return fn2.apply(this, arguments);
		};
	};
	
	var flattenChildren = function flattenChildren(list, iteratee, record) {
		record = record || { index: 0 };
		for (var i = 0, len = list.length; i < len; i++) {
			var item = list[i];
			if (isArr(item)) {
				flattenChildren(item, iteratee, record);
			} else if (!isUndefined(item) && !isBln(item)) {
				iteratee(item, record.index);
				record.index += 1;
			}
		}
	};
	
	var eachItem = function eachItem(list, iteratee) {
		for (var i = 0, len = list.length; i < len; i++) {
			iteratee(list[i], i);
		}
	};
	
	var mapValue = function mapValue(obj, iteratee) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				iteratee(obj[key], key);
			}
		}
	};
	
	var mapKey = function mapKey(oldObj, newObj, iteratee) {
		var keyMap = {};
		var key;
		for (key in oldObj) {
			if (oldObj.hasOwnProperty(key)) {
				keyMap[key] = true;
				iteratee(key);
			}
		}
		for (key in newObj) {
			if (newObj.hasOwnProperty(key) && keyMap[key] !== true) {
				iteratee(key);
			}
		}
	};
	
	var extend = function extend(target) {
		for (var i = 1, len = arguments.length; i < len; i++) {
			var source = arguments[i];
			if (source != null) {
				for (var key in source) {
					if (source.hasOwnProperty(key) && !isUndefined(source[key])) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};
	
	var uid = 0;
	var getUid = function getUid() {
		return ++uid;
	};
	
	var getChildren = function getChildren(children) {
		var childrenLen = children.length;
		if (childrenLen > 0) {
			if (childrenLen === 1) {
				children = children[0];
			}
			return children;
		}
	};
	var mergeProps = function mergeProps(props, children, defaultProps) {
		var result = extend({}, defaultProps, props);
		children = getChildren(children);
		if (!isUndefined(children)) {
			result.children = children;
		}
		return result;
	};
	
	var ignoreKeys = {
		key: true,
		ref: true,
		children: true
	};
	var EVENT_KEYS = /^on/i;
	var isInnerHTMLKey = function isInnerHTMLKey(key) {
		return key === 'dangerouslySetInnerHTML';
	};
	var isStyleKey = function isStyleKey(key) {
		return key === 'style';
	};
	// Setting .type throws on non-<input> tags
	var isTypeKey = function isTypeKey(key) {
		return key === 'type';
	};
	
	/*
	  DOM Properties which are only getter
	*/
	var readOnlyProps = 'nodeName|nodeValue|nodeType|parentNode|childNodes|classList|firstChild|lastChild|previousSibling|previousElementSibling|nextSibling|nextElementSibling|attributes|ownerDocument|namespaceURI|localName|baseURI|prefix|length|specified|tagName|offsetTop|offsetLeft|offsetWidth|offsetHeight|offsetParent|scrollWidth|scrollHeight|clientTop|clientLeft|clientWidth|clientHeight|x|y';
	var readOnlys = {};
	eachItem(readOnlyProps.split('|'), function (key) {
		readOnlys[key] = true;
	});
	var setProp = function setProp(elem, key, value) {
		switch (true) {
			case ignoreKeys[key] === true:
				break;
			case EVENT_KEYS.test(key):
				addEvent(elem, key, value);
				break;
			case isStyleKey(key):
				setStyle(elem, value);
				break;
			case isInnerHTMLKey(key):
				value && value.__html != null && (elem.innerHTML = value.__html);
				break;
			case key in elem && !isTypeKey(key):
				if (readOnlys[key] !== true && !(key === 'title' && value == null)) {
					elem[key] = value;
				}
				break;
			default:
				elem.setAttribute(key, '' + value);
		}
	};
	var setProps = function setProps(elem, props) {
		mapValue(props, function (value, key) {
			setProp(elem, key, value);
		});
	};
	var removeProps = function removeProps(elem, oldProps) {
		mapValue(oldProps, function (oldValue, key) {
			removeProp(elem, key, oldValue);
		});
	};
	var removeProp = function removeProp(elem, key, oldValue) {
		switch (true) {
			case ignoreKeys[key] === true:
				break;
			case EVENT_KEYS.test(key):
				removeEvent(elem, key);
				break;
			case isStyleKey(key):
				removeStyle(elem, oldValue);
				break;
			case isInnerHTMLKey(key):
				elem.innerHTML = '';
				break;
			case !(key in elem) || isTypeKey(key):
				elem.removeAttribute(key);
				break;
			case isFn(oldValue):
				elem[key] = null;
				break;
			case isStr(oldValue):
				elem[key] = '';
				break;
			case isBln(oldValue):
				elem[key] = false;
				break;
			default:
				try {
					elem[key] = undefined;
					delete elem[key];
				} catch (e) {
					//pass
				}
		}
	};
	
	// use dom prop to compare new prop
	var shouldUseDOMProp = {
		value: true,
		checked: true
	};
	
	var patchProps = function patchProps(elem, props, newProps) {
		if (props === newProps) {
			return;
		}
		if (!props && newProps) {
			setProps(elem, newProps);
			return;
		} else if (!newProps && props) {
			removeProps(elem, props);
			return;
		}
	
		mapKey(props, newProps, function (key) {
			if (ignoreKeys[key] === true) {
				return;
			}
			var value = newProps[key];
			var oldValue = shouldUseDOMProp[key] == true ? elem[key] : props[key];
			if (value === oldValue) {
				return;
			}
			if (isUndefined(value)) {
				removeProp(elem, key, oldValue);
				return;
			}
			if (isStyleKey(key)) {
				patchStyle(elem, oldValue, value);
			} else if (isInnerHTMLKey(key)) {
				var oldHtml = oldValue && oldValue.__html;
				var html = value && value.__html;
				if (html != null && html !== oldHtml) {
					elem.innerHTML = html;
				}
			} else {
				setProp(elem, key, value);
			}
		});
	};
	
	var removeStyle = function removeStyle(elem, style) {
		if (!isObj(style)) {
			return;
		}
		var elemStyle = elem.style;
		mapValue(style, function (_, key) {
			elemStyle[key] = '';
		});
	};
	var setStyle = function setStyle(elem, style) {
		if (!isObj(style)) {
			return;
		}
		var elemStyle = elem.style;
		mapValue(style, function (value, key) {
			setStyleValue(elemStyle, key, value);
		});
	};
	var patchStyle = function patchStyle(elem, style, newStyle) {
		if (style === newStyle) {
			return;
		}
		if (!newStyle && style) {
			removeStyle(elem, style);
		} else if (newStyle && !style) {
			setStyle(elem, newStyle);
		} else {
			var elemStyle = elem.style;
			mapKey(style, newStyle, function (key) {
				var value = newStyle[key];
				var oldValue = style[key];
				if (value !== oldValue) {
					setStyleValue(elemStyle, key, value);
				}
			});
		}
	};
	
	var isUnitlessNumber = {
		animationIterationCount: true,
		boxFlex: true,
		boxFlexGroup: true,
		boxOrdinalGroup: true,
		columnCount: true,
		flex: true,
		flexGrow: true,
		flexPositive: true,
		flexShrink: true,
		flexNegative: true,
		flexOrder: true,
		fontWeight: true,
		lineClamp: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		tabSize: true,
		widows: true,
		zIndex: true,
		zoom: true,
	
		// SVG-related properties
		fillOpacity: true,
		stopOpacity: true,
		strokeDashoffset: true,
		strokeOpacity: true,
		strokeWidth: true
	};
	
	var isUnitlessNumberWithPrefix = {};
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	var prefixKey = function prefixKey(prefix, key) {
		return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	};
	mapValue(isUnitlessNumber, function (_, prop) {
		eachItem(prefixes, function (prefix) {
			return isUnitlessNumberWithPrefix[prefixKey(prefix, prop)] = true;
		});
	});
	mapValue(isUnitlessNumberWithPrefix, function (value, key) {
		isUnitlessNumber[key] = value;
	});
	
	var RE_NUMBER = /^-?\d+(\.\d+)?$/;
	var setStyleValue = function setStyleValue(style, key, value) {
		if (value == null || isBln(value)) {
			value = '';
		}
		if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
			style[key] = value + 'px';
		} else {
			style[key] = value;
		}
	};
	
	if (!Object.freeze) {
		Object.freeze = identity;
	}
	
	function Vtree(properties) {
		extend(this, properties);
	}
	
	var noop$2 = noop$1;
	var getDOMNode = function getDOMNode() {
		return this;
	};
	Vtree.prototype = {
		attachRef: function attachRef(refValue) {
			var refKey = this.ref;
			var refs = this.refs;
			var vtype = this.vtype;
	
			if (!refs || refKey == null || !refValue) {
				return;
			}
			if (refValue.nodeName) {
				// support react v0.13 style: this.refs.myInput.getDOMNode()
				refValue.getDOMNode = getDOMNode;
			}
			if (isFn(refKey)) {
				refKey(refValue);
			} else {
				refs[refKey] = refValue;
			}
		},
		detachRef: function detachRef() {
			var refKey = this.ref;
			var refs = this.refs;
	
			if (!refs || refKey == null) {
				return;
			}
			if (isFn(refKey)) {
				refKey(null);
			} else {
				delete refs[refKey];
			}
		},
		updateRef: function updateRef(newVtree, refValue) {
			if (!this.refs) {
				newVtree.attachRef(refValue);
				return;
			}
			if (!newVtree.refs) {
				this.detachRef();
				return;
			}
			if (this.refs !== newVtree.refs) {
				this.detachRef();
				newVtree.attachRef(refValue);
				return;
			}
			var oldRef = this.ref;
			var newRef = newVtree.ref;
			if (newRef == null) {
				this.detachRef();
			} else if (oldRef !== newRef) {
				this.detachRef();
				newVtree.attachRef(refValue);
			}
		},
		updateTree: function updateTree(node, newVtree, parentNode, parentContext) {
			var newNode = node;
			switch (diff(this, newVtree)) {
				case DIFF_TYPE.CREATE:
					newNode = newVtree.initTree(parentNode, parentContext);
					break;
				case DIFF_TYPE.REMOVE:
					this.destroyTree(node);
					break;
				case DIFF_TYPE.REPLACE:
					var $removeNode = removeNode;
					removeNode = noop$2;
					this.destroyTree(node);
					removeNode = $removeNode;
					newNode = newVtree.initTree(function (nextNode) {
						return parentNode.replaceChild(nextNode, node);
					}, parentContext);
					break;
				case DIFF_TYPE.UPDATE:
					newNode = this.update(node, newVtree, parentNode, parentContext);
					break;
			}
			return newNode;
		}
	};
	
	function Vtext(text) {
		this.text = text;
	}
	
	Vtext.prototype = new Vtree({
		vtype: VNODE_TYPE.TEXT,
		attachRef: noop$2,
		detachRef: noop$2,
		updateRef: noop$2,
		update: function update(node, nextVtext) {
			if (nextVtext.text !== this.text) {
				node.replaceData(0, node.length, nextVtext.text);
			}
			return node;
		},
		initTree: function initTree(parentNode) {
			var node = document.createTextNode(this.text);
			appendNode(parentNode, node);
			return node;
		},
		destroyTree: function destroyTree(node) {
			removeNode(node);
		}
	});
	
	function Velem(type, props) {
		this.type = type;
		this.props = props;
	}
	
	var getInnerHTML = function getInnerHTML(props) {
		var innerHTMLObj = props.dangerouslySetInnerHTML;
		return innerHTMLObj && innerHTMLObj.__html;
	};
	Velem.prototype = new Vtree({
		vtype: VNODE_TYPE.ELEMENT,
		eachChildren: function eachChildren(iteratee) {
			var children = this.props.children;
	
			var newChildren = undefined;
			if (this.sorted) {
				eachItem(children, iteratee);
				return;
			}
			// the default children often be nesting array, make it flat and cache
			if (isArr(children)) {
				newChildren = [];
				flattenChildren(children, function (vchild, index) {
					vchild = getVnode(vchild);
					iteratee(vchild, index);
					newChildren.push(vchild);
				});
				this.props.children = newChildren;
				this.sorted = true;
			} else if (!isUndefined(children)) {
				children = this.props.children = getVnode(children);
				iteratee(children, 0);
			}
		},
		initTree: function initTree(parentNode, parentContext) {
			var type = this.type;
			var props = this.props;
	
			var node = document.createElement(type);
			setProps(node, props);
			this.eachChildren(function (vchild) {
				vchild.initTree(node, parentContext);
			});
			appendNode(parentNode, node);
			this.attachRef(node);
			return node;
		},
		destroyTree: function destroyTree(node) {
			var childNodes = [];
			for (var i = 0, len = node.childNodes.length; i < len; i++) {
				childNodes.push(node.childNodes[i]);
			}
			this.eachChildren(function (vchild, index) {
				vchild.destroyTree(childNodes[index]);
			});
			this.detachRef();
			removeNode(node);
		},
		update: function update(node, newVelem, parentNode, parentContext) {
			var props = this.props;
	
			var newProps = newVelem.props;
			var oldHtml = getInnerHTML(props);
			if (oldHtml == null) {
				var children = !isUndefined(props.children) ? props.children : [];
				if (!isArr(children)) {
					children = [children];
				}
				var count = 0;
				var childNodes = node.childNodes;
				newVelem.eachChildren(function (newVchild, index) {
					count += 1;
					var vchild = children[index];
					if (vchild) {
						vchild.updateTree(childNodes[index], newVchild, node, parentContext);
					} else {
						newVchild.initTree(node, parentContext);
					}
				});
				var childrenLen = children.length;
				// destroy old children not in the newChildren
				while (childrenLen > count) {
					childrenLen -= 1;
					children[childrenLen].destroyTree(childNodes[childrenLen]);
				}
				patchProps(node, props, newProps);
			} else {
				patchProps(node, props, newProps);
				newVelem.eachChildren(function (newVchild) {
					return newVchild.initTree(node, parentContext);
				});
			}
			this.updateRef(newVelem, node);
			return node;
		}
	});
	
	function VstatelessComponent(type, props) {
		this.type = type;
		this.props = props;
		this.id = getUid();
	}
	
	VstatelessComponent.prototype = new Vtree({
		vtype: VNODE_TYPE.STATELESS_COMPONENT,
		attachRef: noop$2,
		detachRef: noop$2,
		updateRef: noop$2,
		renderTree: function renderTree(parentContext) {
			var factory = this.type;
			var props = this.props;
	
			var componentContext = getContextByTypes(parentContext, factory.contextTypes);
			var vtree = factory(props, componentContext);
			if (vtree && vtree.render) {
				vtree = vtree.render();
			}
			return getVnode(vtree);
		},
		initTree: function initTree(parentNode, parentContext) {
			var vtree = this.renderTree(parentContext);
			var node = vtree.initTree(parentNode, parentContext);
			node.cache = node.cache || {};
			node.cache[this.id] = vtree;
			return node;
		},
		destroyTree: function destroyTree(node) {
			var id = this.id;
			var vtree = node.cache[id];
			delete node.cache[id];
			vtree.destroyTree(node);
		},
		update: function update(node, newVstatelessComponent, parentNode, parentContext) {
			var id = this.id;
			var vtree = node.cache[id];
			delete node.cache[id];
			var newVtree = newVstatelessComponent.renderTree(parentContext);
			var newNode = vtree.updateTree(node, newVtree, parentNode, parentContext);
			newNode.cache = newNode.cache || {};
			newNode.cache[newVstatelessComponent.id] = newVtree;
			if (newNode !== node) {
				extend(newNode.cache, node.cache);
			}
			return newNode;
		}
	});
	
	var setRefs = noop$2;
	var handleVnodeWithRef = function handleVnodeWithRef(vnode) {
		setRefs(vnode);
	};
	var getContextByTypes = function getContextByTypes(curContext, contextTypes) {
		var context = {};
		if (!contextTypes || !curContext) {
			return context;
		}
		for (var key in contextTypes) {
			if (contextTypes.hasOwnProperty(key)) {
				context[key] = curContext[key];
			}
		}
		return context;
	};
	
	var bindRefs = function bindRefs(refs) {
		return function (vnode) {
			vnode.refs = vnode.refs || refs;
		};
	};
	
	var renderComponent = function renderComponent(component, parentContext) {
		setRefs = bindRefs(component.refs);
		var vtree = component.render();
		if (isUndefined(vtree)) {
			throw new Error('component can not render undefined');
		}
		vtree = getVnode(vtree);
		var curContext = component.getChildContext();
		if (curContext) {
			curContext = extend({}, parentContext, curContext);
		} else {
			curContext = parentContext;
		}
		vtree.context = curContext;
		setRefs = noop$2;
		return vtree;
	};
	
	var didMountComponents = [];
	var callDidMount = function callDidMount(store) {
		return store.vcomponent.didMount(store.node);
	};
	var clearDidMount = function clearDidMount() {
		var components = didMountComponents;
		if (components.length === 0) {
			return;
		}
		didMountComponents = [];
		eachItem(components, callDidMount);
	};
	
	function Vcomponent(type, props) {
		this.type = type;
		this.props = props;
		this.id = getUid();
	}
	
	Vcomponent.prototype = new Vtree({
		vtype: VNODE_TYPE.COMPONENT,
		initTree: function initTree(parentNode, parentContext) {
			var Component = this.type;
			var props = this.props;
			var id = this.id;
	
			var componentContext = getContextByTypes(parentContext, Component.contextTypes);
			var component = new Component(props, componentContext);
			var updater = component.$updater;
			var cache = component.$cache;
	
			cache.parentContext = parentContext;
			updater.isPending = true;
			component.props = component.props || props;
			component.componentWillMount();
			updatePropsAndState(component, component.props, updater.getState(), component.context);
			var vtree = renderComponent(component, parentContext);
			var node = vtree.initTree(parentNode, vtree.context);
			node.cache = node.cache || {};
			node.cache[id] = component;
			cache.vtree = vtree;
			cache.node = node;
			cache.isMounted = true;
			didMountComponents.push({ node: node, vcomponent: this });
			return node;
		},
		didMount: function didMount(node) {
			var component = node.cache[this.id];
			var updater = component.$updater;
			component.componentDidMount();
			updater.isPending = false;
			this.attachRef(component);
			updater.emitUpdate();
		},
		destroyTree: function destroyTree(node) {
			var id = this.id;
			var component = node.cache[id];
			var cache = component.$cache;
			delete node.cache[id];
			this.detachRef();
			component.setState = noop$2;
			component.componentWillUnmount();
			cache.vtree.destroyTree(node);
			delete component.setState;
			cache.isMounted = false;
			cache.node = cache.parentContext = cache.vtree = component.refs = component.context = null;
		},
		update: function update(node, newVtree, parentNode, parentContext) {
			var id = this.id;
			var component = node.cache[id];
			var updater = component.$updater;
			var cache = component.$cache;
			var Component = newVtree.type;
			var nextProps = newVtree.props;
	
			var componentContext = getContextByTypes(parentContext, Component.contextTypes);
			delete node.cache[id];
			node.cache[newVtree.id] = component;
			cache.parentContext = parentContext;
			updater.isPending = true;
			component.componentWillReceiveProps(nextProps, componentContext);
			updater.isPending = false;
			updater.emitUpdate(nextProps, componentContext);
			this.updateRef(newVtree, component);
			return cache.node;
		}
	});
	
	var removeNode = function removeNode(node) {
		// if node.parentNode had set innerHTML, do nothing
		if (node && node.parentNode) {
			node.parentNode.removeChild(node);
		}
	};
	var appendNode = function appendNode(parentNode, node) {
		// for replacing node
		if (isFn(parentNode)) {
			parentNode(node);
		} else {
			parentNode.appendChild(node);
		}
	};
	
	var getVnode = function getVnode(vnode) {
		if (vnode === null) {
			vnode = new Velem('noscript', {});
		} else if (!isValidElement(vnode)) {
			vnode = new Vtext(vnode);
		}
		return vnode;
	};
	
	var updateQueue = {
		updaters: [],
		isPending: false,
		add: function add(updater) {
			/*
	   event bubbles from bottom-level to top-level
	   reverse the updater order can merge some props and state and reduce the refresh times
	   see Updater.update method below to know why
	  */
			this.updaters.splice(0, 0, updater);
		},
		batchUpdate: function batchUpdate() {
			this.isPending = true;
			/*
	    each updater.update may add new updater to updateQueue
	    clear them with a loop
	  */
			while (this.updaters.length) {
				var updaters = this.updaters;
	
				this.updaters = [];
				eachItem(updaters, triggerUpdate);
			}
			this.isPending = false;
		}
	};
	var triggerUpdate = function triggerUpdate(updater) {
		return updater.update();
	};
	
	function Updater(instance) {
		this.instance = instance;
		this.pendingStates = [];
		this.pendingCallbacks = [];
		this.isPending = false;
		this.nextProps = this.nextContext = null;
		this.clearCallbacks = this.clearCallbacks.bind(this);
	}
	
	Updater.prototype = {
		emitUpdate: function emitUpdate(nextProps, nextContext) {
			this.nextProps = nextProps;
			this.nextContext = nextContext;
			// receive nextProps!! should update immediately
			nextProps || !updateQueue.isPending ? this.update() : updateQueue.add(this);
		},
		update: function update() {
			var instance = this.instance;
			var pendingStates = this.pendingStates;
			var nextProps = this.nextProps;
			var nextContext = this.nextContext;
	
			if (nextProps || pendingStates.length > 0) {
				nextProps = nextProps || instance.props;
				nextContext = nextContext || instance.context;
				this.nextProps = this.nextContext = null;
				// merge the nextProps and nextState and update by one time
				shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks);
			}
		},
		addState: function addState(nextState) {
			if (nextState) {
				this.pendingStates.push(nextState);
				if (!this.isPending) {
					this.emitUpdate();
				}
			}
		},
		replaceState: function replaceState(nextState) {
			var pendingStates = this.pendingStates;
	
			pendingStates.pop();
			// push special params to point out should replace state
			pendingStates.push([nextState]);
		},
		getState: function getState() {
			var instance = this.instance;
			var pendingStates = this.pendingStates;
			var state = instance.state;
			var props = instance.props;
	
			if (pendingStates.length) {
				state = extend({}, state);
				eachItem(pendingStates, function (nextState) {
					// replace state
					if (isArr(nextState)) {
						state = extend({}, nextState[0]);
						return;
					}
					if (isFn(nextState)) {
						nextState = nextState.call(instance, state, props);
					}
					extend(state, nextState);
				});
				pendingStates.length = 0;
			}
			return state;
		},
		clearCallbacks: function clearCallbacks() {
			var pendingCallbacks = this.pendingCallbacks;
			var instance = this.instance;
	
			if (pendingCallbacks.length > 0) {
				eachItem(pendingCallbacks, function (callback) {
					return callback.call(instance);
				});
				pendingCallbacks.length = 0;
			}
		},
		addCallback: function addCallback(callback) {
			if (isFn(callback)) {
				this.pendingCallbacks.push(callback);
			}
		}
	};
	function Component(props, context) {
		this.$updater = new Updater(this);
		this.$cache = { isMounted: false };
		this.props = props;
		this.state = {};
		this.refs = {};
		this.context = context || {};
	}
	
	var noop = noop$1;
	Component.prototype = {
		constructor: Component,
		getChildContext: noop,
		componentWillUpdate: noop,
		componentDidUpdate: noop,
		componentWillReceiveProps: noop,
		componentWillMount: noop,
		componentDidMount: noop,
		componentWillUnmount: noop,
		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			return true;
		},
		forceUpdate: function forceUpdate(callback) {
			var $updater = this.$updater;
			var $cache = this.$cache;
			var props = this.props;
			var state = this.state;
			var context = this.context;
	
			if ($updater.isPending || !$cache.isMounted) {
				return;
			}
			var nextProps = $cache.props || props;
			var nextState = $cache.state || state;
			var nextContext = $cache.context || {};
			var parentContext = $cache.parentContext;
			var node = $cache.node;
			var vtree = $cache.vtree;
			$cache.props = $cache.state = $cache.context = null;
			$updater.isPending = true;
			this.componentWillUpdate(nextProps, nextState, nextContext);
			this.state = nextState;
			this.props = nextProps;
			this.context = nextContext;
			var nextVtree = renderComponent(this, parentContext);
			var newNode = vtree.updateTree(node, nextVtree, node.parentNode, nextVtree.context);
			if (newNode !== node) {
				newNode.cache = newNode.cache || {};
				extend(newNode.cache, node.cache);
			}
			$cache.vtree = nextVtree;
			$cache.node = newNode;
			clearDidMount();
			this.componentDidUpdate(props, state, context);
			if (callback) {
				callback.call(this);
			}
			$updater.isPending = false;
			$updater.emitUpdate();
		},
		setState: function setState(nextState, callback) {
			var $updater = this.$updater;
	
			$updater.addCallback(callback);
			$updater.addState(nextState);
		},
		replaceState: function replaceState(nextState, callback) {
			var $updater = this.$updater;
	
			$updater.addCallback(callback);
			$updater.replaceState(nextState);
		},
		getDOMNode: function getDOMNode() {
			var node = this.$cache.node;
			return node && node.tagName === 'NOSCRIPT' ? null : node;
		},
		isMounted: function isMounted() {
			return this.$cache.isMounted;
		}
	};
	
	var updatePropsAndState = function updatePropsAndState(component, props, state, context) {
		component.state = state;
		component.props = props;
		component.context = context || {};
	};
	
	var shouldUpdate = function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
		var shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext);
		if (shouldComponentUpdate === false) {
			updatePropsAndState(component, nextProps, nextState, nextContext);
			return;
		}
		updatePropsAndState(component.$cache, nextProps, nextState, nextContext);
		component.forceUpdate(callback);
	};
	
	var eventNameAlias = {
		onDoubleClick: 'ondblclick'
	};
	var getEventName = function getEventName(key) {
		key = eventNameAlias[key] || key;
		return key.toLowerCase();
	};
	
	var isNotBubble = true;
	var notBubbleEvents = {
		onload: isNotBubble,
		onunload: isNotBubble,
		onscroll: isNotBubble,
		onfocus: isNotBubble,
		onblur: isNotBubble,
		onrowexit: isNotBubble,
		onbeforeunload: isNotBubble,
		onstop: isNotBubble,
		ondragdrop: isNotBubble,
		ondragenter: isNotBubble,
		ondragexit: isNotBubble,
		ondraggesture: isNotBubble,
		ondragover: isNotBubble,
		oncontextmenu: isNotBubble
	};
	
	var eventTypes = {};
	
	var addEvent = function addEvent(elem, eventType, listener) {
		eventType = getEventName(eventType);
		var isNotBubble = notBubbleEvents[eventType];
	
		if (isNotBubble) {
			elem[eventType] = listener;
			return;
		}
	
		var eventStore = elem.eventStore || (elem.eventStore = {});
		eventStore[eventType] = listener;
	
		if (!eventTypes[eventType]) {
			// onclick -> click
			document.addEventListener(eventType.substr(2), dispatchEvent);
			eventTypes[eventType] = true;
		}
	
		if (eventType === 'onchange') {
			addEvent(elem, 'oninput', listener);
		}
	};
	
	var removeEvent = function removeEvent(elem, eventType) {
		eventType = getEventName(eventType);
		var isNotBubble = notBubbleEvents[eventType];
	
		if (isNotBubble) {
			elem[eventType] = null;
			return;
		}
	
		var eventStore = elem.eventStore || (elem.eventStore = {});
		delete eventStore[eventType];
	
		if (eventType === 'onchange') {
			delete eventStore['oninput'];
		}
	};
	
	var dispatchEvent = function dispatchEvent(event) {
		var target = event.target;
		var type = event.type;
	
		var eventType = 'on' + type;
		var syntheticEvent = undefined;
		updateQueue.isPending = true;
		while (target) {
			var _target = target;
			var eventStore = _target.eventStore;
	
			var listener = eventStore && eventStore[eventType];
			if (!listener) {
				target = target.parentNode;
				continue;
			}
			if (!syntheticEvent) {
				syntheticEvent = {};
				syntheticEvent.nativeEvent = event;
				for (var key in event) {
					syntheticEvent[key] = typeof event[key] === 'function' ? event[key].bind(event) : event[key];
				}
			}
			syntheticEvent.currentTarget = target;
			listener.call(target, syntheticEvent);
			target = target.parentNode;
		}
		updateQueue.batchUpdate();
	};
	
	var store = {};
	var renderTreeIntoContainer = function renderTreeIntoContainer(vtree, container, callback, parentContext) {
		if (!vtree) {
			throw new Error('cannot render ' + vtree + ' to container');
		}
		var id = container[COMPONENT_ID];
		if (store.hasOwnProperty(id)) {
			store[id].updateTree(container.firstChild, vtree, container, parentContext);
		} else {
			container[COMPONENT_ID] = id = getUid();
			container.innerHTML = '';
			vtree.initTree(container, parentContext);
		}
		store[id] = vtree;
		clearDidMount();
	
		var result = null;
		switch (vtree.vtype) {
			case VNODE_TYPE.ELEMENT:
				result = container.firstChild;
				break;
			case VNODE_TYPE.COMPONENT:
				result = container.firstChild.cache[vtree.id];
				break;
		}
	
		if (isFn(callback)) {
			callback.call(result);
		}
	
		return result;
	};
	
	var render = function render(vtree, container, callback) {
		return renderTreeIntoContainer(vtree, container, callback);
	};
	
	var unstable_renderSubtreeIntoContainer = function unstable_renderSubtreeIntoContainer(parentComponent, subVtree, container, callback) {
		var context = parentComponent.vtree ? parentComponent.vtree.context : parentComponent.$cache.parentContext;
		return renderTreeIntoContainer(subVtree, container, callback, context);
	};
	
	var unmountComponentAtNode = function unmountComponentAtNode(container) {
		if (!container.nodeName) {
			throw new Error('expect node');
		}
		var id = container[COMPONENT_ID];
		if (store.hasOwnProperty(id)) {
			store[id].destroyTree(container.firstChild);
			delete store[id];
			return true;
		}
		return false;
	};
	
	var findDOMNode = function findDOMNode(node) {
		if (node == null) {
			return null;
		}
		if (node.nodeName) {
			return node;
		}
		var component = node;
		// if component.node equal to false, component must be unmounted
		if (component.getDOMNode && component.$cache.isMounted) {
			return component.getDOMNode();
		}
		throw new Error('findDOMNode can not find Node');
	};
	
	var ReactDOM = Object.freeze({
		render: render,
		unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
		unmountComponentAtNode: unmountComponentAtNode,
		findDOMNode: findDOMNode
	});
	
	var tagNames = 'a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|text|tspan';
	var DOM = {};
	eachItem(tagNames.split('|'), function (tagName) {
		DOM[tagName] = createFactory(tagName);
	});
	
	var check = function check() {
		return check;
	};
	check.isRequired = check;
	var PropTypes = {
		"array": check,
		"bool": check,
		"func": check,
		"number": check,
		"object": check,
		"string": check,
		"any": check,
		"arrayOf": check,
		"element": check,
		"instanceOf": check,
		"node": check,
		"objectOf": check,
		"oneOf": check,
		"oneOfType": check,
		"shape": check
	};
	
	var only = function only(children) {
		if (isValidElement(children)) {
			return children;
		}
		throw new Error('expect only one child');
	};
	
	var forEach = function forEach(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		if (isArr(children)) {
			flattenChildren(children, function (child, index) {
				iteratee.call(context, child, index);
			});
		} else {
			iteratee.call(context, children, 0);
		}
	};
	
	var map = function map(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		var store = [];
		var keyMap = {};
		forEach(children, function (child, index) {
			var data = {};
			data.child = iteratee.call(context, child, index) || child;
			data.isEqual = data.child === child;
			var key = data.key = getKey(child, index);
			if (keyMap.hasOwnProperty(key)) {
				keyMap[key] = keyMap[key] + 1;
			} else {
				keyMap[key] = 0;
			}
			data.index = keyMap[key];
			store.push(data);
		});
		var result = [];
		eachItem(store, function (_ref) {
			var child = _ref.child;
			var key = _ref.key;
			var index = _ref.index;
			var isEqual = _ref.isEqual;
	
			if (child == null || isBln(child)) {
				return;
			}
			if (!isValidElement(child) || key == null) {
				result.push(child);
				return;
			}
			if (keyMap[key] !== 0) {
				key += ':' + index;
			}
			if (!isEqual) {
				key = escapeUserProvidedKey(child.key || '') + '/' + key;
			}
			child = cloneElement(child, { key: key });
			result.push(child);
		});
		return result;
	};
	
	var count = function count(children) {
		var count = 0;
		forEach(children, function () {
			count++;
		});
		return count;
	};
	
	var toArray = function toArray(children) {
		return map(children, identity) || [];
	};
	
	var getKey = function getKey(child, index) {
		var key = undefined;
		if (isValidElement(child) && isStr(child.key)) {
			key = '.$' + child.key;
		} else {
			key = '.' + index.toString(36);
		}
		return key;
	};
	
	var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
	var escapeUserProvidedKey = function escapeUserProvidedKey(text) {
		return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
	};
	
	var Children = Object.freeze({
		only: only,
		forEach: forEach,
		map: map,
		count: count,
		toArray: toArray
	});
	
	var eachMixin = function eachMixin(mixins, iteratee) {
		eachItem(mixins, function (mixin) {
			if (mixin) {
				if (isArr(mixin.mixins)) {
					eachMixin(mixin.mixins, iteratee);
				}
				iteratee(mixin);
			}
		});
	};
	
	var combineMixinToProto = function combineMixinToProto(proto, mixin) {
		mapValue(mixin, function (value, key) {
			if (key === 'getInitialState') {
				proto.$getInitialStates.push(value);
				return;
			}
			var curValue = proto[key];
			if (isFn(curValue) && isFn(value)) {
				proto[key] = pipe(curValue, value);
			} else {
				proto[key] = value;
			}
		});
	};
	
	var combineMixinToClass = function combineMixinToClass(Component, mixin) {
		if (isObj(mixin.propTypes)) {
			extend(Component.propTypes, mixin.propTypes);
		}
		if (isObj(mixin.contextTypes)) {
			extend(Component.contextTypes, mixin.contextTypes);
		}
		if (isFn(mixin.getDefaultProps)) {
			extend(Component.defaultProps, mixin.getDefaultProps());
		}
		if (isObj(mixin.statics)) {
			extend(Component, mixin.statics);
		}
	};
	
	var bindContext = function bindContext(obj, source) {
		mapValue(source, function (value, key) {
			if (isFn(value)) {
				obj[key] = value.bind(obj);
			}
		});
	};
	
	var Facade = function Facade() {};
	Facade.prototype = Component.prototype;
	
	var getInitialState = function getInitialState() {
		var _this = this;
	
		var state = {};
		var setState = this.setState;
		this.setState = Facade;
		eachItem(this.$getInitialStates, function (getInitialState) {
			if (isFn(getInitialState)) {
				extend(state, getInitialState.call(_this));
			}
		});
		this.setState = setState;
		return state;
	};
	
	var createClass = function createClass(spec) {
		if (!isFn(spec.render)) {
			throw new Error('createClass: spec.render is not function');
		}
		var specMixins = spec.mixins || [];
		var mixins = specMixins.concat(spec);
		spec.mixins = null;
		function Klass(props, context) {
			Component.call(this, props, context);
			this.constructor = Klass;
			spec.autobind !== false && bindContext(this, Klass.prototype);
			this.state = this.getInitialState() || this.state;
		}
		Klass.displayName = spec.displayName;
		Klass.contextTypes = {};
		Klass.propTypes = {};
		Klass.defaultProps = {};
		var proto = Klass.prototype = new Facade();
		proto.$getInitialStates = [];
		eachMixin(mixins, function (mixin) {
			combineMixinToProto(proto, mixin);
			combineMixinToClass(Klass, mixin);
		});
		proto.getInitialState = getInitialState;
		spec.mixins = specMixins;
		return Klass;
	};
	
	var React = extend({
		version: '0.14.7',
		cloneElement: cloneElement,
		isValidElement: isValidElement,
		createElement: createElement,
		createFactory: createFactory,
		Component: Component,
		createClass: createClass,
		Children: Children,
		PropTypes: PropTypes,
		DOM: DOM
	}, ReactDOM);
	
	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* components */
	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Router2 = __webpack_require__(24);
	
	var _Router3 = _interopRequireDefault(_Router2);
	
	exports.Router = _Router3['default'];
	
	var _Link2 = __webpack_require__(41);
	
	var _Link3 = _interopRequireDefault(_Link2);
	
	exports.Link = _Link3['default'];
	
	var _IndexLink2 = __webpack_require__(42);
	
	var _IndexLink3 = _interopRequireDefault(_IndexLink2);
	
	exports.IndexLink = _IndexLink3['default'];
	
	/* components (configuration) */
	
	var _IndexRedirect2 = __webpack_require__(43);
	
	var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);
	
	exports.IndexRedirect = _IndexRedirect3['default'];
	
	var _IndexRoute2 = __webpack_require__(45);
	
	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);
	
	exports.IndexRoute = _IndexRoute3['default'];
	
	var _Redirect2 = __webpack_require__(44);
	
	var _Redirect3 = _interopRequireDefault(_Redirect2);
	
	exports.Redirect = _Redirect3['default'];
	
	var _Route2 = __webpack_require__(46);
	
	var _Route3 = _interopRequireDefault(_Route2);
	
	exports.Route = _Route3['default'];
	
	/* mixins */
	
	var _History2 = __webpack_require__(47);
	
	var _History3 = _interopRequireDefault(_History2);
	
	exports.History = _History3['default'];
	
	var _Lifecycle2 = __webpack_require__(48);
	
	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);
	
	exports.Lifecycle = _Lifecycle3['default'];
	
	var _RouteContext2 = __webpack_require__(49);
	
	var _RouteContext3 = _interopRequireDefault(_RouteContext2);
	
	exports.RouteContext = _RouteContext3['default'];
	
	/* utils */
	
	var _useRoutes2 = __webpack_require__(3);
	
	var _useRoutes3 = _interopRequireDefault(_useRoutes2);
	
	exports.useRoutes = _useRoutes3['default'];
	
	var _RouteUtils = __webpack_require__(23);
	
	exports.createRoutes = _RouteUtils.createRoutes;
	
	var _RouterContext2 = __webpack_require__(37);
	
	var _RouterContext3 = _interopRequireDefault(_RouterContext2);
	
	exports.RouterContext = _RouterContext3['default'];
	
	var _PropTypes2 = __webpack_require__(36);
	
	var _PropTypes3 = _interopRequireDefault(_PropTypes2);
	
	exports.PropTypes = _PropTypes3['default'];
	
	var _match2 = __webpack_require__(50);
	
	var _match3 = _interopRequireDefault(_match2);
	
	exports.match = _match3['default'];
	
	var _useRouterHistory2 = __webpack_require__(53);
	
	var _useRouterHistory3 = _interopRequireDefault(_useRouterHistory2);
	
	exports.useRouterHistory = _useRouterHistory3['default'];
	
	var _PatternUtils = __webpack_require__(14);
	
	exports.formatPattern = _PatternUtils.formatPattern;
	
	/* histories */
	
	var _browserHistory2 = __webpack_require__(55);
	
	var _browserHistory3 = _interopRequireDefault(_browserHistory2);
	
	exports.browserHistory = _browserHistory3['default'];
	
	var _hashHistory2 = __webpack_require__(58);
	
	var _hashHistory3 = _interopRequireDefault(_hashHistory2);
	
	exports.hashHistory = _hashHistory3['default'];
	
	var _createMemoryHistory2 = __webpack_require__(51);
	
	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);
	
	exports.createMemoryHistory = _createMemoryHistory3['default'];
	
	var _Router4 = _interopRequireDefault(_Router2);

	exports['default'] = _Router4['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _historyLibUseQueries = __webpack_require__(4);
	
	var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
	
	var _createTransitionManager = __webpack_require__(12);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * Enhances history objects with the following methods:
	 *
	 * - listen((error, nextState) => {})
	 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
	 * - match(location, (error, redirectLocation, nextState) => {})
	 * - isActive(pathname, query, indexOnly=false)
	 */
	function useRoutes(createHistory) {
	  true ? _warning2['default'](false, '`useRoutes` is deprecated. Please use `createTransitionManager` instead.') : undefined;
	
	  return function () {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var routes = _ref.routes;
	
	    var options = _objectWithoutProperties(_ref, ['routes']);
	
	    var history = _historyLibUseQueries2['default'](createHistory)(options);
	    var transitionManager = _createTransitionManager2['default'](history, routes);
	    return _extends({}, history, transitionManager);
	  };
	}
	
	exports['default'] = useRoutes;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _warning = __webpack_require__(6);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _queryString = __webpack_require__(8);
	
	var _runTransitionHook = __webpack_require__(10);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _parsePath = __webpack_require__(5);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	var _deprecate = __webpack_require__(11);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var SEARCH_BASE_KEY = '$searchBase';
	
	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}
	
	var defaultParseQueryString = _queryString.parse;
	
	function isNestedObject(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;
	
	    var historyOptions = _objectWithoutProperties(options, ['stringifyQuery', 'parseQueryString']);
	
	    var history = createHistory(historyOptions);
	
	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;
	
	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;
	
	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;
	
	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }
	
	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.
	
	      return location;
	    }
	
	    function appendQuery(location, query) {
	      var _extends2;
	
	      var queryString = undefined;
	      if (!query || (queryString = stringifyQuery(query)) === '') return location;
	
	      true ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;
	
	      if (typeof location === 'string') location = _parsePath2['default'](location);
	
	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }
	
	      var search = searchBase + (searchBase ? '&' : '?') + queryString;
	
	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }
	
	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }
	
	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }
	
	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }
	
	    function createPath(location, query) {
	      true ? _warning2['default'](!query, 'the query argument to createPath is deprecated; use a location descriptor instead') : undefined;
	
	      return history.createPath(appendQuery(location, query || location.query));
	    }
	
	    function createHref(location, query) {
	      true ? _warning2['default'](!query, 'the query argument to createHref is deprecated; use a location descriptor instead') : undefined;
	
	      return history.createHref(appendQuery(location, query || location.query));
	    }
	
	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      var fullLocation = history.createLocation.apply(history, [appendQuery(location, location.query)].concat(args));
	      if (location.query) {
	        fullLocation.query = location.query;
	      }
	      return addQuery(fullLocation);
	    }
	
	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      push(_extends({ state: state }, path, { query: query }));
	    }
	
	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      replace(_extends({ state: state }, path, { query: query }));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useQueries;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(6);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _extractPath = __webpack_require__(7);
	
	var _extractPath2 = _interopRequireDefault(_extractPath);
	
	function parsePath(path) {
	  var pathname = _extractPath2['default'](path);
	  var search = '';
	  var hash = '';
	
	  true ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }
	
	  if (pathname === '') pathname = '/';
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}
	
	exports['default'] = parsePath;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (true) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);
	
	  if (match == null) return string;
	
	  return string.substring(match[0].length);
	}
	
	exports["default"] = extractPath;
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(9);
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}
	
		str = str.trim().replace(/^(\?|#|&)/, '');
	
		if (!str) {
			return {};
		}
	
		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
	
			key = decodeURIComponent(key);
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
	
			return ret;
		}, {});
	};
	
	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
	
			if (val === undefined) {
				return '';
			}
	
			if (val === null) {
				return key;
			}
	
			if (Array.isArray(val)) {
				return val.sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}
	
			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(6);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);
	
	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    true ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}
	
	exports['default'] = runTransitionHook;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(6);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function deprecate(fn, message) {
	  return function () {
	    true ? _warning2['default'](false, '[history] ' + message) : undefined;
	    return fn.apply(this, arguments);
	  };
	}
	
	exports['default'] = deprecate;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = createTransitionManager;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _historyLibActions = __webpack_require__(17);
	
	var _computeChangedRoutes2 = __webpack_require__(18);
	
	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);
	
	var _TransitionUtils = __webpack_require__(19);
	
	var _isActive2 = __webpack_require__(13);
	
	var _isActive3 = _interopRequireDefault(_isActive2);
	
	var _getComponents = __webpack_require__(21);
	
	var _getComponents2 = _interopRequireDefault(_getComponents);
	
	var _matchRoutes = __webpack_require__(22);
	
	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);
	
	function hasAnyProperties(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p)) return true;
	  }return false;
	}
	
	function createTransitionManager(history, routes) {
	  var state = {};
	
	  // Signature should be (location, indexOnly), but needs to support (path,
	  // query, indexOnly)
	  function isActive(location) {
	    var indexOnlyOrDeprecatedQuery = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    var deprecatedIndexOnly = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	    var indexOnly = undefined;
	    if (indexOnlyOrDeprecatedQuery && indexOnlyOrDeprecatedQuery !== true || deprecatedIndexOnly !== null) {
	      true ? _warning2['default'](false, '`isActive(pathname, query, indexOnly) is deprecated; use `isActive(location, indexOnly)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : undefined;
	      location = { pathname: location, query: indexOnlyOrDeprecatedQuery };
	      indexOnly = deprecatedIndexOnly || false;
	    } else {
	      if (typeof location === 'string') {
	        location = { pathname: location };
	      }
	      indexOnly = indexOnlyOrDeprecatedQuery;
	    }
	
	    return _isActive3['default'](location, indexOnly, state.location, state.routes, state.params);
	  }
	
	  function createLocationFromRedirectInfo(_ref) {
	    var pathname = _ref.pathname;
	    var query = _ref.query;
	    var state = _ref.state;
	
	    return history.createLocation(history.createPath(pathname, query), state, _historyLibActions.REPLACE);
	  }
	
	  var partialNextState = undefined;
	
	  function match(location, callback) {
	    if (partialNextState && partialNextState.location === location) {
	      // Continue from where we left off.
	      finishMatch(partialNextState, callback);
	    } else {
	      _matchRoutes2['default'](routes, location, function (error, nextState) {
	        if (error) {
	          callback(error);
	        } else if (nextState) {
	          finishMatch(_extends({}, nextState, { location: location }), callback);
	        } else {
	          callback();
	        }
	      });
	    }
	  }
	
	  function finishMatch(nextState, callback) {
	    var _computeChangedRoutes = _computeChangedRoutes3['default'](state, nextState);
	
	    var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	    var enterRoutes = _computeChangedRoutes.enterRoutes;
	
	    _TransitionUtils.runLeaveHooks(leaveRoutes);
	
	    // Tear down confirmation hooks for left routes
	    leaveRoutes.forEach(removeListenBeforeHooksForRoute);
	
	    _TransitionUtils.runEnterHooks(enterRoutes, nextState, function (error, redirectInfo) {
	      if (error) {
	        callback(error);
	      } else if (redirectInfo) {
	        callback(null, createLocationFromRedirectInfo(redirectInfo));
	      } else {
	        // TODO: Fetch components after state is updated.
	        _getComponents2['default'](nextState, function (error, components) {
	          if (error) {
	            callback(error);
	          } else {
	            // TODO: Make match a pure function and have some other API
	            // for "match and update state".
	            callback(null, null, state = _extends({}, nextState, { components: components }));
	          }
	        });
	      }
	    });
	  }
	
	  var RouteGuid = 1;
	
	  function getRouteID(route) {
	    var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	    return route.__id__ || create && (route.__id__ = RouteGuid++);
	  }
	
	  var RouteHooks = {};
	
	  function getRouteHooksForRoutes(routes) {
	    return routes.reduce(function (hooks, route) {
	      hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	      return hooks;
	    }, []);
	  }
	
	  function transitionHook(location, callback) {
	    _matchRoutes2['default'](routes, location, function (error, nextState) {
	      if (nextState == null) {
	        // TODO: We didn't actually match anything, but hang
	        // onto error/nextState so we don't have to matchRoutes
	        // again in the listen callback.
	        callback();
	        return;
	      }
	
	      // Cache some state here so we don't have to
	      // matchRoutes() again in the listen callback.
	      partialNextState = _extends({}, nextState, { location: location });
	
	      var hooks = getRouteHooksForRoutes(_computeChangedRoutes3['default'](state, partialNextState).leaveRoutes);
	
	      var result = undefined;
	      for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	        // Passing the location arg here indicates to
	        // the user that this is a transition hook.
	        result = hooks[i](location);
	      }
	
	      callback(result);
	    });
	  }
	
	  /* istanbul ignore next: untestable with Karma */
	  function beforeUnloadHook() {
	    // Synchronously check to see if any route hooks want
	    // to prevent the current window/tab from closing.
	    if (state.routes) {
	      var hooks = getRouteHooksForRoutes(state.routes);
	
	      var message = undefined;
	      for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	        // Passing no args indicates to the user that this is a
	        // beforeunload hook. We don't know the next location.
	        message = hooks[i]();
	      }
	
	      return message;
	    }
	  }
	
	  var unlistenBefore = undefined,
	      unlistenBeforeUnload = undefined;
	
	  function removeListenBeforeHooksForRoute(route) {
	    var routeID = getRouteID(route, false);
	    if (!routeID) {
	      return;
	    }
	
	    delete RouteHooks[routeID];
	
	    if (!hasAnyProperties(RouteHooks)) {
	      // teardown transition & beforeunload hooks
	      if (unlistenBefore) {
	        unlistenBefore();
	        unlistenBefore = null;
	      }
	
	      if (unlistenBeforeUnload) {
	        unlistenBeforeUnload();
	        unlistenBeforeUnload = null;
	      }
	    }
	  }
	
	  /**
	   * Registers the given hook function to run before leaving the given route.
	   *
	   * During a normal transition, the hook function receives the next location
	   * as its only argument and must return either a) a prompt message to show
	   * the user, to make sure they want to leave the page or b) false, to prevent
	   * the transition.
	   *
	   * During the beforeunload event (in browsers) the hook receives no arguments.
	   * In this case it must return a prompt message to prevent the transition.
	   *
	   * Returns a function that may be used to unbind the listener.
	   */
	  function listenBeforeLeavingRoute(route, hook) {
	    // TODO: Warn if they register for a route that isn't currently
	    // active. They're probably doing something wrong, like re-creating
	    // route objects on every location change.
	    var routeID = getRouteID(route);
	    var hooks = RouteHooks[routeID];
	
	    if (!hooks) {
	      var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);
	
	      RouteHooks[routeID] = [hook];
	
	      if (thereWereNoRouteHooks) {
	        // setup transition & beforeunload hooks
	        unlistenBefore = history.listenBefore(transitionHook);
	
	        if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
	      }
	    } else {
	      true ? _warning2['default'](false, 'adding multiple leave hooks for the same route is deprecated; manage multiple confirmations in your own code instead') : undefined;
	
	      if (hooks.indexOf(hook) === -1) {
	        hooks.push(hook);
	      }
	    }
	
	    return function () {
	      var hooks = RouteHooks[routeID];
	
	      if (hooks) {
	        var newHooks = hooks.filter(function (item) {
	          return item !== hook;
	        });
	
	        if (newHooks.length === 0) {
	          removeListenBeforeHooksForRoute(route);
	        } else {
	          RouteHooks[routeID] = newHooks;
	        }
	      }
	    };
	  }
	
	  /**
	   * This is the API for stateful environments. As the location
	   * changes, we update state and call the listener. We can also
	   * gracefully handle errors and redirects.
	   */
	  function listen(listener) {
	    // TODO: Only use a single history listener. Otherwise we'll
	    // end up with multiple concurrent calls to match.
	    return history.listen(function (location) {
	      if (state.location === location) {
	        listener(null, state);
	      } else {
	        match(location, function (error, redirectLocation, nextState) {
	          if (error) {
	            listener(error);
	          } else if (redirectLocation) {
	            history.transitionTo(redirectLocation);
	          } else if (nextState) {
	            listener(null, nextState);
	          } else {
	            true ? _warning2['default'](false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : undefined;
	          }
	        });
	      }
	    });
	  }
	
	  return {
	    isActive: isActive,
	    match: match,
	    listenBeforeLeavingRoute: listenBeforeLeavingRoute,
	    listen: listen
	  };
	}
	
	//export default useRoutes
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = isActive;
	
	var _PatternUtils = __webpack_require__(14);
	
	function deepEqual(a, b) {
	  if (a == b) return true;
	
	  if (a == null || b == null) return false;
	
	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }
	
	  if (typeof a === 'object') {
	    for (var p in a) {
	      if (!a.hasOwnProperty(p)) {
	        continue;
	      }
	
	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!b.hasOwnProperty(p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  return String(a) === String(b);
	}
	
	function paramsAreActive(paramNames, paramValues, activeParams) {
	  // FIXME: This doesn't work on repeated params in activeParams.
	  return paramNames.every(function (paramName, index) {
	    return String(paramValues[index]) === String(activeParams[paramName]);
	  });
	}
	
	function getMatchingRouteIndex(pathname, activeRoutes, activeParams) {
	  var remainingPathname = pathname,
	      paramNames = [],
	      paramValues = [];
	
	  for (var i = 0, len = activeRoutes.length; i < len; ++i) {
	    var route = activeRoutes[i];
	    var pattern = route.path || '';
	
	    if (pattern.charAt(0) === '/') {
	      remainingPathname = pathname;
	      paramNames = [];
	      paramValues = [];
	    }
	
	    if (remainingPathname !== null) {
	      var matched = _PatternUtils.matchPattern(pattern, remainingPathname);
	      remainingPathname = matched.remainingPathname;
	      paramNames = [].concat(paramNames, matched.paramNames);
	      paramValues = [].concat(paramValues, matched.paramValues);
	    }
	
	    if (remainingPathname === '' && route.path && paramsAreActive(paramNames, paramValues, activeParams)) return i;
	  }
	
	  return null;
	}
	
	/**
	 * Returns true if the given pathname matches the active routes
	 * and params.
	 */
	function routeIsActive(pathname, routes, params, indexOnly) {
	  var i = getMatchingRouteIndex(pathname, routes, params);
	
	  if (i === null) {
	    // No match.
	    return false;
	  } else if (!indexOnly) {
	    // Any match is good enough.
	    return true;
	  }
	
	  // If any remaining routes past the match index have paths, then we can't
	  // be on the index route.
	  return routes.slice(i + 1).every(function (route) {
	    return !route.path;
	  });
	}
	
	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;
	
	  if (query == null) return true;
	
	  return deepEqual(query, activeQuery);
	}
	
	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	
	function isActive(_ref, indexOnly, currentLocation, routes, params) {
	  var pathname = _ref.pathname;
	  var query = _ref.query;
	
	  if (currentLocation == null) return false;
	
	  if (!routeIsActive(pathname, routes, params, indexOnly)) return false;
	
	  return queryIsActive(query, currentLocation.query);
	}
	
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}
	
	function escapeSource(string) {
	  return escapeRegExp(string).replace(/\/+/g, '/+');
	}
	
	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];
	
	  var match = undefined,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeSource(pattern.slice(lastIndex, match.index));
	    }
	
	    if (match[1]) {
	      regexpSource += '([^/?#]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '**') {
	      regexpSource += '([\\s\\S]*)';
	      paramNames.push('splat');
	    } else if (match[0] === '*') {
	      regexpSource += '([\\s\\S]*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }
	
	    tokens.push(match[0]);
	
	    lastIndex = matcher.lastIndex;
	  }
	
	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeSource(pattern.slice(lastIndex, pattern.length));
	  }
	
	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}
	
	var CompiledPatternsCache = {};
	
	function compilePattern(pattern) {
	  if (!(pattern in CompiledPatternsCache)) CompiledPatternsCache[pattern] = _compilePattern(pattern);
	
	  return CompiledPatternsCache[pattern];
	}
	
	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 * - **             Consumes (greedy) all characters up to the next character
	 *                  in the pattern, or to the end of the URL if there is none
	 *
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */
	
	function matchPattern(pattern, pathname) {
	  // Make leading slashes consistent between pattern and pathname.
	  if (pattern.charAt(0) !== '/') {
	    pattern = '/' + pattern;
	  }
	  if (pathname.charAt(0) !== '/') {
	    pathname = '/' + pathname;
	  }
	
	  var _compilePattern2 = compilePattern(pattern);
	
	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;
	
	  regexpSource += '/*'; // Capture path separators
	
	  // Special-case patterns like '*' for catch-all routes.
	  var captureRemaining = tokens[tokens.length - 1] !== '*';
	
	  if (captureRemaining) {
	    // This will match newlines in the remaining path.
	    regexpSource += '([\\s\\S]*?)';
	  }
	
	  var match = pathname.match(new RegExp('^' + regexpSource + '$', 'i'));
	
	  var remainingPathname = undefined,
	      paramValues = undefined;
	  if (match != null) {
	    if (captureRemaining) {
	      remainingPathname = match.pop();
	      var matchedPath = match[0].substr(0, match[0].length - remainingPathname.length);
	
	      // If we didn't match the entire pathname, then make sure that the match
	      // we did get ends at a path separator (potentially the one we added
	      // above at the beginning of the path, if the actual match was empty).
	      if (remainingPathname && matchedPath.charAt(matchedPath.length - 1) !== '/') {
	        return {
	          remainingPathname: null,
	          paramNames: paramNames,
	          paramValues: null
	        };
	      }
	    } else {
	      // If this matched at all, then the match was the entire pathname.
	      remainingPathname = '';
	    }
	
	    paramValues = match.slice(1).map(function (v) {
	      return v != null ? decodeURIComponent(v) : v;
	    });
	  } else {
	    remainingPathname = paramValues = null;
	  }
	
	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: paramValues
	  };
	}
	
	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}
	
	function getParams(pattern, pathname) {
	  var _matchPattern = matchPattern(pattern, pathname);
	
	  var paramNames = _matchPattern.paramNames;
	  var paramValues = _matchPattern.paramValues;
	
	  if (paramValues != null) {
	    return paramNames.reduce(function (memo, paramName, index) {
	      memo[paramName] = paramValues[index];
	      return memo;
	    }, {});
	  }
	
	  return null;
	}
	
	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */
	
	function formatPattern(pattern, params) {
	  params = params || {};
	
	  var _compilePattern3 = compilePattern(pattern);
	
	  var tokens = _compilePattern3.tokens;
	
	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;
	
	  var token = undefined,
	      paramName = undefined,
	      paramValue = undefined;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];
	
	    if (token === '*' || token === '**') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;
	
	      !(paramValue != null || parenCount > 0) ? true ? _invariant2['default'](false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : _invariant2['default'](false) : undefined;
	
	      if (paramValue != null) pathname += encodeURI(paramValue);
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];
	
	      !(paramValue != null || parenCount > 0) ? true ? _invariant2['default'](false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : _invariant2['default'](false) : undefined;
	
	      if (paramValue != null) pathname += encodeURIComponent(paramValue);
	    } else {
	      pathname += token;
	    }
	  }
	
	  return pathname.replace(/\/+/g, '/');
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (true) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = routerWarning;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(6);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function routerWarning(falseToWarn, message) {
	  message = '[react-router] ' + message;
	
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }
	
	  true ? _warning2['default'].apply(undefined, [falseToWarn, message].concat(args)) : undefined;
	}
	
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';
	
	exports.__esModule = true;
	var PUSH = 'PUSH';
	
	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';
	
	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';
	
	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(14);
	
	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;
	
	  var paramNames = _PatternUtils.getParamNames(route.path);
	
	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}
	
	/**
	 * Returns an object of { leaveRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;
	
	  var leaveRoutes = undefined,
	      enterRoutes = undefined;
	  if (prevRoutes) {
	    leaveRoutes = prevRoutes.filter(function (route) {
	      return nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	    });
	
	    // onLeave hooks start at the leaf route.
	    leaveRoutes.reverse();
	
	    enterRoutes = nextRoutes.filter(function (route) {
	      return prevRoutes.indexOf(route) === -1 || leaveRoutes.indexOf(route) !== -1;
	    });
	  } else {
	    leaveRoutes = [];
	    enterRoutes = nextRoutes;
	  }
	
	  return {
	    leaveRoutes: leaveRoutes,
	    enterRoutes: enterRoutes
	  };
	}
	
	exports['default'] = computeChangedRoutes;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runLeaveHooks = runLeaveHooks;
	
	var _AsyncUtils = __webpack_require__(20);
	
	function createEnterHook(hook, route) {
	  return function (a, b, callback) {
	    hook.apply(route, arguments);
	
	    if (hook.length < 3) {
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}
	
	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createEnterHook(route.onEnter, route));
	
	    return hooks;
	  }, []);
	}
	
	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replaceState, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replaceState short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	
	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);
	
	  if (!hooks.length) {
	    callback();
	    return;
	  }
	
	  var redirectInfo = undefined;
	  function replaceState(state, pathname, query) {
	    redirectInfo = { pathname: pathname, query: query, state: state };
	  }
	
	  _AsyncUtils.loopAsync(hooks.length, function (index, next, done) {
	    hooks[index](nextState, replaceState, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	          next();
	        }
	    });
	  }, callback);
	}
	
	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */
	
	function runLeaveHooks(routes) {
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    if (routes[i].onLeave) routes[i].onLeave.call(routes[i]);
	  }
	}

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;
	
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	
	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) return;
	
	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }
	
	  next();
	}
	
	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];
	
	  if (length === 0) return callback(null, values);
	
	  var isDone = false,
	      doneCount = 0;
	
	  function done(index, error, value) {
	    if (isDone) return;
	
	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;
	
	      isDone = ++doneCount === length;
	
	      if (isDone) callback(null, values);
	    }
	  }
	
	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _AsyncUtils = __webpack_require__(20);
	
	function getComponentsForRoute(location, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	  } else if (route.getComponent) {
	    route.getComponent(location, callback);
	  } else if (route.getComponents) {
	    route.getComponents(location, callback);
	  } else {
	    callback();
	  }
	}
	
	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  _AsyncUtils.mapAsync(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState.location, route, callback);
	  }, callback);
	}
	
	exports['default'] = getComponents;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _AsyncUtils = __webpack_require__(20);
	
	var _PatternUtils = __webpack_require__(14);
	
	var _RouteUtils = __webpack_require__(23);
	
	function getChildRoutes(route, location, callback) {
	  if (route.childRoutes) {
	    callback(null, route.childRoutes);
	  } else if (route.getChildRoutes) {
	    route.getChildRoutes(location, function (error, childRoutes) {
	      callback(error, !error && _RouteUtils.createRoutes(childRoutes));
	    });
	  } else {
	    callback();
	  }
	}
	
	function getIndexRoute(route, location, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    route.getIndexRoute(location, function (error, indexRoute) {
	      callback(error, !error && _RouteUtils.createRoutes(indexRoute)[0]);
	    });
	  } else if (route.childRoutes) {
	    (function () {
	      var pathless = route.childRoutes.filter(function (obj) {
	        return !obj.hasOwnProperty('path');
	      });
	
	      _AsyncUtils.loopAsync(pathless.length, function (index, next, done) {
	        getIndexRoute(pathless[index], location, function (error, indexRoute) {
	          if (error || indexRoute) {
	            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
	            done(error, routes);
	          } else {
	            next();
	          }
	        });
	      }, function (err, routes) {
	        callback(null, routes);
	      });
	    })();
	  } else {
	    callback();
	  }
	}
	
	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduce(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];
	
	    if (Array.isArray(params[paramName])) {
	      params[paramName].push(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [params[paramName], paramValue];
	    } else {
	      params[paramName] = paramValue;
	    }
	
	    return params;
	  }, params);
	}
	
	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}
	
	function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
	  var pattern = route.path || '';
	
	  if (pattern.charAt(0) === '/') {
	    remainingPathname = location.pathname;
	    paramNames = [];
	    paramValues = [];
	  }
	
	  if (remainingPathname !== null) {
	    var matched = _PatternUtils.matchPattern(pattern, remainingPathname);
	    remainingPathname = matched.remainingPathname;
	    paramNames = [].concat(paramNames, matched.paramNames);
	    paramValues = [].concat(paramValues, matched.paramValues);
	
	    if (remainingPathname === '' && route.path) {
	      var _ret2 = (function () {
	        var match = {
	          routes: [route],
	          params: createParams(paramNames, paramValues)
	        };
	
	        getIndexRoute(route, location, function (error, indexRoute) {
	          if (error) {
	            callback(error);
	          } else {
	            if (Array.isArray(indexRoute)) {
	              var _match$routes;
	
	              true ? _warning2['default'](indexRoute.every(function (route) {
	                return !route.path;
	              }), 'Index routes should not have paths') : undefined;
	              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
	            } else if (indexRoute) {
	              true ? _warning2['default'](!indexRoute.path, 'Index routes should not have paths') : undefined;
	              match.routes.push(indexRoute);
	            }
	
	            callback(null, match);
	          }
	        });
	        return {
	          v: undefined
	        };
	      })();
	
	      if (typeof _ret2 === 'object') return _ret2.v;
	    }
	  }
	
	  if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    getChildRoutes(route, location, function (error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, remainingPathname, paramNames, paramValues);
	      } else {
	        callback();
	      }
	    });
	  } else {
	    callback();
	  }
	}
	
	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback) {
	  var remainingPathname = arguments.length <= 3 || arguments[3] === undefined ? location.pathname : arguments[3];
	  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
	  return (function () {
	    _AsyncUtils.loopAsync(routes.length, function (index, next, done) {
	      matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
	        if (error || match) {
	          done(error, match);
	        } else {
	          next();
	        }
	      });
	    }, callback);
	  })();
	}
	
	exports['default'] = matchRoutes;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function isValidChild(object) {
	  return object == null || _react2['default'].isValidElement(object);
	}
	
	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}
	
	function checkPropTypes(componentName, propTypes, props) {
	  componentName = componentName || 'UnknownComponent';
	
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error = propTypes[propName](props, propName, componentName);
	
	      /* istanbul ignore if: error logging */
	      if (error instanceof Error) true ? _warning2['default'](false, error.message) : undefined;
	    }
	  }
	}
	
	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}
	
	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);
	
	  if (type.propTypes) checkPropTypes(type.displayName || type.name, type.propTypes, route);
	
	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);
	
	    if (childRoutes.length) route.childRoutes = childRoutes;
	
	    delete route.children;
	  }
	
	  return route;
	}
	
	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router'
	 *   
	 *   const routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   )
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */
	
	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];
	
	  _react2['default'].Children.forEach(children, function (element) {
	    if (_react2['default'].isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);
	
	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });
	
	  return routes;
	}
	
	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */
	
	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (routes && !Array.isArray(routes)) {
	    routes = [routes];
	  }
	
	  return routes;
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _historyLibCreateHashHistory = __webpack_require__(25);
	
	var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);
	
	var _historyLibUseQueries = __webpack_require__(4);
	
	var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _createTransitionManager = __webpack_require__(12);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _PropTypes = __webpack_require__(36);
	
	var _RouterContext = __webpack_require__(37);
	
	var _RouterContext2 = _interopRequireDefault(_RouterContext);
	
	var _RouteUtils = __webpack_require__(23);
	
	var _RouterUtils = __webpack_require__(40);
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function isDeprecatedHistory(history) {
	  return !history || !history.__v2_compatible__;
	}
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RouterContext> with all the props
	 * it needs each time the URL changes.
	 */
	var Router = _react2['default'].createClass({
	  displayName: 'Router',
	
	  propTypes: {
	    history: object,
	    children: _PropTypes.routes,
	    routes: _PropTypes.routes, // alias for children
	    render: func,
	    createElement: func,
	    onError: func,
	    onUpdate: func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      render: function render(props) {
	        return _react2['default'].createElement(_RouterContext2['default'], props);
	      }
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  },
	
	  handleError: function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  },
	
	  componentWillMount: function componentWillMount() {
	    var _this = this;
	
	    var history = this.props.history;
	    var _props = this.props;
	    var routes = _props.routes;
	    var children = _props.children;
	    var _props2 = this.props;
	    var parseQueryString = _props2.parseQueryString;
	    var stringifyQuery = _props2.stringifyQuery;
	
	    true ? _warning2['default'](!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : undefined;
	
	    if (isDeprecatedHistory(history)) {
	      history = this.wrapDeprecatedHistory(history);
	    }
	
	    var transitionManager = _createTransitionManager2['default'](history, _RouteUtils.createRoutes(routes || children));
	    this._unlisten = transitionManager.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });
	
	    this.router = _RouterUtils.createRouterObject(history, transitionManager);
	    this.history = _RouterUtils.createRoutingHistory(history, transitionManager);
	  },
	
	  wrapDeprecatedHistory: function wrapDeprecatedHistory(history) {
	    var _props3 = this.props;
	    var parseQueryString = _props3.parseQueryString;
	    var stringifyQuery = _props3.stringifyQuery;
	
	    var createHistory = undefined;
	    if (history) {
	      true ? _warning2['default'](false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a valid custom history please set `history.__v2_compatible__ = true`. http://tiny.cc/router-usinghistory') : undefined;
	      createHistory = function () {
	        return history;
	      };
	    } else {
	      true ? _warning2['default'](false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : undefined;
	      createHistory = _historyLibCreateHashHistory2['default'];
	    }
	
	    return _historyLibUseQueries2['default'](createHistory)({ parseQueryString: parseQueryString, stringifyQuery: stringifyQuery });
	  },
	
	  /* istanbul ignore next: sanity check */
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    true ? _warning2['default'](nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : undefined;
	
	    true ? _warning2['default']((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : undefined;
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  },
	
	  render: function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var _props4 = this.props;
	    var createElement = _props4.createElement;
	    var render = _props4.render;
	
	    var props = _objectWithoutProperties(_props4, ['createElement', 'render']);
	
	    if (location == null) return null; // Async match
	
	    // Only forward non-Router-specific props to routing context, as those are
	    // the only ones that might be custom routing context props.
	    Object.keys(Router.propTypes).forEach(function (propType) {
	      return delete props[propType];
	    });
	
	    return render(_extends({}, props, {
	      history: this.history,
	      router: this.router,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components,
	      createElement: createElement
	    }));
	  }
	
	});
	
	exports['default'] = Router;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(6);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(17);
	
	var _ExecutionEnvironment = __webpack_require__(26);
	
	var _DOMUtils = __webpack_require__(27);
	
	var _DOMStateStorage = __webpack_require__(28);
	
	var _createDOMHistory = __webpack_require__(29);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	var _parsePath = __webpack_require__(5);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}
	
	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();
	
	  if (isAbsolutePath(path)) return true;
	
	  _DOMUtils.replaceHashPath('/' + path);
	
	  return false;
	}
	
	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}
	
	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}
	
	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}
	
	var DefaultQueryKey = '_k';
	
	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? true ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var queryKey = options.queryKey;
	
	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;
	
	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();
	
	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);
	
	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }
	
	    var location = _parsePath2['default'](path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.
	
	      transitionTo(getCurrentLocation());
	    }
	
	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    var path = (basename || '') + pathname + search;
	
	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }
	
	    var currentHash = _DOMUtils.getHashPath();
	
	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	        true ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopHashChangeListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function push(location) {
	    true ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.push(location);
	  }
	
	  function replace(location) {
	    true ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replace(location);
	  }
	
	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();
	
	  function go(n) {
	    true ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;
	
	    history.go(n);
	  }
	
	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopHashChangeListener();
	  }
	
	  // deprecated
	  function pushState(state, path) {
	    true ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.pushState(state, path);
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	    true ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replaceState(state, path);
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,
	
	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}
	
	exports['default'] = createHashHistory;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;
	
	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}
	
	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}
	
	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}
	
	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}
	
	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}
	
	function go(n) {
	  if (n) window.history.go(n);
	}
	
	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */
	
	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	
	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*eslint-disable no-empty */
	'use strict';
	
	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(6);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var KeyPrefix = '@@History/';
	var QuotaExceededError = 'QuotaExceededError';
	var SecurityError = 'SecurityError';
	
	function createKey(key) {
	  return KeyPrefix + key;
	}
	
	function saveState(key, state) {
	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      true ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;
	
	      return;
	    }
	
	    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      true ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;
	
	      return;
	    }
	
	    throw error;
	  }
	}
	
	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      true ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;
	
	      return null;
	    }
	  }
	
	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }
	
	  return null;
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(26);
	
	var _DOMUtils = __webpack_require__(27);
	
	var _createHistory = __webpack_require__(30);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));
	
	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ? true ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;
	
	    return history.listen(listener);
	  }
	
	  return _extends({}, history, {
	    listen: listen
	  });
	}
	
	exports['default'] = createDOMHistory;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(6);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _deepEqual = __webpack_require__(32);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _AsyncUtils = __webpack_require__(35);
	
	var _Actions = __webpack_require__(17);
	
	var _createLocation2 = __webpack_require__(31);
	
	var _createLocation3 = _interopRequireDefault(_createLocation2);
	
	var _runTransitionHook = __webpack_require__(10);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _parsePath = __webpack_require__(5);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	var _deprecate = __webpack_require__(11);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}
	
	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}
	
	var DefaultKeyLength = 6;
	
	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var keyLength = options.keyLength;
	  var getUserConfirmation = options.getUserConfirmation;
	
	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;
	
	  var transitionHooks = [];
	
	  function listenBefore(hook) {
	    transitionHooks.push(hook);
	
	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }
	
	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;
	
	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }
	
	  function updateLocation(newLocation) {
	    var current = getCurrent();
	
	    location = newLocation;
	
	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }
	
	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }
	
	  function listen(listener) {
	    changeListeners.push(listener);
	
	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }
	
	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }
	
	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }
	
	  var pendingLocation = undefined;
	
	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.
	
	    pendingLocation = nextLocation;
	
	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.
	
	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);
	
	          if (nextPath === prevPath && _deepEqual2['default'](location.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }
	
	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);
	
	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }
	
	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }
	
	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }
	
	  function goBack() {
	    go(-1);
	  }
	
	  function goForward() {
	    go(1);
	  }
	
	  function createKey() {
	    return createRandomKey(keyLength);
	  }
	
	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;
	
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	
	    var result = pathname;
	
	    if (search) result += search;
	
	    if (hash) result += hash;
	
	    return result;
	  }
	
	  function createHref(location) {
	    return createPath(location);
	  }
	
	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	
	    if (typeof action === 'object') {
	      true ? _warning2['default'](false, 'The state (2nd) argument to history.createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;
	
	      if (typeof location === 'string') location = _parsePath2['default'](location);
	
	      location = _extends({}, location, { state: action });
	
	      action = key;
	      key = arguments[3] || createKey();
	    }
	
	    return _createLocation3['default'](location, action, key);
	  }
	
	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }
	
	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }
	
	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);
	
	    push(_extends({ state: state }, path));
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);
	
	    replace(_extends({ state: state }, path));
	  }
	
	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,
	
	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}
	
	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(6);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _Actions = __webpack_require__(17);
	
	var _parsePath = __webpack_require__(5);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	  if (typeof location === 'string') location = _parsePath2['default'](location);
	
	  if (typeof action === 'object') {
	    true ? _warning2['default'](false, 'The state (2nd) argument to createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;
	
	    location = _extends({}, location, { state: action });
	
	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }
	
	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}
	
	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(33);
	var isArguments = __webpack_require__(34);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 33 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0;
	  var isDone = false;
	
	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) return;
	
	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }
	
	  next();
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.falsy = falsy;
	
	var _react = __webpack_require__(1);
	
	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	
	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}
	
	var history = shape({
	  listen: func.isRequired,
	  pushState: func.isRequired,
	  replaceState: func.isRequired,
	  go: func.isRequired
	});
	
	exports.history = history;
	var location = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});
	
	exports.location = location;
	var component = oneOfType([func, string]);
	exports.component = component;
	var components = oneOfType([component, object]);
	exports.components = components;
	var route = oneOfType([object, element]);
	exports.route = route;
	var routes = oneOfType([route, arrayOf(route)]);
	
	exports.routes = routes;
	exports['default'] = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _deprecateObjectProperties = __webpack_require__(38);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	var _getRouteParams = __webpack_require__(39);
	
	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);
	
	var _RouteUtils = __webpack_require__(23);
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <RouterContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */
	var RouterContext = _react2['default'].createClass({
	  displayName: 'RouterContext',
	
	  propTypes: {
	    history: object,
	    router: object.isRequired,
	    location: object.isRequired,
	    routes: array.isRequired,
	    params: object.isRequired,
	    components: array.isRequired,
	    createElement: func.isRequired
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      createElement: _react2['default'].createElement
	    };
	  },
	
	  childContextTypes: {
	    history: object,
	    location: object.isRequired,
	    router: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    var _props = this.props;
	    var router = _props.router;
	    var history = _props.history;
	    var location = _props.location;
	
	    if (!router) {
	      true ? _warning2['default'](false, '`<RouterContext>` expects a `router` rather than a `history`') : undefined;
	
	      router = _extends({}, history, {
	        setRouteLeaveHook: history.listenBeforeLeavingRoute
	      });
	      delete router.listenBeforeLeavingRoute;
	    }
	
	    if (true) {
	      location = _deprecateObjectProperties2['default'](location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation');
	    }
	
	    return { history: history, location: location, router: router };
	  },
	
	  createElement: function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  },
	
	  render: function render() {
	    var _this = this;
	
	    var _props2 = this.props;
	    var history = _props2.history;
	    var location = _props2.location;
	    var routes = _props2.routes;
	    var params = _props2.params;
	    var components = _props2.components;
	
	    var element = null;
	
	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.
	
	        var route = routes[index];
	        var routeParams = _getRouteParams2['default'](route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };
	
	        if (_RouteUtils.isReactChildren(element)) {
	          props.children = element;
	        } else if (element) {
	          for (var prop in element) {
	            if (element.hasOwnProperty(prop)) props[prop] = element[prop];
	          }
	        }
	
	        if (typeof components === 'object') {
	          var elements = {};
	
	          for (var key in components) {
	            if (components.hasOwnProperty(key)) {
	              // Pass through the key as a prop to createElement to allow
	              // custom createElement functions to know which named component
	              // they're rendering, for e.g. matching up to fetched data.
	              elements[key] = _this.createElement(components[key], _extends({
	                key: key }, props));
	            }
	          }
	
	          return elements;
	        }
	
	        return _this.createElement(components, props);
	      }, element);
	    }
	
	    !(element === null || element === false || _react2['default'].isValidElement(element)) ? true ? _invariant2['default'](false, 'The root route must render a single element') : _invariant2['default'](false) : undefined;
	
	    return element;
	  }
	
	});
	
	exports['default'] = RouterContext;
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/*eslint no-empty: 0*/
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = deprecateObjectProperties;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var useMembrane = false;
	
	if (true) {
	  try {
	    if (Object.defineProperty({}, 'x', { get: function get() {
	        return true;
	      } }).x) {
	      useMembrane = true;
	    }
	  } catch (e) {}
	}
	
	// wraps an object in a membrane to warn about deprecated property access
	
	function deprecateObjectProperties(object, message) {
	  if (!useMembrane) return object;
	
	  var membrane = {};
	
	  var _loop = function (prop) {
	    if (typeof object[prop] === 'function') {
	      membrane[prop] = function () {
	        true ? _warning2['default'](false, message) : undefined;
	        return object[prop].apply(object, arguments);
	      };
	    } else {
	      Object.defineProperty(membrane, prop, {
	        configurable: false,
	        enumerable: false,
	        get: function get() {
	          true ? _warning2['default'](false, message) : undefined;
	          return object[prop];
	        }
	      });
	    }
	  };
	
	  for (var prop in object) {
	    _loop(prop);
	  }
	
	  return membrane;
	}
	
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(14);
	
	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};
	
	  if (!route.path) return routeParams;
	
	  var paramNames = _PatternUtils.getParamNames(route.path);
	
	  for (var p in params) {
	    if (params.hasOwnProperty(p) && paramNames.indexOf(p) !== -1) routeParams[p] = params[p];
	  }return routeParams;
	}
	
	exports['default'] = getRouteParams;
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.createRouterObject = createRouterObject;
	exports.createRoutingHistory = createRoutingHistory;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _deprecateObjectProperties = __webpack_require__(38);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	function createRouterObject(history, transitionManager) {
	  return _extends({}, history, {
	    setRouteLeaveHook: transitionManager.listenBeforeLeavingRoute,
	    isActive: transitionManager.isActive
	  });
	}
	
	// deprecated
	
	function createRoutingHistory(history, transitionManager) {
	  history = _extends({}, history, transitionManager);
	
	  if (true) {
	    history = _deprecateObjectProperties2['default'](history, '`props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges');
	  }
	
	  return history;
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	var oneOfType = _React$PropTypes.oneOfType;
	
	function isLeftClickEvent(event) {
	  return event.button === 0;
	}
	
	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}
	
	function isEmptyObject(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p)) return false;
	  }return true;
	}
	
	function createLocationDescriptor(_ref) {
	  var to = _ref.to;
	  var query = _ref.query;
	  var hash = _ref.hash;
	  var state = _ref.state;
	
	  if (typeof to !== 'object') {
	    return { pathname: to, query: query, hash: hash, state: state };
	  } else {
	    return _extends({ query: query, hash: hash, state: state }, to);
	  }
	}
	
	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets the value of its
	 * activeClassName prop.
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */
	var Link = _react2['default'].createClass({
	  displayName: 'Link',
	
	  contextTypes: {
	    router: object
	  },
	
	  propTypes: {
	    to: oneOfType([string, object]).isRequired,
	    query: object,
	    hash: string,
	    state: object,
	    activeStyle: object,
	    activeClassName: string,
	    onlyActiveOnIndex: bool.isRequired,
	    onClick: func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onlyActiveOnIndex: false,
	      className: '',
	      style: {}
	    };
	  },
	
	  handleClick: function handleClick(event) {
	    var allowTransition = true;
	
	    if (this.props.onClick) this.props.onClick(event);
	
	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
	
	    if (event.defaultPrevented === true) allowTransition = false;
	
	    // If target prop is set (e.g. to "_blank") let browser handle link.
	    /* istanbul ignore if: untestable with Karma */
	    if (this.props.target) {
	      if (!allowTransition) event.preventDefault();
	
	      return;
	    }
	
	    event.preventDefault();
	
	    if (allowTransition) {
	      var _props = this.props;
	      var state = _props.state;
	      var to = _props.to;
	      var query = _props.query;
	      var hash = _props.hash;
	
	      var _location = createLocationDescriptor({ to: to, query: query, hash: hash, state: state });
	
	      this.context.router.push(_location);
	    }
	  },
	
	  render: function render() {
	    var _props2 = this.props;
	    var to = _props2.to;
	    var query = _props2.query;
	    var hash = _props2.hash;
	    var state = _props2.state;
	    var activeClassName = _props2.activeClassName;
	    var activeStyle = _props2.activeStyle;
	    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;
	
	    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);
	
	    true ? _warning2['default'](!(query || hash || state), 'the `query`, `hash`, and `state` props on `<Link>` are deprecated, use `<Link to={{ pathname, query, hash, state }}/>. http://tiny.cc/router-isActivedeprecated') : undefined;
	
	    // Ignore if rendered outside the context of router, simplifies unit testing.
	    var router = this.context.router;
	
	    if (router) {
	      var loc = createLocationDescriptor({ to: to, query: query, hash: hash, state: state });
	
	      props.href = router.createHref(loc);
	
	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (router.isActive(loc, onlyActiveOnIndex)) {
	          if (activeClassName) props.className += props.className === '' ? activeClassName : ' ' + activeClassName;
	
	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }
	
	    return _react2['default'].createElement('a', _extends({}, props, { onClick: this.handleClick }));
	  }
	
	});
	
	exports['default'] = Link;
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Link = __webpack_require__(41);
	
	var _Link2 = _interopRequireDefault(_Link);
	
	/**
	 * An <IndexLink> is used to link to an <IndexRoute>.
	 */
	var IndexLink = _react2['default'].createClass({
	  displayName: 'IndexLink',
	
	  render: function render() {
	    return _react2['default'].createElement(_Link2['default'], _extends({}, this.props, { onlyActiveOnIndex: true }));
	  }
	
	});
	
	exports['default'] = IndexLink;
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Redirect = __webpack_require__(44);
	
	var _Redirect2 = _interopRequireDefault(_Redirect);
	
	var _PropTypes = __webpack_require__(36);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * An <IndexRedirect> is used to redirect from an indexRoute.
	 */
	var IndexRedirect = _react2['default'].createClass({
	  displayName: 'IndexRedirect',
	
	  statics: {
	
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = _Redirect2['default'].createRouteFromReactElement(element);
	      } else {
	        true ? _warning2['default'](false, 'An <IndexRedirect> does not make sense at the root of your route config') : undefined;
	      }
	    }
	
	  },
	
	  propTypes: {
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _PropTypes.falsy,
	    children: _PropTypes.falsy
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	    true ? true ? _invariant2['default'](false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  }
	
	});
	
	exports['default'] = IndexRedirect;
	module.exports = exports['default'];

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(23);
	
	var _PatternUtils = __webpack_require__(14);
	
	var _PropTypes = __webpack_require__(36);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Redirect> is used to declare another URL path a client should
	 * be sent to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration
	 * and are traversed in the same manner.
	 */
	var Redirect = _react2['default'].createClass({
	  displayName: 'Redirect',
	
	  statics: {
	
	    createRouteFromReactElement: function createRouteFromReactElement(element) {
	      var route = _RouteUtils.createRouteFromReactElement(element);
	
	      if (route.from) route.path = route.from;
	
	      route.onEnter = function (nextState, replaceState) {
	        var location = nextState.location;
	        var params = nextState.params;
	
	        var pathname = undefined;
	        if (route.to.charAt(0) === '/') {
	          pathname = _PatternUtils.formatPattern(route.to, params);
	        } else if (!route.to) {
	          pathname = location.pathname;
	        } else {
	          var routeIndex = nextState.routes.indexOf(route);
	          var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
	          var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
	          pathname = _PatternUtils.formatPattern(pattern, params);
	        }
	
	        replaceState(route.state || location.state, pathname, route.query || location.query);
	      };
	
	      return route;
	    },
	
	    getRoutePattern: function getRoutePattern(routes, routeIndex) {
	      var parentPattern = '';
	
	      for (var i = routeIndex; i >= 0; i--) {
	        var route = routes[i];
	        var pattern = route.path || '';
	
	        parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;
	
	        if (pattern.indexOf('/') === 0) break;
	      }
	
	      return '/' + parentPattern;
	    }
	
	  },
	
	  propTypes: {
	    path: string,
	    from: string, // Alias for path
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _PropTypes.falsy,
	    children: _PropTypes.falsy
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	    true ? true ? _invariant2['default'](false, '<Redirect> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  }
	
	});
	
	exports['default'] = Redirect;
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(23);
	
	var _PropTypes = __webpack_require__(36);
	
	var func = _react2['default'].PropTypes.func;
	
	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */
	var IndexRoute = _react2['default'].createClass({
	  displayName: 'IndexRoute',
	
	  statics: {
	
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = _RouteUtils.createRouteFromReactElement(element);
	      } else {
	        true ? _warning2['default'](false, 'An <IndexRoute> does not make sense at the root of your route config') : undefined;
	      }
	    }
	
	  },
	
	  propTypes: {
	    path: _PropTypes.falsy,
	    component: _PropTypes.component,
	    components: _PropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	    true ? true ? _invariant2['default'](false, '<IndexRoute> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  }
	
	});
	
	exports['default'] = IndexRoute;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(23);
	
	var _PropTypes = __webpack_require__(36);
	
	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	
	/**
	 * A <Route> is used to declare which components are rendered to the
	 * page when the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is
	 * requested, the tree is searched depth-first to find a route whose
	 * path matches the URL.  When one is found, all routes in the tree
	 * that lead to it are considered "active" and their components are
	 * rendered into the DOM, nested in the same order as in the tree.
	 */
	var Route = _react2['default'].createClass({
	  displayName: 'Route',
	
	  statics: {
	    createRouteFromReactElement: _RouteUtils.createRouteFromReactElement
	  },
	
	  propTypes: {
	    path: string,
	    component: _PropTypes.component,
	    components: _PropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	    true ? true ? _invariant2['default'](false, '<Route> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  }
	
	});
	
	exports['default'] = Route;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _PropTypes = __webpack_require__(36);
	
	/**
	 * A mixin that adds the "history" instance variable to components.
	 */
	var History = {
	
	  contextTypes: {
	    history: _PropTypes.history
	  },
	
	  componentWillMount: function componentWillMount() {
	    true ? _warning2['default'](false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : undefined;
	    this.history = this.context.history;
	  }
	
	};
	
	exports['default'] = History;
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var object = _react2['default'].PropTypes.object;
	
	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
	 * component that may be used to cancel a transition or prompt the user
	 * for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * During the beforeunload event (assuming you're using the useBeforeUnload
	 * history enhancer), routerWillLeave does not receive a location object
	 * because it isn't possible for us to know the location we're transitioning
	 * to. In this case routerWillLeave must return a prompt message to prevent
	 * the user from closing the window/tab.
	 */
	var Lifecycle = {
	
	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },
	
	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },
	
	  componentDidMount: function componentDidMount() {
	    true ? _warning2['default'](false, 'the `Lifecycle` mixin is deprecated, please use `context.router.setRouteLeaveHook(route, hook)`. http://tiny.cc/router-lifecyclemixin') : undefined;
	    !this.routerWillLeave ? true ? _invariant2['default'](false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : _invariant2['default'](false) : undefined;
	
	    var route = this.props.route || this.context.route;
	
	    !route ? true ? _invariant2['default'](false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : _invariant2['default'](false) : undefined;
	
	    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
	  },
	
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
	  }
	
	};
	
	exports['default'] = Lifecycle;
	module.exports = exports['default'];

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(16);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var object = _react2['default'].PropTypes.object;
	
	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */
	var RouteContext = {
	
	  propTypes: {
	    route: object.isRequired
	  },
	
	  childContextTypes: {
	    route: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  },
	
	  componentWillMount: function componentWillMount() {
	    true ? _warning2['default'](false, 'The `RouteContext` mixin is deprecated. You can provide `this.props.route` on context with your own `contextTypes`. http://tiny.cc/router-routecontextmixin') : undefined;
	  }
	
	};
	
	exports['default'] = RouteContext;
	module.exports = exports['default'];

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _createMemoryHistory = __webpack_require__(51);
	
	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
	
	var _createTransitionManager = __webpack_require__(12);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _RouteUtils = __webpack_require__(23);
	
	var _RouterUtils = __webpack_require__(40);
	
	/**
	 * A high-level API to be used for server-side rendering.
	 *
	 * This function matches a location to a set of routes and calls
	 * callback(error, redirectLocation, renderProps) when finished.
	 *
	 * Note: You probably don't want to use this in a browser. Use
	 * the history.listen API instead.
	 */
	function match(_ref, callback) {
	  var history = _ref.history;
	  var routes = _ref.routes;
	  var location = _ref.location;
	
	  var options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);
	
	  !location ? true ? _invariant2['default'](false, 'match needs a location') : _invariant2['default'](false) : undefined;
	
	  history = history ? history : _createMemoryHistory2['default'](options);
	  var transitionManager = _createTransitionManager2['default'](history, _RouteUtils.createRoutes(routes));
	
	  // Allow match({ location: '/the/path', ... })
	  if (typeof location === 'string') location = history.createLocation(location);
	
	  var router = _RouterUtils.createRouterObject(history, transitionManager);
	  history = _RouterUtils.createRoutingHistory(history, transitionManager);
	
	  transitionManager.match(location, function (error, redirectLocation, nextState) {
	    callback(error, redirectLocation, nextState && _extends({}, nextState, { history: history, router: router }));
	  });
	}
	
	exports['default'] = match;
	module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = createMemoryHistory;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _historyLibUseQueries = __webpack_require__(4);
	
	var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
	
	var _historyLibCreateMemoryHistory = __webpack_require__(52);
	
	var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);
	
	function createMemoryHistory(options) {
	  // signatures and type checking differ between `useRoutes` and
	  // `createMemoryHistory`, have to create `memoryHistory` first because
	  // `useQueries` doesn't understand the signature
	  var memoryHistory = _historyLibCreateMemoryHistory2['default'](options);
	  var createHistory = function createHistory() {
	    return memoryHistory;
	  };
	  var history = _historyLibUseQueries2['default'](createHistory)(options);
	  history.__v2_compatible__ = true;
	  return history;
	}
	
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(6);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(17);
	
	var _createHistory = __webpack_require__(30);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	var _parsePath = __webpack_require__(5);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}
	
	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }
	
	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));
	
	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;
	
	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }
	
	  entries = entries.map(function (entry) {
	    var key = history.createKey();
	
	    if (typeof entry === 'string') return { pathname: entry, key: key };
	
	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });
	
	    true ? true ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });
	
	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? true ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }
	
	  var storage = createStateStorage(entries);
	
	  function saveState(key, state) {
	    storage[key] = state;
	  }
	
	  function readState(key) {
	    return storage[key];
	  }
	
	  function getCurrentLocation() {
	    var entry = entries[current];
	    var key = entry.key;
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;
	
	    var path = (basename || '') + pathname + (search || '');
	
	    var state = undefined;
	    if (key) {
	      state = readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	      entry.key = key;
	    }
	
	    var location = _parsePath2['default'](path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }
	
	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	        true ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }
	
	      current += n;
	
	      var currentLocation = getCurrentLocation();
	
	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }
	
	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;
	
	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);
	
	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }
	
	  return history;
	}
	
	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = useRouterHistory;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _historyLibUseQueries = __webpack_require__(4);
	
	var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
	
	var _historyLibUseBasename = __webpack_require__(54);
	
	var _historyLibUseBasename2 = _interopRequireDefault(_historyLibUseBasename);
	
	function useRouterHistory(createHistory) {
	  return function (options) {
	    var history = _historyLibUseQueries2['default'](_historyLibUseBasename2['default'](createHistory))(options);
	    history.__v2_compatible__ = true;
	    return history;
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _ExecutionEnvironment = __webpack_require__(26);
	
	var _runTransitionHook = __webpack_require__(10);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _extractPath = __webpack_require__(7);
	
	var _extractPath2 = _interopRequireDefault(_extractPath);
	
	var _parsePath = __webpack_require__(5);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	var _deprecate = __webpack_require__(11);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var basename = options.basename;
	
	    var historyOptions = _objectWithoutProperties(options, ['basename']);
	
	    var history = createHistory(historyOptions);
	
	    // Automatically use the value of <base href> in HTML
	    // documents as basename if it's not explicitly given.
	    if (basename == null && _ExecutionEnvironment.canUseDOM) {
	      var base = document.getElementsByTagName('base')[0];
	
	      if (base) basename = _extractPath2['default'](base.href);
	    }
	
	    function addBasename(location) {
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;
	
	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }
	
	      return location;
	    }
	
	    function prependBasename(location) {
	      if (!basename) return location;
	
	      if (typeof location === 'string') location = _parsePath2['default'](location);
	
	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;
	
	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }
	
	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }
	
	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }
	
	    function replace(location) {
	      history.replace(prependBasename(location));
	    }
	
	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }
	
	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }
	
	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    }
	
	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      push(_extends({ state: state }, path));
	    }
	
	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);
	
	      replace(_extends({ state: state }, path));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useBasename;
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _historyLibCreateBrowserHistory = __webpack_require__(56);
	
	var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);
	
	var _createRouterHistory = __webpack_require__(57);
	
	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);
	
	exports['default'] = _createRouterHistory2['default'](_historyLibCreateBrowserHistory2['default']);
	module.exports = exports['default'];

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(15);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(17);
	
	var _ExecutionEnvironment = __webpack_require__(26);
	
	var _DOMUtils = __webpack_require__(27);
	
	var _DOMStateStorage = __webpack_require__(28);
	
	var _createDOMHistory = __webpack_require__(29);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	var _parsePath = __webpack_require__(5);
	
	var _parsePath2 = _interopRequireDefault(_parsePath);
	
	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? true ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var forceRefresh = options.forceRefresh;
	
	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;
	
	  function getCurrentLocation(historyState) {
	    historyState = historyState || window.history.state || {};
	
	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;
	
	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	
	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
	    }
	
	    var location = _parsePath2['default'](path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.
	
	      transitionTo(getCurrentLocation(event.state));
	    }
	
	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    _DOMStateStorage.saveState(key, state);
	
	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };
	
	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopPopStateListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopPopStateListener();
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}
	
	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _useRouterHistory = __webpack_require__(53);
	
	var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);
	
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
	exports['default'] = function (createHistory) {
	  var history = undefined;
	  if (canUseDOM) history = _useRouterHistory2['default'](createHistory)();
	  return history;
	};
	
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _historyLibCreateHashHistory = __webpack_require__(25);
	
	var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);
	
	var _createRouterHistory = __webpack_require__(57);
	
	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);
	
	exports['default'] = _createRouterHistory2['default'](_historyLibCreateHashHistory2['default']);
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTAyNjdjZmNmOTU5YmY5MTY4MmYiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1saXRlL2Rpc3QvcmVhY3QtbGl0ZS5jb21tb24uanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL3VzZVJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi91c2VRdWVyaWVzLmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL3BhcnNlUGF0aC5qcyIsIndlYnBhY2s6Ly8vLi4vfi93YXJuaW5nL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9saWIvZXh0cmFjdFBhdGguanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9+L3F1ZXJ5LXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L34vcXVlcnktc3RyaW5nL34vc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9saWIvcnVuVHJhbnNpdGlvbkhvb2suanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9saWIvZGVwcmVjYXRlLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9pc0FjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL1BhdHRlcm5VdGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9pbnZhcmlhbnQvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9saWIvQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXB1dGVDaGFuZ2VkUm91dGVzLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvVHJhbnNpdGlvblV0aWxzLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvQXN5bmNVdGlscy5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL2dldENvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9tYXRjaFJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRlVXRpbHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9Sb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9saWIvY3JlYXRlSGFzaEhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9saWIvRE9NVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9saWIvRE9NU3RhdGVTdG9yYWdlLmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL2NyZWF0ZURPTUhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4uL34vaGlzdG9yeS9saWIvY3JlYXRlSGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9jcmVhdGVMb2NhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L34vZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L34vZGVlcC1lcXVhbC9saWIva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L34vZGVlcC1lcXVhbC9saWIvaXNfYXJndW1lbnRzLmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL0FzeW5jVXRpbHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9Qcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9Sb3V0ZXJDb250ZXh0LmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvZGVwcmVjYXRlT2JqZWN0UHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL2dldFJvdXRlUGFyYW1zLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvUm91dGVyVXRpbHMuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9MaW5rLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvSW5kZXhMaW5rLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvSW5kZXhSZWRpcmVjdC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JlZGlyZWN0LmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvSW5kZXhSb3V0ZS5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRlLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvSGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL0xpZmVjeWNsZS5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRlQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL21hdGNoLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvY3JlYXRlTWVtb3J5SGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi9jcmVhdGVNZW1vcnlIaXN0b3J5LmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvdXNlUm91dGVySGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi4vfi9oaXN0b3J5L2xpYi91c2VCYXNlbmFtZS5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL2Jyb3dzZXJIaXN0b3J5LmpzIiwid2VicGFjazovLy8uLi9+L2hpc3RvcnkvbGliL2NyZWF0ZUJyb3dzZXJIaXN0b3J5LmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvY3JlYXRlUm91dGVySGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL2hhc2hIaXN0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBOztBQUVBO0FBQ0EsdUVBQXNFOztBQUV0RTs7QUFFQTtBQUNBLG9EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsNkVBQTRFO0FBQzVFO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRHQUE0STs7QUFFNUk7O0FBRUEsNkJBQTRCLGFBQWEsZ0JBQWdCOztBQUV6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFnQztBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQSxxQzs7Ozs7Ozs7Ozs7OzZDQ2pMNkIsRUFBb0I7Ozs7QUFFakQsS0FBTSxTQUFTLEdBQUcsQ0FBQyxFQUNqQixPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FDbEY7O3NCQUVjLFVBQVUsYUFBYSxFQUFFO0FBQ3RDLE9BQUksT0FBTztBQUNYLE9BQUksU0FBUyxFQUNYLE9BQU8sR0FBRyw4QkFBaUIsYUFBYSxDQUFDLEVBQUU7QUFDN0MsVUFBTyxPQUFPO0VBQ2Y7Ozs7Ozs7Ozs7Ozs7O3dEQ1g2QixFQUErQjs7OztnREFDN0IsRUFBdUI7Ozs7c0JBQ3hDLDBFQUFzQyIsImZpbGUiOiJzaGFyZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gd2luZG93W1wid2VicGFja0pzb25wXCJdO1xuIFx0d2luZG93W1wid2VicGFja0pzb25wXCJdID0gZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soY2h1bmtJZHMsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgY2FsbGJhY2tzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSlcbiBcdFx0XHRcdGNhbGxiYWNrcy5wdXNoLmFwcGx5KGNhbGxiYWNrcywgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oY2h1bmtJZHMsIG1vcmVNb2R1bGVzKTtcbiBcdFx0d2hpbGUoY2FsbGJhY2tzLmxlbmd0aClcbiBcdFx0XHRjYWxsYmFja3Muc2hpZnQoKS5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuIFx0XHRpZihtb3JlTW9kdWxlc1swXSkge1xuIFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbMF0gPSAwO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHQvLyBBcnJheSBtZWFucyBcImxvYWRpbmdcIiwgYXJyYXkgY29udGFpbnMgY2FsbGJhY2tzXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHQzNTowXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xuIFx0XHQvLyBcIjBcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKVxuIFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIGFuIGFycmF5IG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0ucHVzaChjYWxsYmFjayk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtjYWxsYmFja107XG4gXHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuIFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xuXG4gXHRcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuY2h1bmsuanNcIjtcbiBcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL19fYnVpbGRfXy9cIjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDUwMjY3Y2ZjZjk1OWJmOTE2ODJmXG4gKiovIiwiLyohXG4gKiByZWFjdC1saXRlLmpzIHYwLjAuMjJcbiAqIChjKSAyMDE2IEphZGUgR3VcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVk5PREVfVFlQRSA9IHtcblx0RUxFTUVOVDogMSxcblx0Q09NUE9ORU5UOiAyLFxuXHRTVEFURUxFU1NfQ09NUE9ORU5UOiAzLFxuXHRURVhUOiA0XG59O1xudmFyIERJRkZfVFlQRSA9IHtcblx0Q1JFQVRFOiAxLFxuXHRSRU1PVkU6IDIsXG5cdFJFUExBQ0U6IDMsXG5cdFVQREFURTogNFxufTtcblxudmFyIENPTVBPTkVOVF9JRCA9ICdsaXRlaWQnO1xuXG52YXIgaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbiBpc1ZhbGlkRWxlbWVudChvYmopIHtcblx0cmV0dXJuIG9iaiAhPSBudWxsICYmICEhb2JqLnZ0eXBlO1xufTtcblxudmFyIGNsb25lRWxlbWVudCA9IGZ1bmN0aW9uIGNsb25lRWxlbWVudChvcmlnaW5FbGVtLCBwcm9wcykge1xuXHRmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdFx0Y2hpbGRyZW5bX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuXHR9XG5cblx0dmFyIHR5cGUgPSBvcmlnaW5FbGVtLnR5cGU7XG5cdHZhciBrZXkgPSBvcmlnaW5FbGVtLmtleTtcblx0dmFyIHJlZiA9IG9yaWdpbkVsZW0ucmVmO1xuXG5cdHByb3BzID0gZXh0ZW5kKHsga2V5OiBrZXksIHJlZjogcmVmIH0sIG9yaWdpbkVsZW0ucHJvcHMsIHByb3BzKTtcblx0dmFyIHZub2RlID0gY3JlYXRlRWxlbWVudC5hcHBseSh1bmRlZmluZWQsIFt0eXBlLCBwcm9wc10uY29uY2F0KGNoaWxkcmVuKSk7XG5cdGlmICh2bm9kZS5yZWYgPT09IG9yaWdpbkVsZW0ucmVmKSB7XG5cdFx0dm5vZGUucmVmcyA9IG9yaWdpbkVsZW0ucmVmcztcblx0fVxuXHRyZXR1cm4gdm5vZGU7XG59O1xuXG52YXIgY3JlYXRlRmFjdG9yeSA9IGZ1bmN0aW9uIGNyZWF0ZUZhY3RvcnkodHlwZSkge1xuXHR2YXIgZmFjdG9yeSA9IGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG5cdFx0Zm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcblx0XHRcdGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY3JlYXRlRWxlbWVudC5hcHBseSh1bmRlZmluZWQsIFt0eXBlXS5jb25jYXQoYXJncykpO1xuXHR9O1xuXHRmYWN0b3J5LnR5cGUgPSB0eXBlO1xuXHRyZXR1cm4gZmFjdG9yeTtcbn07XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcykge1xuXHRmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gQXJyYXkoX2xlbjMgPiAyID8gX2xlbjMgLSAyIDogMCksIF9rZXkzID0gMjsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuXHRcdGNoaWxkcmVuW19rZXkzIC0gMl0gPSBhcmd1bWVudHNbX2tleTNdO1xuXHR9XG5cblx0dmFyIFZub2RlID0gdW5kZWZpbmVkO1xuXHRzd2l0Y2ggKHRydWUpIHtcblx0XHRjYXNlIGlzU3RyKHR5cGUpOlxuXHRcdFx0Vm5vZGUgPSBWZWxlbTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgaXNDb21wb25lbnQodHlwZSk6XG5cdFx0XHRWbm9kZSA9IFZjb21wb25lbnQ7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGlzU3RhdGVsZXNzQ29tcG9uZW50KHR5cGUpOlxuXHRcdFx0Vm5vZGUgPSBWc3RhdGVsZXNzQ29tcG9uZW50O1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRocm93IG5ldyBFcnJvcignUmVhY3QuY3JlYXRlRWxlbWVudDogdW5leHBlY3QgdHlwZSBbICcgKyB0eXBlICsgJyBdJyk7XG5cdH1cblx0dmFyIGtleSA9IG51bGw7XG5cdHZhciByZWYgPSBudWxsO1xuXHR2YXIgaGFzUmVmID0gZmFsc2U7XG5cdGlmIChwcm9wcyAhPSBudWxsKSB7XG5cdFx0aWYgKCFpc1VuZGVmaW5lZChwcm9wcy5rZXkpKSB7XG5cdFx0XHRrZXkgPSAnJyArIHByb3BzLmtleTtcblx0XHRcdGRlbGV0ZSBwcm9wcy5rZXk7XG5cdFx0fVxuXHRcdGlmICghaXNVbmRlZmluZWQocHJvcHMucmVmKSkge1xuXHRcdFx0cmVmID0gcHJvcHMucmVmO1xuXHRcdFx0ZGVsZXRlIHByb3BzLnJlZjtcblx0XHRcdGhhc1JlZiA9IHRydWU7XG5cdFx0fVxuXHR9XG5cdHZhciB2bm9kZSA9IG5ldyBWbm9kZSh0eXBlLCBtZXJnZVByb3BzKHByb3BzLCBjaGlsZHJlbiwgdHlwZS5kZWZhdWx0UHJvcHMpKTtcblx0dm5vZGUua2V5ID0ga2V5O1xuXHR2bm9kZS5yZWYgPSByZWY7XG5cdGlmIChoYXNSZWYgJiYgVm5vZGUgIT09IFZzdGF0ZWxlc3NDb21wb25lbnQpIHtcblx0XHRoYW5kbGVWbm9kZVdpdGhSZWYodm5vZGUpO1xuXHR9XG5cdHJldHVybiB2bm9kZTtcbn07XG5cbnZhciBkaWZmID0gZnVuY3Rpb24gZGlmZih2bm9kZSwgbmV3Vm5vZGUpIHtcblx0dmFyIHR5cGUgPSB1bmRlZmluZWQ7XG5cdHN3aXRjaCAodHJ1ZSkge1xuXHRcdGNhc2Ugdm5vZGUgPT09IG5ld1Zub2RlOlxuXHRcdFx0cmV0dXJuIHR5cGU7XG5cdFx0Y2FzZSBpc1VuZGVmaW5lZChuZXdWbm9kZSk6XG5cdFx0XHR0eXBlID0gRElGRl9UWVBFLlJFTU9WRTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgaXNVbmRlZmluZWQodm5vZGUpOlxuXHRcdFx0dHlwZSA9IERJRkZfVFlQRS5DUkVBVEU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIHZub2RlLnR5cGUgIT09IG5ld1Zub2RlLnR5cGU6XG5cdFx0XHR0eXBlID0gRElGRl9UWVBFLlJFUExBQ0U7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIG5ld1Zub2RlLmtleSAhPT0gbnVsbDpcblx0XHRcdGlmICh2bm9kZS5rZXkgPT09IG51bGwgfHwgbmV3Vm5vZGUua2V5ICE9PSB2bm9kZS5rZXkpIHtcblx0XHRcdFx0dHlwZSA9IERJRkZfVFlQRS5SRVBMQUNFO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dHlwZSA9IERJRkZfVFlQRS5VUERBVEU7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIHZub2RlLmtleSAhPT0gbnVsbDpcblx0XHRcdHR5cGUgPSBESUZGX1RZUEUuUkVQTEFDRTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0eXBlID0gRElGRl9UWVBFLlVQREFURTtcblx0fVxuXHRyZXR1cm4gdHlwZTtcbn07XG5cbnZhciBpc1R5cGUgPSBmdW5jdGlvbiBpc1R5cGUodHlwZSkge1xuXHRyZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuXHRcdHJldHVybiBvYmogIT0gbnVsbCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIHR5cGUgKyAnXSc7XG5cdH07XG59O1xudmFyIGlzT2JqID0gaXNUeXBlKCdPYmplY3QnKTtcbnZhciBpc1N0ciA9IGlzVHlwZSgnU3RyaW5nJyk7XG52YXIgaXNGbiA9IGlzVHlwZSgnRnVuY3Rpb24nKTtcbnZhciBpc0JsbiA9IGlzVHlwZSgnQm9vbGVhbicpO1xudmFyIGlzQXJyID0gQXJyYXkuaXNBcnJheSB8fCBpc1R5cGUoJ0FycmF5Jyk7XG52YXIgaXNVbmRlZmluZWQgPSBmdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcblx0cmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkO1xufTtcbnZhciBpc0NvbXBvbmVudCA9IGZ1bmN0aW9uIGlzQ29tcG9uZW50KG9iaikge1xuXHRyZXR1cm4gb2JqICYmIG9iai5wcm90b3R5cGUgJiYgJ2ZvcmNlVXBkYXRlJyBpbiBvYmoucHJvdG90eXBlO1xufTtcbnZhciBpc1N0YXRlbGVzc0NvbXBvbmVudCA9IGZ1bmN0aW9uIGlzU3RhdGVsZXNzQ29tcG9uZW50KG9iaikge1xuXHRyZXR1cm4gaXNGbihvYmopICYmICghb2JqLnByb3RvdHlwZSB8fCAhKCdmb3JjZVVwZGF0ZScgaW4gb2JqLnByb3RvdHlwZSkpO1xufTtcblxudmFyIG5vb3AkMSA9IGZ1bmN0aW9uIG5vb3AoKSB7fTtcbnZhciBpZGVudGl0eSA9IGZ1bmN0aW9uIGlkZW50aXR5KG9iaikge1xuXHRyZXR1cm4gb2JqO1xufTtcblxudmFyIHBpcGUgPSBmdW5jdGlvbiBwaXBlKGZuMSwgZm4yKSB7XG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0Zm4xLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGZuMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHR9O1xufTtcblxudmFyIGZsYXR0ZW5DaGlsZHJlbiA9IGZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihsaXN0LCBpdGVyYXRlZSwgcmVjb3JkKSB7XG5cdHJlY29yZCA9IHJlY29yZCB8fCB7IGluZGV4OiAwIH07XG5cdGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdGlmIChpc0FycihpdGVtKSkge1xuXHRcdFx0ZmxhdHRlbkNoaWxkcmVuKGl0ZW0sIGl0ZXJhdGVlLCByZWNvcmQpO1xuXHRcdH0gZWxzZSBpZiAoIWlzVW5kZWZpbmVkKGl0ZW0pICYmICFpc0JsbihpdGVtKSkge1xuXHRcdFx0aXRlcmF0ZWUoaXRlbSwgcmVjb3JkLmluZGV4KTtcblx0XHRcdHJlY29yZC5pbmRleCArPSAxO1xuXHRcdH1cblx0fVxufTtcblxudmFyIGVhY2hJdGVtID0gZnVuY3Rpb24gZWFjaEl0ZW0obGlzdCwgaXRlcmF0ZWUpIHtcblx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRpdGVyYXRlZShsaXN0W2ldLCBpKTtcblx0fVxufTtcblxudmFyIG1hcFZhbHVlID0gZnVuY3Rpb24gbWFwVmFsdWUob2JqLCBpdGVyYXRlZSkge1xuXHRmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdFx0aWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRpdGVyYXRlZShvYmpba2V5XSwga2V5KTtcblx0XHR9XG5cdH1cbn07XG5cbnZhciBtYXBLZXkgPSBmdW5jdGlvbiBtYXBLZXkob2xkT2JqLCBuZXdPYmosIGl0ZXJhdGVlKSB7XG5cdHZhciBrZXlNYXAgPSB7fTtcblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gb2xkT2JqKSB7XG5cdFx0aWYgKG9sZE9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRrZXlNYXBba2V5XSA9IHRydWU7XG5cdFx0XHRpdGVyYXRlZShrZXkpO1xuXHRcdH1cblx0fVxuXHRmb3IgKGtleSBpbiBuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqLmhhc093blByb3BlcnR5KGtleSkgJiYga2V5TWFwW2tleV0gIT09IHRydWUpIHtcblx0XHRcdGl0ZXJhdGVlKGtleSk7XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xuXHRmb3IgKHZhciBpID0gMSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0dmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblx0XHRpZiAoc291cmNlICE9IG51bGwpIHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcblx0XHRcdFx0aWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICFpc1VuZGVmaW5lZChzb3VyY2Vba2V5XSkpIHtcblx0XHRcdFx0XHR0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgdWlkID0gMDtcbnZhciBnZXRVaWQgPSBmdW5jdGlvbiBnZXRVaWQoKSB7XG5cdHJldHVybiArK3VpZDtcbn07XG5cbnZhciBnZXRDaGlsZHJlbiA9IGZ1bmN0aW9uIGdldENoaWxkcmVuKGNoaWxkcmVuKSB7XG5cdHZhciBjaGlsZHJlbkxlbiA9IGNoaWxkcmVuLmxlbmd0aDtcblx0aWYgKGNoaWxkcmVuTGVuID4gMCkge1xuXHRcdGlmIChjaGlsZHJlbkxlbiA9PT0gMSkge1xuXHRcdFx0Y2hpbGRyZW4gPSBjaGlsZHJlblswXTtcblx0XHR9XG5cdFx0cmV0dXJuIGNoaWxkcmVuO1xuXHR9XG59O1xudmFyIG1lcmdlUHJvcHMgPSBmdW5jdGlvbiBtZXJnZVByb3BzKHByb3BzLCBjaGlsZHJlbiwgZGVmYXVsdFByb3BzKSB7XG5cdHZhciByZXN1bHQgPSBleHRlbmQoe30sIGRlZmF1bHRQcm9wcywgcHJvcHMpO1xuXHRjaGlsZHJlbiA9IGdldENoaWxkcmVuKGNoaWxkcmVuKTtcblx0aWYgKCFpc1VuZGVmaW5lZChjaGlsZHJlbikpIHtcblx0XHRyZXN1bHQuY2hpbGRyZW4gPSBjaGlsZHJlbjtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGlnbm9yZUtleXMgPSB7XG5cdGtleTogdHJ1ZSxcblx0cmVmOiB0cnVlLFxuXHRjaGlsZHJlbjogdHJ1ZVxufTtcbnZhciBFVkVOVF9LRVlTID0gL15vbi9pO1xudmFyIGlzSW5uZXJIVE1MS2V5ID0gZnVuY3Rpb24gaXNJbm5lckhUTUxLZXkoa2V5KSB7XG5cdHJldHVybiBrZXkgPT09ICdkYW5nZXJvdXNseVNldElubmVySFRNTCc7XG59O1xudmFyIGlzU3R5bGVLZXkgPSBmdW5jdGlvbiBpc1N0eWxlS2V5KGtleSkge1xuXHRyZXR1cm4ga2V5ID09PSAnc3R5bGUnO1xufTtcbi8vIFNldHRpbmcgLnR5cGUgdGhyb3dzIG9uIG5vbi08aW5wdXQ+IHRhZ3NcbnZhciBpc1R5cGVLZXkgPSBmdW5jdGlvbiBpc1R5cGVLZXkoa2V5KSB7XG5cdHJldHVybiBrZXkgPT09ICd0eXBlJztcbn07XG5cbi8qXHJcbiAgRE9NIFByb3BlcnRpZXMgd2hpY2ggYXJlIG9ubHkgZ2V0dGVyXHJcbiovXG52YXIgcmVhZE9ubHlQcm9wcyA9ICdub2RlTmFtZXxub2RlVmFsdWV8bm9kZVR5cGV8cGFyZW50Tm9kZXxjaGlsZE5vZGVzfGNsYXNzTGlzdHxmaXJzdENoaWxkfGxhc3RDaGlsZHxwcmV2aW91c1NpYmxpbmd8cHJldmlvdXNFbGVtZW50U2libGluZ3xuZXh0U2libGluZ3xuZXh0RWxlbWVudFNpYmxpbmd8YXR0cmlidXRlc3xvd25lckRvY3VtZW50fG5hbWVzcGFjZVVSSXxsb2NhbE5hbWV8YmFzZVVSSXxwcmVmaXh8bGVuZ3RofHNwZWNpZmllZHx0YWdOYW1lfG9mZnNldFRvcHxvZmZzZXRMZWZ0fG9mZnNldFdpZHRofG9mZnNldEhlaWdodHxvZmZzZXRQYXJlbnR8c2Nyb2xsV2lkdGh8c2Nyb2xsSGVpZ2h0fGNsaWVudFRvcHxjbGllbnRMZWZ0fGNsaWVudFdpZHRofGNsaWVudEhlaWdodHx4fHknO1xudmFyIHJlYWRPbmx5cyA9IHt9O1xuZWFjaEl0ZW0ocmVhZE9ubHlQcm9wcy5zcGxpdCgnfCcpLCBmdW5jdGlvbiAoa2V5KSB7XG5cdHJlYWRPbmx5c1trZXldID0gdHJ1ZTtcbn0pO1xudmFyIHNldFByb3AgPSBmdW5jdGlvbiBzZXRQcm9wKGVsZW0sIGtleSwgdmFsdWUpIHtcblx0c3dpdGNoICh0cnVlKSB7XG5cdFx0Y2FzZSBpZ25vcmVLZXlzW2tleV0gPT09IHRydWU6XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIEVWRU5UX0tFWVMudGVzdChrZXkpOlxuXHRcdFx0YWRkRXZlbnQoZWxlbSwga2V5LCB2YWx1ZSk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGlzU3R5bGVLZXkoa2V5KTpcblx0XHRcdHNldFN0eWxlKGVsZW0sIHZhbHVlKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgaXNJbm5lckhUTUxLZXkoa2V5KTpcblx0XHRcdHZhbHVlICYmIHZhbHVlLl9faHRtbCAhPSBudWxsICYmIChlbGVtLmlubmVySFRNTCA9IHZhbHVlLl9faHRtbCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGtleSBpbiBlbGVtICYmICFpc1R5cGVLZXkoa2V5KTpcblx0XHRcdGlmIChyZWFkT25seXNba2V5XSAhPT0gdHJ1ZSAmJiAhKGtleSA9PT0gJ3RpdGxlJyAmJiB2YWx1ZSA9PSBudWxsKSkge1xuXHRcdFx0XHRlbGVtW2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZShrZXksICcnICsgdmFsdWUpO1xuXHR9XG59O1xudmFyIHNldFByb3BzID0gZnVuY3Rpb24gc2V0UHJvcHMoZWxlbSwgcHJvcHMpIHtcblx0bWFwVmFsdWUocHJvcHMsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cdFx0c2V0UHJvcChlbGVtLCBrZXksIHZhbHVlKTtcblx0fSk7XG59O1xudmFyIHJlbW92ZVByb3BzID0gZnVuY3Rpb24gcmVtb3ZlUHJvcHMoZWxlbSwgb2xkUHJvcHMpIHtcblx0bWFwVmFsdWUob2xkUHJvcHMsIGZ1bmN0aW9uIChvbGRWYWx1ZSwga2V5KSB7XG5cdFx0cmVtb3ZlUHJvcChlbGVtLCBrZXksIG9sZFZhbHVlKTtcblx0fSk7XG59O1xudmFyIHJlbW92ZVByb3AgPSBmdW5jdGlvbiByZW1vdmVQcm9wKGVsZW0sIGtleSwgb2xkVmFsdWUpIHtcblx0c3dpdGNoICh0cnVlKSB7XG5cdFx0Y2FzZSBpZ25vcmVLZXlzW2tleV0gPT09IHRydWU6XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIEVWRU5UX0tFWVMudGVzdChrZXkpOlxuXHRcdFx0cmVtb3ZlRXZlbnQoZWxlbSwga2V5KTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgaXNTdHlsZUtleShrZXkpOlxuXHRcdFx0cmVtb3ZlU3R5bGUoZWxlbSwgb2xkVmFsdWUpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBpc0lubmVySFRNTEtleShrZXkpOlxuXHRcdFx0ZWxlbS5pbm5lckhUTUwgPSAnJztcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgIShrZXkgaW4gZWxlbSkgfHwgaXNUeXBlS2V5KGtleSk6XG5cdFx0XHRlbGVtLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBpc0ZuKG9sZFZhbHVlKTpcblx0XHRcdGVsZW1ba2V5XSA9IG51bGw7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIGlzU3RyKG9sZFZhbHVlKTpcblx0XHRcdGVsZW1ba2V5XSA9ICcnO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBpc0JsbihvbGRWYWx1ZSk6XG5cdFx0XHRlbGVtW2tleV0gPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRlbGVtW2tleV0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdGRlbGV0ZSBlbGVtW2tleV07XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdC8vcGFzc1xuXHRcdFx0fVxuXHR9XG59O1xuXG4vLyB1c2UgZG9tIHByb3AgdG8gY29tcGFyZSBuZXcgcHJvcFxudmFyIHNob3VsZFVzZURPTVByb3AgPSB7XG5cdHZhbHVlOiB0cnVlLFxuXHRjaGVja2VkOiB0cnVlXG59O1xuXG52YXIgcGF0Y2hQcm9wcyA9IGZ1bmN0aW9uIHBhdGNoUHJvcHMoZWxlbSwgcHJvcHMsIG5ld1Byb3BzKSB7XG5cdGlmIChwcm9wcyA9PT0gbmV3UHJvcHMpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKCFwcm9wcyAmJiBuZXdQcm9wcykge1xuXHRcdHNldFByb3BzKGVsZW0sIG5ld1Byb3BzKTtcblx0XHRyZXR1cm47XG5cdH0gZWxzZSBpZiAoIW5ld1Byb3BzICYmIHByb3BzKSB7XG5cdFx0cmVtb3ZlUHJvcHMoZWxlbSwgcHJvcHMpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdG1hcEtleShwcm9wcywgbmV3UHJvcHMsIGZ1bmN0aW9uIChrZXkpIHtcblx0XHRpZiAoaWdub3JlS2V5c1trZXldID09PSB0cnVlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciB2YWx1ZSA9IG5ld1Byb3BzW2tleV07XG5cdFx0dmFyIG9sZFZhbHVlID0gc2hvdWxkVXNlRE9NUHJvcFtrZXldID09IHRydWUgPyBlbGVtW2tleV0gOiBwcm9wc1trZXldO1xuXHRcdGlmICh2YWx1ZSA9PT0gb2xkVmFsdWUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuXHRcdFx0cmVtb3ZlUHJvcChlbGVtLCBrZXksIG9sZFZhbHVlKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGlzU3R5bGVLZXkoa2V5KSkge1xuXHRcdFx0cGF0Y2hTdHlsZShlbGVtLCBvbGRWYWx1ZSwgdmFsdWUpO1xuXHRcdH0gZWxzZSBpZiAoaXNJbm5lckhUTUxLZXkoa2V5KSkge1xuXHRcdFx0dmFyIG9sZEh0bWwgPSBvbGRWYWx1ZSAmJiBvbGRWYWx1ZS5fX2h0bWw7XG5cdFx0XHR2YXIgaHRtbCA9IHZhbHVlICYmIHZhbHVlLl9faHRtbDtcblx0XHRcdGlmIChodG1sICE9IG51bGwgJiYgaHRtbCAhPT0gb2xkSHRtbCkge1xuXHRcdFx0XHRlbGVtLmlubmVySFRNTCA9IGh0bWw7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNldFByb3AoZWxlbSwga2V5LCB2YWx1ZSk7XG5cdFx0fVxuXHR9KTtcbn07XG5cbnZhciByZW1vdmVTdHlsZSA9IGZ1bmN0aW9uIHJlbW92ZVN0eWxlKGVsZW0sIHN0eWxlKSB7XG5cdGlmICghaXNPYmooc3R5bGUpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBlbGVtU3R5bGUgPSBlbGVtLnN0eWxlO1xuXHRtYXBWYWx1ZShzdHlsZSwgZnVuY3Rpb24gKF8sIGtleSkge1xuXHRcdGVsZW1TdHlsZVtrZXldID0gJyc7XG5cdH0pO1xufTtcbnZhciBzZXRTdHlsZSA9IGZ1bmN0aW9uIHNldFN0eWxlKGVsZW0sIHN0eWxlKSB7XG5cdGlmICghaXNPYmooc3R5bGUpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBlbGVtU3R5bGUgPSBlbGVtLnN0eWxlO1xuXHRtYXBWYWx1ZShzdHlsZSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblx0XHRzZXRTdHlsZVZhbHVlKGVsZW1TdHlsZSwga2V5LCB2YWx1ZSk7XG5cdH0pO1xufTtcbnZhciBwYXRjaFN0eWxlID0gZnVuY3Rpb24gcGF0Y2hTdHlsZShlbGVtLCBzdHlsZSwgbmV3U3R5bGUpIHtcblx0aWYgKHN0eWxlID09PSBuZXdTdHlsZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoIW5ld1N0eWxlICYmIHN0eWxlKSB7XG5cdFx0cmVtb3ZlU3R5bGUoZWxlbSwgc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG5ld1N0eWxlICYmICFzdHlsZSkge1xuXHRcdHNldFN0eWxlKGVsZW0sIG5ld1N0eWxlKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgZWxlbVN0eWxlID0gZWxlbS5zdHlsZTtcblx0XHRtYXBLZXkoc3R5bGUsIG5ld1N0eWxlLCBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHR2YXIgdmFsdWUgPSBuZXdTdHlsZVtrZXldO1xuXHRcdFx0dmFyIG9sZFZhbHVlID0gc3R5bGVba2V5XTtcblx0XHRcdGlmICh2YWx1ZSAhPT0gb2xkVmFsdWUpIHtcblx0XHRcdFx0c2V0U3R5bGVWYWx1ZShlbGVtU3R5bGUsIGtleSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59O1xuXG52YXIgaXNVbml0bGVzc051bWJlciA9IHtcblx0YW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IHRydWUsXG5cdGJveEZsZXg6IHRydWUsXG5cdGJveEZsZXhHcm91cDogdHJ1ZSxcblx0Ym94T3JkaW5hbEdyb3VwOiB0cnVlLFxuXHRjb2x1bW5Db3VudDogdHJ1ZSxcblx0ZmxleDogdHJ1ZSxcblx0ZmxleEdyb3c6IHRydWUsXG5cdGZsZXhQb3NpdGl2ZTogdHJ1ZSxcblx0ZmxleFNocmluazogdHJ1ZSxcblx0ZmxleE5lZ2F0aXZlOiB0cnVlLFxuXHRmbGV4T3JkZXI6IHRydWUsXG5cdGZvbnRXZWlnaHQ6IHRydWUsXG5cdGxpbmVDbGFtcDogdHJ1ZSxcblx0bGluZUhlaWdodDogdHJ1ZSxcblx0b3BhY2l0eTogdHJ1ZSxcblx0b3JkZXI6IHRydWUsXG5cdG9ycGhhbnM6IHRydWUsXG5cdHRhYlNpemU6IHRydWUsXG5cdHdpZG93czogdHJ1ZSxcblx0ekluZGV4OiB0cnVlLFxuXHR6b29tOiB0cnVlLFxuXG5cdC8vIFNWRy1yZWxhdGVkIHByb3BlcnRpZXNcblx0ZmlsbE9wYWNpdHk6IHRydWUsXG5cdHN0b3BPcGFjaXR5OiB0cnVlLFxuXHRzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuXHRzdHJva2VPcGFjaXR5OiB0cnVlLFxuXHRzdHJva2VXaWR0aDogdHJ1ZVxufTtcblxudmFyIGlzVW5pdGxlc3NOdW1iZXJXaXRoUHJlZml4ID0ge307XG52YXIgcHJlZml4ZXMgPSBbJ1dlYmtpdCcsICdtcycsICdNb3onLCAnTyddO1xudmFyIHByZWZpeEtleSA9IGZ1bmN0aW9uIHByZWZpeEtleShwcmVmaXgsIGtleSkge1xuXHRyZXR1cm4gcHJlZml4ICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcbn07XG5tYXBWYWx1ZShpc1VuaXRsZXNzTnVtYmVyLCBmdW5jdGlvbiAoXywgcHJvcCkge1xuXHRlYWNoSXRlbShwcmVmaXhlcywgZnVuY3Rpb24gKHByZWZpeCkge1xuXHRcdHJldHVybiBpc1VuaXRsZXNzTnVtYmVyV2l0aFByZWZpeFtwcmVmaXhLZXkocHJlZml4LCBwcm9wKV0gPSB0cnVlO1xuXHR9KTtcbn0pO1xubWFwVmFsdWUoaXNVbml0bGVzc051bWJlcldpdGhQcmVmaXgsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG5cdGlzVW5pdGxlc3NOdW1iZXJba2V5XSA9IHZhbHVlO1xufSk7XG5cbnZhciBSRV9OVU1CRVIgPSAvXi0/XFxkKyhcXC5cXGQrKT8kLztcbnZhciBzZXRTdHlsZVZhbHVlID0gZnVuY3Rpb24gc2V0U3R5bGVWYWx1ZShzdHlsZSwga2V5LCB2YWx1ZSkge1xuXHRpZiAodmFsdWUgPT0gbnVsbCB8fCBpc0Jsbih2YWx1ZSkpIHtcblx0XHR2YWx1ZSA9ICcnO1xuXHR9XG5cdGlmICghaXNVbml0bGVzc051bWJlcltrZXldICYmIFJFX05VTUJFUi50ZXN0KHZhbHVlKSkge1xuXHRcdHN0eWxlW2tleV0gPSB2YWx1ZSArICdweCc7XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGVba2V5XSA9IHZhbHVlO1xuXHR9XG59O1xuXG5pZiAoIU9iamVjdC5mcmVlemUpIHtcblx0T2JqZWN0LmZyZWV6ZSA9IGlkZW50aXR5O1xufVxuXG5mdW5jdGlvbiBWdHJlZShwcm9wZXJ0aWVzKSB7XG5cdGV4dGVuZCh0aGlzLCBwcm9wZXJ0aWVzKTtcbn1cblxudmFyIG5vb3AkMiA9IG5vb3AkMTtcbnZhciBnZXRET01Ob2RlID0gZnVuY3Rpb24gZ2V0RE9NTm9kZSgpIHtcblx0cmV0dXJuIHRoaXM7XG59O1xuVnRyZWUucHJvdG90eXBlID0ge1xuXHRhdHRhY2hSZWY6IGZ1bmN0aW9uIGF0dGFjaFJlZihyZWZWYWx1ZSkge1xuXHRcdHZhciByZWZLZXkgPSB0aGlzLnJlZjtcblx0XHR2YXIgcmVmcyA9IHRoaXMucmVmcztcblx0XHR2YXIgdnR5cGUgPSB0aGlzLnZ0eXBlO1xuXG5cdFx0aWYgKCFyZWZzIHx8IHJlZktleSA9PSBudWxsIHx8ICFyZWZWYWx1ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAocmVmVmFsdWUubm9kZU5hbWUpIHtcblx0XHRcdC8vIHN1cHBvcnQgcmVhY3QgdjAuMTMgc3R5bGU6IHRoaXMucmVmcy5teUlucHV0LmdldERPTU5vZGUoKVxuXHRcdFx0cmVmVmFsdWUuZ2V0RE9NTm9kZSA9IGdldERPTU5vZGU7XG5cdFx0fVxuXHRcdGlmIChpc0ZuKHJlZktleSkpIHtcblx0XHRcdHJlZktleShyZWZWYWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlZnNbcmVmS2V5XSA9IHJlZlZhbHVlO1xuXHRcdH1cblx0fSxcblx0ZGV0YWNoUmVmOiBmdW5jdGlvbiBkZXRhY2hSZWYoKSB7XG5cdFx0dmFyIHJlZktleSA9IHRoaXMucmVmO1xuXHRcdHZhciByZWZzID0gdGhpcy5yZWZzO1xuXG5cdFx0aWYgKCFyZWZzIHx8IHJlZktleSA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChpc0ZuKHJlZktleSkpIHtcblx0XHRcdHJlZktleShudWxsKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIHJlZnNbcmVmS2V5XTtcblx0XHR9XG5cdH0sXG5cdHVwZGF0ZVJlZjogZnVuY3Rpb24gdXBkYXRlUmVmKG5ld1Z0cmVlLCByZWZWYWx1ZSkge1xuXHRcdGlmICghdGhpcy5yZWZzKSB7XG5cdFx0XHRuZXdWdHJlZS5hdHRhY2hSZWYocmVmVmFsdWUpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoIW5ld1Z0cmVlLnJlZnMpIHtcblx0XHRcdHRoaXMuZGV0YWNoUmVmKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICh0aGlzLnJlZnMgIT09IG5ld1Z0cmVlLnJlZnMpIHtcblx0XHRcdHRoaXMuZGV0YWNoUmVmKCk7XG5cdFx0XHRuZXdWdHJlZS5hdHRhY2hSZWYocmVmVmFsdWUpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgb2xkUmVmID0gdGhpcy5yZWY7XG5cdFx0dmFyIG5ld1JlZiA9IG5ld1Z0cmVlLnJlZjtcblx0XHRpZiAobmV3UmVmID09IG51bGwpIHtcblx0XHRcdHRoaXMuZGV0YWNoUmVmKCk7XG5cdFx0fSBlbHNlIGlmIChvbGRSZWYgIT09IG5ld1JlZikge1xuXHRcdFx0dGhpcy5kZXRhY2hSZWYoKTtcblx0XHRcdG5ld1Z0cmVlLmF0dGFjaFJlZihyZWZWYWx1ZSk7XG5cdFx0fVxuXHR9LFxuXHR1cGRhdGVUcmVlOiBmdW5jdGlvbiB1cGRhdGVUcmVlKG5vZGUsIG5ld1Z0cmVlLCBwYXJlbnROb2RlLCBwYXJlbnRDb250ZXh0KSB7XG5cdFx0dmFyIG5ld05vZGUgPSBub2RlO1xuXHRcdHN3aXRjaCAoZGlmZih0aGlzLCBuZXdWdHJlZSkpIHtcblx0XHRcdGNhc2UgRElGRl9UWVBFLkNSRUFURTpcblx0XHRcdFx0bmV3Tm9kZSA9IG5ld1Z0cmVlLmluaXRUcmVlKHBhcmVudE5vZGUsIHBhcmVudENvbnRleHQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRElGRl9UWVBFLlJFTU9WRTpcblx0XHRcdFx0dGhpcy5kZXN0cm95VHJlZShub2RlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERJRkZfVFlQRS5SRVBMQUNFOlxuXHRcdFx0XHR2YXIgJHJlbW92ZU5vZGUgPSByZW1vdmVOb2RlO1xuXHRcdFx0XHRyZW1vdmVOb2RlID0gbm9vcCQyO1xuXHRcdFx0XHR0aGlzLmRlc3Ryb3lUcmVlKG5vZGUpO1xuXHRcdFx0XHRyZW1vdmVOb2RlID0gJHJlbW92ZU5vZGU7XG5cdFx0XHRcdG5ld05vZGUgPSBuZXdWdHJlZS5pbml0VHJlZShmdW5jdGlvbiAobmV4dE5vZGUpIHtcblx0XHRcdFx0XHRyZXR1cm4gcGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV4dE5vZGUsIG5vZGUpO1xuXHRcdFx0XHR9LCBwYXJlbnRDb250ZXh0KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERJRkZfVFlQRS5VUERBVEU6XG5cdFx0XHRcdG5ld05vZGUgPSB0aGlzLnVwZGF0ZShub2RlLCBuZXdWdHJlZSwgcGFyZW50Tm9kZSwgcGFyZW50Q29udGV4dCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3Tm9kZTtcblx0fVxufTtcblxuZnVuY3Rpb24gVnRleHQodGV4dCkge1xuXHR0aGlzLnRleHQgPSB0ZXh0O1xufVxuXG5WdGV4dC5wcm90b3R5cGUgPSBuZXcgVnRyZWUoe1xuXHR2dHlwZTogVk5PREVfVFlQRS5URVhULFxuXHRhdHRhY2hSZWY6IG5vb3AkMixcblx0ZGV0YWNoUmVmOiBub29wJDIsXG5cdHVwZGF0ZVJlZjogbm9vcCQyLFxuXHR1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShub2RlLCBuZXh0VnRleHQpIHtcblx0XHRpZiAobmV4dFZ0ZXh0LnRleHQgIT09IHRoaXMudGV4dCkge1xuXHRcdFx0bm9kZS5yZXBsYWNlRGF0YSgwLCBub2RlLmxlbmd0aCwgbmV4dFZ0ZXh0LnRleHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gbm9kZTtcblx0fSxcblx0aW5pdFRyZWU6IGZ1bmN0aW9uIGluaXRUcmVlKHBhcmVudE5vZGUpIHtcblx0XHR2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRoaXMudGV4dCk7XG5cdFx0YXBwZW5kTm9kZShwYXJlbnROb2RlLCBub2RlKTtcblx0XHRyZXR1cm4gbm9kZTtcblx0fSxcblx0ZGVzdHJveVRyZWU6IGZ1bmN0aW9uIGRlc3Ryb3lUcmVlKG5vZGUpIHtcblx0XHRyZW1vdmVOb2RlKG5vZGUpO1xuXHR9XG59KTtcblxuZnVuY3Rpb24gVmVsZW0odHlwZSwgcHJvcHMpIHtcblx0dGhpcy50eXBlID0gdHlwZTtcblx0dGhpcy5wcm9wcyA9IHByb3BzO1xufVxuXG52YXIgZ2V0SW5uZXJIVE1MID0gZnVuY3Rpb24gZ2V0SW5uZXJIVE1MKHByb3BzKSB7XG5cdHZhciBpbm5lckhUTUxPYmogPSBwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTDtcblx0cmV0dXJuIGlubmVySFRNTE9iaiAmJiBpbm5lckhUTUxPYmouX19odG1sO1xufTtcblZlbGVtLnByb3RvdHlwZSA9IG5ldyBWdHJlZSh7XG5cdHZ0eXBlOiBWTk9ERV9UWVBFLkVMRU1FTlQsXG5cdGVhY2hDaGlsZHJlbjogZnVuY3Rpb24gZWFjaENoaWxkcmVuKGl0ZXJhdGVlKSB7XG5cdFx0dmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcblxuXHRcdHZhciBuZXdDaGlsZHJlbiA9IHVuZGVmaW5lZDtcblx0XHRpZiAodGhpcy5zb3J0ZWQpIHtcblx0XHRcdGVhY2hJdGVtKGNoaWxkcmVuLCBpdGVyYXRlZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIHRoZSBkZWZhdWx0IGNoaWxkcmVuIG9mdGVuIGJlIG5lc3RpbmcgYXJyYXksIG1ha2UgaXQgZmxhdCBhbmQgY2FjaGVcblx0XHRpZiAoaXNBcnIoY2hpbGRyZW4pKSB7XG5cdFx0XHRuZXdDaGlsZHJlbiA9IFtdO1xuXHRcdFx0ZmxhdHRlbkNoaWxkcmVuKGNoaWxkcmVuLCBmdW5jdGlvbiAodmNoaWxkLCBpbmRleCkge1xuXHRcdFx0XHR2Y2hpbGQgPSBnZXRWbm9kZSh2Y2hpbGQpO1xuXHRcdFx0XHRpdGVyYXRlZSh2Y2hpbGQsIGluZGV4KTtcblx0XHRcdFx0bmV3Q2hpbGRyZW4ucHVzaCh2Y2hpbGQpO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnByb3BzLmNoaWxkcmVuID0gbmV3Q2hpbGRyZW47XG5cdFx0XHR0aGlzLnNvcnRlZCA9IHRydWU7XG5cdFx0fSBlbHNlIGlmICghaXNVbmRlZmluZWQoY2hpbGRyZW4pKSB7XG5cdFx0XHRjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW4gPSBnZXRWbm9kZShjaGlsZHJlbik7XG5cdFx0XHRpdGVyYXRlZShjaGlsZHJlbiwgMCk7XG5cdFx0fVxuXHR9LFxuXHRpbml0VHJlZTogZnVuY3Rpb24gaW5pdFRyZWUocGFyZW50Tm9kZSwgcGFyZW50Q29udGV4dCkge1xuXHRcdHZhciB0eXBlID0gdGhpcy50eXBlO1xuXHRcdHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cblx0XHR2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG5cdFx0c2V0UHJvcHMobm9kZSwgcHJvcHMpO1xuXHRcdHRoaXMuZWFjaENoaWxkcmVuKGZ1bmN0aW9uICh2Y2hpbGQpIHtcblx0XHRcdHZjaGlsZC5pbml0VHJlZShub2RlLCBwYXJlbnRDb250ZXh0KTtcblx0XHR9KTtcblx0XHRhcHBlbmROb2RlKHBhcmVudE5vZGUsIG5vZGUpO1xuXHRcdHRoaXMuYXR0YWNoUmVmKG5vZGUpO1xuXHRcdHJldHVybiBub2RlO1xuXHR9LFxuXHRkZXN0cm95VHJlZTogZnVuY3Rpb24gZGVzdHJveVRyZWUobm9kZSkge1xuXHRcdHZhciBjaGlsZE5vZGVzID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0Y2hpbGROb2Rlcy5wdXNoKG5vZGUuY2hpbGROb2Rlc1tpXSk7XG5cdFx0fVxuXHRcdHRoaXMuZWFjaENoaWxkcmVuKGZ1bmN0aW9uICh2Y2hpbGQsIGluZGV4KSB7XG5cdFx0XHR2Y2hpbGQuZGVzdHJveVRyZWUoY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0pO1xuXHRcdHRoaXMuZGV0YWNoUmVmKCk7XG5cdFx0cmVtb3ZlTm9kZShub2RlKTtcblx0fSxcblx0dXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUobm9kZSwgbmV3VmVsZW0sIHBhcmVudE5vZGUsIHBhcmVudENvbnRleHQpIHtcblx0XHR2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xuXG5cdFx0dmFyIG5ld1Byb3BzID0gbmV3VmVsZW0ucHJvcHM7XG5cdFx0dmFyIG9sZEh0bWwgPSBnZXRJbm5lckhUTUwocHJvcHMpO1xuXHRcdGlmIChvbGRIdG1sID09IG51bGwpIHtcblx0XHRcdHZhciBjaGlsZHJlbiA9ICFpc1VuZGVmaW5lZChwcm9wcy5jaGlsZHJlbikgPyBwcm9wcy5jaGlsZHJlbiA6IFtdO1xuXHRcdFx0aWYgKCFpc0FycihjaGlsZHJlbikpIHtcblx0XHRcdFx0Y2hpbGRyZW4gPSBbY2hpbGRyZW5dO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGNvdW50ID0gMDtcblx0XHRcdHZhciBjaGlsZE5vZGVzID0gbm9kZS5jaGlsZE5vZGVzO1xuXHRcdFx0bmV3VmVsZW0uZWFjaENoaWxkcmVuKGZ1bmN0aW9uIChuZXdWY2hpbGQsIGluZGV4KSB7XG5cdFx0XHRcdGNvdW50ICs9IDE7XG5cdFx0XHRcdHZhciB2Y2hpbGQgPSBjaGlsZHJlbltpbmRleF07XG5cdFx0XHRcdGlmICh2Y2hpbGQpIHtcblx0XHRcdFx0XHR2Y2hpbGQudXBkYXRlVHJlZShjaGlsZE5vZGVzW2luZGV4XSwgbmV3VmNoaWxkLCBub2RlLCBwYXJlbnRDb250ZXh0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRuZXdWY2hpbGQuaW5pdFRyZWUobm9kZSwgcGFyZW50Q29udGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dmFyIGNoaWxkcmVuTGVuID0gY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdFx0Ly8gZGVzdHJveSBvbGQgY2hpbGRyZW4gbm90IGluIHRoZSBuZXdDaGlsZHJlblxuXHRcdFx0d2hpbGUgKGNoaWxkcmVuTGVuID4gY291bnQpIHtcblx0XHRcdFx0Y2hpbGRyZW5MZW4gLT0gMTtcblx0XHRcdFx0Y2hpbGRyZW5bY2hpbGRyZW5MZW5dLmRlc3Ryb3lUcmVlKGNoaWxkTm9kZXNbY2hpbGRyZW5MZW5dKTtcblx0XHRcdH1cblx0XHRcdHBhdGNoUHJvcHMobm9kZSwgcHJvcHMsIG5ld1Byb3BzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGF0Y2hQcm9wcyhub2RlLCBwcm9wcywgbmV3UHJvcHMpO1xuXHRcdFx0bmV3VmVsZW0uZWFjaENoaWxkcmVuKGZ1bmN0aW9uIChuZXdWY2hpbGQpIHtcblx0XHRcdFx0cmV0dXJuIG5ld1ZjaGlsZC5pbml0VHJlZShub2RlLCBwYXJlbnRDb250ZXh0KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnVwZGF0ZVJlZihuZXdWZWxlbSwgbm9kZSk7XG5cdFx0cmV0dXJuIG5vZGU7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBWc3RhdGVsZXNzQ29tcG9uZW50KHR5cGUsIHByb3BzKSB7XG5cdHRoaXMudHlwZSA9IHR5cGU7XG5cdHRoaXMucHJvcHMgPSBwcm9wcztcblx0dGhpcy5pZCA9IGdldFVpZCgpO1xufVxuXG5Wc3RhdGVsZXNzQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBWdHJlZSh7XG5cdHZ0eXBlOiBWTk9ERV9UWVBFLlNUQVRFTEVTU19DT01QT05FTlQsXG5cdGF0dGFjaFJlZjogbm9vcCQyLFxuXHRkZXRhY2hSZWY6IG5vb3AkMixcblx0dXBkYXRlUmVmOiBub29wJDIsXG5cdHJlbmRlclRyZWU6IGZ1bmN0aW9uIHJlbmRlclRyZWUocGFyZW50Q29udGV4dCkge1xuXHRcdHZhciBmYWN0b3J5ID0gdGhpcy50eXBlO1xuXHRcdHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cblx0XHR2YXIgY29tcG9uZW50Q29udGV4dCA9IGdldENvbnRleHRCeVR5cGVzKHBhcmVudENvbnRleHQsIGZhY3RvcnkuY29udGV4dFR5cGVzKTtcblx0XHR2YXIgdnRyZWUgPSBmYWN0b3J5KHByb3BzLCBjb21wb25lbnRDb250ZXh0KTtcblx0XHRpZiAodnRyZWUgJiYgdnRyZWUucmVuZGVyKSB7XG5cdFx0XHR2dHJlZSA9IHZ0cmVlLnJlbmRlcigpO1xuXHRcdH1cblx0XHRyZXR1cm4gZ2V0Vm5vZGUodnRyZWUpO1xuXHR9LFxuXHRpbml0VHJlZTogZnVuY3Rpb24gaW5pdFRyZWUocGFyZW50Tm9kZSwgcGFyZW50Q29udGV4dCkge1xuXHRcdHZhciB2dHJlZSA9IHRoaXMucmVuZGVyVHJlZShwYXJlbnRDb250ZXh0KTtcblx0XHR2YXIgbm9kZSA9IHZ0cmVlLmluaXRUcmVlKHBhcmVudE5vZGUsIHBhcmVudENvbnRleHQpO1xuXHRcdG5vZGUuY2FjaGUgPSBub2RlLmNhY2hlIHx8IHt9O1xuXHRcdG5vZGUuY2FjaGVbdGhpcy5pZF0gPSB2dHJlZTtcblx0XHRyZXR1cm4gbm9kZTtcblx0fSxcblx0ZGVzdHJveVRyZWU6IGZ1bmN0aW9uIGRlc3Ryb3lUcmVlKG5vZGUpIHtcblx0XHR2YXIgaWQgPSB0aGlzLmlkO1xuXHRcdHZhciB2dHJlZSA9IG5vZGUuY2FjaGVbaWRdO1xuXHRcdGRlbGV0ZSBub2RlLmNhY2hlW2lkXTtcblx0XHR2dHJlZS5kZXN0cm95VHJlZShub2RlKTtcblx0fSxcblx0dXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUobm9kZSwgbmV3VnN0YXRlbGVzc0NvbXBvbmVudCwgcGFyZW50Tm9kZSwgcGFyZW50Q29udGV4dCkge1xuXHRcdHZhciBpZCA9IHRoaXMuaWQ7XG5cdFx0dmFyIHZ0cmVlID0gbm9kZS5jYWNoZVtpZF07XG5cdFx0ZGVsZXRlIG5vZGUuY2FjaGVbaWRdO1xuXHRcdHZhciBuZXdWdHJlZSA9IG5ld1ZzdGF0ZWxlc3NDb21wb25lbnQucmVuZGVyVHJlZShwYXJlbnRDb250ZXh0KTtcblx0XHR2YXIgbmV3Tm9kZSA9IHZ0cmVlLnVwZGF0ZVRyZWUobm9kZSwgbmV3VnRyZWUsIHBhcmVudE5vZGUsIHBhcmVudENvbnRleHQpO1xuXHRcdG5ld05vZGUuY2FjaGUgPSBuZXdOb2RlLmNhY2hlIHx8IHt9O1xuXHRcdG5ld05vZGUuY2FjaGVbbmV3VnN0YXRlbGVzc0NvbXBvbmVudC5pZF0gPSBuZXdWdHJlZTtcblx0XHRpZiAobmV3Tm9kZSAhPT0gbm9kZSkge1xuXHRcdFx0ZXh0ZW5kKG5ld05vZGUuY2FjaGUsIG5vZGUuY2FjaGUpO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3Tm9kZTtcblx0fVxufSk7XG5cbnZhciBzZXRSZWZzID0gbm9vcCQyO1xudmFyIGhhbmRsZVZub2RlV2l0aFJlZiA9IGZ1bmN0aW9uIGhhbmRsZVZub2RlV2l0aFJlZih2bm9kZSkge1xuXHRzZXRSZWZzKHZub2RlKTtcbn07XG52YXIgZ2V0Q29udGV4dEJ5VHlwZXMgPSBmdW5jdGlvbiBnZXRDb250ZXh0QnlUeXBlcyhjdXJDb250ZXh0LCBjb250ZXh0VHlwZXMpIHtcblx0dmFyIGNvbnRleHQgPSB7fTtcblx0aWYgKCFjb250ZXh0VHlwZXMgfHwgIWN1ckNvbnRleHQpIHtcblx0XHRyZXR1cm4gY29udGV4dDtcblx0fVxuXHRmb3IgKHZhciBrZXkgaW4gY29udGV4dFR5cGVzKSB7XG5cdFx0aWYgKGNvbnRleHRUeXBlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRjb250ZXh0W2tleV0gPSBjdXJDb250ZXh0W2tleV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjb250ZXh0O1xufTtcblxudmFyIGJpbmRSZWZzID0gZnVuY3Rpb24gYmluZFJlZnMocmVmcykge1xuXHRyZXR1cm4gZnVuY3Rpb24gKHZub2RlKSB7XG5cdFx0dm5vZGUucmVmcyA9IHZub2RlLnJlZnMgfHwgcmVmcztcblx0fTtcbn07XG5cbnZhciByZW5kZXJDb21wb25lbnQgPSBmdW5jdGlvbiByZW5kZXJDb21wb25lbnQoY29tcG9uZW50LCBwYXJlbnRDb250ZXh0KSB7XG5cdHNldFJlZnMgPSBiaW5kUmVmcyhjb21wb25lbnQucmVmcyk7XG5cdHZhciB2dHJlZSA9IGNvbXBvbmVudC5yZW5kZXIoKTtcblx0aWYgKGlzVW5kZWZpbmVkKHZ0cmVlKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignY29tcG9uZW50IGNhbiBub3QgcmVuZGVyIHVuZGVmaW5lZCcpO1xuXHR9XG5cdHZ0cmVlID0gZ2V0Vm5vZGUodnRyZWUpO1xuXHR2YXIgY3VyQ29udGV4dCA9IGNvbXBvbmVudC5nZXRDaGlsZENvbnRleHQoKTtcblx0aWYgKGN1ckNvbnRleHQpIHtcblx0XHRjdXJDb250ZXh0ID0gZXh0ZW5kKHt9LCBwYXJlbnRDb250ZXh0LCBjdXJDb250ZXh0KTtcblx0fSBlbHNlIHtcblx0XHRjdXJDb250ZXh0ID0gcGFyZW50Q29udGV4dDtcblx0fVxuXHR2dHJlZS5jb250ZXh0ID0gY3VyQ29udGV4dDtcblx0c2V0UmVmcyA9IG5vb3AkMjtcblx0cmV0dXJuIHZ0cmVlO1xufTtcblxudmFyIGRpZE1vdW50Q29tcG9uZW50cyA9IFtdO1xudmFyIGNhbGxEaWRNb3VudCA9IGZ1bmN0aW9uIGNhbGxEaWRNb3VudChzdG9yZSkge1xuXHRyZXR1cm4gc3RvcmUudmNvbXBvbmVudC5kaWRNb3VudChzdG9yZS5ub2RlKTtcbn07XG52YXIgY2xlYXJEaWRNb3VudCA9IGZ1bmN0aW9uIGNsZWFyRGlkTW91bnQoKSB7XG5cdHZhciBjb21wb25lbnRzID0gZGlkTW91bnRDb21wb25lbnRzO1xuXHRpZiAoY29tcG9uZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm47XG5cdH1cblx0ZGlkTW91bnRDb21wb25lbnRzID0gW107XG5cdGVhY2hJdGVtKGNvbXBvbmVudHMsIGNhbGxEaWRNb3VudCk7XG59O1xuXG5mdW5jdGlvbiBWY29tcG9uZW50KHR5cGUsIHByb3BzKSB7XG5cdHRoaXMudHlwZSA9IHR5cGU7XG5cdHRoaXMucHJvcHMgPSBwcm9wcztcblx0dGhpcy5pZCA9IGdldFVpZCgpO1xufVxuXG5WY29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBWdHJlZSh7XG5cdHZ0eXBlOiBWTk9ERV9UWVBFLkNPTVBPTkVOVCxcblx0aW5pdFRyZWU6IGZ1bmN0aW9uIGluaXRUcmVlKHBhcmVudE5vZGUsIHBhcmVudENvbnRleHQpIHtcblx0XHR2YXIgQ29tcG9uZW50ID0gdGhpcy50eXBlO1xuXHRcdHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cdFx0dmFyIGlkID0gdGhpcy5pZDtcblxuXHRcdHZhciBjb21wb25lbnRDb250ZXh0ID0gZ2V0Q29udGV4dEJ5VHlwZXMocGFyZW50Q29udGV4dCwgQ29tcG9uZW50LmNvbnRleHRUeXBlcyk7XG5cdFx0dmFyIGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnQocHJvcHMsIGNvbXBvbmVudENvbnRleHQpO1xuXHRcdHZhciB1cGRhdGVyID0gY29tcG9uZW50LiR1cGRhdGVyO1xuXHRcdHZhciBjYWNoZSA9IGNvbXBvbmVudC4kY2FjaGU7XG5cblx0XHRjYWNoZS5wYXJlbnRDb250ZXh0ID0gcGFyZW50Q29udGV4dDtcblx0XHR1cGRhdGVyLmlzUGVuZGluZyA9IHRydWU7XG5cdFx0Y29tcG9uZW50LnByb3BzID0gY29tcG9uZW50LnByb3BzIHx8IHByb3BzO1xuXHRcdGNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQoKTtcblx0XHR1cGRhdGVQcm9wc0FuZFN0YXRlKGNvbXBvbmVudCwgY29tcG9uZW50LnByb3BzLCB1cGRhdGVyLmdldFN0YXRlKCksIGNvbXBvbmVudC5jb250ZXh0KTtcblx0XHR2YXIgdnRyZWUgPSByZW5kZXJDb21wb25lbnQoY29tcG9uZW50LCBwYXJlbnRDb250ZXh0KTtcblx0XHR2YXIgbm9kZSA9IHZ0cmVlLmluaXRUcmVlKHBhcmVudE5vZGUsIHZ0cmVlLmNvbnRleHQpO1xuXHRcdG5vZGUuY2FjaGUgPSBub2RlLmNhY2hlIHx8IHt9O1xuXHRcdG5vZGUuY2FjaGVbaWRdID0gY29tcG9uZW50O1xuXHRcdGNhY2hlLnZ0cmVlID0gdnRyZWU7XG5cdFx0Y2FjaGUubm9kZSA9IG5vZGU7XG5cdFx0Y2FjaGUuaXNNb3VudGVkID0gdHJ1ZTtcblx0XHRkaWRNb3VudENvbXBvbmVudHMucHVzaCh7IG5vZGU6IG5vZGUsIHZjb21wb25lbnQ6IHRoaXMgfSk7XG5cdFx0cmV0dXJuIG5vZGU7XG5cdH0sXG5cdGRpZE1vdW50OiBmdW5jdGlvbiBkaWRNb3VudChub2RlKSB7XG5cdFx0dmFyIGNvbXBvbmVudCA9IG5vZGUuY2FjaGVbdGhpcy5pZF07XG5cdFx0dmFyIHVwZGF0ZXIgPSBjb21wb25lbnQuJHVwZGF0ZXI7XG5cdFx0Y29tcG9uZW50LmNvbXBvbmVudERpZE1vdW50KCk7XG5cdFx0dXBkYXRlci5pc1BlbmRpbmcgPSBmYWxzZTtcblx0XHR0aGlzLmF0dGFjaFJlZihjb21wb25lbnQpO1xuXHRcdHVwZGF0ZXIuZW1pdFVwZGF0ZSgpO1xuXHR9LFxuXHRkZXN0cm95VHJlZTogZnVuY3Rpb24gZGVzdHJveVRyZWUobm9kZSkge1xuXHRcdHZhciBpZCA9IHRoaXMuaWQ7XG5cdFx0dmFyIGNvbXBvbmVudCA9IG5vZGUuY2FjaGVbaWRdO1xuXHRcdHZhciBjYWNoZSA9IGNvbXBvbmVudC4kY2FjaGU7XG5cdFx0ZGVsZXRlIG5vZGUuY2FjaGVbaWRdO1xuXHRcdHRoaXMuZGV0YWNoUmVmKCk7XG5cdFx0Y29tcG9uZW50LnNldFN0YXRlID0gbm9vcCQyO1xuXHRcdGNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuXHRcdGNhY2hlLnZ0cmVlLmRlc3Ryb3lUcmVlKG5vZGUpO1xuXHRcdGRlbGV0ZSBjb21wb25lbnQuc2V0U3RhdGU7XG5cdFx0Y2FjaGUuaXNNb3VudGVkID0gZmFsc2U7XG5cdFx0Y2FjaGUubm9kZSA9IGNhY2hlLnBhcmVudENvbnRleHQgPSBjYWNoZS52dHJlZSA9IGNvbXBvbmVudC5yZWZzID0gY29tcG9uZW50LmNvbnRleHQgPSBudWxsO1xuXHR9LFxuXHR1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShub2RlLCBuZXdWdHJlZSwgcGFyZW50Tm9kZSwgcGFyZW50Q29udGV4dCkge1xuXHRcdHZhciBpZCA9IHRoaXMuaWQ7XG5cdFx0dmFyIGNvbXBvbmVudCA9IG5vZGUuY2FjaGVbaWRdO1xuXHRcdHZhciB1cGRhdGVyID0gY29tcG9uZW50LiR1cGRhdGVyO1xuXHRcdHZhciBjYWNoZSA9IGNvbXBvbmVudC4kY2FjaGU7XG5cdFx0dmFyIENvbXBvbmVudCA9IG5ld1Z0cmVlLnR5cGU7XG5cdFx0dmFyIG5leHRQcm9wcyA9IG5ld1Z0cmVlLnByb3BzO1xuXG5cdFx0dmFyIGNvbXBvbmVudENvbnRleHQgPSBnZXRDb250ZXh0QnlUeXBlcyhwYXJlbnRDb250ZXh0LCBDb21wb25lbnQuY29udGV4dFR5cGVzKTtcblx0XHRkZWxldGUgbm9kZS5jYWNoZVtpZF07XG5cdFx0bm9kZS5jYWNoZVtuZXdWdHJlZS5pZF0gPSBjb21wb25lbnQ7XG5cdFx0Y2FjaGUucGFyZW50Q29udGV4dCA9IHBhcmVudENvbnRleHQ7XG5cdFx0dXBkYXRlci5pc1BlbmRpbmcgPSB0cnVlO1xuXHRcdGNvbXBvbmVudC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgY29tcG9uZW50Q29udGV4dCk7XG5cdFx0dXBkYXRlci5pc1BlbmRpbmcgPSBmYWxzZTtcblx0XHR1cGRhdGVyLmVtaXRVcGRhdGUobmV4dFByb3BzLCBjb21wb25lbnRDb250ZXh0KTtcblx0XHR0aGlzLnVwZGF0ZVJlZihuZXdWdHJlZSwgY29tcG9uZW50KTtcblx0XHRyZXR1cm4gY2FjaGUubm9kZTtcblx0fVxufSk7XG5cbnZhciByZW1vdmVOb2RlID0gZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG5cdC8vIGlmIG5vZGUucGFyZW50Tm9kZSBoYWQgc2V0IGlubmVySFRNTCwgZG8gbm90aGluZ1xuXHRpZiAobm9kZSAmJiBub2RlLnBhcmVudE5vZGUpIHtcblx0XHRub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG5cdH1cbn07XG52YXIgYXBwZW5kTm9kZSA9IGZ1bmN0aW9uIGFwcGVuZE5vZGUocGFyZW50Tm9kZSwgbm9kZSkge1xuXHQvLyBmb3IgcmVwbGFjaW5nIG5vZGVcblx0aWYgKGlzRm4ocGFyZW50Tm9kZSkpIHtcblx0XHRwYXJlbnROb2RlKG5vZGUpO1xuXHR9IGVsc2Uge1xuXHRcdHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobm9kZSk7XG5cdH1cbn07XG5cbnZhciBnZXRWbm9kZSA9IGZ1bmN0aW9uIGdldFZub2RlKHZub2RlKSB7XG5cdGlmICh2bm9kZSA9PT0gbnVsbCkge1xuXHRcdHZub2RlID0gbmV3IFZlbGVtKCdub3NjcmlwdCcsIHt9KTtcblx0fSBlbHNlIGlmICghaXNWYWxpZEVsZW1lbnQodm5vZGUpKSB7XG5cdFx0dm5vZGUgPSBuZXcgVnRleHQodm5vZGUpO1xuXHR9XG5cdHJldHVybiB2bm9kZTtcbn07XG5cbnZhciB1cGRhdGVRdWV1ZSA9IHtcblx0dXBkYXRlcnM6IFtdLFxuXHRpc1BlbmRpbmc6IGZhbHNlLFxuXHRhZGQ6IGZ1bmN0aW9uIGFkZCh1cGRhdGVyKSB7XG5cdFx0LypcclxuICAgZXZlbnQgYnViYmxlcyBmcm9tIGJvdHRvbS1sZXZlbCB0byB0b3AtbGV2ZWxcclxuICAgcmV2ZXJzZSB0aGUgdXBkYXRlciBvcmRlciBjYW4gbWVyZ2Ugc29tZSBwcm9wcyBhbmQgc3RhdGUgYW5kIHJlZHVjZSB0aGUgcmVmcmVzaCB0aW1lc1xyXG4gICBzZWUgVXBkYXRlci51cGRhdGUgbWV0aG9kIGJlbG93IHRvIGtub3cgd2h5XHJcbiAgKi9cblx0XHR0aGlzLnVwZGF0ZXJzLnNwbGljZSgwLCAwLCB1cGRhdGVyKTtcblx0fSxcblx0YmF0Y2hVcGRhdGU6IGZ1bmN0aW9uIGJhdGNoVXBkYXRlKCkge1xuXHRcdHRoaXMuaXNQZW5kaW5nID0gdHJ1ZTtcblx0XHQvKlxyXG4gICAgZWFjaCB1cGRhdGVyLnVwZGF0ZSBtYXkgYWRkIG5ldyB1cGRhdGVyIHRvIHVwZGF0ZVF1ZXVlXHJcbiAgICBjbGVhciB0aGVtIHdpdGggYSBsb29wXHJcbiAgKi9cblx0XHR3aGlsZSAodGhpcy51cGRhdGVycy5sZW5ndGgpIHtcblx0XHRcdHZhciB1cGRhdGVycyA9IHRoaXMudXBkYXRlcnM7XG5cblx0XHRcdHRoaXMudXBkYXRlcnMgPSBbXTtcblx0XHRcdGVhY2hJdGVtKHVwZGF0ZXJzLCB0cmlnZ2VyVXBkYXRlKTtcblx0XHR9XG5cdFx0dGhpcy5pc1BlbmRpbmcgPSBmYWxzZTtcblx0fVxufTtcbnZhciB0cmlnZ2VyVXBkYXRlID0gZnVuY3Rpb24gdHJpZ2dlclVwZGF0ZSh1cGRhdGVyKSB7XG5cdHJldHVybiB1cGRhdGVyLnVwZGF0ZSgpO1xufTtcblxuZnVuY3Rpb24gVXBkYXRlcihpbnN0YW5jZSkge1xuXHR0aGlzLmluc3RhbmNlID0gaW5zdGFuY2U7XG5cdHRoaXMucGVuZGluZ1N0YXRlcyA9IFtdO1xuXHR0aGlzLnBlbmRpbmdDYWxsYmFja3MgPSBbXTtcblx0dGhpcy5pc1BlbmRpbmcgPSBmYWxzZTtcblx0dGhpcy5uZXh0UHJvcHMgPSB0aGlzLm5leHRDb250ZXh0ID0gbnVsbDtcblx0dGhpcy5jbGVhckNhbGxiYWNrcyA9IHRoaXMuY2xlYXJDYWxsYmFja3MuYmluZCh0aGlzKTtcbn1cblxuVXBkYXRlci5wcm90b3R5cGUgPSB7XG5cdGVtaXRVcGRhdGU6IGZ1bmN0aW9uIGVtaXRVcGRhdGUobmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuXHRcdHRoaXMubmV4dFByb3BzID0gbmV4dFByb3BzO1xuXHRcdHRoaXMubmV4dENvbnRleHQgPSBuZXh0Q29udGV4dDtcblx0XHQvLyByZWNlaXZlIG5leHRQcm9wcyEhIHNob3VsZCB1cGRhdGUgaW1tZWRpYXRlbHlcblx0XHRuZXh0UHJvcHMgfHwgIXVwZGF0ZVF1ZXVlLmlzUGVuZGluZyA/IHRoaXMudXBkYXRlKCkgOiB1cGRhdGVRdWV1ZS5hZGQodGhpcyk7XG5cdH0sXG5cdHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuXHRcdHZhciBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2U7XG5cdFx0dmFyIHBlbmRpbmdTdGF0ZXMgPSB0aGlzLnBlbmRpbmdTdGF0ZXM7XG5cdFx0dmFyIG5leHRQcm9wcyA9IHRoaXMubmV4dFByb3BzO1xuXHRcdHZhciBuZXh0Q29udGV4dCA9IHRoaXMubmV4dENvbnRleHQ7XG5cblx0XHRpZiAobmV4dFByb3BzIHx8IHBlbmRpbmdTdGF0ZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0bmV4dFByb3BzID0gbmV4dFByb3BzIHx8IGluc3RhbmNlLnByb3BzO1xuXHRcdFx0bmV4dENvbnRleHQgPSBuZXh0Q29udGV4dCB8fCBpbnN0YW5jZS5jb250ZXh0O1xuXHRcdFx0dGhpcy5uZXh0UHJvcHMgPSB0aGlzLm5leHRDb250ZXh0ID0gbnVsbDtcblx0XHRcdC8vIG1lcmdlIHRoZSBuZXh0UHJvcHMgYW5kIG5leHRTdGF0ZSBhbmQgdXBkYXRlIGJ5IG9uZSB0aW1lXG5cdFx0XHRzaG91bGRVcGRhdGUoaW5zdGFuY2UsIG5leHRQcm9wcywgdGhpcy5nZXRTdGF0ZSgpLCBuZXh0Q29udGV4dCwgdGhpcy5jbGVhckNhbGxiYWNrcyk7XG5cdFx0fVxuXHR9LFxuXHRhZGRTdGF0ZTogZnVuY3Rpb24gYWRkU3RhdGUobmV4dFN0YXRlKSB7XG5cdFx0aWYgKG5leHRTdGF0ZSkge1xuXHRcdFx0dGhpcy5wZW5kaW5nU3RhdGVzLnB1c2gobmV4dFN0YXRlKTtcblx0XHRcdGlmICghdGhpcy5pc1BlbmRpbmcpIHtcblx0XHRcdFx0dGhpcy5lbWl0VXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRyZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShuZXh0U3RhdGUpIHtcblx0XHR2YXIgcGVuZGluZ1N0YXRlcyA9IHRoaXMucGVuZGluZ1N0YXRlcztcblxuXHRcdHBlbmRpbmdTdGF0ZXMucG9wKCk7XG5cdFx0Ly8gcHVzaCBzcGVjaWFsIHBhcmFtcyB0byBwb2ludCBvdXQgc2hvdWxkIHJlcGxhY2Ugc3RhdGVcblx0XHRwZW5kaW5nU3RhdGVzLnB1c2goW25leHRTdGF0ZV0pO1xuXHR9LFxuXHRnZXRTdGF0ZTogZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG5cdFx0dmFyIGluc3RhbmNlID0gdGhpcy5pbnN0YW5jZTtcblx0XHR2YXIgcGVuZGluZ1N0YXRlcyA9IHRoaXMucGVuZGluZ1N0YXRlcztcblx0XHR2YXIgc3RhdGUgPSBpbnN0YW5jZS5zdGF0ZTtcblx0XHR2YXIgcHJvcHMgPSBpbnN0YW5jZS5wcm9wcztcblxuXHRcdGlmIChwZW5kaW5nU3RhdGVzLmxlbmd0aCkge1xuXHRcdFx0c3RhdGUgPSBleHRlbmQoe30sIHN0YXRlKTtcblx0XHRcdGVhY2hJdGVtKHBlbmRpbmdTdGF0ZXMsIGZ1bmN0aW9uIChuZXh0U3RhdGUpIHtcblx0XHRcdFx0Ly8gcmVwbGFjZSBzdGF0ZVxuXHRcdFx0XHRpZiAoaXNBcnIobmV4dFN0YXRlKSkge1xuXHRcdFx0XHRcdHN0YXRlID0gZXh0ZW5kKHt9LCBuZXh0U3RhdGVbMF0pO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaXNGbihuZXh0U3RhdGUpKSB7XG5cdFx0XHRcdFx0bmV4dFN0YXRlID0gbmV4dFN0YXRlLmNhbGwoaW5zdGFuY2UsIHN0YXRlLCBwcm9wcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZXh0ZW5kKHN0YXRlLCBuZXh0U3RhdGUpO1xuXHRcdFx0fSk7XG5cdFx0XHRwZW5kaW5nU3RhdGVzLmxlbmd0aCA9IDA7XG5cdFx0fVxuXHRcdHJldHVybiBzdGF0ZTtcblx0fSxcblx0Y2xlYXJDYWxsYmFja3M6IGZ1bmN0aW9uIGNsZWFyQ2FsbGJhY2tzKCkge1xuXHRcdHZhciBwZW5kaW5nQ2FsbGJhY2tzID0gdGhpcy5wZW5kaW5nQ2FsbGJhY2tzO1xuXHRcdHZhciBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2U7XG5cblx0XHRpZiAocGVuZGluZ0NhbGxiYWNrcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRlYWNoSXRlbShwZW5kaW5nQ2FsbGJhY2tzLCBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwoaW5zdGFuY2UpO1xuXHRcdFx0fSk7XG5cdFx0XHRwZW5kaW5nQ2FsbGJhY2tzLmxlbmd0aCA9IDA7XG5cdFx0fVxuXHR9LFxuXHRhZGRDYWxsYmFjazogZnVuY3Rpb24gYWRkQ2FsbGJhY2soY2FsbGJhY2spIHtcblx0XHRpZiAoaXNGbihjYWxsYmFjaykpIHtcblx0XHRcdHRoaXMucGVuZGluZ0NhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcblx0XHR9XG5cdH1cbn07XG5mdW5jdGlvbiBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpIHtcblx0dGhpcy4kdXBkYXRlciA9IG5ldyBVcGRhdGVyKHRoaXMpO1xuXHR0aGlzLiRjYWNoZSA9IHsgaXNNb3VudGVkOiBmYWxzZSB9O1xuXHR0aGlzLnByb3BzID0gcHJvcHM7XG5cdHRoaXMuc3RhdGUgPSB7fTtcblx0dGhpcy5yZWZzID0ge307XG5cdHRoaXMuY29udGV4dCA9IGNvbnRleHQgfHwge307XG59XG5cbnZhciBub29wID0gbm9vcCQxO1xuQ29tcG9uZW50LnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IENvbXBvbmVudCxcblx0Z2V0Q2hpbGRDb250ZXh0OiBub29wLFxuXHRjb21wb25lbnRXaWxsVXBkYXRlOiBub29wLFxuXHRjb21wb25lbnREaWRVcGRhdGU6IG5vb3AsXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IG5vb3AsXG5cdGNvbXBvbmVudFdpbGxNb3VudDogbm9vcCxcblx0Y29tcG9uZW50RGlkTW91bnQ6IG5vb3AsXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50OiBub29wLFxuXHRzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRmb3JjZVVwZGF0ZTogZnVuY3Rpb24gZm9yY2VVcGRhdGUoY2FsbGJhY2spIHtcblx0XHR2YXIgJHVwZGF0ZXIgPSB0aGlzLiR1cGRhdGVyO1xuXHRcdHZhciAkY2FjaGUgPSB0aGlzLiRjYWNoZTtcblx0XHR2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xuXHRcdHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG5cblx0XHRpZiAoJHVwZGF0ZXIuaXNQZW5kaW5nIHx8ICEkY2FjaGUuaXNNb3VudGVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciBuZXh0UHJvcHMgPSAkY2FjaGUucHJvcHMgfHwgcHJvcHM7XG5cdFx0dmFyIG5leHRTdGF0ZSA9ICRjYWNoZS5zdGF0ZSB8fCBzdGF0ZTtcblx0XHR2YXIgbmV4dENvbnRleHQgPSAkY2FjaGUuY29udGV4dCB8fCB7fTtcblx0XHR2YXIgcGFyZW50Q29udGV4dCA9ICRjYWNoZS5wYXJlbnRDb250ZXh0O1xuXHRcdHZhciBub2RlID0gJGNhY2hlLm5vZGU7XG5cdFx0dmFyIHZ0cmVlID0gJGNhY2hlLnZ0cmVlO1xuXHRcdCRjYWNoZS5wcm9wcyA9ICRjYWNoZS5zdGF0ZSA9ICRjYWNoZS5jb250ZXh0ID0gbnVsbDtcblx0XHQkdXBkYXRlci5pc1BlbmRpbmcgPSB0cnVlO1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpO1xuXHRcdHRoaXMuc3RhdGUgPSBuZXh0U3RhdGU7XG5cdFx0dGhpcy5wcm9wcyA9IG5leHRQcm9wcztcblx0XHR0aGlzLmNvbnRleHQgPSBuZXh0Q29udGV4dDtcblx0XHR2YXIgbmV4dFZ0cmVlID0gcmVuZGVyQ29tcG9uZW50KHRoaXMsIHBhcmVudENvbnRleHQpO1xuXHRcdHZhciBuZXdOb2RlID0gdnRyZWUudXBkYXRlVHJlZShub2RlLCBuZXh0VnRyZWUsIG5vZGUucGFyZW50Tm9kZSwgbmV4dFZ0cmVlLmNvbnRleHQpO1xuXHRcdGlmIChuZXdOb2RlICE9PSBub2RlKSB7XG5cdFx0XHRuZXdOb2RlLmNhY2hlID0gbmV3Tm9kZS5jYWNoZSB8fCB7fTtcblx0XHRcdGV4dGVuZChuZXdOb2RlLmNhY2hlLCBub2RlLmNhY2hlKTtcblx0XHR9XG5cdFx0JGNhY2hlLnZ0cmVlID0gbmV4dFZ0cmVlO1xuXHRcdCRjYWNoZS5ub2RlID0gbmV3Tm9kZTtcblx0XHRjbGVhckRpZE1vdW50KCk7XG5cdFx0dGhpcy5jb21wb25lbnREaWRVcGRhdGUocHJvcHMsIHN0YXRlLCBjb250ZXh0KTtcblx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcyk7XG5cdFx0fVxuXHRcdCR1cGRhdGVyLmlzUGVuZGluZyA9IGZhbHNlO1xuXHRcdCR1cGRhdGVyLmVtaXRVcGRhdGUoKTtcblx0fSxcblx0c2V0U3RhdGU6IGZ1bmN0aW9uIHNldFN0YXRlKG5leHRTdGF0ZSwgY2FsbGJhY2spIHtcblx0XHR2YXIgJHVwZGF0ZXIgPSB0aGlzLiR1cGRhdGVyO1xuXG5cdFx0JHVwZGF0ZXIuYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRcdCR1cGRhdGVyLmFkZFN0YXRlKG5leHRTdGF0ZSk7XG5cdH0sXG5cdHJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gcmVwbGFjZVN0YXRlKG5leHRTdGF0ZSwgY2FsbGJhY2spIHtcblx0XHR2YXIgJHVwZGF0ZXIgPSB0aGlzLiR1cGRhdGVyO1xuXG5cdFx0JHVwZGF0ZXIuYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRcdCR1cGRhdGVyLnJlcGxhY2VTdGF0ZShuZXh0U3RhdGUpO1xuXHR9LFxuXHRnZXRET01Ob2RlOiBmdW5jdGlvbiBnZXRET01Ob2RlKCkge1xuXHRcdHZhciBub2RlID0gdGhpcy4kY2FjaGUubm9kZTtcblx0XHRyZXR1cm4gbm9kZSAmJiBub2RlLnRhZ05hbWUgPT09ICdOT1NDUklQVCcgPyBudWxsIDogbm9kZTtcblx0fSxcblx0aXNNb3VudGVkOiBmdW5jdGlvbiBpc01vdW50ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuJGNhY2hlLmlzTW91bnRlZDtcblx0fVxufTtcblxudmFyIHVwZGF0ZVByb3BzQW5kU3RhdGUgPSBmdW5jdGlvbiB1cGRhdGVQcm9wc0FuZFN0YXRlKGNvbXBvbmVudCwgcHJvcHMsIHN0YXRlLCBjb250ZXh0KSB7XG5cdGNvbXBvbmVudC5zdGF0ZSA9IHN0YXRlO1xuXHRjb21wb25lbnQucHJvcHMgPSBwcm9wcztcblx0Y29tcG9uZW50LmNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xufTtcblxudmFyIHNob3VsZFVwZGF0ZSA9IGZ1bmN0aW9uIHNob3VsZFVwZGF0ZShjb21wb25lbnQsIG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCwgY2FsbGJhY2spIHtcblx0dmFyIHNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGNvbXBvbmVudC5zaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KTtcblx0aWYgKHNob3VsZENvbXBvbmVudFVwZGF0ZSA9PT0gZmFsc2UpIHtcblx0XHR1cGRhdGVQcm9wc0FuZFN0YXRlKGNvbXBvbmVudCwgbmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KTtcblx0XHRyZXR1cm47XG5cdH1cblx0dXBkYXRlUHJvcHNBbmRTdGF0ZShjb21wb25lbnQuJGNhY2hlLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpO1xuXHRjb21wb25lbnQuZm9yY2VVcGRhdGUoY2FsbGJhY2spO1xufTtcblxudmFyIGV2ZW50TmFtZUFsaWFzID0ge1xuXHRvbkRvdWJsZUNsaWNrOiAnb25kYmxjbGljaydcbn07XG52YXIgZ2V0RXZlbnROYW1lID0gZnVuY3Rpb24gZ2V0RXZlbnROYW1lKGtleSkge1xuXHRrZXkgPSBldmVudE5hbWVBbGlhc1trZXldIHx8IGtleTtcblx0cmV0dXJuIGtleS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGlzTm90QnViYmxlID0gdHJ1ZTtcbnZhciBub3RCdWJibGVFdmVudHMgPSB7XG5cdG9ubG9hZDogaXNOb3RCdWJibGUsXG5cdG9udW5sb2FkOiBpc05vdEJ1YmJsZSxcblx0b25zY3JvbGw6IGlzTm90QnViYmxlLFxuXHRvbmZvY3VzOiBpc05vdEJ1YmJsZSxcblx0b25ibHVyOiBpc05vdEJ1YmJsZSxcblx0b25yb3dleGl0OiBpc05vdEJ1YmJsZSxcblx0b25iZWZvcmV1bmxvYWQ6IGlzTm90QnViYmxlLFxuXHRvbnN0b3A6IGlzTm90QnViYmxlLFxuXHRvbmRyYWdkcm9wOiBpc05vdEJ1YmJsZSxcblx0b25kcmFnZW50ZXI6IGlzTm90QnViYmxlLFxuXHRvbmRyYWdleGl0OiBpc05vdEJ1YmJsZSxcblx0b25kcmFnZ2VzdHVyZTogaXNOb3RCdWJibGUsXG5cdG9uZHJhZ292ZXI6IGlzTm90QnViYmxlLFxuXHRvbmNvbnRleHRtZW51OiBpc05vdEJ1YmJsZVxufTtcblxudmFyIGV2ZW50VHlwZXMgPSB7fTtcblxudmFyIGFkZEV2ZW50ID0gZnVuY3Rpb24gYWRkRXZlbnQoZWxlbSwgZXZlbnRUeXBlLCBsaXN0ZW5lcikge1xuXHRldmVudFR5cGUgPSBnZXRFdmVudE5hbWUoZXZlbnRUeXBlKTtcblx0dmFyIGlzTm90QnViYmxlID0gbm90QnViYmxlRXZlbnRzW2V2ZW50VHlwZV07XG5cblx0aWYgKGlzTm90QnViYmxlKSB7XG5cdFx0ZWxlbVtldmVudFR5cGVdID0gbGlzdGVuZXI7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGV2ZW50U3RvcmUgPSBlbGVtLmV2ZW50U3RvcmUgfHwgKGVsZW0uZXZlbnRTdG9yZSA9IHt9KTtcblx0ZXZlbnRTdG9yZVtldmVudFR5cGVdID0gbGlzdGVuZXI7XG5cblx0aWYgKCFldmVudFR5cGVzW2V2ZW50VHlwZV0pIHtcblx0XHQvLyBvbmNsaWNrIC0+IGNsaWNrXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUuc3Vic3RyKDIpLCBkaXNwYXRjaEV2ZW50KTtcblx0XHRldmVudFR5cGVzW2V2ZW50VHlwZV0gPSB0cnVlO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ29uY2hhbmdlJykge1xuXHRcdGFkZEV2ZW50KGVsZW0sICdvbmlucHV0JywgbGlzdGVuZXIpO1xuXHR9XG59O1xuXG52YXIgcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiByZW1vdmVFdmVudChlbGVtLCBldmVudFR5cGUpIHtcblx0ZXZlbnRUeXBlID0gZ2V0RXZlbnROYW1lKGV2ZW50VHlwZSk7XG5cdHZhciBpc05vdEJ1YmJsZSA9IG5vdEJ1YmJsZUV2ZW50c1tldmVudFR5cGVdO1xuXG5cdGlmIChpc05vdEJ1YmJsZSkge1xuXHRcdGVsZW1bZXZlbnRUeXBlXSA9IG51bGw7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGV2ZW50U3RvcmUgPSBlbGVtLmV2ZW50U3RvcmUgfHwgKGVsZW0uZXZlbnRTdG9yZSA9IHt9KTtcblx0ZGVsZXRlIGV2ZW50U3RvcmVbZXZlbnRUeXBlXTtcblxuXHRpZiAoZXZlbnRUeXBlID09PSAnb25jaGFuZ2UnKSB7XG5cdFx0ZGVsZXRlIGV2ZW50U3RvcmVbJ29uaW5wdXQnXTtcblx0fVxufTtcblxudmFyIGRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2ZW50KSB7XG5cdHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cdHZhciB0eXBlID0gZXZlbnQudHlwZTtcblxuXHR2YXIgZXZlbnRUeXBlID0gJ29uJyArIHR5cGU7XG5cdHZhciBzeW50aGV0aWNFdmVudCA9IHVuZGVmaW5lZDtcblx0dXBkYXRlUXVldWUuaXNQZW5kaW5nID0gdHJ1ZTtcblx0d2hpbGUgKHRhcmdldCkge1xuXHRcdHZhciBfdGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdHZhciBldmVudFN0b3JlID0gX3RhcmdldC5ldmVudFN0b3JlO1xuXG5cdFx0dmFyIGxpc3RlbmVyID0gZXZlbnRTdG9yZSAmJiBldmVudFN0b3JlW2V2ZW50VHlwZV07XG5cdFx0aWYgKCFsaXN0ZW5lcikge1xuXHRcdFx0dGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdFx0aWYgKCFzeW50aGV0aWNFdmVudCkge1xuXHRcdFx0c3ludGhldGljRXZlbnQgPSB7fTtcblx0XHRcdHN5bnRoZXRpY0V2ZW50Lm5hdGl2ZUV2ZW50ID0gZXZlbnQ7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gZXZlbnQpIHtcblx0XHRcdFx0c3ludGhldGljRXZlbnRba2V5XSA9IHR5cGVvZiBldmVudFtrZXldID09PSAnZnVuY3Rpb24nID8gZXZlbnRba2V5XS5iaW5kKGV2ZW50KSA6IGV2ZW50W2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHN5bnRoZXRpY0V2ZW50LmN1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0bGlzdGVuZXIuY2FsbCh0YXJnZXQsIHN5bnRoZXRpY0V2ZW50KTtcblx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcblx0fVxuXHR1cGRhdGVRdWV1ZS5iYXRjaFVwZGF0ZSgpO1xufTtcblxudmFyIHN0b3JlID0ge307XG52YXIgcmVuZGVyVHJlZUludG9Db250YWluZXIgPSBmdW5jdGlvbiByZW5kZXJUcmVlSW50b0NvbnRhaW5lcih2dHJlZSwgY29udGFpbmVyLCBjYWxsYmFjaywgcGFyZW50Q29udGV4dCkge1xuXHRpZiAoIXZ0cmVlKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgcmVuZGVyICcgKyB2dHJlZSArICcgdG8gY29udGFpbmVyJyk7XG5cdH1cblx0dmFyIGlkID0gY29udGFpbmVyW0NPTVBPTkVOVF9JRF07XG5cdGlmIChzdG9yZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRzdG9yZVtpZF0udXBkYXRlVHJlZShjb250YWluZXIuZmlyc3RDaGlsZCwgdnRyZWUsIGNvbnRhaW5lciwgcGFyZW50Q29udGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Y29udGFpbmVyW0NPTVBPTkVOVF9JRF0gPSBpZCA9IGdldFVpZCgpO1xuXHRcdGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblx0XHR2dHJlZS5pbml0VHJlZShjb250YWluZXIsIHBhcmVudENvbnRleHQpO1xuXHR9XG5cdHN0b3JlW2lkXSA9IHZ0cmVlO1xuXHRjbGVhckRpZE1vdW50KCk7XG5cblx0dmFyIHJlc3VsdCA9IG51bGw7XG5cdHN3aXRjaCAodnRyZWUudnR5cGUpIHtcblx0XHRjYXNlIFZOT0RFX1RZUEUuRUxFTUVOVDpcblx0XHRcdHJlc3VsdCA9IGNvbnRhaW5lci5maXJzdENoaWxkO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBWTk9ERV9UWVBFLkNPTVBPTkVOVDpcblx0XHRcdHJlc3VsdCA9IGNvbnRhaW5lci5maXJzdENoaWxkLmNhY2hlW3Z0cmVlLmlkXTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0aWYgKGlzRm4oY2FsbGJhY2spKSB7XG5cdFx0Y2FsbGJhY2suY2FsbChyZXN1bHQpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciByZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodnRyZWUsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcblx0cmV0dXJuIHJlbmRlclRyZWVJbnRvQ29udGFpbmVyKHZ0cmVlLCBjb250YWluZXIsIGNhbGxiYWNrKTtcbn07XG5cbnZhciB1bnN0YWJsZV9yZW5kZXJTdWJ0cmVlSW50b0NvbnRhaW5lciA9IGZ1bmN0aW9uIHVuc3RhYmxlX3JlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyKHBhcmVudENvbXBvbmVudCwgc3ViVnRyZWUsIGNvbnRhaW5lciwgY2FsbGJhY2spIHtcblx0dmFyIGNvbnRleHQgPSBwYXJlbnRDb21wb25lbnQudnRyZWUgPyBwYXJlbnRDb21wb25lbnQudnRyZWUuY29udGV4dCA6IHBhcmVudENvbXBvbmVudC4kY2FjaGUucGFyZW50Q29udGV4dDtcblx0cmV0dXJuIHJlbmRlclRyZWVJbnRvQ29udGFpbmVyKHN1YlZ0cmVlLCBjb250YWluZXIsIGNhbGxiYWNrLCBjb250ZXh0KTtcbn07XG5cbnZhciB1bm1vdW50Q29tcG9uZW50QXROb2RlID0gZnVuY3Rpb24gdW5tb3VudENvbXBvbmVudEF0Tm9kZShjb250YWluZXIpIHtcblx0aWYgKCFjb250YWluZXIubm9kZU5hbWUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2V4cGVjdCBub2RlJyk7XG5cdH1cblx0dmFyIGlkID0gY29udGFpbmVyW0NPTVBPTkVOVF9JRF07XG5cdGlmIChzdG9yZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcblx0XHRzdG9yZVtpZF0uZGVzdHJveVRyZWUoY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuXHRcdGRlbGV0ZSBzdG9yZVtpZF07XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcblxudmFyIGZpbmRET01Ob2RlID0gZnVuY3Rpb24gZmluZERPTU5vZGUobm9kZSkge1xuXHRpZiAobm9kZSA9PSBudWxsKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0aWYgKG5vZGUubm9kZU5hbWUpIHtcblx0XHRyZXR1cm4gbm9kZTtcblx0fVxuXHR2YXIgY29tcG9uZW50ID0gbm9kZTtcblx0Ly8gaWYgY29tcG9uZW50Lm5vZGUgZXF1YWwgdG8gZmFsc2UsIGNvbXBvbmVudCBtdXN0IGJlIHVubW91bnRlZFxuXHRpZiAoY29tcG9uZW50LmdldERPTU5vZGUgJiYgY29tcG9uZW50LiRjYWNoZS5pc01vdW50ZWQpIHtcblx0XHRyZXR1cm4gY29tcG9uZW50LmdldERPTU5vZGUoKTtcblx0fVxuXHR0aHJvdyBuZXcgRXJyb3IoJ2ZpbmRET01Ob2RlIGNhbiBub3QgZmluZCBOb2RlJyk7XG59O1xuXG5cbnZhciBSZWFjdERPTSA9IE9iamVjdC5mcmVlemUoe1xuXHRyZW5kZXI6IHJlbmRlcixcblx0dW5zdGFibGVfcmVuZGVyU3VidHJlZUludG9Db250YWluZXI6IHVuc3RhYmxlX3JlbmRlclN1YnRyZWVJbnRvQ29udGFpbmVyLFxuXHR1bm1vdW50Q29tcG9uZW50QXROb2RlOiB1bm1vdW50Q29tcG9uZW50QXROb2RlLFxuXHRmaW5kRE9NTm9kZTogZmluZERPTU5vZGVcbn0pO1xuXG52YXIgdGFnTmFtZXMgPSAnYXxhYmJyfGFkZHJlc3N8YXJlYXxhcnRpY2xlfGFzaWRlfGF1ZGlvfGJ8YmFzZXxiZGl8YmRvfGJpZ3xibG9ja3F1b3RlfGJvZHl8YnJ8YnV0dG9ufGNhbnZhc3xjYXB0aW9ufGNpdGV8Y29kZXxjb2x8Y29sZ3JvdXB8ZGF0YXxkYXRhbGlzdHxkZHxkZWx8ZGV0YWlsc3xkZm58ZGlhbG9nfGRpdnxkbHxkdHxlbXxlbWJlZHxmaWVsZHNldHxmaWdjYXB0aW9ufGZpZ3VyZXxmb290ZXJ8Zm9ybXxoMXxoMnxoM3xoNHxoNXxoNnxoZWFkfGhlYWRlcnxoZ3JvdXB8aHJ8aHRtbHxpfGlmcmFtZXxpbWd8aW5wdXR8aW5zfGtiZHxrZXlnZW58bGFiZWx8bGVnZW5kfGxpfGxpbmt8bWFpbnxtYXB8bWFya3xtZW51fG1lbnVpdGVtfG1ldGF8bWV0ZXJ8bmF2fG5vc2NyaXB0fG9iamVjdHxvbHxvcHRncm91cHxvcHRpb258b3V0cHV0fHB8cGFyYW18cGljdHVyZXxwcmV8cHJvZ3Jlc3N8cXxycHxydHxydWJ5fHN8c2FtcHxzY3JpcHR8c2VjdGlvbnxzZWxlY3R8c21hbGx8c291cmNlfHNwYW58c3Ryb25nfHN0eWxlfHN1YnxzdW1tYXJ5fHN1cHx0YWJsZXx0Ym9keXx0ZHx0ZXh0YXJlYXx0Zm9vdHx0aHx0aGVhZHx0aW1lfHRpdGxlfHRyfHRyYWNrfHV8dWx8dmFyfHZpZGVvfHdicnxjaXJjbGV8Y2xpcFBhdGh8ZGVmc3xlbGxpcHNlfGd8aW1hZ2V8bGluZXxsaW5lYXJHcmFkaWVudHxtYXNrfHBhdGh8cGF0dGVybnxwb2x5Z29ufHBvbHlsaW5lfHJhZGlhbEdyYWRpZW50fHJlY3R8c3RvcHxzdmd8dGV4dHx0c3Bhbic7XG52YXIgRE9NID0ge307XG5lYWNoSXRlbSh0YWdOYW1lcy5zcGxpdCgnfCcpLCBmdW5jdGlvbiAodGFnTmFtZSkge1xuXHRET01bdGFnTmFtZV0gPSBjcmVhdGVGYWN0b3J5KHRhZ05hbWUpO1xufSk7XG5cbnZhciBjaGVjayA9IGZ1bmN0aW9uIGNoZWNrKCkge1xuICAgIHJldHVybiBjaGVjaztcbn07XG5jaGVjay5pc1JlcXVpcmVkID0gY2hlY2s7XG52YXIgUHJvcFR5cGVzID0ge1xuICAgIFwiYXJyYXlcIjogY2hlY2ssXG4gICAgXCJib29sXCI6IGNoZWNrLFxuICAgIFwiZnVuY1wiOiBjaGVjayxcbiAgICBcIm51bWJlclwiOiBjaGVjayxcbiAgICBcIm9iamVjdFwiOiBjaGVjayxcbiAgICBcInN0cmluZ1wiOiBjaGVjayxcbiAgICBcImFueVwiOiBjaGVjayxcbiAgICBcImFycmF5T2ZcIjogY2hlY2ssXG4gICAgXCJlbGVtZW50XCI6IGNoZWNrLFxuICAgIFwiaW5zdGFuY2VPZlwiOiBjaGVjayxcbiAgICBcIm5vZGVcIjogY2hlY2ssXG4gICAgXCJvYmplY3RPZlwiOiBjaGVjayxcbiAgICBcIm9uZU9mXCI6IGNoZWNrLFxuICAgIFwib25lT2ZUeXBlXCI6IGNoZWNrLFxuICAgIFwic2hhcGVcIjogY2hlY2tcbn07XG5cbnZhciBvbmx5ID0gZnVuY3Rpb24gb25seShjaGlsZHJlbikge1xuXHRpZiAoaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG5cdFx0cmV0dXJuIGNoaWxkcmVuO1xuXHR9XG5cdHRocm93IG5ldyBFcnJvcignZXhwZWN0IG9ubHkgb25lIGNoaWxkJyk7XG59O1xuXG52YXIgZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goY2hpbGRyZW4sIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG5cdGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG5cdFx0cmV0dXJuIGNoaWxkcmVuO1xuXHR9XG5cdGlmIChpc0FycihjaGlsZHJlbikpIHtcblx0XHRmbGF0dGVuQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcblx0XHRcdGl0ZXJhdGVlLmNhbGwoY29udGV4dCwgY2hpbGQsIGluZGV4KTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRpdGVyYXRlZS5jYWxsKGNvbnRleHQsIGNoaWxkcmVuLCAwKTtcblx0fVxufTtcblxudmFyIG1hcCA9IGZ1bmN0aW9uIG1hcChjaGlsZHJlbiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcblx0aWYgKGNoaWxkcmVuID09IG51bGwpIHtcblx0XHRyZXR1cm4gY2hpbGRyZW47XG5cdH1cblx0dmFyIHN0b3JlID0gW107XG5cdHZhciBrZXlNYXAgPSB7fTtcblx0Zm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkLCBpbmRleCkge1xuXHRcdHZhciBkYXRhID0ge307XG5cdFx0ZGF0YS5jaGlsZCA9IGl0ZXJhdGVlLmNhbGwoY29udGV4dCwgY2hpbGQsIGluZGV4KSB8fCBjaGlsZDtcblx0XHRkYXRhLmlzRXF1YWwgPSBkYXRhLmNoaWxkID09PSBjaGlsZDtcblx0XHR2YXIga2V5ID0gZGF0YS5rZXkgPSBnZXRLZXkoY2hpbGQsIGluZGV4KTtcblx0XHRpZiAoa2V5TWFwLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdGtleU1hcFtrZXldID0ga2V5TWFwW2tleV0gKyAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRrZXlNYXBba2V5XSA9IDA7XG5cdFx0fVxuXHRcdGRhdGEuaW5kZXggPSBrZXlNYXBba2V5XTtcblx0XHRzdG9yZS5wdXNoKGRhdGEpO1xuXHR9KTtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHRlYWNoSXRlbShzdG9yZSwgZnVuY3Rpb24gKF9yZWYpIHtcblx0XHR2YXIgY2hpbGQgPSBfcmVmLmNoaWxkO1xuXHRcdHZhciBrZXkgPSBfcmVmLmtleTtcblx0XHR2YXIgaW5kZXggPSBfcmVmLmluZGV4O1xuXHRcdHZhciBpc0VxdWFsID0gX3JlZi5pc0VxdWFsO1xuXG5cdFx0aWYgKGNoaWxkID09IG51bGwgfHwgaXNCbG4oY2hpbGQpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICghaXNWYWxpZEVsZW1lbnQoY2hpbGQpIHx8IGtleSA9PSBudWxsKSB7XG5cdFx0XHRyZXN1bHQucHVzaChjaGlsZCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChrZXlNYXBba2V5XSAhPT0gMCkge1xuXHRcdFx0a2V5ICs9ICc6JyArIGluZGV4O1xuXHRcdH1cblx0XHRpZiAoIWlzRXF1YWwpIHtcblx0XHRcdGtleSA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShjaGlsZC5rZXkgfHwgJycpICsgJy8nICsga2V5O1xuXHRcdH1cblx0XHRjaGlsZCA9IGNsb25lRWxlbWVudChjaGlsZCwgeyBrZXk6IGtleSB9KTtcblx0XHRyZXN1bHQucHVzaChjaGlsZCk7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGNvdW50ID0gZnVuY3Rpb24gY291bnQoY2hpbGRyZW4pIHtcblx0dmFyIGNvdW50ID0gMDtcblx0Zm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKCkge1xuXHRcdGNvdW50Kys7XG5cdH0pO1xuXHRyZXR1cm4gY291bnQ7XG59O1xuXG52YXIgdG9BcnJheSA9IGZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcblx0cmV0dXJuIG1hcChjaGlsZHJlbiwgaWRlbnRpdHkpIHx8IFtdO1xufTtcblxudmFyIGdldEtleSA9IGZ1bmN0aW9uIGdldEtleShjaGlsZCwgaW5kZXgpIHtcblx0dmFyIGtleSA9IHVuZGVmaW5lZDtcblx0aWYgKGlzVmFsaWRFbGVtZW50KGNoaWxkKSAmJiBpc1N0cihjaGlsZC5rZXkpKSB7XG5cdFx0a2V5ID0gJy4kJyArIGNoaWxkLmtleTtcblx0fSBlbHNlIHtcblx0XHRrZXkgPSAnLicgKyBpbmRleC50b1N0cmluZygzNik7XG5cdH1cblx0cmV0dXJuIGtleTtcbn07XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8oPyFcXC8pL2c7XG52YXIgZXNjYXBlVXNlclByb3ZpZGVkS2V5ID0gZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcblx0cmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICcvLycpO1xufTtcblxudmFyIENoaWxkcmVuID0gT2JqZWN0LmZyZWV6ZSh7XG5cdG9ubHk6IG9ubHksXG5cdGZvckVhY2g6IGZvckVhY2gsXG5cdG1hcDogbWFwLFxuXHRjb3VudDogY291bnQsXG5cdHRvQXJyYXk6IHRvQXJyYXlcbn0pO1xuXG52YXIgZWFjaE1peGluID0gZnVuY3Rpb24gZWFjaE1peGluKG1peGlucywgaXRlcmF0ZWUpIHtcblx0ZWFjaEl0ZW0obWl4aW5zLCBmdW5jdGlvbiAobWl4aW4pIHtcblx0XHRpZiAobWl4aW4pIHtcblx0XHRcdGlmIChpc0FycihtaXhpbi5taXhpbnMpKSB7XG5cdFx0XHRcdGVhY2hNaXhpbihtaXhpbi5taXhpbnMsIGl0ZXJhdGVlKTtcblx0XHRcdH1cblx0XHRcdGl0ZXJhdGVlKG1peGluKTtcblx0XHR9XG5cdH0pO1xufTtcblxudmFyIGNvbWJpbmVNaXhpblRvUHJvdG8gPSBmdW5jdGlvbiBjb21iaW5lTWl4aW5Ub1Byb3RvKHByb3RvLCBtaXhpbikge1xuXHRtYXBWYWx1ZShtaXhpbiwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblx0XHRpZiAoa2V5ID09PSAnZ2V0SW5pdGlhbFN0YXRlJykge1xuXHRcdFx0cHJvdG8uJGdldEluaXRpYWxTdGF0ZXMucHVzaCh2YWx1ZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZhciBjdXJWYWx1ZSA9IHByb3RvW2tleV07XG5cdFx0aWYgKGlzRm4oY3VyVmFsdWUpICYmIGlzRm4odmFsdWUpKSB7XG5cdFx0XHRwcm90b1trZXldID0gcGlwZShjdXJWYWx1ZSwgdmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwcm90b1trZXldID0gdmFsdWU7XG5cdFx0fVxuXHR9KTtcbn07XG5cbnZhciBjb21iaW5lTWl4aW5Ub0NsYXNzID0gZnVuY3Rpb24gY29tYmluZU1peGluVG9DbGFzcyhDb21wb25lbnQsIG1peGluKSB7XG5cdGlmIChpc09iaihtaXhpbi5wcm9wVHlwZXMpKSB7XG5cdFx0ZXh0ZW5kKENvbXBvbmVudC5wcm9wVHlwZXMsIG1peGluLnByb3BUeXBlcyk7XG5cdH1cblx0aWYgKGlzT2JqKG1peGluLmNvbnRleHRUeXBlcykpIHtcblx0XHRleHRlbmQoQ29tcG9uZW50LmNvbnRleHRUeXBlcywgbWl4aW4uY29udGV4dFR5cGVzKTtcblx0fVxuXHRpZiAoaXNGbihtaXhpbi5nZXREZWZhdWx0UHJvcHMpKSB7XG5cdFx0ZXh0ZW5kKENvbXBvbmVudC5kZWZhdWx0UHJvcHMsIG1peGluLmdldERlZmF1bHRQcm9wcygpKTtcblx0fVxuXHRpZiAoaXNPYmoobWl4aW4uc3RhdGljcykpIHtcblx0XHRleHRlbmQoQ29tcG9uZW50LCBtaXhpbi5zdGF0aWNzKTtcblx0fVxufTtcblxudmFyIGJpbmRDb250ZXh0ID0gZnVuY3Rpb24gYmluZENvbnRleHQob2JqLCBzb3VyY2UpIHtcblx0bWFwVmFsdWUoc291cmNlLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXHRcdGlmIChpc0ZuKHZhbHVlKSkge1xuXHRcdFx0b2JqW2tleV0gPSB2YWx1ZS5iaW5kKG9iaik7XG5cdFx0fVxuXHR9KTtcbn07XG5cbnZhciBGYWNhZGUgPSBmdW5jdGlvbiBGYWNhZGUoKSB7fTtcbkZhY2FkZS5wcm90b3R5cGUgPSBDb21wb25lbnQucHJvdG90eXBlO1xuXG52YXIgZ2V0SW5pdGlhbFN0YXRlID0gZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdHZhciBzdGF0ZSA9IHt9O1xuXHR2YXIgc2V0U3RhdGUgPSB0aGlzLnNldFN0YXRlO1xuXHR0aGlzLnNldFN0YXRlID0gRmFjYWRlO1xuXHRlYWNoSXRlbSh0aGlzLiRnZXRJbml0aWFsU3RhdGVzLCBmdW5jdGlvbiAoZ2V0SW5pdGlhbFN0YXRlKSB7XG5cdFx0aWYgKGlzRm4oZ2V0SW5pdGlhbFN0YXRlKSkge1xuXHRcdFx0ZXh0ZW5kKHN0YXRlLCBnZXRJbml0aWFsU3RhdGUuY2FsbChfdGhpcykpO1xuXHRcdH1cblx0fSk7XG5cdHRoaXMuc2V0U3RhdGUgPSBzZXRTdGF0ZTtcblx0cmV0dXJuIHN0YXRlO1xufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gY3JlYXRlQ2xhc3Moc3BlYykge1xuXHRpZiAoIWlzRm4oc3BlYy5yZW5kZXIpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdjcmVhdGVDbGFzczogc3BlYy5yZW5kZXIgaXMgbm90IGZ1bmN0aW9uJyk7XG5cdH1cblx0dmFyIHNwZWNNaXhpbnMgPSBzcGVjLm1peGlucyB8fCBbXTtcblx0dmFyIG1peGlucyA9IHNwZWNNaXhpbnMuY29uY2F0KHNwZWMpO1xuXHRzcGVjLm1peGlucyA9IG51bGw7XG5cdGZ1bmN0aW9uIEtsYXNzKHByb3BzLCBjb250ZXh0KSB7XG5cdFx0Q29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpO1xuXHRcdHRoaXMuY29uc3RydWN0b3IgPSBLbGFzcztcblx0XHRzcGVjLmF1dG9iaW5kICE9PSBmYWxzZSAmJiBiaW5kQ29udGV4dCh0aGlzLCBLbGFzcy5wcm90b3R5cGUpO1xuXHRcdHRoaXMuc3RhdGUgPSB0aGlzLmdldEluaXRpYWxTdGF0ZSgpIHx8IHRoaXMuc3RhdGU7XG5cdH1cblx0S2xhc3MuZGlzcGxheU5hbWUgPSBzcGVjLmRpc3BsYXlOYW1lO1xuXHRLbGFzcy5jb250ZXh0VHlwZXMgPSB7fTtcblx0S2xhc3MucHJvcFR5cGVzID0ge307XG5cdEtsYXNzLmRlZmF1bHRQcm9wcyA9IHt9O1xuXHR2YXIgcHJvdG8gPSBLbGFzcy5wcm90b3R5cGUgPSBuZXcgRmFjYWRlKCk7XG5cdHByb3RvLiRnZXRJbml0aWFsU3RhdGVzID0gW107XG5cdGVhY2hNaXhpbihtaXhpbnMsIGZ1bmN0aW9uIChtaXhpbikge1xuXHRcdGNvbWJpbmVNaXhpblRvUHJvdG8ocHJvdG8sIG1peGluKTtcblx0XHRjb21iaW5lTWl4aW5Ub0NsYXNzKEtsYXNzLCBtaXhpbik7XG5cdH0pO1xuXHRwcm90by5nZXRJbml0aWFsU3RhdGUgPSBnZXRJbml0aWFsU3RhdGU7XG5cdHNwZWMubWl4aW5zID0gc3BlY01peGlucztcblx0cmV0dXJuIEtsYXNzO1xufTtcblxudmFyIFJlYWN0ID0gZXh0ZW5kKHtcbiAgICB2ZXJzaW9uOiAnMC4xNC43JyxcbiAgICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudCxcbiAgICBpc1ZhbGlkRWxlbWVudDogaXNWYWxpZEVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgICBjcmVhdGVGYWN0b3J5OiBjcmVhdGVGYWN0b3J5LFxuICAgIENvbXBvbmVudDogQ29tcG9uZW50LFxuICAgIGNyZWF0ZUNsYXNzOiBjcmVhdGVDbGFzcyxcbiAgICBDaGlsZHJlbjogQ2hpbGRyZW4sXG4gICAgUHJvcFR5cGVzOiBQcm9wVHlwZXMsXG4gICAgRE9NOiBET01cbn0sIFJlYWN0RE9NKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3QtbGl0ZS9kaXN0L3JlYWN0LWxpdGUuY29tbW9uLmpzXG4gKiovIiwiLyogY29tcG9uZW50cyAqL1xyXG5leHBvcnQgUm91dGVyIGZyb20gJy4vUm91dGVyJ1xyXG5leHBvcnQgTGluayBmcm9tICcuL0xpbmsnXHJcbmV4cG9ydCBJbmRleExpbmsgZnJvbSAnLi9JbmRleExpbmsnXHJcblxyXG4vKiBjb21wb25lbnRzIChjb25maWd1cmF0aW9uKSAqL1xyXG5leHBvcnQgSW5kZXhSZWRpcmVjdCBmcm9tICcuL0luZGV4UmVkaXJlY3QnXHJcbmV4cG9ydCBJbmRleFJvdXRlIGZyb20gJy4vSW5kZXhSb3V0ZSdcclxuZXhwb3J0IFJlZGlyZWN0IGZyb20gJy4vUmVkaXJlY3QnXHJcbmV4cG9ydCBSb3V0ZSBmcm9tICcuL1JvdXRlJ1xyXG5cclxuLyogbWl4aW5zICovXHJcbmV4cG9ydCBIaXN0b3J5IGZyb20gJy4vSGlzdG9yeSdcclxuZXhwb3J0IExpZmVjeWNsZSBmcm9tICcuL0xpZmVjeWNsZSdcclxuZXhwb3J0IFJvdXRlQ29udGV4dCBmcm9tICcuL1JvdXRlQ29udGV4dCdcclxuXHJcbi8qIHV0aWxzICovXHJcbmV4cG9ydCB1c2VSb3V0ZXMgZnJvbSAnLi91c2VSb3V0ZXMnXHJcbmV4cG9ydCB7IGNyZWF0ZVJvdXRlcyB9IGZyb20gJy4vUm91dGVVdGlscydcclxuZXhwb3J0IFJvdXRlckNvbnRleHQgZnJvbSAnLi9Sb3V0ZXJDb250ZXh0J1xyXG5leHBvcnQgUHJvcFR5cGVzIGZyb20gJy4vUHJvcFR5cGVzJ1xyXG5leHBvcnQgbWF0Y2ggZnJvbSAnLi9tYXRjaCdcclxuZXhwb3J0IHVzZVJvdXRlckhpc3RvcnkgZnJvbSAnLi91c2VSb3V0ZXJIaXN0b3J5J1xyXG5leHBvcnQgeyBmb3JtYXRQYXR0ZXJuIH0gZnJvbSAnLi9QYXR0ZXJuVXRpbHMnXHJcblxyXG4vKiBoaXN0b3JpZXMgKi9cclxuZXhwb3J0IGJyb3dzZXJIaXN0b3J5IGZyb20gJy4vYnJvd3Nlckhpc3RvcnknXHJcbmV4cG9ydCBoYXNoSGlzdG9yeSBmcm9tICcuL2hhc2hIaXN0b3J5J1xyXG5leHBvcnQgY3JlYXRlTWVtb3J5SGlzdG9yeSBmcm9tICcuL2NyZWF0ZU1lbW9yeUhpc3RvcnknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmcm9tICcuL1JvdXRlcidcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHVzZVF1ZXJpZXMgZnJvbSAnaGlzdG9yeS9saWIvdXNlUXVlcmllcydcclxuXHJcbmltcG9ydCBjcmVhdGVUcmFuc2l0aW9uTWFuYWdlciBmcm9tICcuL2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyJ1xyXG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3dhcm5pbmcnXHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIG5ldyBjcmVhdGVIaXN0b3J5IGZ1bmN0aW9uIHRoYXQgbWF5IGJlIHVzZWQgdG8gY3JlYXRlXHJcbiAqIGhpc3Rvcnkgb2JqZWN0cyB0aGF0IGtub3cgYWJvdXQgcm91dGluZy5cclxuICpcclxuICogRW5oYW5jZXMgaGlzdG9yeSBvYmplY3RzIHdpdGggdGhlIGZvbGxvd2luZyBtZXRob2RzOlxyXG4gKlxyXG4gKiAtIGxpc3RlbigoZXJyb3IsIG5leHRTdGF0ZSkgPT4ge30pXHJcbiAqIC0gbGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlKHJvdXRlLCAobmV4dExvY2F0aW9uKSA9PiB7fSlcclxuICogLSBtYXRjaChsb2NhdGlvbiwgKGVycm9yLCByZWRpcmVjdExvY2F0aW9uLCBuZXh0U3RhdGUpID0+IHt9KVxyXG4gKiAtIGlzQWN0aXZlKHBhdGhuYW1lLCBxdWVyeSwgaW5kZXhPbmx5PWZhbHNlKVxyXG4gKi9cclxuZnVuY3Rpb24gdXNlUm91dGVzKGNyZWF0ZUhpc3RvcnkpIHtcclxuICB3YXJuaW5nKFxyXG4gICAgZmFsc2UsXHJcbiAgICAnYHVzZVJvdXRlc2AgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBgY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXJgIGluc3RlYWQuJ1xyXG4gIClcclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uICh7IHJvdXRlcywgLi4ub3B0aW9ucyB9ID0ge30pIHtcclxuICAgIGNvbnN0IGhpc3RvcnkgPSB1c2VRdWVyaWVzKGNyZWF0ZUhpc3RvcnkpKG9wdGlvbnMpXHJcbiAgICBjb25zdCB0cmFuc2l0aW9uTWFuYWdlciA9IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKGhpc3RvcnksIHJvdXRlcylcclxuICAgIHJldHVybiB7IC4uLmhpc3RvcnksIC4uLnRyYW5zaXRpb25NYW5hZ2VyIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZVJvdXRlc1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvdXNlUm91dGVzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBfcXVlcnlTdHJpbmcgPSByZXF1aXJlKCdxdWVyeS1zdHJpbmcnKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vayA9IHJlcXVpcmUoJy4vcnVuVHJhbnNpdGlvbkhvb2snKTtcblxudmFyIF9ydW5UcmFuc2l0aW9uSG9vazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ydW5UcmFuc2l0aW9uSG9vayk7XG5cbnZhciBfcGFyc2VQYXRoID0gcmVxdWlyZSgnLi9wYXJzZVBhdGgnKTtcblxudmFyIF9wYXJzZVBhdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFyc2VQYXRoKTtcblxudmFyIF9kZXByZWNhdGUgPSByZXF1aXJlKCcuL2RlcHJlY2F0ZScpO1xuXG52YXIgX2RlcHJlY2F0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZXByZWNhdGUpO1xuXG52YXIgU0VBUkNIX0JBU0VfS0VZID0gJyRzZWFyY2hCYXNlJztcblxuZnVuY3Rpb24gZGVmYXVsdFN0cmluZ2lmeVF1ZXJ5KHF1ZXJ5KSB7XG4gIHJldHVybiBfcXVlcnlTdHJpbmcuc3RyaW5naWZ5KHF1ZXJ5KS5yZXBsYWNlKC8lMjAvZywgJysnKTtcbn1cblxudmFyIGRlZmF1bHRQYXJzZVF1ZXJ5U3RyaW5nID0gX3F1ZXJ5U3RyaW5nLnBhcnNlO1xuXG5mdW5jdGlvbiBpc05lc3RlZE9iamVjdChvYmplY3QpIHtcbiAgZm9yICh2YXIgcCBpbiBvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KHApICYmIHR5cGVvZiBvYmplY3RbcF0gPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KG9iamVjdFtwXSkgJiYgb2JqZWN0W3BdICE9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgfXJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGNyZWF0ZUhpc3RvcnkgZnVuY3Rpb24gdGhhdCBtYXkgYmUgdXNlZCB0byBjcmVhdGVcbiAqIGhpc3Rvcnkgb2JqZWN0cyB0aGF0IGtub3cgaG93IHRvIGhhbmRsZSBVUkwgcXVlcmllcy5cbiAqL1xuZnVuY3Rpb24gdXNlUXVlcmllcyhjcmVhdGVIaXN0b3J5KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcbiAgICB2YXIgc3RyaW5naWZ5UXVlcnkgPSBvcHRpb25zLnN0cmluZ2lmeVF1ZXJ5O1xuICAgIHZhciBwYXJzZVF1ZXJ5U3RyaW5nID0gb3B0aW9ucy5wYXJzZVF1ZXJ5U3RyaW5nO1xuXG4gICAgdmFyIGhpc3RvcnlPcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9wdGlvbnMsIFsnc3RyaW5naWZ5UXVlcnknLCAncGFyc2VRdWVyeVN0cmluZyddKTtcblxuICAgIHZhciBoaXN0b3J5ID0gY3JlYXRlSGlzdG9yeShoaXN0b3J5T3B0aW9ucyk7XG5cbiAgICBpZiAodHlwZW9mIHN0cmluZ2lmeVF1ZXJ5ICE9PSAnZnVuY3Rpb24nKSBzdHJpbmdpZnlRdWVyeSA9IGRlZmF1bHRTdHJpbmdpZnlRdWVyeTtcblxuICAgIGlmICh0eXBlb2YgcGFyc2VRdWVyeVN0cmluZyAhPT0gJ2Z1bmN0aW9uJykgcGFyc2VRdWVyeVN0cmluZyA9IGRlZmF1bHRQYXJzZVF1ZXJ5U3RyaW5nO1xuXG4gICAgZnVuY3Rpb24gYWRkUXVlcnkobG9jYXRpb24pIHtcbiAgICAgIGlmIChsb2NhdGlvbi5xdWVyeSA9PSBudWxsKSB7XG4gICAgICAgIHZhciBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2g7XG5cbiAgICAgICAgbG9jYXRpb24ucXVlcnkgPSBwYXJzZVF1ZXJ5U3RyaW5nKHNlYXJjaC5zdWJzdHJpbmcoMSkpO1xuICAgICAgICBsb2NhdGlvbltTRUFSQ0hfQkFTRV9LRVldID0geyBzZWFyY2g6IHNlYXJjaCwgc2VhcmNoQmFzZTogJycgfTtcbiAgICAgIH1cblxuICAgICAgLy8gVE9ETzogSW5zdGVhZCBvZiBhbGwgdGhlIGJvb2sta2VlcGluZyBoZXJlLCB0aGlzIHNob3VsZCBqdXN0IHN0cmlwIHRoZVxuICAgICAgLy8gc3RyaW5naWZpZWQgcXVlcnkgZnJvbSB0aGUgc2VhcmNoLlxuXG4gICAgICByZXR1cm4gbG9jYXRpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kUXVlcnkobG9jYXRpb24sIHF1ZXJ5KSB7XG4gICAgICB2YXIgX2V4dGVuZHMyO1xuXG4gICAgICB2YXIgcXVlcnlTdHJpbmcgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAoIXF1ZXJ5IHx8IChxdWVyeVN0cmluZyA9IHN0cmluZ2lmeVF1ZXJ5KHF1ZXJ5KSkgPT09ICcnKSByZXR1cm4gbG9jYXRpb247XG5cbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShzdHJpbmdpZnlRdWVyeSAhPT0gZGVmYXVsdFN0cmluZ2lmeVF1ZXJ5IHx8ICFpc05lc3RlZE9iamVjdChxdWVyeSksICd1c2VRdWVyaWVzIGRvZXMgbm90IHN0cmluZ2lmeSBuZXN0ZWQgcXVlcnkgb2JqZWN0cyBieSBkZWZhdWx0OyAnICsgJ3VzZSBhIGN1c3RvbSBzdHJpbmdpZnlRdWVyeSBmdW5jdGlvbicpIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJykgbG9jYXRpb24gPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKGxvY2F0aW9uKTtcblxuICAgICAgdmFyIHNlYXJjaEJhc2VTcGVjID0gbG9jYXRpb25bU0VBUkNIX0JBU0VfS0VZXTtcbiAgICAgIHZhciBzZWFyY2hCYXNlID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKHNlYXJjaEJhc2VTcGVjICYmIGxvY2F0aW9uLnNlYXJjaCA9PT0gc2VhcmNoQmFzZVNwZWMuc2VhcmNoKSB7XG4gICAgICAgIHNlYXJjaEJhc2UgPSBzZWFyY2hCYXNlU3BlYy5zZWFyY2hCYXNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoQmFzZSA9IGxvY2F0aW9uLnNlYXJjaCB8fCAnJztcbiAgICAgIH1cblxuICAgICAgdmFyIHNlYXJjaCA9IHNlYXJjaEJhc2UgKyAoc2VhcmNoQmFzZSA/ICcmJyA6ICc/JykgKyBxdWVyeVN0cmluZztcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwgKF9leHRlbmRzMiA9IHtcbiAgICAgICAgc2VhcmNoOiBzZWFyY2hcbiAgICAgIH0sIF9leHRlbmRzMltTRUFSQ0hfQkFTRV9LRVldID0geyBzZWFyY2g6IHNlYXJjaCwgc2VhcmNoQmFzZTogc2VhcmNoQmFzZSB9LCBfZXh0ZW5kczIpKTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZSBhbGwgcmVhZCBtZXRob2RzIHdpdGggcXVlcnktYXdhcmUgdmVyc2lvbnMuXG4gICAgZnVuY3Rpb24gbGlzdGVuQmVmb3JlKGhvb2spIHtcbiAgICAgIHJldHVybiBoaXN0b3J5Lmxpc3RlbkJlZm9yZShmdW5jdGlvbiAobG9jYXRpb24sIGNhbGxiYWNrKSB7XG4gICAgICAgIF9ydW5UcmFuc2l0aW9uSG9vazJbJ2RlZmF1bHQnXShob29rLCBhZGRRdWVyeShsb2NhdGlvbiksIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGhpc3RvcnkubGlzdGVuKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICBsaXN0ZW5lcihhZGRRdWVyeShsb2NhdGlvbikpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gT3ZlcnJpZGUgYWxsIHdyaXRlIG1ldGhvZHMgd2l0aCBxdWVyeS1hd2FyZSB2ZXJzaW9ucy5cbiAgICBmdW5jdGlvbiBwdXNoKGxvY2F0aW9uKSB7XG4gICAgICBoaXN0b3J5LnB1c2goYXBwZW5kUXVlcnkobG9jYXRpb24sIGxvY2F0aW9uLnF1ZXJ5KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwbGFjZShsb2NhdGlvbikge1xuICAgICAgaGlzdG9yeS5yZXBsYWNlKGFwcGVuZFF1ZXJ5KGxvY2F0aW9uLCBsb2NhdGlvbi5xdWVyeSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVBhdGgobG9jYXRpb24sIHF1ZXJ5KSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oIXF1ZXJ5LCAndGhlIHF1ZXJ5IGFyZ3VtZW50IHRvIGNyZWF0ZVBhdGggaXMgZGVwcmVjYXRlZDsgdXNlIGEgbG9jYXRpb24gZGVzY3JpcHRvciBpbnN0ZWFkJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybiBoaXN0b3J5LmNyZWF0ZVBhdGgoYXBwZW5kUXVlcnkobG9jYXRpb24sIHF1ZXJ5IHx8IGxvY2F0aW9uLnF1ZXJ5KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSHJlZihsb2NhdGlvbiwgcXVlcnkpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXSghcXVlcnksICd0aGUgcXVlcnkgYXJndW1lbnQgdG8gY3JlYXRlSHJlZiBpcyBkZXByZWNhdGVkOyB1c2UgYSBsb2NhdGlvbiBkZXNjcmlwdG9yIGluc3RlYWQnKSA6IHVuZGVmaW5lZDtcblxuICAgICAgcmV0dXJuIGhpc3RvcnkuY3JlYXRlSHJlZihhcHBlbmRRdWVyeShsb2NhdGlvbiwgcXVlcnkgfHwgbG9jYXRpb24ucXVlcnkpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVMb2NhdGlvbihsb2NhdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgZnVsbExvY2F0aW9uID0gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbi5hcHBseShoaXN0b3J5LCBbYXBwZW5kUXVlcnkobG9jYXRpb24sIGxvY2F0aW9uLnF1ZXJ5KV0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIGlmIChsb2NhdGlvbi5xdWVyeSkge1xuICAgICAgICBmdWxsTG9jYXRpb24ucXVlcnkgPSBsb2NhdGlvbi5xdWVyeTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhZGRRdWVyeShmdWxsTG9jYXRpb24pO1xuICAgIH1cblxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBmdW5jdGlvbiBwdXNoU3RhdGUoc3RhdGUsIHBhdGgsIHF1ZXJ5KSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSBwYXRoID0gX3BhcnNlUGF0aDJbJ2RlZmF1bHQnXShwYXRoKTtcblxuICAgICAgcHVzaChfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoLCB7IHF1ZXJ5OiBxdWVyeSB9KSk7XG4gICAgfVxuXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShzdGF0ZSwgcGF0aCwgcXVlcnkpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgICByZXBsYWNlKF9leHRlbmRzKHsgc3RhdGU6IHN0YXRlIH0sIHBhdGgsIHsgcXVlcnk6IHF1ZXJ5IH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2V4dGVuZHMoe30sIGhpc3RvcnksIHtcbiAgICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgICAgbGlzdGVuOiBsaXN0ZW4sXG4gICAgICBwdXNoOiBwdXNoLFxuICAgICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICAgIGNyZWF0ZVBhdGg6IGNyZWF0ZVBhdGgsXG4gICAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgICAgY3JlYXRlTG9jYXRpb246IGNyZWF0ZUxvY2F0aW9uLFxuXG4gICAgICBwdXNoU3RhdGU6IF9kZXByZWNhdGUyWydkZWZhdWx0J10ocHVzaFN0YXRlLCAncHVzaFN0YXRlIGlzIGRlcHJlY2F0ZWQ7IHVzZSBwdXNoIGluc3RlYWQnKSxcbiAgICAgIHJlcGxhY2VTdGF0ZTogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShyZXBsYWNlU3RhdGUsICdyZXBsYWNlU3RhdGUgaXMgZGVwcmVjYXRlZDsgdXNlIHJlcGxhY2UgaW5zdGVhZCcpXG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHVzZVF1ZXJpZXM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvdXNlUXVlcmllcy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMzVcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBfZXh0cmFjdFBhdGggPSByZXF1aXJlKCcuL2V4dHJhY3RQYXRoJyk7XG5cbnZhciBfZXh0cmFjdFBhdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0cmFjdFBhdGgpO1xuXG5mdW5jdGlvbiBwYXJzZVBhdGgocGF0aCkge1xuICB2YXIgcGF0aG5hbWUgPSBfZXh0cmFjdFBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG4gIHZhciBzZWFyY2ggPSAnJztcbiAgdmFyIGhhc2ggPSAnJztcblxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10ocGF0aCA9PT0gcGF0aG5hbWUsICdBIHBhdGggbXVzdCBiZSBwYXRobmFtZSArIHNlYXJjaCArIGhhc2ggb25seSwgbm90IGEgZnVsbHkgcXVhbGlmaWVkIFVSTCBsaWtlIFwiJXNcIicsIHBhdGgpIDogdW5kZWZpbmVkO1xuXG4gIHZhciBoYXNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoSW5kZXggIT09IC0xKSB7XG4gICAgaGFzaCA9IHBhdGhuYW1lLnN1YnN0cmluZyhoYXNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyaW5nKDAsIGhhc2hJbmRleCk7XG4gIH1cblxuICB2YXIgc2VhcmNoSW5kZXggPSBwYXRobmFtZS5pbmRleE9mKCc/Jyk7XG4gIGlmIChzZWFyY2hJbmRleCAhPT0gLTEpIHtcbiAgICBzZWFyY2ggPSBwYXRobmFtZS5zdWJzdHJpbmcoc2VhcmNoSW5kZXgpO1xuICAgIHBhdGhuYW1lID0gcGF0aG5hbWUuc3Vic3RyaW5nKDAsIHNlYXJjaEluZGV4KTtcbiAgfVxuXG4gIGlmIChwYXRobmFtZSA9PT0gJycpIHBhdGhuYW1lID0gJy8nO1xuXG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWU6IHBhdGhuYW1lLFxuICAgIHNlYXJjaDogc2VhcmNoLFxuICAgIGhhc2g6IGhhc2hcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gcGFyc2VQYXRoO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3RvcnkvbGliL3BhcnNlUGF0aC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMzVcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQubGVuZ3RoIDwgMTAgfHwgKC9eW3NcXFddKiQvKS50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSB3YXJuaW5nIGZvcm1hdCBzaG91bGQgYmUgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzICcgK1xuICAgICAgICAnd2FybmluZy4gUGxlYXNlLCB1c2UgYSBtb3JlIGRlc2NyaXB0aXZlIGZvcm1hdCB0aGFuOiAnICsgZm9ybWF0XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2goeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi93YXJuaW5nL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBleHRyYWN0UGF0aChzdHJpbmcpIHtcbiAgdmFyIG1hdGNoID0gc3RyaW5nLm1hdGNoKC9eaHR0cHM/OlxcL1xcL1teXFwvXSovKTtcblxuICBpZiAobWF0Y2ggPT0gbnVsbCkgcmV0dXJuIHN0cmluZztcblxuICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZyhtYXRjaFswXS5sZW5ndGgpO1xufVxuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGV4dHJhY3RQYXRoO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvZXh0cmFjdFBhdGguanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cmljdFVyaUVuY29kZSA9IHJlcXVpcmUoJ3N0cmljdC11cmktZW5jb2RlJyk7XG5cbmV4cG9ydHMuZXh0cmFjdCA9IGZ1bmN0aW9uIChzdHIpIHtcblx0cmV0dXJuIHN0ci5zcGxpdCgnPycpWzFdIHx8ICcnO1xufTtcblxuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uIChzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9XG5cblx0c3RyID0gc3RyLnRyaW0oKS5yZXBsYWNlKC9eKFxcP3wjfCYpLywgJycpO1xuXG5cdGlmICghc3RyKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9XG5cblx0cmV0dXJuIHN0ci5zcGxpdCgnJicpLnJlZHVjZShmdW5jdGlvbiAocmV0LCBwYXJhbSkge1xuXHRcdHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG5cdFx0Ly8gRmlyZWZveCAocHJlIDQwKSBkZWNvZGVzIGAlM0RgIHRvIGA9YFxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvcXVlcnktc3RyaW5nL3B1bGwvMzdcblx0XHR2YXIga2V5ID0gcGFydHMuc2hpZnQoKTtcblx0XHR2YXIgdmFsID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzLmpvaW4oJz0nKSA6IHVuZGVmaW5lZDtcblxuXHRcdGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrZXkpO1xuXG5cdFx0Ly8gbWlzc2luZyBgPWAgc2hvdWxkIGJlIGBudWxsYDpcblx0XHQvLyBodHRwOi8vdzMub3JnL1RSLzIwMTIvV0QtdXJsLTIwMTIwNTI0LyNjb2xsZWN0LXVybC1wYXJhbWV0ZXJzXG5cdFx0dmFsID0gdmFsID09PSB1bmRlZmluZWQgPyBudWxsIDogZGVjb2RlVVJJQ29tcG9uZW50KHZhbCk7XG5cblx0XHRpZiAoIXJldC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRyZXRba2V5XSA9IHZhbDtcblx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocmV0W2tleV0pKSB7XG5cdFx0XHRyZXRba2V5XS5wdXNoKHZhbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldFtrZXldID0gW3JldFtrZXldLCB2YWxdO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH0sIHt9KTtcbn07XG5cbmV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKG9iaikge1xuXHRyZXR1cm4gb2JqID8gT2JqZWN0LmtleXMob2JqKS5zb3J0KCkubWFwKGZ1bmN0aW9uIChrZXkpIHtcblx0XHR2YXIgdmFsID0gb2JqW2tleV07XG5cblx0XHRpZiAodmFsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAodmFsID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4ga2V5O1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcblx0XHRcdHJldHVybiB2YWwuc29ydCgpLm1hcChmdW5jdGlvbiAodmFsMikge1xuXHRcdFx0XHRyZXR1cm4gc3RyaWN0VXJpRW5jb2RlKGtleSkgKyAnPScgKyBzdHJpY3RVcmlFbmNvZGUodmFsMik7XG5cdFx0XHR9KS5qb2luKCcmJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0cmljdFVyaUVuY29kZShrZXkpICsgJz0nICsgc3RyaWN0VXJpRW5jb2RlKHZhbCk7XG5cdH0pLmZpbHRlcihmdW5jdGlvbiAoeCkge1xuXHRcdHJldHVybiB4Lmxlbmd0aCA+IDA7XG5cdH0pLmpvaW4oJyYnKSA6ICcnO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L34vcXVlcnktc3RyaW5nL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAzNVxuICoqLyIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0cikge1xuXHRyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvWyEnKCkqXS9nLCBmdW5jdGlvbiAoYykge1xuXHRcdHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cdH0pO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L34vcXVlcnktc3RyaW5nL34vc3RyaWN0LXVyaS1lbmNvZGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBydW5UcmFuc2l0aW9uSG9vayhob29rLCBsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgdmFyIHJlc3VsdCA9IGhvb2sobG9jYXRpb24sIGNhbGxiYWNrKTtcblxuICBpZiAoaG9vay5sZW5ndGggPCAyKSB7XG4gICAgLy8gQXNzdW1lIHRoZSBob29rIHJ1bnMgc3luY2hyb25vdXNseSBhbmQgYXV0b21hdGljYWxseVxuICAgIC8vIGNhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIHJldHVybiB2YWx1ZS5cbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICB9IGVsc2Uge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShyZXN1bHQgPT09IHVuZGVmaW5lZCwgJ1lvdSBzaG91bGQgbm90IFwicmV0dXJuXCIgaW4gYSB0cmFuc2l0aW9uIGhvb2sgd2l0aCBhIGNhbGxiYWNrIGFyZ3VtZW50OyBjYWxsIHRoZSBjYWxsYmFjayBpbnN0ZWFkJykgOiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gcnVuVHJhbnNpdGlvbkhvb2s7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvcnVuVHJhbnNpdGlvbkhvb2suanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAzNVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxuZnVuY3Rpb24gZGVwcmVjYXRlKGZuLCBtZXNzYWdlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnW2hpc3RvcnldICcgKyBtZXNzYWdlKSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gZGVwcmVjYXRlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3RvcnkvbGliL2RlcHJlY2F0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwiaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi93YXJuaW5nJ1xyXG5pbXBvcnQgeyBSRVBMQUNFIH0gZnJvbSAnaGlzdG9yeS9saWIvQWN0aW9ucydcclxuaW1wb3J0IGNvbXB1dGVDaGFuZ2VkUm91dGVzIGZyb20gJy4vY29tcHV0ZUNoYW5nZWRSb3V0ZXMnXHJcbmltcG9ydCB7IHJ1bkVudGVySG9va3MsIHJ1bkxlYXZlSG9va3MgfSBmcm9tICcuL1RyYW5zaXRpb25VdGlscydcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBfaXNBY3RpdmUgfSBmcm9tICcuL2lzQWN0aXZlJ1xyXG5pbXBvcnQgZ2V0Q29tcG9uZW50cyBmcm9tICcuL2dldENvbXBvbmVudHMnXHJcbmltcG9ydCBtYXRjaFJvdXRlcyBmcm9tICcuL21hdGNoUm91dGVzJ1xyXG5cclxuZnVuY3Rpb24gaGFzQW55UHJvcGVydGllcyhvYmplY3QpIHtcclxuICBmb3IgKGNvbnN0IHAgaW4gb2JqZWN0KVxyXG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwKSlcclxuICAgICAgcmV0dXJuIHRydWVcclxuXHJcbiAgcmV0dXJuIGZhbHNlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyKGhpc3RvcnksIHJvdXRlcykge1xyXG4gIGxldCBzdGF0ZSA9IHt9XHJcblxyXG4gIC8vIFNpZ25hdHVyZSBzaG91bGQgYmUgKGxvY2F0aW9uLCBpbmRleE9ubHkpLCBidXQgbmVlZHMgdG8gc3VwcG9ydCAocGF0aCxcclxuICAvLyBxdWVyeSwgaW5kZXhPbmx5KVxyXG4gIGZ1bmN0aW9uIGlzQWN0aXZlKFxyXG4gICAgbG9jYXRpb24sIGluZGV4T25seU9yRGVwcmVjYXRlZFF1ZXJ5PWZhbHNlLCBkZXByZWNhdGVkSW5kZXhPbmx5PW51bGxcclxuICApIHtcclxuICAgIGxldCBpbmRleE9ubHlcclxuICAgIGlmIChcclxuICAgICAgKGluZGV4T25seU9yRGVwcmVjYXRlZFF1ZXJ5ICYmIGluZGV4T25seU9yRGVwcmVjYXRlZFF1ZXJ5ICE9PSB0cnVlKSB8fFxyXG4gICAgICBkZXByZWNhdGVkSW5kZXhPbmx5ICE9PSBudWxsXHJcbiAgICApIHtcclxuICAgICAgd2FybmluZyhcclxuICAgICAgICBmYWxzZSxcclxuICAgICAgICAnYGlzQWN0aXZlKHBhdGhuYW1lLCBxdWVyeSwgaW5kZXhPbmx5KSBpcyBkZXByZWNhdGVkOyB1c2UgYGlzQWN0aXZlKGxvY2F0aW9uLCBpbmRleE9ubHkpYCB3aXRoIGEgbG9jYXRpb24gZGVzY3JpcHRvciBpbnN0ZWFkLiBodHRwOi8vdGlueS5jYy9yb3V0ZXItaXNBY3RpdmVkZXByZWNhdGVkJ1xyXG4gICAgICApXHJcbiAgICAgIGxvY2F0aW9uID0geyBwYXRobmFtZTogbG9jYXRpb24sIHF1ZXJ5OiBpbmRleE9ubHlPckRlcHJlY2F0ZWRRdWVyeSB9XHJcbiAgICAgIGluZGV4T25seSA9IGRlcHJlY2F0ZWRJbmRleE9ubHkgfHwgZmFsc2VcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgbG9jYXRpb24gPSB7IHBhdGhuYW1lOiBsb2NhdGlvbiB9XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXhPbmx5ID0gaW5kZXhPbmx5T3JEZXByZWNhdGVkUXVlcnlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX2lzQWN0aXZlKFxyXG4gICAgICBsb2NhdGlvbiwgaW5kZXhPbmx5LCBzdGF0ZS5sb2NhdGlvbiwgc3RhdGUucm91dGVzLCBzdGF0ZS5wYXJhbXNcclxuICAgIClcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uRnJvbVJlZGlyZWN0SW5mbyh7IHBhdGhuYW1lLCBxdWVyeSwgc3RhdGUgfSkge1xyXG4gICAgcmV0dXJuIGhpc3RvcnkuY3JlYXRlTG9jYXRpb24oXHJcbiAgICAgIGhpc3RvcnkuY3JlYXRlUGF0aChwYXRobmFtZSwgcXVlcnkpLCBzdGF0ZSwgUkVQTEFDRVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgbGV0IHBhcnRpYWxOZXh0U3RhdGVcclxuXHJcbiAgZnVuY3Rpb24gbWF0Y2gobG9jYXRpb24sIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAocGFydGlhbE5leHRTdGF0ZSAmJiBwYXJ0aWFsTmV4dFN0YXRlLmxvY2F0aW9uID09PSBsb2NhdGlvbikge1xyXG4gICAgICAvLyBDb250aW51ZSBmcm9tIHdoZXJlIHdlIGxlZnQgb2ZmLlxyXG4gICAgICBmaW5pc2hNYXRjaChwYXJ0aWFsTmV4dFN0YXRlLCBjYWxsYmFjaylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1hdGNoUm91dGVzKHJvdXRlcywgbG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICBjYWxsYmFjayhlcnJvcilcclxuICAgICAgICB9IGVsc2UgaWYgKG5leHRTdGF0ZSkge1xyXG4gICAgICAgICAgZmluaXNoTWF0Y2goeyAuLi5uZXh0U3RhdGUsIGxvY2F0aW9uIH0sIGNhbGxiYWNrKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZmluaXNoTWF0Y2gobmV4dFN0YXRlLCBjYWxsYmFjaykge1xyXG4gICAgY29uc3QgeyBsZWF2ZVJvdXRlcywgZW50ZXJSb3V0ZXMgfSA9IGNvbXB1dGVDaGFuZ2VkUm91dGVzKHN0YXRlLCBuZXh0U3RhdGUpXHJcblxyXG4gICAgcnVuTGVhdmVIb29rcyhsZWF2ZVJvdXRlcylcclxuXHJcbiAgICAvLyBUZWFyIGRvd24gY29uZmlybWF0aW9uIGhvb2tzIGZvciBsZWZ0IHJvdXRlc1xyXG4gICAgbGVhdmVSb3V0ZXMuZm9yRWFjaChyZW1vdmVMaXN0ZW5CZWZvcmVIb29rc0ZvclJvdXRlKVxyXG5cclxuICAgIHJ1bkVudGVySG9va3MoZW50ZXJSb3V0ZXMsIG5leHRTdGF0ZSwgZnVuY3Rpb24gKGVycm9yLCByZWRpcmVjdEluZm8pIHtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgY2FsbGJhY2soZXJyb3IpXHJcbiAgICAgIH0gZWxzZSBpZiAocmVkaXJlY3RJbmZvKSB7XHJcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgY3JlYXRlTG9jYXRpb25Gcm9tUmVkaXJlY3RJbmZvKHJlZGlyZWN0SW5mbykpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVE9ETzogRmV0Y2ggY29tcG9uZW50cyBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxyXG4gICAgICAgIGdldENvbXBvbmVudHMobmV4dFN0YXRlLCBmdW5jdGlvbiAoZXJyb3IsIGNvbXBvbmVudHMpIHtcclxuICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhlcnJvcilcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IE1ha2UgbWF0Y2ggYSBwdXJlIGZ1bmN0aW9uIGFuZCBoYXZlIHNvbWUgb3RoZXIgQVBJXHJcbiAgICAgICAgICAgIC8vIGZvciBcIm1hdGNoIGFuZCB1cGRhdGUgc3RhdGVcIi5cclxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgbnVsbCwgKFxyXG4gICAgICAgICAgICAgIHN0YXRlID0geyAuLi5uZXh0U3RhdGUsIGNvbXBvbmVudHMgfSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBsZXQgUm91dGVHdWlkID0gMVxyXG5cclxuICBmdW5jdGlvbiBnZXRSb3V0ZUlEKHJvdXRlLCBjcmVhdGUgPSB0cnVlKSB7XHJcbiAgICByZXR1cm4gcm91dGUuX19pZF9fIHx8IGNyZWF0ZSAmJiAocm91dGUuX19pZF9fID0gUm91dGVHdWlkKyspXHJcbiAgfVxyXG5cclxuICBjb25zdCBSb3V0ZUhvb2tzID0ge31cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Um91dGVIb29rc0ZvclJvdXRlcyhyb3V0ZXMpIHtcclxuICAgIHJldHVybiByb3V0ZXMucmVkdWNlKGZ1bmN0aW9uIChob29rcywgcm91dGUpIHtcclxuICAgICAgaG9va3MucHVzaC5hcHBseShob29rcywgUm91dGVIb29rc1tnZXRSb3V0ZUlEKHJvdXRlKV0pXHJcbiAgICAgIHJldHVybiBob29rc1xyXG4gICAgfSwgW10pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB0cmFuc2l0aW9uSG9vayhsb2NhdGlvbiwgY2FsbGJhY2spIHtcclxuICAgIG1hdGNoUm91dGVzKHJvdXRlcywgbG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgbmV4dFN0YXRlKSB7XHJcbiAgICAgIGlmIChuZXh0U3RhdGUgPT0gbnVsbCkge1xyXG4gICAgICAgIC8vIFRPRE86IFdlIGRpZG4ndCBhY3R1YWxseSBtYXRjaCBhbnl0aGluZywgYnV0IGhhbmdcclxuICAgICAgICAvLyBvbnRvIGVycm9yL25leHRTdGF0ZSBzbyB3ZSBkb24ndCBoYXZlIHRvIG1hdGNoUm91dGVzXHJcbiAgICAgICAgLy8gYWdhaW4gaW4gdGhlIGxpc3RlbiBjYWxsYmFjay5cclxuICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENhY2hlIHNvbWUgc3RhdGUgaGVyZSBzbyB3ZSBkb24ndCBoYXZlIHRvXHJcbiAgICAgIC8vIG1hdGNoUm91dGVzKCkgYWdhaW4gaW4gdGhlIGxpc3RlbiBjYWxsYmFjay5cclxuICAgICAgcGFydGlhbE5leHRTdGF0ZSA9IHsgLi4ubmV4dFN0YXRlLCBsb2NhdGlvbiB9XHJcblxyXG4gICAgICBjb25zdCBob29rcyA9IGdldFJvdXRlSG9va3NGb3JSb3V0ZXMoXHJcbiAgICAgICAgY29tcHV0ZUNoYW5nZWRSb3V0ZXMoc3RhdGUsIHBhcnRpYWxOZXh0U3RhdGUpLmxlYXZlUm91dGVzXHJcbiAgICAgIClcclxuXHJcbiAgICAgIGxldCByZXN1bHRcclxuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhvb2tzLmxlbmd0aDsgcmVzdWx0ID09IG51bGwgJiYgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgLy8gUGFzc2luZyB0aGUgbG9jYXRpb24gYXJnIGhlcmUgaW5kaWNhdGVzIHRvXHJcbiAgICAgICAgLy8gdGhlIHVzZXIgdGhhdCB0aGlzIGlzIGEgdHJhbnNpdGlvbiBob29rLlxyXG4gICAgICAgIHJlc3VsdCA9IGhvb2tzW2ldKGxvY2F0aW9uKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjYWxsYmFjayhyZXN1bHQpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHVudGVzdGFibGUgd2l0aCBLYXJtYSAqL1xyXG4gIGZ1bmN0aW9uIGJlZm9yZVVubG9hZEhvb2soKSB7XHJcbiAgICAvLyBTeW5jaHJvbm91c2x5IGNoZWNrIHRvIHNlZSBpZiBhbnkgcm91dGUgaG9va3Mgd2FudFxyXG4gICAgLy8gdG8gcHJldmVudCB0aGUgY3VycmVudCB3aW5kb3cvdGFiIGZyb20gY2xvc2luZy5cclxuICAgIGlmIChzdGF0ZS5yb3V0ZXMpIHtcclxuICAgICAgY29uc3QgaG9va3MgPSBnZXRSb3V0ZUhvb2tzRm9yUm91dGVzKHN0YXRlLnJvdXRlcylcclxuXHJcbiAgICAgIGxldCBtZXNzYWdlXHJcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBob29rcy5sZW5ndGg7IHR5cGVvZiBtZXNzYWdlICE9PSAnc3RyaW5nJyAmJiBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAvLyBQYXNzaW5nIG5vIGFyZ3MgaW5kaWNhdGVzIHRvIHRoZSB1c2VyIHRoYXQgdGhpcyBpcyBhXHJcbiAgICAgICAgLy8gYmVmb3JldW5sb2FkIGhvb2suIFdlIGRvbid0IGtub3cgdGhlIG5leHQgbG9jYXRpb24uXHJcbiAgICAgICAgbWVzc2FnZSA9IGhvb2tzW2ldKClcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG1lc3NhZ2VcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxldCB1bmxpc3RlbkJlZm9yZSwgdW5saXN0ZW5CZWZvcmVVbmxvYWRcclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuQmVmb3JlSG9va3NGb3JSb3V0ZShyb3V0ZSkge1xyXG4gICAgY29uc3Qgcm91dGVJRCA9IGdldFJvdXRlSUQocm91dGUsIGZhbHNlKVxyXG4gICAgaWYgKCFyb3V0ZUlEKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZSBSb3V0ZUhvb2tzW3JvdXRlSURdXHJcblxyXG4gICAgaWYgKCFoYXNBbnlQcm9wZXJ0aWVzKFJvdXRlSG9va3MpKSB7XHJcbiAgICAgIC8vIHRlYXJkb3duIHRyYW5zaXRpb24gJiBiZWZvcmV1bmxvYWQgaG9va3NcclxuICAgICAgaWYgKHVubGlzdGVuQmVmb3JlKSB7XHJcbiAgICAgICAgdW5saXN0ZW5CZWZvcmUoKVxyXG4gICAgICAgIHVubGlzdGVuQmVmb3JlID0gbnVsbFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodW5saXN0ZW5CZWZvcmVVbmxvYWQpIHtcclxuICAgICAgICB1bmxpc3RlbkJlZm9yZVVubG9hZCgpXHJcbiAgICAgICAgdW5saXN0ZW5CZWZvcmVVbmxvYWQgPSBudWxsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVycyB0aGUgZ2l2ZW4gaG9vayBmdW5jdGlvbiB0byBydW4gYmVmb3JlIGxlYXZpbmcgdGhlIGdpdmVuIHJvdXRlLlxyXG4gICAqXHJcbiAgICogRHVyaW5nIGEgbm9ybWFsIHRyYW5zaXRpb24sIHRoZSBob29rIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBuZXh0IGxvY2F0aW9uXHJcbiAgICogYXMgaXRzIG9ubHkgYXJndW1lbnQgYW5kIG11c3QgcmV0dXJuIGVpdGhlciBhKSBhIHByb21wdCBtZXNzYWdlIHRvIHNob3dcclxuICAgKiB0aGUgdXNlciwgdG8gbWFrZSBzdXJlIHRoZXkgd2FudCB0byBsZWF2ZSB0aGUgcGFnZSBvciBiKSBmYWxzZSwgdG8gcHJldmVudFxyXG4gICAqIHRoZSB0cmFuc2l0aW9uLlxyXG4gICAqXHJcbiAgICogRHVyaW5nIHRoZSBiZWZvcmV1bmxvYWQgZXZlbnQgKGluIGJyb3dzZXJzKSB0aGUgaG9vayByZWNlaXZlcyBubyBhcmd1bWVudHMuXHJcbiAgICogSW4gdGhpcyBjYXNlIGl0IG11c3QgcmV0dXJuIGEgcHJvbXB0IG1lc3NhZ2UgdG8gcHJldmVudCB0aGUgdHJhbnNpdGlvbi5cclxuICAgKlxyXG4gICAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IG1heSBiZSB1c2VkIHRvIHVuYmluZCB0aGUgbGlzdGVuZXIuXHJcbiAgICovXHJcbiAgZnVuY3Rpb24gbGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlKHJvdXRlLCBob29rKSB7XHJcbiAgICAvLyBUT0RPOiBXYXJuIGlmIHRoZXkgcmVnaXN0ZXIgZm9yIGEgcm91dGUgdGhhdCBpc24ndCBjdXJyZW50bHlcclxuICAgIC8vIGFjdGl2ZS4gVGhleSdyZSBwcm9iYWJseSBkb2luZyBzb21ldGhpbmcgd3JvbmcsIGxpa2UgcmUtY3JlYXRpbmdcclxuICAgIC8vIHJvdXRlIG9iamVjdHMgb24gZXZlcnkgbG9jYXRpb24gY2hhbmdlLlxyXG4gICAgY29uc3Qgcm91dGVJRCA9IGdldFJvdXRlSUQocm91dGUpXHJcbiAgICBsZXQgaG9va3MgPSBSb3V0ZUhvb2tzW3JvdXRlSURdXHJcblxyXG4gICAgaWYgKCFob29rcykge1xyXG4gICAgICBsZXQgdGhlcmVXZXJlTm9Sb3V0ZUhvb2tzID0gIWhhc0FueVByb3BlcnRpZXMoUm91dGVIb29rcylcclxuXHJcbiAgICAgIFJvdXRlSG9va3Nbcm91dGVJRF0gPSBbIGhvb2sgXVxyXG5cclxuICAgICAgaWYgKHRoZXJlV2VyZU5vUm91dGVIb29rcykge1xyXG4gICAgICAgIC8vIHNldHVwIHRyYW5zaXRpb24gJiBiZWZvcmV1bmxvYWQgaG9va3NcclxuICAgICAgICB1bmxpc3RlbkJlZm9yZSA9IGhpc3RvcnkubGlzdGVuQmVmb3JlKHRyYW5zaXRpb25Ib29rKVxyXG5cclxuICAgICAgICBpZiAoaGlzdG9yeS5saXN0ZW5CZWZvcmVVbmxvYWQpXHJcbiAgICAgICAgICB1bmxpc3RlbkJlZm9yZVVubG9hZCA9IGhpc3RvcnkubGlzdGVuQmVmb3JlVW5sb2FkKGJlZm9yZVVubG9hZEhvb2spXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdhcm5pbmcoXHJcbiAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgJ2FkZGluZyBtdWx0aXBsZSBsZWF2ZSBob29rcyBmb3IgdGhlIHNhbWUgcm91dGUgaXMgZGVwcmVjYXRlZDsgbWFuYWdlIG11bHRpcGxlIGNvbmZpcm1hdGlvbnMgaW4geW91ciBvd24gY29kZSBpbnN0ZWFkJ1xyXG4gICAgICApXHJcblxyXG4gICAgICBpZiAoaG9va3MuaW5kZXhPZihob29rKSA9PT0gLTEpIHtcclxuICAgICAgICBob29rcy5wdXNoKGhvb2spXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCBob29rcyA9IFJvdXRlSG9va3Nbcm91dGVJRF1cclxuXHJcbiAgICAgIGlmIChob29rcykge1xyXG4gICAgICAgIGNvbnN0IG5ld0hvb2tzID0gaG9va3MuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gaG9vaylcclxuXHJcbiAgICAgICAgaWYgKG5ld0hvb2tzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgcmVtb3ZlTGlzdGVuQmVmb3JlSG9va3NGb3JSb3V0ZShyb3V0ZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgUm91dGVIb29rc1tyb3V0ZUlEXSA9IG5ld0hvb2tzXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGlzIHRoZSBBUEkgZm9yIHN0YXRlZnVsIGVudmlyb25tZW50cy4gQXMgdGhlIGxvY2F0aW9uXHJcbiAgICogY2hhbmdlcywgd2UgdXBkYXRlIHN0YXRlIGFuZCBjYWxsIHRoZSBsaXN0ZW5lci4gV2UgY2FuIGFsc29cclxuICAgKiBncmFjZWZ1bGx5IGhhbmRsZSBlcnJvcnMgYW5kIHJlZGlyZWN0cy5cclxuICAgKi9cclxuICBmdW5jdGlvbiBsaXN0ZW4obGlzdGVuZXIpIHtcclxuICAgIC8vIFRPRE86IE9ubHkgdXNlIGEgc2luZ2xlIGhpc3RvcnkgbGlzdGVuZXIuIE90aGVyd2lzZSB3ZSdsbFxyXG4gICAgLy8gZW5kIHVwIHdpdGggbXVsdGlwbGUgY29uY3VycmVudCBjYWxscyB0byBtYXRjaC5cclxuICAgIHJldHVybiBoaXN0b3J5Lmxpc3RlbihmdW5jdGlvbiAobG9jYXRpb24pIHtcclxuICAgICAgaWYgKHN0YXRlLmxvY2F0aW9uID09PSBsb2NhdGlvbikge1xyXG4gICAgICAgIGxpc3RlbmVyKG51bGwsIHN0YXRlKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1hdGNoKGxvY2F0aW9uLCBmdW5jdGlvbiAoZXJyb3IsIHJlZGlyZWN0TG9jYXRpb24sIG5leHRTdGF0ZSkge1xyXG4gICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyKGVycm9yKVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChyZWRpcmVjdExvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGhpc3RvcnkudHJhbnNpdGlvblRvKHJlZGlyZWN0TG9jYXRpb24pXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKG5leHRTdGF0ZSkge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcihudWxsLCBuZXh0U3RhdGUpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3YXJuaW5nKFxyXG4gICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAgICdMb2NhdGlvbiBcIiVzXCIgZGlkIG5vdCBtYXRjaCBhbnkgcm91dGVzJyxcclxuICAgICAgICAgICAgICBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCArIGxvY2F0aW9uLmhhc2hcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaXNBY3RpdmUsXHJcbiAgICBtYXRjaCxcclxuICAgIGxpc3RlbkJlZm9yZUxlYXZpbmdSb3V0ZSxcclxuICAgIGxpc3RlblxyXG4gIH1cclxufVxyXG5cclxuLy9leHBvcnQgZGVmYXVsdCB1c2VSb3V0ZXNcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyLmpzXG4gKiovIiwiaW1wb3J0IHsgbWF0Y2hQYXR0ZXJuIH0gZnJvbSAnLi9QYXR0ZXJuVXRpbHMnXHJcblxyXG5mdW5jdGlvbiBkZWVwRXF1YWwoYSwgYikge1xyXG4gIGlmIChhID09IGIpXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG5cclxuICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbClcclxuICAgIHJldHVybiBmYWxzZVxyXG5cclxuICBpZiAoQXJyYXkuaXNBcnJheShhKSkge1xyXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYikgJiYgYS5sZW5ndGggPT09IGIubGVuZ3RoICYmIGEuZXZlcnkoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgIHJldHVybiBkZWVwRXF1YWwoaXRlbSwgYltpbmRleF0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0Jykge1xyXG4gICAgZm9yIChsZXQgcCBpbiBhKSB7XHJcbiAgICAgIGlmICghYS5oYXNPd25Qcm9wZXJ0eShwKSkge1xyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhW3BdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAoYltwXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoIWIuaGFzT3duUHJvcGVydHkocCkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfSBlbHNlIGlmICghZGVlcEVxdWFsKGFbcF0sIGJbcF0pKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFN0cmluZyhhKSA9PT0gU3RyaW5nKGIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcmFtc0FyZUFjdGl2ZShwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcywgYWN0aXZlUGFyYW1zKSB7XHJcbiAgLy8gRklYTUU6IFRoaXMgZG9lc24ndCB3b3JrIG9uIHJlcGVhdGVkIHBhcmFtcyBpbiBhY3RpdmVQYXJhbXMuXHJcbiAgcmV0dXJuIHBhcmFtTmFtZXMuZXZlcnkoZnVuY3Rpb24gKHBhcmFtTmFtZSwgaW5kZXgpIHtcclxuICAgIHJldHVybiBTdHJpbmcocGFyYW1WYWx1ZXNbaW5kZXhdKSA9PT0gU3RyaW5nKGFjdGl2ZVBhcmFtc1twYXJhbU5hbWVdKVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE1hdGNoaW5nUm91dGVJbmRleChwYXRobmFtZSwgYWN0aXZlUm91dGVzLCBhY3RpdmVQYXJhbXMpIHtcclxuICBsZXQgcmVtYWluaW5nUGF0aG5hbWUgPSBwYXRobmFtZSwgcGFyYW1OYW1lcyA9IFtdLCBwYXJhbVZhbHVlcyA9IFtdXHJcblxyXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhY3RpdmVSb3V0ZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgIGNvbnN0IHJvdXRlID0gYWN0aXZlUm91dGVzW2ldXHJcbiAgICBjb25zdCBwYXR0ZXJuID0gcm91dGUucGF0aCB8fCAnJ1xyXG5cclxuICAgIGlmIChwYXR0ZXJuLmNoYXJBdCgwKSA9PT0gJy8nKSB7XHJcbiAgICAgIHJlbWFpbmluZ1BhdGhuYW1lID0gcGF0aG5hbWVcclxuICAgICAgcGFyYW1OYW1lcyA9IFtdXHJcbiAgICAgIHBhcmFtVmFsdWVzID0gW11cclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVtYWluaW5nUGF0aG5hbWUgIT09IG51bGwpIHtcclxuICAgICAgY29uc3QgbWF0Y2hlZCA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCByZW1haW5pbmdQYXRobmFtZSlcclxuICAgICAgcmVtYWluaW5nUGF0aG5hbWUgPSBtYXRjaGVkLnJlbWFpbmluZ1BhdGhuYW1lXHJcbiAgICAgIHBhcmFtTmFtZXMgPSBbIC4uLnBhcmFtTmFtZXMsIC4uLm1hdGNoZWQucGFyYW1OYW1lcyBdXHJcbiAgICAgIHBhcmFtVmFsdWVzID0gWyAuLi5wYXJhbVZhbHVlcywgLi4ubWF0Y2hlZC5wYXJhbVZhbHVlcyBdXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICByZW1haW5pbmdQYXRobmFtZSA9PT0gJycgJiZcclxuICAgICAgcm91dGUucGF0aCAmJlxyXG4gICAgICBwYXJhbXNBcmVBY3RpdmUocGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMsIGFjdGl2ZVBhcmFtcylcclxuICAgIClcclxuICAgICAgcmV0dXJuIGlcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHBhdGhuYW1lIG1hdGNoZXMgdGhlIGFjdGl2ZSByb3V0ZXNcclxuICogYW5kIHBhcmFtcy5cclxuICovXHJcbmZ1bmN0aW9uIHJvdXRlSXNBY3RpdmUocGF0aG5hbWUsIHJvdXRlcywgcGFyYW1zLCBpbmRleE9ubHkpIHtcclxuICBjb25zdCBpID0gZ2V0TWF0Y2hpbmdSb3V0ZUluZGV4KHBhdGhuYW1lLCByb3V0ZXMsIHBhcmFtcylcclxuXHJcbiAgaWYgKGkgPT09IG51bGwpIHtcclxuICAgIC8vIE5vIG1hdGNoLlxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfSBlbHNlIGlmICghaW5kZXhPbmx5KSB7XHJcbiAgICAvLyBBbnkgbWF0Y2ggaXMgZ29vZCBlbm91Z2guXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgLy8gSWYgYW55IHJlbWFpbmluZyByb3V0ZXMgcGFzdCB0aGUgbWF0Y2ggaW5kZXggaGF2ZSBwYXRocywgdGhlbiB3ZSBjYW4ndFxyXG4gIC8vIGJlIG9uIHRoZSBpbmRleCByb3V0ZS5cclxuICByZXR1cm4gcm91dGVzLnNsaWNlKGkgKyAxKS5ldmVyeShyb3V0ZSA9PiAhcm91dGUucGF0aClcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbGwga2V5L3ZhbHVlIHBhaXJzIGluIHRoZSBnaXZlbiBxdWVyeSBhcmVcclxuICogY3VycmVudGx5IGFjdGl2ZS5cclxuICovXHJcbmZ1bmN0aW9uIHF1ZXJ5SXNBY3RpdmUocXVlcnksIGFjdGl2ZVF1ZXJ5KSB7XHJcbiAgaWYgKGFjdGl2ZVF1ZXJ5ID09IG51bGwpXHJcbiAgICByZXR1cm4gcXVlcnkgPT0gbnVsbFxyXG5cclxuICBpZiAocXVlcnkgPT0gbnVsbClcclxuICAgIHJldHVybiB0cnVlXHJcblxyXG4gIHJldHVybiBkZWVwRXF1YWwocXVlcnksIGFjdGl2ZVF1ZXJ5KVxyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIGEgPExpbms+IHRvIHRoZSBnaXZlbiBwYXRobmFtZS9xdWVyeSBjb21iaW5hdGlvbiBpc1xyXG4gKiBjdXJyZW50bHkgYWN0aXZlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBY3RpdmUoXHJcbiAgeyBwYXRobmFtZSwgcXVlcnkgfSwgaW5kZXhPbmx5LCBjdXJyZW50TG9jYXRpb24sIHJvdXRlcywgcGFyYW1zXHJcbikge1xyXG4gIGlmIChjdXJyZW50TG9jYXRpb24gPT0gbnVsbClcclxuICAgIHJldHVybiBmYWxzZVxyXG5cclxuICBpZiAoIXJvdXRlSXNBY3RpdmUocGF0aG5hbWUsIHJvdXRlcywgcGFyYW1zLCBpbmRleE9ubHkpKVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcblxyXG4gIHJldHVybiBxdWVyeUlzQWN0aXZlKHF1ZXJ5LCBjdXJyZW50TG9jYXRpb24ucXVlcnkpXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL2lzQWN0aXZlLmpzXG4gKiovIiwiaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnXHJcblxyXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVzY2FwZVNvdXJjZShzdHJpbmcpIHtcclxuICByZXR1cm4gZXNjYXBlUmVnRXhwKHN0cmluZykucmVwbGFjZSgvXFwvKy9nLCAnLysnKVxyXG59XHJcblxyXG5mdW5jdGlvbiBfY29tcGlsZVBhdHRlcm4ocGF0dGVybikge1xyXG4gIGxldCByZWdleHBTb3VyY2UgPSAnJ1xyXG4gIGNvbnN0IHBhcmFtTmFtZXMgPSBbXVxyXG4gIGNvbnN0IHRva2VucyA9IFtdXHJcblxyXG4gIGxldCBtYXRjaCwgbGFzdEluZGV4ID0gMCwgbWF0Y2hlciA9IC86KFthLXpBLVpfJF1bYS16QS1aMC05XyRdKil8XFwqXFwqfFxcKnxcXCh8XFwpL2dcclxuICB3aGlsZSAoKG1hdGNoID0gbWF0Y2hlci5leGVjKHBhdHRlcm4pKSkge1xyXG4gICAgaWYgKG1hdGNoLmluZGV4ICE9PSBsYXN0SW5kZXgpIHtcclxuICAgICAgdG9rZW5zLnB1c2gocGF0dGVybi5zbGljZShsYXN0SW5kZXgsIG1hdGNoLmluZGV4KSlcclxuICAgICAgcmVnZXhwU291cmNlICs9IGVzY2FwZVNvdXJjZShwYXR0ZXJuLnNsaWNlKGxhc3RJbmRleCwgbWF0Y2guaW5kZXgpKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChtYXRjaFsxXSkge1xyXG4gICAgICByZWdleHBTb3VyY2UgKz0gJyhbXi8/I10rKSdcclxuICAgICAgcGFyYW1OYW1lcy5wdXNoKG1hdGNoWzFdKVxyXG4gICAgfSBlbHNlIGlmIChtYXRjaFswXSA9PT0gJyoqJykge1xyXG4gICAgICByZWdleHBTb3VyY2UgKz0gJyhbXFxcXHNcXFxcU10qKSdcclxuICAgICAgcGFyYW1OYW1lcy5wdXNoKCdzcGxhdCcpXHJcbiAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSAnKicpIHtcclxuICAgICAgcmVnZXhwU291cmNlICs9ICcoW1xcXFxzXFxcXFNdKj8pJ1xyXG4gICAgICBwYXJhbU5hbWVzLnB1c2goJ3NwbGF0JylcclxuICAgIH0gZWxzZSBpZiAobWF0Y2hbMF0gPT09ICcoJykge1xyXG4gICAgICByZWdleHBTb3VyY2UgKz0gJyg/OidcclxuICAgIH0gZWxzZSBpZiAobWF0Y2hbMF0gPT09ICcpJykge1xyXG4gICAgICByZWdleHBTb3VyY2UgKz0gJyk/J1xyXG4gICAgfVxyXG5cclxuICAgIHRva2Vucy5wdXNoKG1hdGNoWzBdKVxyXG5cclxuICAgIGxhc3RJbmRleCA9IG1hdGNoZXIubGFzdEluZGV4XHJcbiAgfVxyXG5cclxuICBpZiAobGFzdEluZGV4ICE9PSBwYXR0ZXJuLmxlbmd0aCkge1xyXG4gICAgdG9rZW5zLnB1c2gocGF0dGVybi5zbGljZShsYXN0SW5kZXgsIHBhdHRlcm4ubGVuZ3RoKSlcclxuICAgIHJlZ2V4cFNvdXJjZSArPSBlc2NhcGVTb3VyY2UocGF0dGVybi5zbGljZShsYXN0SW5kZXgsIHBhdHRlcm4ubGVuZ3RoKSlcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwYXR0ZXJuLFxyXG4gICAgcmVnZXhwU291cmNlLFxyXG4gICAgcGFyYW1OYW1lcyxcclxuICAgIHRva2Vuc1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgQ29tcGlsZWRQYXR0ZXJuc0NhY2hlID0ge31cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21waWxlUGF0dGVybihwYXR0ZXJuKSB7XHJcbiAgaWYgKCEocGF0dGVybiBpbiBDb21waWxlZFBhdHRlcm5zQ2FjaGUpKVxyXG4gICAgQ29tcGlsZWRQYXR0ZXJuc0NhY2hlW3BhdHRlcm5dID0gX2NvbXBpbGVQYXR0ZXJuKHBhdHRlcm4pXHJcblxyXG4gIHJldHVybiBDb21waWxlZFBhdHRlcm5zQ2FjaGVbcGF0dGVybl1cclxufVxyXG5cclxuLyoqXHJcbiAqIEF0dGVtcHRzIHRvIG1hdGNoIGEgcGF0dGVybiBvbiB0aGUgZ2l2ZW4gcGF0aG5hbWUuIFBhdHRlcm5zIG1heSB1c2VcclxuICogdGhlIGZvbGxvd2luZyBzcGVjaWFsIGNoYXJhY3RlcnM6XHJcbiAqXHJcbiAqIC0gOnBhcmFtTmFtZSAgICAgTWF0Y2hlcyBhIFVSTCBzZWdtZW50IHVwIHRvIHRoZSBuZXh0IC8sID8sIG9yICMuIFRoZVxyXG4gKiAgICAgICAgICAgICAgICAgIGNhcHR1cmVkIHN0cmluZyBpcyBjb25zaWRlcmVkIGEgXCJwYXJhbVwiXHJcbiAqIC0gKCkgICAgICAgICAgICAgV3JhcHMgYSBzZWdtZW50IG9mIHRoZSBVUkwgdGhhdCBpcyBvcHRpb25hbFxyXG4gKiAtICogICAgICAgICAgICAgIENvbnN1bWVzIChub24tZ3JlZWR5KSBhbGwgY2hhcmFjdGVycyB1cCB0byB0aGUgbmV4dFxyXG4gKiAgICAgICAgICAgICAgICAgIGNoYXJhY3RlciBpbiB0aGUgcGF0dGVybiwgb3IgdG8gdGhlIGVuZCBvZiB0aGUgVVJMIGlmXHJcbiAqICAgICAgICAgICAgICAgICAgdGhlcmUgaXMgbm9uZVxyXG4gKiAtICoqICAgICAgICAgICAgIENvbnN1bWVzIChncmVlZHkpIGFsbCBjaGFyYWN0ZXJzIHVwIHRvIHRoZSBuZXh0IGNoYXJhY3RlclxyXG4gKiAgICAgICAgICAgICAgICAgIGluIHRoZSBwYXR0ZXJuLCBvciB0byB0aGUgZW5kIG9mIHRoZSBVUkwgaWYgdGhlcmUgaXMgbm9uZVxyXG4gKlxyXG4gKiBUaGUgcmV0dXJuIHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogLSByZW1haW5pbmdQYXRobmFtZVxyXG4gKiAtIHBhcmFtTmFtZXNcclxuICogLSBwYXJhbVZhbHVlc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwYXRobmFtZSkge1xyXG4gIC8vIE1ha2UgbGVhZGluZyBzbGFzaGVzIGNvbnNpc3RlbnQgYmV0d2VlbiBwYXR0ZXJuIGFuZCBwYXRobmFtZS5cclxuICBpZiAocGF0dGVybi5jaGFyQXQoMCkgIT09ICcvJykge1xyXG4gICAgcGF0dGVybiA9IGAvJHtwYXR0ZXJufWBcclxuICB9XHJcbiAgaWYgKHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSB7XHJcbiAgICBwYXRobmFtZSA9IGAvJHtwYXRobmFtZX1gXHJcbiAgfVxyXG5cclxuICBsZXQgeyByZWdleHBTb3VyY2UsIHBhcmFtTmFtZXMsIHRva2VucyB9ID0gY29tcGlsZVBhdHRlcm4ocGF0dGVybilcclxuXHJcbiAgcmVnZXhwU291cmNlICs9ICcvKicgLy8gQ2FwdHVyZSBwYXRoIHNlcGFyYXRvcnNcclxuXHJcbiAgLy8gU3BlY2lhbC1jYXNlIHBhdHRlcm5zIGxpa2UgJyonIGZvciBjYXRjaC1hbGwgcm91dGVzLlxyXG4gIGNvbnN0IGNhcHR1cmVSZW1haW5pbmcgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdICE9PSAnKidcclxuXHJcbiAgaWYgKGNhcHR1cmVSZW1haW5pbmcpIHtcclxuICAgIC8vIFRoaXMgd2lsbCBtYXRjaCBuZXdsaW5lcyBpbiB0aGUgcmVtYWluaW5nIHBhdGguXHJcbiAgICByZWdleHBTb3VyY2UgKz0gJyhbXFxcXHNcXFxcU10qPyknXHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXRjaCA9IHBhdGhuYW1lLm1hdGNoKG5ldyBSZWdFeHAoJ14nICsgcmVnZXhwU291cmNlICsgJyQnLCAnaScpKVxyXG5cclxuICBsZXQgcmVtYWluaW5nUGF0aG5hbWUsIHBhcmFtVmFsdWVzXHJcbiAgaWYgKG1hdGNoICE9IG51bGwpIHtcclxuICAgIGlmIChjYXB0dXJlUmVtYWluaW5nKSB7XHJcbiAgICAgIHJlbWFpbmluZ1BhdGhuYW1lID0gbWF0Y2gucG9wKClcclxuICAgICAgY29uc3QgbWF0Y2hlZFBhdGggPVxyXG4gICAgICAgIG1hdGNoWzBdLnN1YnN0cigwLCBtYXRjaFswXS5sZW5ndGggLSByZW1haW5pbmdQYXRobmFtZS5sZW5ndGgpXHJcblxyXG4gICAgICAvLyBJZiB3ZSBkaWRuJ3QgbWF0Y2ggdGhlIGVudGlyZSBwYXRobmFtZSwgdGhlbiBtYWtlIHN1cmUgdGhhdCB0aGUgbWF0Y2hcclxuICAgICAgLy8gd2UgZGlkIGdldCBlbmRzIGF0IGEgcGF0aCBzZXBhcmF0b3IgKHBvdGVudGlhbGx5IHRoZSBvbmUgd2UgYWRkZWRcclxuICAgICAgLy8gYWJvdmUgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcGF0aCwgaWYgdGhlIGFjdHVhbCBtYXRjaCB3YXMgZW1wdHkpLlxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgcmVtYWluaW5nUGF0aG5hbWUgJiZcclxuICAgICAgICBtYXRjaGVkUGF0aC5jaGFyQXQobWF0Y2hlZFBhdGgubGVuZ3RoIC0gMSkgIT09ICcvJ1xyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgcmVtYWluaW5nUGF0aG5hbWU6IG51bGwsXHJcbiAgICAgICAgICBwYXJhbU5hbWVzLFxyXG4gICAgICAgICAgcGFyYW1WYWx1ZXM6IG51bGxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIElmIHRoaXMgbWF0Y2hlZCBhdCBhbGwsIHRoZW4gdGhlIG1hdGNoIHdhcyB0aGUgZW50aXJlIHBhdGhuYW1lLlxyXG4gICAgICByZW1haW5pbmdQYXRobmFtZSA9ICcnXHJcbiAgICB9XHJcblxyXG4gICAgcGFyYW1WYWx1ZXMgPSBtYXRjaC5zbGljZSgxKS5tYXAoXHJcbiAgICAgIHYgPT4gdiAhPSBudWxsID8gZGVjb2RlVVJJQ29tcG9uZW50KHYpIDogdlxyXG4gICAgKVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1haW5pbmdQYXRobmFtZSA9IHBhcmFtVmFsdWVzID0gbnVsbFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJlbWFpbmluZ1BhdGhuYW1lLFxyXG4gICAgcGFyYW1OYW1lcyxcclxuICAgIHBhcmFtVmFsdWVzXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyYW1OYW1lcyhwYXR0ZXJuKSB7XHJcbiAgcmV0dXJuIGNvbXBpbGVQYXR0ZXJuKHBhdHRlcm4pLnBhcmFtTmFtZXNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcmFtcyhwYXR0ZXJuLCBwYXRobmFtZSkge1xyXG4gIGNvbnN0IHsgcGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMgfSA9IG1hdGNoUGF0dGVybihwYXR0ZXJuLCBwYXRobmFtZSlcclxuXHJcbiAgaWYgKHBhcmFtVmFsdWVzICE9IG51bGwpIHtcclxuICAgIHJldHVybiBwYXJhbU5hbWVzLnJlZHVjZShmdW5jdGlvbiAobWVtbywgcGFyYW1OYW1lLCBpbmRleCkge1xyXG4gICAgICBtZW1vW3BhcmFtTmFtZV0gPSBwYXJhbVZhbHVlc1tpbmRleF1cclxuICAgICAgcmV0dXJuIG1lbW9cclxuICAgIH0sIHt9KVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG51bGxcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBwYXR0ZXJuIHdpdGggcGFyYW1zIGludGVycG9sYXRlZC4gVGhyb3dzXHJcbiAqIGlmIHRoZXJlIGlzIGEgZHluYW1pYyBzZWdtZW50IG9mIHRoZSBwYXR0ZXJuIGZvciB3aGljaCB0aGVyZSBpcyBubyBwYXJhbS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRQYXR0ZXJuKHBhdHRlcm4sIHBhcmFtcykge1xyXG4gIHBhcmFtcyA9IHBhcmFtcyB8fCB7fVxyXG5cclxuICBjb25zdCB7IHRva2VucyB9ID0gY29tcGlsZVBhdHRlcm4ocGF0dGVybilcclxuICBsZXQgcGFyZW5Db3VudCA9IDAsIHBhdGhuYW1lID0gJycsIHNwbGF0SW5kZXggPSAwXHJcblxyXG4gIGxldCB0b2tlbiwgcGFyYW1OYW1lLCBwYXJhbVZhbHVlXHJcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRva2Vucy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgdG9rZW4gPSB0b2tlbnNbaV1cclxuXHJcbiAgICBpZiAodG9rZW4gPT09ICcqJyB8fCB0b2tlbiA9PT0gJyoqJykge1xyXG4gICAgICBwYXJhbVZhbHVlID0gQXJyYXkuaXNBcnJheShwYXJhbXMuc3BsYXQpID8gcGFyYW1zLnNwbGF0W3NwbGF0SW5kZXgrK10gOiBwYXJhbXMuc3BsYXRcclxuXHJcbiAgICAgIGludmFyaWFudChcclxuICAgICAgICBwYXJhbVZhbHVlICE9IG51bGwgfHwgcGFyZW5Db3VudCA+IDAsXHJcbiAgICAgICAgJ01pc3Npbmcgc3BsYXQgIyVzIGZvciBwYXRoIFwiJXNcIicsXHJcbiAgICAgICAgc3BsYXRJbmRleCwgcGF0dGVyblxyXG4gICAgICApXHJcblxyXG4gICAgICBpZiAocGFyYW1WYWx1ZSAhPSBudWxsKVxyXG4gICAgICAgIHBhdGhuYW1lICs9IGVuY29kZVVSSShwYXJhbVZhbHVlKVxyXG4gICAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJygnKSB7XHJcbiAgICAgIHBhcmVuQ291bnQgKz0gMVxyXG4gICAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJyknKSB7XHJcbiAgICAgIHBhcmVuQ291bnQgLT0gMVxyXG4gICAgfSBlbHNlIGlmICh0b2tlbi5jaGFyQXQoMCkgPT09ICc6Jykge1xyXG4gICAgICBwYXJhbU5hbWUgPSB0b2tlbi5zdWJzdHJpbmcoMSlcclxuICAgICAgcGFyYW1WYWx1ZSA9IHBhcmFtc1twYXJhbU5hbWVdXHJcblxyXG4gICAgICBpbnZhcmlhbnQoXHJcbiAgICAgICAgcGFyYW1WYWx1ZSAhPSBudWxsIHx8IHBhcmVuQ291bnQgPiAwLFxyXG4gICAgICAgICdNaXNzaW5nIFwiJXNcIiBwYXJhbWV0ZXIgZm9yIHBhdGggXCIlc1wiJyxcclxuICAgICAgICBwYXJhbU5hbWUsIHBhdHRlcm5cclxuICAgICAgKVxyXG5cclxuICAgICAgaWYgKHBhcmFtVmFsdWUgIT0gbnVsbClcclxuICAgICAgICBwYXRobmFtZSArPSBlbmNvZGVVUklDb21wb25lbnQocGFyYW1WYWx1ZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhdGhuYW1lICs9IHRva2VuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGF0aG5hbWUucmVwbGFjZSgvXFwvKy9nLCAnLycpXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL1BhdHRlcm5VdGlscy5qc1xuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaW52YXJpYW50L2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAzNVxuICoqLyIsImltcG9ydCB3YXJuaW5nIGZyb20gJ3dhcm5pbmcnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3V0ZXJXYXJuaW5nKGZhbHNlVG9XYXJuLCBtZXNzYWdlLCAuLi5hcmdzKSB7XHJcbiAgbWVzc2FnZSA9IGBbcmVhY3Qtcm91dGVyXSAke21lc3NhZ2V9YFxyXG4gIHdhcm5pbmcoZmFsc2VUb1dhcm4sIG1lc3NhZ2UsIC4uLmFyZ3MpXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL3dhcm5pbmcuanNcbiAqKi8iLCIvKipcbiAqIEluZGljYXRlcyB0aGF0IG5hdmlnYXRpb24gd2FzIGNhdXNlZCBieSBhIGNhbGwgdG8gaGlzdG9yeS5wdXNoLlxuICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgUFVTSCA9ICdQVVNIJztcblxuZXhwb3J0cy5QVVNIID0gUFVTSDtcbi8qKlxuICogSW5kaWNhdGVzIHRoYXQgbmF2aWdhdGlvbiB3YXMgY2F1c2VkIGJ5IGEgY2FsbCB0byBoaXN0b3J5LnJlcGxhY2UuXG4gKi9cbnZhciBSRVBMQUNFID0gJ1JFUExBQ0UnO1xuXG5leHBvcnRzLlJFUExBQ0UgPSBSRVBMQUNFO1xuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCBuYXZpZ2F0aW9uIHdhcyBjYXVzZWQgYnkgc29tZSBvdGhlciBhY3Rpb24gc3VjaFxuICogYXMgdXNpbmcgYSBicm93c2VyJ3MgYmFjay9mb3J3YXJkIGJ1dHRvbnMgYW5kL29yIG1hbnVhbGx5IG1hbmlwdWxhdGluZ1xuICogdGhlIFVSTCBpbiBhIGJyb3dzZXIncyBsb2NhdGlvbiBiYXIuIFRoaXMgaXMgdGhlIGRlZmF1bHQuXG4gKlxuICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XaW5kb3dFdmVudEhhbmRsZXJzL29ucG9wc3RhdGVcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICovXG52YXIgUE9QID0gJ1BPUCc7XG5cbmV4cG9ydHMuUE9QID0gUE9QO1xuZXhwb3J0c1snZGVmYXVsdCddID0ge1xuICBQVVNIOiBQVVNILFxuICBSRVBMQUNFOiBSRVBMQUNFLFxuICBQT1A6IFBPUFxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvQWN0aW9ucy5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwiaW1wb3J0IHsgZ2V0UGFyYW1OYW1lcyB9IGZyb20gJy4vUGF0dGVyblV0aWxzJ1xyXG5cclxuZnVuY3Rpb24gcm91dGVQYXJhbXNDaGFuZ2VkKHJvdXRlLCBwcmV2U3RhdGUsIG5leHRTdGF0ZSkge1xyXG4gIGlmICghcm91dGUucGF0aClcclxuICAgIHJldHVybiBmYWxzZVxyXG5cclxuICBjb25zdCBwYXJhbU5hbWVzID0gZ2V0UGFyYW1OYW1lcyhyb3V0ZS5wYXRoKVxyXG5cclxuICByZXR1cm4gcGFyYW1OYW1lcy5zb21lKGZ1bmN0aW9uIChwYXJhbU5hbWUpIHtcclxuICAgIHJldHVybiBwcmV2U3RhdGUucGFyYW1zW3BhcmFtTmFtZV0gIT09IG5leHRTdGF0ZS5wYXJhbXNbcGFyYW1OYW1lXVxyXG4gIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIG9iamVjdCBvZiB7IGxlYXZlUm91dGVzLCBlbnRlclJvdXRlcyB9IGRldGVybWluZWQgYnlcclxuICogdGhlIGNoYW5nZSBmcm9tIHByZXZTdGF0ZSB0byBuZXh0U3RhdGUuIFdlIGxlYXZlIHJvdXRlcyBpZiBlaXRoZXJcclxuICogMSkgdGhleSBhcmUgbm90IGluIHRoZSBuZXh0IHN0YXRlIG9yIDIpIHRoZXkgYXJlIGluIHRoZSBuZXh0IHN0YXRlXHJcbiAqIGJ1dCB0aGVpciBwYXJhbXMgaGF2ZSBjaGFuZ2VkIChpLmUuIC91c2Vycy8xMjMgPT4gL3VzZXJzLzQ1NikuXHJcbiAqXHJcbiAqIGxlYXZlUm91dGVzIGFyZSBvcmRlcmVkIHN0YXJ0aW5nIGF0IHRoZSBsZWFmIHJvdXRlIG9mIHRoZSB0cmVlXHJcbiAqIHdlJ3JlIGxlYXZpbmcgdXAgdG8gdGhlIGNvbW1vbiBwYXJlbnQgcm91dGUuIGVudGVyUm91dGVzIGFyZSBvcmRlcmVkXHJcbiAqIGZyb20gdGhlIHRvcCBvZiB0aGUgdHJlZSB3ZSdyZSBlbnRlcmluZyBkb3duIHRvIHRoZSBsZWFmIHJvdXRlLlxyXG4gKi9cclxuZnVuY3Rpb24gY29tcHV0ZUNoYW5nZWRSb3V0ZXMocHJldlN0YXRlLCBuZXh0U3RhdGUpIHtcclxuICBjb25zdCBwcmV2Um91dGVzID0gcHJldlN0YXRlICYmIHByZXZTdGF0ZS5yb3V0ZXNcclxuICBjb25zdCBuZXh0Um91dGVzID0gbmV4dFN0YXRlLnJvdXRlc1xyXG5cclxuICBsZXQgbGVhdmVSb3V0ZXMsIGVudGVyUm91dGVzXHJcbiAgaWYgKHByZXZSb3V0ZXMpIHtcclxuICAgIGxlYXZlUm91dGVzID0gcHJldlJvdXRlcy5maWx0ZXIoZnVuY3Rpb24gKHJvdXRlKSB7XHJcbiAgICAgIHJldHVybiBuZXh0Um91dGVzLmluZGV4T2Yocm91dGUpID09PSAtMSB8fCByb3V0ZVBhcmFtc0NoYW5nZWQocm91dGUsIHByZXZTdGF0ZSwgbmV4dFN0YXRlKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyBvbkxlYXZlIGhvb2tzIHN0YXJ0IGF0IHRoZSBsZWFmIHJvdXRlLlxyXG4gICAgbGVhdmVSb3V0ZXMucmV2ZXJzZSgpXHJcblxyXG4gICAgZW50ZXJSb3V0ZXMgPSBuZXh0Um91dGVzLmZpbHRlcihmdW5jdGlvbiAocm91dGUpIHtcclxuICAgICAgcmV0dXJuIHByZXZSb3V0ZXMuaW5kZXhPZihyb3V0ZSkgPT09IC0xIHx8IGxlYXZlUm91dGVzLmluZGV4T2Yocm91dGUpICE9PSAtMVxyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgbGVhdmVSb3V0ZXMgPSBbXVxyXG4gICAgZW50ZXJSb3V0ZXMgPSBuZXh0Um91dGVzXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbGVhdmVSb3V0ZXMsXHJcbiAgICBlbnRlclJvdXRlc1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tcHV0ZUNoYW5nZWRSb3V0ZXNcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL2NvbXB1dGVDaGFuZ2VkUm91dGVzLmpzXG4gKiovIiwiaW1wb3J0IHsgbG9vcEFzeW5jIH0gZnJvbSAnLi9Bc3luY1V0aWxzJ1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlRW50ZXJIb29rKGhvb2ssIHJvdXRlKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjYWxsYmFjaykge1xyXG4gICAgaG9vay5hcHBseShyb3V0ZSwgYXJndW1lbnRzKVxyXG5cclxuICAgIGlmIChob29rLmxlbmd0aCA8IDMpIHtcclxuICAgICAgLy8gQXNzdW1lIGhvb2sgZXhlY3V0ZXMgc3luY2hyb25vdXNseSBhbmRcclxuICAgICAgLy8gYXV0b21hdGljYWxseSBjYWxsIHRoZSBjYWxsYmFjay5cclxuICAgICAgY2FsbGJhY2soKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RW50ZXJIb29rcyhyb3V0ZXMpIHtcclxuICByZXR1cm4gcm91dGVzLnJlZHVjZShmdW5jdGlvbiAoaG9va3MsIHJvdXRlKSB7XHJcbiAgICBpZiAocm91dGUub25FbnRlcilcclxuICAgICAgaG9va3MucHVzaChjcmVhdGVFbnRlckhvb2socm91dGUub25FbnRlciwgcm91dGUpKVxyXG5cclxuICAgIHJldHVybiBob29rc1xyXG4gIH0sIFtdKVxyXG59XHJcblxyXG4vKipcclxuICogUnVucyBhbGwgb25FbnRlciBob29rcyBpbiB0aGUgZ2l2ZW4gYXJyYXkgb2Ygcm91dGVzIGluIG9yZGVyXHJcbiAqIHdpdGggb25FbnRlcihuZXh0U3RhdGUsIHJlcGxhY2VTdGF0ZSwgY2FsbGJhY2spIGFuZCBjYWxsc1xyXG4gKiBjYWxsYmFjayhlcnJvciwgcmVkaXJlY3RJbmZvKSB3aGVuIGZpbmlzaGVkLiBUaGUgZmlyc3QgaG9va1xyXG4gKiB0byB1c2UgcmVwbGFjZVN0YXRlIHNob3J0LWNpcmN1aXRzIHRoZSBsb29wLlxyXG4gKlxyXG4gKiBJZiBhIGhvb2sgbmVlZHMgdG8gcnVuIGFzeW5jaHJvbm91c2x5LCBpdCBtYXkgdXNlIHRoZSBjYWxsYmFja1xyXG4gKiBmdW5jdGlvbi4gSG93ZXZlciwgZG9pbmcgc28gd2lsbCBjYXVzZSB0aGUgdHJhbnNpdGlvbiB0byBwYXVzZSxcclxuICogd2hpY2ggY291bGQgbGVhZCB0byBhIG5vbi1yZXNwb25zaXZlIFVJIGlmIHRoZSBob29rIGlzIHNsb3cuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcnVuRW50ZXJIb29rcyhyb3V0ZXMsIG5leHRTdGF0ZSwgY2FsbGJhY2spIHtcclxuICBjb25zdCBob29rcyA9IGdldEVudGVySG9va3Mocm91dGVzKVxyXG5cclxuICBpZiAoIWhvb2tzLmxlbmd0aCkge1xyXG4gICAgY2FsbGJhY2soKVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICBsZXQgcmVkaXJlY3RJbmZvXHJcbiAgZnVuY3Rpb24gcmVwbGFjZVN0YXRlKHN0YXRlLCBwYXRobmFtZSwgcXVlcnkpIHtcclxuICAgIHJlZGlyZWN0SW5mbyA9IHsgcGF0aG5hbWUsIHF1ZXJ5LCBzdGF0ZSB9XHJcbiAgfVxyXG5cclxuICBsb29wQXN5bmMoaG9va3MubGVuZ3RoLCBmdW5jdGlvbiAoaW5kZXgsIG5leHQsIGRvbmUpIHtcclxuICAgIGhvb2tzW2luZGV4XShuZXh0U3RhdGUsIHJlcGxhY2VTdGF0ZSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvciB8fCByZWRpcmVjdEluZm8pIHtcclxuICAgICAgICBkb25lKGVycm9yLCByZWRpcmVjdEluZm8pIC8vIE5vIG5lZWQgdG8gY29udGludWUuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV4dCgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSwgY2FsbGJhY2spXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSdW5zIGFsbCBvbkxlYXZlIGhvb2tzIGluIHRoZSBnaXZlbiBhcnJheSBvZiByb3V0ZXMgaW4gb3JkZXIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcnVuTGVhdmVIb29rcyhyb3V0ZXMpIHtcclxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gcm91dGVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKVxyXG4gICAgaWYgKHJvdXRlc1tpXS5vbkxlYXZlKVxyXG4gICAgICByb3V0ZXNbaV0ub25MZWF2ZS5jYWxsKHJvdXRlc1tpXSlcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvVHJhbnNpdGlvblV0aWxzLmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGxvb3BBc3luYyh0dXJucywgd29yaywgY2FsbGJhY2spIHtcclxuICBsZXQgY3VycmVudFR1cm4gPSAwLCBpc0RvbmUgPSBmYWxzZVxyXG5cclxuICBmdW5jdGlvbiBkb25lKCkge1xyXG4gICAgaXNEb25lID0gdHJ1ZVxyXG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGlmIChpc0RvbmUpXHJcbiAgICAgIHJldHVyblxyXG5cclxuICAgIGlmIChjdXJyZW50VHVybiA8IHR1cm5zKSB7XHJcbiAgICAgIHdvcmsuY2FsbCh0aGlzLCBjdXJyZW50VHVybisrLCBuZXh0LCBkb25lKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcEFzeW5jKGFycmF5LCB3b3JrLCBjYWxsYmFjaykge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aFxyXG4gIGNvbnN0IHZhbHVlcyA9IFtdXHJcblxyXG4gIGlmIChsZW5ndGggPT09IDApXHJcbiAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgdmFsdWVzKVxyXG5cclxuICBsZXQgaXNEb25lID0gZmFsc2UsIGRvbmVDb3VudCA9IDBcclxuXHJcbiAgZnVuY3Rpb24gZG9uZShpbmRleCwgZXJyb3IsIHZhbHVlKSB7XHJcbiAgICBpZiAoaXNEb25lKVxyXG4gICAgICByZXR1cm5cclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgaXNEb25lID0gdHJ1ZVxyXG4gICAgICBjYWxsYmFjayhlcnJvcilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZVxyXG5cclxuICAgICAgaXNEb25lID0gKCsrZG9uZUNvdW50ID09PSBsZW5ndGgpXHJcblxyXG4gICAgICBpZiAoaXNEb25lKVxyXG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHZhbHVlcylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICB3b3JrKGl0ZW0sIGluZGV4LCBmdW5jdGlvbiAoZXJyb3IsIHZhbHVlKSB7XHJcbiAgICAgIGRvbmUoaW5kZXgsIGVycm9yLCB2YWx1ZSlcclxuICAgIH0pXHJcbiAgfSlcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvQXN5bmNVdGlscy5qc1xuICoqLyIsImltcG9ydCB7IG1hcEFzeW5jIH0gZnJvbSAnLi9Bc3luY1V0aWxzJ1xyXG5cclxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50c0ZvclJvdXRlKGxvY2F0aW9uLCByb3V0ZSwgY2FsbGJhY2spIHtcclxuICBpZiAocm91dGUuY29tcG9uZW50IHx8IHJvdXRlLmNvbXBvbmVudHMpIHtcclxuICAgIGNhbGxiYWNrKG51bGwsIHJvdXRlLmNvbXBvbmVudCB8fCByb3V0ZS5jb21wb25lbnRzKVxyXG4gIH0gZWxzZSBpZiAocm91dGUuZ2V0Q29tcG9uZW50KSB7XHJcbiAgICByb3V0ZS5nZXRDb21wb25lbnQobG9jYXRpb24sIGNhbGxiYWNrKVxyXG4gIH0gZWxzZSBpZiAocm91dGUuZ2V0Q29tcG9uZW50cykge1xyXG4gICAgcm91dGUuZ2V0Q29tcG9uZW50cyhsb2NhdGlvbiwgY2FsbGJhY2spXHJcbiAgfSBlbHNlIHtcclxuICAgIGNhbGxiYWNrKClcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBc3luY2hyb25vdXNseSBmZXRjaGVzIGFsbCBjb21wb25lbnRzIG5lZWRlZCBmb3IgdGhlIGdpdmVuIHJvdXRlclxyXG4gKiBzdGF0ZSBhbmQgY2FsbHMgY2FsbGJhY2soZXJyb3IsIGNvbXBvbmVudHMpIHdoZW4gZmluaXNoZWQuXHJcbiAqXHJcbiAqIE5vdGU6IFRoaXMgb3BlcmF0aW9uIG1heSBmaW5pc2ggc3luY2hyb25vdXNseSBpZiBubyByb3V0ZXMgaGF2ZSBhblxyXG4gKiBhc3luY2hyb25vdXMgZ2V0Q29tcG9uZW50cyBtZXRob2QuXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb21wb25lbnRzKG5leHRTdGF0ZSwgY2FsbGJhY2spIHtcclxuICBtYXBBc3luYyhuZXh0U3RhdGUucm91dGVzLCBmdW5jdGlvbiAocm91dGUsIGluZGV4LCBjYWxsYmFjaykge1xyXG4gICAgZ2V0Q29tcG9uZW50c0ZvclJvdXRlKG5leHRTdGF0ZS5sb2NhdGlvbiwgcm91dGUsIGNhbGxiYWNrKVxyXG4gIH0sIGNhbGxiYWNrKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRDb21wb25lbnRzXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9nZXRDb21wb25lbnRzLmpzXG4gKiovIiwiaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi93YXJuaW5nJ1xyXG5pbXBvcnQgeyBsb29wQXN5bmMgfSBmcm9tICcuL0FzeW5jVXRpbHMnXHJcbmltcG9ydCB7IG1hdGNoUGF0dGVybiB9IGZyb20gJy4vUGF0dGVyblV0aWxzJ1xyXG5pbXBvcnQgeyBjcmVhdGVSb3V0ZXMgfSBmcm9tICcuL1JvdXRlVXRpbHMnXHJcblxyXG5mdW5jdGlvbiBnZXRDaGlsZFJvdXRlcyhyb3V0ZSwgbG9jYXRpb24sIGNhbGxiYWNrKSB7XHJcbiAgaWYgKHJvdXRlLmNoaWxkUm91dGVzKSB7XHJcbiAgICBjYWxsYmFjayhudWxsLCByb3V0ZS5jaGlsZFJvdXRlcylcclxuICB9IGVsc2UgaWYgKHJvdXRlLmdldENoaWxkUm91dGVzKSB7XHJcbiAgICByb3V0ZS5nZXRDaGlsZFJvdXRlcyhsb2NhdGlvbiwgZnVuY3Rpb24gKGVycm9yLCBjaGlsZFJvdXRlcykge1xyXG4gICAgICBjYWxsYmFjayhlcnJvciwgIWVycm9yICYmIGNyZWF0ZVJvdXRlcyhjaGlsZFJvdXRlcykpXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjYWxsYmFjaygpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRJbmRleFJvdXRlKHJvdXRlLCBsb2NhdGlvbiwgY2FsbGJhY2spIHtcclxuICBpZiAocm91dGUuaW5kZXhSb3V0ZSkge1xyXG4gICAgY2FsbGJhY2sobnVsbCwgcm91dGUuaW5kZXhSb3V0ZSlcclxuICB9IGVsc2UgaWYgKHJvdXRlLmdldEluZGV4Um91dGUpIHtcclxuICAgIHJvdXRlLmdldEluZGV4Um91dGUobG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgaW5kZXhSb3V0ZSkge1xyXG4gICAgICBjYWxsYmFjayhlcnJvciwgIWVycm9yICYmIGNyZWF0ZVJvdXRlcyhpbmRleFJvdXRlKVswXSlcclxuICAgIH0pXHJcbiAgfSBlbHNlIGlmIChyb3V0ZS5jaGlsZFJvdXRlcykge1xyXG4gICAgY29uc3QgcGF0aGxlc3MgPSByb3V0ZS5jaGlsZFJvdXRlcy5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICByZXR1cm4gIW9iai5oYXNPd25Qcm9wZXJ0eSgncGF0aCcpXHJcbiAgICB9KVxyXG5cclxuICAgIGxvb3BBc3luYyhwYXRobGVzcy5sZW5ndGgsIGZ1bmN0aW9uIChpbmRleCwgbmV4dCwgZG9uZSkge1xyXG4gICAgICBnZXRJbmRleFJvdXRlKHBhdGhsZXNzW2luZGV4XSwgbG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgaW5kZXhSb3V0ZSkge1xyXG4gICAgICAgIGlmIChlcnJvciB8fCBpbmRleFJvdXRlKSB7XHJcbiAgICAgICAgICBjb25zdCByb3V0ZXMgPSBbIHBhdGhsZXNzW2luZGV4XSBdLmNvbmNhdCggQXJyYXkuaXNBcnJheShpbmRleFJvdXRlKSA/IGluZGV4Um91dGUgOiBbIGluZGV4Um91dGUgXSApXHJcbiAgICAgICAgICBkb25lKGVycm9yLCByb3V0ZXMpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5leHQoKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0sIGZ1bmN0aW9uIChlcnIsIHJvdXRlcykge1xyXG4gICAgICBjYWxsYmFjayhudWxsLCByb3V0ZXMpXHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjYWxsYmFjaygpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhc3NpZ25QYXJhbXMocGFyYW1zLCBwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcykge1xyXG4gIHJldHVybiBwYXJhbU5hbWVzLnJlZHVjZShmdW5jdGlvbiAocGFyYW1zLCBwYXJhbU5hbWUsIGluZGV4KSB7XHJcbiAgICBjb25zdCBwYXJhbVZhbHVlID0gcGFyYW1WYWx1ZXMgJiYgcGFyYW1WYWx1ZXNbaW5kZXhdXHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zW3BhcmFtTmFtZV0pKSB7XHJcbiAgICAgIHBhcmFtc1twYXJhbU5hbWVdLnB1c2gocGFyYW1WYWx1ZSlcclxuICAgIH0gZWxzZSBpZiAocGFyYW1OYW1lIGluIHBhcmFtcykge1xyXG4gICAgICBwYXJhbXNbcGFyYW1OYW1lXSA9IFsgcGFyYW1zW3BhcmFtTmFtZV0sIHBhcmFtVmFsdWUgXVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFyYW1zW3BhcmFtTmFtZV0gPSBwYXJhbVZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhcmFtc1xyXG4gIH0sIHBhcmFtcylcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUGFyYW1zKHBhcmFtTmFtZXMsIHBhcmFtVmFsdWVzKSB7XHJcbiAgcmV0dXJuIGFzc2lnblBhcmFtcyh7fSwgcGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hdGNoUm91dGVEZWVwKFxyXG4gIHJvdXRlLCBsb2NhdGlvbiwgcmVtYWluaW5nUGF0aG5hbWUsIHBhcmFtTmFtZXMsIHBhcmFtVmFsdWVzLCBjYWxsYmFja1xyXG4pIHtcclxuICBsZXQgcGF0dGVybiA9IHJvdXRlLnBhdGggfHwgJydcclxuXHJcbiAgaWYgKHBhdHRlcm4uY2hhckF0KDApID09PSAnLycpIHtcclxuICAgIHJlbWFpbmluZ1BhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWVcclxuICAgIHBhcmFtTmFtZXMgPSBbXVxyXG4gICAgcGFyYW1WYWx1ZXMgPSBbXVxyXG4gIH1cclxuXHJcbiAgaWYgKHJlbWFpbmluZ1BhdGhuYW1lICE9PSBudWxsKSB7XHJcbiAgICBjb25zdCBtYXRjaGVkID0gbWF0Y2hQYXR0ZXJuKHBhdHRlcm4sIHJlbWFpbmluZ1BhdGhuYW1lKVxyXG4gICAgcmVtYWluaW5nUGF0aG5hbWUgPSBtYXRjaGVkLnJlbWFpbmluZ1BhdGhuYW1lXHJcbiAgICBwYXJhbU5hbWVzID0gWyAuLi5wYXJhbU5hbWVzLCAuLi5tYXRjaGVkLnBhcmFtTmFtZXMgXVxyXG4gICAgcGFyYW1WYWx1ZXMgPSBbIC4uLnBhcmFtVmFsdWVzLCAuLi5tYXRjaGVkLnBhcmFtVmFsdWVzIF1cclxuXHJcbiAgICBpZiAocmVtYWluaW5nUGF0aG5hbWUgPT09ICcnICYmIHJvdXRlLnBhdGgpIHtcclxuICAgICAgY29uc3QgbWF0Y2ggPSB7XHJcbiAgICAgICAgcm91dGVzOiBbIHJvdXRlIF0sXHJcbiAgICAgICAgcGFyYW1zOiBjcmVhdGVQYXJhbXMocGFyYW1OYW1lcywgcGFyYW1WYWx1ZXMpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGdldEluZGV4Um91dGUocm91dGUsIGxvY2F0aW9uLCBmdW5jdGlvbiAoZXJyb3IsIGluZGV4Um91dGUpIHtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgIGNhbGxiYWNrKGVycm9yKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpbmRleFJvdXRlKSkge1xyXG4gICAgICAgICAgICB3YXJuaW5nKFxyXG4gICAgICAgICAgICAgIGluZGV4Um91dGUuZXZlcnkocm91dGUgPT4gIXJvdXRlLnBhdGgpLFxyXG4gICAgICAgICAgICAgICdJbmRleCByb3V0ZXMgc2hvdWxkIG5vdCBoYXZlIHBhdGhzJ1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIG1hdGNoLnJvdXRlcy5wdXNoKC4uLmluZGV4Um91dGUpXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4Um91dGUpIHtcclxuICAgICAgICAgICAgd2FybmluZyhcclxuICAgICAgICAgICAgICAhaW5kZXhSb3V0ZS5wYXRoLFxyXG4gICAgICAgICAgICAgICdJbmRleCByb3V0ZXMgc2hvdWxkIG5vdCBoYXZlIHBhdGhzJ1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIG1hdGNoLnJvdXRlcy5wdXNoKGluZGV4Um91dGUpXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgbWF0Y2gpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChyZW1haW5pbmdQYXRobmFtZSAhPSBudWxsIHx8IHJvdXRlLmNoaWxkUm91dGVzKSB7XHJcbiAgICAvLyBFaXRoZXIgYSkgdGhpcyByb3V0ZSBtYXRjaGVkIGF0IGxlYXN0IHNvbWUgb2YgdGhlIHBhdGggb3IgYilcclxuICAgIC8vIHdlIGRvbid0IGhhdmUgdG8gbG9hZCB0aGlzIHJvdXRlJ3MgY2hpbGRyZW4gYXN5bmNocm9ub3VzbHkuIEluXHJcbiAgICAvLyBlaXRoZXIgY2FzZSBjb250aW51ZSBjaGVja2luZyBmb3IgbWF0Y2hlcyBpbiB0aGUgc3VidHJlZS5cclxuICAgIGdldENoaWxkUm91dGVzKHJvdXRlLCBsb2NhdGlvbiwgZnVuY3Rpb24gKGVycm9yLCBjaGlsZFJvdXRlcykge1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjYWxsYmFjayhlcnJvcilcclxuICAgICAgfSBlbHNlIGlmIChjaGlsZFJvdXRlcykge1xyXG4gICAgICAgIC8vIENoZWNrIHRoZSBjaGlsZCByb3V0ZXMgdG8gc2VlIGlmIGFueSBvZiB0aGVtIG1hdGNoLlxyXG4gICAgICAgIG1hdGNoUm91dGVzKGNoaWxkUm91dGVzLCBsb2NhdGlvbiwgZnVuY3Rpb24gKGVycm9yLCBtYXRjaCkge1xyXG4gICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAvLyBBIGNoaWxkIHJvdXRlIG1hdGNoZWQhIEF1Z21lbnQgdGhlIG1hdGNoIGFuZCBwYXNzIGl0IHVwIHRoZSBzdGFjay5cclxuICAgICAgICAgICAgbWF0Y2gucm91dGVzLnVuc2hpZnQocm91dGUpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIG1hdGNoKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIHJlbWFpbmluZ1BhdGhuYW1lLCBwYXJhbU5hbWVzLCBwYXJhbVZhbHVlcylcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSBlbHNlIHtcclxuICAgIGNhbGxiYWNrKClcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBc3luY2hyb25vdXNseSBtYXRjaGVzIHRoZSBnaXZlbiBsb2NhdGlvbiB0byBhIHNldCBvZiByb3V0ZXMgYW5kIGNhbGxzXHJcbiAqIGNhbGxiYWNrKGVycm9yLCBzdGF0ZSkgd2hlbiBmaW5pc2hlZC4gVGhlIHN0YXRlIG9iamVjdCB3aWxsIGhhdmUgdGhlXHJcbiAqIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAtIHJvdXRlcyAgICAgICBBbiBhcnJheSBvZiByb3V0ZXMgdGhhdCBtYXRjaGVkLCBpbiBoaWVyYXJjaGljYWwgb3JkZXJcclxuICogLSBwYXJhbXMgICAgICAgQW4gb2JqZWN0IG9mIFVSTCBwYXJhbWV0ZXJzXHJcbiAqXHJcbiAqIE5vdGU6IFRoaXMgb3BlcmF0aW9uIG1heSBmaW5pc2ggc3luY2hyb25vdXNseSBpZiBubyByb3V0ZXMgaGF2ZSBhblxyXG4gKiBhc3luY2hyb25vdXMgZ2V0Q2hpbGRSb3V0ZXMgbWV0aG9kLlxyXG4gKi9cclxuZnVuY3Rpb24gbWF0Y2hSb3V0ZXMoXHJcbiAgcm91dGVzLCBsb2NhdGlvbiwgY2FsbGJhY2ssXHJcbiAgcmVtYWluaW5nUGF0aG5hbWU9bG9jYXRpb24ucGF0aG5hbWUsIHBhcmFtTmFtZXM9W10sIHBhcmFtVmFsdWVzPVtdXHJcbikge1xyXG4gIGxvb3BBc3luYyhyb3V0ZXMubGVuZ3RoLCBmdW5jdGlvbiAoaW5kZXgsIG5leHQsIGRvbmUpIHtcclxuICAgIG1hdGNoUm91dGVEZWVwKFxyXG4gICAgICByb3V0ZXNbaW5kZXhdLCBsb2NhdGlvbiwgcmVtYWluaW5nUGF0aG5hbWUsIHBhcmFtTmFtZXMsIHBhcmFtVmFsdWVzLFxyXG4gICAgICBmdW5jdGlvbiAoZXJyb3IsIG1hdGNoKSB7XHJcbiAgICAgICAgaWYgKGVycm9yIHx8IG1hdGNoKSB7XHJcbiAgICAgICAgICBkb25lKGVycm9yLCBtYXRjaClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV4dCgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApXHJcbiAgfSwgY2FsbGJhY2spXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1hdGNoUm91dGVzXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9tYXRjaFJvdXRlcy5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi93YXJuaW5nJ1xyXG5cclxuZnVuY3Rpb24gaXNWYWxpZENoaWxkKG9iamVjdCkge1xyXG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCB8fCBSZWFjdC5pc1ZhbGlkRWxlbWVudChvYmplY3QpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1JlYWN0Q2hpbGRyZW4ob2JqZWN0KSB7XHJcbiAgcmV0dXJuIGlzVmFsaWRDaGlsZChvYmplY3QpIHx8IChBcnJheS5pc0FycmF5KG9iamVjdCkgJiYgb2JqZWN0LmV2ZXJ5KGlzVmFsaWRDaGlsZCkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKGNvbXBvbmVudE5hbWUsIHByb3BUeXBlcywgcHJvcHMpIHtcclxuICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCAnVW5rbm93bkNvbXBvbmVudCdcclxuXHJcbiAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBwcm9wVHlwZXMpIHtcclxuICAgIGlmIChwcm9wVHlwZXMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0gcHJvcFR5cGVzW3Byb3BOYW1lXShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpXHJcblxyXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWY6IGVycm9yIGxvZ2dpbmcgKi9cclxuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpXHJcbiAgICAgICAgd2FybmluZyhmYWxzZSwgZXJyb3IubWVzc2FnZSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlKGRlZmF1bHRQcm9wcywgcHJvcHMpIHtcclxuICByZXR1cm4geyAuLi5kZWZhdWx0UHJvcHMsIC4uLnByb3BzIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChlbGVtZW50KSB7XHJcbiAgY29uc3QgdHlwZSA9IGVsZW1lbnQudHlwZVxyXG4gIGNvbnN0IHJvdXRlID0gY3JlYXRlUm91dGUodHlwZS5kZWZhdWx0UHJvcHMsIGVsZW1lbnQucHJvcHMpXHJcblxyXG4gIGlmICh0eXBlLnByb3BUeXBlcylcclxuICAgIGNoZWNrUHJvcFR5cGVzKHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lLCB0eXBlLnByb3BUeXBlcywgcm91dGUpXHJcblxyXG4gIGlmIChyb3V0ZS5jaGlsZHJlbikge1xyXG4gICAgY29uc3QgY2hpbGRSb3V0ZXMgPSBjcmVhdGVSb3V0ZXNGcm9tUmVhY3RDaGlsZHJlbihyb3V0ZS5jaGlsZHJlbiwgcm91dGUpXHJcblxyXG4gICAgaWYgKGNoaWxkUm91dGVzLmxlbmd0aClcclxuICAgICAgcm91dGUuY2hpbGRSb3V0ZXMgPSBjaGlsZFJvdXRlc1xyXG5cclxuICAgIGRlbGV0ZSByb3V0ZS5jaGlsZHJlblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJvdXRlXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgcm91dGVzIG9iamVjdCBmcm9tIHRoZSBnaXZlbiBSZWFjdENoaWxkcmVuLiBKU1hcclxuICogcHJvdmlkZXMgYSBjb252ZW5pZW50IHdheSB0byB2aXN1YWxpemUgaG93IHJvdXRlcyBpbiB0aGUgaGllcmFyY2h5IGFyZVxyXG4gKiBuZXN0ZWQuXHJcbiAqXHJcbiAqICAgaW1wb3J0IHsgUm91dGUsIGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xyXG4gKiAgIFxyXG4gKiAgIGNvbnN0IHJvdXRlcyA9IGNyZWF0ZVJvdXRlc0Zyb21SZWFjdENoaWxkcmVuKFxyXG4gKiAgICAgPFJvdXRlIGNvbXBvbmVudD17QXBwfT5cclxuICogICAgICAgPFJvdXRlIHBhdGg9XCJob21lXCIgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cclxuICogICAgICAgPFJvdXRlIHBhdGg9XCJuZXdzXCIgY29tcG9uZW50PXtOZXdzRmVlZH0vPlxyXG4gKiAgICAgPC9Sb3V0ZT5cclxuICogICApXHJcbiAqXHJcbiAqIE5vdGU6IFRoaXMgbWV0aG9kIGlzIGF1dG9tYXRpY2FsbHkgdXNlZCB3aGVuIHlvdSBwcm92aWRlIDxSb3V0ZT4gY2hpbGRyZW5cclxuICogdG8gYSA8Um91dGVyPiBjb21wb25lbnQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4oY2hpbGRyZW4sIHBhcmVudFJvdXRlKSB7XHJcbiAgY29uc3Qgcm91dGVzID0gW11cclxuXHJcbiAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChjaGlsZHJlbiwgZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChlbGVtZW50KSkge1xyXG4gICAgICAvLyBDb21wb25lbnQgY2xhc3NlcyBtYXkgaGF2ZSBhIHN0YXRpYyBjcmVhdGUqIG1ldGhvZC5cclxuICAgICAgaWYgKGVsZW1lbnQudHlwZS5jcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IGVsZW1lbnQudHlwZS5jcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQoZWxlbWVudCwgcGFyZW50Um91dGUpXHJcblxyXG4gICAgICAgIGlmIChyb3V0ZSlcclxuICAgICAgICAgIHJvdXRlcy5wdXNoKHJvdXRlKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvdXRlcy5wdXNoKGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChlbGVtZW50KSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcblxyXG4gIHJldHVybiByb3V0ZXNcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2Ygcm91dGVzIGZyb20gdGhlIGdpdmVuIG9iamVjdCB3aGljaFxyXG4gKiBtYXkgYmUgYSBKU1ggcm91dGUsIGEgcGxhaW4gb2JqZWN0IHJvdXRlLCBvciBhbiBhcnJheSBvZiBlaXRoZXIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm91dGVzKHJvdXRlcykge1xyXG4gIGlmIChpc1JlYWN0Q2hpbGRyZW4ocm91dGVzKSkge1xyXG4gICAgcm91dGVzID0gY3JlYXRlUm91dGVzRnJvbVJlYWN0Q2hpbGRyZW4ocm91dGVzKVxyXG4gIH0gZWxzZSBpZiAocm91dGVzICYmICFBcnJheS5pc0FycmF5KHJvdXRlcykpIHtcclxuICAgIHJvdXRlcyA9IFsgcm91dGVzIF1cclxuICB9XHJcblxyXG4gIHJldHVybiByb3V0ZXNcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvUm91dGVVdGlscy5qc1xuICoqLyIsImltcG9ydCBjcmVhdGVIYXNoSGlzdG9yeSBmcm9tICdoaXN0b3J5L2xpYi9jcmVhdGVIYXNoSGlzdG9yeSdcclxuaW1wb3J0IHVzZVF1ZXJpZXMgZnJvbSAnaGlzdG9yeS9saWIvdXNlUXVlcmllcydcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuaW1wb3J0IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyIGZyb20gJy4vY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXInXHJcbmltcG9ydCB7IHJvdXRlcyB9IGZyb20gJy4vUHJvcFR5cGVzJ1xyXG5pbXBvcnQgUm91dGVyQ29udGV4dCBmcm9tICcuL1JvdXRlckNvbnRleHQnXHJcbmltcG9ydCB7IGNyZWF0ZVJvdXRlcyB9IGZyb20gJy4vUm91dGVVdGlscydcclxuaW1wb3J0IHsgY3JlYXRlUm91dGVyT2JqZWN0LCBjcmVhdGVSb3V0aW5nSGlzdG9yeSB9IGZyb20gJy4vUm91dGVyVXRpbHMnXHJcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vd2FybmluZydcclxuXHJcbmZ1bmN0aW9uIGlzRGVwcmVjYXRlZEhpc3RvcnkoaGlzdG9yeSkge1xyXG4gIHJldHVybiAhaGlzdG9yeSB8fCAhaGlzdG9yeS5fX3YyX2NvbXBhdGlibGVfX1xyXG59XHJcblxyXG5jb25zdCB7IGZ1bmMsIG9iamVjdCB9ID0gUmVhY3QuUHJvcFR5cGVzXHJcblxyXG4vKipcclxuICogQSA8Um91dGVyPiBpcyBhIGhpZ2gtbGV2ZWwgQVBJIGZvciBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdXBcclxuICogYSByb3V0ZXIgdGhhdCByZW5kZXJzIGEgPFJvdXRlckNvbnRleHQ+IHdpdGggYWxsIHRoZSBwcm9wc1xyXG4gKiBpdCBuZWVkcyBlYWNoIHRpbWUgdGhlIFVSTCBjaGFuZ2VzLlxyXG4gKi9cclxuY29uc3QgUm91dGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGhpc3Rvcnk6IG9iamVjdCxcclxuICAgIGNoaWxkcmVuOiByb3V0ZXMsXHJcbiAgICByb3V0ZXMsIC8vIGFsaWFzIGZvciBjaGlsZHJlblxyXG4gICAgcmVuZGVyOiBmdW5jLFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuYyxcclxuICAgIG9uRXJyb3I6IGZ1bmMsXHJcbiAgICBvblVwZGF0ZTogZnVuY1xyXG4gIH0sXHJcblxyXG4gIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlbmRlcihwcm9wcykge1xyXG4gICAgICAgIHJldHVybiA8Um91dGVyQ29udGV4dCB7Li4ucHJvcHN9IC8+XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsb2NhdGlvbjogbnVsbCxcclxuICAgICAgcm91dGVzOiBudWxsLFxyXG4gICAgICBwYXJhbXM6IG51bGwsXHJcbiAgICAgIGNvbXBvbmVudHM6IG51bGxcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBoYW5kbGVFcnJvcihlcnJvcikge1xyXG4gICAgaWYgKHRoaXMucHJvcHMub25FcnJvcikge1xyXG4gICAgICB0aGlzLnByb3BzLm9uRXJyb3IuY2FsbCh0aGlzLCBlcnJvcilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFRocm93IGVycm9ycyBieSBkZWZhdWx0IHNvIHdlIGRvbid0IHNpbGVudGx5IHN3YWxsb3cgdGhlbSFcclxuICAgICAgdGhyb3cgZXJyb3IgLy8gVGhpcyBlcnJvciBwcm9iYWJseSBvY2N1cnJlZCBpbiBnZXRDaGlsZFJvdXRlcyBvciBnZXRDb21wb25lbnRzLlxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGxldCB7IGhpc3RvcnkgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHsgcm91dGVzLCBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wc1xyXG5cclxuICAgIGNvbnN0IHsgcGFyc2VRdWVyeVN0cmluZywgc3RyaW5naWZ5UXVlcnkgfSA9IHRoaXMucHJvcHNcclxuICAgIHdhcm5pbmcoXHJcbiAgICAgICEocGFyc2VRdWVyeVN0cmluZyB8fCBzdHJpbmdpZnlRdWVyeSksXHJcbiAgICAgICdgcGFyc2VRdWVyeVN0cmluZ2AgYW5kIGBzdHJpbmdpZnlRdWVyeWAgYXJlIGRlcHJlY2F0ZWQuIFBsZWFzZSBjcmVhdGUgYSBjdXN0b20gaGlzdG9yeS4gaHR0cDovL3RpbnkuY2Mvcm91dGVyLWN1c3RvbXF1ZXJ5c3RyaW5nJ1xyXG4gICAgKVxyXG5cclxuICAgIGlmIChpc0RlcHJlY2F0ZWRIaXN0b3J5KGhpc3RvcnkpKSB7XHJcbiAgICAgIGhpc3RvcnkgPSB0aGlzLndyYXBEZXByZWNhdGVkSGlzdG9yeShoaXN0b3J5KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoXHJcbiAgICAgIGhpc3RvcnksIGNyZWF0ZVJvdXRlcyhyb3V0ZXMgfHwgY2hpbGRyZW4pXHJcbiAgICApXHJcbiAgICB0aGlzLl91bmxpc3RlbiA9IHRyYW5zaXRpb25NYW5hZ2VyLmxpc3RlbigoZXJyb3IsIHN0YXRlKSA9PiB7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSwgdGhpcy5wcm9wcy5vblVwZGF0ZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLnJvdXRlciA9IGNyZWF0ZVJvdXRlck9iamVjdChoaXN0b3J5LCB0cmFuc2l0aW9uTWFuYWdlcilcclxuICAgIHRoaXMuaGlzdG9yeSA9IGNyZWF0ZVJvdXRpbmdIaXN0b3J5KGhpc3RvcnksIHRyYW5zaXRpb25NYW5hZ2VyKVxyXG4gIH0sXHJcblxyXG4gIHdyYXBEZXByZWNhdGVkSGlzdG9yeShoaXN0b3J5KSB7XHJcbiAgICBjb25zdCB7IHBhcnNlUXVlcnlTdHJpbmcsIHN0cmluZ2lmeVF1ZXJ5IH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgbGV0IGNyZWF0ZUhpc3RvcnlcclxuICAgIGlmIChoaXN0b3J5KSB7XHJcbiAgICAgIHdhcm5pbmcoZmFsc2UsICdJdCBhcHBlYXJzIHlvdSBoYXZlIHByb3ZpZGVkIGEgZGVwcmVjYXRlZCBoaXN0b3J5IG9iamVjdCB0byBgPFJvdXRlci8+YCwgcGxlYXNlIHVzZSBhIGhpc3RvcnkgcHJvdmlkZWQgYnkgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICdSZWFjdCBSb3V0ZXIgd2l0aCBgaW1wb3J0IHsgYnJvd3Nlckhpc3RvcnkgfSBmcm9tIFxcJ3JlYWN0LXJvdXRlclxcJ2Agb3IgYGltcG9ydCB7IGhhc2hIaXN0b3J5IH0gZnJvbSBcXCdyZWFjdC1yb3V0ZXJcXCdgLiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgJ0lmIHlvdSBhcmUgdXNpbmcgYSB2YWxpZCBjdXN0b20gaGlzdG9yeSBwbGVhc2Ugc2V0IGBoaXN0b3J5Ll9fdjJfY29tcGF0aWJsZV9fID0gdHJ1ZWAuIGh0dHA6Ly90aW55LmNjL3JvdXRlci11c2luZ2hpc3RvcnknKVxyXG4gICAgICBjcmVhdGVIaXN0b3J5ID0gKCkgPT4gaGlzdG9yeVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2FybmluZyhmYWxzZSwgJ2BSb3V0ZXJgIG5vIGxvbmdlciBkZWZhdWx0cyB0aGUgaGlzdG9yeSBwcm9wIHRvIGhhc2ggaGlzdG9yeS4gUGxlYXNlIHVzZSB0aGUgYGhhc2hIaXN0b3J5YCBzaW5nbGV0b24gaW5zdGVhZC4gaHR0cDovL3RpbnkuY2Mvcm91dGVyLWRlZmF1bHRoaXN0b3J5JylcclxuICAgICAgY3JlYXRlSGlzdG9yeSA9IGNyZWF0ZUhhc2hIaXN0b3J5XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVzZVF1ZXJpZXMoY3JlYXRlSGlzdG9yeSkoeyBwYXJzZVF1ZXJ5U3RyaW5nLCBzdHJpbmdpZnlRdWVyeSB9KVxyXG4gIH0sXHJcblxyXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBzYW5pdHkgY2hlY2sgKi9cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgd2FybmluZyhcclxuICAgICAgbmV4dFByb3BzLmhpc3RvcnkgPT09IHRoaXMucHJvcHMuaGlzdG9yeSxcclxuICAgICAgJ1lvdSBjYW5ub3QgY2hhbmdlIDxSb3V0ZXIgaGlzdG9yeT47IGl0IHdpbGwgYmUgaWdub3JlZCdcclxuICAgIClcclxuXHJcbiAgICB3YXJuaW5nKFxyXG4gICAgICAobmV4dFByb3BzLnJvdXRlcyB8fCBuZXh0UHJvcHMuY2hpbGRyZW4pID09PVxyXG4gICAgICAgICh0aGlzLnByb3BzLnJvdXRlcyB8fCB0aGlzLnByb3BzLmNoaWxkcmVuKSxcclxuICAgICAgJ1lvdSBjYW5ub3QgY2hhbmdlIDxSb3V0ZXIgcm91dGVzPjsgaXQgd2lsbCBiZSBpZ25vcmVkJ1xyXG4gICAgKVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgaWYgKHRoaXMuX3VubGlzdGVuKVxyXG4gICAgICB0aGlzLl91bmxpc3RlbigpXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBsb2NhdGlvbiwgcm91dGVzLCBwYXJhbXMsIGNvbXBvbmVudHMgfSA9IHRoaXMuc3RhdGVcclxuICAgIGNvbnN0IHsgY3JlYXRlRWxlbWVudCwgcmVuZGVyLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wc1xyXG5cclxuICAgIGlmIChsb2NhdGlvbiA9PSBudWxsKVxyXG4gICAgICByZXR1cm4gbnVsbCAvLyBBc3luYyBtYXRjaFxyXG5cclxuICAgIC8vIE9ubHkgZm9yd2FyZCBub24tUm91dGVyLXNwZWNpZmljIHByb3BzIHRvIHJvdXRpbmcgY29udGV4dCwgYXMgdGhvc2UgYXJlXHJcbiAgICAvLyB0aGUgb25seSBvbmVzIHRoYXQgbWlnaHQgYmUgY3VzdG9tIHJvdXRpbmcgY29udGV4dCBwcm9wcy5cclxuICAgIE9iamVjdC5rZXlzKFJvdXRlci5wcm9wVHlwZXMpLmZvckVhY2gocHJvcFR5cGUgPT4gZGVsZXRlIHByb3BzW3Byb3BUeXBlXSlcclxuXHJcbiAgICByZXR1cm4gcmVuZGVyKHtcclxuICAgICAgLi4ucHJvcHMsXHJcbiAgICAgIGhpc3Rvcnk6IHRoaXMuaGlzdG9yeSxcclxuICAgICAgcm91dGVyOiB0aGlzLnJvdXRlcixcclxuICAgICAgbG9jYXRpb24sXHJcbiAgICAgIHJvdXRlcyxcclxuICAgICAgcGFyYW1zLFxyXG4gICAgICBjb21wb25lbnRzLFxyXG4gICAgICBjcmVhdGVFbGVtZW50XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXJcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCd3YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxudmFyIF9pbnZhcmlhbnQgPSByZXF1aXJlKCdpbnZhcmlhbnQnKTtcblxudmFyIF9pbnZhcmlhbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW52YXJpYW50KTtcblxudmFyIF9BY3Rpb25zID0gcmVxdWlyZSgnLi9BY3Rpb25zJyk7XG5cbnZhciBfRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG5cbnZhciBfRE9NVXRpbHMgPSByZXF1aXJlKCcuL0RPTVV0aWxzJyk7XG5cbnZhciBfRE9NU3RhdGVTdG9yYWdlID0gcmVxdWlyZSgnLi9ET01TdGF0ZVN0b3JhZ2UnKTtcblxudmFyIF9jcmVhdGVET01IaXN0b3J5ID0gcmVxdWlyZSgnLi9jcmVhdGVET01IaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlRE9NSGlzdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVET01IaXN0b3J5KTtcblxudmFyIF9wYXJzZVBhdGggPSByZXF1aXJlKCcuL3BhcnNlUGF0aCcpO1xuXG52YXIgX3BhcnNlUGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJzZVBhdGgpO1xuXG5mdW5jdGlvbiBpc0Fic29sdXRlUGF0aChwYXRoKSB7XG4gIHJldHVybiB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn1cblxuZnVuY3Rpb24gZW5zdXJlU2xhc2goKSB7XG4gIHZhciBwYXRoID0gX0RPTVV0aWxzLmdldEhhc2hQYXRoKCk7XG5cbiAgaWYgKGlzQWJzb2x1dGVQYXRoKHBhdGgpKSByZXR1cm4gdHJ1ZTtcblxuICBfRE9NVXRpbHMucmVwbGFjZUhhc2hQYXRoKCcvJyArIHBhdGgpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYWRkUXVlcnlTdHJpbmdWYWx1ZVRvUGF0aChwYXRoLCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBwYXRoICsgKHBhdGguaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyAoa2V5ICsgJz0nICsgdmFsdWUpO1xufVxuXG5mdW5jdGlvbiBzdHJpcFF1ZXJ5U3RyaW5nVmFsdWVGcm9tUGF0aChwYXRoLCBrZXkpIHtcbiAgcmV0dXJuIHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKCdbPyZdPycgKyBrZXkgKyAnPVthLXpBLVowLTldKycpLCAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldFF1ZXJ5U3RyaW5nVmFsdWVGcm9tUGF0aChwYXRoLCBrZXkpIHtcbiAgdmFyIG1hdGNoID0gcGF0aC5tYXRjaChuZXcgUmVnRXhwKCdcXFxcPy4qP1xcXFxiJyArIGtleSArICc9KC4rPylcXFxcYicpKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoWzFdO1xufVxuXG52YXIgRGVmYXVsdFF1ZXJ5S2V5ID0gJ19rJztcblxuZnVuY3Rpb24gY3JlYXRlSGFzaEhpc3RvcnkoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cbiAgIV9FeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00gPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSwgJ0hhc2ggaGlzdG9yeSBuZWVkcyBhIERPTScpIDogX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIHF1ZXJ5S2V5ID0gb3B0aW9ucy5xdWVyeUtleTtcblxuICBpZiAocXVlcnlLZXkgPT09IHVuZGVmaW5lZCB8fCAhIXF1ZXJ5S2V5KSBxdWVyeUtleSA9IHR5cGVvZiBxdWVyeUtleSA9PT0gJ3N0cmluZycgPyBxdWVyeUtleSA6IERlZmF1bHRRdWVyeUtleTtcblxuICBmdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24oKSB7XG4gICAgdmFyIHBhdGggPSBfRE9NVXRpbHMuZ2V0SGFzaFBhdGgoKTtcblxuICAgIHZhciBrZXkgPSB1bmRlZmluZWQsXG4gICAgICAgIHN0YXRlID0gdW5kZWZpbmVkO1xuICAgIGlmIChxdWVyeUtleSkge1xuICAgICAga2V5ID0gZ2V0UXVlcnlTdHJpbmdWYWx1ZUZyb21QYXRoKHBhdGgsIHF1ZXJ5S2V5KTtcbiAgICAgIHBhdGggPSBzdHJpcFF1ZXJ5U3RyaW5nVmFsdWVGcm9tUGF0aChwYXRoLCBxdWVyeUtleSk7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgc3RhdGUgPSBfRE9NU3RhdGVTdG9yYWdlLnJlYWRTdGF0ZShrZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUgPSBudWxsO1xuICAgICAgICBrZXkgPSBoaXN0b3J5LmNyZWF0ZUtleSgpO1xuICAgICAgICBfRE9NVXRpbHMucmVwbGFjZUhhc2hQYXRoKGFkZFF1ZXJ5U3RyaW5nVmFsdWVUb1BhdGgocGF0aCwgcXVlcnlLZXksIGtleSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSBzdGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uID0gX3BhcnNlUGF0aDJbJ2RlZmF1bHQnXShwYXRoKTtcblxuICAgIHJldHVybiBoaXN0b3J5LmNyZWF0ZUxvY2F0aW9uKF9leHRlbmRzKHt9LCBsb2NhdGlvbiwgeyBzdGF0ZTogc3RhdGUgfSksIHVuZGVmaW5lZCwga2V5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0SGFzaENoYW5nZUxpc3RlbmVyKF9yZWYpIHtcbiAgICB2YXIgdHJhbnNpdGlvblRvID0gX3JlZi50cmFuc2l0aW9uVG87XG5cbiAgICBmdW5jdGlvbiBoYXNoQ2hhbmdlTGlzdGVuZXIoKSB7XG4gICAgICBpZiAoIWVuc3VyZVNsYXNoKCkpIHJldHVybjsgLy8gQWx3YXlzIG1ha2Ugc3VyZSBoYXNoZXMgYXJlIHByZWNlZWRlZCB3aXRoIGEgLy5cblxuICAgICAgdHJhbnNpdGlvblRvKGdldEN1cnJlbnRMb2NhdGlvbigpKTtcbiAgICB9XG5cbiAgICBlbnN1cmVTbGFzaCgpO1xuICAgIF9ET01VdGlscy5hZGRFdmVudExpc3RlbmVyKHdpbmRvdywgJ2hhc2hjaGFuZ2UnLCBoYXNoQ2hhbmdlTGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIF9ET01VdGlscy5yZW1vdmVFdmVudExpc3RlbmVyKHdpbmRvdywgJ2hhc2hjaGFuZ2UnLCBoYXNoQ2hhbmdlTGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBmaW5pc2hUcmFuc2l0aW9uKGxvY2F0aW9uKSB7XG4gICAgdmFyIGJhc2VuYW1lID0gbG9jYXRpb24uYmFzZW5hbWU7XG4gICAgdmFyIHBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdmFyIHNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaDtcbiAgICB2YXIgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcbiAgICB2YXIgYWN0aW9uID0gbG9jYXRpb24uYWN0aW9uO1xuICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXk7XG5cbiAgICBpZiAoYWN0aW9uID09PSBfQWN0aW9ucy5QT1ApIHJldHVybjsgLy8gTm90aGluZyB0byBkby5cblxuICAgIHZhciBwYXRoID0gKGJhc2VuYW1lIHx8ICcnKSArIHBhdGhuYW1lICsgc2VhcmNoO1xuXG4gICAgaWYgKHF1ZXJ5S2V5KSB7XG4gICAgICBwYXRoID0gYWRkUXVlcnlTdHJpbmdWYWx1ZVRvUGF0aChwYXRoLCBxdWVyeUtleSwga2V5KTtcbiAgICAgIF9ET01TdGF0ZVN0b3JhZ2Uuc2F2ZVN0YXRlKGtleSwgc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBEcm9wIGtleSBhbmQgc3RhdGUuXG4gICAgICBsb2NhdGlvbi5rZXkgPSBsb2NhdGlvbi5zdGF0ZSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRIYXNoID0gX0RPTVV0aWxzLmdldEhhc2hQYXRoKCk7XG5cbiAgICBpZiAoYWN0aW9uID09PSBfQWN0aW9ucy5QVVNIKSB7XG4gICAgICBpZiAoY3VycmVudEhhc2ggIT09IHBhdGgpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBwYXRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnWW91IGNhbm5vdCBQVVNIIHRoZSBzYW1lIHBhdGggdXNpbmcgaGFzaCBoaXN0b3J5JykgOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjdXJyZW50SGFzaCAhPT0gcGF0aCkge1xuICAgICAgLy8gUkVQTEFDRVxuICAgICAgX0RPTVV0aWxzLnJlcGxhY2VIYXNoUGF0aChwYXRoKTtcbiAgICB9XG4gIH1cblxuICB2YXIgaGlzdG9yeSA9IF9jcmVhdGVET01IaXN0b3J5MlsnZGVmYXVsdCddKF9leHRlbmRzKHt9LCBvcHRpb25zLCB7XG4gICAgZ2V0Q3VycmVudExvY2F0aW9uOiBnZXRDdXJyZW50TG9jYXRpb24sXG4gICAgZmluaXNoVHJhbnNpdGlvbjogZmluaXNoVHJhbnNpdGlvbixcbiAgICBzYXZlU3RhdGU6IF9ET01TdGF0ZVN0b3JhZ2Uuc2F2ZVN0YXRlXG4gIH0pKTtcblxuICB2YXIgbGlzdGVuZXJDb3VudCA9IDAsXG4gICAgICBzdG9wSGFzaENoYW5nZUxpc3RlbmVyID0gdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbkJlZm9yZShsaXN0ZW5lcikge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BIYXNoQ2hhbmdlTGlzdGVuZXIgPSBzdGFydEhhc2hDaGFuZ2VMaXN0ZW5lcihoaXN0b3J5KTtcblxuICAgIHZhciB1bmxpc3RlbiA9IGhpc3RvcnkubGlzdGVuQmVmb3JlKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB1bmxpc3RlbigpO1xuXG4gICAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BIYXNoQ2hhbmdlTGlzdGVuZXIgPSBzdGFydEhhc2hDaGFuZ2VMaXN0ZW5lcihoaXN0b3J5KTtcblxuICAgIHZhciB1bmxpc3RlbiA9IGhpc3RvcnkubGlzdGVuKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB1bmxpc3RlbigpO1xuXG4gICAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wSGFzaENoYW5nZUxpc3RlbmVyKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2gobG9jYXRpb24pIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10ocXVlcnlLZXkgfHwgbG9jYXRpb24uc3RhdGUgPT0gbnVsbCwgJ1lvdSBjYW5ub3QgdXNlIHN0YXRlIHdpdGhvdXQgYSBxdWVyeUtleSBpdCB3aWxsIGJlIGRyb3BwZWQnKSA6IHVuZGVmaW5lZDtcblxuICAgIGhpc3RvcnkucHVzaChsb2NhdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiByZXBsYWNlKGxvY2F0aW9uKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKHF1ZXJ5S2V5IHx8IGxvY2F0aW9uLnN0YXRlID09IG51bGwsICdZb3UgY2Fubm90IHVzZSBzdGF0ZSB3aXRob3V0IGEgcXVlcnlLZXkgaXQgd2lsbCBiZSBkcm9wcGVkJykgOiB1bmRlZmluZWQ7XG5cbiAgICBoaXN0b3J5LnJlcGxhY2UobG9jYXRpb24pO1xuICB9XG5cbiAgdmFyIGdvSXNTdXBwb3J0ZWRXaXRob3V0UmVsb2FkID0gX0RPTVV0aWxzLnN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoKCk7XG5cbiAgZnVuY3Rpb24gZ28obikge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShnb0lzU3VwcG9ydGVkV2l0aG91dFJlbG9hZCwgJ0hhc2ggaGlzdG9yeSBnbyhuKSBjYXVzZXMgYSBmdWxsIHBhZ2UgcmVsb2FkIGluIHRoaXMgYnJvd3NlcicpIDogdW5kZWZpbmVkO1xuXG4gICAgaGlzdG9yeS5nbyhuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUhyZWYocGF0aCkge1xuICAgIHJldHVybiAnIycgKyBoaXN0b3J5LmNyZWF0ZUhyZWYocGF0aCk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vaykge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BIYXNoQ2hhbmdlTGlzdGVuZXIgPSBzdGFydEhhc2hDaGFuZ2VMaXN0ZW5lcihoaXN0b3J5KTtcblxuICAgIGhpc3RvcnkucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gdW5yZWdpc3RlclRyYW5zaXRpb25Ib29rKGhvb2spIHtcbiAgICBoaXN0b3J5LnVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKTtcblxuICAgIGlmICgtLWxpc3RlbmVyQ291bnQgPT09IDApIHN0b3BIYXNoQ2hhbmdlTGlzdGVuZXIoKTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gcHVzaFN0YXRlKHN0YXRlLCBwYXRoKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKHF1ZXJ5S2V5IHx8IHN0YXRlID09IG51bGwsICdZb3UgY2Fubm90IHVzZSBzdGF0ZSB3aXRob3V0IGEgcXVlcnlLZXkgaXQgd2lsbCBiZSBkcm9wcGVkJykgOiB1bmRlZmluZWQ7XG5cbiAgICBoaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgcGF0aCk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShxdWVyeUtleSB8fCBzdGF0ZSA9PSBudWxsLCAnWW91IGNhbm5vdCB1c2Ugc3RhdGUgd2l0aG91dCBhIHF1ZXJ5S2V5IGl0IHdpbGwgYmUgZHJvcHBlZCcpIDogdW5kZWZpbmVkO1xuXG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoc3RhdGUsIHBhdGgpO1xuICB9XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgbGlzdGVuQmVmb3JlOiBsaXN0ZW5CZWZvcmUsXG4gICAgbGlzdGVuOiBsaXN0ZW4sXG4gICAgcHVzaDogcHVzaCxcbiAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgIGdvOiBnbyxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuXG4gICAgcmVnaXN0ZXJUcmFuc2l0aW9uSG9vazogcmVnaXN0ZXJUcmFuc2l0aW9uSG9vaywgLy8gZGVwcmVjYXRlZCAtIHdhcm5pbmcgaXMgaW4gY3JlYXRlSGlzdG9yeVxuICAgIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vazogdW5yZWdpc3RlclRyYW5zaXRpb25Ib29rLCAvLyBkZXByZWNhdGVkIC0gd2FybmluZyBpcyBpbiBjcmVhdGVIaXN0b3J5XG4gICAgcHVzaFN0YXRlOiBwdXNoU3RhdGUsIC8vIGRlcHJlY2F0ZWQgLSB3YXJuaW5nIGlzIGluIGNyZWF0ZUhpc3RvcnlcbiAgICByZXBsYWNlU3RhdGU6IHJlcGxhY2VTdGF0ZSAvLyBkZXByZWNhdGVkIC0gd2FybmluZyBpcyBpbiBjcmVhdGVIaXN0b3J5XG4gIH0pO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVIYXNoSGlzdG9yeTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi9jcmVhdGVIYXNoSGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGNhblVzZURPTSA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5leHBvcnRzLmNhblVzZURPTSA9IGNhblVzZURPTTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAzNVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuYWRkRXZlbnRMaXN0ZW5lciA9IGFkZEV2ZW50TGlzdGVuZXI7XG5leHBvcnRzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xuZXhwb3J0cy5nZXRIYXNoUGF0aCA9IGdldEhhc2hQYXRoO1xuZXhwb3J0cy5yZXBsYWNlSGFzaFBhdGggPSByZXBsYWNlSGFzaFBhdGg7XG5leHBvcnRzLmdldFdpbmRvd1BhdGggPSBnZXRXaW5kb3dQYXRoO1xuZXhwb3J0cy5nbyA9IGdvO1xuZXhwb3J0cy5nZXRVc2VyQ29uZmlybWF0aW9uID0gZ2V0VXNlckNvbmZpcm1hdGlvbjtcbmV4cG9ydHMuc3VwcG9ydHNIaXN0b3J5ID0gc3VwcG9ydHNIaXN0b3J5O1xuZXhwb3J0cy5zdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCA9IHN1cHBvcnRzR29XaXRob3V0UmVsb2FkVXNpbmdIYXNoO1xuXG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50LCBsaXN0ZW5lcikge1xuICBpZiAobm9kZS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIG5vZGUuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBsaXN0ZW5lcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihub2RlLCBldmVudCwgbGlzdGVuZXIpIHtcbiAgaWYgKG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICBub2RlLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgbGlzdGVuZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEhhc2hQYXRoKCkge1xuICAvLyBXZSBjYW4ndCB1c2Ugd2luZG93LmxvY2F0aW9uLmhhc2ggaGVyZSBiZWNhdXNlIGl0J3Mgbm90XG4gIC8vIGNvbnNpc3RlbnQgYWNyb3NzIGJyb3dzZXJzIC0gRmlyZWZveCB3aWxsIHByZS1kZWNvZGUgaXQhXG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzFdIHx8ICcnO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlSGFzaFBhdGgocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgJyMnICsgcGF0aCk7XG59XG5cbmZ1bmN0aW9uIGdldFdpbmRvd1BhdGgoKSB7XG4gIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2g7XG59XG5cbmZ1bmN0aW9uIGdvKG4pIHtcbiAgaWYgKG4pIHdpbmRvdy5oaXN0b3J5LmdvKG4pO1xufVxuXG5mdW5jdGlvbiBnZXRVc2VyQ29uZmlybWF0aW9uKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKHdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIEhUTUw1IGhpc3RvcnkgQVBJIGlzIHN1cHBvcnRlZC4gVGFrZW4gZnJvbSBNb2Rlcm5penIuXG4gKlxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2hpc3RvcnkuanNcbiAqIGNoYW5nZWQgdG8gYXZvaWQgZmFsc2UgbmVnYXRpdmVzIGZvciBXaW5kb3dzIFBob25lczogaHR0cHM6Ly9naXRodWIuY29tL3JhY2t0L3JlYWN0LXJvdXRlci9pc3N1ZXMvNTg2XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNIaXN0b3J5KCkge1xuICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICBpZiAoKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpICYmIHVhLmluZGV4T2YoJ01vYmlsZSBTYWZhcmknKSAhPT0gLTEgJiYgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5oaXN0b3J5ICYmICdwdXNoU3RhdGUnIGluIHdpbmRvdy5oaXN0b3J5O1xufVxuXG4vKipcbiAqIFJldHVybnMgZmFsc2UgaWYgdXNpbmcgZ28obikgd2l0aCBoYXNoIGhpc3RvcnkgY2F1c2VzIGEgZnVsbCBwYWdlIHJlbG9hZC5cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0dvV2l0aG91dFJlbG9hZFVzaW5nSGFzaCgpIHtcbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgcmV0dXJuIHVhLmluZGV4T2YoJ0ZpcmVmb3gnKSA9PT0gLTE7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuLi9+L2hpc3RvcnkvbGliL0RPTVV0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMzVcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnNhdmVTdGF0ZSA9IHNhdmVTdGF0ZTtcbmV4cG9ydHMucmVhZFN0YXRlID0gcmVhZFN0YXRlO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG52YXIgS2V5UHJlZml4ID0gJ0BASGlzdG9yeS8nO1xudmFyIFF1b3RhRXhjZWVkZWRFcnJvciA9ICdRdW90YUV4Y2VlZGVkRXJyb3InO1xudmFyIFNlY3VyaXR5RXJyb3IgPSAnU2VjdXJpdHlFcnJvcic7XG5cbmZ1bmN0aW9uIGNyZWF0ZUtleShrZXkpIHtcbiAgcmV0dXJuIEtleVByZWZpeCArIGtleTtcbn1cblxuZnVuY3Rpb24gc2F2ZVN0YXRlKGtleSwgc3RhdGUpIHtcbiAgdHJ5IHtcbiAgICBpZiAoc3RhdGUgPT0gbnVsbCkge1xuICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oY3JlYXRlS2V5KGtleSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShjcmVhdGVLZXkoa2V5KSwgSlNPTi5zdHJpbmdpZnkoc3RhdGUpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLm5hbWUgPT09IFNlY3VyaXR5RXJyb3IpIHtcbiAgICAgIC8vIEJsb2NraW5nIGNvb2tpZXMgaW4gQ2hyb21lL0ZpcmVmb3gvU2FmYXJpIHRocm93cyBTZWN1cml0eUVycm9yIG9uIGFueVxuICAgICAgLy8gYXR0ZW1wdCB0byBhY2Nlc3Mgd2luZG93LnNlc3Npb25TdG9yYWdlLlxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnW2hpc3RvcnldIFVuYWJsZSB0byBzYXZlIHN0YXRlOyBzZXNzaW9uU3RvcmFnZSBpcyBub3QgYXZhaWxhYmxlIGR1ZSB0byBzZWN1cml0eSBzZXR0aW5ncycpIDogdW5kZWZpbmVkO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVycm9yLm5hbWUgPT09IFF1b3RhRXhjZWVkZWRFcnJvciAmJiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBTYWZhcmkgXCJwcml2YXRlIG1vZGVcIiB0aHJvd3MgUXVvdGFFeGNlZWRlZEVycm9yLlxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnW2hpc3RvcnldIFVuYWJsZSB0byBzYXZlIHN0YXRlOyBzZXNzaW9uU3RvcmFnZSBpcyBub3QgYXZhaWxhYmxlIGluIFNhZmFyaSBwcml2YXRlIG1vZGUnKSA6IHVuZGVmaW5lZDtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlYWRTdGF0ZShrZXkpIHtcbiAgdmFyIGpzb24gPSB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAganNvbiA9IHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGNyZWF0ZUtleShrZXkpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IubmFtZSA9PT0gU2VjdXJpdHlFcnJvcikge1xuICAgICAgLy8gQmxvY2tpbmcgY29va2llcyBpbiBDaHJvbWUvRmlyZWZveC9TYWZhcmkgdGhyb3dzIFNlY3VyaXR5RXJyb3Igb24gYW55XG4gICAgICAvLyBhdHRlbXB0IHRvIGFjY2VzcyB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZmFsc2UsICdbaGlzdG9yeV0gVW5hYmxlIHRvIHJlYWQgc3RhdGU7IHNlc3Npb25TdG9yYWdlIGlzIG5vdCBhdmFpbGFibGUgZHVlIHRvIHNlY3VyaXR5IHNldHRpbmdzJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlmIChqc29uKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGpzb24pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBJZ25vcmUgaW52YWxpZCBKU09OLlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi9ET01TdGF0ZVN0b3JhZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAzNVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX0V4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG52YXIgX0RPTVV0aWxzID0gcmVxdWlyZSgnLi9ET01VdGlscycpO1xuXG52YXIgX2NyZWF0ZUhpc3RvcnkgPSByZXF1aXJlKCcuL2NyZWF0ZUhpc3RvcnknKTtcblxudmFyIF9jcmVhdGVIaXN0b3J5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUhpc3RvcnkpO1xuXG5mdW5jdGlvbiBjcmVhdGVET01IaXN0b3J5KG9wdGlvbnMpIHtcbiAgdmFyIGhpc3RvcnkgPSBfY3JlYXRlSGlzdG9yeTJbJ2RlZmF1bHQnXShfZXh0ZW5kcyh7XG4gICAgZ2V0VXNlckNvbmZpcm1hdGlvbjogX0RPTVV0aWxzLmdldFVzZXJDb25maXJtYXRpb25cbiAgfSwgb3B0aW9ucywge1xuICAgIGdvOiBfRE9NVXRpbHMuZ29cbiAgfSkpO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgICFfRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UsICdET00gaGlzdG9yeSBuZWVkcyBhIERPTScpIDogX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSkgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gaGlzdG9yeS5saXN0ZW4obGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgbGlzdGVuOiBsaXN0ZW5cbiAgfSk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZURPTUhpc3Rvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvY3JlYXRlRE9NSGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG52YXIgX2RlZXBFcXVhbCA9IHJlcXVpcmUoJ2RlZXAtZXF1YWwnKTtcblxudmFyIF9kZWVwRXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVlcEVxdWFsKTtcblxudmFyIF9Bc3luY1V0aWxzID0gcmVxdWlyZSgnLi9Bc3luY1V0aWxzJyk7XG5cbnZhciBfQWN0aW9ucyA9IHJlcXVpcmUoJy4vQWN0aW9ucycpO1xuXG52YXIgX2NyZWF0ZUxvY2F0aW9uMiA9IHJlcXVpcmUoJy4vY3JlYXRlTG9jYXRpb24nKTtcblxudmFyIF9jcmVhdGVMb2NhdGlvbjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVMb2NhdGlvbjIpO1xuXG52YXIgX3J1blRyYW5zaXRpb25Ib29rID0gcmVxdWlyZSgnLi9ydW5UcmFuc2l0aW9uSG9vaycpO1xuXG52YXIgX3J1blRyYW5zaXRpb25Ib29rMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3J1blRyYW5zaXRpb25Ib29rKTtcblxudmFyIF9wYXJzZVBhdGggPSByZXF1aXJlKCcuL3BhcnNlUGF0aCcpO1xuXG52YXIgX3BhcnNlUGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJzZVBhdGgpO1xuXG52YXIgX2RlcHJlY2F0ZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlJyk7XG5cbnZhciBfZGVwcmVjYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlcHJlY2F0ZSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVJhbmRvbUtleShsZW5ndGgpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCBsZW5ndGgpO1xufVxuXG5mdW5jdGlvbiBsb2NhdGlvbnNBcmVFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhLnBhdGhuYW1lID09PSBiLnBhdGhuYW1lICYmIGEuc2VhcmNoID09PSBiLnNlYXJjaCAmJlxuICAvL2EuYWN0aW9uID09PSBiLmFjdGlvbiAmJiAvLyBEaWZmZXJlbnQgYWN0aW9uICE9PSBsb2NhdGlvbiBjaGFuZ2UuXG4gIGEua2V5ID09PSBiLmtleSAmJiBfZGVlcEVxdWFsMlsnZGVmYXVsdCddKGEuc3RhdGUsIGIuc3RhdGUpO1xufVxuXG52YXIgRGVmYXVsdEtleUxlbmd0aCA9IDY7XG5cbmZ1bmN0aW9uIGNyZWF0ZUhpc3RvcnkoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG4gIHZhciBnZXRDdXJyZW50TG9jYXRpb24gPSBvcHRpb25zLmdldEN1cnJlbnRMb2NhdGlvbjtcbiAgdmFyIGZpbmlzaFRyYW5zaXRpb24gPSBvcHRpb25zLmZpbmlzaFRyYW5zaXRpb247XG4gIHZhciBzYXZlU3RhdGUgPSBvcHRpb25zLnNhdmVTdGF0ZTtcbiAgdmFyIGdvID0gb3B0aW9ucy5nbztcbiAgdmFyIGtleUxlbmd0aCA9IG9wdGlvbnMua2V5TGVuZ3RoO1xuICB2YXIgZ2V0VXNlckNvbmZpcm1hdGlvbiA9IG9wdGlvbnMuZ2V0VXNlckNvbmZpcm1hdGlvbjtcblxuICBpZiAodHlwZW9mIGtleUxlbmd0aCAhPT0gJ251bWJlcicpIGtleUxlbmd0aCA9IERlZmF1bHRLZXlMZW5ndGg7XG5cbiAgdmFyIHRyYW5zaXRpb25Ib29rcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbkJlZm9yZShob29rKSB7XG4gICAgdHJhbnNpdGlvbkhvb2tzLnB1c2goaG9vayk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdHJhbnNpdGlvbkhvb2tzID0gdHJhbnNpdGlvbkhvb2tzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gaXRlbSAhPT0gaG9vaztcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICB2YXIgYWxsS2V5cyA9IFtdO1xuICB2YXIgY2hhbmdlTGlzdGVuZXJzID0gW107XG4gIHZhciBsb2NhdGlvbiA9IHVuZGVmaW5lZDtcblxuICBmdW5jdGlvbiBnZXRDdXJyZW50KCkge1xuICAgIGlmIChwZW5kaW5nTG9jYXRpb24gJiYgcGVuZGluZ0xvY2F0aW9uLmFjdGlvbiA9PT0gX0FjdGlvbnMuUE9QKSB7XG4gICAgICByZXR1cm4gYWxsS2V5cy5pbmRleE9mKHBlbmRpbmdMb2NhdGlvbi5rZXkpO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBhbGxLZXlzLmluZGV4T2YobG9jYXRpb24ua2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUxvY2F0aW9uKG5ld0xvY2F0aW9uKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBnZXRDdXJyZW50KCk7XG5cbiAgICBsb2NhdGlvbiA9IG5ld0xvY2F0aW9uO1xuXG4gICAgaWYgKGxvY2F0aW9uLmFjdGlvbiA9PT0gX0FjdGlvbnMuUFVTSCkge1xuICAgICAgYWxsS2V5cyA9IFtdLmNvbmNhdChhbGxLZXlzLnNsaWNlKDAsIGN1cnJlbnQgKyAxKSwgW2xvY2F0aW9uLmtleV0pO1xuICAgIH0gZWxzZSBpZiAobG9jYXRpb24uYWN0aW9uID09PSBfQWN0aW9ucy5SRVBMQUNFKSB7XG4gICAgICBhbGxLZXlzW2N1cnJlbnRdID0gbG9jYXRpb24ua2V5O1xuICAgIH1cblxuICAgIGNoYW5nZUxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgbGlzdGVuZXIobG9jYXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgY2hhbmdlTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgaWYgKGxvY2F0aW9uKSB7XG4gICAgICBsaXN0ZW5lcihsb2NhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfbG9jYXRpb24gPSBnZXRDdXJyZW50TG9jYXRpb24oKTtcbiAgICAgIGFsbEtleXMgPSBbX2xvY2F0aW9uLmtleV07XG4gICAgICB1cGRhdGVMb2NhdGlvbihfbG9jYXRpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBjaGFuZ2VMaXN0ZW5lcnMgPSBjaGFuZ2VMaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiBpdGVtICE9PSBsaXN0ZW5lcjtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjb25maXJtVHJhbnNpdGlvblRvKGxvY2F0aW9uLCBjYWxsYmFjaykge1xuICAgIF9Bc3luY1V0aWxzLmxvb3BBc3luYyh0cmFuc2l0aW9uSG9va3MubGVuZ3RoLCBmdW5jdGlvbiAoaW5kZXgsIG5leHQsIGRvbmUpIHtcbiAgICAgIF9ydW5UcmFuc2l0aW9uSG9vazJbJ2RlZmF1bHQnXSh0cmFuc2l0aW9uSG9va3NbaW5kZXhdLCBsb2NhdGlvbiwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgICAgICBkb25lKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgaWYgKGdldFVzZXJDb25maXJtYXRpb24gJiYgdHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGdldFVzZXJDb25maXJtYXRpb24obWVzc2FnZSwgZnVuY3Rpb24gKG9rKSB7XG4gICAgICAgICAgY2FsbGJhY2sob2sgIT09IGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayhtZXNzYWdlICE9PSBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB2YXIgcGVuZGluZ0xvY2F0aW9uID0gdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25UbyhuZXh0TG9jYXRpb24pIHtcbiAgICBpZiAobG9jYXRpb24gJiYgbG9jYXRpb25zQXJlRXF1YWwobG9jYXRpb24sIG5leHRMb2NhdGlvbikpIHJldHVybjsgLy8gTm90aGluZyB0byBkby5cblxuICAgIHBlbmRpbmdMb2NhdGlvbiA9IG5leHRMb2NhdGlvbjtcblxuICAgIGNvbmZpcm1UcmFuc2l0aW9uVG8obmV4dExvY2F0aW9uLCBmdW5jdGlvbiAob2spIHtcbiAgICAgIGlmIChwZW5kaW5nTG9jYXRpb24gIT09IG5leHRMb2NhdGlvbikgcmV0dXJuOyAvLyBUcmFuc2l0aW9uIHdhcyBpbnRlcnJ1cHRlZC5cblxuICAgICAgaWYgKG9rKSB7XG4gICAgICAgIC8vIHRyZWF0IFBVU0ggdG8gY3VycmVudCBwYXRoIGxpa2UgUkVQTEFDRSB0byBiZSBjb25zaXN0ZW50IHdpdGggYnJvd3NlcnNcbiAgICAgICAgaWYgKG5leHRMb2NhdGlvbi5hY3Rpb24gPT09IF9BY3Rpb25zLlBVU0gpIHtcbiAgICAgICAgICB2YXIgcHJldlBhdGggPSBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgICAgICAgICB2YXIgbmV4dFBhdGggPSBjcmVhdGVQYXRoKG5leHRMb2NhdGlvbik7XG5cbiAgICAgICAgICBpZiAobmV4dFBhdGggPT09IHByZXZQYXRoICYmIF9kZWVwRXF1YWwyWydkZWZhdWx0J10obG9jYXRpb24uc3RhdGUsIG5leHRMb2NhdGlvbi5zdGF0ZSkpIG5leHRMb2NhdGlvbi5hY3Rpb24gPSBfQWN0aW9ucy5SRVBMQUNFO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbmlzaFRyYW5zaXRpb24obmV4dExvY2F0aW9uKSAhPT0gZmFsc2UpIHVwZGF0ZUxvY2F0aW9uKG5leHRMb2NhdGlvbik7XG4gICAgICB9IGVsc2UgaWYgKGxvY2F0aW9uICYmIG5leHRMb2NhdGlvbi5hY3Rpb24gPT09IF9BY3Rpb25zLlBPUCkge1xuICAgICAgICB2YXIgcHJldkluZGV4ID0gYWxsS2V5cy5pbmRleE9mKGxvY2F0aW9uLmtleSk7XG4gICAgICAgIHZhciBuZXh0SW5kZXggPSBhbGxLZXlzLmluZGV4T2YobmV4dExvY2F0aW9uLmtleSk7XG5cbiAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEgJiYgbmV4dEluZGV4ICE9PSAtMSkgZ28ocHJldkluZGV4IC0gbmV4dEluZGV4KTsgLy8gUmVzdG9yZSB0aGUgVVJMLlxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcHVzaChsb2NhdGlvbikge1xuICAgIHRyYW5zaXRpb25UbyhjcmVhdGVMb2NhdGlvbihsb2NhdGlvbiwgX0FjdGlvbnMuUFVTSCwgY3JlYXRlS2V5KCkpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcGxhY2UobG9jYXRpb24pIHtcbiAgICB0cmFuc2l0aW9uVG8oY3JlYXRlTG9jYXRpb24obG9jYXRpb24sIF9BY3Rpb25zLlJFUExBQ0UsIGNyZWF0ZUtleSgpKSk7XG4gIH1cblxuICBmdW5jdGlvbiBnb0JhY2soKSB7XG4gICAgZ28oLTEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ29Gb3J3YXJkKCkge1xuICAgIGdvKDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlS2V5KCkge1xuICAgIHJldHVybiBjcmVhdGVSYW5kb21LZXkoa2V5TGVuZ3RoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVBhdGgobG9jYXRpb24pIHtcbiAgICBpZiAobG9jYXRpb24gPT0gbnVsbCB8fCB0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKSByZXR1cm4gbG9jYXRpb247XG5cbiAgICB2YXIgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoO1xuICAgIHZhciBoYXNoID0gbG9jYXRpb24uaGFzaDtcblxuICAgIHZhciByZXN1bHQgPSBwYXRobmFtZTtcblxuICAgIGlmIChzZWFyY2gpIHJlc3VsdCArPSBzZWFyY2g7XG5cbiAgICBpZiAoaGFzaCkgcmVzdWx0ICs9IGhhc2g7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSHJlZihsb2NhdGlvbikge1xuICAgIHJldHVybiBjcmVhdGVQYXRoKGxvY2F0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uLCBhY3Rpb24pIHtcbiAgICB2YXIga2V5ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gY3JlYXRlS2V5KCkgOiBhcmd1bWVudHNbMl07XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBfd2FybmluZzJbJ2RlZmF1bHQnXShmYWxzZSwgJ1RoZSBzdGF0ZSAoMm5kKSBhcmd1bWVudCB0byBoaXN0b3J5LmNyZWF0ZUxvY2F0aW9uIGlzIGRlcHJlY2F0ZWQ7IHVzZSBhICcgKyAnbG9jYXRpb24gZGVzY3JpcHRvciBpbnN0ZWFkJykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICdzdHJpbmcnKSBsb2NhdGlvbiA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10obG9jYXRpb24pO1xuXG4gICAgICBsb2NhdGlvbiA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbiwgeyBzdGF0ZTogYWN0aW9uIH0pO1xuXG4gICAgICBhY3Rpb24gPSBrZXk7XG4gICAgICBrZXkgPSBhcmd1bWVudHNbM10gfHwgY3JlYXRlS2V5KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9jcmVhdGVMb2NhdGlvbjNbJ2RlZmF1bHQnXShsb2NhdGlvbiwgYWN0aW9uLCBrZXkpO1xuICB9XG5cbiAgLy8gZGVwcmVjYXRlZFxuICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIGlmIChsb2NhdGlvbikge1xuICAgICAgdXBkYXRlTG9jYXRpb25TdGF0ZShsb2NhdGlvbiwgc3RhdGUpO1xuICAgICAgdXBkYXRlTG9jYXRpb24obG9jYXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVMb2NhdGlvblN0YXRlKGdldEN1cnJlbnRMb2NhdGlvbigpLCBzdGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYXRpb25TdGF0ZShsb2NhdGlvbiwgc3RhdGUpIHtcbiAgICBsb2NhdGlvbi5zdGF0ZSA9IF9leHRlbmRzKHt9LCBsb2NhdGlvbi5zdGF0ZSwgc3RhdGUpO1xuICAgIHNhdmVTdGF0ZShsb2NhdGlvbi5rZXksIGxvY2F0aW9uLnN0YXRlKTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaWYgKHRyYW5zaXRpb25Ib29rcy5pbmRleE9mKGhvb2spID09PSAtMSkgdHJhbnNpdGlvbkhvb2tzLnB1c2goaG9vayk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgdHJhbnNpdGlvbkhvb2tzID0gdHJhbnNpdGlvbkhvb2tzLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0gIT09IGhvb2s7XG4gICAgfSk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHB1c2hTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgcHVzaChfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoKSk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHBhdGggPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgcmVwbGFjZShfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoKSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGxpc3RlbkJlZm9yZTogbGlzdGVuQmVmb3JlLFxuICAgIGxpc3RlbjogbGlzdGVuLFxuICAgIHRyYW5zaXRpb25UbzogdHJhbnNpdGlvblRvLFxuICAgIHB1c2g6IHB1c2gsXG4gICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICBnbzogZ28sXG4gICAgZ29CYWNrOiBnb0JhY2ssXG4gICAgZ29Gb3J3YXJkOiBnb0ZvcndhcmQsXG4gICAgY3JlYXRlS2V5OiBjcmVhdGVLZXksXG4gICAgY3JlYXRlUGF0aDogY3JlYXRlUGF0aCxcbiAgICBjcmVhdGVIcmVmOiBjcmVhdGVIcmVmLFxuICAgIGNyZWF0ZUxvY2F0aW9uOiBjcmVhdGVMb2NhdGlvbixcblxuICAgIHNldFN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHNldFN0YXRlLCAnc2V0U3RhdGUgaXMgZGVwcmVjYXRlZDsgdXNlIGxvY2F0aW9uLmtleSB0byBzYXZlIHN0YXRlIGluc3RlYWQnKSxcbiAgICByZWdpc3RlclRyYW5zaXRpb25Ib29rOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHJlZ2lzdGVyVHJhbnNpdGlvbkhvb2ssICdyZWdpc3RlclRyYW5zaXRpb25Ib29rIGlzIGRlcHJlY2F0ZWQ7IHVzZSBsaXN0ZW5CZWZvcmUgaW5zdGVhZCcpLFxuICAgIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vazogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXSh1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2ssICd1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2sgaXMgZGVwcmVjYXRlZDsgdXNlIHRoZSBjYWxsYmFjayByZXR1cm5lZCBmcm9tIGxpc3RlbkJlZm9yZSBpbnN0ZWFkJyksXG4gICAgcHVzaFN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHB1c2hTdGF0ZSwgJ3B1c2hTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgcHVzaCBpbnN0ZWFkJyksXG4gICAgcmVwbGFjZVN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHJlcGxhY2VTdGF0ZSwgJ3JlcGxhY2VTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgcmVwbGFjZSBpbnN0ZWFkJylcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlSGlzdG9yeTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi9jcmVhdGVIaXN0b3J5LmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMzVcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbnZhciBfQWN0aW9ucyA9IHJlcXVpcmUoJy4vQWN0aW9ucycpO1xuXG52YXIgX3BhcnNlUGF0aCA9IHJlcXVpcmUoJy4vcGFyc2VQYXRoJyk7XG5cbnZhciBfcGFyc2VQYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcnNlUGF0aCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKCkge1xuICB2YXIgbG9jYXRpb24gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyAnLycgOiBhcmd1bWVudHNbMF07XG4gIHZhciBhY3Rpb24gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBfQWN0aW9ucy5QT1AgOiBhcmd1bWVudHNbMV07XG4gIHZhciBrZXkgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzJdO1xuXG4gIHZhciBfZm91cnRoQXJnID0gYXJndW1lbnRzLmxlbmd0aCA8PSAzIHx8IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1szXTtcblxuICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJykgbG9jYXRpb24gPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKGxvY2F0aW9uKTtcblxuICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ29iamVjdCcpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX3dhcm5pbmcyWydkZWZhdWx0J10oZmFsc2UsICdUaGUgc3RhdGUgKDJuZCkgYXJndW1lbnQgdG8gY3JlYXRlTG9jYXRpb24gaXMgZGVwcmVjYXRlZDsgdXNlIGEgJyArICdsb2NhdGlvbiBkZXNjcmlwdG9yIGluc3RlYWQnKSA6IHVuZGVmaW5lZDtcblxuICAgIGxvY2F0aW9uID0gX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7IHN0YXRlOiBhY3Rpb24gfSk7XG5cbiAgICBhY3Rpb24gPSBrZXkgfHwgX0FjdGlvbnMuUE9QO1xuICAgIGtleSA9IF9mb3VydGhBcmc7XG4gIH1cblxuICB2YXIgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZSB8fCAnLyc7XG4gIHZhciBzZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2ggfHwgJyc7XG4gIHZhciBoYXNoID0gbG9jYXRpb24uaGFzaCB8fCAnJztcbiAgdmFyIHN0YXRlID0gbG9jYXRpb24uc3RhdGUgfHwgbnVsbDtcblxuICByZXR1cm4ge1xuICAgIHBhdGhuYW1lOiBwYXRobmFtZSxcbiAgICBzZWFyY2g6IHNlYXJjaCxcbiAgICBoYXNoOiBoYXNoLFxuICAgIHN0YXRlOiBzdGF0ZSxcbiAgICBhY3Rpb246IGFjdGlvbixcbiAgICBrZXk6IGtleVxuICB9O1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVMb2NhdGlvbjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L2xpYi9jcmVhdGVMb2NhdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwidmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi9saWIva2V5cy5qcycpO1xudmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9saWIvaXNfYXJndW1lbnRzLmpzJyk7XG5cbnZhciBkZWVwRXF1YWwgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKSB7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIERhdGUgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAvLyA3LjMuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQgfHwgdHlwZW9mIGFjdHVhbCAhPSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwZWN0ZWQgIT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3B0cy5zdHJpY3QgPyBhY3R1YWwgPT09IGV4cGVjdGVkIDogYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIDcuNC4gRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcbiAgLy8gd2l0aCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwpLCB0aGUgc2FtZSBzZXQgb2Yga2V5c1xuICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG4gIC8vIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZE9yTnVsbCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKHgpIHtcbiAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgeC5sZW5ndGggIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgeC5jb3B5ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB4LnNsaWNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA+IDAgJiYgdHlwZW9mIHhbMF0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBvcHRzKSB7XG4gIHZhciBpLCBrZXk7XG4gIGlmIChpc1VuZGVmaW5lZE9yTnVsbChhKSB8fCBpc1VuZGVmaW5lZE9yTnVsbChiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICAvL35+fkkndmUgbWFuYWdlZCB0byBicmVhayBPYmplY3Qua2V5cyB0aHJvdWdoIHNjcmV3eSBhcmd1bWVudHMgcGFzc2luZy5cbiAgLy8gICBDb252ZXJ0aW5nIHRvIGFycmF5IHNvbHZlcyB0aGUgcHJvYmxlbS5cbiAgaWYgKGlzQXJndW1lbnRzKGEpKSB7XG4gICAgaWYgKCFpc0FyZ3VtZW50cyhiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYiwgb3B0cyk7XG4gIH1cbiAgaWYgKGlzQnVmZmVyKGEpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRyeSB7XG4gICAgdmFyIGthID0gb2JqZWN0S2V5cyhhKSxcbiAgICAgICAga2IgPSBvYmplY3RLZXlzKGIpO1xuICB9IGNhdGNoIChlKSB7Ly9oYXBwZW5zIHdoZW4gb25lIGlzIGEgc3RyaW5nIGxpdGVyYWwgYW5kIHRoZSBvdGhlciBpc24ndFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9IGtiLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG4gIGthLnNvcnQoKTtcbiAga2Iuc29ydCgpO1xuICAvL35+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9IGtiW2ldKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFkZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIG9wdHMpKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBhID09PSB0eXBlb2YgYjtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L34vZGVlcC1lcXVhbC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nXG4gID8gT2JqZWN0LmtleXMgOiBzaGltO1xuXG5leHBvcnRzLnNoaW0gPSBzaGltO1xuZnVuY3Rpb24gc2hpbSAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIGtleXMucHVzaChrZXkpO1xuICByZXR1cm4ga2V5cztcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L34vZGVlcC1lcXVhbC9saWIva2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwidmFyIHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPSAoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHMpXG59KSgpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID8gc3VwcG9ydGVkIDogdW5zdXBwb3J0ZWQ7XG5cbmV4cG9ydHMuc3VwcG9ydGVkID0gc3VwcG9ydGVkO1xuZnVuY3Rpb24gc3VwcG9ydGVkKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG59O1xuXG5leHBvcnRzLnVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG5mdW5jdGlvbiB1bnN1cHBvcnRlZChvYmplY3Qpe1xuICByZXR1cm4gb2JqZWN0ICYmXG4gICAgdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJlxuICAgIHR5cGVvZiBvYmplY3QubGVuZ3RoID09ICdudW1iZXInICYmXG4gICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpICYmXG4gICAgIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsICdjYWxsZWUnKSB8fFxuICAgIGZhbHNlO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi4vfi9oaXN0b3J5L34vZGVlcC1lcXVhbC9saWIvaXNfYXJndW1lbnRzLmpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMzVcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMubG9vcEFzeW5jID0gbG9vcEFzeW5jO1xuXG5mdW5jdGlvbiBsb29wQXN5bmModHVybnMsIHdvcmssIGNhbGxiYWNrKSB7XG4gIHZhciBjdXJyZW50VHVybiA9IDA7XG4gIHZhciBpc0RvbmUgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBkb25lKCkge1xuICAgIGlzRG9uZSA9IHRydWU7XG4gICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgaWYgKGlzRG9uZSkgcmV0dXJuO1xuXG4gICAgaWYgKGN1cnJlbnRUdXJuIDwgdHVybnMpIHtcbiAgICAgIHdvcmsuY2FsbCh0aGlzLCBjdXJyZW50VHVybisrLCBuZXh0LCBkb25lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIG5leHQoKTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvQXN5bmNVdGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwiaW1wb3J0IHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXHJcblxyXG5jb25zdCB7IGZ1bmMsIG9iamVjdCwgYXJyYXlPZiwgb25lT2ZUeXBlLCBlbGVtZW50LCBzaGFwZSwgc3RyaW5nIH0gPSBQcm9wVHlwZXNcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmYWxzeShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcclxuICBpZiAocHJvcHNbcHJvcE5hbWVdKVxyXG4gICAgcmV0dXJuIG5ldyBFcnJvcihgPCR7Y29tcG9uZW50TmFtZX0+IHNob3VsZCBub3QgaGF2ZSBhIFwiJHtwcm9wTmFtZX1cIiBwcm9wYClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGhpc3RvcnkgPSBzaGFwZSh7XHJcbiAgbGlzdGVuOiBmdW5jLmlzUmVxdWlyZWQsXHJcbiAgcHVzaFN0YXRlOiBmdW5jLmlzUmVxdWlyZWQsXHJcbiAgcmVwbGFjZVN0YXRlOiBmdW5jLmlzUmVxdWlyZWQsXHJcbiAgZ286IGZ1bmMuaXNSZXF1aXJlZFxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IGxvY2F0aW9uID0gc2hhcGUoe1xyXG4gIHBhdGhuYW1lOiBzdHJpbmcuaXNSZXF1aXJlZCxcclxuICBzZWFyY2g6IHN0cmluZy5pc1JlcXVpcmVkLFxyXG4gIHN0YXRlOiBvYmplY3QsXHJcbiAgYWN0aW9uOiBzdHJpbmcuaXNSZXF1aXJlZCxcclxuICBrZXk6IHN0cmluZ1xyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudCA9IG9uZU9mVHlwZShbIGZ1bmMsIHN0cmluZyBdKVxyXG5leHBvcnQgY29uc3QgY29tcG9uZW50cyA9IG9uZU9mVHlwZShbIGNvbXBvbmVudCwgb2JqZWN0IF0pXHJcbmV4cG9ydCBjb25zdCByb3V0ZSA9IG9uZU9mVHlwZShbIG9iamVjdCwgZWxlbWVudCBdKVxyXG5leHBvcnQgY29uc3Qgcm91dGVzID0gb25lT2ZUeXBlKFsgcm91dGUsIGFycmF5T2Yocm91dGUpIF0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZmFsc3ksXHJcbiAgaGlzdG9yeSxcclxuICBsb2NhdGlvbixcclxuICBjb21wb25lbnQsXHJcbiAgY29tcG9uZW50cyxcclxuICByb3V0ZVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9Qcm9wVHlwZXMuanNcbiAqKi8iLCJpbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCdcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuaW1wb3J0IGRlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMgZnJvbSAnLi9kZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzJ1xyXG5pbXBvcnQgZ2V0Um91dGVQYXJhbXMgZnJvbSAnLi9nZXRSb3V0ZVBhcmFtcydcclxuaW1wb3J0IHsgaXNSZWFjdENoaWxkcmVuIH0gZnJvbSAnLi9Sb3V0ZVV0aWxzJ1xyXG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3dhcm5pbmcnXHJcblxyXG5jb25zdCB7IGFycmF5LCBmdW5jLCBvYmplY3QgfSA9IFJlYWN0LlByb3BUeXBlc1xyXG5cclxuLyoqXHJcbiAqIEEgPFJvdXRlckNvbnRleHQ+IHJlbmRlcnMgdGhlIGNvbXBvbmVudCB0cmVlIGZvciBhIGdpdmVuIHJvdXRlciBzdGF0ZVxyXG4gKiBhbmQgc2V0cyB0aGUgaGlzdG9yeSBvYmplY3QgYW5kIHRoZSBjdXJyZW50IGxvY2F0aW9uIGluIGNvbnRleHQuXHJcbiAqL1xyXG5jb25zdCBSb3V0ZXJDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGhpc3Rvcnk6IG9iamVjdCxcclxuICAgIHJvdXRlcjogb2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICBsb2NhdGlvbjogb2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICByb3V0ZXM6IGFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICBwYXJhbXM6IG9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgY29tcG9uZW50czogYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmMuaXNSZXF1aXJlZFxyXG4gIH0sXHJcblxyXG4gIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNyZWF0ZUVsZW1lbnQ6IFJlYWN0LmNyZWF0ZUVsZW1lbnRcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBjaGlsZENvbnRleHRUeXBlczoge1xyXG4gICAgaGlzdG9yeTogb2JqZWN0LFxyXG4gICAgbG9jYXRpb246IG9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgcm91dGVyOiBvYmplY3QuaXNSZXF1aXJlZFxyXG4gIH0sXHJcblxyXG4gIGdldENoaWxkQ29udGV4dCgpIHtcclxuICAgIGxldCB7IHJvdXRlciwgaGlzdG9yeSwgbG9jYXRpb24gfSA9IHRoaXMucHJvcHNcclxuICAgIGlmICghcm91dGVyKSB7XHJcbiAgICAgIHdhcm5pbmcoZmFsc2UsICdgPFJvdXRlckNvbnRleHQ+YCBleHBlY3RzIGEgYHJvdXRlcmAgcmF0aGVyIHRoYW4gYSBgaGlzdG9yeWAnKVxyXG5cclxuICAgICAgcm91dGVyID0ge1xyXG4gICAgICAgIC4uLmhpc3RvcnksXHJcbiAgICAgICAgc2V0Um91dGVMZWF2ZUhvb2s6IGhpc3RvcnkubGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlXHJcbiAgICAgIH1cclxuICAgICAgZGVsZXRlIHJvdXRlci5saXN0ZW5CZWZvcmVMZWF2aW5nUm91dGVcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX19ERVZfXykge1xyXG4gICAgICBsb2NhdGlvbiA9IGRlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMobG9jYXRpb24sICdgY29udGV4dC5sb2NhdGlvbmAgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBhIHJvdXRlIGNvbXBvbmVudFxcJ3MgYHByb3BzLmxvY2F0aW9uYCBpbnN0ZWFkLiBodHRwOi8vdGlueS5jYy9yb3V0ZXItYWNjZXNzaW5nbG9jYXRpb24nKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGhpc3RvcnksIGxvY2F0aW9uLCByb3V0ZXIgfVxyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBwcm9wcykge1xyXG4gICAgcmV0dXJuIGNvbXBvbmVudCA9PSBudWxsID8gbnVsbCA6IHRoaXMucHJvcHMuY3JlYXRlRWxlbWVudChjb21wb25lbnQsIHByb3BzKVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgaGlzdG9yeSwgbG9jYXRpb24sIHJvdXRlcywgcGFyYW1zLCBjb21wb25lbnRzIH0gPSB0aGlzLnByb3BzXHJcbiAgICBsZXQgZWxlbWVudCA9IG51bGxcclxuXHJcbiAgICBpZiAoY29tcG9uZW50cykge1xyXG4gICAgICBlbGVtZW50ID0gY29tcG9uZW50cy5yZWR1Y2VSaWdodCgoZWxlbWVudCwgY29tcG9uZW50cywgaW5kZXgpID0+IHtcclxuICAgICAgICBpZiAoY29tcG9uZW50cyA9PSBudWxsKVxyXG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQgLy8gRG9uJ3QgY3JlYXRlIG5ldyBjaGlsZHJlbjsgdXNlIHRoZSBncmFuZGNoaWxkcmVuLlxyXG5cclxuICAgICAgICBjb25zdCByb3V0ZSA9IHJvdXRlc1tpbmRleF1cclxuICAgICAgICBjb25zdCByb3V0ZVBhcmFtcyA9IGdldFJvdXRlUGFyYW1zKHJvdXRlLCBwYXJhbXMpXHJcbiAgICAgICAgY29uc3QgcHJvcHMgPSB7XHJcbiAgICAgICAgICBoaXN0b3J5LFxyXG4gICAgICAgICAgbG9jYXRpb24sXHJcbiAgICAgICAgICBwYXJhbXMsXHJcbiAgICAgICAgICByb3V0ZSxcclxuICAgICAgICAgIHJvdXRlUGFyYW1zLFxyXG4gICAgICAgICAgcm91dGVzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNSZWFjdENoaWxkcmVuKGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICBwcm9wcy5jaGlsZHJlbiA9IGVsZW1lbnRcclxuICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZWxlbWVudClcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaGFzT3duUHJvcGVydHkocHJvcCkpXHJcbiAgICAgICAgICAgICAgcHJvcHNbcHJvcF0gPSBlbGVtZW50W3Byb3BdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IHt9XHJcblxyXG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29tcG9uZW50cykge1xyXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgLy8gUGFzcyB0aHJvdWdoIHRoZSBrZXkgYXMgYSBwcm9wIHRvIGNyZWF0ZUVsZW1lbnQgdG8gYWxsb3dcclxuICAgICAgICAgICAgICAvLyBjdXN0b20gY3JlYXRlRWxlbWVudCBmdW5jdGlvbnMgdG8ga25vdyB3aGljaCBuYW1lZCBjb21wb25lbnRcclxuICAgICAgICAgICAgICAvLyB0aGV5J3JlIHJlbmRlcmluZywgZm9yIGUuZy4gbWF0Y2hpbmcgdXAgdG8gZmV0Y2hlZCBkYXRhLlxyXG4gICAgICAgICAgICAgIGVsZW1lbnRzW2tleV0gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50c1trZXldLCB7XHJcbiAgICAgICAgICAgICAgICBrZXksIC4uLnByb3BzXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiBlbGVtZW50c1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRWxlbWVudChjb21wb25lbnRzLCBwcm9wcylcclxuICAgICAgfSwgZWxlbWVudClcclxuICAgIH1cclxuXHJcbiAgICBpbnZhcmlhbnQoXHJcbiAgICAgIGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gZmFsc2UgfHwgUmVhY3QuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCksXHJcbiAgICAgICdUaGUgcm9vdCByb3V0ZSBtdXN0IHJlbmRlciBhIHNpbmdsZSBlbGVtZW50J1xyXG4gICAgKVxyXG5cclxuICAgIHJldHVybiBlbGVtZW50XHJcbiAgfVxyXG5cclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvdXRlckNvbnRleHRcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRlckNvbnRleHQuanNcbiAqKi8iLCIvKmVzbGludCBuby1lbXB0eTogMCovXHJcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vd2FybmluZydcclxuXHJcbmxldCB1c2VNZW1icmFuZSA9IGZhbHNlXHJcblxyXG5pZiAoX19ERVZfXykge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAneCcsIHsgZ2V0KCkgeyByZXR1cm4gdHJ1ZSB9IH0pLngpIHtcclxuICAgICAgdXNlTWVtYnJhbmUgPSB0cnVlXHJcbiAgICB9XHJcbiAgfSBjYXRjaChlKSB7IH1cclxufVxyXG5cclxuLy8gd3JhcHMgYW4gb2JqZWN0IGluIGEgbWVtYnJhbmUgdG8gd2FybiBhYm91dCBkZXByZWNhdGVkIHByb3BlcnR5IGFjY2Vzc1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXByZWNhdGVPYmplY3RQcm9wZXJ0aWVzKG9iamVjdCwgbWVzc2FnZSkge1xyXG4gIGlmICghdXNlTWVtYnJhbmUpXHJcbiAgICByZXR1cm4gb2JqZWN0XHJcblxyXG4gIGNvbnN0IG1lbWJyYW5lID0ge31cclxuXHJcbiAgZm9yIChsZXQgcHJvcCBpbiBvYmplY3QpIHtcclxuICAgIGlmICh0eXBlb2Ygb2JqZWN0W3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG1lbWJyYW5lW3Byb3BdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHdhcm5pbmcoZmFsc2UsIG1lc3NhZ2UpXHJcbiAgICAgICAgcmV0dXJuIG9iamVjdFtwcm9wXS5hcHBseShvYmplY3QsIGFyZ3VtZW50cylcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1lbWJyYW5lLCBwcm9wLCB7XHJcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCBtZXNzYWdlKVxyXG4gICAgICAgICAgcmV0dXJuIG9iamVjdFtwcm9wXVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBtZW1icmFuZVxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvZGVwcmVjYXRlT2JqZWN0UHJvcGVydGllcy5qc1xuICoqLyIsImltcG9ydCB7IGdldFBhcmFtTmFtZXMgfSBmcm9tICcuL1BhdHRlcm5VdGlscydcclxuXHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBhbiBvYmplY3Qgb2YgcGFyYW1zIHRoZSBnaXZlbiByb3V0ZSBjYXJlcyBhYm91dCBmcm9tXHJcbiAqIHRoZSBnaXZlbiBwYXJhbXMgb2JqZWN0LlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Um91dGVQYXJhbXMocm91dGUsIHBhcmFtcykge1xyXG4gIGNvbnN0IHJvdXRlUGFyYW1zID0ge31cclxuXHJcbiAgaWYgKCFyb3V0ZS5wYXRoKVxyXG4gICAgcmV0dXJuIHJvdXRlUGFyYW1zXHJcblxyXG4gIGNvbnN0IHBhcmFtTmFtZXMgPSBnZXRQYXJhbU5hbWVzKHJvdXRlLnBhdGgpXHJcblxyXG4gIGZvciAoY29uc3QgcCBpbiBwYXJhbXMpXHJcbiAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KHApICYmIHBhcmFtTmFtZXMuaW5kZXhPZihwKSAhPT0gLTEpXHJcbiAgICAgIHJvdXRlUGFyYW1zW3BdID0gcGFyYW1zW3BdXHJcblxyXG4gIHJldHVybiByb3V0ZVBhcmFtc1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRSb3V0ZVBhcmFtc1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvZ2V0Um91dGVQYXJhbXMuanNcbiAqKi8iLCJpbXBvcnQgZGVwcmVjYXRlT2JqZWN0UHJvcGVydGllcyBmcm9tICcuL2RlcHJlY2F0ZU9iamVjdFByb3BlcnRpZXMnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUm91dGVyT2JqZWN0KGhpc3RvcnksIHRyYW5zaXRpb25NYW5hZ2VyKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLmhpc3RvcnksXHJcbiAgICBzZXRSb3V0ZUxlYXZlSG9vazogdHJhbnNpdGlvbk1hbmFnZXIubGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlLFxyXG4gICAgaXNBY3RpdmU6IHRyYW5zaXRpb25NYW5hZ2VyLmlzQWN0aXZlXHJcbiAgfVxyXG59XHJcblxyXG4vLyBkZXByZWNhdGVkXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb3V0aW5nSGlzdG9yeShoaXN0b3J5LCB0cmFuc2l0aW9uTWFuYWdlcikge1xyXG4gIGhpc3RvcnkgPSB7XHJcbiAgICAuLi5oaXN0b3J5LFxyXG4gICAgLi4udHJhbnNpdGlvbk1hbmFnZXJcclxuICB9XHJcblxyXG4gIGlmIChfX0RFVl9fKSB7XHJcbiAgICBoaXN0b3J5ID0gZGVwcmVjYXRlT2JqZWN0UHJvcGVydGllcyhcclxuICAgICAgaGlzdG9yeSxcclxuICAgICAgJ2Bwcm9wcy5oaXN0b3J5YCBhbmQgYGNvbnRleHQuaGlzdG9yeWAgYXJlIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgYGNvbnRleHQucm91dGVyYC4gaHR0cDovL3RpbnkuY2Mvcm91dGVyLWNvbnRleHRjaGFuZ2VzJ1xyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGhpc3RvcnlcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvUm91dGVyVXRpbHMuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vd2FybmluZydcclxuXHJcbmNvbnN0IHsgYm9vbCwgb2JqZWN0LCBzdHJpbmcsIGZ1bmMsIG9uZU9mVHlwZSB9ID0gUmVhY3QuUHJvcFR5cGVzXHJcblxyXG5mdW5jdGlvbiBpc0xlZnRDbGlja0V2ZW50KGV2ZW50KSB7XHJcbiAgcmV0dXJuIGV2ZW50LmJ1dHRvbiA9PT0gMFxyXG59XHJcblxyXG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHtcclxuICByZXR1cm4gISEoZXZlbnQubWV0YUtleSB8fCBldmVudC5hbHRLZXkgfHwgZXZlbnQuY3RybEtleSB8fCBldmVudC5zaGlmdEtleSlcclxufVxyXG5cclxuZnVuY3Rpb24gaXNFbXB0eU9iamVjdChvYmplY3QpIHtcclxuICBmb3IgKGxldCBwIGluIG9iamVjdClcclxuICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkocCkpXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICByZXR1cm4gdHJ1ZVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMb2NhdGlvbkRlc2NyaXB0b3IoeyB0bywgcXVlcnksIGhhc2gsIHN0YXRlIH0pIHtcclxuICBpZiAodHlwZW9mIHRvICE9PSAnb2JqZWN0Jykge1xyXG4gICAgcmV0dXJuIHsgcGF0aG5hbWU6IHRvLCBxdWVyeSwgaGFzaCwgc3RhdGUgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm57IHF1ZXJ5LCBoYXNoLCBzdGF0ZSwgLi4udG8gfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEEgPExpbms+IGlzIHVzZWQgdG8gY3JlYXRlIGFuIDxhPiBlbGVtZW50IHRoYXQgbGlua3MgdG8gYSByb3V0ZS5cclxuICogV2hlbiB0aGF0IHJvdXRlIGlzIGFjdGl2ZSwgdGhlIGxpbmsgZ2V0cyB0aGUgdmFsdWUgb2YgaXRzXHJcbiAqIGFjdGl2ZUNsYXNzTmFtZSBwcm9wLlxyXG4gKlxyXG4gKiBGb3IgZXhhbXBsZSwgYXNzdW1pbmcgeW91IGhhdmUgdGhlIGZvbGxvd2luZyByb3V0ZTpcclxuICpcclxuICogICA8Um91dGUgcGF0aD1cIi9wb3N0cy86cG9zdElEXCIgY29tcG9uZW50PXtQb3N0fSAvPlxyXG4gKlxyXG4gKiBZb3UgY291bGQgdXNlIHRoZSBmb2xsb3dpbmcgY29tcG9uZW50IHRvIGxpbmsgdG8gdGhhdCByb3V0ZTpcclxuICpcclxuICogICA8TGluayB0bz17YC9wb3N0cy8ke3Bvc3QuaWR9YH0gLz5cclxuICpcclxuICogTGlua3MgbWF5IHBhc3MgYWxvbmcgbG9jYXRpb24gc3RhdGUgYW5kL29yIHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzXHJcbiAqIGluIHRoZSBzdGF0ZS9xdWVyeSBwcm9wcywgcmVzcGVjdGl2ZWx5LlxyXG4gKlxyXG4gKiAgIDxMaW5rIC4uLiBxdWVyeT17eyBzaG93OiB0cnVlIH19IHN0YXRlPXt7IHRoZTogJ3N0YXRlJyB9fSAvPlxyXG4gKi9cclxuY29uc3QgTGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgY29udGV4dFR5cGVzOiB7XHJcbiAgICByb3V0ZXI6IG9iamVjdFxyXG4gIH0sXHJcblxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgdG86IG9uZU9mVHlwZShbIHN0cmluZywgb2JqZWN0IF0pLmlzUmVxdWlyZWQsXHJcbiAgICBxdWVyeTogb2JqZWN0LFxyXG4gICAgaGFzaDogc3RyaW5nLFxyXG4gICAgc3RhdGU6IG9iamVjdCxcclxuICAgIGFjdGl2ZVN0eWxlOiBvYmplY3QsXHJcbiAgICBhY3RpdmVDbGFzc05hbWU6IHN0cmluZyxcclxuICAgIG9ubHlBY3RpdmVPbkluZGV4OiBib29sLmlzUmVxdWlyZWQsXHJcbiAgICBvbkNsaWNrOiBmdW5jXHJcbiAgfSxcclxuXHJcbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb25seUFjdGl2ZU9uSW5kZXg6IGZhbHNlLFxyXG4gICAgICBjbGFzc05hbWU6ICcnLFxyXG4gICAgICBzdHlsZToge31cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBoYW5kbGVDbGljayhldmVudCkge1xyXG4gICAgbGV0IGFsbG93VHJhbnNpdGlvbiA9IHRydWVcclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrKVxyXG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2soZXZlbnQpXHJcblxyXG4gICAgaWYgKGlzTW9kaWZpZWRFdmVudChldmVudCkgfHwgIWlzTGVmdENsaWNrRXZlbnQoZXZlbnQpKVxyXG4gICAgICByZXR1cm5cclxuXHJcbiAgICBpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCA9PT0gdHJ1ZSlcclxuICAgICAgYWxsb3dUcmFuc2l0aW9uID0gZmFsc2VcclxuXHJcbiAgICAvLyBJZiB0YXJnZXQgcHJvcCBpcyBzZXQgKGUuZy4gdG8gXCJfYmxhbmtcIikgbGV0IGJyb3dzZXIgaGFuZGxlIGxpbmsuXHJcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWY6IHVudGVzdGFibGUgd2l0aCBLYXJtYSAqL1xyXG4gICAgaWYgKHRoaXMucHJvcHMudGFyZ2V0KSB7XHJcbiAgICAgIGlmICghYWxsb3dUcmFuc2l0aW9uKVxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICBpZiAoYWxsb3dUcmFuc2l0aW9uKSB7XHJcbiAgICAgIGxldCB7IHN0YXRlLCB0bywgcXVlcnksIGhhc2ggfSA9IHRoaXMucHJvcHNcclxuXHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb25EZXNjcmlwdG9yKHsgdG8sIHF1ZXJ5LCBoYXNoLCBzdGF0ZSB9KVxyXG5cclxuICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGxvY2F0aW9uKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgdG8sIHF1ZXJ5LCBoYXNoLCBzdGF0ZSwgYWN0aXZlQ2xhc3NOYW1lLCBhY3RpdmVTdHlsZSwgb25seUFjdGl2ZU9uSW5kZXgsIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzXHJcbiAgICB3YXJuaW5nKFxyXG4gICAgICAhKHF1ZXJ5IHx8IGhhc2ggfHwgc3RhdGUpLFxyXG4gICAgICAndGhlIGBxdWVyeWAsIGBoYXNoYCwgYW5kIGBzdGF0ZWAgcHJvcHMgb24gYDxMaW5rPmAgYXJlIGRlcHJlY2F0ZWQsIHVzZSBgPExpbmsgdG89e3sgcGF0aG5hbWUsIHF1ZXJ5LCBoYXNoLCBzdGF0ZSB9fS8+LiBodHRwOi8vdGlueS5jYy9yb3V0ZXItaXNBY3RpdmVkZXByZWNhdGVkJ1xyXG4gICAgKVxyXG5cclxuICAgIC8vIElnbm9yZSBpZiByZW5kZXJlZCBvdXRzaWRlIHRoZSBjb250ZXh0IG9mIHJvdXRlciwgc2ltcGxpZmllcyB1bml0IHRlc3RpbmcuXHJcbiAgICBjb25zdCB7IHJvdXRlciB9ID0gdGhpcy5jb250ZXh0XHJcblxyXG4gICAgaWYgKHJvdXRlcikge1xyXG4gICAgICBjb25zdCBsb2MgPSBjcmVhdGVMb2NhdGlvbkRlc2NyaXB0b3IoeyB0bywgcXVlcnksIGhhc2gsIHN0YXRlIH0pXHJcblxyXG4gICAgICBwcm9wcy5ocmVmID0gcm91dGVyLmNyZWF0ZUhyZWYobG9jKVxyXG5cclxuICAgICAgaWYgKGFjdGl2ZUNsYXNzTmFtZSB8fCAoYWN0aXZlU3R5bGUgIT0gbnVsbCAmJiAhaXNFbXB0eU9iamVjdChhY3RpdmVTdHlsZSkpKSB7XHJcbiAgICAgICAgaWYgKHJvdXRlci5pc0FjdGl2ZShsb2MsIG9ubHlBY3RpdmVPbkluZGV4KSkge1xyXG4gICAgICAgICAgaWYgKGFjdGl2ZUNsYXNzTmFtZSlcclxuICAgICAgICAgICAgcHJvcHMuY2xhc3NOYW1lICs9IHByb3BzLmNsYXNzTmFtZSA9PT0gJycgPyBhY3RpdmVDbGFzc05hbWUgOiBgICR7YWN0aXZlQ2xhc3NOYW1lfWBcclxuXHJcbiAgICAgICAgICBpZiAoYWN0aXZlU3R5bGUpXHJcbiAgICAgICAgICAgIHByb3BzLnN0eWxlID0geyAuLi5wcm9wcy5zdHlsZSwgLi4uYWN0aXZlU3R5bGUgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiA8YSB7Li4ucHJvcHN9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IC8+XHJcbiAgfVxyXG5cclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpbmtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL0xpbmsuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBMaW5rIGZyb20gJy4vTGluaydcclxuXHJcbi8qKlxyXG4gKiBBbiA8SW5kZXhMaW5rPiBpcyB1c2VkIHRvIGxpbmsgdG8gYW4gPEluZGV4Um91dGU+LlxyXG4gKi9cclxuY29uc3QgSW5kZXhMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gPExpbmsgey4uLnRoaXMucHJvcHN9IG9ubHlBY3RpdmVPbkluZGV4PXt0cnVlfSAvPlxyXG4gIH1cclxuXHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbmRleExpbmtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL0luZGV4TGluay5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi93YXJuaW5nJ1xyXG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCdcclxuaW1wb3J0IFJlZGlyZWN0IGZyb20gJy4vUmVkaXJlY3QnXHJcbmltcG9ydCB7IGZhbHN5IH0gZnJvbSAnLi9Qcm9wVHlwZXMnXHJcblxyXG5jb25zdCB7IHN0cmluZywgb2JqZWN0IH0gPSBSZWFjdC5Qcm9wVHlwZXNcclxuXHJcbi8qKlxyXG4gKiBBbiA8SW5kZXhSZWRpcmVjdD4gaXMgdXNlZCB0byByZWRpcmVjdCBmcm9tIGFuIGluZGV4Um91dGUuXHJcbiAqL1xyXG5jb25zdCBJbmRleFJlZGlyZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBzdGF0aWNzOiB7XHJcblxyXG4gICAgY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50KGVsZW1lbnQsIHBhcmVudFJvdXRlKSB7XHJcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlOiBzYW5pdHkgY2hlY2sgKi9cclxuICAgICAgaWYgKHBhcmVudFJvdXRlKSB7XHJcbiAgICAgICAgcGFyZW50Um91dGUuaW5kZXhSb3V0ZSA9IFJlZGlyZWN0LmNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudChlbGVtZW50KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdhcm5pbmcoXHJcbiAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICdBbiA8SW5kZXhSZWRpcmVjdD4gZG9lcyBub3QgbWFrZSBzZW5zZSBhdCB0aGUgcm9vdCBvZiB5b3VyIHJvdXRlIGNvbmZpZydcclxuICAgICAgICApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICB0bzogc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBxdWVyeTogb2JqZWN0LFxyXG4gICAgc3RhdGU6IG9iamVjdCxcclxuICAgIG9uRW50ZXI6IGZhbHN5LFxyXG4gICAgY2hpbGRyZW46IGZhbHN5XHJcbiAgfSxcclxuXHJcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHNhbml0eSBjaGVjayAqL1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGludmFyaWFudChcclxuICAgICAgZmFsc2UsXHJcbiAgICAgICc8SW5kZXhSZWRpcmVjdD4gZWxlbWVudHMgYXJlIGZvciByb3V0ZXIgY29uZmlndXJhdGlvbiBvbmx5IGFuZCBzaG91bGQgbm90IGJlIHJlbmRlcmVkJ1xyXG4gICAgKVxyXG4gIH1cclxuXHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbmRleFJlZGlyZWN0XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9JbmRleFJlZGlyZWN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCdcclxuaW1wb3J0IHsgY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50IH0gZnJvbSAnLi9Sb3V0ZVV0aWxzJ1xyXG5pbXBvcnQgeyBmb3JtYXRQYXR0ZXJuIH0gZnJvbSAnLi9QYXR0ZXJuVXRpbHMnXHJcbmltcG9ydCB7IGZhbHN5IH0gZnJvbSAnLi9Qcm9wVHlwZXMnXHJcblxyXG5jb25zdCB7IHN0cmluZywgb2JqZWN0IH0gPSBSZWFjdC5Qcm9wVHlwZXNcclxuXHJcbi8qKlxyXG4gKiBBIDxSZWRpcmVjdD4gaXMgdXNlZCB0byBkZWNsYXJlIGFub3RoZXIgVVJMIHBhdGggYSBjbGllbnQgc2hvdWxkXHJcbiAqIGJlIHNlbnQgdG8gd2hlbiB0aGV5IHJlcXVlc3QgYSBnaXZlbiBVUkwuXHJcbiAqXHJcbiAqIFJlZGlyZWN0cyBhcmUgcGxhY2VkIGFsb25nc2lkZSByb3V0ZXMgaW4gdGhlIHJvdXRlIGNvbmZpZ3VyYXRpb25cclxuICogYW5kIGFyZSB0cmF2ZXJzZWQgaW4gdGhlIHNhbWUgbWFubmVyLlxyXG4gKi9cclxuY29uc3QgUmVkaXJlY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIHN0YXRpY3M6IHtcclxuICAgIFxyXG4gICAgY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50KGVsZW1lbnQpIHtcclxuICAgICAgY29uc3Qgcm91dGUgPSBjcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQoZWxlbWVudClcclxuXHJcbiAgICAgIGlmIChyb3V0ZS5mcm9tKVxyXG4gICAgICAgIHJvdXRlLnBhdGggPSByb3V0ZS5mcm9tXHJcblxyXG4gICAgICByb3V0ZS5vbkVudGVyID0gZnVuY3Rpb24gKG5leHRTdGF0ZSwgcmVwbGFjZVN0YXRlKSB7XHJcbiAgICAgICAgY29uc3QgeyBsb2NhdGlvbiwgcGFyYW1zIH0gPSBuZXh0U3RhdGVcclxuXHJcbiAgICAgICAgbGV0IHBhdGhuYW1lXHJcbiAgICAgICAgaWYgKHJvdXRlLnRvLmNoYXJBdCgwKSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICBwYXRobmFtZSA9IGZvcm1hdFBhdHRlcm4ocm91dGUudG8sIHBhcmFtcylcclxuICAgICAgICB9IGVsc2UgaWYgKCFyb3V0ZS50bykge1xyXG4gICAgICAgICAgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBsZXQgcm91dGVJbmRleCA9IG5leHRTdGF0ZS5yb3V0ZXMuaW5kZXhPZihyb3V0ZSlcclxuICAgICAgICAgIGxldCBwYXJlbnRQYXR0ZXJuID0gUmVkaXJlY3QuZ2V0Um91dGVQYXR0ZXJuKG5leHRTdGF0ZS5yb3V0ZXMsIHJvdXRlSW5kZXggLSAxKVxyXG4gICAgICAgICAgbGV0IHBhdHRlcm4gPSBwYXJlbnRQYXR0ZXJuLnJlcGxhY2UoL1xcLyokLywgJy8nKSArIHJvdXRlLnRvXHJcbiAgICAgICAgICBwYXRobmFtZSA9IGZvcm1hdFBhdHRlcm4ocGF0dGVybiwgcGFyYW1zKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVwbGFjZVN0YXRlKFxyXG4gICAgICAgICAgcm91dGUuc3RhdGUgfHwgbG9jYXRpb24uc3RhdGUsXHJcbiAgICAgICAgICBwYXRobmFtZSxcclxuICAgICAgICAgIHJvdXRlLnF1ZXJ5IHx8IGxvY2F0aW9uLnF1ZXJ5XHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcm91dGVcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Um91dGVQYXR0ZXJuKHJvdXRlcywgcm91dGVJbmRleCkge1xyXG4gICAgICBsZXQgcGFyZW50UGF0dGVybiA9ICcnXHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gcm91dGVJbmRleDsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBjb25zdCByb3V0ZSA9IHJvdXRlc1tpXVxyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSByb3V0ZS5wYXRoIHx8ICcnXHJcblxyXG4gICAgICAgIHBhcmVudFBhdHRlcm4gPSBwYXR0ZXJuLnJlcGxhY2UoL1xcLyokLywgJy8nKSArIHBhcmVudFBhdHRlcm5cclxuXHJcbiAgICAgICAgaWYgKHBhdHRlcm4uaW5kZXhPZignLycpID09PSAwKVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuICcvJyArIHBhcmVudFBhdHRlcm5cclxuICAgIH1cclxuXHJcbiAgfSxcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICBmcm9tOiBzdHJpbmcsIC8vIEFsaWFzIGZvciBwYXRoXHJcbiAgICB0bzogc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBxdWVyeTogb2JqZWN0LFxyXG4gICAgc3RhdGU6IG9iamVjdCxcclxuICAgIG9uRW50ZXI6IGZhbHN5LFxyXG4gICAgY2hpbGRyZW46IGZhbHN5XHJcbiAgfSxcclxuXHJcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHNhbml0eSBjaGVjayAqL1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGludmFyaWFudChcclxuICAgICAgZmFsc2UsXHJcbiAgICAgICc8UmVkaXJlY3Q+IGVsZW1lbnRzIGFyZSBmb3Igcm91dGVyIGNvbmZpZ3VyYXRpb24gb25seSBhbmQgc2hvdWxkIG5vdCBiZSByZW5kZXJlZCdcclxuICAgIClcclxuICB9XHJcblxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVkaXJlY3RcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JlZGlyZWN0LmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3dhcm5pbmcnXHJcbmltcG9ydCBpbnZhcmlhbnQgZnJvbSAnaW52YXJpYW50J1xyXG5pbXBvcnQgeyBjcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQgfSBmcm9tICcuL1JvdXRlVXRpbHMnXHJcbmltcG9ydCB7IGNvbXBvbmVudCwgY29tcG9uZW50cywgZmFsc3kgfSBmcm9tICcuL1Byb3BUeXBlcydcclxuXHJcbmNvbnN0IHsgZnVuYyB9ID0gUmVhY3QuUHJvcFR5cGVzXHJcblxyXG4vKipcclxuICogQW4gPEluZGV4Um91dGU+IGlzIHVzZWQgdG8gc3BlY2lmeSBpdHMgcGFyZW50J3MgPFJvdXRlIGluZGV4Um91dGU+IGluXHJcbiAqIGEgSlNYIHJvdXRlIGNvbmZpZy5cclxuICovXHJcbmNvbnN0IEluZGV4Um91dGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIHN0YXRpY3M6IHtcclxuXHJcbiAgICBjcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnQoZWxlbWVudCwgcGFyZW50Um91dGUpIHtcclxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2U6IHNhbml0eSBjaGVjayAqL1xyXG4gICAgICBpZiAocGFyZW50Um91dGUpIHtcclxuICAgICAgICBwYXJlbnRSb3V0ZS5pbmRleFJvdXRlID0gY3JlYXRlUm91dGVGcm9tUmVhY3RFbGVtZW50KGVsZW1lbnQpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd2FybmluZyhcclxuICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgJ0FuIDxJbmRleFJvdXRlPiBkb2VzIG5vdCBtYWtlIHNlbnNlIGF0IHRoZSByb290IG9mIHlvdXIgcm91dGUgY29uZmlnJ1xyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIHBhdGg6IGZhbHN5LFxyXG4gICAgY29tcG9uZW50LFxyXG4gICAgY29tcG9uZW50cyxcclxuICAgIGdldENvbXBvbmVudDogZnVuYyxcclxuICAgIGdldENvbXBvbmVudHM6IGZ1bmNcclxuICB9LFxyXG5cclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogc2FuaXR5IGNoZWNrICovXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaW52YXJpYW50KFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgJzxJbmRleFJvdXRlPiBlbGVtZW50cyBhcmUgZm9yIHJvdXRlciBjb25maWd1cmF0aW9uIG9ubHkgYW5kIHNob3VsZCBub3QgYmUgcmVuZGVyZWQnXHJcbiAgICApXHJcbiAgfVxyXG4gIFxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5kZXhSb3V0ZVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvSW5kZXhSb3V0ZS5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnXHJcbmltcG9ydCB7IGNyZWF0ZVJvdXRlRnJvbVJlYWN0RWxlbWVudCB9IGZyb20gJy4vUm91dGVVdGlscydcclxuaW1wb3J0IHsgY29tcG9uZW50LCBjb21wb25lbnRzIH0gZnJvbSAnLi9Qcm9wVHlwZXMnXHJcblxyXG5jb25zdCB7IHN0cmluZywgZnVuYyB9ID0gUmVhY3QuUHJvcFR5cGVzXHJcblxyXG4vKipcclxuICogQSA8Um91dGU+IGlzIHVzZWQgdG8gZGVjbGFyZSB3aGljaCBjb21wb25lbnRzIGFyZSByZW5kZXJlZCB0byB0aGVcclxuICogcGFnZSB3aGVuIHRoZSBVUkwgbWF0Y2hlcyBhIGdpdmVuIHBhdHRlcm4uXHJcbiAqXHJcbiAqIFJvdXRlcyBhcmUgYXJyYW5nZWQgaW4gYSBuZXN0ZWQgdHJlZSBzdHJ1Y3R1cmUuIFdoZW4gYSBuZXcgVVJMIGlzXHJcbiAqIHJlcXVlc3RlZCwgdGhlIHRyZWUgaXMgc2VhcmNoZWQgZGVwdGgtZmlyc3QgdG8gZmluZCBhIHJvdXRlIHdob3NlXHJcbiAqIHBhdGggbWF0Y2hlcyB0aGUgVVJMLiAgV2hlbiBvbmUgaXMgZm91bmQsIGFsbCByb3V0ZXMgaW4gdGhlIHRyZWVcclxuICogdGhhdCBsZWFkIHRvIGl0IGFyZSBjb25zaWRlcmVkIFwiYWN0aXZlXCIgYW5kIHRoZWlyIGNvbXBvbmVudHMgYXJlXHJcbiAqIHJlbmRlcmVkIGludG8gdGhlIERPTSwgbmVzdGVkIGluIHRoZSBzYW1lIG9yZGVyIGFzIGluIHRoZSB0cmVlLlxyXG4gKi9cclxuY29uc3QgUm91dGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7IFxyXG5cclxuICBzdGF0aWNzOiB7XHJcbiAgICBjcmVhdGVSb3V0ZUZyb21SZWFjdEVsZW1lbnRcclxuICB9LFxyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIHBhdGg6IHN0cmluZyxcclxuICAgIGNvbXBvbmVudCxcclxuICAgIGNvbXBvbmVudHMsXHJcbiAgICBnZXRDb21wb25lbnQ6IGZ1bmMsXHJcbiAgICBnZXRDb21wb25lbnRzOiBmdW5jXHJcbiAgfSxcclxuXHJcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IHNhbml0eSBjaGVjayAqL1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGludmFyaWFudChcclxuICAgICAgZmFsc2UsXHJcbiAgICAgICc8Um91dGU+IGVsZW1lbnRzIGFyZSBmb3Igcm91dGVyIGNvbmZpZ3VyYXRpb24gb25seSBhbmQgc2hvdWxkIG5vdCBiZSByZW5kZXJlZCdcclxuICAgIClcclxuICB9XHJcblxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm91dGVcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL1JvdXRlLmpzXG4gKiovIiwiaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi93YXJuaW5nJ1xyXG5pbXBvcnQgeyBoaXN0b3J5IH0gZnJvbSAnLi9Qcm9wVHlwZXMnXHJcblxyXG4vKipcclxuICogQSBtaXhpbiB0aGF0IGFkZHMgdGhlIFwiaGlzdG9yeVwiIGluc3RhbmNlIHZhcmlhYmxlIHRvIGNvbXBvbmVudHMuXHJcbiAqL1xyXG5jb25zdCBIaXN0b3J5ID0ge1xyXG5cclxuICBjb250ZXh0VHlwZXM6IHtcclxuICAgIGhpc3RvcnlcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICB3YXJuaW5nKGZhbHNlLCAndGhlIGBIaXN0b3J5YCBtaXhpbiBpcyBkZXByZWNhdGVkLCBwbGVhc2UgYWNjZXNzIGBjb250ZXh0LnJvdXRlcmAgd2l0aCB5b3VyIG93biBgY29udGV4dFR5cGVzYC4gaHR0cDovL3RpbnkuY2Mvcm91dGVyLWhpc3RvcnltaXhpbicpXHJcbiAgICB0aGlzLmhpc3RvcnkgPSB0aGlzLmNvbnRleHQuaGlzdG9yeVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL0hpc3RvcnkuanNcbiAqKi8iLCJpbXBvcnQgd2FybmluZyBmcm9tICcuL3dhcm5pbmcnXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnXHJcblxyXG5jb25zdCB7IG9iamVjdCB9ID0gUmVhY3QuUHJvcFR5cGVzXHJcblxyXG4vKipcclxuICogVGhlIExpZmVjeWNsZSBtaXhpbiBhZGRzIHRoZSByb3V0ZXJXaWxsTGVhdmUgbGlmZWN5Y2xlIG1ldGhvZCB0byBhXHJcbiAqIGNvbXBvbmVudCB0aGF0IG1heSBiZSB1c2VkIHRvIGNhbmNlbCBhIHRyYW5zaXRpb24gb3IgcHJvbXB0IHRoZSB1c2VyXHJcbiAqIGZvciBjb25maXJtYXRpb24uXHJcbiAqXHJcbiAqIE9uIHN0YW5kYXJkIHRyYW5zaXRpb25zLCByb3V0ZXJXaWxsTGVhdmUgcmVjZWl2ZXMgYSBzaW5nbGUgYXJndW1lbnQ6IHRoZVxyXG4gKiBsb2NhdGlvbiB3ZSdyZSB0cmFuc2l0aW9uaW5nIHRvLiBUbyBjYW5jZWwgdGhlIHRyYW5zaXRpb24sIHJldHVybiBmYWxzZS5cclxuICogVG8gcHJvbXB0IHRoZSB1c2VyIGZvciBjb25maXJtYXRpb24sIHJldHVybiBhIHByb21wdCBtZXNzYWdlIChzdHJpbmcpLlxyXG4gKlxyXG4gKiBEdXJpbmcgdGhlIGJlZm9yZXVubG9hZCBldmVudCAoYXNzdW1pbmcgeW91J3JlIHVzaW5nIHRoZSB1c2VCZWZvcmVVbmxvYWRcclxuICogaGlzdG9yeSBlbmhhbmNlciksIHJvdXRlcldpbGxMZWF2ZSBkb2VzIG5vdCByZWNlaXZlIGEgbG9jYXRpb24gb2JqZWN0XHJcbiAqIGJlY2F1c2UgaXQgaXNuJ3QgcG9zc2libGUgZm9yIHVzIHRvIGtub3cgdGhlIGxvY2F0aW9uIHdlJ3JlIHRyYW5zaXRpb25pbmdcclxuICogdG8uIEluIHRoaXMgY2FzZSByb3V0ZXJXaWxsTGVhdmUgbXVzdCByZXR1cm4gYSBwcm9tcHQgbWVzc2FnZSB0byBwcmV2ZW50XHJcbiAqIHRoZSB1c2VyIGZyb20gY2xvc2luZyB0aGUgd2luZG93L3RhYi5cclxuICovXHJcbmNvbnN0IExpZmVjeWNsZSA9IHtcclxuXHJcbiAgY29udGV4dFR5cGVzOiB7XHJcbiAgICBoaXN0b3J5OiBvYmplY3QuaXNSZXF1aXJlZCxcclxuICAgIC8vIE5lc3RlZCBjaGlsZHJlbiByZWNlaXZlIHRoZSByb3V0ZSBhcyBjb250ZXh0LCBlaXRoZXJcclxuICAgIC8vIHNldCBieSB0aGUgcm91dGUgY29tcG9uZW50IHVzaW5nIHRoZSBSb3V0ZUNvbnRleHQgbWl4aW5cclxuICAgIC8vIG9yIGJ5IHNvbWUgb3RoZXIgYW5jZXN0b3IuXHJcbiAgICByb3V0ZTogb2JqZWN0XHJcbiAgfSxcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICAvLyBSb3V0ZSBjb21wb25lbnRzIHJlY2VpdmUgdGhlIHJvdXRlIG9iamVjdCBhcyBhIHByb3AuXHJcbiAgICByb3V0ZTogb2JqZWN0XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICB3YXJuaW5nKGZhbHNlLCAndGhlIGBMaWZlY3ljbGVgIG1peGluIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGNvbnRleHQucm91dGVyLnNldFJvdXRlTGVhdmVIb29rKHJvdXRlLCBob29rKWAuIGh0dHA6Ly90aW55LmNjL3JvdXRlci1saWZlY3ljbGVtaXhpbicpXHJcbiAgICBpbnZhcmlhbnQoXHJcbiAgICAgIHRoaXMucm91dGVyV2lsbExlYXZlLFxyXG4gICAgICAnVGhlIExpZmVjeWNsZSBtaXhpbiByZXF1aXJlcyB5b3UgdG8gZGVmaW5lIGEgcm91dGVyV2lsbExlYXZlIG1ldGhvZCdcclxuICAgIClcclxuXHJcbiAgICBjb25zdCByb3V0ZSA9IHRoaXMucHJvcHMucm91dGUgfHwgdGhpcy5jb250ZXh0LnJvdXRlXHJcblxyXG4gICAgaW52YXJpYW50KFxyXG4gICAgICByb3V0ZSxcclxuICAgICAgJ1RoZSBMaWZlY3ljbGUgbWl4aW4gbXVzdCBiZSB1c2VkIG9uIGVpdGhlciBhKSBhIDxSb3V0ZSBjb21wb25lbnQ+IG9yICcgK1xyXG4gICAgICAnYikgYSBkZXNjZW5kYW50IG9mIGEgPFJvdXRlIGNvbXBvbmVudD4gdGhhdCB1c2VzIHRoZSBSb3V0ZUNvbnRleHQgbWl4aW4nXHJcbiAgICApXHJcblxyXG4gICAgdGhpcy5fdW5saXN0ZW5CZWZvcmVMZWF2aW5nUm91dGUgPSB0aGlzLmNvbnRleHQuaGlzdG9yeS5saXN0ZW5CZWZvcmVMZWF2aW5nUm91dGUoXHJcbiAgICAgIHJvdXRlLFxyXG4gICAgICB0aGlzLnJvdXRlcldpbGxMZWF2ZVxyXG4gICAgKVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgaWYgKHRoaXMuX3VubGlzdGVuQmVmb3JlTGVhdmluZ1JvdXRlKVxyXG4gICAgICB0aGlzLl91bmxpc3RlbkJlZm9yZUxlYXZpbmdSb3V0ZSgpXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlmZWN5Y2xlXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9MaWZlY3ljbGUuanNcbiAqKi8iLCJpbXBvcnQgd2FybmluZyBmcm9tICcuL3dhcm5pbmcnXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmNvbnN0IHsgb2JqZWN0IH0gPSBSZWFjdC5Qcm9wVHlwZXNcclxuXHJcbi8qKlxyXG4gKiBUaGUgUm91dGVDb250ZXh0IG1peGluIHByb3ZpZGVzIGEgY29udmVuaWVudCB3YXkgZm9yIHJvdXRlXHJcbiAqIGNvbXBvbmVudHMgdG8gc2V0IHRoZSByb3V0ZSBpbiBjb250ZXh0LiBUaGlzIGlzIG5lZWRlZCBmb3JcclxuICogcm91dGVzIHRoYXQgcmVuZGVyIGVsZW1lbnRzIHRoYXQgd2FudCB0byB1c2UgdGhlIExpZmVjeWNsZVxyXG4gKiBtaXhpbiB0byBwcmV2ZW50IHRyYW5zaXRpb25zLlxyXG4gKi9cclxuY29uc3QgUm91dGVDb250ZXh0ID0ge1xyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIHJvdXRlOiBvYmplY3QuaXNSZXF1aXJlZFxyXG4gIH0sXHJcblxyXG4gIGNoaWxkQ29udGV4dFR5cGVzOiB7XHJcbiAgICByb3V0ZTogb2JqZWN0LmlzUmVxdWlyZWRcclxuICB9LFxyXG5cclxuICBnZXRDaGlsZENvbnRleHQoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByb3V0ZTogdGhpcy5wcm9wcy5yb3V0ZVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIHdhcm5pbmcoZmFsc2UsICdUaGUgYFJvdXRlQ29udGV4dGAgbWl4aW4gaXMgZGVwcmVjYXRlZC4gWW91IGNhbiBwcm92aWRlIGB0aGlzLnByb3BzLnJvdXRlYCBvbiBjb250ZXh0IHdpdGggeW91ciBvd24gYGNvbnRleHRUeXBlc2AuIGh0dHA6Ly90aW55LmNjL3JvdXRlci1yb3V0ZWNvbnRleHRtaXhpbicpXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm91dGVDb250ZXh0XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9Sb3V0ZUNvbnRleHQuanNcbiAqKi8iLCJpbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCdcclxuXHJcbmltcG9ydCBjcmVhdGVNZW1vcnlIaXN0b3J5IGZyb20gJy4vY3JlYXRlTWVtb3J5SGlzdG9yeSdcclxuaW1wb3J0IGNyZWF0ZVRyYW5zaXRpb25NYW5hZ2VyIGZyb20gJy4vY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXInXHJcbmltcG9ydCB7IGNyZWF0ZVJvdXRlcyB9IGZyb20gJy4vUm91dGVVdGlscydcclxuaW1wb3J0IHsgY3JlYXRlUm91dGVyT2JqZWN0LCBjcmVhdGVSb3V0aW5nSGlzdG9yeSB9IGZyb20gJy4vUm91dGVyVXRpbHMnXHJcblxyXG4vKipcclxuICogQSBoaWdoLWxldmVsIEFQSSB0byBiZSB1c2VkIGZvciBzZXJ2ZXItc2lkZSByZW5kZXJpbmcuXHJcbiAqXHJcbiAqIFRoaXMgZnVuY3Rpb24gbWF0Y2hlcyBhIGxvY2F0aW9uIHRvIGEgc2V0IG9mIHJvdXRlcyBhbmQgY2FsbHNcclxuICogY2FsbGJhY2soZXJyb3IsIHJlZGlyZWN0TG9jYXRpb24sIHJlbmRlclByb3BzKSB3aGVuIGZpbmlzaGVkLlxyXG4gKlxyXG4gKiBOb3RlOiBZb3UgcHJvYmFibHkgZG9uJ3Qgd2FudCB0byB1c2UgdGhpcyBpbiBhIGJyb3dzZXIuIFVzZVxyXG4gKiB0aGUgaGlzdG9yeS5saXN0ZW4gQVBJIGluc3RlYWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBtYXRjaCh7IGhpc3RvcnksIHJvdXRlcywgbG9jYXRpb24sIC4uLm9wdGlvbnMgfSwgY2FsbGJhY2spIHtcclxuICBpbnZhcmlhbnQoXHJcbiAgICBsb2NhdGlvbixcclxuICAgICdtYXRjaCBuZWVkcyBhIGxvY2F0aW9uJ1xyXG4gIClcclxuXHJcbiAgaGlzdG9yeSA9IGhpc3RvcnkgPyBoaXN0b3J5IDogY3JlYXRlTWVtb3J5SGlzdG9yeShvcHRpb25zKVxyXG4gIGNvbnN0IHRyYW5zaXRpb25NYW5hZ2VyID0gY3JlYXRlVHJhbnNpdGlvbk1hbmFnZXIoXHJcbiAgICBoaXN0b3J5LFxyXG4gICAgY3JlYXRlUm91dGVzKHJvdXRlcylcclxuICApXHJcblxyXG4gIC8vIEFsbG93IG1hdGNoKHsgbG9jYXRpb246ICcvdGhlL3BhdGgnLCAuLi4gfSlcclxuICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJylcclxuICAgIGxvY2F0aW9uID0gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihsb2NhdGlvbilcclxuXHJcbiAgY29uc3Qgcm91dGVyID0gY3JlYXRlUm91dGVyT2JqZWN0KGhpc3RvcnksIHRyYW5zaXRpb25NYW5hZ2VyKVxyXG4gIGhpc3RvcnkgPSBjcmVhdGVSb3V0aW5nSGlzdG9yeShoaXN0b3J5LCB0cmFuc2l0aW9uTWFuYWdlcilcclxuXHJcbiAgdHJhbnNpdGlvbk1hbmFnZXIubWF0Y2gobG9jYXRpb24sIGZ1bmN0aW9uIChlcnJvciwgcmVkaXJlY3RMb2NhdGlvbiwgbmV4dFN0YXRlKSB7XHJcbiAgICBjYWxsYmFjayhcclxuICAgICAgZXJyb3IsXHJcbiAgICAgIHJlZGlyZWN0TG9jYXRpb24sXHJcbiAgICAgIG5leHRTdGF0ZSAmJiB7IC4uLm5leHRTdGF0ZSwgaGlzdG9yeSwgcm91dGVyIH1cclxuICAgIClcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtYXRjaFxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvbWF0Y2guanNcbiAqKi8iLCJpbXBvcnQgdXNlUXVlcmllcyBmcm9tICdoaXN0b3J5L2xpYi91c2VRdWVyaWVzJ1xyXG5pbXBvcnQgYmFzZUNyZWF0ZU1lbW9yeUhpc3RvcnkgZnJvbSAnaGlzdG9yeS9saWIvY3JlYXRlTWVtb3J5SGlzdG9yeSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU1lbW9yeUhpc3Rvcnkob3B0aW9ucykge1xyXG4gIC8vIHNpZ25hdHVyZXMgYW5kIHR5cGUgY2hlY2tpbmcgZGlmZmVyIGJldHdlZW4gYHVzZVJvdXRlc2AgYW5kXHJcbiAgLy8gYGNyZWF0ZU1lbW9yeUhpc3RvcnlgLCBoYXZlIHRvIGNyZWF0ZSBgbWVtb3J5SGlzdG9yeWAgZmlyc3QgYmVjYXVzZVxyXG4gIC8vIGB1c2VRdWVyaWVzYCBkb2Vzbid0IHVuZGVyc3RhbmQgdGhlIHNpZ25hdHVyZVxyXG4gIGNvbnN0IG1lbW9yeUhpc3RvcnkgPSBiYXNlQ3JlYXRlTWVtb3J5SGlzdG9yeShvcHRpb25zKVxyXG4gIGNvbnN0IGNyZWF0ZUhpc3RvcnkgPSAoKSA9PiBtZW1vcnlIaXN0b3J5XHJcbiAgY29uc3QgaGlzdG9yeSA9IHVzZVF1ZXJpZXMoY3JlYXRlSGlzdG9yeSkob3B0aW9ucylcclxuICBoaXN0b3J5Ll9fdjJfY29tcGF0aWJsZV9fID0gdHJ1ZVxyXG4gIHJldHVybiBoaXN0b3J5XHJcbn1cclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9jcmVhdGVNZW1vcnlIaXN0b3J5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG52YXIgX2ludmFyaWFudCA9IHJlcXVpcmUoJ2ludmFyaWFudCcpO1xuXG52YXIgX2ludmFyaWFudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbnZhcmlhbnQpO1xuXG52YXIgX0FjdGlvbnMgPSByZXF1aXJlKCcuL0FjdGlvbnMnKTtcblxudmFyIF9jcmVhdGVIaXN0b3J5ID0gcmVxdWlyZSgnLi9jcmVhdGVIaXN0b3J5Jyk7XG5cbnZhciBfY3JlYXRlSGlzdG9yeTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVIaXN0b3J5KTtcblxudmFyIF9wYXJzZVBhdGggPSByZXF1aXJlKCcuL3BhcnNlUGF0aCcpO1xuXG52YXIgX3BhcnNlUGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJzZVBhdGgpO1xuXG5mdW5jdGlvbiBjcmVhdGVTdGF0ZVN0b3JhZ2UoZW50cmllcykge1xuICByZXR1cm4gZW50cmllcy5maWx0ZXIoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgcmV0dXJuIGVudHJ5LnN0YXRlO1xuICB9KS5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIGVudHJ5KSB7XG4gICAgbWVtb1tlbnRyeS5rZXldID0gZW50cnkuc3RhdGU7XG4gICAgcmV0dXJuIG1lbW87XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWVtb3J5SGlzdG9yeSgpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuICAgIG9wdGlvbnMgPSB7IGVudHJpZXM6IG9wdGlvbnMgfTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0geyBlbnRyaWVzOiBbb3B0aW9uc10gfTtcbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0gX2NyZWF0ZUhpc3RvcnkyWydkZWZhdWx0J10oX2V4dGVuZHMoe30sIG9wdGlvbnMsIHtcbiAgICBnZXRDdXJyZW50TG9jYXRpb246IGdldEN1cnJlbnRMb2NhdGlvbixcbiAgICBmaW5pc2hUcmFuc2l0aW9uOiBmaW5pc2hUcmFuc2l0aW9uLFxuICAgIHNhdmVTdGF0ZTogc2F2ZVN0YXRlLFxuICAgIGdvOiBnb1xuICB9KSk7XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucztcbiAgdmFyIGVudHJpZXMgPSBfb3B0aW9ucy5lbnRyaWVzO1xuICB2YXIgY3VycmVudCA9IF9vcHRpb25zLmN1cnJlbnQ7XG5cbiAgaWYgKHR5cGVvZiBlbnRyaWVzID09PSAnc3RyaW5nJykge1xuICAgIGVudHJpZXMgPSBbZW50cmllc107XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoZW50cmllcykpIHtcbiAgICBlbnRyaWVzID0gWycvJ107XG4gIH1cblxuICBlbnRyaWVzID0gZW50cmllcy5tYXAoZnVuY3Rpb24gKGVudHJ5KSB7XG4gICAgdmFyIGtleSA9IGhpc3RvcnkuY3JlYXRlS2V5KCk7XG5cbiAgICBpZiAodHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJykgcmV0dXJuIHsgcGF0aG5hbWU6IGVudHJ5LCBrZXk6IGtleSB9O1xuXG4gICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gJ29iamVjdCcgJiYgZW50cnkpIHJldHVybiBfZXh0ZW5kcyh7fSwgZW50cnksIHsga2V5OiBrZXkgfSk7XG5cbiAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSwgJ1VuYWJsZSB0byBjcmVhdGUgaGlzdG9yeSBlbnRyeSBmcm9tICVzJywgZW50cnkpIDogX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSkgOiB1bmRlZmluZWQ7XG4gIH0pO1xuXG4gIGlmIChjdXJyZW50ID09IG51bGwpIHtcbiAgICBjdXJyZW50ID0gZW50cmllcy5sZW5ndGggLSAxO1xuICB9IGVsc2Uge1xuICAgICEoY3VycmVudCA+PSAwICYmIGN1cnJlbnQgPCBlbnRyaWVzLmxlbmd0aCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gX2ludmFyaWFudDJbJ2RlZmF1bHQnXShmYWxzZSwgJ0N1cnJlbnQgaW5kZXggbXVzdCBiZSA+PSAwIGFuZCA8ICVzLCB3YXMgJXMnLCBlbnRyaWVzLmxlbmd0aCwgY3VycmVudCkgOiBfaW52YXJpYW50MlsnZGVmYXVsdCddKGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciBzdG9yYWdlID0gY3JlYXRlU3RhdGVTdG9yYWdlKGVudHJpZXMpO1xuXG4gIGZ1bmN0aW9uIHNhdmVTdGF0ZShrZXksIHN0YXRlKSB7XG4gICAgc3RvcmFnZVtrZXldID0gc3RhdGU7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkU3RhdGUoa2V5KSB7XG4gICAgcmV0dXJuIHN0b3JhZ2Vba2V5XTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRMb2NhdGlvbigpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2N1cnJlbnRdO1xuICAgIHZhciBrZXkgPSBlbnRyeS5rZXk7XG4gICAgdmFyIGJhc2VuYW1lID0gZW50cnkuYmFzZW5hbWU7XG4gICAgdmFyIHBhdGhuYW1lID0gZW50cnkucGF0aG5hbWU7XG4gICAgdmFyIHNlYXJjaCA9IGVudHJ5LnNlYXJjaDtcblxuICAgIHZhciBwYXRoID0gKGJhc2VuYW1lIHx8ICcnKSArIHBhdGhuYW1lICsgKHNlYXJjaCB8fCAnJyk7XG5cbiAgICB2YXIgc3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGtleSkge1xuICAgICAgc3RhdGUgPSByZWFkU3RhdGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUgPSBudWxsO1xuICAgICAga2V5ID0gaGlzdG9yeS5jcmVhdGVLZXkoKTtcbiAgICAgIGVudHJ5LmtleSA9IGtleTtcbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb24gPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKHBhdGgpO1xuXG4gICAgcmV0dXJuIGhpc3RvcnkuY3JlYXRlTG9jYXRpb24oX2V4dGVuZHMoe30sIGxvY2F0aW9uLCB7IHN0YXRlOiBzdGF0ZSB9KSwgdW5kZWZpbmVkLCBrZXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuR28obikge1xuICAgIHZhciBpbmRleCA9IGN1cnJlbnQgKyBuO1xuICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgZW50cmllcy5sZW5ndGg7XG4gIH1cblxuICBmdW5jdGlvbiBnbyhuKSB7XG4gICAgaWYgKG4pIHtcbiAgICAgIGlmICghY2FuR28obikpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF93YXJuaW5nMlsnZGVmYXVsdCddKGZhbHNlLCAnQ2Fubm90IGdvKCVzKSB0aGVyZSBpcyBub3QgZW5vdWdoIGhpc3RvcnknLCBuKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50ICs9IG47XG5cbiAgICAgIHZhciBjdXJyZW50TG9jYXRpb24gPSBnZXRDdXJyZW50TG9jYXRpb24oKTtcblxuICAgICAgLy8gY2hhbmdlIGFjdGlvbiB0byBQT1BcbiAgICAgIGhpc3RvcnkudHJhbnNpdGlvblRvKF9leHRlbmRzKHt9LCBjdXJyZW50TG9jYXRpb24sIHsgYWN0aW9uOiBfQWN0aW9ucy5QT1AgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmlzaFRyYW5zaXRpb24obG9jYXRpb24pIHtcbiAgICBzd2l0Y2ggKGxvY2F0aW9uLmFjdGlvbikge1xuICAgICAgY2FzZSBfQWN0aW9ucy5QVVNIOlxuICAgICAgICBjdXJyZW50ICs9IDE7XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlIG5vdCBvbiB0aGUgdG9wIG9mIHN0YWNrXG4gICAgICAgIC8vIHJlbW92ZSByZXN0IGFuZCBwdXNoIG5ld1xuICAgICAgICBpZiAoY3VycmVudCA8IGVudHJpZXMubGVuZ3RoKSBlbnRyaWVzLnNwbGljZShjdXJyZW50KTtcblxuICAgICAgICBlbnRyaWVzLnB1c2gobG9jYXRpb24pO1xuICAgICAgICBzYXZlU3RhdGUobG9jYXRpb24ua2V5LCBsb2NhdGlvbi5zdGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBfQWN0aW9ucy5SRVBMQUNFOlxuICAgICAgICBlbnRyaWVzW2N1cnJlbnRdID0gbG9jYXRpb247XG4gICAgICAgIHNhdmVTdGF0ZShsb2NhdGlvbi5rZXksIGxvY2F0aW9uLnN0YXRlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGhpc3Rvcnk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNyZWF0ZU1lbW9yeUhpc3Rvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvY3JlYXRlTWVtb3J5SGlzdG9yeS5qc1xuICoqIG1vZHVsZSBpZCA9IDUyXG4gKiogbW9kdWxlIGNodW5rcyA9IDM1XG4gKiovIiwiaW1wb3J0IHVzZVF1ZXJpZXMgZnJvbSAnaGlzdG9yeS9saWIvdXNlUXVlcmllcydcclxuaW1wb3J0IHVzZUJhc2VuYW1lIGZyb20gJ2hpc3RvcnkvbGliL3VzZUJhc2VuYW1lJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlUm91dGVySGlzdG9yeShjcmVhdGVIaXN0b3J5KSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICBjb25zdCBoaXN0b3J5ID0gdXNlUXVlcmllcyh1c2VCYXNlbmFtZShjcmVhdGVIaXN0b3J5KSkob3B0aW9ucylcclxuICAgIGhpc3RvcnkuX192Ml9jb21wYXRpYmxlX18gPSB0cnVlXHJcbiAgICByZXR1cm4gaGlzdG9yeVxyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvdXNlUm91dGVySGlzdG9yeS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbnZhciBfRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL0V4ZWN1dGlvbkVudmlyb25tZW50Jyk7XG5cbnZhciBfcnVuVHJhbnNpdGlvbkhvb2sgPSByZXF1aXJlKCcuL3J1blRyYW5zaXRpb25Ib29rJyk7XG5cbnZhciBfcnVuVHJhbnNpdGlvbkhvb2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcnVuVHJhbnNpdGlvbkhvb2spO1xuXG52YXIgX2V4dHJhY3RQYXRoID0gcmVxdWlyZSgnLi9leHRyYWN0UGF0aCcpO1xuXG52YXIgX2V4dHJhY3RQYXRoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4dHJhY3RQYXRoKTtcblxudmFyIF9wYXJzZVBhdGggPSByZXF1aXJlKCcuL3BhcnNlUGF0aCcpO1xuXG52YXIgX3BhcnNlUGF0aDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXJzZVBhdGgpO1xuXG52YXIgX2RlcHJlY2F0ZSA9IHJlcXVpcmUoJy4vZGVwcmVjYXRlJyk7XG5cbnZhciBfZGVwcmVjYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlcHJlY2F0ZSk7XG5cbmZ1bmN0aW9uIHVzZUJhc2VuYW1lKGNyZWF0ZUhpc3RvcnkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuICAgIHZhciBiYXNlbmFtZSA9IG9wdGlvbnMuYmFzZW5hbWU7XG5cbiAgICB2YXIgaGlzdG9yeU9wdGlvbnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob3B0aW9ucywgWydiYXNlbmFtZSddKTtcblxuICAgIHZhciBoaXN0b3J5ID0gY3JlYXRlSGlzdG9yeShoaXN0b3J5T3B0aW9ucyk7XG5cbiAgICAvLyBBdXRvbWF0aWNhbGx5IHVzZSB0aGUgdmFsdWUgb2YgPGJhc2UgaHJlZj4gaW4gSFRNTFxuICAgIC8vIGRvY3VtZW50cyBhcyBiYXNlbmFtZSBpZiBpdCdzIG5vdCBleHBsaWNpdGx5IGdpdmVuLlxuICAgIGlmIChiYXNlbmFtZSA9PSBudWxsICYmIF9FeGVjdXRpb25FbnZpcm9ubWVudC5jYW5Vc2VET00pIHtcbiAgICAgIHZhciBiYXNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Jhc2UnKVswXTtcblxuICAgICAgaWYgKGJhc2UpIGJhc2VuYW1lID0gX2V4dHJhY3RQYXRoMlsnZGVmYXVsdCddKGJhc2UuaHJlZik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkQmFzZW5hbWUobG9jYXRpb24pIHtcbiAgICAgIGlmIChiYXNlbmFtZSAmJiBsb2NhdGlvbi5iYXNlbmFtZSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5pbmRleE9mKGJhc2VuYW1lKSA9PT0gMCkge1xuICAgICAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gbG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyaW5nKGJhc2VuYW1lLmxlbmd0aCk7XG4gICAgICAgICAgbG9jYXRpb24uYmFzZW5hbWUgPSBiYXNlbmFtZTtcblxuICAgICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZSA9PT0gJycpIGxvY2F0aW9uLnBhdGhuYW1lID0gJy8nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxvY2F0aW9uLmJhc2VuYW1lID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxvY2F0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByZXBlbmRCYXNlbmFtZShsb2NhdGlvbikge1xuICAgICAgaWYgKCFiYXNlbmFtZSkgcmV0dXJuIGxvY2F0aW9uO1xuXG4gICAgICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAnc3RyaW5nJykgbG9jYXRpb24gPSBfcGFyc2VQYXRoMlsnZGVmYXVsdCddKGxvY2F0aW9uKTtcblxuICAgICAgdmFyIHBuYW1lID0gbG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICB2YXIgbm9ybWFsaXplZEJhc2VuYW1lID0gYmFzZW5hbWUuc2xpY2UoLTEpID09PSAnLycgPyBiYXNlbmFtZSA6IGJhc2VuYW1lICsgJy8nO1xuICAgICAgdmFyIG5vcm1hbGl6ZWRQYXRobmFtZSA9IHBuYW1lLmNoYXJBdCgwKSA9PT0gJy8nID8gcG5hbWUuc2xpY2UoMSkgOiBwbmFtZTtcbiAgICAgIHZhciBwYXRobmFtZSA9IG5vcm1hbGl6ZWRCYXNlbmFtZSArIG5vcm1hbGl6ZWRQYXRobmFtZTtcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBsb2NhdGlvbiwge1xuICAgICAgICBwYXRobmFtZTogcGF0aG5hbWVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIE92ZXJyaWRlIGFsbCByZWFkIG1ldGhvZHMgd2l0aCBiYXNlbmFtZS1hd2FyZSB2ZXJzaW9ucy5cbiAgICBmdW5jdGlvbiBsaXN0ZW5CZWZvcmUoaG9vaykge1xuICAgICAgcmV0dXJuIGhpc3RvcnkubGlzdGVuQmVmb3JlKGZ1bmN0aW9uIChsb2NhdGlvbiwgY2FsbGJhY2spIHtcbiAgICAgICAgX3J1blRyYW5zaXRpb25Ib29rMlsnZGVmYXVsdCddKGhvb2ssIGFkZEJhc2VuYW1lKGxvY2F0aW9uKSwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuKGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5saXN0ZW4oZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICAgIGxpc3RlbmVyKGFkZEJhc2VuYW1lKGxvY2F0aW9uKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBPdmVycmlkZSBhbGwgd3JpdGUgbWV0aG9kcyB3aXRoIGJhc2VuYW1lLWF3YXJlIHZlcnNpb25zLlxuICAgIGZ1bmN0aW9uIHB1c2gobG9jYXRpb24pIHtcbiAgICAgIGhpc3RvcnkucHVzaChwcmVwZW5kQmFzZW5hbWUobG9jYXRpb24pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXBsYWNlKGxvY2F0aW9uKSB7XG4gICAgICBoaXN0b3J5LnJlcGxhY2UocHJlcGVuZEJhc2VuYW1lKGxvY2F0aW9uKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUGF0aChsb2NhdGlvbikge1xuICAgICAgcmV0dXJuIGhpc3RvcnkuY3JlYXRlUGF0aChwcmVwZW5kQmFzZW5hbWUobG9jYXRpb24pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVIcmVmKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVIcmVmKHByZXBlbmRCYXNlbmFtZShsb2NhdGlvbikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhZGRCYXNlbmFtZShoaXN0b3J5LmNyZWF0ZUxvY2F0aW9uLmFwcGx5KGhpc3RvcnksIFtwcmVwZW5kQmFzZW5hbWUobG9jYXRpb24pXS5jb25jYXQoYXJncykpKTtcbiAgICB9XG5cbiAgICAvLyBkZXByZWNhdGVkXG4gICAgZnVuY3Rpb24gcHVzaFN0YXRlKHN0YXRlLCBwYXRoKSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSBwYXRoID0gX3BhcnNlUGF0aDJbJ2RlZmF1bHQnXShwYXRoKTtcblxuICAgICAgcHVzaChfZXh0ZW5kcyh7IHN0YXRlOiBzdGF0ZSB9LCBwYXRoKSk7XG4gICAgfVxuXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZShzdGF0ZSwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgcGF0aCA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG5cbiAgICAgIHJlcGxhY2UoX2V4dGVuZHMoeyBzdGF0ZTogc3RhdGUgfSwgcGF0aCkpO1xuICAgIH1cblxuICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgaGlzdG9yeSwge1xuICAgICAgbGlzdGVuQmVmb3JlOiBsaXN0ZW5CZWZvcmUsXG4gICAgICBsaXN0ZW46IGxpc3RlbixcbiAgICAgIHB1c2g6IHB1c2gsXG4gICAgICByZXBsYWNlOiByZXBsYWNlLFxuICAgICAgY3JlYXRlUGF0aDogY3JlYXRlUGF0aCxcbiAgICAgIGNyZWF0ZUhyZWY6IGNyZWF0ZUhyZWYsXG4gICAgICBjcmVhdGVMb2NhdGlvbjogY3JlYXRlTG9jYXRpb24sXG5cbiAgICAgIHB1c2hTdGF0ZTogX2RlcHJlY2F0ZTJbJ2RlZmF1bHQnXShwdXNoU3RhdGUsICdwdXNoU3RhdGUgaXMgZGVwcmVjYXRlZDsgdXNlIHB1c2ggaW5zdGVhZCcpLFxuICAgICAgcmVwbGFjZVN0YXRlOiBfZGVwcmVjYXRlMlsnZGVmYXVsdCddKHJlcGxhY2VTdGF0ZSwgJ3JlcGxhY2VTdGF0ZSBpcyBkZXByZWNhdGVkOyB1c2UgcmVwbGFjZSBpbnN0ZWFkJylcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gdXNlQmFzZW5hbWU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvdXNlQmFzZW5hbWUuanNcbiAqKiBtb2R1bGUgaWQgPSA1NFxuICoqIG1vZHVsZSBjaHVua3MgPSAzNVxuICoqLyIsImltcG9ydCBjcmVhdGVCcm93c2VySGlzdG9yeSBmcm9tICdoaXN0b3J5L2xpYi9jcmVhdGVCcm93c2VySGlzdG9yeSdcclxuaW1wb3J0IGNyZWF0ZVJvdXRlckhpc3RvcnkgZnJvbSAnLi9jcmVhdGVSb3V0ZXJIaXN0b3J5J1xyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSb3V0ZXJIaXN0b3J5KGNyZWF0ZUJyb3dzZXJIaXN0b3J5KVxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9tb2R1bGVzL2Jyb3dzZXJIaXN0b3J5LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfaW52YXJpYW50ID0gcmVxdWlyZSgnaW52YXJpYW50Jyk7XG5cbnZhciBfaW52YXJpYW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ludmFyaWFudCk7XG5cbnZhciBfQWN0aW9ucyA9IHJlcXVpcmUoJy4vQWN0aW9ucycpO1xuXG52YXIgX0V4ZWN1dGlvbkVudmlyb25tZW50ID0gcmVxdWlyZSgnLi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG52YXIgX0RPTVV0aWxzID0gcmVxdWlyZSgnLi9ET01VdGlscycpO1xuXG52YXIgX0RPTVN0YXRlU3RvcmFnZSA9IHJlcXVpcmUoJy4vRE9NU3RhdGVTdG9yYWdlJyk7XG5cbnZhciBfY3JlYXRlRE9NSGlzdG9yeSA9IHJlcXVpcmUoJy4vY3JlYXRlRE9NSGlzdG9yeScpO1xuXG52YXIgX2NyZWF0ZURPTUhpc3RvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlRE9NSGlzdG9yeSk7XG5cbnZhciBfcGFyc2VQYXRoID0gcmVxdWlyZSgnLi9wYXJzZVBhdGgnKTtcblxudmFyIF9wYXJzZVBhdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFyc2VQYXRoKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgaGlzdG9yeSBvYmplY3QgdGhhdCB1c2VzIEhUTUw1J3MgaGlzdG9yeSBBUElcbiAqIChwdXNoU3RhdGUsIHJlcGxhY2VTdGF0ZSwgYW5kIHRoZSBwb3BzdGF0ZSBldmVudCkgdG8gbWFuYWdlIGhpc3RvcnkuXG4gKiBUaGlzIGlzIHRoZSByZWNvbW1lbmRlZCBtZXRob2Qgb2YgbWFuYWdpbmcgaGlzdG9yeSBpbiBicm93c2VycyBiZWNhdXNlXG4gKiBpdCBwcm92aWRlcyB0aGUgY2xlYW5lc3QgVVJMcy5cbiAqXG4gKiBOb3RlOiBJbiBicm93c2VycyB0aGF0IGRvIG5vdCBzdXBwb3J0IHRoZSBIVE1MNSBoaXN0b3J5IEFQSSBmdWxsXG4gKiBwYWdlIHJlbG9hZHMgd2lsbCBiZSB1c2VkIHRvIHByZXNlcnZlIFVSTHMuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJyb3dzZXJIaXN0b3J5KCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG4gICFfRXhlY3V0aW9uRW52aXJvbm1lbnQuY2FuVXNlRE9NID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UsICdCcm93c2VyIGhpc3RvcnkgbmVlZHMgYSBET00nKSA6IF9pbnZhcmlhbnQyWydkZWZhdWx0J10oZmFsc2UpIDogdW5kZWZpbmVkO1xuXG4gIHZhciBmb3JjZVJlZnJlc2ggPSBvcHRpb25zLmZvcmNlUmVmcmVzaDtcblxuICB2YXIgaXNTdXBwb3J0ZWQgPSBfRE9NVXRpbHMuc3VwcG9ydHNIaXN0b3J5KCk7XG4gIHZhciB1c2VSZWZyZXNoID0gIWlzU3VwcG9ydGVkIHx8IGZvcmNlUmVmcmVzaDtcblxuICBmdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24oaGlzdG9yeVN0YXRlKSB7XG4gICAgaGlzdG9yeVN0YXRlID0gaGlzdG9yeVN0YXRlIHx8IHdpbmRvdy5oaXN0b3J5LnN0YXRlIHx8IHt9O1xuXG4gICAgdmFyIHBhdGggPSBfRE9NVXRpbHMuZ2V0V2luZG93UGF0aCgpO1xuICAgIHZhciBfaGlzdG9yeVN0YXRlID0gaGlzdG9yeVN0YXRlO1xuICAgIHZhciBrZXkgPSBfaGlzdG9yeVN0YXRlLmtleTtcblxuICAgIHZhciBzdGF0ZSA9IHVuZGVmaW5lZDtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBzdGF0ZSA9IF9ET01TdGF0ZVN0b3JhZ2UucmVhZFN0YXRlKGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlID0gbnVsbDtcbiAgICAgIGtleSA9IGhpc3RvcnkuY3JlYXRlS2V5KCk7XG5cbiAgICAgIGlmIChpc1N1cHBvcnRlZCkgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKF9leHRlbmRzKHt9LCBoaXN0b3J5U3RhdGUsIHsga2V5OiBrZXkgfSksIG51bGwsIHBhdGgpO1xuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbiA9IF9wYXJzZVBhdGgyWydkZWZhdWx0J10ocGF0aCk7XG5cbiAgICByZXR1cm4gaGlzdG9yeS5jcmVhdGVMb2NhdGlvbihfZXh0ZW5kcyh7fSwgbG9jYXRpb24sIHsgc3RhdGU6IHN0YXRlIH0pLCB1bmRlZmluZWQsIGtleSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydFBvcFN0YXRlTGlzdGVuZXIoX3JlZikge1xuICAgIHZhciB0cmFuc2l0aW9uVG8gPSBfcmVmLnRyYW5zaXRpb25UbztcblxuICAgIGZ1bmN0aW9uIHBvcFN0YXRlTGlzdGVuZXIoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5zdGF0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47IC8vIElnbm9yZSBleHRyYW5lb3VzIHBvcHN0YXRlIGV2ZW50cyBpbiBXZWJLaXQuXG5cbiAgICAgIHRyYW5zaXRpb25UbyhnZXRDdXJyZW50TG9jYXRpb24oZXZlbnQuc3RhdGUpKTtcbiAgICB9XG5cbiAgICBfRE9NVXRpbHMuYWRkRXZlbnRMaXN0ZW5lcih3aW5kb3csICdwb3BzdGF0ZScsIHBvcFN0YXRlTGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIF9ET01VdGlscy5yZW1vdmVFdmVudExpc3RlbmVyKHdpbmRvdywgJ3BvcHN0YXRlJywgcG9wU3RhdGVMaXN0ZW5lcik7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmlzaFRyYW5zaXRpb24obG9jYXRpb24pIHtcbiAgICB2YXIgYmFzZW5hbWUgPSBsb2NhdGlvbi5iYXNlbmFtZTtcbiAgICB2YXIgcGF0aG5hbWUgPSBsb2NhdGlvbi5wYXRobmFtZTtcbiAgICB2YXIgc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoO1xuICAgIHZhciBoYXNoID0gbG9jYXRpb24uaGFzaDtcbiAgICB2YXIgc3RhdGUgPSBsb2NhdGlvbi5zdGF0ZTtcbiAgICB2YXIgYWN0aW9uID0gbG9jYXRpb24uYWN0aW9uO1xuICAgIHZhciBrZXkgPSBsb2NhdGlvbi5rZXk7XG5cbiAgICBpZiAoYWN0aW9uID09PSBfQWN0aW9ucy5QT1ApIHJldHVybjsgLy8gTm90aGluZyB0byBkby5cblxuICAgIF9ET01TdGF0ZVN0b3JhZ2Uuc2F2ZVN0YXRlKGtleSwgc3RhdGUpO1xuXG4gICAgdmFyIHBhdGggPSAoYmFzZW5hbWUgfHwgJycpICsgcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xuICAgIHZhciBoaXN0b3J5U3RhdGUgPSB7XG4gICAgICBrZXk6IGtleVxuICAgIH07XG5cbiAgICBpZiAoYWN0aW9uID09PSBfQWN0aW9ucy5QVVNIKSB7XG4gICAgICBpZiAodXNlUmVmcmVzaCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHBhdGg7XG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gUHJldmVudCBsb2NhdGlvbiB1cGRhdGUuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShoaXN0b3J5U3RhdGUsIG51bGwsIHBhdGgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJFUExBQ0VcbiAgICAgIGlmICh1c2VSZWZyZXNoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHBhdGgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7IC8vIFByZXZlbnQgbG9jYXRpb24gdXBkYXRlLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoaGlzdG9yeVN0YXRlLCBudWxsLCBwYXRoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBoaXN0b3J5ID0gX2NyZWF0ZURPTUhpc3RvcnkyWydkZWZhdWx0J10oX2V4dGVuZHMoe30sIG9wdGlvbnMsIHtcbiAgICBnZXRDdXJyZW50TG9jYXRpb246IGdldEN1cnJlbnRMb2NhdGlvbixcbiAgICBmaW5pc2hUcmFuc2l0aW9uOiBmaW5pc2hUcmFuc2l0aW9uLFxuICAgIHNhdmVTdGF0ZTogX0RPTVN0YXRlU3RvcmFnZS5zYXZlU3RhdGVcbiAgfSkpO1xuXG4gIHZhciBsaXN0ZW5lckNvdW50ID0gMCxcbiAgICAgIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gdW5kZWZpbmVkO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbkJlZm9yZShsaXN0ZW5lcikge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gc3RhcnRQb3BTdGF0ZUxpc3RlbmVyKGhpc3RvcnkpO1xuXG4gICAgdmFyIHVubGlzdGVuID0gaGlzdG9yeS5saXN0ZW5CZWZvcmUobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHVubGlzdGVuKCk7XG5cbiAgICAgIGlmICgtLWxpc3RlbmVyQ291bnQgPT09IDApIHN0b3BQb3BTdGF0ZUxpc3RlbmVyKCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlbihsaXN0ZW5lcikge1xuICAgIGlmICgrK2xpc3RlbmVyQ291bnQgPT09IDEpIHN0b3BQb3BTdGF0ZUxpc3RlbmVyID0gc3RhcnRQb3BTdGF0ZUxpc3RlbmVyKGhpc3RvcnkpO1xuXG4gICAgdmFyIHVubGlzdGVuID0gaGlzdG9yeS5saXN0ZW4obGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHVubGlzdGVuKCk7XG5cbiAgICAgIGlmICgtLWxpc3RlbmVyQ291bnQgPT09IDApIHN0b3BQb3BTdGF0ZUxpc3RlbmVyKCk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIGRlcHJlY2F0ZWRcbiAgZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaWYgKCsrbGlzdGVuZXJDb3VudCA9PT0gMSkgc3RvcFBvcFN0YXRlTGlzdGVuZXIgPSBzdGFydFBvcFN0YXRlTGlzdGVuZXIoaGlzdG9yeSk7XG5cbiAgICBoaXN0b3J5LnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vayk7XG4gIH1cblxuICAvLyBkZXByZWNhdGVkXG4gIGZ1bmN0aW9uIHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9vayhob29rKSB7XG4gICAgaGlzdG9yeS51bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2soaG9vayk7XG5cbiAgICBpZiAoLS1saXN0ZW5lckNvdW50ID09PSAwKSBzdG9wUG9wU3RhdGVMaXN0ZW5lcigpO1xuICB9XG5cbiAgcmV0dXJuIF9leHRlbmRzKHt9LCBoaXN0b3J5LCB7XG4gICAgbGlzdGVuQmVmb3JlOiBsaXN0ZW5CZWZvcmUsXG4gICAgbGlzdGVuOiBsaXN0ZW4sXG4gICAgcmVnaXN0ZXJUcmFuc2l0aW9uSG9vazogcmVnaXN0ZXJUcmFuc2l0aW9uSG9vayxcbiAgICB1bnJlZ2lzdGVyVHJhbnNpdGlvbkhvb2s6IHVucmVnaXN0ZXJUcmFuc2l0aW9uSG9va1xuICB9KTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlQnJvd3Nlckhpc3Rvcnk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vaGlzdG9yeS9saWIvY3JlYXRlQnJvd3Nlckhpc3RvcnkuanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAzNVxuICoqLyIsImltcG9ydCB1c2VSb3V0ZXJIaXN0b3J5IGZyb20gJy4vdXNlUm91dGVySGlzdG9yeSdcclxuXHJcbmNvbnN0IGNhblVzZURPTSA9ICEhKFxyXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY3JlYXRlSGlzdG9yeSkge1xyXG4gIGxldCBoaXN0b3J5XHJcbiAgaWYgKGNhblVzZURPTSlcclxuICAgIGhpc3RvcnkgPSB1c2VSb3V0ZXJIaXN0b3J5KGNyZWF0ZUhpc3RvcnkpKClcclxuICByZXR1cm4gaGlzdG9yeVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvbW9kdWxlcy9jcmVhdGVSb3V0ZXJIaXN0b3J5LmpzXG4gKiovIiwiaW1wb3J0IGNyZWF0ZUhhc2hIaXN0b3J5IGZyb20gJ2hpc3RvcnkvbGliL2NyZWF0ZUhhc2hIaXN0b3J5J1xyXG5pbXBvcnQgY3JlYXRlUm91dGVySGlzdG9yeSBmcm9tICcuL2NyZWF0ZVJvdXRlckhpc3RvcnknXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlckhpc3RvcnkoY3JlYXRlSGFzaEhpc3RvcnkpXHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL21vZHVsZXMvaGFzaEhpc3RvcnkuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9