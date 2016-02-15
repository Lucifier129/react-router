webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactRouter = __webpack_require__(2);
	
	var ACTIVE = { color: 'red' };
	
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
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'APP!'
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/', activeStyle: ACTIVE },
	            '/'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.IndexLink,
	            { to: '/', activeStyle: ACTIVE },
	            '/ IndexLink'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/users', activeStyle: ACTIVE },
	            '/users'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.IndexLink,
	            { to: '/users', activeStyle: ACTIVE },
	            '/users IndexLink'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/users/ryan', activeStyle: ACTIVE },
	            '/users/ryan'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: { pathname: '/users/ryan', query: { foo: 'bar' } },
	              activeStyle: ACTIVE },
	            '/users/ryan?foo=bar'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/about', activeStyle: ACTIVE },
	            '/about'
	          )
	        )
	      ),
	      this.props.children
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	var Index = (function (_React$Component2) {
	  _inherits(Index, _React$Component2);
	
	  function Index() {
	    _classCallCheck(this, Index);
	
	    _React$Component2.apply(this, arguments);
	  }
	
	  Index.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Index!'
	      )
	    );
	  };
	
	  return Index;
	})(_react2['default'].Component);
	
	var Users = (function (_React$Component3) {
	  _inherits(Users, _React$Component3);
	
	  function Users() {
	    _classCallCheck(this, Users);
	
	    _React$Component3.apply(this, arguments);
	  }
	
	  Users.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'Users'
	      ),
	      this.props.children
	    );
	  };
	
	  return Users;
	})(_react2['default'].Component);
	
	var UsersIndex = (function (_React$Component4) {
	  _inherits(UsersIndex, _React$Component4);
	
	  function UsersIndex() {
	    _classCallCheck(this, UsersIndex);
	
	    _React$Component4.apply(this, arguments);
	  }
	
	  UsersIndex.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'UsersIndex'
	      )
	    );
	  };
	
	  return UsersIndex;
	})(_react2['default'].Component);
	
	var User = (function (_React$Component5) {
	  _inherits(User, _React$Component5);
	
	  function User() {
	    _classCallCheck(this, User);
	
	    _React$Component5.apply(this, arguments);
	  }
	
	  User.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'User ',
	        this.props.params.id
	      )
	    );
	  };
	
	  return User;
	})(_react2['default'].Component);
	
	var About = (function (_React$Component6) {
	  _inherits(About, _React$Component6);
	
	  function About() {
	    _classCallCheck(this, About);
	
	    _React$Component6.apply(this, arguments);
	  }
	
	  About.prototype.render = function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'About'
	      )
	    );
	  };
	
	  return About;
	})(_react2['default'].Component);
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.IndexRoute, { component: Index }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/about', component: About }),
	    _react2['default'].createElement(
	      _reactRouter.Route,
	      { path: 'users', component: Users },
	      _react2['default'].createElement(_reactRouter.IndexRoute, { component: UsersIndex }),
	      _react2['default'].createElement(_reactRouter.Route, { path: ':id', component: User })
	    )
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9hY3RpdmUtbGlua3MvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztrQ0FBa0IsQ0FBTzs7OztxQ0FDRixDQUFXOzt3Q0FDeUMsQ0FBYzs7QUFFekYsS0FBTSxNQUFNLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFOztLQUV6QixHQUFHO2FBQUgsR0FBRzs7WUFBSCxHQUFHOzJCQUFILEdBQUc7Ozs7O0FBQUgsTUFBRyxXQUNQLE1BQU0scUJBQUc7QUFDUCxZQUNFOzs7T0FDRTs7OztRQUFhO09BQ2I7OztTQUNFOzs7V0FBSTs7ZUFBVyxFQUFFLEVBQUMsR0FBRyxFQUFXLFdBQVcsRUFBRSxNQUFPOztZQUFTO1VBQUs7U0FDbEU7OztXQUFJOztlQUFXLEVBQUUsRUFBQyxHQUFHLEVBQVcsV0FBVyxFQUFFLE1BQU87O1lBQXdCO1VBQUs7U0FFakY7OztXQUFJOztlQUFXLEVBQUUsRUFBQyxRQUFRLEVBQU0sV0FBVyxFQUFFLE1BQU87O1lBQWM7VUFBSztTQUN2RTs7O1dBQUk7O2VBQVcsRUFBRSxFQUFDLFFBQVEsRUFBTSxXQUFXLEVBQUUsTUFBTzs7WUFBNkI7VUFBSztTQUV0Rjs7O1dBQUk7O2VBQVcsRUFBRSxFQUFDLGFBQWEsRUFBQyxXQUFXLEVBQUUsTUFBTzs7WUFBbUI7VUFBSztTQUM1RTs7O1dBQUk7O2VBQVcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUc7QUFDdEMsMEJBQVcsRUFBRSxNQUFPOztZQUEyQjtVQUFLO1NBRXBGOzs7V0FBSTs7ZUFBVyxFQUFFLEVBQUMsUUFBUSxFQUFNLFdBQVcsRUFBRSxNQUFPOztZQUFjO1VBQUs7UUFDcEU7T0FFSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7TUFDaEIsQ0FDUDtJQUNGOztVQXRCRyxHQUFHO0lBQVMsbUJBQU0sU0FBUzs7S0F5QjNCLEtBQUs7YUFBTCxLQUFLOztZQUFMLEtBQUs7MkJBQUwsS0FBSzs7Ozs7QUFBTCxRQUFLLFdBQ1QsTUFBTSxxQkFBRztBQUNQLFlBQ0U7OztPQUNFOzs7O1FBQWU7TUFDWCxDQUNQO0lBQ0Y7O1VBUEcsS0FBSztJQUFTLG1CQUFNLFNBQVM7O0tBVTdCLEtBQUs7YUFBTCxLQUFLOztZQUFMLEtBQUs7MkJBQUwsS0FBSzs7Ozs7QUFBTCxRQUFLLFdBQ1QsTUFBTSxxQkFBRztBQUNQLFlBQ0U7OztPQUNFOzs7O1FBQWM7T0FDYixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7TUFDaEIsQ0FDUDtJQUNGOztVQVJHLEtBQUs7SUFBUyxtQkFBTSxTQUFTOztLQVc3QixVQUFVO2FBQVYsVUFBVTs7WUFBVixVQUFVOzJCQUFWLFVBQVU7Ozs7O0FBQVYsYUFBVSxXQUNkLE1BQU0scUJBQUc7QUFDUCxZQUNFOzs7T0FDRTs7OztRQUFtQjtNQUNmLENBQ1A7SUFDRjs7VUFQRyxVQUFVO0lBQVMsbUJBQU0sU0FBUzs7S0FVbEMsSUFBSTthQUFKLElBQUk7O1lBQUosSUFBSTsyQkFBSixJQUFJOzs7OztBQUFKLE9BQUksV0FDUixNQUFNLHFCQUFHO0FBQ1AsWUFDRTs7O09BQ0U7Ozs7U0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQU07TUFDaEMsQ0FDUDtJQUNGOztVQVBHLElBQUk7SUFBUyxtQkFBTSxTQUFTOztLQVU1QixLQUFLO2FBQUwsS0FBSzs7WUFBTCxLQUFLOzJCQUFMLEtBQUs7Ozs7O0FBQUwsUUFBSyxXQUNULE1BQU0scUJBQUc7QUFDUCxZQUNFOzs7T0FDRTs7OztRQUFjO01BQ1YsQ0FDUDtJQUNGOztVQVBHLEtBQUs7SUFBUyxtQkFBTSxTQUFTOztBQVVuQyxrQkFDRTs7S0FBUSxPQUFPLDZCQUFpQjtHQUM5Qjs7T0FBTyxJQUFJLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBRSxHQUFJO0tBQzdCLDREQUFZLFNBQVMsRUFBRSxLQUFNLEdBQUU7S0FDL0IsdURBQU8sSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUUsS0FBTSxHQUFFO0tBQ3hDOztTQUFPLElBQUksRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQU07T0FDbkMsNERBQVksU0FBUyxFQUFFLFVBQVcsR0FBRTtPQUNwQyx1REFBTyxJQUFJLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBRSxJQUFLLEdBQUU7TUFDOUI7SUFDRjtFQUNELEVBQ1IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDIiwiZmlsZSI6ImFjdGl2ZS1saW5rcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xyXG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBMaW5rLCBJbmRleExpbmssIGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xyXG5cclxuY29uc3QgQUNUSVZFID0geyBjb2xvcjogJ3JlZCcgfVxyXG5cclxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMT5BUFAhPC9oMT5cclxuICAgICAgICA8dWw+XHJcbiAgICAgICAgICA8bGk+PExpbmsgICAgICB0bz1cIi9cIiAgICAgICAgICAgYWN0aXZlU3R5bGU9e0FDVElWRX0+LzwvTGluaz48L2xpPlxyXG4gICAgICAgICAgPGxpPjxJbmRleExpbmsgdG89XCIvXCIgICAgICAgICAgIGFjdGl2ZVN0eWxlPXtBQ1RJVkV9Pi8gSW5kZXhMaW5rPC9JbmRleExpbms+PC9saT5cclxuXHJcbiAgICAgICAgICA8bGk+PExpbmsgICAgICB0bz1cIi91c2Vyc1wiICAgICAgYWN0aXZlU3R5bGU9e0FDVElWRX0+L3VzZXJzPC9MaW5rPjwvbGk+XHJcbiAgICAgICAgICA8bGk+PEluZGV4TGluayB0bz1cIi91c2Vyc1wiICAgICAgYWN0aXZlU3R5bGU9e0FDVElWRX0+L3VzZXJzIEluZGV4TGluazwvSW5kZXhMaW5rPjwvbGk+XHJcblxyXG4gICAgICAgICAgPGxpPjxMaW5rICAgICAgdG89XCIvdXNlcnMvcnlhblwiIGFjdGl2ZVN0eWxlPXtBQ1RJVkV9Pi91c2Vycy9yeWFuPC9MaW5rPjwvbGk+XHJcbiAgICAgICAgICA8bGk+PExpbmsgICAgICB0bz17eyBwYXRobmFtZTogJy91c2Vycy9yeWFuJywgcXVlcnk6IHsgZm9vOiAnYmFyJyB9IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVN0eWxlPXtBQ1RJVkV9Pi91c2Vycy9yeWFuP2Zvbz1iYXI8L0xpbms+PC9saT5cclxuXHJcbiAgICAgICAgICA8bGk+PExpbmsgICAgICB0bz1cIi9hYm91dFwiICAgICAgYWN0aXZlU3R5bGU9e0FDVElWRX0+L2Fib3V0PC9MaW5rPjwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuXHJcbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgSW5kZXggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgyPkluZGV4ITwvaDI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVXNlcnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgyPlVzZXJzPC9oMj5cclxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBVc2Vyc0luZGV4IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz5Vc2Vyc0luZGV4PC9oMz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBVc2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz5Vc2VyIHt0aGlzLnByb3BzLnBhcmFtcy5pZH08L2gzPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEFib3V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMj5BYm91dDwvaDI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxucmVuZGVyKChcclxuICA8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cclxuICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17QXBwfT5cclxuICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtJbmRleH0vPlxyXG4gICAgICA8Um91dGUgcGF0aD1cIi9hYm91dFwiIGNvbXBvbmVudD17QWJvdXR9Lz5cclxuICAgICAgPFJvdXRlIHBhdGg9XCJ1c2Vyc1wiIGNvbXBvbmVudD17VXNlcnN9PlxyXG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17VXNlcnNJbmRleH0vPlxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiOmlkXCIgY29tcG9uZW50PXtVc2VyfS8+XHJcbiAgICAgIDwvUm91dGU+XHJcbiAgICA8L1JvdXRlPlxyXG4gIDwvUm91dGVyPlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKVxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9hY3RpdmUtbGlua3MvYXBwLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==