var _ = require('lodash');
var merge = require('../');
var assert = require('assert');

var users = _.times(1000).map(i => ({ type: 'user', id: i, name: `user ${i}` }))
var users1 = _.cloneDeep(users);
var result;
var result1;

var bench = function (fn) {
	console.time('bench');
	fn()
	console.timeEnd('bench');
}

function deepMerge() {
	result = users.reduce((state, u) => {
		return merge(state, { [u.type]: { [u.id]: u } })
	}, { user: {} })
}

function lodashMerge() {
	result1 = users1.reduce((state, u) => {
		return _.merge(state, { [u.type]: { [u.id]: u } })
	}, { user: {} })
}

bench(deepMerge);
bench(lodashMerge);
assert.deepEqual(result, result1);
