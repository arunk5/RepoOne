sap.ui.jsview("fulltosplit.FullScreen", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fulltosplit.FullScreen
	*/ 
	getControllerName : function() {
		return "fulltosplit.FullScreen";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fulltosplit.FullScreen
	*/ 
	createContent : function(oController) {
		
		var oButton1 = new sap.m.Button({text:"SplitApp", tooltip:"Submit value"});
		
 		return new sap.m.Page({
			title: "FullScreen",
			content: [oButton1]
		});
	}

});