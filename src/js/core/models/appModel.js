define([
	'dojo/_base/declare',
	'dojo/Stateful',
	'dojo/_base/lang'
], function(
	declare, Stateful, lang
) {
	var model = {
		clickedFeature: null,
		mapExtent: null,
		mapLod: null,
		map: null
	};

	var SingletonClass = declare([Stateful], {
		constructor: function() {
			lang.mixin(this, model);
		}
	});

	if (!_instance) {
		var _instance = new SingletonClass();
	}
	return _instance;
});