webpackJsonp([18],{

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	/*globals COURSES:true */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var Announcement = (function (_React$Component) {
	  _inherits(Announcement, _React$Component);
	
	  function Announcement() {
	    _classCallCheck(this, Announcement);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Announcement.prototype.render = function render() {
	    var _props$params = this.props.params;
	    var courseId = _props$params.courseId;
	    var announcementId = _props$params.announcementId;
	    var _COURSES$courseId$announcements$announcementId = COURSES[courseId].announcements[announcementId];
	    var title = _COURSES$courseId$announcements$announcementId.title;
	    var body = _COURSES$courseId$announcements$announcementId.body;
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h4',
	        null,
	        title
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        body
	      )
	    );
	  };
	
	  return Announcement;
	})(_react2['default'].Component);
	
	module.exports = Announcement;

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9yb3V0ZXMvQW5ub3VuY2VtZW50cy9yb3V0ZXMvQW5ub3VuY2VtZW50L2NvbXBvbmVudHMvQW5ub3VuY2VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tDQUNrQixDQUFPOzs7O0tBRW5CLFlBQVk7YUFBWixZQUFZOztZQUFaLFlBQVk7MkJBQVosWUFBWTs7Ozs7QUFBWixlQUFZLFdBQ2hCLE1BQU0scUJBQUc7eUJBQzRCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtTQUE5QyxRQUFRLGlCQUFSLFFBQVE7U0FBRSxjQUFjLGlCQUFkLGNBQWM7MERBQ1IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7U0FBL0QsS0FBSyxrREFBTCxLQUFLO1NBQUUsSUFBSSxrREFBSixJQUFJOztBQUVqQixZQUNFOzs7T0FDRTs7O1NBQUssS0FBSztRQUFNO09BQ2hCOzs7U0FBSSxJQUFJO1FBQUs7TUFDVCxDQUNQO0lBQ0Y7O1VBWEcsWUFBWTtJQUFTLG1CQUFNLFNBQVM7O0FBYzFDLE9BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDIiwiZmlsZSI6IjE4LmNodW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWxzIENPVVJTRVM6dHJ1ZSAqL1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcblxyXG5jbGFzcyBBbm5vdW5jZW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGxldCB7IGNvdXJzZUlkLCBhbm5vdW5jZW1lbnRJZCB9ID0gdGhpcy5wcm9wcy5wYXJhbXNcclxuICAgIGxldCB7IHRpdGxlLCBib2R5IH0gPSBDT1VSU0VTW2NvdXJzZUlkXS5hbm5vdW5jZW1lbnRzW2Fubm91bmNlbWVudElkXVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGg0Pnt0aXRsZX08L2g0PlxyXG4gICAgICAgIDxwPntib2R5fTwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFubm91bmNlbWVudFxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bbm5vdW5jZW1lbnRzL3JvdXRlcy9Bbm5vdW5jZW1lbnQvY29tcG9uZW50cy9Bbm5vdW5jZW1lbnQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9