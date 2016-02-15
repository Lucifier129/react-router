webpackJsonp([14],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/*eslint-disable no-unused-vars */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactRouter = __webpack_require__(2);
	
	var _stubsCOURSES = __webpack_require__(80);
	
	var _stubsCOURSES2 = _interopRequireDefault(_stubsCOURSES);
	
	var rootRoute = {
	  component: 'div',
	  childRoutes: [{
	    path: '/',
	    component: __webpack_require__(81),
	    childRoutes: [__webpack_require__(78), __webpack_require__(84), __webpack_require__(100), __webpack_require__(102), __webpack_require__(104)]
	  }]
	};
	
	_reactDom.render(_react2['default'].createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: rootRoute }), document.getElementById('example'));
	
	// I've unrolled the recursive directory loop that is happening above to get a
	// better idea of just what this huge-apps Router looks like, or just look at the
	// file system :)
	//
	// import { Route } from 'react-router'

	// import App from './components/App'
	// import Course from './routes/Course/components/Course'
	// import AnnouncementsSidebar from './routes/Course/routes/Announcements/components/Sidebar'
	// import Announcements from './routes/Course/routes/Announcements/components/Announcements'
	// import Announcement from './routes/Course/routes/Announcements/routes/Announcement/components/Announcement'
	// import AssignmentsSidebar from './routes/Course/routes/Assignments/components/Sidebar'
	// import Assignments from './routes/Course/routes/Assignments/components/Assignments'
	// import Assignment from './routes/Course/routes/Assignments/routes/Assignment/components/Assignment'
	// import CourseGrades from './routes/Course/routes/Grades/components/Grades'
	// import Calendar from './routes/Calendar/components/Calendar'
	// import Grades from './routes/Grades/components/Grades'
	// import Messages from './routes/Messages/components/Messages'

	// render(
	//   <Router>
	//     <Route path="/" component={App}>
	//       <Route path="calendar" component={Calendar} />
	//       <Route path="course/:courseId" component={Course}>
	//         <Route path="announcements" components={{
	//           sidebar: AnnouncementsSidebar,
	//           main: Announcements
	//         }}>
	//           <Route path=":announcementId" component={Announcement} />
	//         </Route>
	//         <Route path="assignments" components={{
	//           sidebar: AssignmentsSidebar,
	//           main: Assignments
	//         }}>
	//           <Route path=":assignmentId" component={Assignment} />
	//         </Route>
	//         <Route path="grades" component={CourseGrades} />
	//       </Route>
	//       <Route path="grades" component={Grades} />
	//       <Route path="messages" component={Messages} />
	//       <Route path="profile" component={Calendar} />
	//     </Route>
	//   </Router>,
	//   document.getElementById('example')
	// )

/***/ },

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'calendar',
	  getComponent: function getComponent(location, cb) {
	    __webpack_require__.e/* nsure */(15, function (require) {
	      cb(null, __webpack_require__(79));
	    });
	  }
	};

/***/ },

/***/ 80:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	global.COURSES = [{
	  id: 0,
	  name: 'React Fundamentals',
	  grade: 'B',
	  announcements: [{
	    id: 0,
	    title: 'No class tomorrow',
	    body: 'There is no class tomorrow, please do not show up'
	  }],
	  assignments: [{
	    id: 0,
	    title: 'Build a router',
	    body: 'It will be easy, seriously, like 2 hours, 100 lines of code, no biggie',
	    grade: 'N/A'
	  }]
	
	}, {
	  id: 1,
	  name: 'Reusable React Components',
	  grade: 'A-',
	  announcements: [{
	    id: 0,
	    title: 'Final exam next wednesday',
	    body: 'You had better prepare'
	  }],
	  assignments: [{
	    id: 0,
	    title: 'PropTypes',
	    body: 'They aren\'t for you.',
	    grade: '80%'
	  }, {
	    id: 1,
	    title: 'Iterating and Cloning Children',
	    body: 'You can totally do it.',
	    grade: '95%'
	  }]
	}];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 81:
