webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactRouter = __webpack_require__(2);
	
	var _configRoutes = __webpack_require__(65);
	
	var _configRoutes2 = _interopRequireDefault(_configRoutes);
	
	_reactDom.render(_react2['default'].createElement(_reactRouter.Router, { history: _reactRouter.browserHistory, routes: _configRoutes2['default'] }), document.getElementById('example'));

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsAuthJs = __webpack_require__(66);
	
	var _utilsAuthJs2 = _interopRequireDefault(_utilsAuthJs);
	
	function redirectToLogin(nextState, replaceState) {
	  if (!_utilsAuthJs2['default'].loggedIn()) {
	    replaceState({
	      nextPathname: nextState.location.pathname
	    }, '/login');
	  }
	}
	
	function redirectToDashboard(nextState, replaceState) {
	  if (_utilsAuthJs2['default'].loggedIn()) {
	    replaceState(null, '/');
	  }
	}
	
	exports['default'] = {
	  component: __webpack_require__(67),
	  childRoutes: [{ path: '/logout',
	    getComponent: function getComponent(location, cb) {
	      __webpack_require__.e/* nsure */(4, function (require) {
	        cb(null, __webpack_require__(68));
	      });
	    }
	  }, { path: '/about',
	    getComponent: function getComponent(location, cb) {
	      __webpack_require__.e/* nsure */(5, function (require) {
	        cb(null, __webpack_require__(69));
	      });
	    }
	  }, { onEnter: redirectToDashboard,
	    childRoutes: [
	    // Unauthenticated routes
	    // Redirect to dashboard if user is already logged in
	    { path: '/login',
	      getComponent: function getComponent(location, cb) {
	        __webpack_require__.e/* nsure */(6, function (require) {
	          cb(null, __webpack_require__(70));
	        });
	      }
	    }
	    // ...
	    ]
	  }, { onEnter: redirectToLogin,
	    childRoutes: [
	    // Protected routes that don't share the dashboard UI
	    { path: '/user/:id',
	      getComponent: function getComponent(location, cb) {
	        __webpack_require__.e/* nsure */(7, function (require) {
	          cb(null, __webpack_require__(71));
	        });
	      }
	    }
	    // ...
	    ]
	  }, { path: '/',
	    getComponent: function getComponent(location, cb) {
	      // Share the path
	      // Dynamically load the correct component
	      if (_utilsAuthJs2['default'].loggedIn()) {
	        return __webpack_require__.e/* nsure */(8, function (require) {
	          cb(null, __webpack_require__(72));
	        });
	      }
	      return __webpack_require__.e/* nsure */(9, function (require) {
	        cb(null, __webpack_require__(73));
	      });
	    },
	    indexRoute: {
	      getComponent: function getComponent(location, cb) {
	        // Only load if we're logged in
	        if (_utilsAuthJs2['default'].loggedIn()) {
	          return __webpack_require__.e/* nsure */(10, function (require) {
	            cb(null, __webpack_require__(74));
	          });
	        }
	        return cb();
	      }
	    },
	    childRoutes: [{ onEnter: redirectToLogin,
	      childRoutes: [
	      // Protected nested routes for the dashboard
	      { path: '/page2',
	        getComponent: function getComponent(location, cb) {
	          __webpack_require__.e/* nsure */(11, function (require) {
	            cb(null, __webpack_require__(75));
	          });
	        }
	      }
	      // ...
	      ]
	    }]
	  }]
	};
	module.exports = exports['default'];

/***/ },

/***/ 66:
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

