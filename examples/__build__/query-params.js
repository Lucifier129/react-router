webpackJsonp([32],[
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
	
	var User = (function (_React$Component) {
	  _inherits(User, _React$Component);
	
	  function User() {
	    _classCallCheck(this, User);
	
	    _React$Component.apply(this, arguments);
	  }
	
	  User.prototype.render = function render() {
	    var userID = this.props.params.userID;
	    var query = this.props.location.query;
	
	    var age = query && query.showAge ? '33' : '';
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'User' },
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'User id: ',
	        userID
	      ),
	      age
	    );
	  };
	
	  return User;
	})(_react2['default'].Component);
	
	var App = (function (_React$Component2) {
	  _inherits(App, _React$Component2);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    _React$Component2.apply(this, arguments);
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
	            { to: '/user/bob', activeClassName: 'active' },
	            'Bob'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: { pathname: '/user/bob', query: { showAge: true } }, activeClassName: 'active' },
	            'Bob With Query Params'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/user/sally', activeClassName: 'active' },
	            'Sally'
	          )
	        )
	      ),
	      this.props.children
	    );
	  };
	
	  return App;
	})(_react2['default'].Component);
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.Route, { path: 'user/:userID', component: User })
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9xdWVyeS1wYXJhbXMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztrQ0FBa0IsQ0FBTzs7OztxQ0FDRixDQUFXOzt3Q0FDa0IsQ0FBYzs7S0FFNUQsSUFBSTthQUFKLElBQUk7O1lBQUosSUFBSTsyQkFBSixJQUFJOzs7OztBQUFKLE9BQUksV0FDUixNQUFNLHFCQUFHO1NBQ0QsTUFBTSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUE1QixNQUFNO1NBQ04sS0FBSyxHQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUE3QixLQUFLOztBQUNYLFNBQUksR0FBRyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFOztBQUU1QyxZQUNFOztTQUFLLFNBQVMsRUFBQyxNQUFNO09BQ25COzs7O1NBQWMsTUFBTTtRQUFNO09BQ3pCLEdBQUc7TUFDQSxDQUNQO0lBQ0Y7O1VBWkcsSUFBSTtJQUFTLG1CQUFNLFNBQVM7O0tBZTVCLEdBQUc7YUFBSCxHQUFHOztZQUFILEdBQUc7MkJBQUgsR0FBRzs7Ozs7QUFBSCxNQUFHLFdBQ1AsTUFBTSxxQkFBRztBQUNQLFlBQ0U7OztPQUNFOzs7U0FDRTs7O1dBQUk7O2VBQU0sRUFBRSxFQUFDLFdBQVcsRUFBQyxlQUFlLEVBQUMsUUFBUTs7WUFBVztVQUFLO1NBQ2pFOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRyxFQUFDLGVBQWUsRUFBQyxRQUFROztZQUE2QjtVQUFLO1NBQzdIOzs7V0FBSTs7ZUFBTSxFQUFFLEVBQUMsYUFBYSxFQUFDLGVBQWUsRUFBQyxRQUFROztZQUFhO1VBQUs7UUFDbEU7T0FDSixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7TUFDaEIsQ0FDUDtJQUNGOztVQVpHLEdBQUc7SUFBUyxtQkFBTSxTQUFTOztBQWVqQyxrQkFDRTs7S0FBUSxPQUFPLDZCQUFpQjtHQUM5Qjs7T0FBTyxJQUFJLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBRSxHQUFJO0tBQzdCLHVEQUFPLElBQUksRUFBQyxjQUFjLEVBQUMsU0FBUyxFQUFFLElBQUssR0FBRztJQUN4QztFQUNELEVBQ1IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDIiwiZmlsZSI6InF1ZXJ5LXBhcmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJ1xyXG5pbXBvcnQgeyBicm93c2VySGlzdG9yeSwgUm91dGVyLCBSb3V0ZSwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcclxuXHJcbmNsYXNzIFVzZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIGxldCB7IHVzZXJJRCB9ID0gdGhpcy5wcm9wcy5wYXJhbXNcclxuICAgIGxldCB7IHF1ZXJ5IH0gPSB0aGlzLnByb3BzLmxvY2F0aW9uXHJcbiAgICBsZXQgYWdlID0gcXVlcnkgJiYgcXVlcnkuc2hvd0FnZSA/ICczMycgOiAnJ1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiVXNlclwiPlxyXG4gICAgICAgIDxoMT5Vc2VyIGlkOiB7dXNlcklEfTwvaDE+XHJcbiAgICAgICAge2FnZX1cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPHVsPlxyXG4gICAgICAgICAgPGxpPjxMaW5rIHRvPVwiL3VzZXIvYm9iXCIgYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCI+Qm9iPC9MaW5rPjwvbGk+XHJcbiAgICAgICAgICA8bGk+PExpbmsgdG89e3sgcGF0aG5hbWU6ICcvdXNlci9ib2InLCBxdWVyeTogeyBzaG93QWdlOiB0cnVlIH0gfX0gYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCI+Qm9iIFdpdGggUXVlcnkgUGFyYW1zPC9MaW5rPjwvbGk+XHJcbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvdXNlci9zYWxseVwiIGFjdGl2ZUNsYXNzTmFtZT1cImFjdGl2ZVwiPlNhbGx5PC9MaW5rPjwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5yZW5kZXIoKFxyXG4gIDxSb3V0ZXIgaGlzdG9yeT17YnJvd3Nlckhpc3Rvcnl9PlxyXG4gICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtBcHB9PlxyXG4gICAgICA8Um91dGUgcGF0aD1cInVzZXIvOnVzZXJJRFwiIGNvbXBvbmVudD17VXNlcn0gLz5cclxuICAgIDwvUm91dGU+XHJcbiAgPC9Sb3V0ZXI+XHJcbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJykpXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvcXVlcnktcGFyYW1zL2FwcC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=