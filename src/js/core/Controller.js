define([
  'esri/map',
  'esri/dijit/HomeButton',
  'esri/dijit/LocateButton',
  'esri/dijit/Geocoder',
  'esri/dijit/BasemapToggle',

  'put-selector/put',

  'dojo/_base/lang'//,

  //'core/views/ControllerView'
], function(
  Map, HomeButton, LocateButton, Geocoder, BasemapToggle,

  put,

  lang//,

  //ControllerView
) {
  return {
    startup: function(config) {
      this.config = config || {};
      if (this.config.debug) {
        window.app = this;
      }
      //this.view = new ControllerView();
      this.initMap();
    },
    initMap: function() {
      //create a div in the body and create an esri map in it
      this.map = new Map(put(document.body, 'div.mapContainer'), this.config.mapOptions);
      this.map.on('load', lang.hitch(this, 'initMapWidgets')); //waint untill the map is loaded before creating
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
  };
});