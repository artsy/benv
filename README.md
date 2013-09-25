# benv

Stub a browser environment and test your client-side code in node.js.

## Example

Declare any common global dependencies

````javascript
benv.globals = {
  App: {},
  $: benv.require('./client/vendor/zepto.js', 'Zepto')
}
````

Given some client-side code

**./client/app.js**
````javascript
$(function() {
  $('body').html('Wat!?');
});
````

Stub a browser environment and test it in node.js. (Example using [mocha](http://visionmedia.github.io/mocha/) and [should](https://github.com/visionmedia/should.js/)).

````javascript
beforeEach(function(done) {
  benv.setup(function() {
    done();
  });
});

afterEach(function(done) {
  benv.teardown();
});

describe('app.js', function() {
  it('renders Wat', function() {
    require('./client/app.js');
    $('body').html().should.include('Wat!?');
  });
});

````

## Why

Unit testing client side code in a browser is slow and hard to setup with [CI](http://en.wikipedia.org/wiki/Continuous_integration). Wouldn't it be nice if we could just run it along-side our server-side tests?Benv is a library of test helpers that makes it easy to require your client-side code in node.js and test it like any other node module.

See [this blog post](http://artsy.github.io/blog/2013/06/14/writing-headless-backbone-tests-with-node-dot-js/) for details & inspiration.

## API

# benv.globals

Hash of common globals your client-side code depends on beyond the normal DOM API. For instance you may have a global `App` namespace.

# benv.require(path, globalVarName)

For non-commonjs wrapped libraries, benv.require will export the global variable that is generally attached to window. For instance [zepto](https://github.com/madrobby/zepto) doesn't adopt any module pattern but it does create a global `Zepto` variable.

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT