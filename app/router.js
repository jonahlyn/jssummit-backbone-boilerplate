define([
  // Application.
  "app",
  
  // Modules
  "modules/test"
],

function(app, Test) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
		var layout = new Backbone.Layout({
			el: "#main"
		});
		
		layout.insertView(new Test.Views.Test());
		
		layout.render();
    }
  });

  return Router;

});
