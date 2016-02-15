webpackJsonp([31],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(1);
	
	var _reactRouter = __webpack_require__(2);
	
	var PICTURES = [{ id: 0, src: 'http://placekitten.com/601/601' }, { id: 1, src: 'http://placekitten.com/610/610' }, { id: 2, src: 'http://placekitten.com/620/620' }];
	
	var Modal = _react2['default'].createClass({
	  displayName: 'Modal',
	
	  styles: {
	    position: 'fixed',
	    top: '20%',
	    right: '20%',
	    bottom: '20%',
	    left: '20%',
	    padding: 20,
	    boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
	    overflow: 'auto',
	    background: '#fff'
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      { style: this.styles },
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: this.props.returnTo },
	          'Back'
	        )
	      ),
	      this.props.children
	    );
	  }
	});
	
	var App = _react2['default'].createClass({
	  displayName: 'App',
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // if we changed routes...
	    if (nextProps.location.key !== this.props.location.key && nextProps.location.state && nextProps.location.state.modal) {
	      // save the old children (just like animation)
	      this.previousChildren = this.props.children;
	    }
	  },
	
	  render: function render() {
	    var location = this.props.location;
	
	    var isModal = location.state && location.state.modal && this.previousChildren;
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'h1',
	        null,
	        'Pinterest Style Routes'
	      ),
	      _react2['default'].createElement(
	        'div',
	        null,
	        isModal ? this.previousChildren : this.props.children,
	        isModal && _react2['default'].createElement(
	          Modal,
	          { isOpen: true, returnTo: location.state.returnTo },
	          this.props.children
	        )
	      )
	    );
	  }
	});
	
	var Index = _react2['default'].createClass({
	  displayName: 'Index',
	
	  render: function render() {
	    var _this = this;
	
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'p',
	        null,
	        'The url `/pictures/:id` can be rendered anywhere in the app as a modal. Simply put `modal: true` in the location descriptor of the `to` prop.'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'Click on an item and see its rendered as a modal, then copy/paste the url into a different browser window (with a different session, like Chrome -> Firefox), and see that the image does not render inside the overlay. One URL, two session dependent screens :D'
	      ),
	      _react2['default'].createElement(
	        'div',
	        null,
	        PICTURES.map(function (picture) {
	          return _react2['default'].createElement(
	            _reactRouter.Link,
	            {
	              key: picture.id,
	              to: {
	                pathname: '/pictures/' + picture.id,
	                state: { modal: true, returnTo: _this.props.location.pathname }
	              }
	            },
	            _react2['default'].createElement('img', { style: { margin: 10 }, src: picture.src, height: '100' })
	          );
	        })
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/some/123/deep/456/route' },
	          'Go to some deep route'
	        )
	      )
	    );
	  }
	});
	
	var Deep = _react2['default'].createClass({
	  displayName: 'Deep',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'p',
	        null,
	        'You can link from anywhere really deep too'
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        'Params stick around: ',
	        this.props.params.one,
	        ' ',
	        this.props.params.two
	      ),
	      _react2['default'].createElement(
	        'p',
	        null,
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: {
	              pathname: '/pictures/0',
	              state: { modal: true, returnTo: this.props.location.pathname }
	            } },
	          'Link to picture with Modal'
	        ),
	        _react2['default'].createElement('br', null),
	        _react2['default'].createElement(
	          _reactRouter.Link,
	          { to: '/pictures/0' },
	          'Without modal'
	        )
	      )
	    );
	  }
	});
	
	var Picture = _react2['default'].createClass({
	  displayName: 'Picture',
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement('img', { src: PICTURES[this.props.params.id].src, style: { height: '80%' } })
	    );
	  }
	});
	
	_reactDom.render(_react2['default'].createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.browserHistory },
	  _react2['default'].createElement(
	    _reactRouter.Route,
	    { path: '/', component: App },
	    _react2['default'].createElement(_reactRouter.IndexRoute, { component: Index }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/pictures/:id', component: Picture }),
	    _react2['default'].createElement(_reactRouter.Route, { path: '/some/:one/deep/:two/route', component: Deep })
	  )
	), document.getElementById('example'));

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9waW50ZXJlc3QvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tDQUFrQixDQUFPOzs7O3FDQUNGLENBQVc7O3dDQUM4QixDQUFjOztBQUU5RSxLQUFNLFFBQVEsR0FBRyxDQUNmLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsZ0NBQWdDLEVBQUUsRUFDaEQsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxnQ0FBZ0MsRUFBRSxFQUNoRCxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLGdDQUFnQyxFQUFFLENBQ2pEOztBQUVELEtBQU0sS0FBSyxHQUFHLG1CQUFNLFdBQVcsQ0FBQzs7O0FBQzlCLFNBQU0sRUFBRTtBQUNOLGFBQVEsRUFBRSxPQUFPO0FBQ2pCLFFBQUcsRUFBRSxLQUFLO0FBQ1YsVUFBSyxFQUFFLEtBQUs7QUFDWixXQUFNLEVBQUUsS0FBSztBQUNiLFNBQUksRUFBRSxLQUFLO0FBQ1gsWUFBTyxFQUFFLEVBQUU7QUFDWCxjQUFTLEVBQUUsd0NBQXdDO0FBQ25ELGFBQVEsRUFBRSxNQUFNO0FBQ2hCLGVBQVUsRUFBRSxNQUFNO0lBQ25COztBQUVELFNBQU0sb0JBQUc7QUFDUCxZQUNFOztTQUFLLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTztPQUN0Qjs7O1NBQUc7O2FBQU0sRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUzs7VUFBWTtRQUFJO09BQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtNQUNoQixDQUNQO0lBQ0Y7RUFDRixDQUFDOztBQUVGLEtBQU0sR0FBRyxHQUFHLG1CQUFNLFdBQVcsQ0FBQzs7O0FBRTVCLDRCQUF5QixxQ0FBQyxTQUFTLEVBQUU7O0FBRW5DLFNBQ0UsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxR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REFBTyxJQUFJLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBRSxPQUFRLEdBQUU7S0FDakQsdURBQU8sSUFBSSxFQUFDLDRCQUE0QixFQUFDLFNBQVMsRUFBRSxJQUFLLEdBQUU7SUFDckQ7RUFDRCxFQUNSLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQyIsImZpbGUiOiJwaW50ZXJlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcclxuaW1wb3J0IHsgYnJvd3Nlckhpc3RvcnksIFJvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXHJcblxyXG5jb25zdCBQSUNUVVJFUyA9IFtcclxuICB7IGlkOiAwLCBzcmM6ICdodHRwOi8vcGxhY2VraXR0ZW4uY29tLzYwMS82MDEnIH0sXHJcbiAgeyBpZDogMSwgc3JjOiAnaHR0cDovL3BsYWNla2l0dGVuLmNvbS82MTAvNjEwJyB9LFxyXG4gIHsgaWQ6IDIsIHNyYzogJ2h0dHA6Ly9wbGFjZWtpdHRlbi5jb20vNjIwLzYyMCcgfVxyXG5dXHJcblxyXG5jb25zdCBNb2RhbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBzdHlsZXM6IHtcclxuICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgdG9wOiAnMjAlJyxcclxuICAgIHJpZ2h0OiAnMjAlJyxcclxuICAgIGJvdHRvbTogJzIwJScsXHJcbiAgICBsZWZ0OiAnMjAlJyxcclxuICAgIHBhZGRpbmc6IDIwLFxyXG4gICAgYm94U2hhZG93OiAnMHB4IDBweCAxNTBweCAxMzBweCByZ2JhKDAsIDAsIDAsIDAuNSknLFxyXG4gICAgb3ZlcmZsb3c6ICdhdXRvJyxcclxuICAgIGJhY2tncm91bmQ6ICcjZmZmJ1xyXG4gIH0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3RoaXMuc3R5bGVzfT5cclxuICAgICAgICA8cD48TGluayB0bz17dGhpcy5wcm9wcy5yZXR1cm5Ub30+QmFjazwvTGluaz48L3A+XHJcbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufSlcclxuXHJcbmNvbnN0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIC8vIGlmIHdlIGNoYW5nZWQgcm91dGVzLi4uXHJcbiAgICBpZiAoKFxyXG4gICAgICBuZXh0UHJvcHMubG9jYXRpb24ua2V5ICE9PSB0aGlzLnByb3BzLmxvY2F0aW9uLmtleSAmJlxyXG4gICAgICBuZXh0UHJvcHMubG9jYXRpb24uc3RhdGUgJiZcclxuICAgICAgbmV4dFByb3BzLmxvY2F0aW9uLnN0YXRlLm1vZGFsXHJcbiAgICApKSB7XHJcbiAgICAgIC8vIHNhdmUgdGhlIG9sZCBjaGlsZHJlbiAoanVzdCBsaWtlIGFuaW1hdGlvbilcclxuICAgICAgdGhpcy5wcmV2aW91c0NoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlblxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGxldCB7IGxvY2F0aW9uIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgbGV0IGlzTW9kYWwgPSAoXHJcbiAgICAgIGxvY2F0aW9uLnN0YXRlICYmXHJcbiAgICAgIGxvY2F0aW9uLnN0YXRlLm1vZGFsICYmXHJcbiAgICAgIHRoaXMucHJldmlvdXNDaGlsZHJlblxyXG4gICAgKVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgxPlBpbnRlcmVzdCBTdHlsZSBSb3V0ZXM8L2gxPlxyXG5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAge2lzTW9kYWwgP1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzQ2hpbGRyZW4gOlxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAge2lzTW9kYWwgJiYgKFxyXG4gICAgICAgICAgICA8TW9kYWwgaXNPcGVuPXt0cnVlfSByZXR1cm5Ubz17bG9jYXRpb24uc3RhdGUucmV0dXJuVG99PlxyXG4gICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KVxyXG5cclxuY29uc3QgSW5kZXggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8cD5cclxuICAgICAgICAgIFRoZSB1cmwgYC9waWN0dXJlcy86aWRgIGNhbiBiZSByZW5kZXJlZCBhbnl3aGVyZSBpbiB0aGUgYXBwIGFzIGEgbW9kYWwuXHJcbiAgICAgICAgICBTaW1wbHkgcHV0IGBtb2RhbDogdHJ1ZWAgaW4gdGhlIGxvY2F0aW9uIGRlc2NyaXB0b3Igb2YgdGhlIGB0b2AgcHJvcC5cclxuICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgQ2xpY2sgb24gYW4gaXRlbSBhbmQgc2VlIGl0cyByZW5kZXJlZCBhcyBhIG1vZGFsLCB0aGVuIGNvcHkvcGFzdGUgdGhlXHJcbiAgICAgICAgICB1cmwgaW50byBhIGRpZmZlcmVudCBicm93c2VyIHdpbmRvdyAod2l0aCBhIGRpZmZlcmVudCBzZXNzaW9uLCBsaWtlXHJcbiAgICAgICAgICBDaHJvbWUgLT4gRmlyZWZveCksIGFuZCBzZWUgdGhhdCB0aGUgaW1hZ2UgZG9lcyBub3QgcmVuZGVyIGluc2lkZSB0aGVcclxuICAgICAgICAgIG92ZXJsYXkuIE9uZSBVUkwsIHR3byBzZXNzaW9uIGRlcGVuZGVudCBzY3JlZW5zIDpEXHJcbiAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAge1BJQ1RVUkVTLm1hcChwaWN0dXJlID0+IChcclxuICAgICAgICAgICAgPExpbmtcclxuICAgICAgICAgICAgICBrZXk9e3BpY3R1cmUuaWR9XHJcbiAgICAgICAgICAgICAgdG89e3tcclxuICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBgL3BpY3R1cmVzLyR7cGljdHVyZS5pZH1gLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IHsgbW9kYWw6IHRydWUsIHJldHVyblRvOiB0aGlzLnByb3BzLmxvY2F0aW9uLnBhdGhuYW1lIH1cclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPGltZyBzdHlsZT17eyBtYXJnaW46IDEwIH19IHNyYz17cGljdHVyZS5zcmN9IGhlaWdodD1cIjEwMFwiIC8+XHJcbiAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICkpfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8cD48TGluayB0bz1cIi9zb21lLzEyMy9kZWVwLzQ1Ni9yb3V0ZVwiPkdvIHRvIHNvbWUgZGVlcCByb3V0ZTwvTGluaz48L3A+XHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5jb25zdCBEZWVwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPHA+WW91IGNhbiBsaW5rIGZyb20gYW55d2hlcmUgcmVhbGx5IGRlZXAgdG9vPC9wPlxyXG4gICAgICAgIDxwPlBhcmFtcyBzdGljayBhcm91bmQ6IHt0aGlzLnByb3BzLnBhcmFtcy5vbmV9IHt0aGlzLnByb3BzLnBhcmFtcy50d299PC9wPlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAgPExpbmsgdG89e3tcclxuICAgICAgICAgICAgcGF0aG5hbWU6IGAvcGljdHVyZXMvMGAsXHJcbiAgICAgICAgICAgIHN0YXRlOiB7IG1vZGFsOiB0cnVlLCByZXR1cm5UbzogdGhpcy5wcm9wcy5sb2NhdGlvbi5wYXRobmFtZSB9XHJcbiAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgTGluayB0byBwaWN0dXJlIHdpdGggTW9kYWxcclxuICAgICAgICAgIDwvTGluaz48YnIvPlxyXG4gICAgICAgICAgPExpbmsgdG89e2AvcGljdHVyZXMvMGB9PlxyXG4gICAgICAgICAgICBXaXRob3V0IG1vZGFsXHJcbiAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXHJcblxyXG5jb25zdCBQaWN0dXJlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGltZyBzcmM9e1BJQ1RVUkVTW3RoaXMucHJvcHMucGFyYW1zLmlkXS5zcmN9IHN0eWxlPXt7IGhlaWdodDogJzgwJScgfX0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfVxyXG59KVxyXG5cclxucmVuZGVyKChcclxuICA8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cclxuICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17QXBwfT5cclxuICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtJbmRleH0vPlxyXG4gICAgICA8Um91dGUgcGF0aD1cIi9waWN0dXJlcy86aWRcIiBjb21wb25lbnQ9e1BpY3R1cmV9Lz5cclxuICAgICAgPFJvdXRlIHBhdGg9XCIvc29tZS86b25lL2RlZXAvOnR3by9yb3V0ZVwiIGNvbXBvbmVudD17RGVlcH0vPlxyXG4gICAgPC9Sb3V0ZT5cclxuICA8L1JvdXRlcj5cclxuKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKSlcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9waW50ZXJlc3QvYXBwLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==