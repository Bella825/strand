/**
 * @license
 * Copyright (c) 2015 MediaMath Inc. All rights reserved.
 * This code may only be used under the BSD style license found at http://mediamath.github.io/strand/LICENSE.txt

*/
(function(scope) {

	var DomGettable = {

		properties: {
			contentId:{
				type:String,
				value:"content"
			},
			contentTarget:{
				type:Object,
				value:function() { return this; }
			},
			domObject:{
				type:Object,
				value:function() { return {}; },
				notify:true,
			},
			observeSubtree:true,
		},

		ready: function() {
			this._updateDomObject();
		},

		getLightDOM: function() {
			return Polymer.dom(this.contentTarget.$[this.contentId]).getDistributedNodes();
		},

		_updateDomObject: function() {
			this.set("domObject", StrandLib.DataUtils.objectifyDistributedNodes( this.getLightDOM() ));
		},

		_nodesChanged:function(mutations) {
			//super
			scope.DomMutable._nodesChanged.apply(this, [mutations]);
			this._updateDomObject();

		}
	};

	scope.DomGettable = [
		scope.DomMutable,
		DomGettable
	];
}(window.StrandTraits = window.StrandTraits || {}));