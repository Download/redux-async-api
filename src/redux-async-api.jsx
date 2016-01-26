import Api from 'redux-apis';

export class Async extends Api {
	static PENDING = 'PENDING';
	static BUSY = 'BUSY';
	static DONE = 'DONE';
	static ERROR = 'ERROR';

	static INITIAL_STATE = {async:'PENDING'};

	constructor(state = Async.INITIAL_STATE) {
		super(state);
		this.setHandler(Async.BUSY, (state, action) => ({...state, async:Async.BUSY}));
		this.setHandler(Async.DONE, (state, action) => ({...state, async:Async.DONE}));
		this.setHandler(Async.ERROR,(state, action) => ({...state, async:action.payload}));
		this.setHandler(Async.PENDING, (state, action) => ({...state, async:Async.PENDING}));
	}

	pending() {return this.getState().async === Async.PENDING;}
	busy() {return this.getState().async === Async.BUSY;}
	done() {return this.getState().async === Async.DONE;}
	error() {return this.getState().async instanceof Error && this.getState().async;}

	setBusy() {return this.dispatch(this.createAction(Async.BUSY)());}
	setDone() {return this.dispatch(this.createAction(Async.DONE)());}
	setError(error) {return this.dispatch(this.createAction(Async.ERROR)(error));}
	setPending() {return this.dispatch(this.createAction(Async.PENDING)());}
}

export default Async;
