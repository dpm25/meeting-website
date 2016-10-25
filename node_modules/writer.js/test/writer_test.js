var expect = require('expect');

var writer = require('../writer.js');

describe('writer.StringWriter', function() {
  var stringWriter;

  beforeEach(function() {
    stringWriter = new writer.StringWriter();
  });

  it('writes output to a string', function() {
    stringWriter.write('foo');
    stringWriter.write('bar');
    expect(stringWriter.toString()).toEqual('foobar');
  });

  it('invalidates cache after calls to #write', function() {
    stringWriter.write('foo');
    expect(stringWriter.toString()).toEqual('foo');
    stringWriter.write('bar');
    expect(stringWriter.toString()).toEqual('foobar');
  });
});

describe('writer.ConsoleWriter', function() {
  var consoleWriter;

  beforeEach(function() {
    consoleWriter = new writer.ConsoleWriter();
  });

  it('writes output to console', function() {
    // TODO: actually test this properly
    consoleWriter.write('foo');
    consoleWriter.write('bar');
  });
});
