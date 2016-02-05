/******/ (function(modules) { // webpackBootstrap
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
	
	var _chai = __webpack_require__(1);
	
	var _reduxApis = __webpack_require__(2);
	
	var _reduxAsyncApi = __webpack_require__(3);
	
	var _reduxAsyncApi2 = _interopRequireDefault(_reduxAsyncApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	describe('Async', function () {
		it('extends Api', function () {
			(0, _chai.expect)(new _reduxAsyncApi2.default()).to.be.an.instanceOf(_reduxApis.Api);
		});
	
		it('can be used by extending from it', function () {
			var MyAsync = function (_Async) {
				_inherits(MyAsync, _Async);
	
				function MyAsync() {
					var state = arguments.length <= 0 || arguments[0] === undefined ? MyAsync.INITIAL_STATE : arguments[0];
	
					_classCallCheck(this, MyAsync);
	
					var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MyAsync).call(this, state));
	
					_this.setHandler('SET_RESULT', function (state, action) {
						return _extends({}, state, { result: action.payload });
					});
					return _this;
				}
	
				_createClass(MyAsync, [{
					key: 'result',
					value: function result() {
						return this.getState().result;
					}
				}, {
					key: 'setResult',
					value: function setResult(result) {
						return this.dispatch(this.createAction('SET_RESULT')(result));
					}
				}, {
					key: 'run',
					value: function run() {
						var _this2 = this;
	
						this.setBusy();
						this.setResult('busy...');
						return new Promise(function (resolve) {
							setTimeout(function () {
								_this2.setDone();
								_this2.setResult('Done!');
								return resolve();
							}, 0);
						});
					}
				}]);
	
				return MyAsync;
			}(_reduxAsyncApi2.default);
	
			MyAsync.INITIAL_STATE = _extends({}, _reduxAsyncApi2.default.INITIAL_STATE, { result: 'pending...' });
	
			var async = new MyAsync().init();
	
			(0, _chai.expect)(async.pending()).to.equal(true);
			(0, _chai.expect)(async.result()).to.equal('pending...');
			var promise = async.run();
			(0, _chai.expect)(async.pending()).to.equal(false);
			(0, _chai.expect)(async.busy()).to.equal(true);
			(0, _chai.expect)(async.result()).to.equal('busy...');
			promise.then(function () {
				(0, _chai.expect)(async.busy()).to.equal(false);
				(0, _chai.expect)(async.done()).to.equal(true);
				(0, _chai.expect)(async.result()).to.equal('Done!');
			});
		});
	
		it('can be used by composing it into other Apis', function () {
			var MyAsync = function (_Api) {
				_inherits(MyAsync, _Api);
	
				function MyAsync() {
					var state = arguments.length <= 0 || arguments[0] === undefined ? MyAsync.INITIAL_STATE : arguments[0];
	
					_classCallCheck(this, MyAsync);
	
					var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(MyAsync).call(this, state));
	
					_this3.async = (0, _reduxApis.link)(_this3, new _reduxAsyncApi2.default());
					_this3.setHandler('SET_RESULT', function (state, action) {
						return _extends({}, state, { result: action.payload });
					});
					return _this3;
				}
	
				_createClass(MyAsync, [{
					key: 'result',
					value: function result() {
						return this.getState().result;
					}
				}, {
					key: 'setResult',
					value: function setResult(result) {
						return this.dispatch(this.createAction('SET_RESULT')(result));
					}
				}, {
					key: 'run',
					value: function run() {
						var _this4 = this;
	
						this.async.setBusy();
						this.setResult('busy...');
						return new Promise(function (resolve) {
							setTimeout(function () {
								_this4.async.setDone();
								_this4.setResult('Done!');
								return resolve();
							}, 0);
						});
					}
				}]);
	
				return MyAsync;
			}(_reduxApis.Api);
	
			MyAsync.INITIAL_STATE = { result: 'pending...' };
	
			var myAsync = new MyAsync().init();
	
			(0, _chai.expect)(myAsync.async.pending()).to.equal(true);
			(0, _chai.expect)(myAsync.result()).to.equal('pending...');
			var promise = myAsync.run();
			(0, _chai.expect)(myAsync.async.pending()).to.equal(false);
			(0, _chai.expect)(myAsync.async.busy()).to.equal(true);
			(0, _chai.expect)(myAsync.result()).to.equal('busy...');
			promise.then(function () {
				(0, _chai.expect)(myAsync.async.busy()).to.equal(false);
				(0, _chai.expect)(myAsync.async.done()).to.equal(true);
				(0, _chai.expect)(myAsync.result()).to.equal('Done!');
			});
		});
	
		describe('.pending()', function () {
			it('indicates whether an async operation is pending', function () {
				var async = new _reduxAsyncApi2.default();
				async.setBusy();
				(0, _chai.expect)(async.pending()).to.equal(false);
				async.setDone();
				(0, _chai.expect)(async.pending()).to.equal(false);
				async.setError(Error('Test'));
				(0, _chai.expect)(async.pending()).to.equal(false);
				async.setPending();
				(0, _chai.expect)(async.pending()).to.equal(true);
			});
			it('initially returns `true`', function () {
				var async = new _reduxAsyncApi2.default();
				(0, _chai.expect)(async.pending()).to.equal(true);
			});
		});
	
		it('has methods `pending`, `busy`, `done` and `error` to inspect it\'s state', function () {
			var async = new _reduxAsyncApi2.default();
			(0, _chai.expect)(async).to.have.a.property('pending');
			(0, _chai.expect)(async.pending).to.be.a('function');
			(0, _chai.expect)(async).to.have.a.property('busy');
			(0, _chai.expect)(async.busy).to.be.a('function');
			(0, _chai.expect)(async).to.have.a.property('done');
			(0, _chai.expect)(async.done).to.be.a('function');
			(0, _chai.expect)(async).to.have.a.property('error');
			(0, _chai.expect)(async.error).to.be.a('function');
		});
	
		it('has methods `setPending`, `setBusy`, `setDone` and `setError` to mutate it\'s state', function () {
			var async = new _reduxAsyncApi2.default();
			(0, _chai.expect)(async).to.have.a.property('setPending');
			(0, _chai.expect)(async.setPending).to.be.a('function');
			(0, _chai.expect)(async).to.have.a.property('setBusy');
			(0, _chai.expect)(async.setBusy).to.be.a('function');
			(0, _chai.expect)(async).to.have.a.property('setDone');
			(0, _chai.expect)(async.setDone).to.be.a('function');
			(0, _chai.expect)(async).to.have.a.property('setError');
			(0, _chai.expect)(async.setError).to.be.a('function');
		});
	
		describe('.busy()', function () {
			it('indicates whether an async operation is busy', function () {
				var async = new _reduxAsyncApi2.default();
				async.setBusy();
				(0, _chai.expect)(async.busy()).to.equal(true);
				async.setDone();
				(0, _chai.expect)(async.busy()).to.equal(false);
				async.setError(Error('Test'));
				(0, _chai.expect)(async.busy()).to.equal(false);
				async.setPending();
				(0, _chai.expect)(async.busy()).to.equal(false);
			});
			it('initially returns `false`', function () {
				var async = new _reduxAsyncApi2.default();
				(0, _chai.expect)(async.busy()).to.equal(false);
			});
		});
	
		describe('.done()', function () {
			it('indicates whether the async operation has completed succesfully', function () {
				var async = new _reduxAsyncApi2.default();
				async.setBusy();
				(0, _chai.expect)(async.done()).to.equal(false);
				async.setDone();
				(0, _chai.expect)(async.done()).to.equal(true);
				async.setError(Error('Test'));
				(0, _chai.expect)(async.done()).to.equal(false);
				async.setPending();
				(0, _chai.expect)(async.done()).to.equal(false);
			});
			it('initially returns `false`', function () {
				var async = new _reduxAsyncApi2.default();
				(0, _chai.expect)(async.done()).to.equal(false);
			});
		});
	
		describe('.error()', function () {
			it('indicates whether the async operation has failed', function () {
				var async = new _reduxAsyncApi2.default();
				async.setBusy();
				(0, _chai.expect)(async.error()).to.equal(false);
				async.setDone();
				(0, _chai.expect)(async.error()).to.equal(false);
				async.setError(Error('Test'));
				(0, _chai.expect)(async.error()).to.be.an.instanceOf(Error);
				async.setPending();
				(0, _chai.expect)(async.error()).to.equal(false);
			});
			it('initially returns `false`', function () {
				var async = new _reduxAsyncApi2.default();
				(0, _chai.expect)(async.error()).to.equal(false);
			});
			it('returns the error object when there was an error', function () {
				var async = new _reduxAsyncApi2.default();
				(0, _chai.expect)(async.error()).to.equal(false);
			});
		});
	
		describe('.setPending()', function () {
			it('sets the async state to pending', function () {
				var async = new _reduxAsyncApi2.default();
				async.setBusy();
				(0, _chai.expect)(async.pending()).to.equal(false);
				async.setPending();
				(0, _chai.expect)(async.pending()).to.equal(true);
			});
		});
	
		describe('.setBusy()', function () {
			it('sets the async state to busy', function () {
				var async = new _reduxAsyncApi2.default();
				(0, _chai.expect)(async.busy()).to.equal(false);
				async.setBusy();
				(0, _chai.expect)(async.busy()).to.equal(true);
			});
		});
	
		describe('.setDone()', function () {
			it('sets the async state to done', function () {
				var async = new _reduxAsyncApi2.default();
				(0, _chai.expect)(async.done()).to.equal(false);
				async.setDone();
				(0, _chai.expect)(async.done()).to.equal(true);
			});
		});
	
		describe('.setError(error)', function () {
			it('sets the async state to the given error', function () {
				var async = new _reduxAsyncApi2.default();
				(0, _chai.expect)(async.error()).to.equal(false);
				async.setError(new Error('TEST'));
				(0, _chai.expect)(async.error()).to.be.an.instanceOf(Error);
			});
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("redux-apis");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Async = undefined;
	
	var _reduxApis = __webpack_require__(2);
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=redux-async-api.spec.js.map