

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
var pigeon_1 = new Pigeon(["owl_shop"],["owl_shop"]);
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

//为了防止错误的执行sript，例如针对mall的script执行到了sns等等，我们要求在patch的开头首先要调用assertSystem,否则就抛出异常
var systemChecked;
var rSystem
function assertSystem(requiredSystem){
    rSystem = requiredSystem;
    if(requiredSystem == 'mall'){
        systemChecked = true;
    }
    else{
        throw "当前的System是" + system + ",和requiredSystem不一致。";
    }
}

function checkSystem(){
    return;
    if(!systemChecked){
        throw "请首先调用assertSystem(system),system的取值可以是：'mall','sns','erp'"
    }
}

/*
获得一个对象
 */
function getObject(name){
    checkSystem()
    var content = ps20.getContent(name);
    if(!content){
        return content;
    }
    return JSON.parse(content);
}

function getListSize(listName){
    return ps20.getListSize(listName);
}

function getContent(name){
    checkSystem()
    return ps20.getContent(name);
}

function getContents(name,from,num){
    checkSystem()
    return ps20.getContents(name,from,num);
}

function getObjects(name,from,num){
    checkSystem()
    var contents = getContents(name,from,num);
    var result = [];
    for(var i=0; i<contents.size();i++) {
        var content = contents.get(i);
        if(content){
            result.push(JSON.parse(content));
        }
    }
    return result;
}

function where(listName,filter,from,num) {
    var curPos = 0;
    var step = 100;
    var result = [];
    var validNum = 0;
    while(true){
        var objs = getObjects(listName,curPos,step);

        for(var i=0; i<objs.length; i++){
            var obj = objs[i];
            if(filter(obj)){
                validNum++;
                if(validNum>from && validNum<=from + num) {
                    result.push(obj);
                }
            }
        }
        if(objs.length<step){
            break;
        }
        curPos += step;
    }
    return result;
}

/*
保存一个对象
 */
function saveObject(name,obj){
    checkSystem()
    if(!obj){
        ps20.saveContent(name,null);
    }
    ps20.saveContent(name,JSON.stringify(obj));
}

function saveContent(name,content){
    checkSystem()
    ps20.saveContent(name,content);
}

function printPlainObjects(objs){
    print(JSON.stringify(objs))
    print("<hr>")
    print("length=" + objs.length);
    print("<br>")
}

function addToList(listname,key,objId){
    checkSystem()
    ps20.addToList(listname,key,objId);
}

function clearList(listname){
    ps20.clearList(listname);
}

function deleteFromList(listname,key,objId){
    checkSystem()
    ps20.deleteFromList(listname,key,objId);
}

function print(msg){
    ps20.putMsg(msg);
}

function getAtom(name){
    checkSystem()
    return ps20.getAtom(name);
}

function setAtom(name,value){
    checkSystem()
    ps20.setAtom(name,value);
}

function getList(name,from,num){
    checkSystem()
    var listSortObjects = ps20.getList(name,from,num);
    var ret = [];
    for(var i=0; i<listSortObjects.size(); i++){
        var sobj = listSortObjects.get(i);
        ret.push({
            objid:"" + sobj.getObjid(),
            key:"" + sobj.getKey()
        })
    }
    return ret;
}

function printList(name,from,num){
    checkSystem()
    ps20.printList(name,from,num);
}

function printObjects(listId,from,num){
    checkSystem()
    ps20.printObjects(listId,from,num);
}

function getId(id){
    checkSystem()
    return ps20.getId(id);
}

function lock(id) {
    checkSystem()
    ps20.lock(id);
}

function unlock(id) {
    checkSystem()
    ps20.unlock(id);
}

function getComparableString(value, len){
   var key = "" + value;
   var l = len - key.length;
   for(var i=0; i<l; i++){
       key = "0" + key;
   }
   return key;
}

function getRevertComparableString(value, len){
    var powers = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1000000000000,10000000000000];
    var value = powers[len] - value;
    return getComparableString(value,len);
}

function saveUrls(urls){
    var defaultActionFinderClass = 'net.xinshi.isone.modules.privilege.privilegefinder.impl.NormalActionFinder';
    var defaultColumnFinderClass = 'net.xinshi.isone.modules.privilege.privilegefinder.impl.NormalColumnFinder';
    for(var i=0; i<urls.length; i++){
        var u = urls[i];

        if(!u.actionFinder){
            u.actionFinder = defaultActionFinderClass;
        }
        var actionFinder = {
            id:'ActionFinder_' + u.url,
            finder:u.actionFinder,
            actionId:u.actionId
        }
        saveObject(actionFinder.id,actionFinder);

        if(!u.columnFinder){
            u.columnFinder = defaultColumnFinderClass;
        }
        var columnFinder = {
            id:"ColumnFinder_"  + u.url,
            finder:u.columnFinder
        }
        saveObject(columnFinder.id,columnFinder);
    }
}

var CHECK_OUT = "cko";
var HEAD = "hd";
var versionObject = {
    addObject : function(obj,id,userId,initialCheckout){
        lock(id);
        try {
            var vid = id + "_" + CHECK_OUT;
            obj["checkoutTime"] = (new Date()).getTime();
            obj["chectoutUserId"] =  userId;
            obj["fromVersionId"] =  "";
            obj["id"] = vid;
            obj["_v"] = id + "_" + CHECK_OUT;
            saveObject(vid,obj);
            if (!initialCheckout) {
                versionObject.checkin(id, userId);
            }
        } finally {
            unlock(id);
        }
    } ,
    checkin:function(objId,userId){
        lock(objId);
        try {
            if (!versionObject.isCheckedOut(objId)) return false;
            versionObject.saveOldHead(objId);
            var vid = objId + "_" + CHECK_OUT;
            var obj = getObject(vid);
            var versionId = "" + getId("versions");
            versionObject.setAsHeadObject(objId, versionId, userId, obj);
            versionObject.deleteCheckoutCopy(objId);
            return true;
        } finally {
            unlock(objId);
        }
    },
    isCheckedOut:function(objId){
        var vid = objId + "_" + CHECK_OUT;
        var cstr = getContent(vid);
        if(!cstr){
           return false;
        }
        return true;
    },
    saveOldHead : function(objId){
        var headId = objId + "_" + HEAD;
        oldHead = getObject(headId);
        if (oldHead) {
            var _ver = oldHead["_v"];
            var headObjId = objId + "_" + _ver;
            oldHead["id"] = headObjId;
            oldHead["objId"] =  objId;
            saveObject(headObjId, oldHead);
        }
    },
    setAsHeadObject:function( objId,  versionId,  userId,  jobj) {
        var headId = objId + "_" + HEAD;
        jobj["_v"] = versionId;
        jobj["id"] = headId;
        jobj["objId"] = objId;//这个objId是区别于id的，但同一个对象所有version的objId都应该是一样的
        var t = (new Date()).getTime();
        jobj["dateTime"] = "" + t;
        jobj["checkinUser"] = userId;
        saveObject(headId, jobj);

        //添加 versionId 2 head
        var versionObjId = objId + "_" + versionId;
        var relObj ={};
        relObj["id"]= versionObjId;
        relObj["_v"]=HEAD;
        saveObject(versionObjId, relObj);
        t = t / 1000;
        addToList(objId + "_versions",getRevertComparableString(t,11),versionObjId)
    },
    deleteCheckoutCopy:function(id)  {
        //删除CheckOut Copy,其他的保留
        vid = id + "_" + CHECK_OUT;
        saveContent(vid, null);
    },

    getObject:function(objId, versionId) {
        if (versionId==HEAD) {
            vid = objId + "_" + versionId;
            return getObject(vid);

        } else {
            var vid = objId + "_" + versionId;

            var vobj =getObject(vid);
            if(!vobj){
                return null;
            }
            //有可能这只是一个链接直接指向head
            var _ver = vobj["_v"];
            if (_ver==versionId) {
                return vobj;
            } else {
                return versionObject.getObject(objId, _ver);
            }
        }
    },
    update : function(objId, jobj, userId) {
        lock(objId);
        var t = (new Date()).getTime();
        try {
            var vid = objId + "_" + CHECK_OUT;
            jobj["id"] = vid;
            jobj["lastModifyTime"] = t;
            jobj["lastModifier"] = userId;
            saveObject(vid, jobj);
            return jobj;
        } finally {
            unlock(objId);
        }
    }
}

var EventBusApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons,
    Packages.net.xinshi.isone.modules.order.ordereventbus.bean,
    Packages.net.xinshi.isone.modules.order.ordereventbus.impl,
    Packages.java.util
);

var EventBusService = {
    registerEventHandler : function(merchantId,handlerId,eventName,appId,pageId){
        var registry = {
            merchantId:merchantId,
            handlerId:handlerId,
            eventName:eventName,
            appId:appId,
            pageId:pageId,
            type:'javascript'
        }
        var bean = $.getBean("net.xinshi.isone.modules.order.ordereventbus.bean.EventHandlerRegistryBean",registry);
        EventBusApi.AdvancedEventBus.registerExtendedHandler(merchantId,eventName,handlerId,bean);
    },

    fire:function(eventName,ctx){
        var ctxMap = new EventBusApi.HashMap();
        for(k in ctx){
            ctxMap.put(k,ctx[k]);
        }
        EventBusApi.AdvancedEventBus.fire(eventName,ctxMap);
        var state = "" + ctxMap.get("state");
        if(state == "error"){
            throw "" + ctxMap.get("msg");
        }
    },

    unRegisterExtendedHandler:function(merchantId,eventName,handlerId){
        EventBusApi.AdvancedEventBus.unRegisterExtendedHandler(merchantId,eventName,handlerId);
    },
    getEventHandlers:function(merchantId){
        var handlers = EventBusApi.AdvancedEventBus.getEventHandlers(merchantId);
        return $.java2Javascript(handlers);
    },
    logEvent:function(eventName,appId,pageId,merchantId,ctx){
        assertSystem("mall");
        var entries = ctx.entrySet();
        var it = entries.iterator();
        var params = {};
        while(it.hasNext()){
            var entry = it.next();
            var k = "" + entry.getKey().toString();
            try {
                var v = entry.getValue();
                v = "" + entry.getValue().toString();
            } catch (e) {
                v = "";
            }
            params[k] = v;
        }
       
        var eventId = "systemEvt_" + getId("systemEvents");
        var now = (new Date()).getTime();
        var evt = {
            id:eventId,
            eventName:eventName,
            appId:appId,
            pageId:pageId,
            merchantId:merchantId,
            params:params,
            timestamp:now
        }
        saveObject(eventId,evt);
        var key = getRevertComparableString(now,13);
        addToList("systemEvtLogs",key,eventId);
    },
    getEvents:function(from,limit){
        return getObjects("systemEvtLogs",from,limit);
    },
    getEventsCount : function(){
        return getListSize("systemEvtLogs");
    }

};
var Base64Api = new JavaImporter(
    Packages.net.xinshi.isone.commons.Base64Coder
);
/**
 * @namespace
 * @type {Object}
 */
