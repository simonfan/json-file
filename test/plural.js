'use strict';

var path = require('path'),
	fs = require('fs');

var should = require('should'),
	_ = require('lodash');

var jsonfile = require('../src');

describe('jsonfile.s (plural)', function () {
	beforeEach(function () {
		this.path = path.join(__dirname, 'tmp');
		this.datafiles = jsonfile.s(this.path);
	});

	it('stores the base path', function () {
		this.datafiles.base.should.eql(this.path);
	})

	it('is capable of reading multiple files', function () {
		var data = this.datafiles.readDataSync();

		_.size(data)
			.should.eql(fs.readdirSync(this.path).length);
	});
});
