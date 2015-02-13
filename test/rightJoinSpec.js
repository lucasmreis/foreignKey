var chai = require('chai');
var expect = chai.expect;

var fk = require('../');
var rightJoin = fk.rightJoin;

describe('rightJoin', function() {
  it('should right join properly', function() {
    var keyed = {
      a: {name: 'The Girl'}, 
      b: {name: 'The Guy'}
    };

    var collection = [
      {person: 'a', pet: 'dog'},
      {person: 'a', pet: 'cat'},
      {person: 'b', pet: 'dog'}
    ];

    var expected = [
      {person: {name: 'The Girl'}, pet: 'dog'},
      {person: {name: 'The Girl'}, pet: 'cat'},
      {person: {name: 'The Guy'}, pet: 'dog'}
    ];

    expect(rightJoin('person')(keyed)(collection)).to.deep.equal(expected);
  });

  it('should leave indexes not found untouched', function() {
    var keyed = {
      a: {name: 'The Girl'}, 
      b: {name: 'The Guy'}
    };

    var collection = [
      {person: 'a'},
      {person: 'b'},
      {person: 'c'},
      {person: ''},
      {person: null},
      {person: undefined},
      {}
    ];

    var expected = [
     {person: {name: 'The Girl'}},
     {person: {name: 'The Guy'}},
     {person: 'c'},
     {person: ''},
     {person: null},
     {person: undefined},
     {person: undefined}
    ];

    expect(rightJoin('person')(keyed)(collection)).to.deep.equal(expected);
  });
});