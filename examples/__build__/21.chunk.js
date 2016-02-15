webpackJsonp([21],{

/***/ 92:
/***/ function(module, exports, __webpack_require__) {

	/*globals COURSES:true */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var Assignment = (function (_React$Component) {
	  _inherits(Assignment, _React$Component);
	
	  function Assignment() {
	    _classCallCheck(this, Assignment);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Assignment.prototype.render = function render() {
	    var _props$params = this.props.params;
	    var courseId = _props$params.courseId;
	    var assignmentId = _props$params.assignmentId;
	    var _COURSES$courseId$assignments$assignmentId = COURSES[courseId].assignments[assignmentId];
	    var title = _COURSES$courseId$assignments$assignmentId.title;
	    var body = _COURSES$courseId$assignments$assignmentId.body;
	
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
	
	  return Assignment;
	})(_react2['default'].Component);
	
	module.exports = Assignment;

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9yb3V0ZXMvQXNzaWdubWVudHMvcm91dGVzL0Fzc2lnbm1lbnQvY29tcG9uZW50cy9Bc3NpZ25tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tDQUNrQixDQUFPOzs7O0tBRW5CLFVBQVU7YUFBVixVQUFVOztZQUFWLFVBQVU7MkJBQVYsVUFBVTs7Ozs7QUFBVixhQUFVLFdBQ2QsTUFBTSxxQkFBRzt5QkFDMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQTVDLFFBQVEsaUJBQVIsUUFBUTtTQUFFLFlBQVksaUJBQVosWUFBWTtzREFDTixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztTQUEzRCxLQUFLLDhDQUFMLEtBQUs7U0FBRSxJQUFJLDhDQUFKLElBQUk7O0FBRWpCLFlBQ0U7OztPQUNFOzs7U0FBSyxLQUFLO1FBQU07T0FDaEI7OztTQUFJLElBQUk7UUFBSztNQUNULENBQ1A7SUFDRjs7VUFYRyxVQUFVO0lBQVMsbUJBQU0sU0FBUzs7QUFjeEMsT0FBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLEMiLCJmaWxlIjoiMjEuY2h1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmdsb2JhbHMgQ09VUlNFUzp0cnVlICovXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuXHJcbmNsYXNzIEFzc2lnbm1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGxldCB7IGNvdXJzZUlkLCBhc3NpZ25tZW50SWQgfSA9IHRoaXMucHJvcHMucGFyYW1zXHJcbiAgICBsZXQgeyB0aXRsZSwgYm9keSB9ID0gQ09VUlNFU1tjb3Vyc2VJZF0uYXNzaWdubWVudHNbYXNzaWdubWVudElkXVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGg0Pnt0aXRsZX08L2g0PlxyXG4gICAgICAgIDxwPntib2R5fTwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2lnbm1lbnRcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9yb3V0ZXMvQXNzaWdubWVudHMvcm91dGVzL0Fzc2lnbm1lbnQvY29tcG9uZW50cy9Bc3NpZ25tZW50LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==