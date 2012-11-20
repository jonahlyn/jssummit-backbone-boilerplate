// Page module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Page = app.module();

  // Default Model.
  Page.Model = Backbone.Model.extend({
  
  });

  // Default Collection.
  Page.Collection = Backbone.Collection.extend({
    model: Page.Model
  });

  // Default View.
  Page.Views.Layout = Backbone.Layout.extend({
    template: "page"
  });

  // Return the module for AMD compliance.
  return Page;

});
