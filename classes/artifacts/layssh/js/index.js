/** index.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */

var tab;

var f2 = true;

layui.config({
    base: 'js/',
    version: new Date().getTime()
}).use(['element', 'layer', 'navbar', 'tab'], function () {
    var element = layui.element,
        $ = layui.jquery,
        layer = layui.layer,
        navbar = layui.navbar();
    tab = layui.tab({
        elem: '.admin-nav-card' //设置选项卡容器
        ,
        /*maxSetting: {
            max: 5,
            tipMsg: '只能开5个哇，不能再开了。真的。'
        },*/
        contextMenu: true
    });
    //iframe自适应
    $(window).on('resize', function () {
        var $content = $('.admin-nav-card .layui-tab-content');
        $content.height($(this).height() - 147);
        $content.find('iframe').each(function () {
            $(this).height($content.height());
        });
    }).resize();

    //设置navbar
    navbar.set({
        spreadOne: true,
        elem: '#admin-navbar-side',
        cached: true,
        data: navs
        /*cached:true,
        url: 'datas/nav.json'*/
    });
    //渲染navbar
    navbar.render();
    //监听点击事件
    navbar.on('click(side)', function (data) {
        tab.tabAdd(data.field);
    });

    //点击Logo返回首页
    $("#logo").on('click', function () {
        $('#homePage').click();
    });

    function click() {
        var $this = $('.admin-side-toggle');
        var sideWidth = $('#admin-side').width();
        if (sideWidth === 200) {
            $this.children('i').removeClass('layui-icon-shrink-right').addClass('layui-icon-spread-left');
            $('#admin-body').animate({
                left: '0'
            }); //admin-footer
            $('#admin-footer').animate({
                left: '0'
            });
            $('#admin-side').animate({
                width: '0'
            });
        } else {
            $this.children('i').removeClass('layui-icon-spread-left').addClass('layui-icon-shrink-right');
            $('#admin-body').animate({
                left: '200px'
            });
            $('#admin-footer').animate({
                left: '200px'
            });
            $('#admin-side').animate({
                width: '200px'
            });
        }
    }

    function dblclick() {
        var headerHeight = $('#admin-header').height();

        if (headerHeight === 60) {
            $("#admin-side").animate({
                top: '0'
            });
            $("#admin-body").animate({
                top: '0'
            });
            $("#admin-header").animate({
                height: '0'
            });
            $('#admin-header').css('visibility', 'hidden');
        } else {
            $("#admin-side").animate({
                top: '60px'
            });
            $("#admin-body").animate({
                top: '60px'
            });
            $("#admin-header").animate({
                height: '60px'
            });
            $('#admin-header').css('visibility', 'visible');
        }
    }

    $('.admin-side-toggle').on('click', function () {
        click();
    });

    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode === 113) {
            if (f2) {
                f2 = false;
                dblclick();
                click();
                setTimeout(function () {
                    f2 = true;
                }, 1000)
            } else {
                layer.msg("每秒只可操作一次")
            }
        }
    };

    $('#tab-title').on('dblclick', function () {
        dblclick();
    });

    $('.admin-side-full').on('click', function () {
        var $this = $('.admin-side-full');
        var explorer = navigator.userAgent.toLowerCase();
        if (explorer.indexOf("msie") >= 0 || explorer.indexOf('clr') >= 0) {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
                wscript.SendKeys("{F11}");
            }
        } else {
            if ($this.children('i').hasClass('layui-icon-screen-restore')) {
                if (document.exitFullscreen) {
                    $this.children('i').removeClass('layui-icon-screen-restore').addClass('layui-icon-screen-full');
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    $this.children('i').removeClass('layui-icon-screen-restore').addClass('layui-icon-screen-full');
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    $this.children('i').removeClass('layui-icon-screen-restore').addClass('layui-icon-screen-full');
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    $this.children('i').removeClass('layui-icon-screen-restore').addClass('layui-icon-screen-full');
                    document.msExitFullscreen();
                } else {
                    $this.children('i').removeClass('layui-icon-screen-restore').addClass('layui-icon-screen-full');
                    layer.msg("按Esc即可退出全屏");
                }
            } else {
                var ele = document.documentElement
                    , reqFullScreen = ele.requestFullScreen || ele.webkitRequestFullScreen
                    || ele.mozRequestFullScreen || ele.msRequestFullscreen;
                if (typeof reqFullScreen !== 'undefined' && reqFullScreen) {
                    reqFullScreen.call(ele);
                    $this.children('i').removeClass('layui-icon-screen-full').addClass('layui-icon-screen-restore');
                } else {
                    layer.msg('很抱歉，该浏览器不支持全屏API或已被禁用');
                }

                layer.msg('按Esc即可退出全屏');
            }
        }
    });


    $('.admin-side-helper').on('click', function () {
        layui.use("layer", function () {
            var layer = layui.layer;
            layer.msg('提示信息', {
                time: 1000,
                icon: 7
            });
            //多窗口模式，层叠置顶
            layer.open({
                type: 2
                , title: '提示'
                , area: '400px'
                , shade: 0
                , shadeClose: true
                , id: 'LAY_help' //设定一个id，防止重复弹出
                , maxmin: true
                , offset: 'rb'
                , content: baseUrl + '/sys/help.html'
                , skin: 'layui-anim layui-anim-rl layui-layer-adminRight'//样式
                , btn: ['关闭']
                , yes: function () {
                    layer.closeAll();
                }
                , zIndex: layer.zIndex
                , success: function (layero, index) {
                    layer.setTop(layero);
                    //layer.iframeAuto(index); //高度自适应
                }
            });
        })
    });

    $('#admin-header-more').on('click', function () {
        var layer = layui.layer;
        layer.open({
            type: 2,
            id: 'LAY_more',
            anim: 2,
            title: false,
            closeBtn: false,
            offset: 'r',
            shade: 0.1,
            shadeClose: true,
            skin: 'layui-anim layui-anim-rl layui-layer-adminRight',//样式
            area: '300px',
            content: baseUrl + '/sys/more.html',
            success: function (layero) {
                layer.setTop(layero);
            }
        })
    });
    //锁屏
    $(document).on('keydown', function () {
        var e = window.event;
        if (e.keyCode === 76 && e.altKey) {
            //alert("你按下了alt+l");
            lock($, layer);
        }
    });
    $('#lock').on('click', function () {
        lock($, layer);
    });

    //手机设备的简单适配
    var treeMobile = $('.site-tree-mobile'),
        shadeMobile = $('.site-mobile-shade');
    treeMobile.on('click', function () {
        $('body').addClass('site-mobile');
    });
    shadeMobile.on('click', function () {
        $('body').removeClass('site-mobile');
    });
});


