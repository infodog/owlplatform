

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
var RegionApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.modules.region
);


var RegionService = {};


RegionService.getRegionCity = function (regionId) {
    if (!regionId) {
        return "";
    }
    var name = RegionApi.RegionUtil.getRegionCity(regionId);
    return name + "";
};
/**
 * 获取regionId所对应的省份
 * @param regionId
 * @returns {*}
 */
RegionService.getRegionProvince = function (regionId) {
    if (!regionId) {
        return "";
    }
    var name = RegionApi.RegionUtil.getRegionProvince(regionId);
    return name + "";
};

/**
 * 根据excel格式导入地区
 * @param userId
 * @param config
 * @param excelUrl
 */
RegionService.doImportRegion = function (userId, config, excelUrl) {
    var jConfig = $.JSONObject(config);
    RegionApi.RegionImportUtil.doImportRegion(userId, jConfig, excelUrl);
};

/**
 * 根据地区全路径获取地址ID
 * @param regionFullPath
 * @returns {*}
 */
RegionService.getRegionIdByFullPath = function (regionFullPath) {
    if (!regionFullPath) {
        return "";
    }
    var s = RegionApi.RegionUtil.getRegionIdByFullPath(regionFullPath);
    return s + "";
};

/**
 * 根据地区名称获取地区对象
 * @param regionName 地区名称，必填
 */
RegionService.getRegionByName = function (regionName) {
    if(!regionName){
        return null;
    }
    var result = RegionApi.RegionUtil.getRegionByName(null, regionName);
    if(result){
        return JSON.parse(result + "");
    }
    return null;
};
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
  var dataKey = "region_data_key";
  var nowTime= new Date().getTime();
  var ret = {state: "ok"};
  var blnGetData =false;
  var oldData = appData.getData(appId,dataKey);
  if(oldData){
    out.print(oldData);
    return;
  }


  var cid = "col_region";
  var name = "地区根节点";
  //var mid = "head_merchant";
  var data = {};
  data.id = cid;
  data.key = cid;
  data.value = cid;
  data.label = name;
  data.name = name;
  //读取子级数据
  getChildren(data,cid);
  data.expireTime = nowTime+1*86400;//数据有效期一天
  //data.expireTime = nowTime+120*1000;//测试1分钟
  //保存数据
  ret.tree = data;
  var oldData = JSON.stringify(ret);
  appData.setData(appId,dataKey,oldData);
  out.print(oldData);
})();

function getChildren(parent, cid) {
  var ret = parent;
  var result = ColumnService.getChildren(cid);
  var hasChildren = ColumnService.hasChildren(cid);
  ret.hasChildren = hasChildren;
  ret.children = [];
  ret.id = cid;
  ret.key = cid;
  ret.value = cid;
  ret.label = parent.name;
  if (hasChildren)
  {
    var len = result.length;
    for (var i = 0; i < len; i++)
    {
      ret.children.push(getChildren(result[i], result[i].id));
    }
  }
  return ret;
}
