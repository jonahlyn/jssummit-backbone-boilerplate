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

  // Default View.
  //Forecast.Views.Layout = Backbone.Layout.extend({
    //template: "forecast"
  //});
  
  // A single forecast item
  Forecast.Views.ForecastItem = Backbone.View.extend({
    tagName: "tr",
    template: _.template($("#forcast-template").html()),
    initialize: function(){
      _.bindAll(this, "render");
      //this.model.on('change', this.render, this);
      this.model.fetch({success: this.render});
      
    },
    render: function(){
      var content = this.template(this.model.toJSON());
      this.$el.html(content);
      //return this;
    }
  });
  
  // Forecasts Table
  Forecast.Views.ForecastsView = Backbone.View.extend({
    template: "forecast",
    initialize: function(){
      this.collection.on("add", this.addForecast, this);
    },
    addForecast: function(model){
      var view = new Forecast.Views.ForecastItem({id: model.get("zip"), model: model});
      this.$("tbody").append(view.$el).closest("table").fadeIn("slow");
      return this;
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
