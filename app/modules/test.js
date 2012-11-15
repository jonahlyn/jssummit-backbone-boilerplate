// Test module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Test = app.module();

  // Default Model.
  Test.Model = Backbone.Model.extend({
  
  });

  // Default Collection.
  Test.Collection = Backbone.Collection.extend({
    model: Test.Model
  });

  // Default View. Fetches the test template
  //Test.Views.Layout = Backbone.Layout.extend({
    //template: "test"
  //});
  
  Test.Views.Test = Backbone.View.extend({
  	template: "test"
  });

  // Return the module for AMD compliance.
  return Test;

});
