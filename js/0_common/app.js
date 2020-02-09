/*-------------所有可能加载的脚本--------------*/
require.config({
    paths: {
        "jquery": ["../js/0_common/jquery.min"],
        "bootstrap": ["../js/0_common/bootstrap.min"],
        "bootstrap-table": ["../js/0_common/bootstrap-table"],
        "bootstrap-table-export": ["../js/0_common/bootstrap-table-export"],
        "tableExport": ["../js/0_common/tableExport"],
        "echarts": ["../js/0_common/echarts2"],
        "echarts2": ["../js/0_common/echarts-all"],//["../assets/js/common/echarts-all"],
        "leaflet": ["../js/0_common/common/leaflet"],
        "jquery.cookie": ["../js/0_common/jquery.cookie"],
        "transformMap": ["../js/0_common/transformMap"],
        "fileinput": ["../js/0_common/fileinput.min"],
        "bootstrap-select": ["../js/0_common/bootstrap-select.min"],
        "fileinput_locale_zh": ["../js/0_common/fileinput_locale_zh"],
        "bootstrap-datetimepicker": ["../js/0_common/bootstrap-datetimepicker.min"],
        "bootstrap-datetimepicker.zh-CN": ["../js/0_common/bootstrap-datetimepicker.zh-CN"],
        "bootstrap-table-zh-cn": ["../js/0_common/bootstrap-table-zh-cn"],
        "bootstrap-table-editable": ["../js/0_common/bootstrap-table-editable"],
        "ztree": ["../js/0_common/jquery.ztree.all.min"],
        "sea": ["http://qidian.gtimg.com/lulu/theme/modern/js/plugin/sea"],
         
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery']
        },
        'bootstrap-table': {
            deps: ['bootstrap']
        },
        'bootstrap-table-zh-cn': {
            deps: ['bootstrap-table']
        },
        'bootstrap-table-editable': {
            deps: ['bootstrap-table']
        },
        'bootstrap-editable': {
            deps: ['bootstrap']
        },
        "validationengine-en": {
            deps: ['jquery']
        },
        "validationengine": {
            deps: ['jquery']
        },
        "jquery-ui-timepicker-addon": {
            deps: ['jquery']
        },
        'jquery.cookie': {
            deps: ['jquery']
        },
        'print': {
            deps: ['jquery']
        },
        'bootstrap-datetimepicker': {
            deps: ['bootstrap']
        },
        "bootstrap-datetimepicker.zh-CN": {
            deps: ['bootstrap-datetimepicker']
        },
        fileinput: {
            deps: ['bootstrap']
        },
        fileinput_locale_zh: {
            deps: ['fileinput']
        },
        "echarts": {
            deps: ['jquery']
        },
        "echarts2": {
            deps: ['jquery']
        },
        'markercluster-src': {
            deps: ['leaflet'],
        },
        "bootstrap-select": {
            deps: ['bootstrap']
        },
        'subgroup-src': {
            deps: ['jquery'],
            exports: 'subgroup-src'
        },
        'jqpaginator': {
            deps: ['jquery']
        },
        'bootstrap-table-key-events': {
            deps: ['bootstrap-table']
        },
        'bootstrap-table-export': {
            deps: ['bootstrap-table']
        },
        'tableExport': {
            deps: ['bootstrap-table']
        },
        'baguettebox': {
            deps: ['jquery']
        },
        leaflet: {
            exports: 'leaflet'
        },
        "leaflet-src": {
            deps: ['leaflet']
        },
        "esri-leaflet": {
            deps: ['leaflet']
        },
        "ztree": {
            deps: ['jquery']
        },
        "sea": {
            deps: ['jquery']
        },
    }
})


/*---------------接口地址----------------*/
//脚本里用到的所有的转发连接都放在这里
var svcHeader = (window.location.protocol ? (window.location.protocol + "//")
		: "")
		+ window.location.host;
