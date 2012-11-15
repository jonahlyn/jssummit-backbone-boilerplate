this["JST"] = this["JST"] || {};

this["JST"]["app/templates/simple.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='this is simple. not!';
}
return __p;
};

this["JST"]["app/templates/test.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<span>something</span>';
}
return __p;
};