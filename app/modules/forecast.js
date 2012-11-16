// Forecast module
define([
  // Application.
  "app"
],

// Map dependencies from above array.
function(app) {

  // https://github.com/elijahmanor/elijahmanor.github.com/blob/master/talks/intro-to-backbonejs/demo/weather-backbone.html

  // Create a new module.
  var Forecast = app.module();

  // Default Model.
  Forecast.Model = Backbone.Model.extend({
    url: function() {
        return "http://api.wunderground.com/api/7eaec3b21b154448/conditions/q/" + this.get("zip") + ".json";
    },
    parse : function( data, xhr ) {
        var observation = data.current_observation;
        return {
            id: observation.display_location.zip,
            url: observation.icon_url,
            state: observation.display_location.state_name,
            zip: observation.display_location.zip,
            city: observation.display_location.city,
            temperature: observation.temp_f    
        };
    },
    sync: function(method, model, options){  
        options.dataType = "jsonp";  
        return Backbone.sync(method, model, options);  
    },
    validate: function (options) {
        if (!options.zip) {
           return "Please enter a zip code";
        }
    }
  });

  // Default Collection.
  Forecast.Collection = Backbone.Collection.extend({
    model: Forecast.Model
  });

  // View for a single forecast item
  Forecast.Views.ForecastItem = Backbone.View.extend({
    tagName: "tr",
    template: "forecast-item",
    initialize: function(){
      _.bindAll(this, "render");
      this.model.fetch({success: this.render});
    },
    // provide data to the template
    serialize: function() {
      return this.model.toJSON();
    }
  });
  
  // Forecasts Table
  Forecast.Views.ForecastsView = Backbone.View.extend({
    template: "forecast",
    events: {
      "click .delete": "destroy"
    },
    initialize: function(){
      this.collection.on("add", this.addForecast, this);
      this.collection.on("remove", this.remove, this);
    },
    addForecast: function(model){
      var view = new Forecast.Views.ForecastItem({id: model.get("zip"), model: model});
      this.insertView('tbody', view);
      this.$('table').fadeIn('slow');
      return this;
    },
    remove: function(model){
      $( "#" + model.get("zip") ).remove();
      if ( !this.collection.length ){
        this.$el.fadeOut('slow');
      }
    },
    destroy: function(e){
      var id = $(e.currentTarget).closest("tr").attr("id"),
          model = this.collection.get(id);
      
      this.collection.remove(model);
    }
  });
  
  // Search Form
  Forecast.Views.Search = Backbone.View.extend({
    template: "search", // load the search.html template
    events: {
      "click #search": "addZip"
    },
    initialize: function(){
      this.collection.on("add", this.clear, this);
    },
    addZip: function(e){
      e.preventDefault();
      
      var zip = this.$("#zip").val();
      this.model = new Forecast.Model();
      this.model.on("error", this.toggleError, this);
      
      if( this.model.set({zip: zip}) ){
        this.collection.add( this.model );
        this.toggleError();
      }
    },
    clear: function(){
      this.$("#zip").val("");
    },
    toggleError: function(model, error){
      this.$(".alert").text(error).toggle(!!error); // !!error is true if an error was sent
    }
  });

  // Return the module for AMD compliance.
  return Forecast;

});