var SVC_SYS = "http://jrweixin.zj96296.com:18017/JRCivilizationService/Operation.svc/"// svcHeader + "/WJCService/System.svc";
var SVC_XTGL = "http://jrweixin.zj96296.com:18017/JRCivilizationService/Manage.svc";
var SVC_DZTZ = "http://jrweixin.zj96296.com:18017/JRCivilizationService/Ledger.svc/";
var SVC_MAP = "http://jrweixin.zj96296.com:18017/JRCivilizationService/Evaluation.svc";
var SVC_WLXC = "http://jrweixin.zj96296.com:18017/JRCivilizationService/Propagate.svc";
var SVC_UPLOAD = "http://jrweixin.zj96296.com:18017/JRCivilizationService/Methods";
var svcHeader = "http://jrweixin.zj96296.com:18006";
//var svc_sys = svcHeader + "/JRPartyService/Party.svc";
//var svc_uoload = svcHeader + "/JRPartyService/Data";
var svc_sys =svcHeader + "/JRPartyService/Party.svc";
// var svc_sys =svcHeader 
var svc_system = svcHeader +"/JRPartyService/System.svc";
var svc_dynamic =svcHeader + "/JRPartyService/Dynamic.svc"; 
var svc_tv = "http://122.97.218.162:18106/JRPartyService/JRPartyScreenshot/";
var svc_PhotoTake = svcHeader +"/JRPartyService/Upload/PhotoTake/"; 
var svc_PosProcess = svcHeader +"/JRPartyService/Upload/PosProcess/"; 
var svc_uoload = svcHeader + "/JRPartyService/Data";
var svc_file = svcHeader + "/JRPartyService/Upload/Activity/";
var svc_position = svcHeader + "/JRPartyService/Position.svc";
var svc_tissue = svcHeader + "/JRPartyService/Tissue.svc";
var svc_team = svcHeader + "/JRPartyService/Team.svc";
var svc_regime = svcHeader + "/JRPartyService/Regime.svc";
var svc_brand = svcHeader + "/JRPartyService/Brand.svc";
var svc_inform = svcHeader + "/JRPartyService/Information.svc";
var svc_check = svcHeader + "/JRPartyService/Examine.svc";

