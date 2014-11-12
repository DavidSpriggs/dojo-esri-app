/* jshint unused: true*/
define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/number',
	'dojo/text!./templates/Summary.html',
	'dojo/_base/array',
	'dojo/store/Memory',
	'dojo/topic',

	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dijit/form/FilteringSelect',

	'core/models/appModel'
], function(
	declare, lang, number, template, array, Memory, topic,

	_WidgetBase, _TemplatedMixin, FilteringSelect,

	appModel
) {

	return declare([_WidgetBase, _TemplatedMixin], {
		templateString: template,
		featureLayer: null,
		title: 'Summary',
		baseClass: 'summaryWidget',
		postCreate: function() {
			this.inherited(arguments);
			this.init();
		},
		init: function() {
			appModel.watch('clickedFeature', lang.hitch(this, 'clickedFeatureHandler'));
			appModel.watch('portphfoiloFL', lang.hitch(this, 'setPortphfoiloFL'));
			this.zoomFS = new FilteringSelect({
				searchAttr: 'CITY_NAME',
				maxHeight: '300'
			}, this.summaryNode);
			this.zoomFS.startup();
			this.zoomFS.on('change', lang.hitch(this, 'zoomOnChange'));
		},
		clickedFeatureHandler: function(prop, oldValue, newValue) {
			this.popNode.innerHTML = number.format(newValue.attributes.POP, {
				places: 0
			});
			this.zoomFS.set('value', newValue.attributes.ObjectID);
		},
		setPortphfoiloFL: function(prop, oldValue, newValue) {
			this.set('featureLayer', newValue);
			this.featureLayer.on('update-end', lang.hitch(this, 'updateData'));
		},
		updateData: function() {
			var data = array.map(this.featureLayer.graphics, function(graphic) {
				graphic.attributes._geometry = graphic.geometry;
				return graphic.attributes;
			});
			var store = new Memory({
				data: data,
				idProperty: 'ObjectID'
			});
			this.zoomFS.set('store', store);
		},
		zoomOnChange: function() {
			var item = this.zoomFS.item;
			topic.publish('map/centerAndZoom', this, {
				mapPoint: item._geometry,
				level: 7
			});
			this.clickedFeatureHandler(null, null, {
				attributes: item
			});
		}

	});
});