var Base64 = {
    /**
     * 进行base64加密
     * @param str
     * @param charset
     * @returns {string}
     */
    encode: function (str,charset) {
        if(!str){
            return "";
        }
        if(!charset){
            charset = "utf-8";
        }
        return "" + Base64Api.Base64Coder.encode(str,charset);
    },
    /**
     * 进行base64解密
     * @param str
     * @param charset
     * @returns {string}
     */
    decode: function (str,charset) {
        if(!str){
            return "";
        }
        if(!charset){
            charset = "utf-8";
        }
        return "" + Base64Api.Base64Coder.decode(str,charset);
    },
    decodeToBytes:function(s){
        return Base64Api.Base64Coder.decodeToBytes(s);
    }

};
// Underscore.js 1.4.4
// ===================

// > http://underscorejs.org
// > (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
// > Underscore may be freely distributed under the MIT license.

// Baseline setup
// --------------
(function() {

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);
function deepMerge(dest){
  _.each(_.rest(arguments), function(source){
    var sourceVal, destVal;
    for (var prop in source){
      sourceVal = source[prop];
      destVal = dest[prop];
      if (prop in dest && _.isObject(sourceVal) && _.isObject(destVal) && _.isArray(sourceVal)==false){
        deepMerge(destVal, sourceVal);
      } else {
        dest[prop] = sourceVal;
      }
    }
  });
  return dest;
}
var HttpApi = new JavaImporter(
    Packages.org.json,
    Packages.net.xinshi.isone.commons,
    Packages.org.apache.commons.codec.digest,
    Packages.org.apache.commons.lang,
    Packages.net.xinshi.isone.open.tools,
    Packages.net.xinshi.isone.open.tools
);

/**
 * @constructor
 * @type {Object}
 */
var HttpUtils = {};

/**
 *
 * @param url
 * @param xmlData
 * @returns {{code: string}}
 */
HttpUtils.soapPost = function (url, xmlData) {
    var result = {isSuccess: "false", code: "0"};
    if (!xmlData) {
        result.message = "报文信息不能为空";
        return result;
    }
    if (!url) {
        result.message = "接口地址不能为空";
        return result;
    }
    var returnResult = HttpApi.HttpUtil.soapPost(url, xmlData);
    if (!returnResult || ( returnResult && returnResult == "")) {
        result.message = "返回的报文数据为空";
    } else {
        result = returnResult + "";
    }
    return result;
};

/**
 * json排序
 * @param param
 * @returns {string}
 */
HttpUtils.sortMessage = function (param, privateKey) {
    if (!param) {
        return;
    }
    var jParam = new HttpApi.JSONObject(JSON.stringify(param));
    return HttpApi.SecureSignHelper.sortMessage(jParam, privateKey) + "";
};

/**
 * 加密参数
 * @param param
 * @returns {string}
 */
HttpUtils.md5Hex = function (param) {
    if (!param) {
        return "";
    }
    return HttpApi.DigestUtils.md5Hex(param) + "";
};

/**
 *
 * @param count
 * @param randomArgs
 * @returns {string}
 */
HttpUtils.randomStr = function (count, randomArgs) {
    return HttpApi.RandomStringUtils.random(count, randomArgs) + "";
};

/**
 * 返回JSON格式（有局限性）
 * @param url
 * @param postData
 * @returns {*}
 */
HttpUtils.postData = function (url, postData) {
    var result = {isSuccess: "false", code: "0"};
    if (!postData) {
        result.message = "报文信息不能为空";
        return result;
    }
    if (!url) {
        result.message = "接口地址不能为空";
        return result;
    }
    var jPostData = new HttpApi.JSONObject(JSON.stringify(postData));
    var returnDataStr = HttpApi.HttpUtil.post(url, jPostData);
    if (!returnDataStr || (returnDataStr && returnDataStr == "")) {
        result.message = "没有接收到返回信息";
        return result;
    } else {
        return JSON.parse(returnDataStr.toString());
    }
};

/**
 * 返回String格式
 * @param url
 * @param postData
 * @returns {string}
 */
HttpUtils.post = function (url, postData) {
    var jPostData = new HttpApi.JSONObject(JSON.stringify(postData));
    var s = HttpApi.HttpUtil.post(url, jPostData);
    if (s) {
        return s + "";
    }
    return "";
};

/**
 * 返回String格式,这个方法是上面post方法的扩展，postData参数支持多层JSON对象
 * @param url
 * @param postData
 * @returns {string}
 */
HttpUtils.postEx = function (url, postData) {
    var jPostData = new HttpApi.JSONObject(JSON.stringify(postData));
    var s = HttpApi.HttpUtil.postEx(url, jPostData);
    if (s) {
        return s + "";
    }
    return "";
};

/***
 * 增加timeout参数，允许在范围内对接
 * @param url
 * @param xmlData
 * @param timeout
 * @returns {{isSuccess: string, code: string}}
 */
HttpUtils.soapPostByTimeout = function (url, xmlData, timeout) {
    var result = {isSuccess: "false", code: "0"};
    if (typeof(xmlData) === "undefined") {
        result.message = "报文信息不能为空";
        return result;
    }
    if (!url) {
        result.message = "接口地址不能为空";
        return result;
    }
    if (!timeout) {
        timeout = 30000;
    }
    var returnResult = HttpApi.HttpUtil.soapPostByTimeout(url, xmlData, timeout);
    if (!returnResult || ( returnResult && returnResult == "")) {
        result.message = "返回的报文数据为空";
    } else {
        result = returnResult + "";
    }
    return result;
};

HttpUtils.postRaw = function (url, content, headers) {
    var jHeaders = new HttpApi.JSONObject(JSON.stringify(headers));
    return "" + HttpApi.HttpUtil.postRaw(url, content, jHeaders);
};

HttpUtils.putRaw = function (url, content, headers) {
    var jHeaders = new HttpApi.JSONObject(JSON.stringify(headers));
    return "" + HttpApi.HttpUtil.putRaw(url, content, jHeaders);
};

/**
 * 返回String格式
 * @param url
 * @param postData
 * @param timeout
 * @returns {string}
 */
HttpUtils.postByTimeout = function (url, postData, timeout) {
    if (!timeout) {
        timeout = 30000;
    }
    var jPostData = new HttpApi.JSONObject(JSON.stringify(postData));
    var s = HttpApi.HttpUtil.postByTimeout(url, jPostData, timeout);
    if (s) {
        return s + "";
    }
    return "";
};

/**
 * 返回String格式
 * @param url
 * @param postData
 * @param timeout
 * @returns {string}
 */
HttpUtils.postByTimeoutEx = function (url, postData, timeout) {
    if (!timeout) {
        timeout = 30000;
    }
    var jPostData = new HttpApi.JSONObject(JSON.stringify(postData));
    var s = HttpApi.HttpUtil.postByTimeoutEx(url, jPostData, timeout);
    if (s) {
        return s + "";
    }
    return "";
};


HttpUtils.get = function (url) {
    return "" + HttpApi.HttpUtil.get(url);
};

HttpUtils.doDelete = function (url,headers) {
  var jHeaders = new HttpApi.JSONObject(JSON.stringify(headers));
  return "" + HttpApi.HttpUtil.doDeleteEx(url,jHeaders);
};

HttpUtils.getEx = function (url) {
    return "" + HttpApi.HttpUtil.getEx(url);
};

HttpUtils.getWithHeader = function (url, headers) {
    var jHeaders = new HttpApi.JSONObject(JSON.stringify(headers));
    return "" + HttpApi.HttpUtil.getWithHeader(url, jHeaders);
};

HttpUtils.aseEncrypt = function (key, srcstring) {
    return HttpApi.AesUtils.encrypt(key, srcstring) + "";
};

HttpUtils.aseDecrypt = function (key, srcstring) {
    return HttpApi.AesUtils.decrypt(key, srcstring) + "";
};

//发送json数据
HttpUtils.doPostJson = function (url, postData) {
    return HttpApi.HttpUtil.doPostJson(url, postData) + "";
};
var JobsApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.jobs,
    Packages.net.xinshi.isone.modules.jobs.impl
);

/**
 * 与定时任务有关的方法
 * @type {{submitTask: submitTask, runNow: runNow, deleteTask: deleteTask}}
 */