/*----------------集成方法---------------*/
//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
/*加载公共模块*/
var loadCommonModule = function (module) {
    $.ajax({
        url: SVC_SYS + "/getUserAuthority",
        data: {
            id: $.cookie("JTZH_userID"),
            districtID: $.cookie("JTZH_districtID"),
        },
        success: function (data) {
            var str = '';
            var strc = '';
            var strm = '';
            var strd = '';
            var strs = '';
            var strs2 = '';
            var stra = '';
            for (var i in data.data.module) { 
                if (data.data.module[i].isControl == true) { 
                    if (data.data.module[i].moduleName == "电子地图") {
                        strm = strm + ' <li class="menuItem removes"id="nav_map"onclick="ChangeUrl(\'' + '../2_map/map.html' + '\')"><a href="#" class="subItem"> 电子地图</a></li>';
                    }
                    if (data.data.module[i].moduleName == "企业管理") {
                        strc = strc + '<li class="menuItem"id="nav_company"onclick="ChangeUrl(\'' + '../3_company/company.html' + '\')"><a href="#" class="subItem"> 企业管理</a></li>' ; 
                    } 
                    if (data.data.module[i].moduleName == "设备管理") {
                        strd = strd + '<li class="menuItem"id="nav_device"onclick="ChangeUrl(\'' + '../1_device/device.html' + '\')" ><a href="#"class="subItem"> 设备管理</a></li>';
                    }
                    if (data.data.module[i].moduleName == "统计管理") {
                        stra = stra + '<li class="dropdown menuItem" id="nav_statistics">' +
                        '<a href="#" class="dropdown-toggle subItem" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">统计管理<span class="caret"></span></a>' +
                        '<ul class="dropdown-menu" style="color:black">' +
                           ' <li><a href="#"onclick="ChangeUrl(\'' + '../4_statistics/district_statistics.html' + '\')" style="color:black">区域统计</a></li>' +
                           ' <li><a href="#"onclick="ChangeUrl(\'' + '../4_statistics/type_statistics.html' + '\')" style="color:black">类型统计</a></li>' +
                            '<li><a href="#"onclick="ChangeUrl(\'' + '../4_statistics/functionary_statistics.html' + '\')" style="color:black">责任人统计</a></li>' +
                           ' <li><a href="#"onclick="ChangeUrl(\'' + '../4_statistics/browse_statistics.html' + '\')" style="color:black">浏览情况统计</a></li>' +
                       ' </ul>' +
                   ' </li>';
                    }
                    if (data.data.module[i].moduleName == "运维管理") {
                        if (data.data.module[i].subAuthority.length > 1) {
                            for (var j in data.data.module[i].subAuthority) {
                                if (data.data.module[i].subAuthority[j].isControl == true && data.data.module[i].subAuthority[j].authorityName == '区域管理') {
                                    strs2 = strs2 + '<li><a  href="#" style="color:black" onclick="ChangeUrl(\'' + '../5_system/district.html' + '\')">区域管理</a></li>';
                                } else if (data.data.module[i].subAuthority[j].isControl == true && data.data.module[i].subAuthority[j].authorityName == '标注管理') {
                                    strs2 = strs2 + '<li><a  href="#" style="color:black" onclick="ChangeUrl(\'' + '../5_system/mark.html' + '\')">标注管理</a></li>'
                                } else if (data.data.module[i].subAuthority[j].isControl == true && data.data.module[i].subAuthority[j].authorityName == '监控用户组') {
                                    strs2 = strs2 + '<li ><a href="#" style="color:black"onclick="ChangeUrl(\'' + '../5_system/cameraUser.html' + '\')">监控用户组</a></li>'
                                } else if (data.data.module[i].subAuthority[j].isControl == true && data.data.module[i].subAuthority[j].authorityName == '系统用户管理') {
                                    strs2 = strs2 + '<li ><a href="#" style="color:black"onclick="ChangeUrl(\'' + '../5_system/user.html' + '\')">系统用户管理</a></li>'
                                } else if (data.data.module[i].subAuthority[j].isControl == true && data.data.module[i].subAuthority[j].authorityName == '角色管理') {
                                    strs2 = strs2 + '<li ><a href="#" style="color:black"onclick="ChangeUrl(\'' + '../5_system/role.html' + '\')">角色管理</a></li>'
                                } else if (data.data.module[i].subAuthority[j].isControl == true && data.data.module[i].subAuthority[j].authorityName == '通讯录管理') {
                                    strs2 = strs2 + '<li ><a href="#" style="color:black"onclick="ChangeUrl(\'' + '../5_system/addressList.html' + '\')">通讯录管理</a></li>'
                                } else if (data.data.module[i].subAuthority[j].isControl == true && data.data.module[i].subAuthority[j].authorityName == '日志查询') {
                                    strs2 = strs2 + '<li ><a href="#" style="color:black"onclick="ChangeUrl(\'' + '../5_system/loginNote.html' + '\')">日志查询</a></li>'
                                }
                            } 
                        } 
                        strs = strs + ' <li class="dropdown menuItem" id="nav_system">' +
                       ' <a class="dropdown-toggle subItem" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">运维管理<span class="caret"></span></a>' +
                        '<ul class="dropdown-menu" style="color:black">' + strs2+
                        '</ul>' +
                   ' </li>';
                    }
                } 
            } 
             $('.topbar').html('<div style="width:38%;float:left;margin-left:2%;vertical-align:middle;height:70px ;display: table-cell;"> <img src="../assets/img/2_map/logo.png" width="95%"style=" vertical-align:middle;margin-top:7.5px;"/> </div>' +
            '<div  style="float:left;width:46%;padding-top:20px;text-align:center"  >' +
             ' <ul class="top"style="padding-left:0"> ' + strm + strc + strd + stra +strs+
                 ' <li class="menuItem"><a href="../0_login/login.html" class="subItem">注销</a></li>' +
              '</ul>'+
           '</div>'+
            '<div  style="float:right;width:14%;padding-top:20px;color:white;font-size:15px"  >'+'欢迎，'+$.cookie("JTZH_name")+'登录！'+'</div>');//
           
            $(".subItem").click(function () {
                $("#nav_map").removeClass("removes");
                //设置当前菜单为选中状态的样式，并移除同类同级别的其他元素的样式
                $(".subItem").removeClass("removes");
                $(this).addClass("removes").siblings().removeClass("removes"); 
            }); 
            $("#nav_map").click();
           
        }
    })
  
    //$('#' + module).addClass("active"); 
}
//注销
var logout = function (){
    $.cookie("JTZH_userID", null, { path: "/" });
    window.location.href = "../login.html";
}
//登陆状态检测
var accountCheck = function (){ 
$('.nowName').html(sessionStorage.getItem("name")); 
    if (typeof (sessionStorage.getItem("JRWM_userId")) == "undefined" || sessionStorage.getItem("JRWM_userId")==null) { 
        $('#common-alert').find('.modal-title').html('');
        $('#common-alert').find('.modal-title').html('警告');
        $('#common-alert').find('.modal-body').html('');
        $('#common-alert').find('.modal-body').html('登录信息已过期！1秒后将跳回登录界面。。。');
        $('#common-alert').modal();
        setTimeout(function () {
            window.location.href = "login.html"
        }, 1000)
    }
    
}
 //首页登录状态检测
