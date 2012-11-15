// Simple module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Simple = app.module();

  // Default Model.
  Simple.Model = Backbone.Model.extend({
  
  });

  // Default Collection.
  Simple.Collection = Backbone.Collection.extend({
    model: Simple.Model
  });

  // Default View.
  Simple.Views.Layout = Backbone.Layout.extend({
    template: "simple"
  });

  // Return the module for AMD compliance.
  return Simple;

});
