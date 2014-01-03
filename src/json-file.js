//     jsonfile
//     (c)
//     jsonfile is licensed under the MIT terms.

/**
 * CJS module.
 *
 * @module jsonfile
 */

'use strict';

var file = require('file-object'),
	_ = require('lodash');

var jsonfile = module.exports = file.extend(function jsonfile(fpath, options) {
	file.prototype.initialize.apply(this, arguments);

	options = options || {};

	this.replacer = options.replacer || this.replacer;
	this.space = options.space || this.space;
});

/**
 * Define proto properties.
 */
jsonfile.proto({
	parse: JSON.parse,

	defaultValue: {},

	replacer: null,
	space: '\t',
	stringify: function stringifyJSON(data) {
		return JSON.stringify(data, this.replacer, this.space);
	},

	/**
	 * Set data.
	 * @method set
	 */
	set: function set(first, second) {

		if (arguments.length === 2) {

			if (typeof this.parsedData === 'undefined') {
				this.parsedData = _.clone(this.defaultValue);
			}

			var data = this.data();

			data[first] = second;

		} else {
			_.each(first, function (value, key) {
				this.set(key, value);
			}.bind(this));
		}

		return this;
	},

	get: function get(key) {
		return this.data()[key];
	}
});
