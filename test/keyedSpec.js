var chai = require('chai');
var expect = chai.expect;

var fk = require('../');
var keyed = fk.keyed;

describe('keyed', function() {
  it('should create keyed object from list', function() {
    var list = [
      {id: 'a', name: 'aaa'},
      {id: 'b', name: 'bbb'},
      {id: 'c', name: 'ccc'},
      {id: 'd', name: 'ddd'}
    ];

    var expected = {
      a: {id: 'a', name: 'aaa'},
      b: {id: 'b', name: 'bbb'},
      c: {id: 'c', name: 'ccc'},
      d: {id: 'd', name: 'ddd'}
    };

    expect(keyed('id')(list)).to.deep.equal(expected);
  });

  it('should remove items that do not have a string/number key', function() {
    var list = [
      {id: 'a', name: 'aaa'},
      {id: 1, name: 'bbb'},
      {id: '', name: 'ccc'},
      {id: null, name: 'ddd'},
      {id: undefined, name: 'eee'},
      {name: 'fff'}
    ];

    var expected = {
      a: {id: 'a', name: 'aaa'},
      1: {id: 1, name: 'bbb'},
    };

    expect(keyed('id')(list)).to.deep.equal(expected);
  });
});