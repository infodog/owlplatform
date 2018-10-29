var SessionApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.price,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.lucene.search.product,
    Packages.java.util
);
/**
 * @namespace
 * @type {Object}
 */
var SessionService = {
    /**
     * 添加和设置session值，如果sessionName不存在则添加，否则就修改原有的值
     * @param sessionName
     * @param value
     * @param request
     * @param response
     */
    addSessionValue: function (sessionName, value, request, response) {
        SessionApi.IsoneBaseEngine.sessionService.addSessionValue(sessionName, value, request, response);
    },
    /**
     * 获取sessionName对应的sessionValue值
     * @param sessionName
     * @param request
     * @return {*}
     */
    getSessionValue: function (sessionName, request) {
        var v = SessionApi.IsoneBaseEngine.sessionService.getSessionValue(sessionName, request);
        if (!v) return null;
        return "" + v;
    },
    /**
     * 删除sessionName对应的sessionValue
     * @param sessionName
     */
    removeSessionValue: function (sessionName) {
        SessionApi.IsoneBaseEngine.sessionService.removeSessionValue(sessionName, request);
    },

    /**
     * 修改sessionName对应的sessionValue
     * @param sessionName
     * @param name
     * @param value
     */
    setSessionValue: function (sessionId, name, value) {
        SessionApi.IsoneBaseEngine.sessionService.setSessionValue(sessionId, name, value);
    },

    /**
     * 获取sessionId
     * @param request
     */
    getSessionId: function (request) {
        var sessionId = SessionApi.IsoneBaseEngine.sessionService.getSessionId(request);
        return "" + sessionId;
    }

};
/* Laura Doktorova https://github.com/olado/doT */(function(){function o(){var a={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},b=/&(?!#?\w+;)|<|>|"|'|\//g;return function(){return this?this.replace(b,function(c){return a[c]||c}):this}}function p(a,b,c){return(typeof b==="string"?b:b.toString()).replace(a.define||i,function(l,e,f,g){if(e.indexOf("def.")===0)e=e.substring(4);if(!(e in c))if(f===":"){a.defineParams&&g.replace(a.defineParams,function(n,h,d){c[e]={arg:h,text:d}});e in c||(c[e]=g)}else(new Function("def","def['"+
e+"']="+g))(c);return""}).replace(a.use||i,function(l,e){if(a.useParams)e=e.replace(a.useParams,function(g,n,h,d){if(c[h]&&c[h].arg&&d){g=(h+":"+d).replace(/'|\\/g,"_");c.__exp=c.__exp||{};c.__exp[g]=c[h].text.replace(RegExp("(^|[^\\w$])"+c[h].arg+"([^\\w$])","g"),"$1"+d+"$2");return n+"def.__exp['"+g+"']"}});var f=(new Function("def","return "+e))(c);return f?p(a,f,c):f})}function m(a){return a.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var j={version:"1.0.0",templateSettings:{evaluate:/\{\{([\s\S]+?\}?)\}\}/g,
interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:true,append:true,selfcontained:false},template:undefined,
compile:undefined};if(typeof module!=="undefined"&&module.exports)module.exports=j;else if(typeof define==="function"&&define.amd)define(function(){return j});else(function(){return this||(0,eval)("this")})().doT=j;String.prototype.encodeHTML=o();var q={append:{start:"'+(",end:")+'",endencode:"||'').toString().encodeHTML()+'"},split:{start:"';out+=(",end:");out+='",endencode:"||'').toString().encodeHTML();out+='"}},i=/$^/;j.template=function(a,b,c){b=b||j.templateSettings;var l=b.append?q.append:
q.split,e,f=0,g;a=b.use||b.define?p(b,a,c||{}):a;a=("var out='"+(b.strip?a.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):a).replace(/'|\\/g,"\\$&").replace(b.interpolate||i,function(h,d){return l.start+m(d)+l.end}).replace(b.encode||i,function(h,d){e=true;return l.start+m(d)+l.endencode}).replace(b.conditional||i,function(h,d,k){return d?k?"';}else if("+m(k)+"){out+='":"';}else{out+='":k?"';if("+m(k)+"){out+='":"';}out+='"}).replace(b.iterate||i,function(h,
d,k,r){if(!d)return"';} } out+='";f+=1;g=r||"i"+f;d=m(d);return"';var arr"+f+"="+d+";if(arr"+f+"){var "+k+","+g+"=-1,l"+f+"=arr"+f+".length-1;while("+g+"<l"+f+"){"+k+"=arr"+f+"["+g+"+=1];out+='"}).replace(b.evaluate||i,function(h,d){return"';"+m(d)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,"").replace(/(\s|;|\}|^|\{)out\+=''\+/g,"$1out+=");if(e&&b.selfcontained)a="String.prototype.encodeHTML=("+
o.toString()+"());"+a;try{return new Function(b.varname,a)}catch(n){typeof console!=="undefined"&&console.log("Could not create a template function: "+a);throw n;}};j.compile=function(a,b){return j.template(a,null,b)}})();
var pigeonApi = new JavaImporter(
  Packages.net.xinshi.pigeonAdapter
);


/**
 * 最底层的处理数据的方法
 * @constructor
 */
function Pigeon(listPrefixes, objPrefixes){
  this.pigeonEngine = ps20;

  this.setPigeon = function (pigeonName){
    if (pigeonName) {
      var pigeonEngine = pigeonApi.PigeonEngines.pigeons.get( pigeonName );
      if (pigeonEngine) {
        var myPS20 = ps20Factory.newInstance();
        myPS20.setPigeon( pigeonEngine );
        this.pigeonEngine = myPS20;
      }
    }
    return this;
  }

  this.setTlsMode = function (open) {
    this.pigeonEngine.setTlsMode( open );
  }
  /**
   * 内部方法
   * @param objName
   * @returns {boolean}
   */
  this.isGoodObject = function (objName){
    for ( var i = 0; i < objPrefixes.length; i++ ) {
      var p = objPrefixes[ i ];
      if (p.length > objName) {
        continue;
      }
      if (objName.slice( 0, p.length ) == p) {
        return true;
      }
    }
    return false;
  };

  /**
   * 内部方法
   * @param listName
   * @returns {boolean}
   */
  this.isGoodList = function (listName){
    for ( var i = 0; i < listPrefixes.length; i++ ) {
      var p = listPrefixes[ i ];
      if (p.length > listName) {
        continue;
      }
      if (listName.slice( 0, p.length ) == p) {
        return true;
      }
    }
    return false;
  };

  /**
   * 获得一个对象javascript
   * @param name
   * @returns {*}
   */
  this.getObject = function (name){
    var content = this.pigeonEngine.getContent( name );
    if (!content || content == "") {
      return null;
    }
    return JSON.parse( content );
  };

  /**
   * 获得一个字符串
   * @param name
   * @returns {*}
   */
  this.getContent = function (name){
    return this.pigeonEngine.getContent( name );
  };

  /**
   * 批量获取对象，作为字符串返回
   * @param listName
   * @param from --- 从0开始的下标
   * @param num
   * @returns 返回一个Array,元素的类型为string
   */
  this.getListContents = function (listName, from, num){
    return this.pigeonEngine.getContents( listName, from, num );
  };

  /**
   * 批量获取对象，作为json对象返回
   * @param listName
   * @param from --- 从0开始的下标
   * @param num
   * @returns 返回一个Array,元素的类型为json对象
   */

  this.getListObjects = function (listName, from, num){
    var contents = this.getListContents( listName, from, num );
    var result = [];
    for ( var i = 0; i < contents.size(); i++ ) {
      var content = contents.get( i );
      if (content) {
        result.push( JSON.parse( content ) );
      }
    }
    return result;
  };

  this.where = function (listName, filter, from, num){
    var curPos = 0;
    var step = 100;
    var result = [];
    var validNum = 0;
    while ( true ) {
      var objs = this.getListObjects( listName, curPos, step );

      for ( var i = 0; i < objs.length; i++ ) {
        var obj = objs[ i ];
        if (filter( obj )) {
          validNum++;
          if (validNum > from && validNum <= from + num) {
            result.push( obj );
          }
        }
      }
      if (objs.length < step) {
        break;
      }
      curPos += step;
    }
    return result;
  };


  /**
   * 保存一个对象
   * @param name
   * @param obj --- json对象
   */
  this.saveObject = function (name, obj){
    if (!this.isGoodObject( name )) {
      throw "not good object." + name;
    }
    if (!obj) {
      this.pigeonEngine.saveContent( name, null );
    }
    this.pigeonEngine.saveContent( name, JSON.stringify( obj ) );
  };

  /**
   * 保存一个字符串
   * @param name
   * @param content --- 保存的内容
   */

  this.saveContent = function (name, content){
    if (!this.isGoodObject( name )) {
      throw "not good object." + name;
    }
    this.pigeonEngine.saveContent( name, content );
  };

  /**
   * 批量返回字符串列表
   * @param ids
   * @returns {Array}
   */
  this.getContents = function (ids){
    var contents = this.pigeonEngine.getContents( ids );
    var result = [];
    for ( var i = 0; i < contents.size(); i++ ) {
      var content = contents.get( i );
      if (!content) {
        continue;
      }
      result.push( content + "" );
    }
    return result;
  };


  /**
   * 批量返回对象
   * @param ids
   * @returns {Array}
   */
  this.getObjects = function (ids) {
    var contents = this.getContents(ids);
    var result = [];
    for (var i = 0; i < contents.size(); i++) {
      var content = contents.get(i);
      if (!content) {
        continue;
      }
      result.push(JSON.parse(content));
    }
    return result;
  };


  /**
  /*
   * 加到列表中
   * @param listname
   * @param key   --- 排序用的key
   * @param objId  --- 对象Id
   */

  this.addToList = function (listname, key, objId){
    if (!this.isGoodList( listname )) {
      throw "not good listname:" + listname;
    }
    this.pigeonEngine.addToList( listname, key, objId );
  };

  /**
   * 清空列表
   * @param listname
   */
  this.clearList = function (listname){
    if (!this.isGoodList( listname )) {
      throw "not good listname:" + listname;
    }
    this.pigeonEngine.clearList( listname );
  };

  /**
   * 从列表中删除
   * @param listname
   * @param key
   * @param objId
   */
  this.deleteFromList = function (listname, key, objId){
    if (!this.isGoodList( listname )) {
      throw "not good listname:" + listname;
    }
    this.pigeonEngine.deleteFromList( listname, key, objId );
  };

  /**
   * 获取一个atom的值
   * @param name
   * @return {long}
   */
  this.getAtom = function (name){
    return this.pigeonEngine.getAtom( name );
  };

  /**
   * 设置一个atom的值
   * @param name
   * @param value
   */
  this.setAtom = function (name, value){
    if (!this.isGoodObject( name )) {
      throw "not good listname:" + name;
    }
    this.pigeonEngine.setAtom( name, value );
  };


  /**
   * 返回一个数据，数据的元素是{objid:'xxx',key:'xxx'}
   * @param name
   * @param from
   * @param num
   */
  this.getList = function (name, from, num){
    var listSortObjects = this.pigeonEngine.getList( name, from, num );
    var ret = [];
    for ( var i = 0; i < listSortObjects.size(); i++ ) {
      var sobj = listSortObjects.get( i );
      ret.push( {
        objid: "" + sobj.getObjid(),
        key: "" + sobj.getKey()
      } )
    }
    return ret;
  };

  /**
   * 获取一个list的大小
   * @param name
   * return {long}
   */
  this.getListSize = function (name){
    return this.pigeonEngine.getListSize( name );
  };

  /**
   * 生成一个id
   * @param id
   * @returns {*|String}
   */
  this.getId = function (id){
    return this.pigeonEngine.getId( id );
  };

  /**
   * 锁住一个Id
   * @param id
   */

  this.lock = function (id){
    this.pigeonEngine.lock( id );
  };


  /**
   * 解锁一个Id
   * @param id
   */
  this.unlock = function (id){
    this.pigeonEngine.unlock( id );
  };

  /**
   * 获得一个可比较的字符串
   * @param value
   * @param len
   * @returns {string}
   */
  this.getComparableString = function (value, len){
    var key = "" + value;
    var l = len - key.length;
    for ( var i = 0; i < l; i++ ) {
      key = "0" + key;
    }
    return key;
  };

  /**
   * 获得一个反序的可比较字符串
   * @param value
   * @param len
   * @returns {string}
   */

  this.getRevertComparableString = function (value, len){
    var powers = [ 1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1000000000000, 10000000000000 ];
    var value = powers[ len ] - Number( value );
    return this.getComparableString( value, len );
  };

  this.getRKey = function (value, len){
    return this.getRevertComparableString(value,len);
  }

  this.getKey = function(value,len){
    return this.getComparableString(value,len);
  }
};


/**
 * 辅助工具方法，这个类有一个别名$,引用这个类后就可以用$.params["name"]这样的形式获得页面的提交的参数。
 * @namespace
 */
var InfoscapeUtil = {};
InfoscapeUtil.api = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.appmarket,
    Packages.net.xinshi.isone.commons,
    Packages.org.json,
    Packages.java.lang,
    Packages.java.util,
    Packages.net.xinshi.isone.modules.appmarket.service.impl,
    Packages.org.apache.commons.httpclient.HttpClient,
    Packages.net.xinshi.isone.commons.UTF8PostMethod,
    Packages.java.util.ArrayList,
    Packages.net.xinshi.isone.commons.DateUtil
);

// 已经无效不公开，所以不写文档
InfoscapeUtil.getPageConfig = function (appId, pageId) {
    var key = appId + "_" + pageId + "_data";
    var content = ps20.getContent(key);
    if (!content) {
        return {};
    }
    content = "" + content;
    return JSON.parse("" + content);
};

/**
 * 将d里面的属性复制到o里面，如果o已经有了同名的属性则跳过该属性
 * @param o
 * @param d
 * @return {*}
 */
InfoscapeUtil.override = function (o, d) {
    for (var k in d) {
        if (!o[k]) {
            o[k] = d[k];
        }
    }
    return o;
};
InfoscapeUtil.copy = function (o, d) {
    for (var k in d) {
        o[k] = d[k];
    }
    return o;
};

/**
 * 通过appUrl获得在fileSystem里面的真实的Url
 * @param appMd5
 * @param appUrl
 * @param spec  例如：100X100 就能获得 100X100的小图，只对于图片有效，对于css，js等其他类型的资源无效
 * @return {*}
 */
InfoscapeUtil.getResUrl = function (appMd5, appUrl, spec) {
    var fileId = InfoscapeUtil.api.Is1AppMarketEngine.appPages.getResFileId(appMd5, appUrl)
    if (!spec) {
        spec = "";
    }
    if (fileId) {
        return "" + InfoscapeUtil.api.Is1AppMarketEngine.appPages.getUrlFromFileId(fileId, spec);
    }
    else {
        return null;
    }
};

/**
 * 获得appUrl对应的文件的内容，一般是jsx文件或者jsxp文件
 * @param appMd5
 * @param appUrl
 * @return {*}
 */
InfoscapeUtil.getProgram = function (appMd5, appUrl) {
    var content = InfoscapeUtil.api.Is1AppMarketEngine.appPages.getProgramContent(appMd5, appUrl)
    if (content) {
        return "" + content;
    }
    else {
        return null;
    }
};


InfoscapeUtil.getAppProgram = function (appId, appUrl) {
    var content = InfoscapeUtil.api.Is1AppMarketEngine.appPages.getAppProgramContent(appId, appUrl)
    if (content) {
        return "" + content;
    }
    else {
        return null;
    }
};


InfoscapeUtil.getParams = function () {
    if(typeof $params != 'undefined' ){
        var p = JSON.parse("" + $params);
        $.params = p;
        return p;
    }
    else{
        $.params = {};
    }
};

/**
 * 接收上传文件，同时设置$.uploadParams,里面保存于上传文件同时提交的fields
 * @param exts
 * @param maxsize
 * @return {String}
 * @Deprecated
 */
InfoscapeUtil.upload = function (exts, maxsize) {
    var fileInfo = InfoscapeUtil.api.Is1AppMarketEngine.appMarketClientService.upload(request, exts, maxsize);
    var jParams = new InfoscapeUtil.api.JSONObject(fileInfo.getParameters());
    $.uploadParams = JSON.parse("" + jParams.toString());
    var url = "" + InfoscapeUtil.api.Util.getInternalUrlFromFileId(fileInfo.getFileId(), "");
    return "" + url;
};

InfoscapeUtil.uploadByUrl = function(url,fileName,headers){
    var jHeaders = $.JSONObject(headers);
  return "" + InfoscapeUtil.api.Util.uploadByUrl(url,fileName,jHeaders);
};


/**
 * 接收上传文件，同时设置$.uploadParams,里面保存于上传文件同时提交的fields,返回上传文件的path以及文件名
 * @param exts
 * @param maxsize
 * @return {String}
 * @Deprecated
 */
InfoscapeUtil.uploadEx = function (exts, maxsize) {
    var fileInfo = InfoscapeUtil.api.Is1AppMarketEngine.appMarketClientService.upload(request, exts, maxsize);
    var jParams = new InfoscapeUtil.api.JSONObject(fileInfo.getParameters());
    $.uploadParams = JSON.parse("" + jParams.toString());
    var url = "" + InfoscapeUtil.api.Util.getInternalUrlFromFileId(fileInfo.getFileId(), "");
    var fileName =  "" + fileInfo.getName();
    return {path:url,fileName:fileName,fileId:"" + fileInfo.getFileId()};
};

/**
 * 接收上传多个文件，同时设置$.uploadParams,里面保存于上传文件同时提交的fields,返回上传文件的path以及文件名
 * @param exts
 * @param maxsize
 * @return {String}
 */
InfoscapeUtil.uploadFiles = function (exts, maxsize) {
    var fileInfos = InfoscapeUtil.api.Util.upload(request, maxsize,exts);
    var fileInfo = fileInfos.get(0);
    if(fileInfo.getParameters() != null){
        var jParams = new InfoscapeUtil.api.JSONObject(fileInfo.getParameters());
        $.uploadParams = JSON.parse("" + jParams.toString());
    }
    return $.java2Javascript(fileInfos);
};

/**
 * 上传并打水印
 * @param maxSize
 * @param allowedExtsString
 * @param wmName
 * @param position
 * @param toType
 */
InfoscapeUtil.uploadAndWaterMark = function (maxSize, allowedExtsString, wmName, position) {
    var fileInfos = InfoscapeUtil.api.Util.uploadAndWaterMark(request, maxSize, allowedExtsString, wmName, position);
    var fileInfo = fileInfos.get(0);
    if(fileInfo.getParameters() != null){
        var jParams = new InfoscapeUtil.api.JSONObject(fileInfo.getParameters());
        $.uploadParams = JSON.parse("" + jParams.toString());
    }
    return $.java2Javascript(fileInfos);
};

/**
 * 上传并打水印和转换格式
 * @param maxSize
 * @param allowedExtsString
 * @param wmName
 * @param position
 * @param toType
 */
InfoscapeUtil.uploadAndWaterMarkAndConvertType = function (maxSize, allowedExtsString, wmName, position, toType) {
    var fileInfos = InfoscapeUtil.api.Util.uploadAndWaterMarkAndConvertType(request, maxSize, allowedExtsString, wmName, position, toType);
    var fileInfo = fileInfos.get(0);
    if(fileInfo.getParameters() != null){
        var jParams = new InfoscapeUtil.api.JSONObject(fileInfo.getParameters());
        $.uploadParams = JSON.parse("" + jParams.toString());
    }
    return $.java2Javascript(fileInfos);
};

/**
 * 将javascript对象转换为className对应的java对象
 * @param className
 * @param o
 * @return {*}
 */
InfoscapeUtil.getBean = function (className, o) {
    var s = JSON.stringify(o);
    return  InfoscapeUtil.api.Util.getObjectFromJson(className, s);
};

InfoscapeUtil.include = function(appId,appMd5,pageId,url){
    var html = InfoscapeUtil.api.Is1AppMarketEngine.pageExecutor.doInclude(appMd5, appId, pageId, null,url, request, response);
    return html;
};

InfoscapeUtil.inc = function(url){
    var html = InfoscapeUtil.api.Is1AppMarketEngine.pageExecutor.doInclude(appMd5, appId,null, null,url, request, response);
    return html;
};

InfoscapeUtil.java2Javascript = function(bean){
    if(bean == null){
        return "";
    }
    var beanString = "" + InfoscapeUtil.api.Util.bean2String(bean);
    return JSON.parse(beanString);
};
InfoscapeUtil.getNames = function(jsonObject){
    return InfoscapeUtil.api.JSONObject.getNames(jsonObject);
};

/**
 * 把javascript的json对象转换成java的json对象
 * @param obj
 * @return {InfoscapeUtil.api.JSONObject}
 */
InfoscapeUtil.toJavaJSONObject = function (obj) {
    var s = JSON.stringify(obj);
    return new InfoscapeUtil.api.JSONObject(s);
};

InfoscapeUtil.JSONObject = function (obj){
    var s = JSON.stringify(obj);
    return new InfoscapeUtil.api.JSONObject(s);
};
InfoscapeUtil.JSONArray = function (obj){
    var s = JSON.stringify(obj);
    return new InfoscapeUtil.api.JSONArray(s);
};
InfoscapeUtil.toJSONObjectList = function (array){
    var result = new InfoscapeUtil.api.ArrayList();
    if (array && array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            var jObject = new InfoscapeUtil.JSONObject(array[i]);
            result.add(jObject);
        }
    }
    return result;
};