var accountCheck2 = function (obj, num){ 
    //console.log(obj, num);
    
    $.ajax({
        url: "http://jrweixin.zj96296.com:18017/JRCivilizationService/SYSService.svc/rightCheck3?",
        data: {
            async: false,
            userId: sessionStorage.getItem("JRWM_userId"),
            rightId: num
        },
        success: function (data) {  
          if (data.data == true) { 
               $('#' + obj).css('display', 'inline-block');   
          } else {
           
            }
         
        }
    }) 
}
//首页登录状态检测
var accountCheck3 = function (obj, num) {
    //console.log(obj, num);

    $.ajax({
        url: "http://jrweixin.zj96296.com:18017/JRCivilizationService/SYSService.svc/rightCheck3?",
        data: {
            async: false,
            userId: sessionStorage.getItem("JRWM_userId"),
            rightId: num
        },
        success: function (data) {
            if (data.data == true) {  
                sessionStorage.setItem("JRWM_Athority", sessionStorage.getItem("JRWM_Athority") + obj);
            } else {

            }

        }
    })
}
//修改头像
var head_portrait = function () {
    console.log($.cookie("JTZH_userID"));
    $("#head_picture_upload .am-modal-bd").html('<input id="input-image-3" name="input-image" type="file" class="file-loading" accept="image/*">');
    $("#input-image-3").fileinput({
        language: 'zh', //设置语言
        uploadUrl: svc_uoload + "/editportrait.ashx?userID=" + $.cookie("JTZH_userID"),
        allowedFileExtensions: ["jpg", "png", "gif"],
        maxImageWidth: 100,
        maxImageHeight: 200,
        resizePreference: 'height',
        maxFileCount: 1,
        resizeImage: true
    }).on('filepreupload', function () {
        $(".am-close").click();
        $('#kv-success-box').html('');
    }).on('fileuploaded', function (event, data) {
        $('#kv-success-box').append(data.response.link);
        $('#kv-success-modal').modal('show');
    });
    $('#head_picture_upload').modal({
        width: '800',
        height: '400',
        relatedTarget: this
    });

}




 // hint---提示内容  go---跳转地址
 function iAlert(obj){
    this.id="iAlert_"+Math.ceil(Math.random()*1000);
    this.hint="";
    this.go=undefined;
    this.status='close';
    this.style=
    {
        backgroundColor:'white',
        opacity:1,
        position:"fixed",
        zIndex:9,
        width:"40%",
        minHeight:"100px",
        left:"30%",
        top:"20%",
        // borderRadius:"12px",
        // lineHeight:"400px",
        // overflow:'hidden',
        // color:'white',
        textAlign:'center',
        // fontSize:'50px',
        // border:'1px solid black'
    }
    this.styleHidden=
    {
        backgroundColor:"gray",
        opacity:0.5,
        zIndex:8,
        width:"100%",
        height:"100%",
        position:"fixed",
        left:"0px",
        top:"0px",
    }
    this.layer=document.createElement("div");
    this.layerHidden=document.createElement("div");
    this.layer.id=this.id;
    this.layerHidden.id=this.id+"_hidden";
    this.open=function(){
        this.layer.innerHTML=this.hint;
        document.body.appendChild(this.layerHidden);
        document.body.appendChild(this.layer);
        this.status='open';
    }
    this.close=function(){
        document.body.removeChild(this.layer);
        document.body.removeChild(this.layerHidden);
        this.status='close';
    }
    for(var i in this.style)
        this.layer.style[i]=this.style[i];
    for(var i in this.styleHidden)
        this.layerHidden.style[i]=this.styleHidden[i];
    for(var i in obj){
        this[i]=obj[i];
    }
    for(var i in this.style)
        this.layer.style[i]=this.style[i];
    for(var i in this.styleHidden)
        this.layerHidden.style[i]=this.styleHidden[i];
}




