webpackJsonp([22],{

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	/*globals COURSES:true */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(2);
	
	var Sidebar = (function (_React$Component) {
	  _inherits(Sidebar, _React$Component);
	
	  function Sidebar() {
	    _classCallCheck(this, Sidebar);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Sidebar.prototype.render = function render() {
	    var _this = this;
	
	    var assignments = COURSES[this.props.params.courseId].assignments;
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'Sidebar Assignments'
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        assignments.map(function (assignment) {
	          return _react2['default'].createElement(
	            'li',
	            { key: assignment.id },
	            _react2['default'].createElement(
	              _reactRouter.Link,
	              { to: '/course/' + _this.props.params.courseId + '/assignments/' + assignment.id },
	              assignment.title
	            )
	          );
	        })
	      )
	    );
	  };
	
	  return Sidebar;
	})(_react2['default'].Component);
	
	module.exports = Sidebar;

/***/ },

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var Assignments = (function (_React$Component) {
	  _inherits(Assignments, _React$Component);
	
	  function Assignments() {
	    _classCallCheck(this, Assignments);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Assignments.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'Assignments'
	      ),
	      this.props.children || _react2['default'].createElement(
	        'p',
	        null,
	        'Choose an assignment from the sidebar.'
	      )
	    );
	  };
	
	  return Assignments;
	})(_react2['default'].Component);
	
	module.exports = Assignments;

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9yb3V0ZXMvQXNzaWdubWVudHMvY29tcG9uZW50cy9TaWRlYmFyLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bc3NpZ25tZW50cy9jb21wb25lbnRzL0Fzc2lnbm1lbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tDQUNrQixDQUFPOzs7O3dDQUNKLENBQWM7O0tBRTdCLE9BQU87YUFBUCxPQUFPOztZQUFQLE9BQU87MkJBQVAsT0FBTzs7Ozs7QUFBUCxVQUFPLFdBQ1gsTUFBTSxxQkFBRzs7O1NBQ0QsV0FBVyxHQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBbkQsV0FBVzs7QUFFakIsWUFDRTs7O09BQ0U7Ozs7UUFBNEI7T0FDNUI7OztTQUNHLFdBQVcsQ0FBQyxHQUFHLENBQUMsb0JBQVU7a0JBQ3pCOztlQUFJLEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRzthQUNyQjs7aUJBQU0sRUFBRSxlQUFhLE1BQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLHFCQUFnQixVQUFVLENBQUMsRUFBSztlQUM1RSxVQUFVLENBQUMsS0FBSztjQUNaO1lBQ0o7VUFDTixDQUFDO1FBQ0M7TUFDRCxDQUNQO0lBQ0Y7O1VBbEJHLE9BQU87SUFBUyxtQkFBTSxTQUFTOztBQXFCckMsT0FBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLEM7Ozs7Ozs7Ozs7Ozs7OztrQ0N6Qk4sQ0FBTzs7OztLQUVuQixXQUFXO2FBQVgsV0FBVzs7WUFBWCxXQUFXOzJCQUFYLFdBQVc7Ozs7O0FBQVgsY0FBVyxXQUNmLE1BQU0scUJBQUc7QUFDUCxZQUNFOzs7T0FDRTs7OztRQUFvQjtPQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSTs7OztRQUE2QztNQUNqRSxDQUNQO0lBQ0Y7O1VBUkcsV0FBVztJQUFTLG1CQUFNLFNBQVM7O0FBV3pDLE9BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDIiwiZmlsZSI6IjIyLmNodW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWxzIENPVVJTRVM6dHJ1ZSAqL1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXHJcblxyXG5jbGFzcyBTaWRlYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBsZXQgeyBhc3NpZ25tZW50cyB9ID0gQ09VUlNFU1t0aGlzLnByb3BzLnBhcmFtcy5jb3Vyc2VJZF1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz5TaWRlYmFyIEFzc2lnbm1lbnRzPC9oMz5cclxuICAgICAgICA8dWw+XHJcbiAgICAgICAgICB7YXNzaWdubWVudHMubWFwKGFzc2lnbm1lbnQgPT4gKFxyXG4gICAgICAgICAgICA8bGkga2V5PXthc3NpZ25tZW50LmlkfT5cclxuICAgICAgICAgICAgICA8TGluayB0bz17YC9jb3Vyc2UvJHt0aGlzLnByb3BzLnBhcmFtcy5jb3Vyc2VJZH0vYXNzaWdubWVudHMvJHthc3NpZ25tZW50LmlkfWB9PlxyXG4gICAgICAgICAgICAgICAge2Fzc2lnbm1lbnQudGl0bGV9XHJcbiAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNpZGViYXJcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9yb3V0ZXMvQXNzaWdubWVudHMvY29tcG9uZW50cy9TaWRlYmFyLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuY2xhc3MgQXNzaWdubWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgzPkFzc2lnbm1lbnRzPC9oMz5cclxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbiB8fCA8cD5DaG9vc2UgYW4gYXNzaWdubWVudCBmcm9tIHRoZSBzaWRlYmFyLjwvcD59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBc3NpZ25tZW50c1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bc3NpZ25tZW50cy9jb21wb25lbnRzL0Fzc2lnbm1lbnRzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==