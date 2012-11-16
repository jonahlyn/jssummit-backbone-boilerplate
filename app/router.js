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
      "": "index"
    },

  index: function() {
    var forecasts = new Forecast.Collection();
    app.useLayout().setViews({
      ".search": new Forecast.Views.Search({collection: forecasts}),
      ".results" : new Forecast.Views.ForecastsView({collection: forecasts})
    }).render();
  }

});


  return Router;

});
