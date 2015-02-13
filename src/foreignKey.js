var R = require('ramda');

var curry = R.curry;
var assoc = R.assoc;
var converge = R.converge;
var compose = R.compose;
var get = R.get;
var propOf = R.propOf;
var identity = R.identity;
var map = R.map;

var isNothing = x => x === null || x === undefined;

var maybe = f => x => isNothing(f(x)) ? x : f(x); 

var rightJoinObj = (key, keyed) => 
  converge(
    assoc(key),
      compose(
        maybe(propOf(keyed)),
        get(key)),
      identity
    );

var rightJoin = curry((key, keyed, array) => 
  map(
    rightJoinObj(key, keyed)
    )(array));

module.exports = {
  rightJoin
};