InfoscapeUtil.getSaasId = function(){
    if(!InfoscapeUtil.api.Util.getSaasId()){
        return null;
    }
    var saasId = "" +  InfoscapeUtil.api.Util.getSaasId();
    return saasId;
};

InfoscapeUtil.setSaasId = function(saasId){
    var saasId = "" +  InfoscapeUtil.api.Util.setSaasId(saasId);
};

InfoscapeUtil.log = function (msg) {
    if(typeof(rappId) != "undefined"){
        var msg = "rappId:" + rappId + ",msg=" + msg;
    }else {
        var msg = "appId:" + appId + ",msg=" + msg;
    }
    InfoscapeUtil.api.Log4jUtil.debug(msg);
};

InfoscapeUtil.getLongDate = function(t){
    return "" + InfoscapeUtil.api.DateUtil.getLongDate(t);
};

InfoscapeUtil.post=function(url,params){
    var  map = new InfoscapeUtil.api.HashMap();
    for(var k in params){
        var v = params[k];
        map.put(""+k , ""+v);
    }
    var res = InfoscapeUtil.api.HttpUtil.post(url,map);
    return res;
};

var $ = InfoscapeUtil;
$.getQueryString=function(request,charset){
    var  s = new InfoscapeUtil.api.URLUtil.getQueryString(request,charset);
    if(!s){
        return "";
    }
    return s + "";
};
$.get = function(url){
    var s = "" + InfoscapeUtil.api.HttpUtil.get(url);
    return s;
};

