(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("redux-apis"));
	else if(typeof define === 'function' && define.amd)
		define(["redux-apis"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("redux-apis")) : factory(root["redux-apis"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Async = undefined;
	
	var _reduxApis = __webpack_require__(1);
	
	var _reduxApis2 = _interopRequireDefault(_reduxApis);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Async = exports.Async = function (_Api) {
		_inherits(Async, _Api);
	
		function Async() {
			var state = arguments.length <= 0 || arguments[0] === undefined ? Async.INITIAL_STATE : arguments[0];
	
			_classCallCheck(this, Async);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Async).call(this, state));
	
			_this.setHandler(Async.BUSY, function (state, action) {
				return _extends({}, state, { async: Async.BUSY });
			});
			_this.setHandler(Async.DONE, function (state, action) {
				return _extends({}, state, { async: Async.DONE });
			});
			_this.setHandler(Async.ERROR, function (state, action) {
				return _extends({}, state, { async: action.payload });
			});
			_this.setHandler(Async.PENDING, function (state, action) {
				return _extends({}, state, { async: Async.PENDING });
			});
			return _this;
		}
	
		_createClass(Async, [{
			key: 'pending',
			value: function pending() {
				return this.getState().async === Async.PENDING;
			}
		}, {
			key: 'busy',
			value: function busy() {
				return this.getState().async === Async.BUSY;
			}
		}, {
			key: 'done',
			value: function done() {
				return this.getState().async === Async.DONE;
			}
		}, {
			key: 'error',
			value: function error() {
				return _typeof(this.getState().async) == 'object' && this.getState().async;
			}
		}, {
			key: 'setBusy',
			value: function setBusy() {
				return this.dispatch(this.createAction(Async.BUSY)());
			}
		}, {
			key: 'setDone',
			value: function setDone() {
				return this.dispatch(this.createAction(Async.DONE)());
			}
		}, {
			key: 'setError',
			value: function setError(error) {
				return this.dispatch(this.createAction(Async.ERROR)(error));
			}
		}, {
			key: 'setPending',
			value: function setPending() {
				return this.dispatch(this.createAction(Async.PENDING)());
			}
		}]);
	
		return Async;
	}(_reduxApis2.default);
	
	Async.PENDING = 'PENDING';
	Async.BUSY = 'BUSY';
	Async.DONE = 'DONE';
	Async.ERROR = 'ERROR';
	Async.INITIAL_STATE = { async: 'PENDING' };
	exports.default = Async;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("redux-apis");

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redux-async-api.umd.js.map