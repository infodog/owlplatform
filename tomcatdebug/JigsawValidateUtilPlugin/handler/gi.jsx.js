

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
var FileApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules,
    Packages.net.xinshi.isone.base,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.filemanagement.impl,
    Packages.net.xinshi.isone.modules.filemanagement.util,
    Packages.java.util
);
/**
 * 文件库相关方法
 * @namespace
 * @type {{getFiles: Function, getRelatedUrl: Function, getDefaultFileColumn: Function, getChildren: Function, getFileColumn: Function, hasChildren: Function, getAllColumnChildren: Function}}
 */
var FileService = {
    /**
     * 将一个zip文件里面的内容解压，然后上传到fileserver
     * @param url
     */
    expandZipFile: function (url) {
        var fileInfos = FileApi.Util.expandZipFile(url);
        var result = [];
        for (var i = 0; i < fileInfos.size(); i++) {
            var fileInfo = fileInfos.get(i);
            var fileId = "" + fileInfo.getFileId();
            var fileName = "" + fileInfo.getFileName();
            result.push({fileId: fileId, fileName: fileName});
        }
        return result;
    },
    /**
     * 添加文件到文件库
     * @param columnId
     * @param file
     * @returns {String}
     */
    addFile: function (columnId, file) {
        var jFile = $.toJavaJSONObject(file);
        var fileId = FileApi.IsoneBaseEngine.fileService.addFile(jFile, columnId);
        return fileId + "";
    },

    getFileObject:function(fileObjectId){
        var jfile = FileApi.IsoneBaseEngine.fileService.getFile(fileObjectId);
        if(jfile==null){
            return null;
        }
        var s = "" + jfile.toString();
        return JSON.parse(s);
    },
    /**
     * 根据encode的img上传图片
     * @param imageEncode
     * @param fileName
     * @returns {*}
     */
    addFileByBytes: function (imageEncode, fileName) {
        var json = FileApi.IsoneBaseEngine.fileService.uploadFile(imageEncode, fileName);
        if (!json) {
            return null;
        }
        return JSON.parse(json);
    },
    /**
     * 通过folderId获取文件列表
     * @param folderId
     * @returns {JSONObject}
     */
    getFiles: function (folderId) {
        var jFiles = FileApi.IsoneBaseEngine.fileService.getFiles(folderId);
        return JSON.parse(jFiles.toString());
    },
    /**
     * 获取文件真实路径
     * @param fileId
     * @param spec 生成大小图尺寸
     * @returns {string}
     */
    getRelatedUrl: function (fileId, spec) {
        return "" + FileApi.IsoneBaseEngine.fileService.getRelatedUrl(fileId, spec);
    },
    /**
     * 获取文件的外网真实路径
     * @param fileId
     * @returns {string}
     */
    getFullPath: function (fileId) {
        var s = FileApi.IsoneBaseEngine.fileService.getFullPath(fileId);
        if (!s) {
            return "";
        }
        return s + "";
    },

    /**
     * 获取文件的内网真实路径
     * @param fileId
     * @returns {string}
     */
    getInternalPath: function (fileId) {
        var s = FileApi.IsoneBaseEngine.fileService.getInternalPath(fileId);
        if (!s) {
            return "";
        }
        return s + "";
    },
    /**
     * 获取指定商家文件库columnId列表
     * @param merchantId
     * @returns {JSONObject}
     */
    getDefaultFileColumn: function (merchantId) {
        var jDefaultFileColumn = FileApi.IsoneBaseEngine.fileColumnService.getDefaultFileColumn(merchantId);
        return JSON.parse(jDefaultFileColumn.toString());
    },
    /**
     * 获取指定columnId的子栏目
     * @param fileColumnId
     * @returns {JSONObject}
     */
    getChildren: function (fileColumnId) {
        var children = FileApi.IsoneBaseEngine.fileColumnService.getChildrenObjects(fileColumnId);
        if (children) {
            return JSON.parse(FileApi.Util.bean2String(children));
        }
        return null;
    },

    getFileColumn: function (fileColumnId) {
        var c = FileApi.IsoneBaseEngine.fileColumnService.getFileColumn(fileColumnId);
        if (c) {
            return JSON.parse(c.toString());
        }
        return null;
    },
    /**
     * 判断栏目是否存在子栏目
     * @param columnId
     * @returns {boolean}
     */
    hasChildren: function (columnId) {
        var sortList = FileApi.IsoneBaseEngine.fileColumnService.getChildren(columnId);
        return (sortList.getSize() > 0);
    },
    /**
     * 获取指定栏目下的所有子栏目
     * @param fileColumnId
     * @returns {JSONObject}
     */
    getAllColumnChildren: function (fileColumnId) {
        var children = FileApi.IsoneBaseEngine.fileColumnService.getAllColumnChildren(fileColumnId);
        if (!children) {
            return null;
        }
        return JSON.parse(children.toString());
    },

    getUrlMd5: function (url) {
        return FileApi.Util.getUrlMd5(url);
    },
    /**
     * 读取text文件，返回一个集合
     * @param url 文件的URL
     * @param encode 编码，不传默认UTF-8
     */
    readTextFile: function (url, encode) {
        if (!url) {
            return null;
        }
        if (!encode) {
            encode = "UTF-8";
        }
        return $.java2Javascript(FileApi.FileReaderUtil.readTextFromUrl(url, encode));
    },
    /**
     * 把一个字符串写成文件到指定目录文件
     * @param fileFullName
     * @param content
     * @param append
     */
    writeStringToFile: function (fileFullName, content, append) {
        FileApi.Util.writeStringToFile(fileFullName, content, append)
    }

};
var EncryptUtilApi = new JavaImporter(
    Packages.net.xinshi.isone.commons.AESEncryptUtil,
    Packages.org.apache.commons.codec.digest.DigestUtils
);
/**这个是一加解密算法JS API，包含aes sha1,其他的md5也应该放到这里来
 * @namespace
 * @type {Object}
 */