$.getByHeaders = function(url,headers,charset){
    var jheaders = $.JSONObject(headers);
    var s = "" + InfoscapeUtil.api.HttpUtil.getByHeaders(url,jheaders,charset);
    return s;
};

$.getSecureHashPass = function(){
    return "" + InfoscapeUtil.api.Util.getSecureHashPass();
};

$.run = function(rappId,rappMd5,pageId,name){
    // var script = "//#import " + pageId;
    // includeEngine.run(script,rappId,rappMd5,rappId + "_" + name);
    includeEngine.runUrl(rappId,rappMd5,pageId,rappId+"/"+ name);
};

$.getDefaultMerchantId = function(){
    return ""+InfoscapeUtil.api.Util.getDefaultMerchantId();
};

$.importUrl = function(url){
    return "" + InfoscapeUtil.api.NormalPageExecutor.importUrl(url,request,response);
};

$.processImportUrl = function(html,pattern,replacement){
    return "" + InfoscapeUtil.api.NormalPageExecutor.processImport(html,request,response,pattern,replacement);
};

$.getId = function(idName){
    return ""+InfoscapeUtil.api.Util.getId(idName);
};

$.getUUID = function(){
    return "" +InfoscapeUtil.api.Util.getUUID();
};

$.getClientIp = function(){
    return ""+InfoscapeUtil.api.Util.getClientIP(request);
};