/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(2);
	
	var _utilsAuth = __webpack_require__(66);
	
	var _utilsAuth2 = _interopRequireDefault(_utilsAuth);
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
	  getInitialState: function getInitialState() {
	    return {
	      loggedIn: _utilsAuth2['default'].loggedIn()
	    };
	  },
	
	  updateAuth: function updateAuth(loggedIn) {
	    this.setState({
	      loggedIn: !!loggedIn
	    });
	  },
	
	  componentWillMount: function componentWillMount() {
	    _utilsAuth2['default'].onChange = this.updateAuth;
	    _utilsAuth2['default'].login();
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
	            { to: '/' },
	            'Home'
	          ),
	          ' (changes depending on auth status)'
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/page2' },
	            'Page Two'
	          ),
	          ' (authenticated)'
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/foo' },
	            'User: Foo'
	          ),
	          ' (authenticated)'
	        )
	      ),
	      this.props.children
	    );
	  }
	
	});
	
	exports['default'] = App;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvYXBwLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC9jb25maWcvcm91dGVzLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC91dGlscy9hdXRoLmpzIiwid2VicGFjazovLy9EOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC9jb21wb25lbnRzL0FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7cUNBQ0YsQ0FBVzs7d0NBQ0ssQ0FBYzs7eUNBQ2xDLEVBQWlCOzs7O0FBRXBDLGtCQUFPLHdEQUFRLE9BQU8sNkJBQWlCLEVBQUMsTUFBTSwyQkFBUyxHQUFFLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7Ozs7O3dDQ0w3RSxFQUFrQjs7OztBQUVuQyxVQUFTLGVBQWUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFO0FBQ2hELE9BQUksQ0FBQyx5QkFBSyxRQUFRLEVBQUUsRUFBRTtBQUNwQixpQkFBWSxDQUFDO0FBQ1gsbUJBQVksRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVE7TUFDMUMsRUFBRSxRQUFRLENBQUM7SUFDYjtFQUNGOztBQUVELFVBQVMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRTtBQUNwRCxPQUFJLHlCQUFLLFFBQVEsRUFBRSxFQUFFO0FBQ25CLGlCQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztJQUN4QjtFQUNGOztzQkFFYztBQUNiLFlBQVMsRUFBRSxtQkFBTyxDQUFDLEVBQW1CLENBQUM7QUFDdkMsY0FB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QUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUM7TUFDN0I7SUFDRixFQUFFLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7a0NDL0NXLENBQU87Ozs7d0NBQ0osQ0FBYzs7c0NBQ2xCLEVBQWU7Ozs7QUFFaEMsS0FBTSxHQUFHLEdBQUcsbUJBQU0sV0FBVyxDQUFDOzs7QUFFNUIsa0JBQWUsNkJBQUc7QUFDaEIsWUFBTztBQUNMLGVBQVEsRUFBRSx1QkFBSyxRQUFRLEVBQUU7TUFDMUI7SUFDRjs7QUFFRCxhQUFVLHNCQUFDLFFBQVEsRUFBRTtBQUNuQixTQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO01BQ3JCLENBQUM7SUFDSDs7QUFFRCxxQkFBa0IsZ0NBQUc7QUFDbkIsNEJBQUssUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVO0FBQy9CLDRCQUFLLEtBQUssRUFBRTtJQUNiOztBQUVELFNBQU0sb0JBQUc7QUFDUCxZQUNFOzs7T0FDRTs7O1NBQ0U7OztXQUNHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUNsQjs7ZUFBTSxFQUFFLEVBQUMsU0FBUzs7WUFBZSxHQUVqQzs7ZUFBTSxFQUFFLEVBQUMsUUFBUTs7WUFDbEI7VUFDRTtTQUNMOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsUUFBUTs7WUFBYTtVQUFLO1NBQ3ZDOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsR0FBRzs7WUFBWTs7VUFBd0M7U0FDcEU7OztXQUFJOztlQUFNLEVBQUUsRUFBQyxRQUFROztZQUFnQjs7VUFBcUI7U0FDMUQ7OztXQUFJOztlQUFNLEVBQUUsRUFBQyxXQUFXOztZQUFpQjs7VUFBcUI7UUFDM0Q7T0FDSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7TUFDaEIsQ0FDUDtJQUNGOztFQUVGLENBQUM7O3NCQUVhLEdBQUciLCJmaWxlIjoiYXV0aC13aXRoLXNoYXJlZC1yb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXHJcbmltcG9ydCB7IGJyb3dzZXJIaXN0b3J5LCBSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXInXHJcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9jb25maWcvcm91dGVzJ1xyXG5cclxucmVuZGVyKDxSb3V0ZXIgaGlzdG9yeT17YnJvd3Nlckhpc3Rvcnl9IHJvdXRlcz17cm91dGVzfS8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC9hcHAuanNcbiAqKi8iLCJpbXBvcnQgYXV0aCBmcm9tICcuLi91dGlscy9hdXRoLmpzJ1xyXG5cclxuZnVuY3Rpb24gcmVkaXJlY3RUb0xvZ2luKG5leHRTdGF0ZSwgcmVwbGFjZVN0YXRlKSB7XHJcbiAgaWYgKCFhdXRoLmxvZ2dlZEluKCkpIHtcclxuICAgIHJlcGxhY2VTdGF0ZSh7XHJcbiAgICAgIG5leHRQYXRobmFtZTogbmV4dFN0YXRlLmxvY2F0aW9uLnBhdGhuYW1lXHJcbiAgICB9LCAnL2xvZ2luJylcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZGlyZWN0VG9EYXNoYm9hcmQobmV4dFN0YXRlLCByZXBsYWNlU3RhdGUpIHtcclxuICBpZiAoYXV0aC5sb2dnZWRJbigpKSB7XHJcbiAgICByZXBsYWNlU3RhdGUobnVsbCwgJy8nKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIGNvbXBvbmVudDogcmVxdWlyZSgnLi4vY29tcG9uZW50cy9BcHAnKSxcclxuICBjaGlsZFJvdXRlczogW1xyXG4gICAgeyBwYXRoOiAnL2xvZ291dCcsXHJcbiAgICAgIGdldENvbXBvbmVudDogKGxvY2F0aW9uLCBjYikgPT4ge1xyXG4gICAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xyXG4gICAgICAgICAgY2IobnVsbCwgcmVxdWlyZSgnLi4vY29tcG9uZW50cy9Mb2dvdXQnKSlcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgeyBwYXRoOiAnL2Fib3V0JyxcclxuICAgICAgZ2V0Q29tcG9uZW50OiAobG9jYXRpb24sIGNiKSA9PiB7XHJcbiAgICAgICAgcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XHJcbiAgICAgICAgICBjYihudWxsLCByZXF1aXJlKCcuLi9jb21wb25lbnRzL0Fib3V0JykpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB7IG9uRW50ZXI6IHJlZGlyZWN0VG9EYXNoYm9hcmQsXHJcbiAgICAgIGNoaWxkUm91dGVzOiBbXHJcbiAgICAgICAgLy8gVW5hdXRoZW50aWNhdGVkIHJvdXRlc1xyXG4gICAgICAgIC8vIFJlZGlyZWN0IHRvIGRhc2hib2FyZCBpZiB1c2VyIGlzIGFscmVhZHkgbG9nZ2VkIGluXHJcbiAgICAgICAgeyBwYXRoOiAnL2xvZ2luJyxcclxuICAgICAgICAgIGdldENvbXBvbmVudDogKGxvY2F0aW9uLCBjYikgPT4ge1xyXG4gICAgICAgICAgICByZXF1aXJlLmVuc3VyZShbXSwgKHJlcXVpcmUpID0+IHtcclxuICAgICAgICAgICAgICBjYihudWxsLCByZXF1aXJlKCcuLi9jb21wb25lbnRzL0xvZ2luJykpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG5cclxuICAgIHsgb25FbnRlcjogcmVkaXJlY3RUb0xvZ2luLFxyXG4gICAgICBjaGlsZFJvdXRlczogW1xyXG4gICAgICAgIC8vIFByb3RlY3RlZCByb3V0ZXMgdGhhdCBkb24ndCBzaGFyZSB0aGUgZGFzaGJvYXJkIFVJXHJcbiAgICAgICAgeyBwYXRoOiAnL3VzZXIvOmlkJyxcclxuICAgICAgICAgIGdldENvbXBvbmVudDogKGxvY2F0aW9uLCBjYikgPT4ge1xyXG4gICAgICAgICAgICByZXF1aXJlLmVuc3VyZShbXSwgKHJlcXVpcmUpID0+IHtcclxuICAgICAgICAgICAgICBjYihudWxsLCByZXF1aXJlKCcuLi9jb21wb25lbnRzL1VzZXInKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICAgIF1cclxuICAgIH0sXHJcblxyXG4gICAgeyBwYXRoOiAnLycsXHJcbiAgICAgIGdldENvbXBvbmVudDogKGxvY2F0aW9uLCBjYikgPT4ge1xyXG4gICAgICAgIC8vIFNoYXJlIHRoZSBwYXRoXHJcbiAgICAgICAgLy8gRHluYW1pY2FsbHkgbG9hZCB0aGUgY29ycmVjdCBjb21wb25lbnRcclxuICAgICAgICBpZiAoYXV0aC5sb2dnZWRJbigpKSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XHJcbiAgICAgICAgICAgIGNiKG51bGwsIHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvRGFzaGJvYXJkJykpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XHJcbiAgICAgICAgICBjYihudWxsLCByZXF1aXJlKCcuLi9jb21wb25lbnRzL0xhbmRpbmcnKSlcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBpbmRleFJvdXRlOiB7XHJcbiAgICAgICAgZ2V0Q29tcG9uZW50OiAobG9jYXRpb24sIGNiKSA9PiB7XHJcbiAgICAgICAgICAvLyBPbmx5IGxvYWQgaWYgd2UncmUgbG9nZ2VkIGluXHJcbiAgICAgICAgICBpZiAoYXV0aC5sb2dnZWRJbigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbXSwgKHJlcXVpcmUpID0+IHtcclxuICAgICAgICAgICAgICBjYihudWxsLCByZXF1aXJlKCcuLi9jb21wb25lbnRzL1BhZ2VPbmUnKSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBjYigpXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBjaGlsZFJvdXRlczogW1xyXG4gICAgICAgIHsgb25FbnRlcjogcmVkaXJlY3RUb0xvZ2luLFxyXG4gICAgICAgICAgY2hpbGRSb3V0ZXM6IFtcclxuICAgICAgICAgICAgLy8gUHJvdGVjdGVkIG5lc3RlZCByb3V0ZXMgZm9yIHRoZSBkYXNoYm9hcmRcclxuICAgICAgICAgICAgeyBwYXRoOiAnL3BhZ2UyJyxcclxuICAgICAgICAgICAgICBnZXRDb21wb25lbnQ6IChsb2NhdGlvbiwgY2IpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjYihudWxsLCByZXF1aXJlKCcuLi9jb21wb25lbnRzL1BhZ2VUd28nKSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIC4uLlxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG5cclxuICBdXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvY29uZmlnL3JvdXRlcy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGxvZ2luKGVtYWlsLCBwYXNzLCBjYikge1xyXG4gICAgY2IgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdXHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLnRva2VuKSB7XHJcbiAgICAgIGlmIChjYikgY2IodHJ1ZSlcclxuICAgICAgdGhpcy5vbkNoYW5nZSh0cnVlKVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHByZXRlbmRSZXF1ZXN0KGVtYWlsLCBwYXNzLCAocmVzKSA9PiB7XHJcbiAgICAgIGlmIChyZXMuYXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS50b2tlbiA9IHJlcy50b2tlblxyXG4gICAgICAgIGlmIChjYikgY2IodHJ1ZSlcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRydWUpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGNiKSBjYihmYWxzZSlcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlKGZhbHNlKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGdldFRva2VuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnRva2VuXHJcbiAgfSxcclxuXHJcbiAgbG9nb3V0OiBmdW5jdGlvbiAoY2IpIHtcclxuICAgIGRlbGV0ZSBsb2NhbFN0b3JhZ2UudG9rZW5cclxuICAgIGlmIChjYikgY2IoKVxyXG4gICAgdGhpcy5vbkNoYW5nZShmYWxzZSlcclxuICB9LFxyXG5cclxuICBsb2dnZWRJbjogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuICEhbG9jYWxTdG9yYWdlLnRva2VuXHJcbiAgfSxcclxuXHJcbiAgb25DaGFuZ2U6IGZ1bmN0aW9uICgpIHt9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByZXRlbmRSZXF1ZXN0KGVtYWlsLCBwYXNzLCBjYikge1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgaWYgKGVtYWlsID09PSAnam9lQGV4YW1wbGUuY29tJyAmJiBwYXNzID09PSAncGFzc3dvcmQxJykge1xyXG4gICAgICBjYih7XHJcbiAgICAgICAgYXV0aGVudGljYXRlZDogdHJ1ZSxcclxuICAgICAgICB0b2tlbjogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjYih7IGF1dGhlbnRpY2F0ZWQ6IGZhbHNlIH0pXHJcbiAgICB9XHJcbiAgfSwgMClcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC91dGlscy9hdXRoLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xyXG5pbXBvcnQgYXV0aCBmcm9tICcuLi91dGlscy9hdXRoJ1xyXG5cclxuY29uc3QgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsb2dnZWRJbjogYXV0aC5sb2dnZWRJbigpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlQXV0aChsb2dnZWRJbikge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGxvZ2dlZEluOiAhIWxvZ2dlZEluXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGF1dGgub25DaGFuZ2UgPSB0aGlzLnVwZGF0ZUF1dGhcclxuICAgIGF1dGgubG9naW4oKVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPHVsPlxyXG4gICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5sb2dnZWRJbiA/IChcclxuICAgICAgICAgICAgICA8TGluayB0bz1cIi9sb2dvdXRcIj5Mb2cgb3V0PC9MaW5rPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2xvZ2luXCI+U2lnbiBpbjwvTGluaz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvYWJvdXRcIj5BYm91dDwvTGluaz48L2xpPlxyXG4gICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL1wiPkhvbWU8L0xpbms+IChjaGFuZ2VzIGRlcGVuZGluZyBvbiBhdXRoIHN0YXR1cyk8L2xpPlxyXG4gICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL3BhZ2UyXCI+UGFnZSBUd288L0xpbms+IChhdXRoZW50aWNhdGVkKTwvbGk+XHJcbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvdXNlci9mb29cIj5Vc2VyOiBGb288L0xpbms+IChhdXRoZW50aWNhdGVkKTwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG5cclxufSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2F1dGgtd2l0aC1zaGFyZWQtcm9vdC9jb21wb25lbnRzL0FwcC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=