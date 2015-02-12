# foreignKey
Experiments in data oriented design: function that joins a keyed collection to an array with a defined foreign key.

Example
-------

Given a regular javascript object:

```js
var keyed = {
  a: {name: 'The Girl'}, 
  b: {name: 'The Guy'}
};
```

And a collection with a foreign key, let's say `person`: 

```js
var collection = [
  {person: 'a', pet: 'dog'},
  {person: 'a', pet: 'cat'},
  {person: 'b', pet: 'dog'}
];
```

Calling `foreignKey` would result:

```js
foreignKey('person', keyed, collection);

// =>
//
// [
//   {person: {name: 'The Girl'}, pet: 'dog'},
//   {person: {name: 'The Girl'}, pet: 'cat'},
//   {person: {name: 'The Guy'}, pet: 'dog'}
// ]
```

Which is the joined collection.

Some Details
------------

When the key is not found, the old value is retained:

```js
var collection = [
  {person: 'a'},
  {person: 'b'},
  {person: 'c'},
  {person: ''},
  {person: null},
  {person: undefined},
  {}
];

foreignKey('person', keyed, collection);

// =>
//
// [
//  {person: {name: 'The Girl'}},
//  {person: {name: 'The Guy'}},
//  {person: 'c'},
//  {person: ''},
//  {person: null},
//  {person: undefined},
//  {}
// ];
```

Also, because RamdaJS is being used, foreignKey is curried by default:

```js
var joinPersonFrom = foreignKey('person');

var joinPerson = joinPersonFrom(keyed);

var joinedCollection = joinPerson(collection);

// === foreignKey('person', keyed, collection)
```


