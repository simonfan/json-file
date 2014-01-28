/**
 * Functionalities for plural json-file
 *
 * @module json-file
 * @submodule s
 */

 'use strict';

var _ = require('lodash'),
	objectQuery = require('object-query');

var jsonfile = require('../');

var s = module.exports = jsonfile.s.extend({

	where: function where(criteria, quantity) {

		// quantity defaults to the size of the files object
		quantity = !_.isUndefined(quantity) ? quantity : _.size(this.files);

			// build a query function
		var query = objectQuery(criteria),
			// retrieve the file iterator
			iterator = this.iterator();

		var res = {};

		// use the iterator so that we can stop whenever needed.
		while (iterator.hasNext()) {
			var curr = iterator.next(),
				key = iterator.currentKey(),
				data = curr.readDataSync();

			if (query(data) && quantity > 0) {
				res[key] = data;
				quantity --;
			}
		}

		// return a new jsonfile.s object.
		return jsonfile.s(this.base, res);
	}
});
