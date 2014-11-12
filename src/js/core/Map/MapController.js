/* jshint unused: true*/
define([
	'esri/map',
	'esri/dijit/HomeButton',
	'esri/dijit/LocateButton',
	'esri/dijit/Geocoder',
	'esri/dijit/BasemapToggle',
	'esri/layers/FeatureLayer',
	//'esri/arcgis/utils',

	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/Stateful',
	'dojo/Evented',
	'dojo/topic',

	'put-selector/put',

	'core/models/appModel'
], function(
	Map, HomeButton, LocateButton, Geocoder, BasemapToggle, FeatureLayer, // arcgisUtils,

	declare, lang, Stateful, Evented, topic,

	put,

	appModel
) {
	return declare([Evented, Stateful], {
		clickedFeature: [],
		constructor: function(params, sourceNode) {
			lang.mixin(this, params || {});
			this.map = new Map(sourceNode, this.config.mapOptions);
			this.map.on('load', lang.hitch(this, 'init'));
			this.map.on('extent-change', lang.hitch(this, 'mapExtentChangeHandler'));
			this.appModel = appModel;
			// arcgisUtils.createMap(this.config.webMapId, sourceNode, {
			// 	mapOptions: this.config.mapOptions
			// }).then(lang.hitch(this, 'createMapComplete'));
		},
		init: function() {
			topic.subscribe('map/centerAndZoom', lang.hitch(this, 'centerAndZoom'));
			this.initMapLayers();
			this.initMapWidgets();
		},
		createMapComplete: function(webMapResponse) {
			this.webMap = webMapResponse;
			this.map = webMapResponse.map;
			this.initMapWidgets();
		},
		initMapLayers: function() {
			this.portphfoiloFL = new FeatureLayer(this.config.portphfoiloServiceUrl, {
				mode: FeatureLayer.MODE_AUTO,
				outFields: '*'
			});
			this.portphfoiloFL.on('click', lang.hitch(this, 'updateClickedFeature'));
			this.map.addLayer(this.portphfoiloFL);
			appModel.set('portphfoiloFL', this.portphfoiloFL);
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
		},
		updateClickedFeature: function(evt) {
			appModel.set('clickedFeature', evt.graphic);
		},
		mapExtentChangeHandler: function(evt) {
			appModel.set('mapExtent', evt.extent);
			appModel.set('mapLod', evt.lod);
		},
		centerAndZoom: function(caller, props) {
			this.map.centerAndZoom(props.mapPoint, props.level);
		}
	});
});