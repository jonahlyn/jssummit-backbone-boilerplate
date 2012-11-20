this["JST"] = this["JST"] || {};

this["JST"]["app/templates/forecast-detail.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="modal hide fade">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n    <h3>'+
( city )+
', '+
( state )+
'</h3>\n  </div>\n  <div class="modal-body">           \n    <div class="form-horizontal">\n      <div class="control-group">\n        <label class="control-label">Temperature</label>\n        <div class="controls">'+
( temperature )+
'&deg;F</div>\n      </div>\n      <div class="control-group">\n        <label class="control-label">Feels Like</label>\n        <div class="controls">'+
( feelslike )+
'&deg;F</div>\n      </div>\n      <div class="control-group">\n         <label class="control-label">Wind</label>\n         <div class="controls">'+
( wind )+
' MPH</div>\n      </div>\n    </div>          \n  </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/forecast-item.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<td><a class="route" href="/detail/'+
( zip )+
'"><i class="detail icon-search"></i></a></td>\n<td><img src="'+
( url )+
'" /></td>\n<td>'+
( city )+
'</td>\n<td>'+
( state )+
'</td>\n<td>'+
( zip )+
'</td>\n<td>'+
( temperature )+
'&deg;F</td>\n<td><a href="#"><i class="delete icon-trash"></i></a></td>';
}
return __p;
};

this["JST"]["app/templates/forecast.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<table id="output" class="table table-striped">\n    <caption>Forecast Results</caption>\n    <thead>\n        <tr>\n            <th></th>\n            <th></th>\n            <th>City</th>\n            <th>State</th>\n            <th>Zip</th>\n            <th>Temperature</th>\n            <th></th>\n        </tr>\n    </thead>\n    <tbody></tbody>\n</table>';
}
return __p;
};

this["JST"]["app/templates/page.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div>\nWeather information provided by the Weather Underground.\n</div>';
}
return __p;
};

this["JST"]["app/templates/search.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<form id="weather" class="form-search">\n    <input type="text" id="zip" placeholder="Enter a zip code..." class="input-medium search-query">\n    <button id="search" type="submit" class="btn">Search</button>\n    <div class="alert alert-error"></div>\n</form>';
}
return __p;
};