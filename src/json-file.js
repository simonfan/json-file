//     JsonFile
//     (c)
//     JsonFile is licensed under the MIT terms.

/**
 * CJS module.
 *
 * @module JsonFile
 */

'use strict';

var fs    = require('fs');
var path  = require('path');
var _ = require('lodash');

var File = exports.File = function (filePath, options) {
	this.indent  = null;
	this.data    = void(0);
	this.path    = path.normalize(filePath);
};

exports.read = function (filePath, callback) {
	var file = new File(filePath);
	if (callback) {
		file.read(callback);
	} else {
		file.readSync();
	}
	return file;
};

// ------------------------------------------------------------------
//  File I/O

File.prototype.read = function (callback) {
	fs.readFile(this.path, 'utf8', this._afterRead.bind(this, callback));
};

File.prototype._afterRead = function (callback, err, json) {
	if (err) {
		return callback(err);
	}
	this._processJson(json);
	callback();
};

File.prototype.readSync = function (callback) {
	this._processJson(
		fs.readFileSync(this.path, 'utf8')
	);
};

File.prototype._processJson = function (json) {
	this.data = JSON.parse(json);
};

File.prototype.write = function (first, second) {

	var firstIsFunction = _.isFunction(first),
		options = firstIsFunction ? {} : first,
		callback = firstIsFunction ? first : second;

	var space = options.space || this.indent,
		replacer = options.replacer || this.replacer;

	var json = JSON.stringify(this.data, replacer, space);

	fs.writeFile(this.path, json, callback);
};

File.prototype.writeSync = function (options) {
	options = options || {};

	var space = options.space || this.indent,
		replacer = options.replacer || this.replacer;

	var json = JSON.stringify(this.data, replacer, space);

	fs.writeFileSync(this.path, json);
};

// ------------------------------------------------------------------
//  Property editing

File.prototype.get = function (key) {
	return this._resolve(key, function (scope, key, value) {
		return value;
	});
};

File.prototype.set = function (key, value) {

	if (typeof key === 'object') {
		// loop through keys
		_.each(key, function  (value, key) {
			this.set(key, value);
		}.bind(this));

	} else {
		// effectively set
		this._resolve(key, function (scope, key) {
			scope[key] = value;
		});
	}

	return this;
};

// Has a callback, but is NOT async
File.prototype._resolve = function (key, callback) {
	var current = this.data;
	var keys = key.split('.');
	key = keys.pop();
	keys.forEach(function (key) {
		current = current[key];
	});
	return callback(current, key, current[key]);
};
