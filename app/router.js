define([
  // Application.
  "app",
  
  // Modules
  "modules/test",
  "modules/simple"
],

function(app, Test, Simple) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

  index: function() {
    app.useLayout().setViews({
      "header" : new Test.Views.Test(),
      "main" : new Simple.Views.Layout()
    }).render();
  }

});


  return Router;

});
