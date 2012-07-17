var JSON;JSON||(JSON={});
(function(){function a(a){return 10>a?"0"+a:a}function b(a){d.lastIndex=0;return d.test(a)?'"'+a.replace(d,function(a){var b=o[a];return"string"===typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function c(a,e){var d,l,j,m,n=g,h,f=e[a];f&&"object"===typeof f&&"function"===typeof f.toJSON&&(f=f.toJSON(a));"function"===typeof k&&(f=k.call(e,a,f));switch(typeof f){case "string":return b(f);case "number":return isFinite(f)?""+f:"null";case "boolean":case "null":return""+f;
case "object":if(!f)return"null";g+=i;h=[];if("[object Array]"===Object.prototype.toString.apply(f)){m=f.length;for(d=0;d<m;d+=1)h[d]=c(d,f)||"null";j=0===h.length?"[]":g?"[\n"+g+h.join(",\n"+g)+"\n"+n+"]":"["+h.join(",")+"]";g=n;return j}if(k&&"object"===typeof k){m=k.length;for(d=0;d<m;d+=1)"string"===typeof k[d]&&(l=k[d],(j=c(l,f))&&h.push(b(l)+(g?": ":":")+j))}else for(l in f)Object.prototype.hasOwnProperty.call(f,l)&&(j=c(l,f))&&h.push(b(l)+(g?": ":":")+j);j=0===h.length?"{}":g?"{\n"+g+h.join(",\n"+
g)+"\n"+n+"}":"{"+h.join(",")+"}";g=n;return j}}"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+a(this.getUTCMonth()+1)+"-"+a(this.getUTCDate())+"T"+a(this.getUTCHours())+":"+a(this.getUTCMinutes())+":"+a(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var e=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
d=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,g,i,o={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},k;"function"!==typeof JSON.stringify&&(JSON.stringify=function(a,b,d){var e;i=g="";if(typeof d==="number")for(e=0;e<d;e=e+1)i=i+" ";else typeof d==="string"&&(i=d);if((k=b)&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number"))throw Error("JSON.stringify");return c("",
{"":a})});"function"!==typeof JSON.parse&&(JSON.parse=function(a,b){function c(a,d){var e,g,f=a[d];if(f&&typeof f==="object")for(e in f)if(Object.prototype.hasOwnProperty.call(f,e)){g=c(f,e);g!==void 0?f[e]=g:delete f[e]}return b.call(a,d,f)}var d,a=""+a;e.lastIndex=0;e.test(a)&&(a=a.replace(e,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){d=eval("("+a+")");return typeof b==="function"?c({"":d},""):d}throw new SyntaxError("JSON.parse");})})();var drupal=drupal||{};drupal.hasStorage="undefined"!==typeof Storage;drupal.hasStorage&="undefined"!==typeof JSON;drupal.retrieve=function(a){var b=null;if(a&&drupal.hasStorage&&(b=JSON.parse(localStorage.getItem(a)))&&(new Date).getTime()>b.expires)localStorage.removeItem(a),b={};return b};
drupal.store=function(a,b,c){a&&drupal.hasStorage&&(b.expires=1E3*(c||3600)+(new Date).getTime(),localStorage.setItem(a,JSON.stringify(b)))};drupal.clear=function(a){a&&drupal.hasStorage&&localStorage.removeItem(a)};
drupal.api=function(){return{resource:"",isMobile:jQuery.hasOwnProperty("mobile"),endpoint:function(){return drupal.endpoint||""},getURL:function(a){if(a&&a.uri)return a.uri;var b=this.endpoint(),b=b+(this.resource?"/"+this.resource:"");return b+=a&&a.id?"/"+a.id:""},loading:function(a){this.isMobile&&(a?jQuery("body").addClass("ui-loading"):jQuery("body").removeClass("ui-loading"))},call:function(a,b,c,e,d){a={url:a,dataType:b,type:c,success:function(a){return function(b,c){a.loading(!1);"success"==
c?d&&d(b):console.log("Error: "+c)}}(this),error:function(a){return function(b){a.loading(!1);console.log(b.responseText);d&&d(null)}}(this)};e&&(a.data=e);this.loading(!0);jQuery.ajax(a)},get:function(a,b,c,e){var d=typeof b;"object"===d?(e=c,c=b,b=""):"function"===d&&(e=b,b="");a=this.getURL(a);a=a+(b?"/"+b:"")+".jsonp"+(c?"?"+decodeURIComponent(jQuery.param(c,!0)):"");this.call(a,"jsonp","GET",null,e)},execute:function(a,b,c){this.call(this.getURL(b)+"/"+a,"json","POST",b,c)},save:function(a,b){var c=
a.id?"PUT":"POST";this.call(this.getURL(a),"json",c,a,b)},remove:function(a,b){this.call(this.getURL(a),"json","DELETE",null,b)}}};drupal=drupal||{};drupal.entity=function(a,b,c){this.options=jQuery.extend({store:!0,expires:3600},"undefined"===typeof c?{}:c);a&&this.set(a);b&&this.load(b)};
drupal.entity.index=function(a,b,c,e){e=jQuery.extend({store:!1},e||{});"function"===typeof b&&(c=b,b={});var d=new a({});d.api.get({},d.getQuery(b),function(b){for(var d=b.length;d--;){b[d]=new a(b[d],null,e);b[d].store()}c&&c(b)})};drupal.entity.prototype.setValues=function(a,b){for(var c in a)this[c]=b[c]||this[c]||a[c]};drupal.entity.prototype.update=function(a,b){a&&this.set(a);this.store();b&&b.call(this,this)};drupal.entity.prototype.getStoreKey=function(){return this.entityName+"-"+this.id};
drupal.entity.prototype.store=function(){this.id&&this.options.store&&drupal.store(this.getStoreKey(),this.get(),this.options.expires)};drupal.entity.prototype.retrieve=function(){var a=null;this.id&&this.options.store&&(a=drupal.retrieve(this.getStoreKey()))&&this.set(a);return a};drupal.entity.prototype.set=function(a){this.api=this.api||null;this.setValues({id:"",uri:""},a);this.entityName="entity"};drupal.entity.prototype.get=function(){return{id:this.id,uri:this.uri}};
drupal.entity.prototype.getPOST=function(){var a=this.get();a.id||delete a.id;return a};drupal.entity.prototype.getQuery=function(a){return a||{}};drupal.entity.prototype.load=function(a){this.id||a(null);var b=null;(b=this.retrieve())?this.update(b,a):this.api&&this.api.get(this.get(),{},function(b){return function(e){e||a(null);b.update(e,a)}}(this))};drupal.entity.prototype.save=function(a){this.api&&this.api.save(this.getPOST(),function(b){return function(c){b.update(c,a)}}(this))};
drupal.entity.prototype.remove=function(a){this.id&&(this.api.remove(this.get(),a),drupal.clear(this.getStoreKey()))};drupal=drupal||{};
drupal.cookie=function(a,b,c){if(1<arguments.length&&(!/Object/.test(Object.prototype.toString.call(b))||null===b||void 0===b)){c=$.extend({},c);if(null===b||void 0===b)c.expires=-1;if("number"===typeof c.expires){var e=c.expires,d=c.expires=new Date;d.setDate(d.getDate()+e)}b=""+b;return document.cookie=[encodeURIComponent(a),"=",c.raw?b:encodeURIComponent(b),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}for(var c=
b||{},e=c.raw?function(a){return a}:decodeURIComponent,d=document.cookie.split("; "),g=0,i;i=d[g]&&d[g].split("=");g++)if(e(i[0])===a)return e(i[1]||"");return null};drupal.system=function(a,b){drupal.entity.call(this,{},a,b)};drupal.system.prototype=new drupal.entity;drupal.system.prototype.constructor=drupal.system;drupal.system.api=jQuery.extend(new drupal.api,{resource:"system"});
drupal.system.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.entityName="system";this.api=drupal.system.api;this.user=new drupal.user(a.user);this.user.setSession(a.session_name,a.sessid)};drupal.system.prototype.get=function(){return jQuery.extend(drupal.entity.prototype.get.call(this),{user:this.user.get()})};drupal.system.prototype.load=function(a){this.api.execute("connect",null,function(b){return function(c){b.update(c,a)}}(this))};
drupal.system.prototype.get_variable=function(a,b,c){this.api.execute("get_variable",{name:a,"default":b},c)};drupal.system.prototype.set_variable=function(a,b,c){this.api.execute("set_variable",{name:a,value:b},c)};drupal.system.prototype.del_variable=function(a,b){this.api.execute("del_variable",{name:a},b)};drupal=drupal||{};drupal.node=function(a,b,c){drupal.entity.call(this,a,b,c)};drupal.node.prototype=new drupal.entity;drupal.node.prototype.constructor=drupal.node;
drupal.node.api=jQuery.extend(new drupal.api,{resource:"node"});drupal.node.index=function(a,b,c){drupal.entity.index(drupal.node,a,b,c)};drupal.node.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.entityName="node";this.api=drupal.node.api;this.id=a.nid||this.id||0;this.nid=a.nid||this.nid||0;this.setValues({title:"",type:"",status:0,uid:0},a)};
drupal.node.prototype.get=function(){return jQuery.extend(drupal.entity.prototype.get.call(this),{nid:this.nid,title:this.title,type:this.type,status:this.status,uid:this.uid})};drupal.node.prototype.getQuery=function(a){a=drupal.entity.prototype.getQuery.call(this,a);a.type&&(a["parameters[type]"]=a.type,delete a.type);return a};drupal=drupal||{};drupal.current_user=null;drupal.user=function(a,b,c){drupal.entity.call(this,a,b,c)};drupal.user.prototype=new drupal.entity;
drupal.user.prototype.constructor=drupal.user;drupal.user.api=jQuery.extend(new drupal.api,{resource:"user"});drupal.user.index=function(a,b,c){drupal.entity.index(drupal.user,a,b,c)};drupal.user.prototype.set=function(a){drupal.entity.prototype.set.call(this,a);this.entityName="user";this.api=drupal.user.api;this.id=a.uid||this.id||0;this.setValues({name:"",mail:"",pass:"",status:1},a)};
drupal.user.prototype.setSession=function(a,b){this.sessid=b;this.id&&a&&(this.session_name=a,drupal.cookie(a,b),drupal.current_user=this)};drupal.user.prototype.login=function(a){this.api&&this.api.execute("login",{username:this.name,password:this.pass},function(b){return function(c){b.update(c.user);b.setSession(c.session_name,c.sessid);a&&a.call(b,b)}}(this))};
drupal.user.prototype.register=function(a){this.api&&this.api.execute("register",this.getPOST(),function(b){return function(c){b.update(c,a)}}(this))};drupal.user.prototype.logout=function(a){this.api&&this.api.execute("logout",null,a)};drupal.user.prototype.getPOST=function(){var a=drupal.entity.prototype.getPOST.call(this);a.pass=this.pass;return a};drupal.user.prototype.get=function(){return jQuery.extend(drupal.entity.prototype.get.call(this),{name:this.name,mail:this.mail,status:this.status})};
