define([
  //'put-selector/put',

  //'dojo/_base/lang',

  'core/views/ControllerView',
  'core/Map/MapController'
], function(
  //put,

  //lang,

  ControllerView, MapController
) {
  return {
    startup: function(config) {
      this.config = config || {};
      if (this.config.debug) {
        window.app = this;
      }

      this.view = new ControllerView();

      this.mapController = new MapController({
        config: this.config.mapController
      }, this.view.get('mapNode'));
    }
  };
});