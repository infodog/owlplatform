

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
var flattenedSpecs = {"mainFields":[{"fieldType":"string","fieldSize":12,"tab":"01","disabled":"true","fieldLabel":"用户Id","_ft":"field","key":"id","origKey":"id"},{"fieldType":"string","fieldSize":16,"tab":"02","searchable":"true","unique":"true","fieldLabel":"登录Id","_ft":"field","key":"loginId","origKey":"loginId"},{"fieldType":"string","fieldSize":16,"tab":"02","searchable":"true","fieldLabel":"用户名字","_ft":"field","key":"name","origKey":"name"},{"fieldType":"password","tab":"03","searchable":"false","hidden":"true","fieldLabel":"密码","_ft":"field","key":"passwordhash","origKey":"passwordhash"},{"fieldType":"string","fieldSize":64,"tab":"03","searchable":"false","hidden":"true","fieldLabel":"密码","_ft":"field","key":"random","origKey":"random"},{"fieldType":"string","fieldSize":16,"inputType":"mobile","tab":"03","searchable":"true","unique":"true","fieldLabel":"手机","_ft":"field","key":"mobile","origKey":"mobile"},{"fieldType":"choice","values":"y_是/n_否","tab":"03","searchable":"true","options":[["y","是"],["n","否"]],"fieldLabel":"手机是否已经验证","_ft":"field","key":"mobile_verified","origKey":"mobile_verified"},{"fieldType":"choice","values":"y_是/n_否","tab":"04","searchable":"true","hidden":"false","options":[["y","是"],["n","否"]],"fieldLabel":"是否有效","_ft":"field","key":"isEnable","origKey":"isEnable"},{"fieldType":"image","spec":"160x160","size":"2M","exts":"png#jpg#gif#jpeg","tab":"04","fieldLabel":"头像","_ft":"field","key":"icon","origKey":"icon"},{"fieldType":"string","fieldSize":16,"tab":"05","searchable":"true","fieldLabel":"邮件","_ft":"field","key":"email","origKey":"email"},{"fieldType":"choice","values":"y_是/n_否","tab":"06","searchable":"true","options":[["y","是"],["n","否"]],"fieldLabel":"邮箱是否已验证","_ft":"field","key":"email_verified","origKey":"email_verified"},{"fieldType":"string","fieldSize":16,"tab":"06","searchable":"true","fieldLabel":"qq号","_ft":"field","key":"qq","origKey":"qq"},{"fieldType":"string","fieldSize":16,"tab":"06","searchable":"true","fieldLabel":"qq openId","_ft":"field","key":"qq_openId","origKey":"qq_openId"},{"fieldType":"imgageUrl","tab":"06","searchable":"true","fieldLabel":"qq 头像","_ft":"field","key":"qq_icon","origKey":"qq_icon"},{"fieldType":"url","tab":"06","searchable":"true","fieldLabel":"微信号","_ft":"field","key":"wechat","origKey":"wechat"},{"fieldType":"string","fieldSize":16,"tab":"10","fieldLabel":"微信 openId","_ft":"field","key":"wechat_openId","origKey":"wechat_openId"},{"fieldType":"imgageUrl","tab":"10","fieldLabel":"微信头像","_ft":"field","key":"wechat_icon","origKey":"wechat_icon"},{"fieldType":"choice","values":"y_是/n_否","tab":"11","hidden":"true","searchable":"true","options":[["y","是"],["n","否"]],"fieldLabel":"是否马甲","_ft":"field","key":"isFake","origKey":"isFake"}],"details":[]}

var fullkey = $.params.fullkey;
var fields = flattenedSpecs.mainFields;
var maxBytes = 1024*1024*1024;
var exts;
var spec;

$.log(fullkey);

for(var i=0; i<fields.length; i++){
    var field = fields[i];
    if(field.key == fullkey){
        $.log("field=" + JSON.stringify(field));
        var size = field.size;
        if(size){
            var unit = size.substring(size.length-1,size.length);
            var sizeNum = size.substring(0,size.length-1);

            if(unit == 'm' || unit=='M'){
                maxBytes = parseFloat(sizeNum) * 1024 * 1024;
            }
            else if(unit == 'k' || unit == 'K'){
                maxBytes = 1024 * parseFloat(sizeNum);
            }

        }
        exts = field.exts;
        spec = field.spec;
    }

}
var fileInfo = $.uploadEx(exts,maxBytes);

var url = FileService.getRelatedUrl(fileInfo.fileId,spec);
var ret = {
    state:"ok",
    url:url,
    fileId:fileInfo.fileId

}
out.print(JSON.stringify(ret));
