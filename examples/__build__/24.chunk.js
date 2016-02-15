webpackJsonp([24],{

/***/ 97:
/***/ function(module, exports, __webpack_require__) {

	/*globals COURSES:true */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Dashboard = __webpack_require__(98);
	
	var _Dashboard2 = _interopRequireDefault(_Dashboard);
	
	var _Nav = __webpack_require__(99);
	
	var _Nav2 = _interopRequireDefault(_Nav);
	
	var styles = {};
	
	styles.sidebar = {
	  float: 'left',
	  width: 200,
	  padding: 20,
	  borderRight: '1px solid #aaa',
	  marginRight: 20
	};
	
	var Course = (function (_React$Component) {
	  _inherits(Course, _React$Component);
	
	  function Course() {
	    _classCallCheck(this, Course);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Course.prototype.render = function render() {
	    var _props = this.props;
	    var sidebar = _props.sidebar;
	    var main = _props.main;
	    var children = _props.children;
	    var params = _props.params;
	
	    var course = COURSES[params.courseId];
	
	    var content = undefined;
	    if (sidebar && main) {
	      content = _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'div',
	          { className: 'Sidebar', style: styles.sidebar },
	          sidebar
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'Main', style: { padding: 20 } },
	          main
	        )
	      );
	    } else if (children) {
	      content = children;
	    } else {
	      content = _react2['default'].createElement(_Dashboard2['default'], null);
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        course.name
	      ),
	      _react2['default'].createElement(_Nav2['default'], { course: course }),
	      content
	    );
	  };
	
	  return Course;
	})(_react2['default'].Component);
	
	module.exports = Course;

/***/ },

/***/ 98:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var Dashboard = (function (_React$Component) {
	  _inherits(Dashboard, _React$Component);
	
	  function Dashboard() {
	    _classCallCheck(this, Dashboard);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Dashboard.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'Course Dashboard'
	      )
	    );
	  };
	
	  return Dashboard;
	})(_react2['default'].Component);
	
	exports['default'] = Dashboard;
	module.exports = exports['default'];

