'use strict';

var path = require('path'),
	fs = require('fs');

var should = require('should');

var jsonfile = require('../src/json-file');

describe('jsonfile', function () {

	describe('basics', function () {
		it('is a constructor', function () {
			var file = jsonfile(path.join(__dirname, 'tmp/data.json'));

			file.should.be.type('object');

			file.path.should.eql(path.join(__dirname, 'tmp/data.json'));
		});
	});


	describe('methods', function () {

		beforeEach(function () {
			this.file = jsonfile(path.join(__dirname, 'tmp/data.json'));
		})

		it('read()', function (done) {
			var file = this.file;

			file.read()
				.done(function () {

					file.data().should.eql({
						name: 'test-data',
						lalala: 'lalala',
					});

					done();
				});
		});

		it('write()', function (done) {
			// special write test file
			var file = jsonfile(path.join(__dirname, 'tmp/data-temp.json'));

			file.set('name', 'temporary');

			file.write()
				.done(function () {
					file.data().should.eql({ name: 'temporary' });

					fs.unlinkSync(path.join(__dirname, 'tmp/data-temp.json'));

					done();
				});
		});

		describe('get(String)', function () {
			it('returns the value of the key', function () {

				var file = this.file;

				file.readSync();
				file.get('name').should.eql('test-data');

			});
		});

		describe('set', function () {
			it('sets data', function () {
				var file = this.file;

				file.readSync();

				// get original value
				file.get('name').should.eql('test-data');

				// set new value
				file.set('name', 'another-name')
					// check that the name was altered
					.get('name').should.eql('another-name');

				// tell file to read data again
				file.readSync();
				file.get('name').should.eql('test-data');
			})
		})

	});
});
