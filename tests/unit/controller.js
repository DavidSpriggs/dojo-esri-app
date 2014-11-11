define([
	'intern!object',
	'intern/chai!assert',
	'../../src/js/core/config'//,
	//'../../src/js/core/Controller'
], function(
	registerSuite, assert,
	config//,
	//Controller
) {
	var controller;
	registerSuite({
		name: 'constructor',
		setup: function() {
			//controller = new Controller(config);
		},
		config_debug: function() {
			assert.strictEqual(config.debug, true, 'Default debug it true');
		}
	});
});