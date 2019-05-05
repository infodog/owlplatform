var WeixinUtil = {};
WeixinUtil.api = new JavaImporter(
    Packages.net.xinshi.isone.commons,
);

WeixinUtil.decrypt = function(encrypted,session_key,iv){
    return WeinxinUtil.api.WeixinUtil.decrypt(encrypted,session_key,iv);
}