webpackJsonp([16],{

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'announcements',
	
	  getChildRoutes: function getChildRoutes(location, cb) {
	    __webpack_require__.e/* nsure */(17, function (require) {
	      cb(null, [__webpack_require__(86)]);
	    });
	  },
	
	  getComponents: function getComponents(location, cb) {
	    __webpack_require__.e/* nsure */(19, function (require) {
	      cb(null, {
	        sidebar: __webpack_require__(88),
	        main: __webpack_require__(89)
	      });
	    });
	  }
	};

/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'assignments',
	
	  getChildRoutes: function getChildRoutes(location, cb) {
	    __webpack_require__.e/* nsure */(20, function (require) {
	      cb(null, [__webpack_require__(91)]);
	    });
	  },
	
	  getComponents: function getComponents(location, cb) {
	    __webpack_require__.e/* nsure */(22, function (require) {
	      cb(null, {
	        sidebar: __webpack_require__(93),
	        main: __webpack_require__(94)
	      });
	    });
	  }
	};

/***/ },

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  path: 'grades',
	  getComponent: function getComponent(location, cb) {
	    __webpack_require__.e/* nsure */(23, function (require) {
	      cb(null, __webpack_require__(96));
	    });
	  }
	};

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9yb3V0ZXMvQW5ub3VuY2VtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vRDovR2l0aHViL3JlYWN0LXJvdXRlci9leGFtcGxlcy9odWdlLWFwcHMvcm91dGVzL0NvdXJzZS9yb3V0ZXMvQXNzaWdubWVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL0Q6L0dpdGh1Yi9yZWFjdC1yb3V0ZXIvZXhhbXBsZXMvaHVnZS1hcHBzL3JvdXRlcy9Db3Vyc2Uvcm91dGVzL0dyYWRlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsT0FBTSxDQUFDLE9BQU8sR0FBRztBQUNmLE9BQUksRUFBRSxlQUFlOztBQUVyQixpQkFBYywwQkFBQyxRQUFRLEVBQUUsRUFBRSxFQUFFO0FBQzNCLDBDQUFtQixVQUFDLE9BQU8sRUFBSztBQUM5QixTQUFFLENBQUMsSUFBSSxFQUFFLENBQ1AsbUJBQU8sQ0FBQyxFQUF1QixDQUFDLENBQ2pDLENBQUM7TUFDSCxDQUFDO0lBQ0g7O0FBRUQsZ0JBQWEseUJBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRTtBQUMxQiwwQ0FBbUIsVUFBQyxPQUFPLEVBQUs7QUFDOUIsU0FBRSxDQUFDLElBQUksRUFBRTtBQUNQLGdCQUFPLEVBQUUsbUJBQU8sQ0FBQyxFQUFzQixDQUFDO0FBQ3hDLGFBQUksRUFBRSxtQkFBTyxDQUFDLEVBQTRCLENBQUM7UUFDNUMsQ0FBQztNQUNILENBQUM7SUFDSDtFQUNGLEM7Ozs7Ozs7OztBQ25CRCxPQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2YsT0FBSSxFQUFFLGFBQWE7O0FBRW5CLGlCQUFjLDBCQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUU7QUFDM0IsMENBQW1CLFVBQUMsT0FBTyxFQUFLO0FBQzlCLFNBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FDUCxtQkFBTyxDQUFDLEVBQXFCLENBQUMsQ0FDL0IsQ0FBQztNQUNILENBQUM7SUFDSDs7QUFFRCxnQkFBYSx5QkFBQyxRQUFRLEVBQUUsRUFBRSxFQUFFO0FBQzFCLDBDQUFtQixVQUFDLE9BQU8sRUFBSztBQUM5QixTQUFFLENBQUMsSUFBSSxFQUFFO0FBQ1AsZ0JBQU8sRUFBRSxtQkFBTyxDQUFDLEVBQXNCLENBQUM7QUFDeEMsYUFBSSxFQUFFLG1CQUFPLENBQUMsRUFBMEIsQ0FBQztRQUMxQyxDQUFDO01BQ0gsQ0FBQztJQUNIO0VBQ0YsQzs7Ozs7Ozs7O0FDbkJELE9BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixPQUFJLEVBQUUsUUFBUTtBQUNkLGVBQVksd0JBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRTtBQUN6QiwwQ0FBbUIsVUFBQyxPQUFPLEVBQUs7QUFDOUIsU0FBRSxDQUFDLElBQUksRUFBRSxtQkFBTyxDQUFDLEVBQXFCLENBQUMsQ0FBQztNQUN6QyxDQUFDO0lBQ0g7RUFDRixDIiwiZmlsZSI6IjE2LmNodW5rLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgcGF0aDogJ2Fubm91bmNlbWVudHMnLFxyXG5cclxuICBnZXRDaGlsZFJvdXRlcyhsb2NhdGlvbiwgY2IpIHtcclxuICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xyXG4gICAgICBjYihudWxsLCBbXHJcbiAgICAgICAgcmVxdWlyZSgnLi9yb3V0ZXMvQW5ub3VuY2VtZW50JylcclxuICAgICAgXSlcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgZ2V0Q29tcG9uZW50cyhsb2NhdGlvbiwgY2IpIHtcclxuICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xyXG4gICAgICBjYihudWxsLCB7XHJcbiAgICAgICAgc2lkZWJhcjogcmVxdWlyZSgnLi9jb21wb25lbnRzL1NpZGViYXInKSxcclxuICAgICAgICBtYWluOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvQW5ub3VuY2VtZW50cycpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bbm5vdW5jZW1lbnRzL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgcGF0aDogJ2Fzc2lnbm1lbnRzJyxcclxuXHJcbiAgZ2V0Q2hpbGRSb3V0ZXMobG9jYXRpb24sIGNiKSB7XHJcbiAgICByZXF1aXJlLmVuc3VyZShbXSwgKHJlcXVpcmUpID0+IHtcclxuICAgICAgY2IobnVsbCwgW1xyXG4gICAgICAgIHJlcXVpcmUoJy4vcm91dGVzL0Fzc2lnbm1lbnQnKVxyXG4gICAgICBdKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBnZXRDb21wb25lbnRzKGxvY2F0aW9uLCBjYikge1xyXG4gICAgcmVxdWlyZS5lbnN1cmUoW10sIChyZXF1aXJlKSA9PiB7XHJcbiAgICAgIGNiKG51bGwsIHtcclxuICAgICAgICBzaWRlYmFyOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvU2lkZWJhcicpLFxyXG4gICAgICAgIG1haW46IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Bc3NpZ25tZW50cycpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ291cnNlL3JvdXRlcy9Bc3NpZ25tZW50cy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHBhdGg6ICdncmFkZXMnLFxyXG4gIGdldENvbXBvbmVudChsb2NhdGlvbiwgY2IpIHtcclxuICAgIHJlcXVpcmUuZW5zdXJlKFtdLCAocmVxdWlyZSkgPT4ge1xyXG4gICAgICBjYihudWxsLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvR3JhZGVzJykpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9HaXRodWIvcmVhY3Qtcm91dGVyL2V4YW1wbGVzL2h1Z2UtYXBwcy9yb3V0ZXMvQ291cnNlL3JvdXRlcy9HcmFkZXMvaW5kZXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9