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

var isNothing = function (x) {
  return x === null || x === undefined;
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

module.exports = {
  rightJoin: rightJoin
};

