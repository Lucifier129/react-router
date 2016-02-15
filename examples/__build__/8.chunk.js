webpackJsonp([8],{

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsAuth = __webpack_require__(66);
	
	var _utilsAuth2 = _interopRequireDefault(_utilsAuth);
	
	var Dashboard = _react2['default'].createClass({
	  displayName: 'Dashboard',
	
	  render: function render() {
	    var token = _utilsAuth2['default'].getToken();
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'Dashboard'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'You made it!'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        token
	      ),
	      this.props.children
	    );
	  }
	});
	
	exports['default'] = Dashboard;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvY29tcG9uZW50cy9EYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7c0NBQ1IsRUFBZTs7OztBQUVoQyxLQUFNLFNBQVMsR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUNsQyxTQUFNLG9CQUFHO0FBQ1AsU0FBTSxLQUFLLEdBQUcsdUJBQUssUUFBUSxFQUFFOztBQUU3QixZQUNFOzs7T0FDRTs7OztRQUFrQjtPQUNsQjs7OztRQUFtQjtPQUNuQjs7O1NBQUksS0FBSztRQUFLO09BQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO01BQ2hCLENBQ1A7SUFDRjtFQUNGLENBQUM7O3NCQUVhLFNBQVMiLCJmaWxlIjoiOC5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IGF1dGggZnJvbSAnLi4vdXRpbHMvYXV0aCdcclxuXHJcbmNvbnN0IERhc2hib2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB0b2tlbiA9IGF1dGguZ2V0VG9rZW4oKVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgxPkRhc2hib2FyZDwvaDE+XHJcbiAgICAgICAgPHA+WW91IG1hZGUgaXQhPC9wPlxyXG4gICAgICAgIDxwPnt0b2tlbn08L3A+XHJcbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC9jb21wb25lbnRzL0Rhc2hib2FyZC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=