$.getSystemProperty = function(name){
    return ""+InfoscapeUtil.api.Util.getSystemProperty(name);
};

$.getEnv = function(name){
    return ""+InfoscapeUtil.api.Util.getEnv(name);
};

$.getWebSite = function(isHTTPS){
    return ""+InfoscapeUtil.api.Util.getWebSite(request,isHTTPS);
};

$.UTC = function(t){
    var d = new Date(t);
    var fullYear = d.getFullYear();
    var month = d.getMonth()+1;
    if(month<10){
        month = "0" + month;
    }
    var day = d.getDate();
    if(day<10){
        day = "0" + day;
    }

    var hour = d.getHours();
    if(hour<10){
        hour = "0" + hour;
    }

    var minute = d.getMinutes();
    if(minute<10){
        minute = "0" + minute;
    }

    var second = d.getSeconds();
    if(second<10){
        second = "0" + second;
    }
    return fullYear + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second+"Z";

};

$.info = function (msg) {
    if(typeof(rappId) != "undefined"){
        var msg = "rappId:" + rappId + ",msg=" + msg;
    }else {
        var msg = "appId:" + appId + ",msg=" + msg;
    }
    InfoscapeUtil.api.Log4jUtil.info(msg);
};
$.warn = function (msg) {
    if(typeof(rappId) != "undefined"){
        var msg = "rappId:" + rappId + ",msg=" + msg;
    }else {
        var msg = "appId:" + appId + ",msg=" + msg;
    }
    InfoscapeUtil.api.Log4jUtil.warn(msg);
};
$.error = function (msg) {
    if(typeof(rappId) != "undefined"){
        var msg = "rappId:" + rappId + ",msg=" + msg;
    }else {
        var msg = "appId:" + appId + ",msg=" + msg;
    }
    InfoscapeUtil.api.Log4jUtil.error(msg);
};
$.fatal = function (msg) {
    if(typeof(rappId) != "undefined"){
        var msg = "rappId:" + rappId + ",msg=" + msg;
    }else {
        var msg = "appId:" + appId + ",msg=" + msg;
    }
    InfoscapeUtil.api.Log4jUtil.fatal(msg);
};

$.generateSmallPics = function(fileId,spec){
  InfoscapeUtil.api.Util.generateSmallPics(fileId,spec);
};


var doTPageData;
$.runDoT = function(__appId,__appMd5,__pageId,pageData){
    doTPageData=pageData;
    var html = "" +includeEngine.runDoT(__appId,__appMd5,__pageId);
    return html;
}

var artTemplatePageData;
$.runArtTemplate = function(__appId,__appMd5,__pageId,pageData){
  artTemplatePageData=pageData;
  artTemplatePageData["importUrl"] = $.importUrl;
  artTemplatePageData["inc"] = $.importUrl;
  artTemplatePageData["include"] = $.include;


  var html = "" +includeEngine.runArtTemplate(__appId,__appMd5,__pageId);
  return html;
}

$.toString = function (value){
  if (typeof value !== 'string') {
    if (value === undefined || value === null) {
      value = '';
    } else if (typeof value === 'function') {
      value = toString(value.call(value));
    } else {
      value = JSON.stringify(value);
    }
  }
  return value;
}

var ESCAPE_REG = /["&'<>]/;
function xmlEscape(content) {
  const html = '' + content;
  const regexResult = ESCAPE_REG.exec(html);
  if (!regexResult) {
    return content;
  }

  var result = '';
  var i, lastIndex, char;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34:
        char = '&#34;';
        break;
      case 38:
        char = '&#38;';
        break;
      case 39:
        char = '&#39;';
        break;
      case 60:
        char = '&#60;';
        break;
      case 62:
        char = '&#62;';
        break;
      default:
        continue;
    }

    if (lastIndex !== i) {
      result += html.substring(lastIndex, i);
    }

    lastIndex = i + 1;
    result += char;
  }

  if (lastIndex !== i) {
    return result + html.substring(lastIndex, i);
  } else {
    return result;
  }
};

$escape = function(content){
  return xmlEscape($.toString(content));
};

$string = function(s){
  return s;
};

$.getParams();

var LoginApi = new JavaImporter(
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.modules.user.tools,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.businessruleEx,
    Packages.org.json
);


/**
 * 与登录相关的函数
 * @type {{getFrontendUserId: getFrontendUserId, getBackEndLoginUserId: getBackEndLoginUserId, loginBackend: loginBackend, getFrontendUser: getFrontendUser}}
 */

