# benv

Stub a browser environment and test your client-side code in node.js.

## Example

Declare any common global dependencies

````javascript
benv.globals = function() {
  return {
    App: {},
    $: benv.require('./client/vendor/zepto.js', 'Zepto')
  }
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

Unit testing client side code in a browser is slow and hard to setup with [CI](http://en.wikipedia.org/wiki/Continuous_integration). Wouldn't it be nice if we could just run it along-side our server-side tests? Benv is a library of test helpers that makes it easy to require your client-side code in node.js and test it like any other node module.

See [this blog post](http://artsy.github.io/blog/2013/06/14/writing-headless-backbone-tests-with-node-dot-js/) for details & inspiration.

## API

### benv.globals

A function returning a hash of common globals your client-side code depends on beyond the normal DOM API. For instance you may have a global `App` namespace.

### benv.setup(callback)

Exposes a stubbed browser API and benv.globals into the node.js global namespace so the current process can act like a browser environment.

### benv.teardown()

Deletes the stubbed browser API, benv.globals, and cleans things up so other tests can run without being harmed.

### benv.require(filename, globalVarName)

For non-commonjs wrapped libraries, benv.require will export the global variable that is generally attached to window. For instance [zepto](https://github.com/madrobby/zepto) doesn't adopt any module pattern but it does create a global `Zepto` variable.

## benv.render(filename, data)

Renders a server-side template into the benv DOM. Pass in the template's filename along with any data passed into the template. Benv is backed by jsdom and `benv.render` will remove any script tags so as to not accidentally run external javascript.

Currently only supports [.jade](https://github.com/visionmedia/jade) templates. But please contribute others :)

## benv.requireWithJadeify(filename, varNames)

For those using [jadeify](https://github.com/OliverJAsh/node-jadeify2) when requiring client-side code that uses jadeify it will throw an error because `require('template.jade')` isn't valid node code. 

If you defer your jade requires to run time e.g. `var artworkTemplate = function() { require('foo.jade').apply(this, arguments); }` and use `benv.requireWithJadeify('../client/artwork.js', ['artworkTemplate'])` you can avoid this error and test the jadeified templates in node again.

## Contributing

Please fork the project and submit a pull request with tests. Install node modules `npm install` and run tests with `make test`.

## License

MIT