/***/ function(module, exports, __webpack_require__) {

	/*globals COURSES:true */
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Dashboard = __webpack_require__(82);
	
	var _Dashboard2 = _interopRequireDefault(_Dashboard);
	
	var _GlobalNav = __webpack_require__(83);
	
	var _GlobalNav2 = _interopRequireDefault(_GlobalNav);
	
	var App = (function (_React$Component) {
	  _inherits(App, _React$Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  App.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(_GlobalNav2['default'], null),
	      _react2['default'].createElement(
	        'div',
	        { style: { padding: 20 } },
	        this.props.children || _react2['default'].createElement(_Dashboard2['default'], { courses: COURSES })
	      )
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	module.exports = App;

/***/ },

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(2);
	
	var Dashboard = (function (_React$Component) {
	  _inherits(Dashboard, _React$Component);
	
	  function Dashboard() {
	    _classCallCheck(this, Dashboard);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  Dashboard.prototype.render = function render() {
	    var courses = this.props.courses;
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Super Scalable Apps'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'Open the network tab as you navigate. Notice that only the amount of your app that is required is actually downloaded as you navigate around. Even the route configuration objects are loaded on the fly. This way, a new route added deep in your app will not affect the initial bundle of your application.'
	      ),
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Courses'
	      ),
	      ' ',
	      _react2['default'].createElement(
	        'ul',
	        null,
	        courses.map(function (course) {
	          return _react2['default'].createElement(
	            'li',
	            { key: course.id },
	            _react2['default'].createElement(
	              _reactRouter.Link,
	              { to: '/course/' + course.id },
	              course.name
	            )
	          );
	        })
	      )
	    );
	  };
	
	  return Dashboard;
	})(_react2['default'].Component);
	
	exports['default'] = Dashboard;
	module.exports = exports['default'];

/***/ },

/***/ 83:
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
	
	var dark = 'hsl(200, 20%, 20%)';
	var light = '#fff';
	var styles = {};
	
	styles.wrapper = {
	  padding: '10px 20px',
	  overflow: 'hidden',
	  background: dark,
	  color: light
	};
	
	styles.link = {
	  padding: 11,
	  color: light,
	  fontWeight: 200
	};
	
	styles.activeLink = _extends({}, styles.link, {
	  background: light,
	  color: dark
	});
	
	var GlobalNav = (function (_React$Component) {
	  _inherits(GlobalNav, _React$Component);
	
	  function GlobalNav(props, context) {
	    _classCallCheck(this, GlobalNav);
	
	    _React$Component.call(this, props, context);
	    this.logOut = this.logOut.bind(this);
	  }
	
	  GlobalNav.prototype.logOut = function logOut() {
	    alert('log out');
	  };
	
	  GlobalNav.prototype.render = function render() {
	    var user = this.props.user;
	
	    return _react2['default'].createElement(
	      'div',
	      { style: styles.wrapper },
	      _react2['default'].createElement(
	        'div',
	        { style: { float: 'left' } },
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/', style: styles.link },
	          'Home'
	        ),
	        ' ',
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/calendar', style: styles.link, activeStyle: styles.activeLink },
	          'Calendar'
	        ),
	        ' ',
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/grades', style: styles.link, activeStyle: styles.activeLink },
	          'Grades'
	        ),
	        ' ',
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/messages', style: styles.link, activeStyle: styles.activeLink },
	          'Messages'
	        ),
	        ' '
	      ),
	      _react2['default'].createElement(
	        'div',
	        { style: { float: 'right' } },
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { style: styles.link, to: '/profile' },
	          user.name
	        ),
	        ' ',
	        _react2['default'].createElement(
	          'button',
	          { onClick: this.logOut },
	          'log out'
	        )
	      )
	    );
	  };
	
	  return GlobalNav;
	})(_react2['default'].Component);
	
	GlobalNav.defaultProps = {
	  user: {
	    id: 1,
	    name: 'Ryan Florence'
	  }
	};
	
	exports['default'] = GlobalNav;
	module.exports = exports['default'];

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'course/:courseId',
	
	  getChildRoutes: function getChildRoutes(location, cb) {
	    __webpack_require__.e/* nsure */(16, function (require) {
	      cb(null, [__webpack_require__(85), __webpack_require__(90), __webpack_require__(95)]);
	    });
	  },
	
	  getComponent: function getComponent(location, cb) {
	    __webpack_require__.e/* nsure */(24, function (require) {
	      cb(null, __webpack_require__(97));
	    });
	  }
	};

