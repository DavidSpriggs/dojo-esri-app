define([
	'esri/map',
	'esri/dijit/HomeButton',
	'esri/dijit/LocateButton',
	'esri/dijit/Geocoder',
	'esri/dijit/BasemapToggle',

	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/Stateful',
	'dojo/Evented',

	'put-selector/put'
], function(
	Map, HomeButton, LocateButton, Geocoder, BasemapToggle,

	declare, lang, Stateful, Evented,

	put
) {
	return declare([Evented, Stateful], {
		constructor: function(params, sourceNode) {
			lang.mixin(this, params || {});
			this.map = new Map(sourceNode, this.config.mapOptions);
			this.map.on('load', lang.hitch(this, 'initMapWidgets'));
		},
		initMapWidgets: function() {
			//create controls div
			this.controlsNode = put(this.map.root, 'div.topLeftControls');
			//move the slider into the controls div
			put(this.controlsNode, '>', this.map._slider);

			this.home = new HomeButton({
				map: this.map
			}, put(this.controlsNode, 'div.homeButton div')); //create the home button in the controls div
			this.home.startup();

			this.geoLocate = new LocateButton({
				map: this.map,
				useTracking: false
			}, put(this.controlsNode, 'div.locateButton div')); //create the locate button in the controls div
			this.geoLocate.startup();

			this.search = new Geocoder({
				map: this.map,
				autoComplete: true
			}, put(this.controlsNode, 'div.search div')); //create the search bar in the controls div
			this.search.startup();

			this.basemaToggle = new BasemapToggle({
				map: this.map,
				basemap: 'hybrid'
			}, put(this.map.root, 'div.basemapToggle div'));
			this.basemaToggle.startup();
		}
	});
});