var clearPopup = function () {
    $(".add-popup").html('');
}
//清空
function cleanLayer(map) {
    map.eachLayer(function (layer) {
        if (!layer._url) map.removeLayer(layer);
    }, map);
}
/*----------部分插件功能----------*/
//人民币大小写转换
var c = "零壹贰叁肆伍陆柒捌玖".split("");
// ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"]
var _c = {}; // 反向对应关系
for (var i = 0; i < c.length; i++) {
    _c[c[i]] = i;
};

var d = "元***万***亿***万";
var e = ",拾,佰,仟".split(",");
function unit4(arr) {
    var str = "", i = 0;
    while (arr.length) {
        var t = arr.pop();
        str = (c[t] + (t == 0 ? "" : e[i])) + str;
        i++;
    }

    str = str.replace(/[零]{2,}/g, "零");

    str = str.replace(/^[零]/, "");
    str = str.replace(/[零]$/, "");
    if (str.indexOf("零") == 0) {
        str = str.substring(1);
    }
    if (str.lastIndexOf("零") == str.length - 1) {
        str = str.substring(0, str.length - 1);
    }

    return str;
}
function _formatD(a) {
    // 转化整数部分
    var arr = a.split(""), i = 0, result = "";
    while (arr.length) {
        var arr1 = arr.splice(-4, 4);

        var dw = d.charAt(i), unit = unit4(arr1);

        if (dw == '万' && !unit) {
            dw = "";
        }
        result = unit + dw + result;
        i += 4;
    }
    return result == "元" ? "" : result;
}
function _formatF(b) {
    // 转化小数部分
    b = b || "";
    switch (b.length) {
        case 0:
            return "整";
        case 1:
            return c[b] + "角";
        default:
            return c[b.charAt(0)] + "角" + c[b.charAt(1)] + "分";
    }
}
function _format(n) {
    var a = ("" + n).split("."), a0 = a[0], a1 = a[1];
    return _formatD(a0) + _formatF(a1);
}

