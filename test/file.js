'use strict';

var path = require('path'),
	fs = require('fs');

var should = require('should');

var json = require('../src/json-file');

describe('json.File', function () {

	it('is a constructor', function () {
		var file = new json.File(path.join(__dirname, 'tmp/data.json'));

		file.should.be.type('object');

		file.path.should.eql(path.join(__dirname, 'tmp/data.json'));
	});

	it('reads files', function (done) {
		var file = new json.File(path.join(__dirname, 'tmp/data.json'));

		file.read(function () {

			file.data.should.eql({
				name: 'test-data',
				lalala: 'lalala',
			});

			done();
		})
	});

	it('writes files', function (done) {
		var file = new json.File(path.join(__dirname, 'tmp/data-temp.json'));

		file.data = {};
		file.set('name', 'temporary');

		file.write(function () {
			file.data.should.eql({ name: 'temporary' });

			fs.unlinkSync(path.join(__dirname, 'tmp/data-temp.json'));

			done();
		})
	});
});
