webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactRouter = __webpack_require__(2);
	
	var _auth = __webpack_require__(64);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
	  getInitialState: function getInitialState() {
	    return {
	      loggedIn: _auth2['default'].loggedIn()
	    };
	  },
	
	  updateAuth: function updateAuth(loggedIn) {
	    this.setState({
	      loggedIn: loggedIn
	    });
	  },
	
	  componentWillMount: function componentWillMount() {
	    _auth2['default'].onChange = this.updateAuth;
	    _auth2['default'].login();
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          this.state.loggedIn ? _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/logout' },
	            'Log out'
	          ) : _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/login' },
	            'Sign in'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/about' },
	            'About'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/dashboard' },
	            'Dashboard'
	          ),
	          ' (authenticated)'
	        )
	      ),
	      this.props.children || _react2['default'].createElement(
	        'p',
	        null,
	        'You are ',
	        !this.state.loggedIn && 'not',
	        ' logged in.'
	      )
	    );
	  }
	});
	
	var Dashboard = _react2['default'].createClass({
	  displayName: 'Dashboard',
	
	  render: function render() {
	    var token = _auth2['default'].getToken();
	
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
	      )
	    );
	  }
	});
	
	var Login = _react2['default'].createClass({
	  displayName: 'Login',
	
	  contextTypes: {
	    router: _react2['default'].PropTypes.object.isRequired
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      error: false
	    };
	  },
	
	  handleSubmit: function handleSubmit(event) {
	    var _this = this;
	
	    event.preventDefault();
	
	    var email = this.refs.email.value;
	    var pass = this.refs.pass.value;
	
	    _auth2['default'].login(email, pass, function (loggedIn) {
	      if (!loggedIn) return _this.setState({ error: true });
	
	      var location = _this.props.location;
	
	      if (location.state && location.state.nextPathname) {
	        _this.context.router.replace(location.state.nextPathname);
	      } else {
	        _this.context.router.replace('/');
	      }
	    });
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'form',
	      { onSubmit: this.handleSubmit },
	      _react2['default'].createElement(
	        'label',
	        null,
	        _react2['default'].createElement('input', { ref: 'email', placeholder: 'email', defaultValue: 'joe@example.com' })
	      ),
	      _react2['default'].createElement(
	        'label',
	        null,
	        _react2['default'].createElement('input', { ref: 'pass', placeholder: 'password' })
	      ),
	      ' (hint: password1)',
	      _react2['default'].createElement('br', null),
	      _react2['default'].createElement(
	        'button',
	        { type: 'submit' },
	        'login'
	      ),
	      this.state.error && _react2['default'].createElement(
	        'p',
	        null,
	        'Bad login information'
	      )
	    );
	  }
	});
	
	var About = _react2['default'].createClass({
	  displayName: 'About',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'h1',
	      null,
	      'About'
	    );
	  }
	});
	
	var Logout = _react2['default'].createClass({
	  displayName: 'Logout',
	
	  componentDidMount: function componentDidMount() {
	    _auth2['default'].logout();
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'p',
	      null,
	      'You are now logged out'
	    );
	  }
	});
	
	function requireAuth(nextState, replaceState) {
	  if (!_auth2['default'].loggedIn()) replaceState({ nextPathname: nextState.location.pathname }, '/login');
	}
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.Route, { path: 'login', component: Login }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'logout', component: Logout }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'about', component: About }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'dashboard', component: Dashboard, onEnter: requireAuth })
	  )
	), document.getElementById('example'));

/***/ },

