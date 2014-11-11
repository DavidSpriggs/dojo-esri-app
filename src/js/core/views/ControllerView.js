define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/Stateful',
	'dojo/Evented',

	'put-selector/put',

	'dijit/layout/BorderContainer',
	'dijit/layout/TabContainer',
	'dijit/layout/ContentPane',

	'core/widgets/Summary/Summary'
], function(
	declare, lang, Stateful, Evented,

	put,

	BorderContainer, TabContainer, ContentPane,
	Summary
) {
	return declare([Evented, Stateful], {
		constructor: function(params) {
			lang.mixin(this, params || {});
			this.domNode = put(document.body, 'div.borderContainer');
			this.buildUi();
		},
		buildUi: function() {
			this.borderContainer = new BorderContainer({
				design: 'headline',
				gutters: true,
				liveSplitters: true
			}, this.domNode);

			this.sidebar = new TabContainer({
				region: 'left',
				tabPosition: 'left-h',
				splitter: true
			}).placeAt(this.borderContainer);
			put(this.sidebar.domNode, '.layoutSidebar');

			this.tab1 = new Summary({}).placeAt(this.sidebar);

			this.tab2 = new ContentPane({
				title: 'Widget 2'
			}).placeAt(this.sidebar);

			this.mapContainer = new ContentPane({
				region: 'center'
			}).placeAt(this.borderContainer);
			put(this.mapContainer.domNode, '.mapContainer');

			this.borderContainer.startup();
		},
		_mapNodeGetter: function() {
			return this.mapContainer.domNode;
		}
	});
});