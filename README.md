![version](https://img.shields.io/npm/v/redux-async-api.svg) ![license](https://img.shields.io/npm/l/redux-async-api.svg) ![installs](https://img.shields.io/npm/dt/redux-async-api.svg) ![build](https://img.shields.io/travis/Download/redux-async-api.svg) ![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

# redux-async-api <sup><sub>v1.0.0</sub></sup>

**Async api for use with [redux-apis](https://github.com/download/redux-apis)**

## Installation

```sh
npm install --save redux-async-api
```

## Dependencies and imports
redux-async-api peer-depends on redux-apis, so add a dependency to that as well.

```js
import Async from 'redux-async-api';
```

Or, using ES5 / `require`:

```js
var Async = require('redux-async-api').Async;
```

## Usage
`Async` was designed to be used either by extending from it, or by composing it into
other Apis.

### Extend from Async

```js
class MyAsync extends Async {
  static INITIAL_STATE = { ...Async.INITIAL_STATE, result:'pending...' };

  constructor(state = MyAsync.INITIAL_STATE) {
    super(state);
    this.setHandler('SET_RESULT', (state, action) => ({...state, result:action.payload}));
  }

  result() {
    return this.getState().result;
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
};

const async = new MyAsync().init();

expect(async.pending()).to.equal(true);
expect(async.result()).to.equal('pending...');
let promise = async.run();
expect(async.pending()).to.equal(false);
expect(async.busy()).to.equal(true);
expect(async.result()).to.equal('busy...');
promise.then(() => {
  expect(async.busy()).to.equal(false);
  expect(async.done()).to.equal(true);
  expect(async.result()).to.equal('Done!');
});
```

### Compose Async into other Apis
If you can't or don't want to extend from `Async`, you can compose it into your Api:

```js
class MyAsync extends Api {
  static INITIAL_STATE = { result:'pending...' };

  constructor(state = MyAsync.INITIAL_STATE) {
    super(state);
    this.async = link(this, new Async());
    this.setHandler('SET_RESULT', (state, action) => ({...state, result:action.payload}));
  }

  result() {
    return this.getState().result;
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
};

const myAsync = new MyAsync().init();

expect(myAsync.async.pending()).to.equal(true);
expect(myAsync.result()).to.equal('pending...');
let promise = myAsync.run();
expect(myAsync.async.pending()).to.equal(false);
expect(myAsync.async.busy()).to.equal(true);
expect(myAsync.result()).to.equal('busy...');
promise.then(() => {
  expect(myAsync.async.busy()).to.equal(false);
  expect(myAsync.async.done()).to.equal(true);
  expect(myAsync.result()).to.equal('Done!');
});
```


## Feedback, suggestions, questions, bugs
Please visit the [issue tracker](https://github.com/download/redux-async-api/issues)
for any of the above. Don't be afraid about being off-topic.
Constructive feedback most appreciated!


## Copyright
© 2016, [Stijn de Witt](http://StijnDeWitt.com). Some rights reserved.


## License
[Creative Commons Attribution 4.0 (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/)
