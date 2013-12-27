'use strict';

var should = require('should');

var jsonfile = require('../src/json-file');

describe('jsonfile.s (plural)', function () {
	beforeEach(function (done) {
		done();
	});

	it('is fine (:', function () {
		var fruit = { name: 'banana' }
		fruit.should.have.property('name', 'banana');
	});
});
