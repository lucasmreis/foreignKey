var R = require('ramda');

var curry = R.curry;
var assoc = R.assoc;
var converge = R.converge;
var compose = R.compose;
var get = R.get;
var propOf = R.propOf;
var identity = R.identity;
var map = R.map;
var createMapEntry = R.createMapEntry;
var foldl = R.foldl;
var mixin = R.mixin;
var filter = R.filter;
var not = R.not;

var log = x => { console.log(x); return x; };

var isNothing = x => x === null || x === undefined || x === '';

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

var keyed = curry((key, list) =>
  compose(
    foldl(mixin, {}),
    map(
    converge(
      createMapEntry,
        get(key),
        identity)),
    filter(
      compose(
        not(isNothing),
        get(key)))
    )(list));
  

module.exports = {
  rightJoin,
  keyed
};