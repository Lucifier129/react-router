webpackJsonp([34],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactRouter = __webpack_require__(2);
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
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
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/dashboard', activeClassName: 'active' },
	            'Dashboard'
	          )
	        ),
	        _react2['default'].createElement(
	          'li',
	          null,
	          _react2['default'].createElement(
	            _reactRouter.Link,
	            { to: '/form', activeClassName: 'active' },
	            'Form'
	          )
	        )
	      ),
	      this.props.children
	    );
	  }
	});
	
	var Dashboard = _react2['default'].createClass({
	  displayName: 'Dashboard',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'h1',
	      null,
	      'Dashboard'
	    );
	  }
	});
	
	var Form = _react2['default'].createClass({
	  displayName: 'Form',
	
	  contextTypes: {
	    router: _react2['default'].PropTypes.object.isRequired
	  },
	
	  componentWillMount: function componentWillMount() {
	    this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      textValue: 'ohai'
	    };
	  },
	
	  routerWillLeave: function routerWillLeave() {
	    if (this.state.textValue) return 'You have unsaved information, are you sure you want to leave this page?';
	  },
	
	  handleChange: function handleChange(event) {
	    this.setState({
	      textValue: event.target.value
	    });
	  },
	
	  handleSubmit: function handleSubmit(event) {
	    var _this = this;
	
	    event.preventDefault();
	
	    this.setState({
	      textValue: ''
	    }, function () {
	      _this.props.router.push('/');
	    });
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'form',
	        { onSubmit: this.handleSubmit },
	        _react2['default'].createElement(
	          'p',
	          null,
	          'Click the dashboard link with text in the input.'
	        ),
	        _react2['default'].createElement('input', { type: 'text', ref: 'userInput', value: this.state.textValue, onChange: this.handleChange }),
	        _react2['default'].createElement(
	          'button',
	          { type: 'submit' },
	          'Go'
	        )
	      )
	    );
	  }
	});
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.Route, { path: 'dashboard', component: Dashboard }),
	    _react2['default'].createElement(_reactRouter.Route, { path: 'form', component: Form })
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy90cmFuc2l0aW9ucy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0NBQWtCLENBQU87Ozs7cUNBQ0YsQ0FBVzs7d0NBQ2tCLENBQWM7O0FBRWxFLEtBQU0sR0FBRyxHQUFHLG1CQUFNLFdBQVcsQ0FBQzs7O0FBQzVCLFNBQU0sb0JBQUc7QUFDUCxZQUNFOzs7T0FDRTs7O1NBQ0U7OztXQUFJOztlQUFNLEVBQUUsRUFBQyxZQUFZLEVBQUMsZUFBZSxFQUFDLFFBQVE7O1lBQWlCO1VBQUs7U0FDeEU7OztXQUFJOztlQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUMsZUFBZSxFQUFDLFFBQVE7O1lBQVk7VUFBSztRQUMzRDtPQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtNQUNoQixDQUNQO0lBQ0Y7RUFDRixDQUFDOztBQUVGLEtBQU0sU0FBUyxHQUFHLG1CQUFNLFdBQVcsQ0FBQzs7O0FBQ2xDLFNBQU0sb0JBQUc7QUFDUCxZQUFPOzs7O01BQWtCO0lBQzFCO0VBQ0YsQ0FBQzs7QUFFRixLQUFNLElBQUksR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUM3QixlQUFZLEVBQUU7QUFDWixXQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0lBQzFDOztBQUVELHFCQUFrQixnQ0FBRztBQUNuQixTQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQ2hCLElBQUksQ0FBQyxlQUFlLENBQ3JCO0lBQ0Y7O0FBRUQsa0JBQWUsNkJBQUc7QUFDaEIsWUFBTztBQUNMLGdCQUFTLEVBQUUsTUFBTTtNQUNsQjtJQUNGOztBQUVELGtCQUFlLDZCQUFHO0FBQ2hCLFNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQ3RCLE9BQU8seUVBQXlFO0lBQ25GOztBQUVELGVBQVksd0JBQUMsS0FBSyxFQUFFO0FBQ2xCLFNBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixnQkFBUyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSztNQUM5QixDQUFDO0lBQ0g7O0FBRUQsZUFBWSx3QkFBQyxLQUFLLEVBQUU7OztBQUNsQixVQUFLLENBQUMsY0FBYyxFQUFFOztBQUV0QixTQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZ0JBQVMsRUFBRSxFQUFFO01BQ2QsRUFBRSxZQUFNO0FBQ1AsYUFBSyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7TUFDNUIsQ0FBQztJQUNIOztBQUVELFNBQU0sb0JBQUc7QUFDUCxZQUNFOzs7T0FDRTs7V0FBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQWE7U0FDaEM7Ozs7VUFBdUQ7U0FDdkQsNENBQU8sSUFBSSxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVUsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQWEsR0FBRztTQUMvRjs7YUFBUSxJQUFJLEVBQUMsUUFBUTs7VUFBWTtRQUM1QjtNQUNILENBQ1A7SUFDRjtFQUNGLENBQUM7O0FBRUYsa0JBQ0U7O0tBQVEsT0FBTyw2QkFBaUI7R0FDOUI7O09BQU8sSUFBSSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUUsR0FBSTtLQUM3Qix1REFBTyxJQUFJLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBRSxTQUFVLEdBQUc7S0FDaEQsdURBQU8sSUFBSSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUUsSUFBSyxHQUFHO0lBQ2hDO0VBQ0QsRUFDUixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEMiLCJmaWxlIjoidHJhbnNpdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcclxuaW1wb3J0IHsgYnJvd3Nlckhpc3RvcnksIFJvdXRlciwgUm91dGUsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXHJcblxyXG5jb25zdCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8dWw+XHJcbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvZGFzaGJvYXJkXCIgYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCI+RGFzaGJvYXJkPC9MaW5rPjwvbGk+XHJcbiAgICAgICAgICA8bGk+PExpbmsgdG89XCIvZm9ybVwiIGFjdGl2ZUNsYXNzTmFtZT1cImFjdGl2ZVwiPkZvcm08L0xpbms+PC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5jb25zdCBEYXNoYm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIDxoMT5EYXNoYm9hcmQ8L2gxPlxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgY29udGV4dFR5cGVzOiB7XHJcbiAgICByb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIHRoaXMuY29udGV4dC5yb3V0ZXIuc2V0Um91dGVMZWF2ZUhvb2soXHJcbiAgICAgIHRoaXMucHJvcHMucm91dGUsXHJcbiAgICAgIHRoaXMucm91dGVyV2lsbExlYXZlXHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGV4dFZhbHVlOiAnb2hhaSdcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByb3V0ZXJXaWxsTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS50ZXh0VmFsdWUpXHJcbiAgICAgIHJldHVybiAnWW91IGhhdmUgdW5zYXZlZCBpbmZvcm1hdGlvbiwgYXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGxlYXZlIHRoaXMgcGFnZT8nXHJcbiAgfSxcclxuXHJcbiAgaGFuZGxlQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgdGV4dFZhbHVlOiBldmVudC50YXJnZXQudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgaGFuZGxlU3VibWl0KGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHRleHRWYWx1ZTogJydcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgdGhpcy5wcm9wcy5yb3V0ZXIucHVzaCgnLycpXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fT5cclxuICAgICAgICAgIDxwPkNsaWNrIHRoZSBkYXNoYm9hcmQgbGluayB3aXRoIHRleHQgaW4gdGhlIGlucHV0LjwvcD5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHJlZj1cInVzZXJJbnB1dFwiIHZhbHVlPXt0aGlzLnN0YXRlLnRleHRWYWx1ZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+R288L2J1dHRvbj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbnJlbmRlcigoXHJcbiAgPFJvdXRlciBoaXN0b3J5PXticm93c2VySGlzdG9yeX0+XHJcbiAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0+XHJcbiAgICAgIDxSb3V0ZSBwYXRoPVwiZGFzaGJvYXJkXCIgY29tcG9uZW50PXtEYXNoYm9hcmR9IC8+XHJcbiAgICAgIDxSb3V0ZSBwYXRoPVwiZm9ybVwiIGNvbXBvbmVudD17Rm9ybX0gLz5cclxuICAgIDwvUm91dGU+XHJcbiAgPC9Sb3V0ZXI+XHJcbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJykpXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvdHJhbnNpdGlvbnMvYXBwLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==