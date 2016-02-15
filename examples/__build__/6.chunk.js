webpackJsonp([6],{

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsAuthJs = __webpack_require__(66);
	
	var _utilsAuthJs2 = _interopRequireDefault(_utilsAuthJs);
	
	var Login = _react2['default'].createClass({
	  displayName: 'Login',
	
	  contextTypes: {
	    router: _react2['default'].PropTypes.object
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
	
	    _utilsAuthJs2['default'].login(email, pass, function (loggedIn) {
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
	
	exports['default'] = Login;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvY29tcG9uZW50cy9Mb2dpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQ0FBa0IsQ0FBTzs7Ozt3Q0FDUixFQUFrQjs7OztBQUVuQyxLQUFNLEtBQUssR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUU5QixlQUFZLEVBQUU7QUFDWixXQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07SUFDL0I7O0FBRUQsa0JBQWUsNkJBQUc7QUFDaEIsWUFBTztBQUNMLFlBQUssRUFBRSxLQUFLO01BQ2I7SUFDRjs7QUFFRCxlQUFZLHdCQUFDLEtBQUssRUFBRTs7O0FBQ2xCLFVBQUssQ0FBQyxjQUFjLEVBQUU7O0FBRXRCLFNBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7QUFDbkMsU0FBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSzs7QUFFakMsOEJBQUssS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBQyxRQUFRLEVBQUs7QUFDcEMsV0FBSSxDQUFDLFFBQVEsRUFDWCxPQUFPLE1BQUssUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDOztXQUUvQixRQUFRLEdBQUssTUFBSyxLQUFLLENBQXZCLFFBQVE7O0FBRWhCLFdBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtBQUNqRCxlQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ3pELE1BQU07QUFDTCxlQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNqQztNQUNGLENBQUM7SUFDSDs7QUFFRCxTQUFNLG9CQUFHO0FBQ1AsWUFDRTs7U0FBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQWE7T0FDaEM7OztTQUFPLDRDQUFPLEdBQUcsRUFBQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsaUJBQWlCLEdBQUc7UUFBUTtPQUN2Rjs7O1NBQU8sNENBQU8sR0FBRyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsVUFBVSxHQUFHO1FBQVE7O09BQWtCLDRDQUFNO09BQ2xGOztXQUFRLElBQUksRUFBQyxRQUFROztRQUFlO09BQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUNmOzs7O1FBQ0Q7TUFDSSxDQUNSO0lBQ0Y7O0VBRUYsQ0FBQzs7c0JBRWEsS0FBSyIsImZpbGUiOiI2LmNodW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgYXV0aCBmcm9tICcuLi91dGlscy9hdXRoLmpzJ1xyXG5cclxuY29uc3QgTG9naW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGNvbnRleHRUeXBlczoge1xyXG4gICAgcm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcbiAgfSxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZXJyb3I6IGZhbHNlXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgaGFuZGxlU3VibWl0KGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgY29uc3QgZW1haWwgPSB0aGlzLnJlZnMuZW1haWwudmFsdWVcclxuICAgIGNvbnN0IHBhc3MgPSB0aGlzLnJlZnMucGFzcy52YWx1ZVxyXG5cclxuICAgIGF1dGgubG9naW4oZW1haWwsIHBhc3MsIChsb2dnZWRJbikgPT4ge1xyXG4gICAgICBpZiAoIWxvZ2dlZEluKVxyXG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHsgZXJyb3I6IHRydWUgfSlcclxuXHJcbiAgICAgIGNvbnN0IHsgbG9jYXRpb24gfSA9IHRoaXMucHJvcHNcclxuXHJcbiAgICAgIGlmIChsb2NhdGlvbi5zdGF0ZSAmJiBsb2NhdGlvbi5zdGF0ZS5uZXh0UGF0aG5hbWUpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UobG9jYXRpb24uc3RhdGUubmV4dFBhdGhuYW1lKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZSgnLycpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fT5cclxuICAgICAgICA8bGFiZWw+PGlucHV0IHJlZj1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCJlbWFpbFwiIGRlZmF1bHRWYWx1ZT1cImpvZUBleGFtcGxlLmNvbVwiIC8+PC9sYWJlbD5cclxuICAgICAgICA8bGFiZWw+PGlucHV0IHJlZj1cInBhc3NcIiBwbGFjZWhvbGRlcj1cInBhc3N3b3JkXCIgLz48L2xhYmVsPiAoaGludDogcGFzc3dvcmQxKTxiciAvPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPmxvZ2luPC9idXR0b24+XHJcbiAgICAgICAge3RoaXMuc3RhdGUuZXJyb3IgJiYgKFxyXG4gICAgICAgICAgPHA+QmFkIGxvZ2luIGluZm9ybWF0aW9uPC9wPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIClcclxuICB9XHJcblxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9naW5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9hdXRoLXdpdGgtc2hhcmVkLXJvb3QvY29tcG9uZW50cy9Mb2dpbi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=