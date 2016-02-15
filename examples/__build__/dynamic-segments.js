webpackJsonp([13],[
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
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/123', activeClassName: 'active' },
	            'Bob'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/abc', activeClassName: 'active' },
	            'Sally'
	          )
	        )
	      ),
	      this.props.children
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	var User = (function (_React$Component2) {
	  _inherits(User, _React$Component2);
	
	  function User() {
	    _classCallCheck(this, User);
	
	    _React$Component2.apply(this, arguments);
	  }
	
	  User.prototype.render = function render() {
	    var userID = this.props.params.userID;
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'User' },
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'User id: ',
	        userID
	      ),
	      _react2['default'].createElement(
	        'ul',
	        null,
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/' + userID + '/tasks/foo', activeClassName: 'active' },
	            'foo task'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/' + userID + '/tasks/bar', activeClassName: 'active' },
	            'bar task'
	          )
	        )
	      ),
	      this.props.children
	    );
	  };
	
	  return User;
	})(_react2['default'].Component);
	
	var Task = (function (_React$Component3) {
	  _inherits(Task, _React$Component3);
	
	  function Task() {
	    _classCallCheck(this, Task);
	
	    _React$Component3.apply(this, arguments);
	  }
	
	  Task.prototype.render = function render() {
	    var _props$params = this.props.params;
	    var userID = _props$params.userID;
	    var taskID = _props$params.taskID;
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'Task' },
	      _react2['default'].createElement(
	        'h2',
	        null,
	        'User ID: ',
	        userID
	      ),
	      _react2['default'].createElement(
	        'h3',
	        null,
	        'Task ID: ',
	        taskID
	      )
	    );
	  };
	
	  return Task;
	})(_react2['default'].Component);
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(
	      _reactRouter.Route,
	      { path: 'user/:userID', component: User },
	      _react2['default'].createElement(_reactRouter.Route, { path: 'tasks/:taskID', component: Task }),
	      _react2['default'].createElement(_reactRouter.Redirect, { from: 'todos/:taskID', to: 'tasks/:taskID' })
	    )
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9keW5hbWljLXNlZ21lbnRzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7cUNBQ0YsQ0FBVzs7d0NBQzRCLENBQWM7O0tBRXRFLEdBQUc7YUFBSCxHQUFHOztZQUFILEdBQUc7MkJBQUgsR0FBRzs7Ozs7QUFBSCxNQUFHLFdBQ1AsTUFBTSxxQkFBRztBQUNQLFlBQ0U7OztPQUNFOzs7U0FDRTs7O1dBQUk7O2VBQU0sRUFBRSxFQUFDLFdBQVcsRUFBQyxlQUFlLEVBQUMsUUFBUTs7WUFBVztVQUFLO1NBQ2pFOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsV0FBVyxFQUFDLGVBQWUsRUFBQyxRQUFROztZQUFhO1VBQUs7UUFDaEU7T0FDSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7TUFDaEIsQ0FDUDtJQUNGOztVQVhHLEdBQUc7SUFBUyxtQkFBTSxTQUFTOztLQWMzQixJQUFJO2FBQUosSUFBSTs7WUFBSixJQUFJOzJCQUFKLElBQUk7Ozs7O0FBQUosT0FBSSxXQUNSLE1BQU0scUJBQUc7U0FDQyxNQUFNLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQTVCLE1BQU07O0FBRWQsWUFDRTs7U0FBSyxTQUFTLEVBQUMsTUFBTTtPQUNuQjs7OztTQUFjLE1BQU07UUFBTTtPQUMxQjs7O1NBQ0U7OztXQUFJOztlQUFNLEVBQUUsYUFBVyxNQUFNLGVBQWEsRUFBQyxlQUFlLEVBQUMsUUFBUTs7WUFBZ0I7VUFBSztTQUN4Rjs7O1dBQUk7O2VBQU0sRUFBRSxhQUFXLE1BQU0sZUFBYSxFQUFDLGVBQWUsRUFBQyxRQUFROztZQUFnQjtVQUFLO1FBQ3JGO09BQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO01BQ2hCLENBQ1A7SUFDRjs7VUFkRyxJQUFJO0lBQVMsbUJBQU0sU0FBUzs7S0FpQjVCLElBQUk7YUFBSixJQUFJOztZQUFKLElBQUk7MkJBQUosSUFBSTs7Ozs7QUFBSixPQUFJLFdBQ1IsTUFBTSxxQkFBRzt5QkFDb0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQXBDLE1BQU0saUJBQU4sTUFBTTtTQUFFLE1BQU0saUJBQU4sTUFBTTs7QUFFdEIsWUFDRTs7U0FBSyxTQUFTLEVBQUMsTUFBTTtPQUNuQjs7OztTQUFjLE1BQU07UUFBTTtPQUMxQjs7OztTQUFjLE1BQU07UUFBTTtNQUN0QixDQUNQO0lBQ0Y7O1VBVkcsSUFBSTtJQUFTLG1CQUFNLFNBQVM7O0FBYWxDLGtCQUNFOztLQUFRLE9BQU8sNkJBQWlCO0dBQzlCOztPQUFPLElBQUksRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFFLEdBQUk7S0FDN0I7O1NBQU8sSUFBSSxFQUFDLGNBQWMsRUFBQyxTQUFTLEVBQUUsSUFBSztPQUN6Qyx1REFBTyxJQUFJLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBRSxJQUFLLEdBQUc7T0FDL0MsMERBQVUsSUFBSSxFQUFDLGVBQWUsRUFBQyxFQUFFLEVBQUMsZUFBZSxHQUFHO01BQzlDO0lBQ0Y7RUFDRCxFQUNSLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQyIsImZpbGUiOiJkeW5hbWljLXNlZ21lbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXHJcbmltcG9ydCB7IGJyb3dzZXJIaXN0b3J5LCBSb3V0ZXIsIFJvdXRlLCBMaW5rLCBSZWRpcmVjdCB9IGZyb20gJ3JlYWN0LXJvdXRlcidcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8dWw+XHJcbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvdXNlci8xMjNcIiBhY3RpdmVDbGFzc05hbWU9XCJhY3RpdmVcIj5Cb2I8L0xpbms+PC9saT5cclxuICAgICAgICAgIDxsaT48TGluayB0bz1cIi91c2VyL2FiY1wiIGFjdGl2ZUNsYXNzTmFtZT1cImFjdGl2ZVwiPlNhbGx5PC9MaW5rPjwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBVc2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHVzZXJJRCB9ID0gdGhpcy5wcm9wcy5wYXJhbXNcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIlVzZXJcIj5cclxuICAgICAgICA8aDE+VXNlciBpZDoge3VzZXJJRH08L2gxPlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgIDxsaT48TGluayB0bz17YC91c2VyLyR7dXNlcklEfS90YXNrcy9mb29gfSBhY3RpdmVDbGFzc05hbWU9XCJhY3RpdmVcIj5mb28gdGFzazwvTGluaz48L2xpPlxyXG4gICAgICAgICAgPGxpPjxMaW5rIHRvPXtgL3VzZXIvJHt1c2VySUR9L3Rhc2tzL2JhcmB9IGFjdGl2ZUNsYXNzTmFtZT1cImFjdGl2ZVwiPmJhciB0YXNrPC9MaW5rPjwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IHVzZXJJRCwgdGFza0lEIH0gPSB0aGlzLnByb3BzLnBhcmFtc1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiVGFza1wiPlxyXG4gICAgICAgIDxoMj5Vc2VyIElEOiB7dXNlcklEfTwvaDI+XHJcbiAgICAgICAgPGgzPlRhc2sgSUQ6IHt0YXNrSUR9PC9oMz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5yZW5kZXIoKFxyXG4gIDxSb3V0ZXIgaGlzdG9yeT17YnJvd3Nlckhpc3Rvcnl9PlxyXG4gICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtBcHB9PlxyXG4gICAgICA8Um91dGUgcGF0aD1cInVzZXIvOnVzZXJJRFwiIGNvbXBvbmVudD17VXNlcn0+XHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0YXNrcy86dGFza0lEXCIgY29tcG9uZW50PXtUYXNrfSAvPlxyXG4gICAgICAgIDxSZWRpcmVjdCBmcm9tPVwidG9kb3MvOnRhc2tJRFwiIHRvPVwidGFza3MvOnRhc2tJRFwiIC8+XHJcbiAgICAgIDwvUm91dGU+XHJcbiAgICA8L1JvdXRlPlxyXG4gIDwvUm91dGVyPlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpKVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2R5bmFtaWMtc2VnbWVudHMvYXBwLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==