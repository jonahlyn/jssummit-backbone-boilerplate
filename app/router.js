define([
  // Application.
  "app",
  
  // Modules
  "modules/test",
  "modules/simple",
  "modules/forecast"
],

function(app, Test, Simple, Forecast) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "detail/:id": "showDetail"
    },
    
    initialize: function(){
      // Setup the collections
      var collections = {
        forecasts: new Forecast.Collection()
      }
      
      // Give the router a reference to the collections
      _.extend(this, collections);
      
      app.useLayout().setViews({
        ".search": new Forecast.Views.Search({collection: this.forecasts}),
        ".results" : new Forecast.Views.ForecastsView({collection: this.forecasts})
      }).render();
    },
    
    index: function() {

    },
  
    showDetail: function(id){
      var model = this.forecasts.get(id),
          detail = new Forecast.Views.ForecastDetail({model: model});

      //if(typeof model == 'undefined') {
        //model = new Forecast.Model({zip: id})
        //this.forecasts.add(model);
      //}
      
      detail.render();
    }

});


  return Router;

});
