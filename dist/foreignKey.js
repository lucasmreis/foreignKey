"use strict";

var R = require("ramda");

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

var log = function (x) {
  console.log(x);return x;
};

var isNothing = function (x) {
  return x === null || x === undefined || x === "";
};

var maybe = function (f) {
  return function (x) {
    return isNothing(f(x)) ? x : f(x);
  };
};

var rightJoinObj = function (key, keyed) {
  return converge(assoc(key), compose(maybe(propOf(keyed)), get(key)), identity);
};

var rightJoin = curry(function (key, keyed, array) {
  return map(rightJoinObj(key, keyed))(array);
});

var keyed = curry(function (key, list) {
  return compose(foldl(mixin, {}), map(converge(createMapEntry, get(key), identity)), filter(compose(not(isNothing), get(key))))(list);
});


module.exports = {
  rightJoin: rightJoin,
  keyed: keyed
};

