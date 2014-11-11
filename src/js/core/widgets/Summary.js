define([
	'dojo/_base/declare',
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dojo/_base/lang',
	'core/models/appModel',
	'dojo/number',
	'dojo/text!./templates/Summary.html'
], function(declare, _WidgetBase, _TemplatedMixin, lang, appModel, number, template) {

	return declare([_WidgetBase, _TemplatedMixin], {
		templateString: template,
		title: 'Summary',
		baseClass: 'summaryWidget',
		postCreate: function() {
			this.inherited(arguments);
			appModel.watch('clickedFeature', lang.hitch(this, 'dispaly'));
		},
		dispaly: function(prop, oldValue, newValue) {
			this.popNode.innerHTML = number.format(newValue.attributes.POP, {
				plases: 0
			});
		}
	});
});