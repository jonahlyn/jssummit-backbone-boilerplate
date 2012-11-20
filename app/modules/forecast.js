// Forecast module
define([
  // Application.
  "app",
  "bootstrap"
],

// Map dependencies from above array.
function(app) {

  // Create a new module.
  var Forecast = app.module();

  // Default Model.
  Forecast.Model = Backbone.Model.extend({
    url: function() {
        return "http://api.wunderground.com/api/c69638924f9aba13/conditions/q/" + this.get("zip") + ".json";
    },
    parse : function( data, xhr ) {
        var observation = data.current_observation;
        return {
            id: observation.display_location.zip,
            url: observation.icon_url,
            state: observation.display_location.state_name,
            zip: observation.display_location.zip,
            city: observation.display_location.city,
            temperature: observation.temp_f,
            wind: observation.wind_mph,
            feelslike: observation.feelslike_f,
            image: observation.image.url
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
      this.model.fetch({success: this.render, error: this.fail});
    },
    // provide data to the template
    serialize: function() {
      return this.model.toJSON();
    },
    afterRender: function(){
        $('tr.placeholder').remove();
    },
    fail: function(){
        console.log('failed');
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
      this.collection.on("remove", this.removeForecast, this);
    },
    addForecast: function(model){
      this.$('tbody').append('<tr class="placeholder"><td colspan="7">loading...</td></tr>');
      var view = new Forecast.Views.ForecastItem({id: model.get("zip"), model: model});
      this.insertView('tbody', view);
      this.$('table').fadeIn('slow');
      return this;
    },
    removeForecast: function(model){
      $( "#" + model.get("zip") ).remove();
      if ( !this.collection.length ){
        this.$('table').fadeOut('slow');
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

  // Forecast Detail
  Forecast.Views.ForecastDetail = Backbone.LayoutView.extend({
    tagName: "div",
    template: "forecast-detail",
    events: {
      "click button.close": "close"
    },
    initialize: function(){
      //console.log('detailvew', this);
    },
    // provide data to the template
    serialize: function() {
      return this.model.toJSON();
    },
    afterRender: function(){
      this.$('.modal').modal().show();
      this.$el.appendTo( ".detail-window" );
      return this;
    }, 
    close: function(){
      this.$('.modal').modal("hide");
      this.$el.remove();
      Backbone.history.navigate("/", true);
    }
  });
  
  
  // Return the module for AMD compliance.
  return Forecast;

});
