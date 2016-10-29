jQuery.sap.declare("com.tutorial.Component");

sap.ui.core.UIComponent.extend("com.tutorial.Component",{
      metadata : {
            rootView : "fulltosplit.App",
            routing : {
                  config : {
                        viewType:"JS", // viewType defines type of the target views 
                        viewPath:"fulltosplit",
//                      targetControl:"navContainer",  // targetControl refers to the id of control where all the target views are to be placed 
                // this is defined in 'MainView' createcontent method 
                        targetAggregation:"pages", // targetAggregation refers to aggregation namw of targetControl. For splitApp 
                // control there are two Aggregations, 'detailPages' and 'masterPages' 
                        clearTarget : false//The clear target parameter defines a boolean that is used to specify if the aggregation 
                //should be cleared before adding the view to it. 
                  },
                  routes : [

                                      {
                                      pattern : "",
                                      name:"Page1",
                                      view:"Page1",// This is the target view, to where navigation happens
                                      targetControl:"navContainer",
                                      targetAggregation:"pages",
                                      
                                  },
                                  {
                                      pattern : ["new2","FullScreen"],
                                      name : "FullScreen",
                                      view : "FullScreen",
                                      targetControl:"navContainer",
                                      targetAggregation:"pages",
                                      
                                  },
                                      {
                                            pattern:"splitApp",
                                            name:"SplitApp",
                                            view:"SplitApp",
                                            targetControl:"navContainer",
                                            targetAggregation:"pages",
                                            subroutes:[{
                                                  pattern:"splitApp/",
                                                  name:"MasterPage",
                                                  view:"MasterPage",
                                                  targetControl:"SplitApp",
                                                  targetAggregation:"masterPages",
                                           
                                            subroutes:[
                                            {
                                                  pattern:"splitApp/",
                                                  name:"DetailPage",
                                                  view:"DetailPage",
                                                  targetControl:"SplitApp",
                                                  targetAggregation:"detailPages"
                                                 
                                            }],
                                            }]
                                      }],
            }}
});
com.tutorial.Component.prototype.init = function(){
      jQuery.sap.require("sap.ui.core.routing.History");
      jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
     
      sap.ui.core.UIComponent.prototype.init.apply(this);
     
      var router = this.getRouter();
      this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
      router.register("appRouter");  // Assign a name to Router, so that we can access it in all controllers by using this name 
      router.initialize(); // Initialise the Router  
};
com.tutorial.Component.prototype.createContent = function(){
      var view = sap.ui.view({viewName:"fulltosplit.App",type:sap.ui.core.mvc.ViewType.JS});
      return view;
};