var JobsService = {
    /**
     * 提交一个任务
     * @param appId
     * 执行任务的appID
     * @param pageId
     * 执行任务的页面，等到时间一到，这个页面就会被执行
     * @param runParams
     * 页面执行时候的参数，参数会作为全局变量传入页面
     * @param when
     * 以毫秒为单位的时间
     * @returns {*}
     */
    submitTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.taskRunner.submit(task, when);
    },
    /**
     * 立即执行一个任务
     * @param appId
     * @param pageId
     * @param runParams
     * @returns {*}
     */
    runNow: function (appId, pageId, runParams) {
        return JobsService.submitTask(appId, pageId, runParams, (new Date()).getTime());
    },

    /**
     * 删除一个已经提交的任务
     * @param taskId
     * @returns {*}
     */
    deleteTask: function (taskId) {
        return JobsApi.IsoneJobsEngine.taskRunner.deleteTask(taskId);
    },

    getTasks: function (number) {
        var list = JobsApi.IsoneJobsEngine.taskRunner.getTasks(number);
        return $.java2Javascript(list);
    },
    /**
     * 将task加入到执行队列里
     * @param className
     * task类名,JAVA类的全路径,不能为空
     * @param runParams
     * 执行参数
     * @param when
     * 以毫秒为单位的执行时间
     * @returns {*}
     */
    submitJavaTask: function (className, runParams, when) {
        if (!className || className == "")return;
        return JobsApi.IsoneJobsEngine.taskRunner.submitTask(className, runParams, when);
    },
    /**
     * 提交一个商品处理专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitProductTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.productTaskRunner.submit(task, when);
    },
    /**
     * 提交一个商家处理专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitMerchantTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.merchantTaskRunner.submit(task, when);
    },
    /**
     * 提交一个会员处理专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitUserTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.userTaskRunner.submit(task, when);
    },
    /**
     * 提交一个订单处理专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitOrderTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.orderTaskRunner.submit(task, when);
    },
    /**
     * 提交一个保宏对接专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitBaohongTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.baohongTaskRunner.submit(task, when);
    },
    /**
     * 提交一个O2O对接专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitO2OTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.o2oTaskRunner.submit(task, when);
    },
    /**
     * 提交一个ERP对接专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitErpTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.erpTaskRunner.submit(task, when);
    },
    /**
     * 提交一个数据导出专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitExportTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.exportTaskRunner.submit(task, when);
    },

    /**
     * 提交一个易极付对接专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitEasyExchangeTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.easyExchangeTaskRunner.submit(task, when);
    },

    /**
     * 提交一个易极付对账专有任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitEasySettlementTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.easySettlementTaskRunner.submit(task, when);
    },

    /**
     * 提交一个统计任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitStatTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.statTaskRunner.submit(task, when);
    },
    /**
     * 提交一个OMS对接任务
     * @param appId
     * @param pageId
     * @param runParams
     * @param when
     * @returns {*}
     */
    submitOmsTask: function (appId, pageId, runParams, when) {
        if (!when || !pageId || !appId) {
            return;
        }
        var params = {appId: appId, pageId: pageId};
        params.params = runParams;
        var task = new JobsApi.JavascriptTask();
        task.init(JSON.stringify(params));
        return JobsApi.IsoneJobsEngine.omsTaskRunner.submit(task, when);
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
//! moment.js
//! version : 2.12.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return Zc.apply(null,arguments)}function b(a){Zc=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Ia(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a);a._isValid=!(isNaN(a._d.getTime())||!(b.overflow<0)||b.empty||b.invalidMonth||b.invalidWeekday||b.nullInput||b.invalidFormat||b.userInvalidated),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),$c.length>0)for(c in $c)d=$c[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),_c===!1&&(_c=!0,a.updateOffset(this),_c=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function u(a,b){var c=!0;return g(function(){return c&&(t(a+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),c=!1),b.apply(this,arguments)},b)}function v(a,b){ad[a]||(t(b),ad[a]=!0)}function w(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function x(a){return"[object Object]"===Object.prototype.toString.call(a)}function y(a){var b,c;for(c in a)b=a[c],w(b)?this[c]=b:this["_"+c]=b;this._config=a,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function z(a,b){var c,d=g({},a);for(c in b)f(b,c)&&(x(a[c])&&x(b[c])?(d[c]={},g(d[c],a[c]),g(d[c],b[c])):null!=b[c]?d[c]=b[c]:delete d[c]);return d}function A(a){null!=a&&this.set(a)}function B(a){return a?a.toLowerCase().replace("_","-"):a}function C(a){for(var b,c,d,e,f=0;f<a.length;){for(e=B(a[f]).split("-"),b=e.length,c=B(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=D(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function D(a){var b=null;if(!cd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=bd._abbr,require("./locale/"+a),E(b)}catch(c){}return cd[a]}function E(a,b){var c;return a&&(c=m(b)?H(a):F(a,b),c&&(bd=c)),bd._abbr}function F(a,b){return null!==b?(b.abbr=a,null!=cd[a]?(v("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"),b=z(cd[a]._config,b)):null!=b.parentLocale&&(null!=cd[b.parentLocale]?b=z(cd[b.parentLocale]._config,b):v("parentLocaleUndefined","specified parentLocale is not defined yet")),cd[a]=new A(b),E(a),cd[a]):(delete cd[a],null)}function G(a,b){if(null!=b){var c;null!=cd[a]&&(b=z(cd[a]._config,b)),c=new A(b),c.parentLocale=cd[a],cd[a]=c,E(a)}else null!=cd[a]&&(null!=cd[a].parentLocale?cd[a]=cd[a].parentLocale:null!=cd[a]&&delete cd[a]);return cd[a]}function H(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return bd;if(!c(a)){if(b=D(a))return b;a=[a]}return C(a)}function I(){return Object.keys(cd)}function J(a,b){var c=a.toLowerCase();dd[c]=dd[c+"s"]=dd[b]=a}function K(a){return"string"==typeof a?dd[a]||dd[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)f(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(b,c){return function(d){return null!=d?(O(this,b,d),a.updateOffset(this,c),this):N(this,b)}}function N(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function O(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function P(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=K(a),w(this[a]))return this[a](b);return this}function Q(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function R(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(hd[a]=e),b&&(hd[b[0]]=function(){return Q(e.apply(this,arguments),b[1],b[2])}),c&&(hd[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function S(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function T(a){var b,c,d=a.match(ed);for(b=0,c=d.length;c>b;b++)hd[d[b]]?d[b]=hd[d[b]]:d[b]=S(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function U(a,b){return a.isValid()?(b=V(b,a.localeData()),gd[b]=gd[b]||T(b),gd[b](a)):a.localeData().invalidDate()}function V(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(fd.lastIndex=0;d>=0&&fd.test(a);)a=a.replace(fd,c),fd.lastIndex=0,d-=1;return a}function W(a,b,c){zd[a]=w(b)?b:function(a,d){return a&&c?c:b}}function X(a,b){return f(zd,a)?zd[a](b._strict,b._locale):new RegExp(Y(a))}function Y(a){return Z(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function Z(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function $(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)Ad[a[c]]=d}function _(a,b){$(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function aa(a,b,c){null!=b&&f(Ad,a)&&Ad[a](b,c._a,c,a)}function ba(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function ca(a,b){return c(this._months)?this._months[a.month()]:this._months[Kd.test(b)?"format":"standalone"][a.month()]}function da(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Kd.test(b)?"format":"standalone"][a.month()]}function ea(a,b,c){var d,e,f;for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function fa(a,b){var c;if(!a.isValid())return a;if("string"==typeof b)if(/^\d+$/.test(b))b=r(b);else if(b=a.localeData().monthsParse(b),"number"!=typeof b)return a;return c=Math.min(a.date(),ba(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ga(b){return null!=b?(fa(this,b),a.updateOffset(this,!0),this):N(this,"Month")}function ha(){return ba(this.year(),this.month())}function ia(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ka.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex}function ja(a){return this._monthsParseExact?(f(this,"_monthsRegex")||ka.call(this),a?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex}function ka(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=h([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=Z(d[b]),e[b]=Z(e[b]),f[b]=Z(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")$","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")$","i")}function la(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[Cd]<0||c[Cd]>11?Cd:c[Dd]<1||c[Dd]>ba(c[Bd],c[Cd])?Dd:c[Ed]<0||c[Ed]>24||24===c[Ed]&&(0!==c[Fd]||0!==c[Gd]||0!==c[Hd])?Ed:c[Fd]<0||c[Fd]>59?Fd:c[Gd]<0||c[Gd]>59?Gd:c[Hd]<0||c[Hd]>999?Hd:-1,j(a)._overflowDayOfYear&&(Bd>b||b>Dd)&&(b=Dd),j(a)._overflowWeeks&&-1===b&&(b=Id),j(a)._overflowWeekday&&-1===b&&(b=Jd),j(a).overflow=b),a}function ma(a){var b,c,d,e,f,g,h=a._i,i=Pd.exec(h)||Qd.exec(h);if(i){for(j(a).iso=!0,b=0,c=Sd.length;c>b;b++)if(Sd[b][1].exec(i[1])){e=Sd[b][0],d=Sd[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=Td.length;c>b;b++)if(Td[b][1].exec(i[3])){f=(i[2]||" ")+Td[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!Rd.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),Ba(a)}else a._isValid=!1}function na(b){var c=Ud.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(ma(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function oa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function pa(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function qa(a){return ra(a)?366:365}function ra(a){return a%4===0&&a%100!==0||a%400===0}function sa(){return ra(this.year())}function ta(a,b,c){var d=7+b-c,e=(7+pa(a,0,d).getUTCDay()-b)%7;return-e+d-1}function ua(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ta(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=qa(f)+j):j>qa(a)?(f=a+1,g=j-qa(a)):(f=a,g=j),{year:f,dayOfYear:g}}function va(a,b,c){var d,e,f=ta(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+wa(e,b,c)):g>wa(a.year(),b,c)?(d=g-wa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function wa(a,b,c){var d=ta(a,b,c),e=ta(a+1,b,c);return(qa(a)-d+e)/7}function xa(a,b,c){return null!=a?a:null!=b?b:c}function ya(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function za(a){var b,c,d,e,f=[];if(!a._d){for(d=ya(a),a._w&&null==a._a[Dd]&&null==a._a[Cd]&&Aa(a),a._dayOfYear&&(e=xa(a._a[Bd],d[Bd]),a._dayOfYear>qa(e)&&(j(a)._overflowDayOfYear=!0),c=pa(e,0,a._dayOfYear),a._a[Cd]=c.getUTCMonth(),a._a[Dd]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[Ed]&&0===a._a[Fd]&&0===a._a[Gd]&&0===a._a[Hd]&&(a._nextDay=!0,a._a[Ed]=0),a._d=(a._useUTC?pa:oa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Ed]=24)}}function Aa(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=xa(b.GG,a._a[Bd],va(Ja(),1,4).year),d=xa(b.W,1),e=xa(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=xa(b.gg,a._a[Bd],va(Ja(),f,g).year),d=xa(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>wa(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=ua(c,d,e,f,g),a._a[Bd]=h.year,a._dayOfYear=h.dayOfYear)}function Ba(b){if(b._f===a.ISO_8601)return void ma(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=V(b._f,b._locale).match(ed)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(X(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),hd[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),aa(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[Ed]<=12&&b._a[Ed]>0&&(j(b).bigHour=void 0),b._a[Ed]=Ca(b._locale,b._a[Ed],b._meridiem),za(b),la(b)}function Ca(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function Da(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],Ba(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function Ea(a){if(!a._d){var b=L(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),za(a)}}function Fa(a){var b=new o(la(Ga(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Ga(a){var b=a._i,e=a._f;return a._locale=a._locale||H(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(la(b)):(c(e)?Da(a):e?Ba(a):d(b)?a._d=b:Ha(a),k(a)||(a._d=null),a))}function Ha(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(+f):"string"==typeof f?na(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),za(b)):"object"==typeof f?Ea(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Ia(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,Fa(f)}function Ja(a,b,c,d){return Ia(a,b,c,d,!1)}function Ka(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Ja();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function La(){var a=[].slice.call(arguments,0);return Ka("isBefore",a)}function Ma(){var a=[].slice.call(arguments,0);return Ka("isAfter",a)}function Na(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=H(),this._bubble()}function Oa(a){return a instanceof Na}function Pa(a,b){R(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+Q(~~(a/60),2)+b+Q(~~a%60,2)})}function Qa(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(Zd)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Ra(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?+b:+Ja(b))-+e,e._d.setTime(+e._d+f),a.updateOffset(e,!1),e):Ja(b).local()}function Sa(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ta(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=Qa(wd,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Sa(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?ib(this,cb(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Sa(this):null!=b?this:NaN}function Ua(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Va(a){return this.utcOffset(0,a)}function Wa(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Sa(this),"m")),this}function Xa(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Qa(vd,this._i)),this}function Ya(a){return this.isValid()?(a=a?Ja(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function Za(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function $a(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=Ga(a),a._a){var b=a._isUTC?h(a._a):Ja(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function _a(){return this.isValid()?!this._isUTC:!1}function ab(){return this.isValid()?this._isUTC:!1}function bb(){return this.isValid()?this._isUTC&&0===this._offset:!1}function cb(a,b){var c,d,e,g=a,h=null;return Oa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=$d.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[Dd])*c,h:r(h[Ed])*c,m:r(h[Fd])*c,s:r(h[Gd])*c,ms:r(h[Hd])*c}):(h=_d.exec(a))?(c="-"===h[1]?-1:1,g={y:db(h[2],c),M:db(h[3],c),w:db(h[4],c),d:db(h[5],c),h:db(h[6],c),m:db(h[7],c),s:db(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=fb(Ja(g.from),Ja(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Na(g),Oa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function db(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function eb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function fb(a,b){var c;return a.isValid()&&b.isValid()?(b=Ra(b,a),a.isBefore(b)?c=eb(a,b):(c=eb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function gb(a){return 0>a?-1*Math.round(-1*a):Math.round(a)}function hb(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(v(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=cb(c,d),ib(this,e,a),this}}function ib(b,c,d,e){var f=c._milliseconds,g=gb(c._days),h=gb(c._months);b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(+b._d+f*d),g&&O(b,"Date",N(b,"Date")+g*d),h&&fa(b,N(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function jb(a,b){var c=a||Ja(),d=Ra(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(w(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Ja(c)))}function kb(){return new o(this)}function lb(a,b){var c=p(a)?a:Ja(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?+this>+c:+c<+this.clone().startOf(b)):!1}function mb(a,b){var c=p(a)?a:Ja(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?+c>+this:+this.clone().endOf(b)<+c):!1}function nb(a,b,c){return this.isAfter(a,c)&&this.isBefore(b,c)}function ob(a,b){var c,d=p(a)?a:Ja(a);return this.isValid()&&d.isValid()?(b=K(b||"millisecond"),"millisecond"===b?+this===+d:(c=+d,+this.clone().startOf(b)<=c&&c<=+this.clone().endOf(b))):!1}function pb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function qb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function rb(a,b,c){var d,e,f,g;return this.isValid()?(d=Ra(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=sb(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function sb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)}function tb(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function ub(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?w(Date.prototype.toISOString)?this.toDate().toISOString():U(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):U(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function vb(b){var c=U(this,b||a.defaultFormat);return this.localeData().postformat(c)}function wb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ja(a).isValid())?cb({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function xb(a){return this.from(Ja(),a)}function yb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ja(a).isValid())?cb({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function zb(a){return this.to(Ja(),a)}function Ab(a){var b;return void 0===a?this._locale._abbr:(b=H(a),null!=b&&(this._locale=b),this)}function Bb(){return this._locale}function Cb(a){switch(a=K(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function Db(a){return a=K(a),void 0===a||"millisecond"===a?this:this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")}function Eb(){return+this._d-6e4*(this._offset||0)}function Fb(){return Math.floor(+this/1e3)}function Gb(){return this._offset?new Date(+this):this._d}function Hb(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function Ib(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Jb(){return this.isValid()?this.toISOString():null}function Kb(){return k(this)}function Lb(){return g({},j(this))}function Mb(){return j(this).overflow}function Nb(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Ob(a,b){R(0,[a,a.length],0,b)}function Pb(a){return Tb.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Qb(a){return Tb.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Rb(){return wa(this.year(),1,4)}function Sb(){var a=this.localeData()._week;return wa(this.year(),a.dow,a.doy)}function Tb(a,b,c,d,e){var f;return null==a?va(this,d,e).year:(f=wa(a,d,e),b>f&&(b=f),Ub.call(this,a,b,c,d,e))}function Ub(a,b,c,d,e){var f=ua(a,b,c,d,e),g=pa(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Vb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Wb(a){return va(a,this._week.dow,this._week.doy).week}function Xb(){return this._week.dow}function Yb(){return this._week.doy}function Zb(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function $b(a){var b=va(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function _b(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function ac(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function bc(a){return this._weekdaysShort[a.day()]}function cc(a){return this._weekdaysMin[a.day()]}function dc(a,b,c){var d,e,f;for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=Ja([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function ec(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=_b(a,this.localeData()),this.add(a-b,"d")):b}function fc(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function gc(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function hc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function ic(){return this.hours()%12||12}function jc(a,b){R(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function kc(a,b){return b._meridiemParse}function lc(a){return"p"===(a+"").toLowerCase().charAt(0)}function mc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function nc(a,b){b[Hd]=r(1e3*("0."+a))}function oc(){return this._isUTC?"UTC":""}function pc(){return this._isUTC?"Coordinated Universal Time":""}function qc(a){return Ja(1e3*a)}function rc(){return Ja.apply(null,arguments).parseZone()}function sc(a,b,c){var d=this._calendar[a];return w(d)?d.call(b,c):d}function tc(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function uc(){return this._invalidDate}function vc(a){return this._ordinal.replace("%d",a)}function wc(a){return a}function xc(a,b,c,d){var e=this._relativeTime[c];return w(e)?e(a,b,c,d):e.replace(/%d/i,a)}function yc(a,b){var c=this._relativeTime[a>0?"future":"past"];return w(c)?c(b):c.replace(/%s/i,b)}function zc(a,b,c,d){var e=H(),f=h().set(d,b);return e[c](f,a)}function Ac(a,b,c,d,e){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return zc(a,b,c,e);var f,g=[];for(f=0;d>f;f++)g[f]=zc(a,f,c,e);return g}function Bc(a,b){return Ac(a,b,"months",12,"month")}function Cc(a,b){return Ac(a,b,"monthsShort",12,"month")}function Dc(a,b){return Ac(a,b,"weekdays",7,"day")}function Ec(a,b){return Ac(a,b,"weekdaysShort",7,"day")}function Fc(a,b){return Ac(a,b,"weekdaysMin",7,"day")}function Gc(){var a=this._data;return this._milliseconds=xe(this._milliseconds),this._days=xe(this._days),this._months=xe(this._months),a.milliseconds=xe(a.milliseconds),a.seconds=xe(a.seconds),a.minutes=xe(a.minutes),a.hours=xe(a.hours),a.months=xe(a.months),a.years=xe(a.years),this}function Hc(a,b,c,d){var e=cb(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function Ic(a,b){return Hc(this,a,b,1)}function Jc(a,b){return Hc(this,a,b,-1)}function Kc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Lc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Kc(Nc(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Mc(g)),h+=e,g-=Kc(Nc(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Mc(a){return 4800*a/146097}function Nc(a){return 146097*a/4800}function Oc(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Mc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Nc(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Pc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Qc(a){return function(){return this.as(a)}}function Rc(a){return a=K(a),this[a+"s"]()}function Sc(a){return function(){return this._data[a]}}function Tc(){return q(this.days()/7)}function Uc(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function Vc(a,b,c){var d=cb(a).abs(),e=Ne(d.as("s")),f=Ne(d.as("m")),g=Ne(d.as("h")),h=Ne(d.as("d")),i=Ne(d.as("M")),j=Ne(d.as("y")),k=e<Oe.s&&["s",e]||1>=f&&["m"]||f<Oe.m&&["mm",f]||1>=g&&["h"]||g<Oe.h&&["hh",g]||1>=h&&["d"]||h<Oe.d&&["dd",h]||1>=i&&["M"]||i<Oe.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,Uc.apply(null,k)}function Wc(a,b){return void 0===Oe[a]?!1:void 0===b?Oe[a]:(Oe[a]=b,!0)}function Xc(a){var b=this.localeData(),c=Vc(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function Yc(){var a,b,c,d=Pe(this._milliseconds)/1e3,e=Pe(this._days),f=Pe(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var Zc,$c=a.momentProperties=[],_c=!1,ad={};a.suppressDeprecationWarnings=!1;var bd,cd={},dd={},ed=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,fd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,gd={},hd={},id=/\d/,jd=/\d\d/,kd=/\d{3}/,ld=/\d{4}/,md=/[+-]?\d{6}/,nd=/\d\d?/,od=/\d\d\d\d?/,pd=/\d\d\d\d\d\d?/,qd=/\d{1,3}/,rd=/\d{1,4}/,sd=/[+-]?\d{1,6}/,td=/\d+/,ud=/[+-]?\d+/,vd=/Z|[+-]\d\d:?\d\d/gi,wd=/Z|[+-]\d\d(?::?\d\d)?/gi,xd=/[+-]?\d+(\.\d{1,3})?/,yd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,zd={},Ad={},Bd=0,Cd=1,Dd=2,Ed=3,Fd=4,Gd=5,Hd=6,Id=7,Jd=8;R("M",["MM",2],"Mo",function(){return this.month()+1}),R("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),R("MMMM",0,0,function(a){return this.localeData().months(this,a)}),J("month","M"),W("M",nd),W("MM",nd,jd),W("MMM",function(a,b){return b.monthsShortRegex(a)}),W("MMMM",function(a,b){return b.monthsRegex(a)}),$(["M","MM"],function(a,b){b[Cd]=r(a)-1}),$(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[Cd]=e:j(c).invalidMonth=a});var Kd=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Ld="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Md="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Nd=yd,Od=yd,Pd=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Qd=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,Rd=/Z|[+-]\d\d(?::?\d\d)?/,Sd=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],Td=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],Ud=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=u("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),R("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),R(0,["YY",2],0,function(){return this.year()%100}),R(0,["YYYY",4],0,"year"),R(0,["YYYYY",5],0,"year"),R(0,["YYYYYY",6,!0],0,"year"),J("year","y"),W("Y",ud),W("YY",nd,jd),W("YYYY",rd,ld),W("YYYYY",sd,md),W("YYYYYY",sd,md),$(["YYYYY","YYYYYY"],Bd),$("YYYY",function(b,c){c[Bd]=2===b.length?a.parseTwoDigitYear(b):r(b);
}),$("YY",function(b,c){c[Bd]=a.parseTwoDigitYear(b)}),$("Y",function(a,b){b[Bd]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var Vd=M("FullYear",!1);a.ISO_8601=function(){};var Wd=u("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Ja.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),Xd=u("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Ja.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),Yd=function(){return Date.now?Date.now():+new Date};Pa("Z",":"),Pa("ZZ",""),W("Z",wd),W("ZZ",wd),$(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Qa(wd,a)});var Zd=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var $d=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,_d=/^(-)?P(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)W)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?$/;cb.fn=Na.prototype;var ae=hb(1,"add"),be=hb(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";var ce=u("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});R(0,["gg",2],0,function(){return this.weekYear()%100}),R(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Ob("gggg","weekYear"),Ob("ggggg","weekYear"),Ob("GGGG","isoWeekYear"),Ob("GGGGG","isoWeekYear"),J("weekYear","gg"),J("isoWeekYear","GG"),W("G",ud),W("g",ud),W("GG",nd,jd),W("gg",nd,jd),W("GGGG",rd,ld),W("gggg",rd,ld),W("GGGGG",sd,md),W("ggggg",sd,md),_(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),_(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),R("Q",0,"Qo","quarter"),J("quarter","Q"),W("Q",id),$("Q",function(a,b){b[Cd]=3*(r(a)-1)}),R("w",["ww",2],"wo","week"),R("W",["WW",2],"Wo","isoWeek"),J("week","w"),J("isoWeek","W"),W("w",nd),W("ww",nd,jd),W("W",nd),W("WW",nd,jd),_(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var de={dow:0,doy:6};R("D",["DD",2],"Do","date"),J("date","D"),W("D",nd),W("DD",nd,jd),W("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),$(["D","DD"],Dd),$("Do",function(a,b){b[Dd]=r(a.match(nd)[0],10)});var ee=M("Date",!0);R("d",0,"do","day"),R("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),R("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),R("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),R("e",0,0,"weekday"),R("E",0,0,"isoWeekday"),J("day","d"),J("weekday","e"),J("isoWeekday","E"),W("d",nd),W("e",nd),W("E",nd),W("dd",yd),W("ddd",yd),W("dddd",yd),_(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),_(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var fe="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),ge="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),he="Su_Mo_Tu_We_Th_Fr_Sa".split("_");R("DDD",["DDDD",3],"DDDo","dayOfYear"),J("dayOfYear","DDD"),W("DDD",qd),W("DDDD",kd),$(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),R("H",["HH",2],0,"hour"),R("h",["hh",2],0,ic),R("hmm",0,0,function(){return""+ic.apply(this)+Q(this.minutes(),2)}),R("hmmss",0,0,function(){return""+ic.apply(this)+Q(this.minutes(),2)+Q(this.seconds(),2)}),R("Hmm",0,0,function(){return""+this.hours()+Q(this.minutes(),2)}),R("Hmmss",0,0,function(){return""+this.hours()+Q(this.minutes(),2)+Q(this.seconds(),2)}),jc("a",!0),jc("A",!1),J("hour","h"),W("a",kc),W("A",kc),W("H",nd),W("h",nd),W("HH",nd,jd),W("hh",nd,jd),W("hmm",od),W("hmmss",pd),W("Hmm",od),W("Hmmss",pd),$(["H","HH"],Ed),$(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),$(["h","hh"],function(a,b,c){b[Ed]=r(a),j(c).bigHour=!0}),$("hmm",function(a,b,c){var d=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d)),j(c).bigHour=!0}),$("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d,2)),b[Gd]=r(a.substr(e)),j(c).bigHour=!0}),$("Hmm",function(a,b,c){var d=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d))}),$("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Ed]=r(a.substr(0,d)),b[Fd]=r(a.substr(d,2)),b[Gd]=r(a.substr(e))});var ie=/[ap]\.?m?\.?/i,je=M("Hours",!0);R("m",["mm",2],0,"minute"),J("minute","m"),W("m",nd),W("mm",nd,jd),$(["m","mm"],Fd);var ke=M("Minutes",!1);R("s",["ss",2],0,"second"),J("second","s"),W("s",nd),W("ss",nd,jd),$(["s","ss"],Gd);var le=M("Seconds",!1);R("S",0,0,function(){return~~(this.millisecond()/100)}),R(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),R(0,["SSS",3],0,"millisecond"),R(0,["SSSS",4],0,function(){return 10*this.millisecond()}),R(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),R(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),R(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),R(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),R(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),J("millisecond","ms"),W("S",qd,id),W("SS",qd,jd),W("SSS",qd,kd);var me;for(me="SSSS";me.length<=9;me+="S")W(me,td);for(me="S";me.length<=9;me+="S")$(me,nc);var ne=M("Milliseconds",!1);R("z",0,0,"zoneAbbr"),R("zz",0,0,"zoneName");var oe=o.prototype;oe.add=ae,oe.calendar=jb,oe.clone=kb,oe.diff=rb,oe.endOf=Db,oe.format=vb,oe.from=wb,oe.fromNow=xb,oe.to=yb,oe.toNow=zb,oe.get=P,oe.invalidAt=Mb,oe.isAfter=lb,oe.isBefore=mb,oe.isBetween=nb,oe.isSame=ob,oe.isSameOrAfter=pb,oe.isSameOrBefore=qb,oe.isValid=Kb,oe.lang=ce,oe.locale=Ab,oe.localeData=Bb,oe.max=Xd,oe.min=Wd,oe.parsingFlags=Lb,oe.set=P,oe.startOf=Cb,oe.subtract=be,oe.toArray=Hb,oe.toObject=Ib,oe.toDate=Gb,oe.toISOString=ub,oe.toJSON=Jb,oe.toString=tb,oe.unix=Fb,oe.valueOf=Eb,oe.creationData=Nb,oe.year=Vd,oe.isLeapYear=sa,oe.weekYear=Pb,oe.isoWeekYear=Qb,oe.quarter=oe.quarters=Vb,oe.month=ga,oe.daysInMonth=ha,oe.week=oe.weeks=Zb,oe.isoWeek=oe.isoWeeks=$b,oe.weeksInYear=Sb,oe.isoWeeksInYear=Rb,oe.date=ee,oe.day=oe.days=ec,oe.weekday=fc,oe.isoWeekday=gc,oe.dayOfYear=hc,oe.hour=oe.hours=je,oe.minute=oe.minutes=ke,oe.second=oe.seconds=le,oe.millisecond=oe.milliseconds=ne,oe.utcOffset=Ta,oe.utc=Va,oe.local=Wa,oe.parseZone=Xa,oe.hasAlignedHourOffset=Ya,oe.isDST=Za,oe.isDSTShifted=$a,oe.isLocal=_a,oe.isUtcOffset=ab,oe.isUtc=bb,oe.isUTC=bb,oe.zoneAbbr=oc,oe.zoneName=pc,oe.dates=u("dates accessor is deprecated. Use date instead.",ee),oe.months=u("months accessor is deprecated. Use month instead",ga),oe.years=u("years accessor is deprecated. Use year instead",Vd),oe.zone=u("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Ua);var pe=oe,qe={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},re={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},se="Invalid date",te="%d",ue=/\d{1,2}/,ve={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},we=A.prototype;we._calendar=qe,we.calendar=sc,we._longDateFormat=re,we.longDateFormat=tc,we._invalidDate=se,we.invalidDate=uc,we._ordinal=te,we.ordinal=vc,we._ordinalParse=ue,we.preparse=wc,we.postformat=wc,we._relativeTime=ve,we.relativeTime=xc,we.pastFuture=yc,we.set=y,we.months=ca,we._months=Ld,we.monthsShort=da,we._monthsShort=Md,we.monthsParse=ea,we._monthsRegex=Od,we.monthsRegex=ja,we._monthsShortRegex=Nd,we.monthsShortRegex=ia,we.week=Wb,we._week=de,we.firstDayOfYear=Yb,we.firstDayOfWeek=Xb,we.weekdays=ac,we._weekdays=fe,we.weekdaysMin=cc,we._weekdaysMin=he,we.weekdaysShort=bc,we._weekdaysShort=ge,we.weekdaysParse=dc,we.isPM=lc,we._meridiemParse=ie,we.meridiem=mc,E("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=u("moment.lang is deprecated. Use moment.locale instead.",E),a.langData=u("moment.langData is deprecated. Use moment.localeData instead.",H);var xe=Math.abs,ye=Qc("ms"),ze=Qc("s"),Ae=Qc("m"),Be=Qc("h"),Ce=Qc("d"),De=Qc("w"),Ee=Qc("M"),Fe=Qc("y"),Ge=Sc("milliseconds"),He=Sc("seconds"),Ie=Sc("minutes"),Je=Sc("hours"),Ke=Sc("days"),Le=Sc("months"),Me=Sc("years"),Ne=Math.round,Oe={s:45,m:45,h:22,d:26,M:11},Pe=Math.abs,Qe=Na.prototype;Qe.abs=Gc,Qe.add=Ic,Qe.subtract=Jc,Qe.as=Oc,Qe.asMilliseconds=ye,Qe.asSeconds=ze,Qe.asMinutes=Ae,Qe.asHours=Be,Qe.asDays=Ce,Qe.asWeeks=De,Qe.asMonths=Ee,Qe.asYears=Fe,Qe.valueOf=Pc,Qe._bubble=Lc,Qe.get=Rc,Qe.milliseconds=Ge,Qe.seconds=He,Qe.minutes=Ie,Qe.hours=Je,Qe.days=Ke,Qe.weeks=Tc,Qe.months=Le,Qe.years=Me,Qe.humanize=Xc,Qe.toISOString=Yc,Qe.toString=Yc,Qe.toJSON=Yc,Qe.locale=Ab,Qe.localeData=Bb,Qe.toIsoString=u("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Yc),Qe.lang=ce,R("X",0,0,"unix"),R("x",0,0,"valueOf"),W("x",ud),W("X",xd),$("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),$("x",function(a,b,c){c._d=new Date(r(a))}),a.version="2.12.0",b(Ja),a.fn=pe,a.min=La,a.max=Ma,a.now=Yd,a.utc=h,a.unix=qc,a.months=Bc,a.isDate=d,a.locale=E,a.invalid=l,a.duration=cb,a.isMoment=p,a.weekdays=Dc,a.parseZone=rc,a.localeData=H,a.isDuration=Oa,a.monthsShort=Cc,a.weekdaysMin=Fc,a.defineLocale=F,a.updateLocale=G,a.locales=I,a.weekdaysShort=Ec,a.normalizeUnits=K,a.relativeTimeThreshold=Wc,a.prototype=pe;var Re=a;return Re});

