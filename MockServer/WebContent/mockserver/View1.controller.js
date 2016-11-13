sap.ui.controller("mockserver.View1", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf mockserver.View1
*/
	onInit: function() {
		
		jQuery.sap.require("sap.ui.core.util.MockServer");
		var oMockServer = new sap.ui.core.util.MockServer({
			rootUri :"http://mockserver/"
		});
		oMockServer.simulate("model/metadata.xml","model/");
		oMockServer.start();
		var oModel = new sap.ui.model.odata.ODataModel("http://mockserver/",true);
		sap.ui.getCore().setModel(oModel);

//		oModel.read("/PersonDetails",{
//			success:function(oData,oResponse)
//			{
//				debugger;
//			}
//		})
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf mockserver.View1
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf mockserver.View1
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf mockserver.View1
*/
//	onExit: function() {
//
//	}

	onPress:function() {
		var content = sap.ui.getCore().byId("simpleForm").getContent();
		var newObject = {
				"PersonID": content[1].getValue(),
				"Age": content[3].getValue(),
				"Gender": content[5].getValue(),
				"Phone": content[7].getValue(),
				"Address": content[9].getValue()
				
		}
	//	console.log("Data"+content[1].getValue()+content[3].getValue(),content[5].getValue()+content[7].getValue()+content[9].getValue());
		var oModel = sap.ui.getCore().getModel();
		
		oModel.create('/PersonDetails', newObject, null, function(){
	 		alert("Create successful");
	 	},function(){
			alert("Create failed");});
		},
		
		
		
		editFunction : function () {
			
			 var oEditDialog = new sap.m.Dialog();
			 oEditDialog.setTitle("Update user");
			
			//it give complete context data assigned to row
			 var contexts = sap.ui.getCore().byId("table").getSelectedContexts();
			 if(contexts == ""){
				 sap.m.MessageToast.show("Please Select a row to Update");
			 }else {
				 
					 var oSelectedItem = sap.ui.getCore().byId("table").getSelectedItems(); 
					 var item1 = oSelectedItem[0];
					 var cells = item1.getCells();
					 var StudentID = cells[0].getText();
					 var StudentAge = cells[1].getText();
					 var StudentGender = cells[2].getText();
					 var StudentPhone = cells[3].getText();
					 var StudentAddress = cells[4].getText();
					 
					 var oEntry = {};
					 oEntry.PersonID=cells[0].getText();
					 oEntry.Age= cells[1].getText();
					 oEntry.Gender=cells[2].getText();
					 oEntry.Phone=cells[3].getText();
					 oEntry.Address=cells[4].getText();
								
						
					 
					 
					 var oSimpleForm = new sap.ui.layout.form.SimpleForm({
							maxContainerCols: 2,
							content:[
								
								new sap.m.Label({text:"Student ID"}),
								new sap.m.Input({value: StudentID,enabled:false
											}),
								new sap.m.Label({text:"Student Age"}),
								new sap.m.Input({value:StudentAge}),
								new sap.m.Label({text:"Student Gender"}),
								new sap.m.Input({value:StudentGender}),
								new sap.m.Label({text:"Student Phone"}),
								new sap.m.Input({value:StudentPhone}),
								new sap.m.Label({text:"Student Address"}),
								new sap.m.Input({value:StudentAddress}),
								
								]
						});	
					 
					 var oTable = sap.ui.getCore().byId("table");
					 var oSelectedItem = oTable.getSelectedItem();
				   	 var index = oTable.indexOfItem(oSelectedItem); 
					
					
					oEditDialog.addContent(oSimpleForm);
					oEditDialog.addButton(
							new sap.m.Button({
								text: "Save", 
								icon : "sap-icon://save",
								press: function() {
									var content = oSimpleForm.getContent();
									
									 var oModel = sap.ui.getCore().getModel();
									 debugger;
									    var requestObj = {
									    	      requestUri: "MockServer/model/PersonDetail/PersonDetails(004)",
									    	      method: 'PUT',
									    	      headers: {
									    	        "X-Requested-With": "XMLHttpRequest",
									    	        "Content-Type": "application/atom+xml",
									    	        "DataServiceVersion": "3.0",
									    	        "MaxDataServiceVersion": "3.0",
									    	        "Accept": "application/atom+xml",
									    	       // "X-CSRF-Token": ''
									    	      },
									    	      data: oEntry
									    	    };		 
									 
									    OData.request({
									        requestUri: "/MockServer",
									        method: "GET",
//									        headers: {
//									          "X-Requested-With": "XMLHttpRequest"
//									          //"X-CSRF-Token": "Fetch"
//									        }
									      }, function(data, response) {
									     //   requestObj.headers['X-CSRF-Token'] = response.headers['x-csrf-token'];

									        OData.request(requestObj, function() {
									     //     sap.m.MessageToast.show('PUT Operation Succeessfully!');
									     //     oModel.refresh();
									        }, function() {
									     //       sap.m.MessageToast.show("PUT Operation Failed");
									        });
									      });
									 
									 
//									 oModel.update('/PersonDetails(004)', oEntry, null, function(){
//										 sap.ui.getCore().getModel().refresh();
//									 		alert("Update successful");
//									 	},function(){
//											alert("Update failed");});
//							         var oModelData = oModel.getProperty("/");
//								    
//								     oModelData[index].Product = content[1].getValue();
//								     oModelData[index].Description = content[3].getValue();
//								     oModel.setProperty("/", oModelData);
//								     
									oEditDialog.close();
								}
							})
							);
					
					oEditDialog.open();
			 }
		
		},
		
	

		deleteFunction:  function (oEvent) { 
			var oModel = sap.ui.getCore().getModel();
			 var oTable = sap.ui.getCore().byId("table");
			 var oSelectedItem = oTable.getSelectedItem();
			 
			
//			 sap.ui.getCore().getModel().remove("/PersonDetails(001)", null, function(){
//		 		alert("Delete successful");
//		 	},function(){
//				alert("Delete failed");});
			
			 sap.ui.getCore().getModel().remove("/PersonDetails(001)",{success:function(){alert("success")},
				 error:function(){alert("fail")
					 }});
			 }

		

	
});