var isShowLock = false;

function lock($, layer) {
    if (isShowLock)
        return;
    //自定页
    layer.open({
        title: false,
        type: 1,
        closeBtn: 0,
        anim: 6,
        //content: $('#lock-temp').html(),
        content: ['lock.jsp', 'no'],
        shade: [0.9, '#393D49'],
        success: function (layero, lockIndex) {
            isShowLock = true;
            //给显示用户名赋值
            layero.find('div#lockUserName').text($("#main_user").html());
            layero.find('input[name=lockPwd]').on('focus', function () {
                var $this = $(this);
                if ($this.val() === '输入密码解锁..') {
                    $this.val('').attr('type', 'password');
                }
            })
                .on('blur', function () {
                    var $this = $(this);
                    if ($this.val() === '' || $this.length === 0) {
                        $this.attr('type', 'text').val('输入密码解锁..');
                    }
                });
            //在此处可以写一个请求到服务端删除相关身份认证，因为考虑到如果浏览器被强制刷新的时候，身份验证还存在的情况
            //do something...
            //e.g.
            /*
             $.post(url,params,callback,'json');
             */
            //绑定解锁按钮的点击事件
            layero.find('button#unlock').on('click', function () {
                var $lockBox = $('div#lock-box');

                var userName = $lockBox.find('div#lockUserName').text();
                var pwd = $lockBox.find('input[name=lockPwd]').val();
                if (pwd === '输入密码解锁..' || pwd.length === 0) {
                    layer.msg('请输入密码..', {
                        icon: 2,
                        time: 1000
                    });
                    return;
                }
                unlock(userName, pwd);
            });
            /**
             * 解锁操作方法
             * @param {String} 用户名
             * @param {String} 密码
             */
            var unlock = function (un, pwd) {
                //这里可以使用ajax方法解锁
                /*$.post('api/xx',{username:un,password:pwd},function(data){
                     //验证成功
                    if(data.success){
                        //关闭锁屏层
                        layer.close(lockIndex);
                    }else{
                        layer.msg('密码输入错误..',{icon:2,time:1000});
                    }
                },'json');
                */
                isShowLock = false;
                //演示：默认输入密码都算成功
                //关闭锁屏层
                layer.close(lockIndex);
            };
        }
    });
};
layui.use('colorpicker', function () {
    var colorpicker = layui.colorpicker;
    var theme = layui.data('lay_theme').color;
    if (theme) {
        $('div.admin-login-box>a,#admin-header-more,#main_user,.admin-side-full,.admin-side-toggle,.admin-side-helper').css('color',theme[2]);
        $('.layui-nav-item>a').css('color', theme[1]);
        var user = $('#main_user');
        if (user.css('color') === 'rgb(51, 51, 51)') {
            $(user.css('color', '#999999'))
        }
        $('.layui-bg-black,.layui-side-scroll,.layui-side-scroll .layui-nav-child,div.header').css('background-color', theme[0]);
    }
    colorpicker.render({
        elem: '#admin-header-theme'
        , color: ''
        , format: 'rgb'
        , predefine: true
        , alpha: true
        , size: "xs"
        , done: function (color) {
            layer.msg("换个颜色换种心情");
        }
        , change: function (color) {
            console.log(color);
            var RgbValue = color.replace("rgba(", "").replace(")", "");
            var RgbValueArry = RgbValue.split(",");
            var $grayLevel = RgbValueArry[0] * 0.299 + RgbValueArry[1] * 0.587 + RgbValueArry[2] * 0.114;
            var headerColor;
            var thatColor;
            if ($grayLevel >= 192) {
                thatColor = "#000";
            } else {
                thatColor = "#fff";
            }
            if (RgbValueArry[3] < 0.3){
                headerColor = "#000";
            } else {
                headerColor = thatColor;
            }
            $('div.admin-login-box>a,#admin-header-more,#main_user,.admin-side-full,.admin-side-toggle,.admin-side-helper').css(headerColor);
            $('.layui-nav-item>a').css('color', thatColor);
            $('.layui-bg-black,.layui-side-scroll,.layui-side-scroll .layui-nav-child,div.header').css('background-color', color);
            layui.data('lay_theme', {
                key: 'color'
                , value: [color, thatColor,headerColor]
            });
            layer.msg("主题设置成功,双击右上角按钮可恢复默认");
        }
    });

    $('#admin-header-theme').on('dblclick', function (e) {
        layui.data('lay_theme', {
            key: 'color'
            , remove: true
        });
        $('.layui-nav-item>a,div.admin-login-box>a,#admin-header-more,#main_user,.admin-side-full,.admin-side-toggle,.admin-side-helper').removeAttr('style');
        $('.layui-bg-black,.layui-side-scroll,.layui-side-scroll .layui-nav-child,div.header').removeAttr('style');
        $('#admin-header-more').css('color', "#333333");
        // $('#main_user').css('color','#999999');
        // $('.layui-nav-item>a').css('color', "rgba(255,253,255,0.7)");
        // $('.layui-bg-black,.layui-side-scroll').css('background-color', "#393D49");
        // $('.layui-side-scroll .layui-nav-child').css('background-color', "rgba(0,0,0,0.3)");
        // $('div.header').css('background-color', "#fff");
        layer.msg("主题已成功恢复默认");
    })
});
$(function () {
    var $this = $('.admin-side-full');
    $(document).on('keydown', function (event) {
        var code = event || window.event || arguments.callee.caller.arguments[0];
        if (code.keyCode  === 122) {
            if ($this.children('i').hasClass('layui-icon-screen-restore')) {
                $this.children('i').removeClass('layui-icon-screen-restore').addClass('layui-icon-screen-full');
            } else {
                $this.children('i').removeClass('layui-icon-screen-full').addClass('layui-icon-screen-restore');
            }
        }
    });
});