(function ($) {
    window.Ewin = function () {
        var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog"  style="width:25vw">' +
            '<div class="modal-content" style="height:15vw">' +
            '<div class="modal-header" style="border-bottom: 0px!important;background-color:white!important">' +
            '<button type="button" class="close closelogo" data-dismiss="modal">' +
            // '<span aria-hidden="true">&times;</span>' +
            '<span' +
            ' class="sr-only">Close</span></button>' +
            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body" style="height:90%;vertical-align: center;text-align:center;background-color:white!important">' +
            '<br>'+
            '<img src="[Pic]"/>' +
            '<p style="text-align: center;font-size: 1.5vw;">&nbsp;&nbsp;[Message]</p>' +
            '</div>' +
            //                                    '<div class="modal-footer">' +
            //     '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
            //     '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
            // '</div>' +
            '</div>' +
            '</div>' +
            '</div>';


        var dialogdHtml = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close closelogo" data-dismiss="modal">' +
            // '<span aria-hidden="true">&times;</span>' +
            '<span' +
            ' class="sr-only">Close</span></button>' +
            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var generateId = function () {
            var date = new Date();
            return 'mdl' + date.valueOf();
        }
        var init = function (options) {
            options = $.extend({}, {
                title: "",
                message: "提示内容",
                btnok: "确定",
                btncl: "取消",
                pic:"图片路径",
                width: 200,
                auto: false
            }, options || {});
            var modalId = generateId();
            var content = html.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Title: options.title,
                    Message: options.message,
                    BtnOk: options.btnok,
                    BtnCancel: options.btncl,
                    Pic:options.pic,
                }[key];
            });
            $('body').append(content);
            $('#' + modalId).modal({
                width: options.width,
                backdrop: 'static'
            });
            $('#' + modalId).on('hide.bs.modal', function (e) {
                $('body').find('#' + modalId).remove();
            });
            return modalId;
        }

        return {
            success: function (options) {
                if (typeof options == 'string') {
                    options = {
                        message: options
                    };
                }
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
                modal.find('.cancel').hide();

                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            alert: function (options) {
                if (typeof options == 'string') {
                    options = {
                        message: options
                    };
                }
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
                modal.find('.cancel').hide();

                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            confirm: function (options) {
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
                modal.find('.cancel').show();
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                            modal.find('.cancel').click(function () { callback(false); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            dialog: function (options) {
                options = $.extend({}, {
                    title: 'title',
                    url: '',
                    width: 800,
                    height: 550,
                    onReady: function () { },
                    onShown: function (e) { }
                }, options || {});
                var modalId = generateId();

                var content = dialogdHtml.replace(reg, function (node, key) {
                    return {
                        Id: modalId,
                        Title: options.title
                    }[key];
                });
                $('body').append(content);
                var target = $('#' + modalId);
                target.find('.modal-body').load(options.url);
                if (options.onReady())
                    options.onReady.call(target);
                target.modal();
                target.on('shown.bs.modal', function (e) {
                    if (options.onReady(e))
                        options.onReady.call(target, e);
                });
                target.on('hide.bs.modal', function (e) {
                    $('body').find(target).remove();
                });
            },
            // qx: function () {
            //     var userid= localStorage.getItem('sample');
            //     var jsonObj=JSON.parse(userid);
            //     var newSessionObj = {};
            //     var childObj = {};
            //     for (var i in jsonObj) {
            //         var k = jsonObj[i];
            //         //console.log("我是k"+k.hasPermission);
            //         newSessionObj[k.mCLink] = k.hasPermission;
            //         //console.log("我是数组"+newSessionObj[k.mCLink]) ;
            //     }
            //     //对本地得到的路径进行处理
            //     $("a[href]").each(function (idx, item) {
            //         var start = location.href.indexOf('/', 11),
            //             end = location.href.lastIndexOf('/'),
            //             // end= location.href.indexOf('/',location.href.indexOf('/')+6),
            //             // base = location.href.substring(start, end)
            //             // base1=`/static/BAOHUA`
            //         var href = $(item).attr("href"),
            //             num=href.indexOf('/')
            //         if(num>0){
            //             href=href.substring(num+1)
            //         }
            //         // key = `${base1}/${href}`
            //         key=href;
            //         // console.log(key);
            //         isDisable = newSessionObj[key] == '0';
            //         if (isDisable) {
            //             $(item).attr("href", "javascript:void(0);")
            //         }
            //     })
            //     //对chindren进行处理
            //     for (var i=0;i<jsonObj.length;i++){
            //         if(jsonObj[i].hasPermission>0){
            //             for (var j in jsonObj[i].children) {
            //                 var kk = jsonObj[i].children[j];
            //                 console.log("我是kk"+kk.hasPermission);
            //                 childObj[kk.mCLink] = kk.hasPermission;
            //                 console.log(kk.mCLink);
            //             }
            //         }
            //     }
            //     //如果是children 的话会继续写的
            //     $("a[href]").each(function (idx, item) {
            //         var hrefchild1 = $(item).attr("href")
            //        var keychild = hrefchild1;
            //         // console.log(keychild+"dsuhdb");
            //         // console.log('我是页面上的路径'+keychild);
            //         isDisable1 = childObj[keychild] == '0';
            //         console.log(isDisable1)
            //         if (isDisable1) {
            //             $(item).attr("href", "javascript:void(0);")
            //         }
            //     })
            // }
        }
    }();
    window.Ewin1 = function () {
        var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog modal-sm">' +
            '<div class="modal-content">' +
            '<div class="modal-header" style="border-bottom: 0px!important;background-color:white!important">' +
            // '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            // '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body" style="border-bottom: 0px!important;background-color:white!important">' +
            '<p style="text-align: center">[Message]</p>' +
            '<button type="button" data-dismiss="modal" style="margin-left: 25%;background-image:' +
            ' url(&quot;[SurePic]&quot;);width:20%;height: 34px;' +
            'background-size: 100% 106%;border-width:0px!important;border-radius:8px;padding' +
            ' 0px 0px!important" class="btn btn-primary ok">[BtnOk]</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<button type="button" '+ 'data-dismiss="modal" style="background-image: url(&quot;[CanPic]&quot;);width:20%;height:' +
            ' 34px;background-size: 100% 106%;border-width:0px!important;border-radius:8px;padding:0px 0px!important;" class="btn btn-default cancel">[BtnCancel]</button>' +
            '</div>' +
            // '<div class="modal-footer" style="border-bottom: 0px!important">' +
            //
            // '</div>' +
            '</div>' +
            '</div>' +
            '</div>';


        var dialogdHtml = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header" style="background-color: white!important">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var generateId = function () {
            var date = new Date();
            return 'mdl' + date.valueOf();
        }
        var init = function (options) {
            options = $.extend({}, {
                // title: "操作提示",
                message: "提示内容",
                btnok: "",
                btncl: "",
                canpic:"../../PingJiang/img/cancel.png",
                surepic:"../../PingJiang/img/sure.png",
                width: 200,
                auto: false
            }, options || {});
            var modalId = generateId();
            var content = html.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Title: options.title,
                    Message: options.message,
                    BtnOk: options.btnok,
                    BtnCancel: options.btncl,
                    CanPic:options.canpic,
                    SurePic:options.surepic,
                }[key];
            });
            $('body').append(content);
            $('#' + modalId).modal({
                width: options.width,
                backdrop: 'static'
            });
            $('#' + modalId).on('hide.bs.modal', function (e) {
                $('body').find('#' + modalId).remove();
            });
            return modalId;
        }

        return {
            success: function (options) {
                if (typeof options == 'string') {
                    options = {
                        message: options
                    };
                }
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
                modal.find('.cancel').hide();

                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            alert: function (options) {
                if (typeof options == 'string') {
                    options = {
                        message: options
                    };
                }
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
                modal.find('.cancel').hide();

                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            confirm: function (options) {
                var id = init(options);
                var modal = $('#' + id);
                modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
                modal.find('.cancel').show();
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.find('.ok').click(function () { callback(true); });
                            modal.find('.cancel').click(function () { callback(false); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            dialog: function (options) {
                options = $.extend({}, {
                    title: 'title',
                    url: '',
                    width: 800,
                    height: 550,
                    onReady: function () { },
                    onShown: function (e) { }
                }, options || {});
                var modalId = generateId();

                var content = dialogdHtml.replace(reg, function (node, key) {
                    return {
                        Id: modalId,
                        Title: options.title
                    }[key];
                });
                $('body').append(content);
                var target = $('#' + modalId);
                target.find('.modal-body').load(options.url);
                if (options.onReady())
                    options.onReady.call(target);
                target.modal();
                target.on('shown.bs.modal', function (e) {
                    if (options.onReady(e))
                        options.onReady.call(target, e);
                });
                target.on('hide.bs.modal', function (e) {
                    $('body').find(target).remove();
                });
            },
            // qx: function () {
            //     var userid= localStorage.getItem('sample');
            //     var jsonObj=JSON.parse(userid);
            //     var newSessionObj = {};
            //     var childObj = {};
            //     for (var i in jsonObj) {
            //         var k = jsonObj[i];
            //         //console.log("我是k"+k.hasPermission);
            //         newSessionObj[k.mCLink] = k.hasPermission;
            //         //console.log("我是数组"+newSessionObj[k.mCLink]) ;
            //     }
            //     //对本地得到的路径进行处理
            //     $("a[href]").each(function (idx, item) {
            //         var start = location.href.indexOf('/', 11),
            //             end = location.href.lastIndexOf('/'),
            //             // end= location.href.indexOf('/',location.href.indexOf('/')+6),
            //             // base = location.href.substring(start, end)
            //             base1=`/static/BAOHUA`
            //         var    href = $(item).attr("href"),
            //             num=href.indexOf('/')
            //         if(num>0){
            //             href=href.substring(num+1)
            //         }
            //         // key = `${base1}/${href}`
            //         key=href;
            //         // console.log(key);
            //         isDisable = newSessionObj[key] == '0';
            //         if (isDisable) {
            //             $(item).attr("href", "javascript:void(0);")
            //         }
            //     })
            //     //对chindren进行处理
            //     for (var i=0;i<jsonObj.length;i++){
            //         if(jsonObj[i].hasPermission>0){
            //             for (var j in jsonObj[i].children) {
            //                 var kk = jsonObj[i].children[j];
            //                 console.log("我是kk"+kk.hasPermission);
            //                 childObj[kk.mCLink] = kk.hasPermission;
            //                 console.log(kk.mCLink);
            //             }
            //         }
            //     }
            //     //如果是children 的话会继续写的
            //     $("a[href]").each(function (idx, item) {
            //         var hrefchild1 = $(item).attr("href")
            //         var keychild = hrefchild1;
            //         // console.log(keychild+"dsuhdb");
            //         // console.log('我是页面上的路径'+keychild);
            //         isDisable1 = childObj[keychild] == '0';
            //         console.log(isDisable1)
            //         if (isDisable1) {
            //             $(item).attr("href", "javascript:void(0);")
            //         }
            //     })
            // }
        }
    }();
})(jQuery);
function success() {
    Ewin.confirm({
        pic:"../../PingJiang/img/success.png",
        message : "新增成功！"
    }).on(function(e) {
        if (!e) {
            return;
        }
    })
}
function error() {
    Ewin.confirm({
        pic:"../../PingJiang/img/error.png",
        message : "新增失败！"
    }).on(function(e) {
        if (!e) {
            return;
        }
    })
}
function Delsuccess() {
    Ewin.confirm({
        pic:"../../PingJiang/img/success.png",
        message : "删除成功！"
    }).on(function(e) {
        if (!e) {
            return;
        }
    })
}
function Delerror() {
    Ewin.confirm({
        pic:"../../PingJiang/img/error.png",
        message : "删除失败！"
    }).on(function(e) {
        if (!e) {
            return;
        }
    })
}
function Editsuccess() {
    Ewin.confirm({
        pic:"../../PingJiang/img/success.png",
        message : "编辑成功！"
    }).on(function(e) {
        if (!e) {
            return;
        }
    })
}
function Editerror() {
    Ewin.confirm({
        pic:"../../PingJiang/img/error.png",
        message : "编辑失败！"
    }).on(function(e) {
        if (!e) {
            return;
        }
    })
}
var currentdate
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
}
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){ // enter 键
        search()
    }
};
function downloadIamge(selector, name) {
    var image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png')
        var a = document.createElement('a')
        var event = new MouseEvent('click')
        a.download = name || '下载图片名称'
        a.href = url
        a.dispatchEvent(event)
    }
    image.src =selector;
}