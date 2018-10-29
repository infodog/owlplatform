

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
    return {path:url,fileName:fileName,fileId:fileId.getFileId()};
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
/* Laura Doktorova https://github.com/olado/doT */(function(){function o(){var a={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},b=/&(?!#?\w+;)|<|>|"|'|\//g;return function(){return this?this.replace(b,function(c){return a[c]||c}):this}}function p(a,b,c){return(typeof b==="string"?b:b.toString()).replace(a.define||i,function(l,e,f,g){if(e.indexOf("def.")===0)e=e.substring(4);if(!(e in c))if(f===":"){a.defineParams&&g.replace(a.defineParams,function(n,h,d){c[e]={arg:h,text:d}});e in c||(c[e]=g)}else(new Function("def","def['"+
e+"']="+g))(c);return""}).replace(a.use||i,function(l,e){if(a.useParams)e=e.replace(a.useParams,function(g,n,h,d){if(c[h]&&c[h].arg&&d){g=(h+":"+d).replace(/'|\\/g,"_");c.__exp=c.__exp||{};c.__exp[g]=c[h].text.replace(RegExp("(^|[^\\w$])"+c[h].arg+"([^\\w$])","g"),"$1"+d+"$2");return n+"def.__exp['"+g+"']"}});var f=(new Function("def","return "+e))(c);return f?p(a,f,c):f})}function m(a){return a.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var j={version:"1.0.0",templateSettings:{evaluate:/\{\{([\s\S]+?\}?)\}\}/g,
interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:true,append:true,selfcontained:false},template:undefined,
compile:undefined};if(typeof module!=="undefined"&&module.exports)module.exports=j;else if(typeof define==="function"&&define.amd)define(function(){return j});else(function(){return this||(0,eval)("this")})().doT=j;String.prototype.encodeHTML=o();var q={append:{start:"'+(",end:")+'",endencode:"||'').toString().encodeHTML()+'"},split:{start:"';out+=(",end:");out+='",endencode:"||'').toString().encodeHTML();out+='"}},i=/$^/;j.template=function(a,b,c){b=b||j.templateSettings;var l=b.append?q.append:
q.split,e,f=0,g;a=b.use||b.define?p(b,a,c||{}):a;a=("var out='"+(b.strip?a.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):a).replace(/'|\\/g,"\\$&").replace(b.interpolate||i,function(h,d){return l.start+m(d)+l.end}).replace(b.encode||i,function(h,d){e=true;return l.start+m(d)+l.endencode}).replace(b.conditional||i,function(h,d,k){return d?k?"';}else if("+m(k)+"){out+='":"';}else{out+='":k?"';if("+m(k)+"){out+='":"';}out+='"}).replace(b.iterate||i,function(h,
d,k,r){if(!d)return"';} } out+='";f+=1;g=r||"i"+f;d=m(d);return"';var arr"+f+"="+d+";if(arr"+f+"){var "+k+","+g+"=-1,l"+f+"=arr"+f+".length-1;while("+g+"<l"+f+"){"+k+"=arr"+f+"["+g+"+=1];out+='"}).replace(b.evaluate||i,function(h,d){return"';"+m(d)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,"").replace(/(\s|;|\}|^|\{)out\+=''\+/g,"$1out+=");if(e&&b.selfcontained)a="String.prototype.encodeHTML=("+
o.toString()+"());"+a;try{return new Function(b.varname,a)}catch(n){typeof console!=="undefined"&&console.log("Could not create a template function: "+a);throw n;}};j.compile=function(a,b){return j.template(a,null,b)}})();
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
var SysArgumentApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.sysargument,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.functions.sysargument,
    Packages.net.xinshi.isone.functions,
    Packages.org.json
);

/**
 *  处理系統參數的函数
 * @type {{getSysArgumentStringValue: getSysArgumentStringValue}}
 */
var SysArgumentService = {

    /**
     * 获得一个系统参数
     * @param merchantId
     * @param columnId
     * @param key
     * @returns {*}
     */
    getSysArgumentStringValue: function (merchantId, columnId, key) {
        return "" + SysArgumentApi.SysArgumentUtil.getSysArgumentStringValue(merchantId, columnId, key);
    },

    setSysArgumentStringValue:function(merchantId,columnId,key,value){
        SysArgumentApi.SysArgumentUtil.setSystemArgumentStringValue(merchantId, columnId, key,value);
    },

    getSysArgumentBooleanValue: function (merchantId, columnId, key) {
        return SysArgumentApi.SysArgumentUtil.getSysArgumentBooleanValue(merchantId, columnId, key);
    },

    setSysArgumentBooleanValue:function(merchantId,columnId,key,value){
        SysArgumentApi.SysArgumentUtil.setSystemArgumentBooleanValue(merchantId, columnId, key,value);
    },

    getAllSysArgument:function(merchantId,columnId){
        var json = SysArgumentApi.SysArgumentFunction.getAllSysArgument(merchantId, columnId);
        if(json||json!=null){
            return JSON.parse(json.toString());
        }
    }
};

var DigestApi = new JavaImporter(
    Packages.net.xinshi.isone.commons,
    Packages.org.apache.commons.codec.digest,
    Packages.net.xinshi.isone.commons
);
/**
 * 工具类
 * @namespace
 */
var DigestUtil = {
    /**
     *
     * @param {string} pass
     * @param {string} algorithm
     */
    digestString: function (pass, algorithm) {
        return "" + DigestApi.DigestUtil.digestString(pass, algorithm);
    },
    /**
     * md5然后 hex
     * @param {string} s
     * @returns {string}
     */
    md5:function(s){
        return DigestApi.DigestUtils.md5Hex("" + s)+"";
    },

    sha1:function(s){
      return DigestApi.DigestUtils.sha1Hex("" + s)+"";
    },

    hex:function(s){
        return DigestApi.Util.hexString(s,'utf-8')
    }
};
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

(function () {
    var template = $.getProgram(appMd5, "pages/login.html");
    var pageFn = doT.template(template);
    out.print(pageFn());
})()