function parse4(u4) {
    var res = 0;
    while (t = /([零壹贰叁肆伍陆柒捌玖])([拾佰仟]?)/g.exec(u4)) {
        var n = _c[t[1]], d = {
            "": 1,
            "拾": 10,
            "佰": 100,
            "仟": 1000
        }[t[2]];
        res += n * d;
        u4 = u4.replace(t[0], "");
    }
    var result = ("0000" + res);
    return result.substring(result.length - 4);
}
function _parseD(d) {
    var arr = d.replace(/[零]/g, "").split(/[万亿]/), rs = "";
    for (var i = 0; i < arr.length; i++) {
        rs += parse4(arr[i]);
    }
    ;
    return rs.replace(/^[0]+/, "");
};
function _parseF(f) {
    var res = "", t = f.replace(/[^零壹贰叁肆伍陆柒捌玖]+/g, "").split(""); // 去掉单位
    if (t.length) {
        res = ".";
    } else {
        return "";
    }
    ;
    for (var i = 0; (i < t.length && i < 2) ; i++) {
        res += _c[t[i]];
    }
    ;
    return res;
};
function _parse(rmb) {
    var a = rmb.split("元"), a1 = a[1], a0 = a[0];
    if (a.length == 1) {
        a1 = a0;
        a0 = "";
    }
    return _parseD(a0) + _parseF(a1);

};
//小写转大写
function formatRMB(num) {
    var n = Number(num);
    if (!isNaN(num)) {
        if (num == 0) {
            return "零元整";
        } else {
            return _format(n);
        }
    } else {
        return false;
    }
}
//大写转小写
function parseRMB(rmb) {
    if (/^[零壹贰叁肆伍陆柒捌玖元万亿拾佰仟角分整]{2,}$/.test(rmb)) {
        var result = _parse(rmb);
        return rmb == this.formatRMB(result) ? result : result + "(?)";
    } else {
        return false;
    }
}; 
  //生成随机颜色
function getRandomColor() {
    var c = '#';
    var cArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < 6; i++) {
        var cIndex = Math.round(Math.random() * 15);
        c += cArray[cIndex];
    }
    return c;
}
//解析值 
function getParam(paramName) {
    paramValue = "";
    isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = decodeURI(this.location.search).substring(1, this.location.search.length).split("&");

        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}
function judgeNull(obj) {
    console.log(obj);
    var str = '';
    if (obj && (typeof (obj) != "undefined") && obj != "undefined" && obj != "null") {
        str = obj;
    }
    console.log(str);
    return str;
}
//map用于在页面跳转时获取页面名称与左侧菜单栏的选项相对应，使得菜单选项获得选定样式
window.menuMap = {"ruleManage.html":"1", "caseManage.html":"2","researchReport.html":"3",
    "officepManage.html":"4","noticeBulletin.html":"5",
    "cgMessage.html":"1","cgpManage.html":"2","cgManage.html":"3","cgTongji.html":"4","cgDaily.html":"5",
    "rencai.html":"1","qiye.html":"2","fazhifagui.html":"3","map.html":"4",
    "zwDaily.html":"1","zwFCZS.html":"2","zwZCMessage.html":"3","zwQuesTJ.html":"4","zwZZJG.html":"5",
    "departmentManage.html":"1","engineerManage.html":"2","problemManage.html":"3","informationDelivery.html":"4",
    "generalOperation0.html":"1", "generalOperation1.html":"4","generalOperation3.html":"2",
    //"generalOperation4.html":"5",
    "generalOperation6.html":"5",
    "informa1.html":"1","factory.html":"2","workInspection.html":"3","dangerManage.html":"4",
    "savePeopleManage.html":"5"
    };
//因为模块网页重名，必须定义第二个map，功能同上
window.menuMap2 = {
    "departmentManage.html":"1","engineerManage.html":"2","cgManage.html":"3","informationDelivery.html":"4","map.html":"5"
};
//因为综治网格模块网页重名，必须定义第三个map，功能同上
window.menuMap3 = {
    "map.html":"1","shiyou.html":"2","Special.html":"4","Twolei.html":"6","security administration count.html":"8",
    "security traffic count.html":"10","newwgpic.html":"12","security contradiction count.html":"14",
    "RoadManage.html":"16","schoolsearch.html":"18","zzshouye.html":"20","twshouye.html":"22",
    "performanceEvaluation.html":"24","personManage.html":"25"
};
