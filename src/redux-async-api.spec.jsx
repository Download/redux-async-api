import { expect } from 'chai';
import { Api, link } from 'redux-apis';

import Async from './redux-async-api';


describe('Async', () => {
	it('extends Api', () => {
		expect(new Async()).to.be.an.instanceOf(Api);
	});

	it('can be used by extending from it', () => {
		class MyAsync extends Async {
			static INITIAL_STATE = { ...Async.INITIAL_STATE, result:'pending...' };

			constructor(state = MyAsync.INITIAL_STATE) {
				super(state);
				this.setHandler('SET_RESULT', (state, action) => ({...state, result:action.payload}));
				Object.defineProperty(this, 'result', {enumerable:true, get:() => this.getState().result});
			}

			setResult(result) {
				return this.dispatch(this.createAction('SET_RESULT')(result));
			}

			run() {
				this.setBusy();
				this.setResult('busy...');
				return new Promise((resolve) => {
					setTimeout(() => {
						this.setDone();
						this.setResult('Done!');
						return resolve();
					}, 0);
				});
			}
		}

		const async = new MyAsync().init();

		expect(async.pending).to.equal(true);
		expect(async.result).to.equal('pending...');
		let promise = async.run();
		expect(async.pending).to.equal(false);
		expect(async.busy).to.equal(true);
		expect(async.result).to.equal('busy...');
		promise.then(() => {
			expect(async.busy).to.equal(false);
			expect(async.done).to.equal(true);
			expect(async.result).to.equal('Done!');
		});
	});

	it('can be used by composing it into other Apis', (done) => {
		class MyAsync extends Api {
			static INITIAL_STATE = { result:'pending...' };

			constructor(state = MyAsync.INITIAL_STATE) {
				super(state);
				this.async = link(this, new Async());
				this.setHandler('SET_RESULT', (state, action) => ({...state, result:action.payload}));
				Object.defineProperty(this, 'result', {enumerable:true, get:() => this.getState().result});
			}

			setResult(result) {
				return this.dispatch(this.createAction('SET_RESULT')(result));
			}

			run() {
				this.async.setBusy();
				this.setResult('busy...');
				return new Promise((resolve) => {
					setTimeout(() => {
						this.async.setDone();
						this.setResult('Done!');
						return resolve();
					}, 0);
				});
			}
		}

		const myAsync = new MyAsync().init();

		expect(myAsync.async.pending).to.equal(true);
		expect(myAsync.result).to.equal('pending...');
		let promise = myAsync.run();
		expect(myAsync.async.pending).to.equal(false);
		expect(myAsync.async.busy).to.equal(true);
		expect(myAsync.result).to.equal('busy...');
		promise.then(() => {
			expect(myAsync.async.busy).to.equal(false);
			expect(myAsync.async.done).to.equal(true);
			expect(myAsync.result).to.equal('Done!');
			done();
		})
		.catch(done);
	});

	it('has properties `pending`, `busy`, `done` and `error` to inspect it\'s state', () => {
		const async = new Async();
		expect(async).to.have.a.property('pending');
		expect(async).to.have.a.property('busy');
		expect(async).to.have.a.property('done');
		expect(async).to.have.a.property('error');
	});

	it('has methods `setPending`, `setBusy`, `setDone` and `setError` to mutate it\'s state', () => {
		const async = new Async();
		expect(async).to.have.a.property('setPending');
		expect(async.setPending).to.be.a('function');
		expect(async).to.have.a.property('setBusy');
		expect(async.setBusy).to.be.a('function');
		expect(async).to.have.a.property('setDone');
		expect(async.setDone).to.be.a('function');
		expect(async).to.have.a.property('setError');
		expect(async.setError).to.be.a('function');
	});

	describe('.pending', () => {
		it('indicates whether an async operation is pending', () => {
			const async = new Async();
			async.setBusy();
			expect(async.pending).to.equal(false);
			async.setDone();
			expect(async.pending).to.equal(false);
			async.setError(Error('Test'));
			expect(async.pending).to.equal(false);
			async.setPending();
			expect(async.pending).to.equal(true);
		});
		it('initially returns `true`', () => {
			const async = new Async();
			expect(async.pending).to.equal(true);
		});
	});

	describe('.busy', () => {
		it('indicates whether an async operation is busy', () => {
			const async = new Async();
			async.setBusy();
			expect(async.busy).to.equal(true);
			async.setDone();
			expect(async.busy).to.equal(false);
			async.setError(Error('Test'));
			expect(async.busy).to.equal(false);
			async.setPending();
			expect(async.busy).to.equal(false);
		});
		it('initially returns `false`', () => {
			const async = new Async();
			expect(async.busy).to.equal(false);
		});
	});

	describe('.done', () => {
		it('indicates whether the async operation has completed succesfully', () => {
			const async = new Async();
			async.setBusy();
			expect(async.done).to.equal(false);
			async.setDone();
			expect(async.done).to.equal(true);
			async.setError(Error('Test'));
			expect(async.done).to.equal(false);
			async.setPending();
			expect(async.done).to.equal(false);
		});
		it('initially returns `false`', () => {
			const async = new Async();
			expect(async.done).to.equal(false);
		});
	});

	describe('.error', () => {
		it('indicates whether the async operation has failed', () => {
			const async = new Async();
			async.setBusy();
			expect(async.error).to.equal(false);
			async.setDone();
			expect(async.error).to.equal(false);
			async.setError(Error('Test'));
			expect(async.error).to.be.an.instanceOf(Error);
			async.setPending();
			expect(async.error).to.equal(false);
		});
		it('initially returns `false`', () => {
			const async = new Async();
			expect(async.error).to.equal(false);
		});
		it('returns the error object when there was an error', () => {
			const async = new Async();
			const test = Error('test');
			async.setError(test);
			expect(async.error).to.equal(test);
		});
	});

	describe('.setPending()', () => {
		it('sets the async state to pending', () => {
			const async = new Async();
			async.setBusy();
			expect(async.pending).to.equal(false);
			async.setPending();
			expect(async.pending).to.equal(true);
		});
	});

	describe('.setBusy()', () => {
		it('sets the async state to busy', () => {
			const async = new Async();
			expect(async.busy).to.equal(false);
			async.setBusy();
			expect(async.busy).to.equal(true);
		});
	});

	describe('.setDone()', () => {
		it('sets the async state to done', () => {
			const async = new Async();
			expect(async.done).to.equal(false);
			async.setDone();
			expect(async.done).to.equal(true);
		});
	});

	describe('.setError(error)', () => {
		it('sets the async state to the given error', () => {
			const async = new Async();
			expect(async.error).to.equal(false);
			async.setError(new Error('TEST'));
			expect(async.error).to.be.an.instanceOf(Error);
		});
	});
});