/***/ 64:
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  login: function login(email, pass, cb) {
	    var _this = this;
	
	    cb = arguments[arguments.length - 1];
	    if (localStorage.token) {
	      if (cb) cb(true);
	      this.onChange(true);
	      return;
	    }
	    pretendRequest(email, pass, function (res) {
	      if (res.authenticated) {
	        localStorage.token = res.token;
	        if (cb) cb(true);
	        _this.onChange(true);
	      } else {
	        if (cb) cb(false);
	        _this.onChange(false);
	      }
	    });
	  },
	
	  getToken: function getToken() {
	    return localStorage.token;
	  },
	
	  logout: function logout(cb) {
	    delete localStorage.token;
	    if (cb) cb();
	    this.onChange(false);
	  },
	
	  loggedIn: function loggedIn() {
	    return !!localStorage.token;
	  },
	
	  onChange: function onChange() {}
	};
	
	function pretendRequest(email, pass, cb) {
	  setTimeout(function () {
	    if (email === 'joe@example.com' && pass === 'password1') {
	      cb({
	        authenticated: true,
	        token: Math.random().toString(36).substring(7)
	      });
	    } else {
	      cb({ authenticated: false });
	    }
	  }, 0);
	}

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9hdXRoLWZsb3cvYXBwLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2F1dGgtZmxvdy9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztrQ0FBa0IsQ0FBTzs7OztxQ0FDRixDQUFXOzt3Q0FDa0IsQ0FBYzs7aUNBQ2pELEVBQVE7Ozs7QUFFekIsS0FBTSxHQUFHLEdBQUcsbUJBQU0sV0FBVyxDQUFDOzs7QUFDNUIsa0JBQWUsNkJBQUc7QUFDaEIsWUFBTztBQUNMLGVBQVEsRUFBRSxrQkFBSyxRQUFRLEVBQUU7TUFDMUI7SUFDRjs7QUFFRCxhQUFVLHNCQUFDLFFBQVEsRUFBRTtBQUNuQixTQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZUFBUSxFQUFFLFFBQVE7TUFDbkIsQ0FBQztJQUNIOztBQUVELHFCQUFrQixnQ0FBRztBQUNuQix1QkFBSyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVU7QUFDL0IsdUJBQUssS0FBSyxFQUFFO0lBQ2I7O0FBRUQsU0FBTSxvQkFBRztBQUNQLFlBQ0U7OztPQUNFOzs7U0FDRTs7O1dBQ0csSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQ2xCOztlQUFNLEVBQUUsRUFBQyxTQUFTOztZQUFlLEdBRWpDOztlQUFNLEVBQUUsRUFBQyxRQUFROztZQUNsQjtVQUNFO1NBQ0w7OztXQUFJOztlQUFNLEVBQUUsRUFBQyxRQUFROztZQUFhO1VBQUs7U0FDdkM7OztXQUFJOztlQUFNLEVBQUUsRUFBQyxZQUFZOztZQUFpQjs7VUFBcUI7UUFDNUQ7T0FDSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSTs7OztTQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSzs7UUFBZ0I7TUFDN0UsQ0FDUDtJQUNGO0VBQ0YsQ0FBQzs7QUFFRixLQUFNLFNBQVMsR0FBRyxt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LFlBQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLO0lBQzVCOztBQUVELFdBQVEsc0JBQUcsRUFBRTtFQUNkOztBQUVELFVBQVMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO0FBQ3ZDLGFBQVUsQ0FBQyxZQUFNO0FBQ2YsU0FBSSxLQUFLLEtBQUssaUJBQWlCLElBQUksSUFBSSxLQUFLLFdBQVcsRUFBRTtBQUN2RCxTQUFFLENBQUM7QUFDRCxzQkFBYSxFQUFFLElBQUk7QUFDbkIsY0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO01BQ0gsTUFBTTtBQUNMLFNBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQztNQUM3QjtJQUNGLEVBQUUsQ0FBQyxDQUFDIiwiZmlsZSI6ImF1dGgtZmxvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xyXG5pbXBvcnQgeyBicm93c2VySGlzdG9yeSwgUm91dGVyLCBSb3V0ZSwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcclxuaW1wb3J0IGF1dGggZnJvbSAnLi9hdXRoJ1xyXG5cclxuY29uc3QgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxvZ2dlZEluOiBhdXRoLmxvZ2dlZEluKClcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB1cGRhdGVBdXRoKGxvZ2dlZEluKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgbG9nZ2VkSW46IGxvZ2dlZEluXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGF1dGgub25DaGFuZ2UgPSB0aGlzLnVwZGF0ZUF1dGhcclxuICAgIGF1dGgubG9naW4oKVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPHVsPlxyXG4gICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5sb2dnZWRJbiA/IChcclxuICAgICAgICAgICAgICA8TGluayB0bz1cIi9sb2dvdXRcIj5Mb2cgb3V0PC9MaW5rPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2xvZ2luXCI+U2lnbiBpbjwvTGluaz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvYWJvdXRcIj5BYm91dDwvTGluaz48L2xpPlxyXG4gICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL2Rhc2hib2FyZFwiPkRhc2hib2FyZDwvTGluaz4gKGF1dGhlbnRpY2F0ZWQpPC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVuIHx8IDxwPllvdSBhcmUgeyF0aGlzLnN0YXRlLmxvZ2dlZEluICYmICdub3QnfSBsb2dnZWQgaW4uPC9wPn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KVxyXG5cclxuY29uc3QgRGFzaGJvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHRva2VuID0gYXV0aC5nZXRUb2tlbigpXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDE+RGFzaGJvYXJkPC9oMT5cclxuICAgICAgICA8cD5Zb3UgbWFkZSBpdCE8L3A+XHJcbiAgICAgICAgPHA+e3Rva2VufTwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KVxyXG5cclxuY29uc3QgTG9naW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGNvbnRleHRUeXBlczoge1xyXG4gICAgcm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcclxuICB9LFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlcnJvcjogZmFsc2VcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBoYW5kbGVTdWJtaXQoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICBjb25zdCBlbWFpbCA9IHRoaXMucmVmcy5lbWFpbC52YWx1ZVxyXG4gICAgY29uc3QgcGFzcyA9IHRoaXMucmVmcy5wYXNzLnZhbHVlXHJcblxyXG4gICAgYXV0aC5sb2dpbihlbWFpbCwgcGFzcywgKGxvZ2dlZEluKSA9PiB7XHJcbiAgICAgIGlmICghbG9nZ2VkSW4pXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoeyBlcnJvcjogdHJ1ZSB9KVxyXG5cclxuICAgICAgY29uc3QgeyBsb2NhdGlvbiB9ID0gdGhpcy5wcm9wc1xyXG5cclxuICAgICAgaWYgKGxvY2F0aW9uLnN0YXRlICYmIGxvY2F0aW9uLnN0YXRlLm5leHRQYXRobmFtZSkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShsb2NhdGlvbi5zdGF0ZS5uZXh0UGF0aG5hbWUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKCcvJylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgIDxsYWJlbD48aW5wdXQgcmVmPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cImVtYWlsXCIgZGVmYXVsdFZhbHVlPVwiam9lQGV4YW1wbGUuY29tXCIgLz48L2xhYmVsPlxyXG4gICAgICAgIDxsYWJlbD48aW5wdXQgcmVmPVwicGFzc1wiIHBsYWNlaG9sZGVyPVwicGFzc3dvcmRcIiAvPjwvbGFiZWw+IChoaW50OiBwYXNzd29yZDEpPGJyIC8+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+bG9naW48L2J1dHRvbj5cclxuICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvciAmJiAoXHJcbiAgICAgICAgICA8cD5CYWQgbG9naW4gaW5mb3JtYXRpb248L3A+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9mb3JtPlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IEFib3V0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiA8aDE+QWJvdXQ8L2gxPlxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IExvZ291dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGF1dGgubG9nb3V0KClcclxuICB9LFxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gPHA+WW91IGFyZSBub3cgbG9nZ2VkIG91dDwvcD5cclxuICB9XHJcbn0pXHJcblxyXG5mdW5jdGlvbiByZXF1aXJlQXV0aChuZXh0U3RhdGUsIHJlcGxhY2VTdGF0ZSkge1xyXG4gIGlmICghYXV0aC5sb2dnZWRJbigpKVxyXG4gICAgcmVwbGFjZVN0YXRlKHsgbmV4dFBhdGhuYW1lOiBuZXh0U3RhdGUubG9jYXRpb24ucGF0aG5hbWUgfSwgJy9sb2dpbicpXHJcbn1cclxuXHJcbnJlbmRlcigoXHJcbiAgPFJvdXRlciBoaXN0b3J5PXticm93c2VySGlzdG9yeX0+XHJcbiAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0+XHJcbiAgICAgIDxSb3V0ZSBwYXRoPVwibG9naW5cIiBjb21wb25lbnQ9e0xvZ2lufSAvPlxyXG4gICAgICA8Um91dGUgcGF0aD1cImxvZ291dFwiIGNvbXBvbmVudD17TG9nb3V0fSAvPlxyXG4gICAgICA8Um91dGUgcGF0aD1cImFib3V0XCIgY29tcG9uZW50PXtBYm91dH0gLz5cclxuICAgICAgPFJvdXRlIHBhdGg9XCJkYXNoYm9hcmRcIiBjb21wb25lbnQ9e0Rhc2hib2FyZH0gb25FbnRlcj17cmVxdWlyZUF1dGh9IC8+XHJcbiAgICA8L1JvdXRlPlxyXG4gIDwvUm91dGVyPlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2F1dGgtZmxvdy9hcHAuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBsb2dpbihlbWFpbCwgcGFzcywgY2IpIHtcclxuICAgIGNiID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXVxyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS50b2tlbikge1xyXG4gICAgICBpZiAoY2IpIGNiKHRydWUpXHJcbiAgICAgIHRoaXMub25DaGFuZ2UodHJ1ZSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBwcmV0ZW5kUmVxdWVzdChlbWFpbCwgcGFzcywgKHJlcykgPT4ge1xyXG4gICAgICBpZiAocmVzLmF1dGhlbnRpY2F0ZWQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UudG9rZW4gPSByZXMudG9rZW5cclxuICAgICAgICBpZiAoY2IpIGNiKHRydWUpXHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0cnVlKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChjYikgY2IoZmFsc2UpXHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZShmYWxzZSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBnZXRUb2tlbigpIHtcclxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UudG9rZW5cclxuICB9LFxyXG5cclxuICBsb2dvdXQoY2IpIHtcclxuICAgIGRlbGV0ZSBsb2NhbFN0b3JhZ2UudG9rZW5cclxuICAgIGlmIChjYikgY2IoKVxyXG4gICAgdGhpcy5vbkNoYW5nZShmYWxzZSlcclxuICB9LFxyXG5cclxuICBsb2dnZWRJbigpIHtcclxuICAgIHJldHVybiAhIWxvY2FsU3RvcmFnZS50b2tlblxyXG4gIH0sXHJcblxyXG4gIG9uQ2hhbmdlKCkge31cclxufVxyXG5cclxuZnVuY3Rpb24gcHJldGVuZFJlcXVlc3QoZW1haWwsIHBhc3MsIGNiKSB7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBpZiAoZW1haWwgPT09ICdqb2VAZXhhbXBsZS5jb20nICYmIHBhc3MgPT09ICdwYXNzd29yZDEnKSB7XHJcbiAgICAgIGNiKHtcclxuICAgICAgICBhdXRoZW50aWNhdGVkOiB0cnVlLFxyXG4gICAgICAgIHRva2VuOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNylcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNiKHsgYXV0aGVudGljYXRlZDogZmFsc2UgfSlcclxuICAgIH1cclxuICB9LCAwKVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvYXV0aC1mbG93L2F1dGguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9