/***/ },

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'grades',
	  getComponent: function getComponent(location, cb) {
	    __webpack_require__.e/* nsure */(25, function (require) {
	      cb(null, __webpack_require__(101));
	    });
	  }
	};

/***/ },

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'messages',
	  getComponent: function getComponent(location, cb) {
	    __webpack_require__.e/* nsure */(26, function (require) {
	      cb(null, __webpack_require__(103));
	    });
	  }
	};

/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'profile',
	  getComponent: function getComponent(location, cb) {
	    __webpack_require__.e/* nsure */(27, function (require) {
	      cb(null, __webpack_require__(105));
	    });
	  }
	};

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvYXBwLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ2FsZW5kYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3N0dWJzL0NPVVJTRVMuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL2NvbXBvbmVudHMvQXBwLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9jb21wb25lbnRzL0Rhc2hib2FyZC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvY29tcG9uZW50cy9HbG9iYWxOYXYuanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9Db3Vyc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9HcmFkZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9NZXNzYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL1Byb2ZpbGUvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztrQ0FDa0IsQ0FBTzs7OztxQ0FDRixDQUFXOzt3Q0FDSyxDQUFjOzt5Q0FDMUIsRUFBaUI7Ozs7QUFFNUMsS0FBTSxTQUFTLEdBQUc7QUFDaEIs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LEVBQUUsRUFBRTtBQUN6QiwwQ0FBbUIsVUFBQyxPQUFPLEVBQUs7QUFDOUIsU0FBRSxDQUFDLElBQUksRUFBRSxtQkFBTyxDQUFDLEdBQXNCLENBQUMsQ0FBQztNQUMxQyxDQUFDO0lBQ0g7RUFDRixDIiwiZmlsZSI6Imh1Z2UtYXBwcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXHJcbmltcG9ydCB7IFJvdXRlciwgYnJvd3Nlckhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXInXHJcbmltcG9ydCBzdHViYmVkQ291cnNlcyBmcm9tICcuL3N0dWJzL0NPVVJTRVMnXHJcblxyXG5jb25zdCByb290Um91dGUgPSB7XHJcbiAgY29tcG9uZW50OiAnZGl2JyxcclxuICBjaGlsZFJvdXRlczogWyB7XHJcbiAgICBwYXRoOiAnLycsXHJcbiAgICBjb21wb25lbnQ6IHJlcXVpcmUoJy4vY29tcG9uZW50cy9BcHAnKSxcclxuICAgIGNoaWxkUm91dGVzOiBbXHJcbiAgICAgIHJlcXVpcmUoJy4vcm91dGVzL0NhbGVuZGFyJyksXHJcbiAgICAgIHJlcXVpcmUoJy4vcm91dGVzL0NvdXJzZScpLFxyXG4gICAgICByZXF1aXJlKCcuL3JvdXRlcy9HcmFkZXMnKSxcclxuICAgICAgcmVxdWlyZSgnLi9yb3V0ZXMvTWVzc2FnZXMnKSxcclxuICAgICAgcmVxdWlyZSgnLi9yb3V0ZXMvUHJvZmlsZScpXHJcbiAgICBdXHJcbiAgfSBdXHJcbn1cclxuXHJcbnJlbmRlcihcclxuICA8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fSByb3V0ZXM9e3Jvb3RSb3V0ZX0gLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKVxyXG4pXHJcblxyXG4vLyBJJ3ZlIHVucm9sbGVkIHRoZSByZWN1cnNpdmUgZGlyZWN0b3J5IGxvb3AgdGhhdCBpcyBoYXBwZW5pbmcgYWJvdmUgdG8gZ2V0IGFcclxuLy8gYmV0dGVyIGlkZWEgb2YganVzdCB3aGF0IHRoaXMgaHVnZS1hcHBzIFJvdXRlciBsb29rcyBsaWtlLCBvciBqdXN0IGxvb2sgYXQgdGhlXHJcbi8vIGZpbGUgc3lzdGVtIDopXHJcbi8vXHJcbi8vIGltcG9ydCB7IFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xyXG5cclxuLy8gaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xyXG4vLyBpbXBvcnQgQ291cnNlIGZyb20gJy4vcm91dGVzL0NvdXJzZS9jb21wb25lbnRzL0NvdXJzZSdcclxuLy8gaW1wb3J0IEFubm91bmNlbWVudHNTaWRlYmFyIGZyb20gJy4vcm91dGVzL0NvdXJzZS9yb3V0ZXMvQW5ub3VuY2VtZW50cy9jb21wb25lbnRzL1NpZGViYXInXHJcbi8vIGltcG9ydCBBbm5vdW5jZW1lbnRzIGZyb20gJy4vcm91dGVzL0NvdXJzZS9yb3V0ZXMvQW5ub3VuY2VtZW50cy9jb21wb25lbnRzL0Fubm91bmNlbWVudHMnXHJcbi8vIGltcG9ydCBBbm5vdW5jZW1lbnQgZnJvbSAnLi9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bbm5vdW5jZW1lbnRzL3JvdXRlcy9Bbm5vdW5jZW1lbnQvY29tcG9uZW50cy9Bbm5vdW5jZW1lbnQnXHJcbi8vIGltcG9ydCBBc3NpZ25tZW50c1NpZGViYXIgZnJvbSAnLi9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bc3NpZ25tZW50cy9jb21wb25lbnRzL1NpZGViYXInXHJcbi8vIGltcG9ydCBBc3NpZ25tZW50cyBmcm9tICcuL3JvdXRlcy9Db3Vyc2Uvcm91dGVzL0Fzc2lnbm1lbnRzL2NvbXBvbmVudHMvQXNzaWdubWVudHMnXHJcbi8vIGltcG9ydCBBc3NpZ25tZW50IGZyb20gJy4vcm91dGVzL0NvdXJzZS9yb3V0ZXMvQXNzaWdubWVudHMvcm91dGVzL0Fzc2lnbm1lbnQvY29tcG9uZW50cy9Bc3NpZ25tZW50J1xyXG4vLyBpbXBvcnQgQ291cnNlR3JhZGVzIGZyb20gJy4vcm91dGVzL0NvdXJzZS9yb3V0ZXMvR3JhZGVzL2NvbXBvbmVudHMvR3JhZGVzJ1xyXG4vLyBpbXBvcnQgQ2FsZW5kYXIgZnJvbSAnLi9yb3V0ZXMvQ2FsZW5kYXIvY29tcG9uZW50cy9DYWxlbmRhcidcclxuLy8gaW1wb3J0IEdyYWRlcyBmcm9tICcuL3JvdXRlcy9HcmFkZXMvY29tcG9uZW50cy9HcmFkZXMnXHJcbi8vIGltcG9ydCBNZXNzYWdlcyBmcm9tICcuL3JvdXRlcy9NZXNzYWdlcy9jb21wb25lbnRzL01lc3NhZ2VzJ1xyXG5cclxuLy8gcmVuZGVyKFxyXG4vLyAgIDxSb3V0ZXI+XHJcbi8vICAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0+XHJcbi8vICAgICAgIDxSb3V0ZSBwYXRoPVwiY2FsZW5kYXJcIiBjb21wb25lbnQ9e0NhbGVuZGFyfSAvPlxyXG4vLyAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZS86Y291cnNlSWRcIiBjb21wb25lbnQ9e0NvdXJzZX0+XHJcbi8vICAgICAgICAgPFJvdXRlIHBhdGg9XCJhbm5vdW5jZW1lbnRzXCIgY29tcG9uZW50cz17e1xyXG4vLyAgICAgICAgICAgc2lkZWJhcjogQW5ub3VuY2VtZW50c1NpZGViYXIsXHJcbi8vICAgICAgICAgICBtYWluOiBBbm5vdW5jZW1lbnRzXHJcbi8vICAgICAgICAgfX0+XHJcbi8vICAgICAgICAgICA8Um91dGUgcGF0aD1cIjphbm5vdW5jZW1lbnRJZFwiIGNvbXBvbmVudD17QW5ub3VuY2VtZW50fSAvPlxyXG4vLyAgICAgICAgIDwvUm91dGU+XHJcbi8vICAgICAgICAgPFJvdXRlIHBhdGg9XCJhc3NpZ25tZW50c1wiIGNvbXBvbmVudHM9e3tcclxuLy8gICAgICAgICAgIHNpZGViYXI6IEFzc2lnbm1lbnRzU2lkZWJhcixcclxuLy8gICAgICAgICAgIG1haW46IEFzc2lnbm1lbnRzXHJcbi8vICAgICAgICAgfX0+XHJcbi8vICAgICAgICAgICA8Um91dGUgcGF0aD1cIjphc3NpZ25tZW50SWRcIiBjb21wb25lbnQ9e0Fzc2lnbm1lbnR9IC8+XHJcbi8vICAgICAgICAgPC9Sb3V0ZT5cclxuLy8gICAgICAgICA8Um91dGUgcGF0aD1cImdyYWRlc1wiIGNvbXBvbmVudD17Q291cnNlR3JhZGVzfSAvPlxyXG4vLyAgICAgICA8L1JvdXRlPlxyXG4vLyAgICAgICA8Um91dGUgcGF0aD1cImdyYWRlc1wiIGNvbXBvbmVudD17R3JhZGVzfSAvPlxyXG4vLyAgICAgICA8Um91dGUgcGF0aD1cIm1lc3NhZ2VzXCIgY29tcG9uZW50PXtNZXNzYWdlc30gLz5cclxuLy8gICAgICAgPFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtDYWxlbmRhcn0gLz5cclxuLy8gICAgIDwvUm91dGU+XHJcbi8vICAgPC9Sb3V0ZXI+LFxyXG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcclxuLy8gKVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9hcHAuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBwYXRoOiAnY2FsZW5kYXInLFxyXG4gIGdldENvbXBvbmVudChsb2NhdGlvbiwgY2IpIHtcclxuICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xyXG4gICAgICBjYihudWxsLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvQ2FsZW5kYXInKSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9DYWxlbmRhci9pbmRleC5qc1xuICoqLyIsImdsb2JhbC5DT1VSU0VTID0gW1xyXG4gIHtcclxuICAgIGlkOiAwLFxyXG4gICAgbmFtZTogJ1JlYWN0IEZ1bmRhbWVudGFscycsXHJcbiAgICBncmFkZTogJ0InLFxyXG4gICAgYW5ub3VuY2VtZW50czogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgdGl0bGU6ICdObyBjbGFzcyB0b21vcnJvdycsXHJcbiAgICAgICAgYm9keTogJ1RoZXJlIGlzIG5vIGNsYXNzIHRvbW9ycm93LCBwbGVhc2UgZG8gbm90IHNob3cgdXAnXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBhc3NpZ25tZW50czogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IDAsXHJcbiAgICAgICAgdGl0bGU6ICdCdWlsZCBhIHJvdXRlcicsXHJcbiAgICAgICAgYm9keTogJ0l0IHdpbGwgYmUgZWFzeSwgc2VyaW91c2x5LCBsaWtlIDIgaG91cnMsIDEwMCBsaW5lcyBvZiBjb2RlLCBubyBiaWdnaWUnLFxyXG4gICAgICAgIGdyYWRlOiAnTi9BJ1xyXG4gICAgICB9XHJcbiAgICBdXHJcblxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ1JldXNhYmxlIFJlYWN0IENvbXBvbmVudHMnLFxyXG4gICAgZ3JhZGU6ICdBLScsXHJcbiAgICBhbm5vdW5jZW1lbnRzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogMCxcclxuICAgICAgICB0aXRsZTogJ0ZpbmFsIGV4YW0gbmV4dCB3ZWRuZXNkYXknLFxyXG4gICAgICAgIGJvZHk6ICdZb3UgaGFkIGJldHRlciBwcmVwYXJlJ1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgYXNzaWdubWVudHM6IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAwLFxyXG4gICAgICAgIHRpdGxlOiAnUHJvcFR5cGVzJyxcclxuICAgICAgICBib2R5OiAnVGhleSBhcmVuXFwndCBmb3IgeW91LicsXHJcbiAgICAgICAgZ3JhZGU6ICc4MCUnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogMSxcclxuICAgICAgICB0aXRsZTogJ0l0ZXJhdGluZyBhbmQgQ2xvbmluZyBDaGlsZHJlbicsXHJcbiAgICAgICAgYm9keTogJ1lvdSBjYW4gdG90YWxseSBkbyBpdC4nLFxyXG4gICAgICAgIGdyYWRlOiAnOTUlJ1xyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfVxyXG5dXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3N0dWJzL0NPVVJTRVMuanNcbiAqKi8iLCIvKmdsb2JhbHMgQ09VUlNFUzp0cnVlICovXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL0Rhc2hib2FyZCdcclxuaW1wb3J0IEdsb2JhbE5hdiBmcm9tICcuL0dsb2JhbE5hdidcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8R2xvYmFsTmF2IC8+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAyMCB9fT5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVuIHx8IDxEYXNoYm9hcmQgY291cnNlcz17Q09VUlNFU30gLz59XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcHBcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvY29tcG9uZW50cy9BcHAuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXHJcblxyXG5jbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgY291cnNlcyB9ID0gdGhpcy5wcm9wc1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgyPlN1cGVyIFNjYWxhYmxlIEFwcHM8L2gyPlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgT3BlbiB0aGUgbmV0d29yayB0YWIgYXMgeW91IG5hdmlnYXRlLiBOb3RpY2UgdGhhdCBvbmx5IHRoZSBhbW91bnQgb2ZcclxuICAgICAgICAgIHlvdXIgYXBwIHRoYXQgaXMgcmVxdWlyZWQgaXMgYWN0dWFsbHkgZG93bmxvYWRlZCBhcyB5b3UgbmF2aWdhdGVcclxuICAgICAgICAgIGFyb3VuZC4gRXZlbiB0aGUgcm91dGUgY29uZmlndXJhdGlvbiBvYmplY3RzIGFyZSBsb2FkZWQgb24gdGhlIGZseS5cclxuICAgICAgICAgIFRoaXMgd2F5LCBhIG5ldyByb3V0ZSBhZGRlZCBkZWVwIGluIHlvdXIgYXBwIHdpbGwgbm90IGFmZmVjdCB0aGVcclxuICAgICAgICAgIGluaXRpYWwgYnVuZGxlIG9mIHlvdXIgYXBwbGljYXRpb24uXHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxoMj5Db3Vyc2VzPC9oMj57JyAnfVxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgIHtjb3Vyc2VzLm1hcChjb3Vyc2UgPT4gKFxyXG4gICAgICAgICAgICA8bGkga2V5PXtjb3Vyc2UuaWR9PlxyXG4gICAgICAgICAgICAgIDxMaW5rIHRvPXtgL2NvdXJzZS8ke2NvdXJzZS5pZH1gfT57Y291cnNlLm5hbWV9PC9MaW5rPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmRcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvY29tcG9uZW50cy9EYXNoYm9hcmQuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXHJcblxyXG5jb25zdCBkYXJrID0gJ2hzbCgyMDAsIDIwJSwgMjAlKSdcclxuY29uc3QgbGlnaHQgPSAnI2ZmZidcclxuY29uc3Qgc3R5bGVzID0ge31cclxuXHJcbnN0eWxlcy53cmFwcGVyID0ge1xyXG4gIHBhZGRpbmc6ICcxMHB4IDIwcHgnLFxyXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICBiYWNrZ3JvdW5kOiBkYXJrLFxyXG4gIGNvbG9yOiBsaWdodFxyXG59XHJcblxyXG5zdHlsZXMubGluayA9IHtcclxuICBwYWRkaW5nOiAxMSxcclxuICBjb2xvcjogbGlnaHQsXHJcbiAgZm9udFdlaWdodDogMjAwXHJcbn1cclxuXHJcbnN0eWxlcy5hY3RpdmVMaW5rID0ge1xyXG4gIC4uLnN0eWxlcy5saW5rLFxyXG4gIGJhY2tncm91bmQ6IGxpZ2h0LFxyXG4gIGNvbG9yOiBkYXJrXHJcbn1cclxuXHJcbmNsYXNzIEdsb2JhbE5hdiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICBzdXBlcihwcm9wcywgY29udGV4dClcclxuICAgIHRoaXMubG9nT3V0ID0gdGhpcy5sb2dPdXQuYmluZCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgbG9nT3V0KCkge1xyXG4gICAgYWxlcnQoJ2xvZyBvdXQnKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyB1c2VyIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLndyYXBwZXJ9PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZmxvYXQ6ICdsZWZ0JyB9fT5cclxuICAgICAgICAgIDxMaW5rIHRvPVwiL1wiIHN0eWxlPXtzdHlsZXMubGlua30+SG9tZTwvTGluaz57JyAnfVxyXG4gICAgICAgICAgPExpbmsgdG89XCIvY2FsZW5kYXJcIiBzdHlsZT17c3R5bGVzLmxpbmt9IGFjdGl2ZVN0eWxlPXtzdHlsZXMuYWN0aXZlTGlua30+Q2FsZW5kYXI8L0xpbms+eycgJ31cclxuICAgICAgICAgIDxMaW5rIHRvPVwiL2dyYWRlc1wiIHN0eWxlPXtzdHlsZXMubGlua30gYWN0aXZlU3R5bGU9e3N0eWxlcy5hY3RpdmVMaW5rfT5HcmFkZXM8L0xpbms+eycgJ31cclxuICAgICAgICAgIDxMaW5rIHRvPVwiL21lc3NhZ2VzXCIgc3R5bGU9e3N0eWxlcy5saW5rfSBhY3RpdmVTdHlsZT17c3R5bGVzLmFjdGl2ZUxpbmt9Pk1lc3NhZ2VzPC9MaW5rPnsnICd9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmbG9hdDogJ3JpZ2h0JyB9fT5cclxuICAgICAgICAgIDxMaW5rIHN0eWxlPXtzdHlsZXMubGlua30gdG89XCIvcHJvZmlsZVwiPnt1c2VyLm5hbWV9PC9MaW5rPiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMubG9nT3V0fT5sb2cgb3V0PC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuR2xvYmFsTmF2LmRlZmF1bHRQcm9wcyA9IHtcclxuICB1c2VyOiB7XHJcbiAgICBpZDogMSxcclxuICAgIG5hbWU6ICdSeWFuIEZsb3JlbmNlJ1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2xvYmFsTmF2XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL2NvbXBvbmVudHMvR2xvYmFsTmF2LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgcGF0aDogJ2NvdXJzZS86Y291cnNlSWQnLFxyXG5cclxuICBnZXRDaGlsZFJvdXRlcyhsb2NhdGlvbiwgY2IpIHtcclxuICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xyXG4gICAgICBjYihudWxsLCBbXHJcbiAgICAgICAgcmVxdWlyZSgnLi9yb3V0ZXMvQW5ub3VuY2VtZW50cycpLFxyXG4gICAgICAgIHJlcXVpcmUoJy4vcm91dGVzL0Fzc2lnbm1lbnRzJyksXHJcbiAgICAgICAgcmVxdWlyZSgnLi9yb3V0ZXMvR3JhZGVzJylcclxuICAgICAgXSlcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgZ2V0Q29tcG9uZW50KGxvY2F0aW9uLCBjYikge1xyXG4gICAgcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XHJcbiAgICAgIGNiKG51bGwsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9Db3Vyc2UnKSlcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9Db3Vyc2UvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBwYXRoOiAnZ3JhZGVzJyxcclxuICBnZXRDb21wb25lbnQobG9jYXRpb24sIGNiKSB7XHJcbiAgICByZXF1aXJlLmVuc3VyZShbXSwgKHJlcXVpcmUpID0+IHtcclxuICAgICAgY2IobnVsbCwgcmVxdWlyZSgnLi9jb21wb25lbnRzL0dyYWRlcycpKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0dyYWRlcy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHBhdGg6ICdtZXNzYWdlcycsXHJcbiAgZ2V0Q29tcG9uZW50KGxvY2F0aW9uLCBjYikge1xyXG4gICAgcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XHJcbiAgICAgIGNiKG51bGwsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9NZXNzYWdlcycpKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL01lc3NhZ2VzL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgcGF0aDogJ3Byb2ZpbGUnLFxyXG4gIGdldENvbXBvbmVudChsb2NhdGlvbiwgY2IpIHtcclxuICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xyXG4gICAgICBjYihudWxsLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvUHJvZmlsZScpKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL1Byb2ZpbGUvaW5kZXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9