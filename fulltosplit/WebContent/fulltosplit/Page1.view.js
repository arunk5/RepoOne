sap.ui.jsview("fulltosplit.Page1", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf fulltosplit.Page1
	*/ 
	getControllerName : function() {
		return "fulltosplit.Page1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf fulltosplit.Page1
	*/ 
	createContent : function(oController) {
		
		var oImage = new sap.m.Image("img");
		oImage.setSrc("img/sap.jpg");
		oImage.setTooltip("Be Inspired");
		oImage.setDecorative(false);
		oImage.setHeight('700px');
		oImage.setWidth('1300px');
		
		var oButton1 = new sap.m.Button("b1",{text:"FullScreen", tooltip:"Click To Navigate To FullScreen",press:oController.toFullScreen});
		var oButton2 = new sap.m.Button("b2",{text:"SplitApp", tooltip:"Click To Navigate To SplitApp",press:oController.toSplitApp});
		var oButton3 = new sap.m.Button("b3",{text:"FormSubmission",tooltip:"Click To Navigate To FormSubmission",press:oController.toForm});
		var oLayout = new sap.ui.layout.HorizontalLayout("Layout1", {
			content: [oButton1, oButton2, oButton3]
		});
		
 		return new sap.m.Page({
			title: "Be Hungry Be Foolish",
			content: [oImage,oLayout]
		});
	}

});