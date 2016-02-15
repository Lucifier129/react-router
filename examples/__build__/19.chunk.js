webpackJsonp([19],{

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	/*globals COURSES:true */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(2);
	
	var AnnouncementsSidebar = (function (_React$Component) {
	  _inherits(AnnouncementsSidebar, _React$Component);
	
	  function AnnouncementsSidebar() {
	    _classCallCheck(this, AnnouncementsSidebar);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  AnnouncementsSidebar.prototype.render = function render() {
	    var _this = this;
	
	    var announcements = COURSES[this.props.params.courseId].announcements;
	
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
	        announcements.map(function (announcement) {
	          return _react2['default'].createElement(
	            'li',
	            { key: announcement.id },
	            _react2['default'].createElement(
	              _reactRouter.Link,
	              { to: '/course/' + _this.props.params.courseId + '/announcements/' + announcement.id },
	              announcement.title
	            )
	          );
	        })
	      )
	    );
	  };
	
	  return AnnouncementsSidebar;
	})(_react2['default'].Component);
	
	module.exports = AnnouncementsSidebar;

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var Announcements = (function (_React$Component) {
	  _inherits(Announcements, _React$Component);
	
	  function Announcements() {
	    _classCallCheck(this, Announcements);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Announcements.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'Announcements'
	      ),
	      this.props.children || _react2['default'].createElement(
	        'p',
	        null,
	        'Choose an announcement from the sidebar.'
	      )
	    );
	  };
	
	  return Announcements;
	})(_react2['default'].Component);
	
	module.exports = Announcements;

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9yb3V0ZXMvQW5ub3VuY2VtZW50cy9jb21wb25lbnRzL1NpZGViYXIuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9Db3Vyc2Uvcm91dGVzL0Fubm91bmNlbWVudHMvY29tcG9uZW50cy9Bbm5vdW5jZW1lbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tDQUNrQixDQUFPOzs7O3dDQUNKLENBQWM7O0tBRTdCLG9CQUFvQjthQUFwQixvQkFBb0I7O1lBQXBCLG9CQUFvQjsyQkFBcEIsb0JBQW9COzs7OztBQUFwQix1QkFBb0IsV0FDeEIsTUFBTSxxQkFBRzs7O1NBQ0QsYUFBYSxHQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBckQsYUFBYTs7QUFFbkIsWUFDRTs7O09BQ0U7Ozs7UUFBNEI7T0FDNUI7OztTQUNHLGFBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQVk7a0JBQzdCOztlQUFJLEdBQUcsRUFBRSxZQUFZLENBQUMsRUFBRzthQUN2Qjs7aUJBQU0sRUFBRSxlQUFhLE1BQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLHVCQUFrQixZQUFZLENBQUMsRUFBSztlQUNoRixZQUFZLENBQUMsS0FBSztjQUNkO1lBQ0o7VUFDTixDQUFDO1FBQ0M7TUFDRCxDQUNQO0lBQ0Y7O1VBbEJHLG9CQUFvQjtJQUFTLG1CQUFNLFNBQVM7O0FBcUJsRCxPQUFNLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDOzs7Ozs7Ozs7Ozs7Ozs7a0NDekJuQixDQUFPOzs7O0tBRW5CLGFBQWE7YUFBYixhQUFhOztZQUFiLGFBQWE7MkJBQWIsYUFBYTs7Ozs7QUFBYixnQkFBYSxXQUNqQixNQUFNLHFCQUFHO0FBQ1AsWUFDRTs7O09BQ0U7Ozs7UUFBc0I7T0FDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUk7Ozs7UUFBK0M7TUFDbkUsQ0FDUDtJQUNGOztVQVJHLGFBQWE7SUFBUyxtQkFBTSxTQUFTOztBQVczQyxPQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQyIsImZpbGUiOiIxOS5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZ2xvYmFscyBDT1VSU0VTOnRydWUgKi9cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xyXG5cclxuY2xhc3MgQW5ub3VuY2VtZW50c1NpZGViYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGxldCB7IGFubm91bmNlbWVudHMgfSA9IENPVVJTRVNbdGhpcy5wcm9wcy5wYXJhbXMuY291cnNlSWRdXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDM+U2lkZWJhciBBc3NpZ25tZW50czwvaDM+XHJcbiAgICAgICAgPHVsPlxyXG4gICAgICAgICAge2Fubm91bmNlbWVudHMubWFwKGFubm91bmNlbWVudCA9PiAoXHJcbiAgICAgICAgICAgIDxsaSBrZXk9e2Fubm91bmNlbWVudC5pZH0+XHJcbiAgICAgICAgICAgICAgPExpbmsgdG89e2AvY291cnNlLyR7dGhpcy5wcm9wcy5wYXJhbXMuY291cnNlSWR9L2Fubm91bmNlbWVudHMvJHthbm5vdW5jZW1lbnQuaWR9YH0+XHJcbiAgICAgICAgICAgICAgICB7YW5ub3VuY2VtZW50LnRpdGxlfVxyXG4gICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBbm5vdW5jZW1lbnRzU2lkZWJhclxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bbm5vdW5jZW1lbnRzL2NvbXBvbmVudHMvU2lkZWJhci5qc1xuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmNsYXNzIEFubm91bmNlbWVudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgzPkFubm91bmNlbWVudHM8L2gzPlxyXG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVuIHx8IDxwPkNob29zZSBhbiBhbm5vdW5jZW1lbnQgZnJvbSB0aGUgc2lkZWJhci48L3A+fVxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQW5ub3VuY2VtZW50c1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bbm5vdW5jZW1lbnRzL2NvbXBvbmVudHMvQW5ub3VuY2VtZW50cy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=