'use strict';

var path = require('path');

var should = require('should'),
	_ = require('lodash');

var jsonfile = require('.././src');

describe('jsonfile where', function () {
	beforeEach(function () {
		this.path = path.join(__dirname, 'tmp');
		this.fruitFiles = jsonfile.s(this.path);
	});

	it('works', function () {
		var redFruitFiles = this.fruitFiles.where({
			color: 'red'
		});

		var data = redFruitFiles.readDataSync();

		_.each(data, function (d) {
			d.color.should.eql('red');
		});
	});
});
