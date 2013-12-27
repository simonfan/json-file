'use strict';

var path = require('path'),
	fs = require('fs');

var should = require('should');

var jsonfile = require('../src/json-file');

describe('jsonfile', function () {

	it('is a constructor', function () {
		var file = jsonfile(path.join(__dirname, 'tmp/data.json'));

		file.should.be.type('object');

		file.path.should.eql(path.join(__dirname, 'tmp/data.json'));
	});

	it('reads files', function (done) {
		var file = jsonfile(path.join(__dirname, 'tmp/data.json'));

		file.read()
			.done(function () {

				file.data().should.eql({
					name: 'test-data',
					lalala: 'lalala',
				});

				done();
			});
	});

	it('writes files', function (done) {
		var file = jsonfile(path.join(__dirname, 'tmp/data-temp.json'));

		file.set('name', 'temporary');

		file.write()
			.done(function () {
				file.data().should.eql({ name: 'temporary' });

				fs.unlinkSync(path.join(__dirname, 'tmp/data-temp.json'));

				done();
			});
	});
});
