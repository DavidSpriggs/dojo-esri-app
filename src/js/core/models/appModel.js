define([
	'dojo/_base/declare',
	'dojo/Stateful'
], function(
	declare, Stateful
) {
	var SingletonClass = declare([Stateful], {
		constructor: function() {
			this.clickedFeature = null;
		},
		_clickedFeatureSetter: function(graphic) {
			this.clickedFeature = graphic;
		},
		_clickedFeatureGetter: function() {
			return this.clickedFeature;
		}
	});
	if (!_instance) {
		var _instance = new SingletonClass();
	}
	return _instance;
});