function trim(s){
    if(s){
        return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
    return ""
}

var owl_shopService = (function (pigeon) {
    var objPrefix = 'owl_shop'
    var listPrefix = 'owl_shop'

    var spec = {"id":"string(12),tab:01,disabled:true;店铺Id","name":"string(16),tab:02,searchable:true;店铺名称;","mobile":"string(16),inputType:mobile,tab:03;手机","logo":"imgfileId,tab:04;店铺logo","ownerName":"string(16),tab:09,searchable:true;店主","ownerUserId":"string(16),tab:09,searchable:true;店主Id","area":"tree,tab:11,dataSource:/owlApi/region/getArea.jsx; 地区","address":"string(24),tab:10;详细地址","type":"choice,values:1_商品销售/2_工业生产/3_服务销售,listSize:14,tab:06,listTab:09;店铺类型","bankInfo":{"#meta":{"fieldLabel":"银行资料","tab":"11"},"account":"string(19),inputType:number,tab:1101;账号","bank":"string(10),tab:1102;开户行","branch":"string(10),tab:1103;支行"},"registrationInfo":{"#meta":{"fieldLabel":"工商资料","tab":"12"},"address":"string(32),inputType:numberLetter,tab:1201;注册地址","registrationNumber":"string(19),tab:1202;工商登记号","businessRange":"string(128),tab:1203;营业范围"},"admins":[{"#meta":{"fieldLabel":"管理员","tab":"11","addMulti":{"linkId":"userId","from":"id","label":"选择用户...","dataSource":"/owlApi/user/search.jsx","fields":["id","loginId","realName","nickName"],"toFields":["userId","loginId","realName","nickName"],"fieldLabels":["id","loginId","真实姓名","昵称"],"fieldWidths":[100,120,120,120]}},"userId":"linkId,dataSource:/owlApi/user/search.jsx,unique:true,fields:id/realName/nickName,toFields:userId/realName/nickName,displayField:id,fieldsWidth:100/120/120,tab:13;用户Id","loginId":"string(16),disabled:true,inputType:numberLetter,tab:14;loginId","realName":"string(16),disabled:true,tab:14;姓名","nickName":"string(16),tab:15;昵称"}],"_t":"shop","#meta":{"rem":"店铺","parent":["subplatform"],"visitType":["platform"],"projectName":"店铺","export":[{"label":"导出完整","mainTitleFormat":{"background":"#474747","color":"#cccccc"},"subTitleFormat":{"background":"#777777","color":"#ffffff"},"subRecordFormat":{"background":"#ffffff","color":"#000000"},"mainRecordFormat":{"background":"#555555","color":"#FFFFFF"},"key":"completeDoc","fields":["*"]}]}}

    var formSpecs = {"meta":{"rem":"店铺","parent":["subplatform"],"visitType":["platform"],"projectName":"店铺","export":[{"label":"导出完整","mainTitleFormat":{"background":"#474747","color":"#cccccc"},"subTitleFormat":{"background":"#777777","color":"#ffffff"},"subRecordFormat":{"background":"#ffffff","color":"#000000"},"mainRecordFormat":{"background":"#555555","color":"#FFFFFF"},"key":"completeDoc","fields":["*"]}]},"_ft":"subForm","fields":[{"fieldType":"string","fieldSize":12,"tab":"01","disabled":"true","fieldLabel":"店铺Id","_ft":"field","key":"id","origKey":"id"},{"fieldType":"string","fieldSize":16,"tab":"02","searchable":"true","fieldLabel":"店铺名称","_ft":"field","key":"name","origKey":"name"},{"fieldType":"string","fieldSize":16,"inputType":"mobile","tab":"03","fieldLabel":"手机","_ft":"field","key":"mobile","origKey":"mobile"},{"fieldType":"imgfileId","tab":"04","fieldLabel":"店铺logo","_ft":"field","key":"logo","origKey":"logo"},{"fieldType":"string","fieldSize":16,"tab":"09","searchable":"true","fieldLabel":"店主","_ft":"field","key":"ownerName","origKey":"ownerName"},{"fieldType":"string","fieldSize":16,"tab":"09","searchable":"true","fieldLabel":"店主Id","_ft":"field","key":"ownerUserId","origKey":"ownerUserId"},{"fieldType":"tree","tab":"11","dataSource":"/owlApi/region/getArea.jsx","fieldLabel":" 地区","_ft":"field","key":"area","origKey":"area"},{"fieldType":"string","fieldSize":24,"tab":"10","fieldLabel":"详细地址","_ft":"field","key":"address","origKey":"address"},{"fieldType":"choice","values":"1_商品销售/2_工业生产/3_服务销售","listSize":"14","tab":"06","listTab":"09","options":[["1","商品销售"],["2","工业生产"],["3","服务销售"]],"fieldLabel":"店铺类型","_ft":"field","key":"type","origKey":"type"},{"meta":{"fieldLabel":"银行资料","tab":"11"},"_ft":"subform","fields":[{"fieldType":"string","fieldSize":19,"inputType":"number","tab":"1101","fieldLabel":"账号","_ft":"field","key":"bankInfo.account","origKey":"account"},{"fieldType":"string","fieldSize":10,"tab":"1102","fieldLabel":"开户行","_ft":"field","key":"bankInfo.bank","origKey":"bank"},{"fieldType":"string","fieldSize":10,"tab":"1103","fieldLabel":"支行","_ft":"field","key":"bankInfo.branch","origKey":"branch"}],"tab":"11","fieldLabel":"银行资料","key":"bankInfo","origKey":"bankInfo"},{"meta":{"fieldLabel":"工商资料","tab":"12"},"_ft":"subform","fields":[{"fieldType":"string","fieldSize":32,"inputType":"numberLetter","tab":"1201","fieldLabel":"注册地址","_ft":"field","key":"registrationInfo.address","origKey":"address"},{"fieldType":"string","fieldSize":19,"tab":"1202","fieldLabel":"工商登记号","_ft":"field","key":"registrationInfo.registrationNumber","origKey":"registrationNumber"},{"fieldType":"string","fieldSize":128,"tab":"1203","fieldLabel":"营业范围","_ft":"field","key":"registrationInfo.businessRange","origKey":"businessRange"}],"tab":"12","fieldLabel":"工商资料","key":"registrationInfo","origKey":"registrationInfo"},{"meta":{"fieldLabel":"管理员","tab":"11","addMulti":{"linkId":"userId","from":"id","label":"选择用户...","dataSource":"/owlApi/user/search.jsx","fields":["id","loginId","realName","nickName"],"toFields":["userId","loginId","realName","nickName"],"fieldLabels":["id","loginId","真实姓名","昵称"],"fieldWidths":[100,120,120,120]}},"_ft":"array","fields":[{"fieldType":"linkId","dataSource":"/owlApi/user/search.jsx","unique":"true","fields":"id/realName/nickName","toFields":"userId/realName/nickName","displayField":"id","fieldsWidth":"100/120/120","tab":"13","fieldLabel":"用户Id","_ft":"field","key":"admins.userId","origKey":"userId"},{"fieldType":"string","fieldSize":16,"disabled":"true","inputType":"numberLetter","tab":"14","fieldLabel":"loginId","_ft":"field","key":"admins.loginId","origKey":"loginId"},{"fieldType":"string","fieldSize":16,"disabled":"true","tab":"14","fieldLabel":"姓名","_ft":"field","key":"admins.realName","origKey":"realName"},{"fieldType":"string","fieldSize":16,"tab":"15","fieldLabel":"昵称","_ft":"field","key":"admins.nickName","origKey":"nickName"}],"tab":"11","fieldLabel":"管理员","key":"admins","origKey":"admins"}],"tab":"99","fieldLabel":"请完善资料"}

    var flattenedSpecs = {"mainFields":[{"fieldType":"string","fieldSize":12,"tab":"01","disabled":"true","fieldLabel":"店铺Id","_ft":"field","key":"id","origKey":"id"},{"fieldType":"string","fieldSize":16,"tab":"02","searchable":"true","fieldLabel":"店铺名称","_ft":"field","key":"name","origKey":"name"},{"fieldType":"string","fieldSize":16,"inputType":"mobile","tab":"03","fieldLabel":"手机","_ft":"field","key":"mobile","origKey":"mobile"},{"fieldType":"imgfileId","tab":"04","fieldLabel":"店铺logo","_ft":"field","key":"logo","origKey":"logo"},{"fieldType":"string","fieldSize":16,"tab":"09","searchable":"true","fieldLabel":"店主","_ft":"field","key":"ownerName","origKey":"ownerName"},{"fieldType":"string","fieldSize":16,"tab":"09","searchable":"true","fieldLabel":"店主Id","_ft":"field","key":"ownerUserId","origKey":"ownerUserId"},{"fieldType":"choice","values":"1_商品销售/2_工业生产/3_服务销售","listSize":"14","tab":"06","listTab":"09","options":[["1","商品销售"],["2","工业生产"],["3","服务销售"]],"fieldLabel":"店铺类型","_ft":"field","key":"type","origKey":"type"},{"fieldType":"string","fieldSize":24,"tab":"10","fieldLabel":"详细地址","_ft":"field","key":"address","origKey":"address"},{"fieldType":"tree","tab":"11","dataSource":"/owlApi/region/getArea.jsx","fieldLabel":" 地区","_ft":"field","key":"area","origKey":"area"},{"fieldType":"string","fieldSize":19,"inputType":"number","tab":"1101","fieldLabel":"账号","_ft":"field","key":"bankInfo.account","origKey":"account"},{"fieldType":"string","fieldSize":10,"tab":"1102","fieldLabel":"开户行","_ft":"field","key":"bankInfo.bank","origKey":"bank"},{"fieldType":"string","fieldSize":10,"tab":"1103","fieldLabel":"支行","_ft":"field","key":"bankInfo.branch","origKey":"branch"},{"fieldType":"string","fieldSize":32,"inputType":"numberLetter","tab":"1201","fieldLabel":"注册地址","_ft":"field","key":"registrationInfo.address","origKey":"address"},{"fieldType":"string","fieldSize":19,"tab":"1202","fieldLabel":"工商登记号","_ft":"field","key":"registrationInfo.registrationNumber","origKey":"registrationNumber"},{"fieldType":"string","fieldSize":128,"tab":"1203","fieldLabel":"营业范围","_ft":"field","key":"registrationInfo.businessRange","origKey":"businessRange"}],"details":[{"name":"admins","fields":[{"fieldType":"string","fieldSize":16,"disabled":"true","inputType":"numberLetter","tab":"14","fieldLabel":"loginId","_ft":"field","key":"admins.loginId","origKey":"loginId"},{"fieldType":"string","fieldSize":16,"disabled":"true","tab":"14","fieldLabel":"姓名","_ft":"field","key":"admins.realName","origKey":"realName"},{"fieldType":"string","fieldSize":16,"tab":"15","fieldLabel":"昵称","_ft":"field","key":"admins.nickName","origKey":"nickName"}]}]}

    var idFunc = null
    var lockFunc = null

    var f = {
        /**
         * 添加
         */
        getId: function (data) {
            //默认实现是直接返回一个递增的Id
            //其他实现方式包括从data中获取数据构造出一个Id

            //undefined
            if (idFunc) {
                return objPrefix + '_' + idFunc(data)
            }
            else {
                var seq = pigeon.getId(objPrefix)
                return objPrefix + '_' + seq
            }
        },

        getLock: function (data) {
            //undefined
            if (lockFunc) {
                return lockFunc(data)
            }
            else {
                return data['id']
            }
        },


        getAllListName: function (data) {
            return listPrefix + '_all'
        },

        getValue: function (fullkey, data) {
            var path = fullkey.split('.')
            var curData = data
            for (var i = 0; i < path.length; i++) {
                var curKey = path[i]
                if (typeof(curData) == 'object' && curData != null) {
                    curData = curData[curKey]
                }
                else {
                    return null
                }
            }
            return curData
        },

        setValue: function (fullkey, value, data) {
            var path = fullkey.split('.')
            var curData = data
            var objPath = [data]
            for (var i = 0; i < path.length; i++) {
                var curKey = path[i]
                if (i == path.length - 1) {
                    curData[curKey] = value
                    return
                }

                var subData = curData[curKey]
                if (!subData) {
                    curData[curKey] = value
                    return
                }
                curData = subData
            }

        },

        getEnvValue: function (v, env) {
            if (!v) {
                return v
            }
            if (v.indexOf('$') == 0) {
                var fullkey = v.substring(1)
                return f.getValue(fullkey, env)
            }
            return v
        },



        getUniqueObj:function(key,value){
            var pigeonKey = objPrefix+ '_' + key + '_' + DigestUtil.md5(value)
            var obj = pigeon.getObject(pigeonKey);
            if(obj==null){
                return null;
            }
            var id = obj.id;
            return pigeon.getObject(id);
        },

        isDuplicated: function (id, key, value) {
            var pigeonKey = objPrefix + '_' + key + '_' + DigestUtil.md5(value)
            var obj = pigeon.getObject(pigeonKey);
            if (obj == null) {
                return false
            }
            if (obj.id === id) {
                return false
            }
            return true
        },

        saveUniqueValue: function (objId, key, value) {
            var md5 = DigestUtil.md5(value)
            var pigeonKey = objPrefix + '_' + key + '_' + md5
            var obj = {
                id: objId,
                key: key,
                value: value,
                md5: md5,
            }
            pigeon.saveObject(pigeonKey, obj)
        },

        removeUniqueValue: function (id, key, value) {
            var md5 = DigestUtil.md5(value)
            var pigeonKey = objPrefix + '_' + key + '_' + md5
            pigeon.saveObject(pigeonKey, null)
        },

        validate: function (data, env) {
            //TODO:需要实现validate 服务器端
            var fields = flattenedSpecs.mainFields
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i]
                var value = f.getValue(field.key, data)
                if (!value || (typeof(value) == 'string' && value.indexOf('$') == 0)) {
                    value = f.getEnvValue(field.defaultValue, env)
                    if (value) {
                        f.setValue(field.key, value, data)
                    }
                }
                if (!value && field.required == 'true') {
                    throw {'state': 'err', msg: field.fieldLabel + '不能为空。', code: 'required'}
                }
                //对于unique的字段，检查有没有重复
                if (field.unique === 'true') {
                    if (f.isDuplicated(data.id, field.key, value)) {
                        throw {'state': 'err', msg: field.fieldLabel + '不能重复。' + value, code: 'duplicated'}
                    }
                }
            }
            return {'state': 'ok'}
        },

        saveUniqueFields: function (data, env) {
            var fields = flattenedSpecs.mainFields
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i]
                //对于unique的字段，检查有没有重复
                if (field.unique === 'true') {
                    var value = f.getValue(field.key, data)
                    if (!value || (typeof(value) == 'string' && value.indexOf('$') == 0)) {
                        value = f.getEnvValue(field.defaultValue, env)
                        if (value) {
                            f.setValue(field.key, value, data)
                        }
                    }
                    if (!value && field.required == 'true') {
                        throw {'state': 'err', msg: field.fieldLabel + '不能为空。', code: 'required'}
                    }

                    if (f.isDuplicated(data.id, field.key, value)) {
                        throw {'state': 'err', msg: field.fieldLabel + '不能重复。', code: 'duplicated'}
                    }

                    //对于没有重复的数据，保存起来
                    f.saveUniqueValue(data.id, field.key, value)
                }


            }
        },

        removeUniqueFields: function (data, env) {
            var fields = flattenedSpecs.mainFields
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i]
                //对于unique的字段，检查有没有重复
                if (field.unique === 'true') {
                    var value = f.getValue(field.key, data)
                    if (!value || (typeof(value) == 'string' && value.indexOf('$') == 0)) {
                        value = f.getEnvValue(field.defaultValue, env)
                        if (value) {
                            f.setValue(field.key, value, data)
                        }
                    }

                    //对于没有重复的数据，保存起来
                    f.removeUniqueValue(data.id, field.key, value)
                }


            }
        },

        addToList: function (data) {
            var key = pigeon.getRKey(data['_createTime'], 13)
            pigeon.addToList(f.getAllListName(), key, data.id)

            var t = data['_createTime']
            var d = new Date(t)
            var year = d.getFullYear()
            var month = d.getMonth() + 1
            var day = d.getDate()

            var listName = listPrefix + '_' + year + '_' + month + '_' + day

            pigeon.addToList(listName, key, data.id)
            //如果这里有子系统的Id则加入子系统list
            if (data['subplatformId']) {
                var listName = listPrefix + '_' + data['subplatformId']
                pigeon.addToList(listName, key, data.id)
            }

            //如果这里有店铺id,则加入店铺list
            if (data['shopId']) {
                var listName = listPrefix + '_' + data['shopId']
                pigeon.addToList(listName, key, data.id)
            }
        },

        tranverseFields: function (formSpec, callback, ctx) {
            formSpec.fields.forEach(function (field) {
                if (field['_ft'] == 'field') {
                    callback(field, ctx)
                }
                else if (field['_ft'] == 'subform') {
                    var context = {parentField: field}
                    f.tranverseFields(field, callback, context)
                }
                else if (field['_ft'] == 'array') {
                    var context = {parentField: field}
                    f.tranverseFields(field, callback, context)
                }
            })
        },

        normalizeValue: function (value, spec) {
            if (value == null) {
                return null
            }
            switch (spec.fieldType) {
                case 'string':
                    return value + ''
                case 'number':
                    if (isNaN(value)) {
                        return null
                    }
                    else {
                        value = Number(value)
                        return value
                    }
                case 'date':
                    return moment(value)
                case 'choice':
                    return value
                default:
                    return value
            }
        },


        getNormalizedDoc: function (data) {
            var obj = JSON.parse(JSON.stringify(data))
            f.tranverseFields(formSpecs, function (field, ctx) {
                if (ctx.parentField && ctx.parentField._ft == 'array') {
                    var items = f.getValue(ctx.parentField.key, obj)
                    if (items) {
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i]
                            var value = item[field.origKey]
                            value = f.normalizeValue(value, field)
                            item[field.origKey] = value
                        }
                    }
                }
                else {
                    var value = f.getValue(field.key, obj)
                    value = f.normalizeValue(value, field)
                    f.setValue(field.key, value, obj)
                }
            }, {})
            return obj
        },

        index: function (doc) {
            var data = f.getNormalizedDoc(doc)
            var m = []
            m.push(data.m)
            if (data['subplatformId']) {
                m.push(data['subplatformId'])
            }
            if (data['shopId']) {
                m.push(data['shopId'])
            }
            data._m = m
            var elasticSearchUrl = $.getEnv('elasticSearchUrl')

            var headers = {'Content-Type': 'application/json;charset=utf-8'}
            var elasticSearchUser = $.getEnv('elasticSearchUser')
            var elasticSearchPass = $.getEnv('elasticSearchPass')
            if (elasticSearchUser && elasticSearchPass) {
                var auth = Base64.encode(elasticSearchUser + ':' + elasticSearchPass)
                var basicAuth = 'Basic ' + auth
                headers['Authorization'] = basicAuth
            }
            var searchUrl = elasticSearchUrl + '/owl_shop/allinone/' + data.id
            var sndTxt = JSON.stringify(data)
            var s = HttpUtils.postRaw(searchUrl, sndTxt, headers)
            s = JSON.parse(s)
            if (!s.result) {
                $.log(data.id + ',index error:' + JSON.stringify(s))
            }
            else {
                $.log('index ok...')
            }
        },

        add: function (data, env) {
            env = env || {}
            f.validate(data, env)
            data.id = f.getId(data)
            data['_createTime'] = new Date().getTime()
            data['_v'] = 0
            data['_t'] = spec['_t']
            try {
                pigeon.lock(f.getLock(data))
                EventBusService.fire(spec['_t'] + '_add_before', {data: data, env: env})
                pigeon.saveObject(data.id, data)
                f.saveUniqueFields(data, env)
                f.addToList(data)
                f.index(data)
                EventBusService.fire(spec['_t'] + '_add_after', {data: data, env: env})
                return data
            }
            finally {
                pigeon.unlock(f.getLock(data))
            }

        },

        get: function (id) {
            return pigeon.getObject(id)
        },

        saveTempData: function (key, data) {
            return pigeon.saveObject(objPrefix + key, data)

        },

        getTempData: function (key) {
            return pigeon.getObject(objPrefix + key)
        },

        getObjects: function (ids) {
            return pigeon.getObjects(ids)
        },

        update: function (data, env) {
            env = env || {}
            var id = data.id

            try {
                pigeon.lock(f.getLock(data))
                var obj = f.get(data.id)
                if (!obj) {
                    throw {msg: '对象不存在!id=' + data.id, code: 'notFound'}
                }
                if (obj._v != data._v) {
                    throw {code: 'concurrentupdate', msg: '对象已经修改过，本次修改被拒绝。old._v=' + obj._v + ',new._v=' + data._v}
                }
                var oldObj = JSON.parse(JSON.stringify(obj))
                //深度合并
                //obj = deepMerge(obj,data);//深度合并会引起 编辑出现bug
                obj = data
                obj['_v'] = obj['_v'] + 1
                f.validate(obj, env)
                data._v = obj._v
                EventBusService.fire(spec['_t'] + '_update_before', {old: oldObj, data: obj, env: env})
                f.addToList(obj)
                f.removeUniqueFields(oldObj, env)
                pigeon.saveObject(id, obj)
                f.saveUniqueFields(data, env)
                f.index(obj)
                EventBusService.fire(spec['_t'] + '_update_after', {old: oldObj, data: obj, env: env})
                return data
            }
            finally {
                pigeon.unlock(f.getLock(data))
            }
        },

        del: function (id) {
            //只做软删除
            var data = f.get(id)
            if (!data) {
                throw '对象不存在!id=' + id
            }
            var key = pigeon.getRKey(data['_createTime'], 13)
            pigeon.deleteFromList(f.getAllListName(), key, id)
            if (data['subplatformId']) {
                var listName = listPrefix + '_' + data['subplatformId']
                pigeon.deleteFromList(listName, key, id)
            }

            //如果这里有店铺id,则加入店铺list
            if (data['shopId']) {
                var listName = listPrefix + '_' + data['shopId']
                pigeon.deleteFromList(listName, key, id)
            }

            var t = data['_createTime']
            var d = new Date(t)
            var year = d.getFullYear()
            var month = d.getMonth() + 1
            var day = d.getDate()

            var listName = listPrefix + '_' + year + '_' + month + '_' + day

            EventBusService.fire(spec['_t'] + '_delete_before', {data: data})
            pigeon.deleteFromList(listName, key, id)

            var deletedList = listPrefix + '_deleted'
            pigeon.addToList(deletedList, key, id)
            data.del = 'T'
            f.index(data)
            pigeon.saveObject(data.id, data)
            f.removeUniqueFields(data, {})

            EventBusService.fire(spec['_t'] + '_delete_after', {data: data})
        },
        getList: function (listName, start, limit) {
            if (!listName) {
                return null
            }
            if (!start) {
                start = 0
            }
            if (!limit) {
                limit = 10
            }
            return pigeon.getListObjects(listName, start, limit)
        },

        getExportRunningList: function () {
            return listPrefix + '_exportRunning'
        },

        getExportFinishedList: function () {
            return listPrefix + '_exportFinished'
        },

        addExportTask: function (query, env) {
            var now = new Date().getTime()
            var taskInfo = {
                loginUser: f.getEnvValue('$loginUser', env),
                submitTime: now,
                startTime: 0,
                processState: 'processing',
                percent: 0,
                _v: 0,
            }
            //这个key如果不多加一个export，会把原有的单据数据覆盖
            var taskInfoId = objPrefix + '_export_' + pigeon.getId()
            var taskId = JobsService.submitExportTask('owl_shop', 'tasks/export.jsx', {
                query: query,
                env: env,
                taskInfoId: taskInfoId,
            }, now)
            taskInfo.taskId = '' + taskId
            taskInfo.id = taskInfoId
            var key = pigeon.getRKey(taskInfo.submitTime, 13)
            pigeon.addToList(f.getExportRunningList(), key, taskInfoId)
            pigeon.saveObject(taskInfoId, taskInfo)

            return taskInfoId
        },

        addDocExportTask: function (docId, env) {
            var now = new Date().getTime()
            var taskInfo = {
                loginUser: f.getEnvValue('$loginUser', env),
                submitTime: now,
                startTime: 0,
                processState: 'processing',
                percent: 0,
                total: 1,
                _v: 0,
            }
            //这个key如果不多加一个export，会把原有的单据数据覆盖
            var taskInfoId = objPrefix + '_export_' + pigeon.getId()
            var taskId = JobsService.submitExportTask('owl_shop', 'tasks/exportDoc.jsx', {
                id: docId,
                env: env,
                taskInfoId: taskInfoId,
            }, now)
            taskInfo.taskId = '' + taskId
            taskInfo.id = taskInfoId
            var key = pigeon.getRKey(taskInfo.submitTime, 13)
            pigeon.addToList(f.getExportRunningList(), key, taskInfoId)
            pigeon.saveObject(taskInfoId, taskInfo)

            return taskInfoId
        },

        getExportTaskInfo: function (taskInfoId) {
            return pigeon.getObject(taskInfoId)
        },

        updateExportTaskInfo: function (taskInfoId, taskInfo) {
            var oInfo = f.getExportTaskInfo(taskInfoId)
            if (oInfo._v == taskInfo._v) {
                taskInfo._v += 1
                pigeon.saveObject(taskInfoId, taskInfo)
            }
        },


        reindexAll: function () {
            var listName = f.getAllListName()
            var count = pigeon.getListSize(listName)
            var pos = 0
            while (count > 0) {
                var indexCount = 2000
                if (indexCount > count) {
                    indexCount = count
                }
                var objs = pigeon.getListObjects(listName, pos, indexCount)
                objs.forEach(function (data) {
                    try {
                        f.index(data)
                    } catch (e) {
                        $.log('重建索引异常:' + data.id)
                    }
                })
                pos += indexCount
                count -= indexCount
            }
        },
        search:function(m, searchArgs, keyword,from, pageSize, sort){
            //生成filters
            delete searchArgs.keyword;
            var filters = [];
            for(var k in searchArgs){
                var v = searchArgs[k];
                if(typeof(v)=='object' && Array.isArray(v)){
                    var range={}
                    range[k] = {
                        'gte':v[0],
                        'lte':v[1]
                    }
                    filters.push({range:range});
                }
                else{
                    var term = {};
                    if(v){
                        term[k+".keyword"] = trim('' + v)
                        filters.push({term:term})
                    }

                }
            }

            if(m !== '0'){
                filters = filters.concat([
                    {"term": { "_m.keyword": m }},
                    {"term":{"_t":spec["_t"]}}
                ]);
            }
            else{
                //如果m === '0'，代表是平台
                filters = filters.concat([
                    {"term":{"_t":spec["_t"]}}
                ]);
            }

            //getKeyword query
            var keywordQuery = "";
            if(keyword && trim(keyword).length>0){
                keywordQuery = "\"" + trim(keyword) + "\""
            }
            else{
                keywordQuery = "*"
            }

            var effectiveSort = [{_createTime:{order:"desc"}}];
            if(sort){
                effectiveSort = sort;
            }

            var query = {
                "query": {
                    "bool": {
                        "must": {
                            "query_string": {
                                "query":keywordQuery
                            }
                        },
                        "must_not": {
                            "match": {
                                "del": "T"
                            }
                        },
                        "filter": filters
                    }
                },
                "from" : from, "size" : pageSize,
                sort:effectiveSort
            }

            var elasticSearchUrl = $.getEnv( "elasticSearchUrl" );

            var headers = { "Content-Type": "application/json;charset=utf-8" };
            var elasticSearchUser = $.getEnv("elasticSearchUser");
            var elasticSearchPass = $.getEnv("elasticSearchPass");
            if(elasticSearchUser && elasticSearchPass){
                var auth =Base64.encode(elasticSearchUser + ":" + elasticSearchPass);
                var basicAuth = "Basic " + auth;
                headers["Authorization"] = basicAuth;
            }
            var searchUrl = elasticSearchUrl+"/owl_shop/_search";

            var sndTxt = JSON.stringify(query);


            var s = HttpUtils.postRaw( searchUrl, sndTxt, headers);
            var result = JSON.parse(s);

            var hits = result.hits.hits;
            var total = result.hits.total;

            var objs = hits.map(function(hit){return hit._source});


            var ret = {
                state:'ok',
                list:objs,
                total:total
            }

            return ret;

        }
    }
    return f
})(pigeon_1);
var selfApi = new JavaImporter(
    Packages.net.xinshi.isone.modules.user,
    Packages.net.xinshi.isone.commons
);
(function () {
    var result = {"code": "0"};
    var shopId = $.params["shopId"];
    var loginId = $.params["loginId"];

    if(shopId!='0'){
        var shop = owl_shopService.get(shopId);
        if (!shop) {
            result.code = "300";
            result.msg = "系统不存在【" + shopId + "】的店铺信息";
            out.print(JSON.stringify(result));
            return;
        }
    }

    loginId = decrypt(loginId, request);
    var user = UserService.getUserByKey(loginId);
    if (!user) {
        result.code = "301";
        result.msg = "登录账户不存在";
        out.print(JSON.stringify(result));
        return;
    }
    var isEnable = selfApi.LoginUtil.isEnable($.toJavaJSONObject(user));
    if (isEnable != true) {
        result.code = "302";
        result.msg = "用户未激活";
        out.print(JSON.stringify(result));
        return;
    }
    if (user.id !== "u_0") {
        var admins = shop.admins;
        if (!admins) {
            result.code = "303";
            result.msg = "店铺未设置管理员";
            out.print(JSON.stringify(result));
            return;
        }
        if (!verifyAdmin(admins, user.id)) {
            result.code = "304";
            result.msg = "账号【" + loginId + "】不存在店铺【" + shopId + "】中";
            out.print(JSON.stringify(result));
            return;
        }
    }

    out.print(JSON.stringify(result));
}());

function verifyAdmin(admins, userId) {
    return admins.some(function (admin) {
        return userId === admin.userId;
    });
}

function decrypt(data, request) {
    var backendLoginSessionId = SessionService.getSessionValue("backendLoginSessionId", request);
    var key = backendLoginSessionId.substring(0, 16);
    var iv = backendLoginSessionId.substring(backendLoginSessionId.length - 16);
    return selfApi.AESEncryptUtil.decrypt(data, key, iv);
}
