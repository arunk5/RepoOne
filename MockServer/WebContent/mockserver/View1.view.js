sap.ui.jsview("mockserver.View1", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf mockserver.View1
	*/ 
	getControllerName : function() {
		return "mockserver.View1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf mockserver.View1
	*/ 
	createContent : function(oController) {
		
		var oSimpleForm = new sap.ui.layout.form.SimpleForm("simpleForm",{
			title: "Add New Student",
			
			
			content:[
			    
				new sap.m.Label({text:"Student ID"}),
				new sap.m.Input("field1",{value: '',
								 width : "200px"}),
				new sap.m.Label({text:"Student Age"}),
				new sap.m.Input("field2",{value:"",
								 width : "200px"}),
								 new sap.m.Label({text:"Student Gender"}),
									new sap.m.Input("field3",{value: '',
													 width : "200px"}),
													 new sap.m.Label({text:"Student Phone"}),
														new sap.m.Input("field4",{value: '',
																		 width : "200px"}),
																		 new sap.m.Label({text:"Student Address"}),
																			new sap.m.Input("field5",{value: '',
																							 width : "200px"}),
																							 new sap.m.Label({text:""}),
				new sap.m.Button({text : "Save",
								  width : "200px",
								  icon : "sap-icon://add-product", 
								  press : oController.onPress})
							
				]
		});
		
		
var oTable = new sap.m.Table("table",{ 
            headerText: "Student List",
           // selectionChange: oController.onSelectionChange,
            columns : [ new sap.m.Column({
                                  header :[ new sap.m.Label({text : "Student ID"}) ]
                                         }),
                        new sap.m.Column({
                        	
                                  header :[ new sap.m.Label({text : "Student Age"}) ]
                                         }),
                                         
                                         new sap.m.Column({
                                             header :[ new sap.m.Label({text : "Student Gender"}) ]
                                                    }),
                                                    new sap.m.Column({
                                                        header :[ new sap.m.Label({text : "Student Phone"}) ]
                                                               }),
                                                               new sap.m.Column({
                                                                   header :[ new sap.m.Label({text : "Student Address"}) ]
                                                                          })
                      ]
});
		
		
oTable.setMode(sap.m.ListMode.SingleSelectMaster);
		
oTable.bindItems("/PersonDetails", new sap.m.ColumnListItem("listItem",{
                        cells : [ new sap.m.Text({text : "{PersonID}"}),
                                  new sap.m.Text({text : "{Age}"}),
                                  new sap.m.Text({text : "{Gender}"}),
                                  new sap.m.Text({text : "{Phone}"}),
                                  new sap.m.Text({text : "{Address}"})
                           /*       new sap.m.Button({  
                                      icon : "sap-icon://delete",  
                                      text : "Delete",
                                      type : sap.m.ButtonType.Reject,
                                      press : function(evt) {  
                                    	  var oSelectedItem = evt.getParameter("listItem");
                                          var oPath = oSelectedItem.getBindingContext().getPath().slice(1);
                                    	  console.log(oPath) ; 
                                         
                                      },
                                  }),
                                  new sap.m.Button({  
                                      icon : "sap-icon://edit",  
                                     text : "Edit",
                                      press : oController.editFunction,
                                  })  */
                                  
                                ]
}));	
		
		
 		return new sap.m.Page({title: "Student Database",
			footer : [new sap.m.Bar({
				design : sap.m.BarDesign.Footer,
				contentRight : [
								new sap.m.Button({
									icon : "sap-icon://edit",
									text : "Edit",
									press : oController.editFunction
									}),
								new sap.m.Button({
									icon : "sap-icon://delete",
									text : "Delete",
									type :sap.m.ButtonType.Reject,
									press : oController.deleteFunction
									})]
			})],
			content: [oSimpleForm,oTable]
		});
	}});