var LoginService = {
    /**
     * 获取当前登录用户Id,如果还没有登录则返回空字符串
     * @returns {string}
     */
    getFrontendUserId: function () {
        var userId = LoginApi.LoginSessionUtils.getFrontendLoginUserId(request);
        if (!userId) {
            return "";
        }
        return "" + userId;
    },


    /**
     * 获得后台登录用户的Id
     * @returns {string}
     */
    getBackEndLoginUserId: function () {
        var userId = LoginApi.LoginSessionUtils.getBackendLoginUserId(request);
        if (!userId) {
            return "";
        }
        return "" + userId;

    },
    /**
     * 登录到后台
     * @param loginKey
     * @param password
     * @param validateCode
     * @returns {*}
     */
    loginBackend: function (loginKey, password, validateCode) {
        var user = LoginApi.IsoneModulesEngine.adminService.getUserByKey(loginKey);
        if (!user) {
            return {state:false,msg:"noUser," + loginKey};
        }
        var userId = user.getString("id");
        var result = LoginApi.LoginUtil.loginByKey(loginKey, password, LoginApi.LoginUtil.TARGET_MEMBER);
        if (result == 100) {
            return {state: true, userId: "" + userId};
        }
        return {state: false,msg:"password error."};
    },

    /**
     * 检查前台会员登录
     * @param loginKey
     * @param password
     * @returns {boolean}
     */
    loginFrontend: function (loginKey, password) {
        var ret = {};
        var user = LoginApi.IsoneModulesEngine.userService.getUserByKey(loginKey);
        if (!user) {
            ret["state"] = false;
            ret["code"] = 104;
            return ret;
        }
        var userId = user.getString("id");
        var result = LoginApi.LoginUtil.loginByKey(loginKey, password, LoginApi.LoginUtil.TARGET_MEMBER);
        if (result == 100) {
            //100 ==  IUserService.LOGIN_SUCCESSFUL
            LoginApi.LoginSessionUtils.loginFrontend(request, response, userId);
            ret["state"] = true;
        } else {
            ret["state"] = false;
        }
        ret["code"] = result;
        ret.userId = userId + "";
        return ret;
    },

    setFrontEndUser: function (request, response, userId) {
        LoginApi.LoginSessionUtils.loginFrontend(request, response, userId);
    },

    /**
     * 检查帐号密码是否正确
     * @param loginKey
     * @param password
     * @returns {boolean}
     */
    loginByKey: function (loginKey, password) {
        var result = LoginApi.LoginUtil.loginByKey(loginKey, password, LoginApi.LoginUtil.TARGET_MEMBER);
        if (result == 100) {
            return true;
        }
        return false;
    },
    /**
     * 无需密码直接登录
     * @param userId
     */
    loginFrontendByUserId: function (userId) {
        LoginApi.LoginSessionUtils.loginFrontend(request, response, userId);
    },
    loginBackendByUserId: function (userId) {
        LoginApi.LoginSessionUtils.loginBackend(request, response, userId);
    },

    getFrontendUser: function () {
        var userId = LoginApi.LoginSessionUtils.getFrontendLoginUserId(request);
        if (!userId) {
            return null;
        }
        else {
            var user = LoginApi.IsoneModulesEngine.userService.getUser(userId, true);
            if (!user) {
                return null;
            }
            return JSON.parse("" + user.toString());
        }
    },

    getBackendUser: function () {
        var userId = LoginApi.LoginSessionUtils.getBackendLoginUserId(request);
        if (!userId) {
          return null;
        }
        else {
          var user = LoginApi.IsoneModulesEngine.userService.getUser(userId, true);
          if (!user) {
            return null;
          }
          return JSON.parse("" + user.toString());
        }
    },

    setKeepLoginTime: function (keepLoginTimeSeconds) {
        LoginApi.LoginSessionUtils.setKeepLoginTime(keepLoginTimeSeconds, request);
    },
    /**
     * 退出前台会员
     */
    logoutFrontend: function () {
        LoginApi.LoginSessionUtils.logoutFrontend(request);
    },

    logoutBackend: function () {
        LoginApi.LoginSessionUtils.logoutBackend(request);
    },
    judgeMemberField: function (field, flag) {
        return "" + LoginApi.IsoneModulesEngine.userService.judgeMemberField(field, flag);
    },
    /**
     * 根据手机号码增加会员或登录前台,注意要引入user.js
     * @param mobilePhone 注册人手机号
     * @param parentId 推荐人ID或登录ID等
     * @returns {{state: string,msg:string}}
     */
    loginOrAddUser: function (mobilePhone, parentId) {
        var result = {state: 'err', isAdd: "N", userId: ''};
        if (!mobilePhone) {
            result.msg = "参数为空";
            return result;
        }
        var existsUser = UserService.getUserByKey(mobilePhone);
        if (existsUser) {
            LoginService.loginFrontendByUserId(existsUser.id);
            result.state = "ok";
            result.userId = existsUser.id;
            return result;
        } else {
            var jUser = {};
            jUser.isEnable = "1";
            jUser.loginId = "";
            jUser.mobilPhone = mobilePhone;
            jUser.source_isOnline = "1";//线上
            jUser.source = "phone";//来源写死了是手机端
            jUser.source_entrance = "default";
            jUser.parentId = parentId || "";
            jUser.createTime = new Date().getTime();

            var userId = UserService.register(jUser, 'u_0');
            if (userId) {
                LoginService.loginFrontendByUserId(userId);//登录前台
                UserService.addMemberField(mobilePhone, userId, "");//绑定手机号与会员关联关系
                LoginApi.UserRegisterUtil.executeRegisterPlan(userId);//执行注册奖励事件
                LoginApi.UserRegisterUtil.executeRecommendPlan(parentId, userId);//执行推荐奖励事件
                result.state = "ok";
                result.isAdd = "Y";
                result.userId = userId;
                result.msg = "注册成功";
            } else {
                result.msg = "注册失败";
            }
            return result;
        }
    }
};
var UserApi = new JavaImporter(
  Packages.net.xinshi.isone.modules,
  Packages.net.xinshi.isone.modules.user,
  Packages.net.xinshi.isone.functions.user,
  Packages.net.xinshi.isone.commons,
  Packages.net.xinshi.isone.lucene,
  Packages.net.xinshi.isone.lucene.search.user,
  Packages.net.xinshi.isone.lucene.search,
  Packages.net.xinshi.isone.functions.account,
  Packages.net.xinshi.isone.modules.account,
  Packages.net.xinshi.isone.modules.order,
  Packages.net.xinshi.isone.base,
  Packages.java.lang,
  Packages.java.util,
  Packages.org.json,
  Packages.net.xinshi.isone.modules.user.tools
);

var ColumnApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.modules.price,
    Packages.net.xinshi.isone.modules.product,
    Packages.net.xinshi.isone.modules.product.tools,
    Packages.net.xinshi.isone.lucene,
    Packages.net.xinshi.isone.lucene.search.product,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.functions.dynaattr,
    Packages.net.xinshi.isone.base.dynaattr,
    Packages.net.xinshi.isone.base.column,
    Packages.net.xinshi.isone.modules.businessrange,
    Packages.java.util
);

/**
 * column是一种树装结构，只要是树状的结构都可以用column来实现，例如商品分类，信息分类等等
 * @namespace
 * @type {Object}
 */
var ColumnService = {};

/**
 * 获得columnId对应的 column对象
 * @param columnId
 * @return {*}
 */
ColumnService.getColumn = function (columnId) {
    var jcol = ColumnApi.IsoneBaseEngine.columnService.getColumn(columnId);
    if (!jcol) {
        return null;
    }
    return JSON.parse(jcol.toString());
};

/**
 * 根据checkDeleteState参数判断是否要验证column的删除状态，获得column
 * @param columnId
 * @param checkDeleteState : true，需要验证删除状态
 * @returns {*}
 */
ColumnService.getColumnByState = function (columnId, checkDeleteState) {
    var jcol = ColumnApi.IsoneBaseEngine.columnService.getColumn(columnId, checkDeleteState);
    if (!jcol) {
        return null;
    }
    return JSON.parse(jcol.toString());
};

ColumnService.getColumns = function(ids){
    var listIds = new ColumnApi.ArrayList();
    ids.forEach(function(id){listIds.add(""+ id)});
    var jcols = ColumnApi.IsoneBaseEngine.columnService.getListDataByIds(listIds,true);
    var result = [];
    for(var i=0; i<jcols.size(); i++){
        var col = jcols.get(i);
        if(col){
            var oCol = JSON.parse("" + col.toString());
            result.push(oCol);
        }
        else{
            result.push(null);
        }
    }
    return result;

}

/**
 * 获得columnId对应的所有子栏目
 * @param columnId
 * @return {Array}
 */
ColumnService.getChildren = function (columnId) {
    var jlist = ColumnApi.IsoneBaseEngine.columnService.getAllColumnChildren(columnId);
    if (!jlist) {
        return null;
    }
    return JSON.parse(jlist.toString());
};

/**
 * 获得商家自定义的分类子栏目
 * @param merchantId
 * @param columnId
 * @returns {*}
 */
ColumnService.getChildrenByMerchantId = function (merchantId, columnId) {
    var jlist = ColumnApi.IsoneBaseEngine.columnService.getAllColumnChildren(merchantId, columnId);
    if (!jlist) {
        return null;
    }
    return JSON.parse(jlist.toString());
};

/**
 * 根据经营范围获得的子分类
 * @param merchantId
 * @param columnId
 * @param rangeType
 * @returns {*}
 */
ColumnService.getFilterChildrenByMerchantId = function (merchantId, columnId, rangeType) {
    var children = ColumnApi.IsoneBaseEngine.columnService.getAllColumnChildren(columnId);
    if (children) {
        children = ColumnApi.BusinessRangeHelper.filterByBusinessRange(merchantId, children, rangeType);
        if (children) {
            return JSON.parse(children.toString());
        }
    }
    return [];
};

/**
 * 根据经营范围获得商品的子分类
 * @param merchantId
 * @param columnId
 * @returns {*}
 */
ColumnService.getFilterProductCategoryChildren = function (merchantId, columnId) {
    return ColumnService.getFilterChildrenByMerchantId(merchantId, columnId, "mp_tree");
};


/**
 * 判断某个栏目是否拥有子栏目，性能大大好于getChildren(columnId).length>0;
 * @param columnId
 * @return {Boolean}
 */
