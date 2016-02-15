webpackJsonp([23],{

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

	/*globals COURSES:true */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var Grades = (function (_React$Component) {
	  _inherits(Grades, _React$Component);
	
	  function Grades() {
	    _classCallCheck(this, Grades);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Grades.prototype.render = function render() {
	    var assignments = COURSES[this.props.params.courseId].assignments;
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'Grades'
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        assignments.map(function (assignment) {
	          return _react2['default'].createElement(
	            'li',
	            { key: assignment.id },
	            assignment.grade,
	            ' - ',
	            assignment.title
	          );
	        })
	      )
	    );
	  };
	
	  return Grades;
	})(_react2['default'].Component);
	
	module.exports = Grades;

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9yb3V0ZXMvR3JhZGVzL2NvbXBvbmVudHMvR3JhZGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2tDQUNrQixDQUFPOzs7O0tBRW5CLE1BQU07YUFBTixNQUFNOztZQUFOLE1BQU07MkJBQU4sTUFBTTs7Ozs7QUFBTixTQUFNLFdBQ1YsTUFBTSxxQkFBRztTQUNELFdBQVcsR0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQW5ELFdBQVc7O0FBRWpCLFlBQ0U7OztPQUNFOzs7O1FBQWU7T0FDZjs7O1NBQ0csV0FBVyxDQUFDLEdBQUcsQ0FBQyxvQkFBVTtrQkFDekI7O2VBQUksR0FBRyxFQUFFLFVBQVUsQ0FBQyxFQUFHO2FBQUUsVUFBVSxDQUFDLEtBQUs7O2FBQUssVUFBVSxDQUFDLEtBQUs7WUFBTTtVQUNyRSxDQUFDO1FBQ0M7TUFDRCxDQUNQO0lBQ0Y7O1VBZEcsTUFBTTtJQUFTLG1CQUFNLFNBQVM7O0FBaUJwQyxPQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQyIsImZpbGUiOiIyMy5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZ2xvYmFscyBDT1VSU0VTOnRydWUgKi9cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5cclxuY2xhc3MgR3JhZGVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBsZXQgeyBhc3NpZ25tZW50cyB9ID0gQ09VUlNFU1t0aGlzLnByb3BzLnBhcmFtcy5jb3Vyc2VJZF1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz5HcmFkZXM8L2gzPlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgIHthc3NpZ25tZW50cy5tYXAoYXNzaWdubWVudCA9PiAoXHJcbiAgICAgICAgICAgIDxsaSBrZXk9e2Fzc2lnbm1lbnQuaWR9Pnthc3NpZ25tZW50LmdyYWRlfSAtIHthc3NpZ25tZW50LnRpdGxlfTwvbGk+XHJcbiAgICAgICAgICApKX1cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR3JhZGVzXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9Db3Vyc2Uvcm91dGVzL0dyYWRlcy9jb21wb25lbnRzL0dyYWRlcy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=