var EncryptUtil = {
    /**
     * 进行aes加密
     * @param str 要加密的字符串
     * @param keyword 加密的key
     * @returns {string}
     */
    aesEncrypt: function (str, keyword) {
        if (!str || !keyword) {
            return "";
        }
        return "" + EncryptUtilApi.AESEncryptUtil.encrypt(str, keyword);
    },
    /**
     * 进行aes解密
     * @param str 要解密的字段串
     * @param keyword 解密的key
     * @returns {string}
     */
    aesDecrypt: function (str, keyword) {
        if (!str || !keyword) {
            return "";
        }
        return "" + EncryptUtilApi.AESEncryptUtil.decrypt(str, keyword);
    },
    /**
     * 加密数据
     * @param sSrc
     * @param sKey
     * @param sIv
     * @returns {string}
     */
    encryptData: function (sSrc, sKey, sIv) {
        if (!sSrc || !sKey || !sIv) {
            return "";
        }
        return "" + EncryptUtilApi.AESEncryptUtil.encrypt(sSrc, sKey, sIv);
    },
    /**
     * 解密
     * @param sSrc
     * @param sKey
     * @param sIv
     * @returns {string}
     */
    decryptData: function (sSrc, sKey, sIv) {
        if (!sSrc || !sKey || !sIv) {
            return "";
        }
        return "" + EncryptUtilApi.AESEncryptUtil.decrypt(sSrc, sKey, sIv);
    },
    /**
     * 进行sha1加密
     * @param str 要加密的字符串
     * @returns {string}
     */
    sha1Encrypt:function(str){
        if(!str){
            return "";
        }
        return EncryptUtilApi.DigestUtils.shaHex(str) + "";
    },
    /**
     * 进行sha256加密
     * @param str 要加密的字符串
     * @returns {string}
     */
    sha256Encrypt:function(str){
        if(!str){
            return "";
        }
        return EncryptUtilApi.DigestUtils.sha256Hex(str) + "";
    }
};
var JigsawValidateUtilApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons
);

/**
 * @constructor
 * @type {Object}
 */
