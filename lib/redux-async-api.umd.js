(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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
				return this.getState().async instanceof Error && this.getState().async;
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

	!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){var n=arguments.length<=2||void 0===arguments[2]?u:arguments[2];return e.__parent=t,t instanceof p&&(e.__link=n.bind(e)),e}function o(t){return function(e){return e.onload=t,e}}function a(t,e){return Promise.all(t.filter(function(t){return t.onload}).map(function(t){return t.onload(e)}).filter(function(t){return t instanceof Promise}))}function u(t,e){return void 0===e?"object"==("undefined"==typeof t?"undefined":f(t))&&this.__parent?t[s(this.__parent,this)]:t:"object"==("undefined"==typeof t?"undefined":f(t))&&this.__parent?t[s(this.__parent,this)]=e:e}function s(t,e){for(var n,r=Object.keys(t),i=0;n=r[i];i++)if(t[n]===e)return n}function c(t,e,n){var r="function"==typeof e?e:function(t){return t};return function(){var e={type:t,payload:r.apply(void 0,arguments)};return 1===arguments.length&&(arguments.length<=0?void 0:arguments[0])instanceof Error&&(e.error=!0),"function"==typeof n&&(e.meta=n.apply(void 0,arguments)),e}}var f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},d=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();Object.defineProperty(e,"__esModule",{value:!0}),e.link=i,e.onload=o,e.load=a;var p=e.Api=function(){function t(){var e=this,n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];r(this,t),Object.defineProperties(this,{__actionHandlers:{value:{}},__state:{value:n,writable:!0},__dispatch:{value:function(t){return"function"==typeof t?t(e.dispatch.bind(e),e.getState.bind(e)):(n=e.reducer(n,t),t)}},__parent:{value:void 0,writable:!0},__link:{value:void 0,writable:!0},connector:{value:this.connector.bind(this)},reducer:{value:this.reducer.bind(this)}})}return d(t,[{key:"init",value:function(){return this.dispatch(this.createAction("@@redux/INIT")()),this}},{key:"dispatch",value:function(t){return this.__parent?this.__parent.dispatch(t):this.__dispatch(t)}},{key:"getState",value:function(){return this.__parent?this.__link?this.__link(this.__parent.getState()):this.__parent.getState():this.__state}},{key:"createAction",value:function(e,n,r){return this.__parent instanceof t?this.__parent.createAction(s(this.__parent,this)+"/"+e,n,r):c(e,n,r)}},{key:"setHandler",value:function(t,e){this.__actionHandlers[t]=e}},{key:"clearHandler",value:function(t){delete this.__actionHandlers[t]}},{key:"connector",value:function(t,e){return l({},this.getState(),e,{api:this})}},{key:"reducer",value:function(e,r){var i=this,o=r.type.indexOf("/"),a=-1!==o&&r.type.substring(0,o),u=this.__actionHandlers[r.type]?this.__actionHandlers[r.type].call(this,e,r):void 0===e?this.__state:void 0,s=Object.keys(this).filter(function(e){return i[e]instanceof t});return s.forEach(function(t){var s=t!==a?r:l({},r,{type:r.type.substring(o+1)}),c=i[t].reducer(i[t].__link(e),s);(void 0===e||i[t].__link&&void 0===i[t].__link(e)||i[t].getState()!==c)&&(void 0===u&&(u=e instanceof Array?[].concat(n(e)):l({},e)),i[t].__link(u,c))}),this.__state=u||e}}]),t}();e["default"]=p}])});
	//# sourceMappingURL=redux-apis.min.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redux-async-api.umd.js.map