ColumnService.hasChildren = function (columnId) {
    if(!columnId){
        return false;
    }
    var sortList = ColumnApi.IsoneBaseEngine.columnService.getChildren(columnId);
    return (sortList.getSize() > 0);
};


/**
 * 判断某个栏目是否拥有子栏目，性能大大好于getChildren(merchantId, columnId).length>0;
 * @param merchantId
 * @param columnId
 * @returns {boolean}
 */
ColumnService.hasChildrenByMerchantId = function (merchantId, columnId) {
    var sortList = ColumnApi.IsoneBaseEngine.columnService.getChildren(merchantId, columnId);
    return (sortList.getSize() > 0);
};

/**
 * 返回某个column的全路径
 * @param columnId
 * @param fromId  根节点ID,从哪里开始算
 * @param px     分隔符
 * @return {String}
 */
ColumnService.getColumnNamePath = function (columnId, fromId, px) {
    return "" + ColumnApi.IsoneBaseEngine.columnService.getColumnNamePath(columnId, fromId, px);
};

/**
 *  返回某个column的全路径，不过路径的组成部分不是column名称，而是每个栏目的ID
 * @param columnId
 * @param fromId   从哪里开始算
 * @param px       分隔符
 * @return {String}
 */
ColumnService.getColumnIdPath = function (columnId, fromId, px) {
    return "" + ColumnApi.IsoneBaseEngine.columnService.getColumnIdPath(columnId, fromId, px);
};

/**
 *  返回某个column的全路径，不过路径的组成部分不是column名称，而是每个栏目的ID
 * @param columnId
 * @param fromId   从哪里开始算
 * @param px       分隔符
 * @return {String}
 */
ColumnService.getColumnNamePathWithoutFirst = function (columnId, fromId, px) {
    return "" + ColumnApi.IsoneBaseEngine.columnService.getColumnNamePathWithoutFirst(columnId, fromId, px);
}

/**
 *  增加column
 * @param parentId 父columnId
 * @param col   需要添加的column对象
 * @return {String}
 */
ColumnService.addColumn = function (parentId, col) {
    var s = JSON.stringify(col);
    var jo = new ColumnApi.JSONObject(s);
    ColumnApi.IsoneBaseEngine.columnService.addToColumn(parentId, jo);
    return "" + jo.optString("id");
};
/**
 *  删除column
 * @param colId columnId
 * @return {String}
 */
ColumnService.deleteColumn = function (colId) {
    try {
        ColumnApi.IsoneBaseEngine.columnService.deleteColumn(colId);
    }
    catch (e) {
        e.printStackTrace();
        throw new Error("删除失败，err:" + e.getMessage());

    }
};
/**
 *  保存column
 * @param column column对象
 * @return {null}
 */
ColumnService.saveColumn = function (column) {
    var jColumn = new ColumnApi.JSONObject(JSON.stringify(column));
    ColumnApi.IsoneBaseEngine.columnService.saveColumn(jColumn);
};

ColumnService.updatePos = function (objId, pos, parentId) {
    ColumnApi.IsoneBaseEngine.columnService.updatePos(objId, pos, parentId);
};

ColumnService.getColumnPath = function (columnId, fromId, includeFromId) {
    var listColumns = ColumnApi.IsoneBaseEngine.columnService.getColumnPath(columnId, fromId, includeFromId);
    var s = "" + ColumnApi.Util.bean2String(listColumns);
    var columnPath = JSON.parse(s);
    return columnPath.map(function (col) {
        return col.objectMap;
    });
};

/**
 * 判断商品栏目下是否有商品
 * @param merchantId
 * @param columnId
 * @return {number}
 * 1代表true,0代表false
 */
ColumnService.isExistProduct = function (merchantId, columnId) {
    var slist = ColumnApi.IsoneModulesEngine.productService.getList(columnId, merchantId);
    var rowCount = parseInt(slist.getSize());
    if (rowCount == 0) {
        return 0;
    }
    var list = slist.getRange(0, -1);
    var ids = [];
    for (var i = 0; i < list.size(); i++) {
        ids.push(list.get(i).getObjid());
    }
    var productLists = ColumnApi.IsoneModulesEngine.productService.getListDataByIds(ids, true);
    ColumnApi.IsoneModulesEngine.productService.setNoVersions(ids, productLists);
    var flag = 0;
    for (var j = 0; j < productLists.size(); j++) {
        var jProduct = productLists.get(j);
        if (jProduct == null) {
            continue;
        }
        var productId = "" + jProduct.optString("id");
        var publishState = ColumnApi.ProductUtil.getPublishState(jProduct);
        var isDelete = ColumnApi.ProductUtil.isDeleted(jProduct);
        if (publishState != 1 || isDelete != false) {
            continue;
        }
        flag++;
    }
    if (flag > 0) {
        return 1;
    }
    return 0;
};

/**
 * 获得本栏目下的对象的属性模板，例如栏目下的商品，信息等的属性模板。但不是本栏目自身的属性模板。
 */
ColumnService.getCompleteAttrTemplateByColumnId = function (columnId) {
    var javaObj = ColumnApi.DynaAttrUtil.getCompleteAttrTemplateByColumnId(columnId);
    if (!javaObj) {
        return null;
    }
    var s = "" + javaObj.toString();
    return JSON.parse(s);
};
/**
 * 获取属性组
 * @param jTemplate
 * @returns {*}
 */
ColumnService.getAttrGroups = function (jTemplate) {
    return ColumnApi.DynaAttrFunctions.getAttrGroups(jTemplate);
};
/**
 * 获得属性组中的所有重要属性
 */
ColumnService.getImportantPropertyAttrs = function (attrs) {
    return ColumnApi.DynaAttrFunctions.getImportantPropertyAttrs(attrs);
};
/**
 * 通过columnId获取动态属性模板id
 * @param columnId
 * @returns {*}
 */
ColumnService.getAttrTemplateId = function (columnId) {
    return ColumnApi.IsoneBaseEngine.columnService.getAttrTemplateId(columnId);
};

ColumnService.getProductColumnPath = function (column, includeFirst) {
    var jColumn = new ColumnApi.JSONObject(JSON.stringify(column));
    var productColumnPath = ColumnApi.ColumnUtil.getProductColumnPath(jColumn, includeFirst);
    return JSON.parse(productColumnPath.toString());
};

/**
 * 保存分类路径和id的关联关系
 * @param path
 * @param id
 */
ColumnService.bindPath2Id = function (path, id) {
    ColumnApi.IsoneModulesEngine.productCategoryService.bindPath2Id(path, id);
};

/**
 * 根据分类路径获取到对应的分类ID
 * @param path
 */
ColumnService.getIdByPath = function (path) {
    var id = ColumnApi.IsoneModulesEngine.productCategoryService.getIdByPath(path);
    return id + "";
};

/**
 * 用户相关api
 * @namespace
 * @type {{getUserTradeInfo: getUserTradeInfo, saveUserTradeInfo: saveUserTradeInfo, getCountOfUserLevel: getCountOfUserLevel, deleteUserLevel: deleteUserLevel, getUserLevel: getUserLevel, saveUserLevel: saveUserLevel, getUser: getUser, getUserByKey: getUserByKey, getUserGroups: getUserGroups, getAccountType: getAccountType}}
 */