var JigsawValidateUtil = {};

/**
 *生成背景图和抠图
 * @param backgroundImageUrl :背景图url
 * @returns {{code: string}}
 */
JigsawValidateUtil.drawImages = function (backgroundImageUrl) {
    var json = JigsawValidateUtilApi.JigsawValidateUtil.drawImages(backgroundImageUrl);
    if (json) {
        return JSON.parse(json.toString());
    }
    return null;
};

/**
 * 检查位移是否正确
 * @param realX     :正确的X坐标
 * @param imageWidth :背景图的实际宽度
 * @param moveX     :用户位移的坐标
 * @param boxWidth  :移动的宽度
 * @returns {*}
 */
JigsawValidateUtil.checkMove = function (realX, imageWidth, moveX, boxWidth) {
    return JigsawValidateUtilApi.JigsawValidateUtil.checkMove(realX, imageWidth, moveX, boxWidth);
};
var pigeon_1 = new Pigeon(["JigsawValidateUtilPluginList"],["JigsawValidateUtilPluginObj"]);
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

var GlobalSysArgsService = (function (pigeon) {
    var prefix = "JigsawValidateUtilPluginObj";

    var f = {
        saveArgs: function (jArgs) {
            var id = f.getArgsId();

            pigeon.saveObject(id, jArgs);
        },
        getArgs: function () {
            var id = f.getArgsId();
            return pigeon.getObject(id);
        },
        getArgsId: function () {
            return prefix + "_Args_100";
        }
    };
    return f;
})(pigeon_1);

(function () {

    var result = {};
    try {
        var bgImages = "";
        var jArgs = GlobalSysArgsService.getArgs();
        if (jArgs) {
            if (jArgs.jigsawBgImages) {
                bgImages = jArgs.jigsawBgImages.map(function(fileId){
                    return FileService.getInternalPath(fileId);
                });
            }
        }
        $.log(JSON.stringify(bgImages));
        var nowTime = new Date().getTime();

        var backgroundImageUrl = randomImageNumber(bgImages);
        if (!backgroundImageUrl) {
            result.code = "105";
            result.msg = "背景图参数未设置";
            out.print(JSON.stringify(result));
            return;
        }

        var jigsawSessionValue = SessionService.getSessionValue("jigsawSessionValue", request);
        var limitCount = 0;
        if (jigsawSessionValue) {
            var jsv = jigsawSessionValue.split("|");
            var lastLimitTime = Number(jsv[2]);
            limitCount = Number(jsv[3]);
            if (nowTime - Number(lastLimitTime) < 1000 * 60 * 3) {
                //三分钟内最多5次
                if (limitCount >= 5) {
                    result.code = "110";
                    result.msg = "太频繁了，请稍后再试";
                    out.print(JSON.stringify(result));
                    return;
                }
            } else {
                //超过3分钟重置为0
                limitCount = 0;
            }
            limitCount++;
        }

        var jResult = JigsawValidateUtil.drawImages(backgroundImageUrl);
        if (!jResult) {
            result.code = "106";
            result.msg = "异常了，请稍后再试";
            out.print(JSON.stringify(result));
            return;
        }
        var realX = jResult.realX;
        var imageWidth = jResult.imageWidth;

        jigsawSessionValue = realX + "|" + imageWidth + "|" + nowTime + "|" + limitCount;
        SessionService.addSessionValue("jigsawSessionValue", jigsawSessionValue, request, response);

        result.code = "0";
        result.msg = "操作成功";
        result.bgFilePath = jResult.bgFilePath;
        result.mattingFilePath = jResult.mattingFilePath;
        out.print(JSON.stringify(result));
    }
    catch (e) {
        $.log("\n............................e=" + e);
        result.code = "99";
        result.msg = "操作出现异常，请稍后再试";
        out.print(JSON.stringify(result));
    }

})();

function randomImageNumber(bgImages) {
    if (bgImages) {
        var max = bgImages.length;
        if (max > 0) {
            var n = parseInt(Math.random() * max);
            return bgImages[n];
        }
    }
    return "";
}