/***/ },

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(2);
	
	var styles = {};
	
	styles.nav = {
	  borderBottom: '1px solid #aaa'
	};
	
	styles.link = {
	  display: 'inline-block',
	  padding: 10,
	  textDecoration: 'none'
	};
	
	styles.activeLink = _extends({}, styles.link, {
	  color: 'red'
	});
	
	var Nav = (function (_React$Component) {
	  _inherits(Nav, _React$Component);
	
	  function Nav() {
	    _classCallCheck(this, Nav);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Nav.prototype.render = function render() {
	    var course = this.props.course;
	
	    var pages = [['announcements', 'Announcements'], ['assignments', 'Assignments'], ['grades', 'Grades']];
	
	    return _react2['default'].createElement(
	      'nav',
	      { style: styles.nav },
	      pages.map(function (page, index) {
	        return _react2['default'].createElement(
	          _reactRouter.Link,
	          {
	            key: page[0],
	            activeStyle: index === 0 ? _extends({}, styles.activeLink, { paddingLeft: 0 }) : styles.activeLink,
	            style: index === 0 ? _extends({}, styles.link, { paddingLeft: 0 }) : styles.link,
	            to: '/course/' + course.id + '/' + page[0]
	          },
	          page[1]
	        );
	      })
	    );
	  };
	
	  return Nav;
	})(_react2['default'].Component);
	
	exports['default'] = Nav;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9jb21wb25lbnRzL0NvdXJzZS5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9jb21wb25lbnRzL0Rhc2hib2FyZC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9jb21wb25lbnRzL05hdi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQ0FDa0IsQ0FBTzs7OztzQ0FDSCxFQUFhOzs7O2dDQUNuQixFQUFPOzs7O0FBRXZCLEtBQU0sTUFBTSxHQUFHLEVBQUU7O0FBRWpCLE9BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixRQUFLLEVBQUUsTUFBTTtBQUNiLFFBQUssRUFBRSxHQUFHO0FBQ1YsVUFBTyxFQUFFLEVBQUU7QUFDWCxjQUFXLEVBQUUsZ0JBQWdCO0FBQzdCLGNBQVcsRUFBRSxFQUFFO0VBQ2hCOztLQUVLLE1BQU07YUFBTixNQUFNOztZQUFOLE1BQU07MkJBQU4sTUFBTTs7Ozs7QUFBTixTQUFNLFdBQ1YsTUFBTSxxQkFBRztrQkFDbUMsSUFBSSxDQUFDLEtBQUs7U0FBOUMsT0FBTyxVQUFQLE9BQU87U0FBRSxJQUFJLFVBQUosSUFBSTtTQUFFLFFBQVEsVUFBUixRQUFRO1NBQUUsTUFBTSxVQUFOLE1BQU07O0FBQ3JDLFNBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDOztBQUVyQyxTQUFJLE9BQU87QUFDWCxTQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFDbkIsY0FBTyxHQUNMOzs7U0FDRTs7YUFBSyxTQUFTLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBUTtXQUM1QyxPQUFPO1VBQ0o7U0FDTjs7YUFBSyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUc7V0FDMUMsSUFBSTtVQUNEO1FBRVQ7TUFDRixNQUFNLElBQUksUUFBUSxFQUFFO0FBQ25CLGNBQU8sR0FBRyxRQUFRO01BQ25CLE1BQU07QUFDTCxjQUFPLEdBQUcsOERBQWE7TUFDeEI7O0FBRUQsWUFDRTs7O09BQ0U7OztTQUFLLE1BQU0sQ0FBQyxJQUFJO1FBQU07T0FDdEIscURBQUssTUFBTSxFQUFFLE1BQU8sR0FBRztPQUN0QixPQUFPO01BQ0osQ0FDUDtJQUNGOztVQTlCRyxNQUFNO0lBQVMsbUJBQU0sU0FBUzs7QUFpQ3BDLE9BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztrQ0NoREwsQ0FBTzs7OztLQUVuQixTQUFTO2FBQVQsU0FBUzs7WUFBVCxTQUFTOzJCQUFULFNBQVM7Ozs7O0FBQVQsWUFBUyxXQUNiLE1BQU0scUJBQUc7QUFDUCxZQUNFOzs7T0FDRTs7OztRQUF5QjtNQUNyQixDQUNQO0lBQ0Y7O1VBUEcsU0FBUztJQUFTLG1CQUFNLFNBQVM7O3NCQVV4QixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0NaTixDQUFPOzs7O3dDQUNKLENBQWM7O0FBRW5DLEtBQU0sTUFBTSxHQUFHLEVBQUU7O0FBRWpCLE9BQU0sQ0FBQyxHQUFHLEdBQUc7QUFDWCxlQUFZLEVBQUUsZ0JBQWdCO0VBQy9COztBQUVELE9BQU0sQ0FBQyxJQUFJLEdBQUc7QUFDWixVQUFPLEVBQUUsY0FBYztBQUN2QixVQUFPLEVBQUUsRUFBRTtBQUNYLGlCQUFjLEVBQUUsTUFBTTtFQUN2Qjs7QUFFRCxPQUFNLENBQUMsVUFBVSxnQkFDWixNQUFNLENBQUMsSUFBSTtBQUNkLFFBQUssRUFBRSxLQUFLO0dBQ2I7O0tBRUssR0FBRzthQUFILEdBQUc7O1lBQUgsR0FBRzsyQkFBSCxHQUFHOzs7OztBQUFILE1BQUcsV0FDUCxNQUFNLHFCQUFHO1NBQ0MsTUFBTSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQXJCLE1BQU07O0FBQ2QsU0FBTSxLQUFLLEdBQUcsQ0FDWixDQUFFLGVBQWUsRUFBRSxlQUFlLENBQUUsRUFDcEMsQ0FBRSxhQUFhLEVBQUUsYUFBYSxDQUFFLEVBQ2hDLENBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBRSxDQUN2Qjs7QUFFRCxZQUNFOztTQUFLLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBSTtPQUNwQixLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7Z0JBQ3JCOzs7QUFDRSxnQkFBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUU7QUFDYix3QkFBVyxFQUFFLEtBQUssS0FBSyxDQUFDLGdCQUFRLE1BQU0sQ0FBQyxVQUFVLElBQUUsV0FBVyxFQUFFLENBQUMsTUFBSyxNQUFNLENBQUMsVUFBVztBQUN4RixrQkFBSyxFQUFFLEtBQUssS0FBSyxDQUFDLGdCQUFRLE1BQU0sQ0FBQyxJQUFJLElBQUUsV0FBVyxFQUFFLENBQUMsTUFBSyxNQUFNLENBQUMsSUFBSztBQUN0RSxlQUFFLGVBQWEsTUFBTSxDQUFDLEVBQUUsU0FBSSxJQUFJLENBQUMsQ0FBQyxDQUFJOztXQUN0QyxJQUFJLENBQUMsQ0FBQyxDQUFDO1VBQVE7UUFDbEIsQ0FBQztNQUNFLENBQ1A7SUFDRjs7VUFyQkcsR0FBRztJQUFTLG1CQUFNLFNBQVM7O3NCQXdCbEIsR0FBRyIsImZpbGUiOiIyNC5jaHVuay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZ2xvYmFscyBDT1VSU0VTOnRydWUgKi9cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vRGFzaGJvYXJkJ1xyXG5pbXBvcnQgTmF2IGZyb20gJy4vTmF2J1xyXG5cclxuY29uc3Qgc3R5bGVzID0ge31cclxuXHJcbnN0eWxlcy5zaWRlYmFyID0ge1xyXG4gIGZsb2F0OiAnbGVmdCcsXHJcbiAgd2lkdGg6IDIwMCxcclxuICBwYWRkaW5nOiAyMCxcclxuICBib3JkZXJSaWdodDogJzFweCBzb2xpZCAjYWFhJyxcclxuICBtYXJnaW5SaWdodDogMjBcclxufVxyXG5cclxuY2xhc3MgQ291cnNlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBsZXQgeyBzaWRlYmFyLCBtYWluLCBjaGlsZHJlbiwgcGFyYW1zIH0gPSB0aGlzLnByb3BzXHJcbiAgICBsZXQgY291cnNlID0gQ09VUlNFU1twYXJhbXMuY291cnNlSWRdXHJcblxyXG4gICAgbGV0IGNvbnRlbnRcclxuICAgIGlmIChzaWRlYmFyICYmIG1haW4pIHtcclxuICAgICAgY29udGVudCA9IChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJTaWRlYmFyXCIgc3R5bGU9e3N0eWxlcy5zaWRlYmFyfT5cclxuICAgICAgICAgICAge3NpZGViYXJ9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTWFpblwiIHN0eWxlPXt7IHBhZGRpbmc6IDIwIH19PlxyXG4gICAgICAgICAgICB7bWFpbn1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApXHJcbiAgICB9IGVsc2UgaWYgKGNoaWxkcmVuKSB7XHJcbiAgICAgIGNvbnRlbnQgPSBjaGlsZHJlblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29udGVudCA9IDxEYXNoYm9hcmQgLz5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMj57Y291cnNlLm5hbWV9PC9oMj5cclxuICAgICAgICA8TmF2IGNvdXJzZT17Y291cnNlfSAvPlxyXG4gICAgICAgIHtjb250ZW50fVxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ291cnNlXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9Db3Vyc2UvY29tcG9uZW50cy9Db3Vyc2UuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcblxyXG5jbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgzPkNvdXJzZSBEYXNoYm9hcmQ8L2gzPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ291cnNlL2NvbXBvbmVudHMvRGFzaGJvYXJkLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xyXG5cclxuY29uc3Qgc3R5bGVzID0ge31cclxuXHJcbnN0eWxlcy5uYXYgPSB7XHJcbiAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICNhYWEnXHJcbn1cclxuXHJcbnN0eWxlcy5saW5rID0ge1xyXG4gIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gIHBhZGRpbmc6IDEwLFxyXG4gIHRleHREZWNvcmF0aW9uOiAnbm9uZSdcclxufVxyXG5cclxuc3R5bGVzLmFjdGl2ZUxpbmsgPSB7XHJcbiAgLi4uc3R5bGVzLmxpbmssXHJcbiAgY29sb3I6ICdyZWQnXHJcbn1cclxuXHJcbmNsYXNzIE5hdiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBjb3Vyc2UgfSA9IHRoaXMucHJvcHNcclxuICAgIGNvbnN0IHBhZ2VzID0gW1xyXG4gICAgICBbICdhbm5vdW5jZW1lbnRzJywgJ0Fubm91bmNlbWVudHMnIF0sXHJcbiAgICAgIFsgJ2Fzc2lnbm1lbnRzJywgJ0Fzc2lnbm1lbnRzJyBdLFxyXG4gICAgICBbICdncmFkZXMnLCAnR3JhZGVzJyBdXHJcbiAgICBdXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPG5hdiBzdHlsZT17c3R5bGVzLm5hdn0+XHJcbiAgICAgICAge3BhZ2VzLm1hcCgocGFnZSwgaW5kZXgpID0+IChcclxuICAgICAgICAgIDxMaW5rXHJcbiAgICAgICAgICAgIGtleT17cGFnZVswXX1cclxuICAgICAgICAgICAgYWN0aXZlU3R5bGU9e2luZGV4ID09PSAwID8geyAuLi5zdHlsZXMuYWN0aXZlTGluaywgcGFkZGluZ0xlZnQ6IDAgfSA6IHN0eWxlcy5hY3RpdmVMaW5rfVxyXG4gICAgICAgICAgICBzdHlsZT17aW5kZXggPT09IDAgPyB7IC4uLnN0eWxlcy5saW5rLCBwYWRkaW5nTGVmdDogMCB9IDogc3R5bGVzLmxpbmt9XHJcbiAgICAgICAgICAgIHRvPXtgL2NvdXJzZS8ke2NvdXJzZS5pZH0vJHtwYWdlWzBdfWB9XHJcbiAgICAgICAgICA+e3BhZ2VbMV19PC9MaW5rPlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L25hdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdlxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ291cnNlL2NvbXBvbmVudHMvTmF2LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==