var UserService = {
  /**
   * 获得某个用户对交易相关的信息的选择，例如支付方式等,{selectedPaymentId:"xxxx"}
   * @param userId
   * @return {*}
   */
  getUserTradeInfo: function (userId){
    var jTradeInfo = UserApi.MemberFunction.getTradeInfoByUserId( userId );
    if (!jTradeInfo) return {};
    return JSON.parse( jTradeInfo.toString() );
  },
  /**
   * 设置用户的交易相关信息
   * @param userId
   * @param propertyName
   * @param propertyValue
   */
  saveUserTradeInfo: function (userId, propertyName, propertyValue){
    UserApi.MemberFunction.saveTradeInfo( userId, propertyName, propertyValue );
  },

  /**
   * 返回会员等级下的会员数
   * @param userLevelId
   * @returns {*}
   */
  getCountOfUserLevel: function (userLevelId){
    var userSearchArgs = new UserApi.UserSearchArgs();
    userSearchArgs.setMemberGroup( userLevelId );
    userSearchArgs.setFetchCount( 0 );
    userSearchArgs.setFromPath( 0 );
    userSearchArgs.setSearchType( UserApi.SearchTypes.USER );
    var searchResult = UserApi.IsoneFulltextSearchEngine.searchServices.search( userSearchArgs );
    return searchResult.getTotal() + 0;

  },
  /**
   * 删除用户等级
   * @param userLevelId
   * @returns {boolean}
   */
  deleteUserLevel: function (userLevelId){
    //如果有用户在用户等级里，则不能删除
    var count = UserService.getCountOfUserLevel( userLevelId );
    if (count > 0) {
      throw new Error( "会员等级下已经有用户，不能删除。" );
    }
    //如果有下级用户等级，则不能删除
    if (ColumnService.hasChildren( userLevelId )) {
      throw new Error( "会员等级下还有其他用户等级，不能删除。" );
    }
    //真正删除
    ColumnService.deleteColumn( userLevelId );

    return true;
  },
  /**
   * 获取会员等级
   * @param userLevelId
   * @returns {*}
   */
  getUserLevel: function (userLevelId){
    var userLevel = ColumnService.getColumn( userLevelId );
    return { id: userLevel.id, name: userLevel.name }
  },
  /**
   * 保存会员等级
   * @param userLevel
   */
  saveUserLevel: function (userLevel){
    ColumnService.saveColumn( userLevel );
  },
  /**
   * 获取用户
   * @param userId
   * @returns {*}
   */
  getUser: function (userId){
    var jUser = UserApi.IsoneModulesEngine.userService.getUser( userId );
    if (!jUser) {
      return null;
    }
    return JSON.parse( jUser.toString() );
  },

  getUsers: function (userIds){
    var ids = new UserApi.ArrayList();
    userIds.forEach( function (id){
      ids.add( id )
    } );
    var users = UserApi.IsoneModulesEngine.userService.getListDataByIds( ids, true );
    return JSON.parse( users.toString() );
  },
  /**
   * 修改用户
   * @param user
   * @param userId
   */
  updateUser: function (user, userId){
    var jUser = new UserApi.JSONObject( JSON.stringify( user ) );
    UserApi.IsoneModulesEngine.memberService.updateUser( jUser, userId );
  },
  /**
   * 获取会员等级名称
   * @param user
   * @param groupType
   * @returns {*}
   * deprecated
   */
  getMemberGroupName: function (user, groupType){
    var userObj = new UserApi.JSONObject( JSON.stringify( user ) );
    var groupName = UserApi.MemberGradeUtil.getMemberGroupName( userObj, groupType );
    if (!groupName) {
      return null;
    }
    return groupName + "";
  },
  /**
   * key 可以是email,手机手机号等等
   * @param key
   * @returns {*}
   */
  getUserByKey: function (key){
    var jUser = UserApi.IsoneModulesEngine.userService.getUserByKey( key );
    if (!jUser) {
      return null;
    }
    return JSON.parse( jUser.toString() );
  },

  getUserByOpenIdAndType: function (openId, type){
    var userId = UserApi.IsoneModulesEngine.memberService.judgeMemberField( openId, type );
    if (!userId) {
      return null;
    }
    return UserService.getUser( userId );
  },


  getUserGroups: function (userId){
    var user = UserService.getUser( userId );
    var groups = {};
    if (user) {
      var memberGroups = user.memberGroups;
      if (memberGroups) {
        for ( k in memberGroups ) {
          var memberGroup = memberGroups[ k ];
          groups[ memberGroup.groupId ] = memberGroup;
          memberGroup.id = memberGroup.groupId;
          var groupId = memberGroup.groupId;
          var path = UserApi.IsoneBaseEngine.columnService.getColumnPath( groupId, "c_100" );
          for ( var i = 0; i < path.size(); i++ ) {
            var jg = path.get( i );
            var g = JSON.parse( "" + jg.toString() );
            groups[ g.id ] = g;
          }
        }
      }
    }
    return groups;
  },
  /**
   * 将会员加入到指定的会员组，默认永久有效
   * @param userId
   * @param groupId
   * @returns {*}
   */
  addUserToGroup: function (userId, groupId){
    if (!userId || !groupId) {
      return;
    }
    //加入到会员组，默认永久有效
    var beginTime = new Date().getTime();
    var endTime = 4102415999000;
    return UserApi.IsoneModulesEngine.memberService.addUserToGroup( userId, groupId, beginTime, endTime );
  },

  getAccountType: function (accountTypeId){
    return UserApi.AccountTypeUtil.getAccountTypeName( accountTypeId );
  },

  getUserAccount: function (userId, accountType){
    var userAccount = UserApi.AccountFunction.getUserAccount( userId, accountType );
    if (!userAccount) {
      return null;
    }
    return JSON.parse( userAccount.toString() );
  },
  getObjAmount: function (id, userId){
    return UserApi.AccountFunction.getObjAmount( id, userId );
  },

  getUserEWalletMoneyAmount: function (userId){
    return UserApi.OrderCardHelper.getUserEWalletMoneyAmount( userId );
  },

  getUserMyWalletMoneyAmount: function (userId){
    return UserApi.OrderCardHelper.getUserMyWalletMoneyAmount( userId );
  },
  /**
   * 修改会员等级
   * @param user 会员对象
   * @param groupType 会员等级类型的第一个，如：普通会员-银牌会员-金牌会员 中的银牌会员ID 可看IUserService的常量
   * @param newGroupId 新等级ID
   */
  updateMemberGroup: function (user, groupType, newGroupId){
    var s = JSON.stringify( user );
    var jUser = new UserApi.JSONObject( s );
    return UserApi.IsoneModulesEngine.memberService.updateMemberGroup( jUser, groupType, newGroupId );
  },

  getMemberGroups: function (groupRootId){
    var result = UserApi.MemberGradeUtil.getAllMemberGroups( groupRootId );
    return JSON.parse( result.toString() );
  },
  /**
   * 增加会员
   * @param user 会员对象
   * @param operatorUserId 操作人ID，可以为空
   * @param config 是否要验证会员里的一些字段，见API详情
   * @returns {*}
   */
  addUser: function (user, operatorUserId, config){
    var jUser = $.toJavaJSONObject( user );
    var jConfig = $.toJavaJSONObject( config );
    var json = UserApi.UserAddUtil.addUser( jUser, operatorUserId, jConfig );
    return JSON.parse( json.toString() );
  },

  getAllUserIds: function (){
    var ids = UserApi.UserAddUtil.getAllUserIds();
    var result = [];
    for(var i=0; i<ids.size(); i++){
      result.push(ids.get(i) + "");
    }
    return result;
  },
  removeUserFromGroup: function (userId, groupId){
    UserApi.IsoneModulesEngine.memberService.removeUserFromGroup( userId, groupId );
  },


  removeAllParentGroup: function (userId, groupId){
    this.removeUserFromGroup( userId, groupId );
    var childrens = ColumnService.getChildren( groupId );
    if (!childrens) return;
    for ( var k in childrens ) {
      var child = childrens[ k ];
      if (child) {
        this.removeUserFromGroup( userId, child.id );
      }
    }
  },
  /**
   * 返回会员对应的所有会员等级名称
   * @param user
   * @returns {*}
   */
  getMemberAllGroupName: function (user){
    var userObj = new UserApi.JSONObject( JSON.stringify( user ) );
    var groupName = UserApi.MemberGradeUtil.getMemberAllGroupName( userObj, null );
    if (!groupName) {
      return null;
    }
    return groupName.toString();
  },
  /**
   * 获取当前会员组是在第几级
   * @param groupId
   * @returns {number}
   */
  getGroupLevel: function (fromId, topId){
    var level = 0;
    var columnPath = UserApi.IsoneBaseEngine.columnService.getColumnIdPath( fromId, topId, "/" );
    var columnPaths = columnPath.split( "/" );
    for ( var columnId  in columnPaths ) {
      if (columnId == fromId) {
        break;
      }
      level++;
    }
    return level;
  },
  /**
   * 获取最大会员等级
   * @param groups  结构形式是按level排序：[{level:1},{level:2}]
   * @returns {level:2}
   */
  getTopLevelGroup: function (groups){
    if (!groups)return;
    var s = JSON.stringify( groups );
    var list = UserApi.Util.jsonArrayStringToList( s );
    var sortList = UserApi.Util.sortList( list );
    var topLevelGroup = sortList.get( 0 );
    return JSON.parse( topLevelGroup );
  },

  /**
   * 注册会员（亚泰线下会员导入用到）
   */
  registerMember: function (param){
    if (!param) {
      return null;
    }
    var jParam = new UserApi.JSONObject( JSON.stringify( param ) );
    var jResult = UserApi.MemberFunction.registerMember( jParam );
    if (!jResult) return null;

    return JSON.parse( jResult.toString() );
  },
  /**
   * 验证用户是否属于某一个会员组
   *
   * @param userId
   * @param userGroupId
   * @return
   * @throws Exception
   */
  checkMemberGroup: function (userId, userGroupId){
    if (userId) {
      var isMemberGroup = UserApi.MemberGradeUtil.checkMemberGroup( userId, userGroupId );
      return isMemberGroup;
    }
    return false;
  },
  /**
   * 获得会员所有适用的会员组ID
   * @param userId
   * @returns {*}
   */
  getAllEffectiveGroupIds: function (userId){
    var json = UserApi.MemberGradeUtil.getAllEffectiveGroupIds( userId );
    return JSON.parse( json.toString() );
  },
  /**
   * 获取指定会员的最高等级
   * @param userId
   * @returns {*}
   */
  getUserTopGroupByUserId: function (userId){
    if (!userId) {
      return;
    }
    var userGroups = this.getUserGroups( userId );
    var groups = [];
    for ( var groupId in userGroups ) {
      var level = this.getGroupLevel( groupId, "c_100" );
      var group = {
        level: "" + level,
        groupId: groupId
      }
      groups.push( group );
    }
    if (groups.length == 0) {
      return;
    }
    var topLevelGroup = this.getTopLevelGroup( groups );
    if (!topLevelGroup) {
      return;
    }
    return topLevelGroup;
  },

  //修改会员的绑定状态（万家）
  updateUserBindStatus: function (userId, bindStatus, wjCardNo, wjShopId, wjMemberId, wjRegionId){
    if (!userId) {
      return false;
    }
    var userObj = this.getUser( userId );
    if (!userObj) {
      return false;
    }
    var wjCardInfo = {};
    wjCardInfo.wjCardNo = wjCardNo || "";
    wjCardInfo.wjShopId = wjShopId || "";
    wjCardInfo.wjMemberId = wjMemberId || "";
    wjCardInfo.wjRegionId = wjRegionId || "";
    wjCardInfo.bindTime = (new Date()).getTime() + "";
    userObj.wjCardInfo = wjCardInfo;

    userObj.userCardBindStatus = bindStatus || "0";
    userObj = new UserApi.JSONObject( JSON.stringify( userObj ) );
    UserApi.IsoneModulesEngine.memberService.updateUser( userObj, userId );

    return true;
  },

  updateUserPreSaleMobile: function (userId, preSaleMobile){
    if (!userId || !preSaleMobile) {
      return false;
    }
    var userObj = this.getUser( userId );
    if (!userObj) {
      return false;
    }
    userObj.preSaleMobile = preSaleMobile;
    userObj = new UserApi.JSONObject( JSON.stringify( userObj ) );
    UserApi.IsoneModulesEngine.memberService.updateUser( userObj, userId );
    return true;
  },
  /**
   * 判断某个key是否已经存在对应的userId
   * @param fieldValue
   * @param flag
   * @returns {string}
   */
  judgeMemberField: function (fieldValue, flag){
    var userId = UserApi.IsoneModulesEngine.memberService.judgeMemberField( fieldValue, flag );
    if (!userId) {
      return "";
    }
    return userId + "";
  },
  /**
   * 把某个key绑定到指定userId
   * @param fieldValue
   * @param userId
   * @param flag
   * @returns {string}
   */
  addMemberField: function (fieldValue, userId, flag){
    var s = UserApi.IsoneModulesEngine.memberService.addMemberField( fieldValue, userId, flag );
    if (!s) {
      return "";
    }
    return s + "";
  },
  /**
   * 获得会员来源配置
   * @returns {*}
   */
  getMemberSourceConfig: function (){
    var jConfig = UserApi.IsoneModulesEngine.userService.getUserSourceConfig();
    if (!jConfig) {
      return null;
    }
    return JSON.parse( jConfig.toString() );
  },
  /**
   * 修改会员来源配置
   * @param config
   */
  updateMemberSourceConfig: function (config){
    var jConfig = $.toJavaJSONObject( config );
    UserApi.IsoneModulesEngine.userService.updateUserSourceConfig( jConfig );
  },
  /**
   * 删除会员，把会员标识为已删除
   * @param delUserId 要删除的会员ID
   * @param operationUserId 操作的会员Id
   */
  deleteUser: function (delUserId, operationUserId){
    if (!delUserId) {
      return false;
    }
    UserApi.IsoneModulesEngine.memberService.deleteUser( delUserId, operationUserId );
    return true;
  },
  /**
   * 会员注册API，注册会触发会员注册前事件和会员注册后事件
   * @param jUser 会员对象
   * @param userId 操作人ID
   * @returns {*} 新会员ID
   */
  register: function (jUser, userId){
    if (!jUser) {
      return;
    }
    jUser = $.toJavaJSONObject( jUser );
    return UserApi.IsoneModulesEngine.memberService.register( jUser, userId );
  },
  /**
   * 触发用户验证后事件
   * @param eventName 事件名称，在UserEventConstants里有定义
   * @param jUser 用户对象
   * @returns {*}
   */
  fireUserEvent: function (eventName, jUser){
    if (!jUser || !eventName) {
      return;
    }
    jUser = $.toJavaJSONObject( jUser );
    return UserApi.IsoneModulesEngine.memberService.fireUserEvent( eventName, jUser );
  },
  /**
   * 把某个key绑定的userId解除
   * @param fieldValue 绑定的值
   * @param flag 类型
   * @returns {string}
   */
  removeMemberField: function (fieldValue, flag){
    if (!fieldValue) {
      return;
    }
    UserApi.IsoneModulesEngine.memberService.removeMemberField( fieldValue, flag );
  },
  /**
   * 重建会员索引
   * @param merchantId
   */
  reBuildIndex: function (userId) {
    if (!userId) {
      return;
    }
    UserApi.IsoneModulesEngine.memberService.addIndexingQue(userId);
  }
};
(function () {
    var backendUserId = SessionService.getSessionValue("_loginUserId",request);
    var userObject = UserService.getUser(backendUserId);


    var merchantId = $.params["m"];
    var shopId = (!$.params["s"] || $.params["s"] === "undefined") ? null : $.params["s"];
    var warehouseId = (!$.params["w"] || $.params["w"] === "undefined") ? null : $.params["w"];
    var loginId = userObject.loginId;
    var name = userObject.nickName?userObject.nickName:userObject.realName?userObject.realName:userObject.loginId;
    var template = $.getProgram(appMd5, "pages/main.jsxp");
    var pageData = {"appId": appId, "m": merchantId};
    if (shopId) {
        pageData.s = shopId;
    }
    if (warehouseId) {
        pageData.w = warehouseId;
    }
    if (loginId) {
        pageData.loginId = loginId;
    }
    if(name){
        pageData.name = name;
    }
    var pageFn = doT.template(template);
    out.print(pageFn(pageData));
}());
