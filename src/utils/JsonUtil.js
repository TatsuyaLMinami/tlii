/**
 * 提供从json对象中获取匹配项目的工具类。
 * 
 * @example
 * <code language="JavaScript">
 * define(["JSONUtil"], function(jsonUtil) {
 * 		//从item中获取name为123的项
 * 		jsonUtil.getItem(items, "name", "123")
 * })
 * </code>
 */
function JsonUtil() {
	
   if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify')}return str('',{'':value})}}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse')}}}());
   /* JSONPath 0.8.0 - XPath for JSON
	 *
	 * Copyright (c) 2007 Stefan Goessner (goessner.net)
	 * Licensed under the MIT (MIT-LICENSE.txt) licence.
	 */
    var me = {};
    /**
     * @ignore
     */
	me.jsonPath = function(obj, expr, arg) {
	   var P = {
	      resultType: arg && arg.resultType || "VALUE",
	      result: [],
	      normalize: function(expr) {
	         var subx = [];
	         return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
	                    .replace(/'?\.'?|\['?/g, ";")
	                    .replace(/;;;|;;/g, ";..;")
	                    .replace(/;$|'?\]|'$/g, "")
	                    .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
	      },
	      asPath: function(path) {
	         var x = path.split(";"), p = "$";
	         for (var i=1,n=x.length; i<n; i++)
	            p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
	         return p;
	      },
	      store: function(p, v) {
	         if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
	         return !!p;
	      },
	      trace: function(expr, val, path) {
	         if (expr) {
	            var x = expr.split(";"), loc = x.shift();
	            x = x.join(";");
	            if (val && val.hasOwnProperty(loc))
	               P.trace(x, val[loc], path + ";" + loc);
	            else if (loc === "*")
	               P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
	            else if (loc === "..") {
	               P.trace(x, val, path);
	               P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
	            }
	            else if (/,/.test(loc)) { 
	               for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
	                  P.trace(s[i]+";"+x, val, path);
	            }
	            else if (/^\(.*?\)$/.test(loc))
	               P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
	            else if (/^\?\(.*?\)$/.test(loc)) 
	               P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
	            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) 
	               P.slice(loc, x, val, path);
	         }
	         else
	            P.store(path, val);
	      },
	      walk: function(loc, expr, val, path, f) {
	         if (val instanceof Array) {
	            for (var i=0,n=val.length; i<n; i++)
	               if (i in val)
	                  f(i,loc,expr,val,path);
	         }
	         else if (typeof val === "object") {
	            for (var m in val)
	               if (val.hasOwnProperty(m))
	                  f(m,loc,expr,val,path);
	         }
	      },
	      slice: function(loc, expr, val, path) {
	         if (val instanceof Array) {
	            var len=val.length, start=0, end=len, step=1;
	            loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
	            start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
	            end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
	            for (var i=start; i<end; i+=step)
	               P.trace(i+";"+expr, val, path);
	         }
	      },
	      eval: function(x, d, _vname) 
	      {
	         try 
	         { 
	             if (arg && arg.name && typeof(arg.value) != "undefined")
	             {
	                 return $ && d && (d[arg.name] == arg.value); 
	             }
	             else
	             {
	                 return false;
	             }
	         }
	         catch(e) 
	         { 
	             throw new SyntaxError("Please use mx.utils.JsonUtil。"); 
	         }
	     }
	   };
	
	   var $ = obj;
	   if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
	      P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
	      return P.result.length ? P.result : false;
	   }
	} 

    /**
     * 查询获取数组中相应的对象，返回对应的一个数组。
     * @param p_items 一个 Json 数组，表示在该对象中查询。
     * @param p_fieldName 一个字符串，表示要查询的字段 key。
     * @param p_value 表示要查询的值。
     * @param [p_mode=1] 一个 Number 值，表示查询 Json 数组的第几层（1 代表仅查询第一层；2 代表仅查询第二层；大于 3 代表递归查询）。
     */
    me.getItems = function(p_items, p_fieldName, p_value, p_mode)
    {
        var results = null;
        var args = {name:p_fieldName, value:p_value};
        
        if (!(!isNaN( parseFloat(p_value) ) && isFinite( p_value )))
        {
        	p_value = "'" + p_value + "'";
        }
        	
        if(typeof(p_mode) == "undefined" || p_mode == 1)
        {
            results =  me.jsonPath(p_items, '$[?(@.' + p_fieldName + '=='+ p_value + ')]', args);
        }
        else if (p_mode == 2)
        {
            results =  me.jsonPath(p_items, '$.*[?(@.' + p_fieldName + '=='+ p_value + ')]', args);
        }
        else
        {
            results =  me.jsonPath(p_items, '$..[?(@.' + p_fieldName + '=='+ p_value + ')]', args);
        }
        return results;
    };
    
    /**
     * 查询获取数组中相应的对象，返回对应的第一个对象。
     * @param p_items 一个 Json 数组，表示在该对象中查询。
     * @param p_fieldName 一个字符串，表示要查询的字段 key。
     * @param p_value 表示要查询的值。
     * @param [p_mode=1] 一个 Number 值，表示查询 Json 数组的第几层（1 代表仅查询第一层；2 代表仅查询第二层；大于 3 代表递归查询）。
     */
    me.getItem = function(p_items, p_fieldName, p_value, p_mode)
    {
        var results = me.getItems(p_items, p_fieldName, p_value, p_mode);
        if (results && results.length > 0)
        {
            return results[0];
        }
        else
        {
            return null;
        }
    };
    
    return me;
}

export default new JsonUtil();
