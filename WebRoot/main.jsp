<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@page import="com.gt.pageModel.SessionInfo" %>
<%@page import="com.gt.utils.Contans" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String userNm = "";

    if (session.getAttribute(Contans.SESSION_BEAN) != null) {
        SessionInfo sessionInfo = (SessionInfo) session
                .getAttribute(Contans.SESSION_BEAN);
        if (sessionInfo.getOperInf() != null) {
            if (sessionInfo.getOperInf().getOperCd() != null
                    && sessionInfo.getOperInf().getOperCd().length() > 0) {
                userNm = sessionInfo.getOperInf().getOperCd();
            }
        }
    }
%>

<!DOCTYPE html>

<html>

<head>
    <meta charset="utf-8">
    <title>LaySSH开发框架</title>
    <jsp:include page="inc.jsp"></jsp:include>
    <link rel="stylesheet" href="css/global.css" media="all">
    <link rel="stylesheet" type="text/css" href="http://www.jq22.com/jquery/font-awesome.4.6.0.css">
</head>

<body>
<div class="layui-layout layui-layout-admin"  style="border-bottom: solid 5px #01AAED;">
    <div class="layui-header header header-demo" id="admin-header">
    <div class="layui-main">
        <div class="admin-login-box">
            <a class="logo" data-url="wecome.jsp" id="logo"> <span
                    style="font-size: 22px;">LaySSH开发框架</span>
            </a>
            <div class="admin-side-toggle" aria-hidden="true">
                <i class="layui-icon layui-icon-shrink-right"  aria-hidden="true"></i>
            </div>
            <div class="admin-side-full"  aria-hidden="true">
                <i class="layui-icon layui-icon-screen-full" aria-hidden="true"></i>
            </div>
            <div class="admin-side-helper">
                <i class="layui-icon layui-icon-tips" aria-hidden="true"></i>
            </div>
        </div>
            <ul class="layui-nav layui-layout-right">

                <li class="layui-nav-item layui-hide-xs" id="admin-header-theme" lay-unselect>
                </li>
                <li class="layui-nav-item layui-hide-xs" lay-unselect><a href="javascript:;"
                                              class="admin-header-user"> <img src="images/0.jpg"/> <span
                        id="main_user"><%=userNm%></span>
                </a>
                    <dl class="layui-nav-child">
                        <dd id="changePwd">
                            <a href="javascript:;"><i class="fa fa-gear"
                                                      aria-hidden="true"></i> 修改密码</a>
                        </dd>
                        <dd id="sysout">
                            <a href="#"><i class="fa fa-sign-out"
                                           aria-hidden="true"></i> 注销</a>
                        </dd>
                    </dl>
                </li>
                <li class="layui-nav-item layui-hide-xs" id="admin-header-more" style="color: #333333" lay-unselect>
                    <i class="layui-icon" style="font-size: 16px;" aria-hidden="true">&#xe671;</i>
                </li>
            </ul>
        </div>
    </div>
    <div class="layui-side layui-bg-black" id="admin-side">
        <div class="layui-side-scroll" id="admin-navbar-side"
             lay-filter="side"></div>
    </div>
    <div class="layui-body" style="bottom: 0;border-left: solid 2px #01AAED;" id="admin-body">
        <div class="layui-tab admin-nav-card layui-tab-brief"
             lay-filter="admin-tab">
            <ul class="layui-tab-title" id="tab-title">
                <li class="layui-this" id="homePage"><i class="fa fa-dashboard"
                                          aria-hidden="true"></i> <cite>首页</cite></li>
            </ul>
            <div class="layui-tab-content"
                 style="min-height: 150px; padding: 5px 0 0 0;">
                <div class="layui-tab-item layui-show">
                    <iframe src="wecome.jsp"></iframe>
                </div>
            </div>
        </div>
    </div>
    <div class="layui-footer footer footer-demo" id="admin-footer">
        <div class="layui-main">
            <p>
                www.layssh.com
            </p>
        </div>
    </div>
    <div class="site-tree-mobile layui-hide">
        <i class="layui-icon">&#xe602;</i>
    </div>
    <div class="site-mobile-shade"></div>
</div>
<script type="text/javascript">
    if ("<%=userNm%>" == "") {
        window.location.href = "operInf/login.do";
    }
    var navs;
    $.ajax({
        url: '<%=request.getContextPath()%>/menuInf/getTreeByRole.do',
        dataType: 'json',
        async: false,
        success: function (data) {
            navs = data;
        }
    });
</script>
<script src="js/index.js"></script>
<script>
    layui.use('layer', function () {
        var $ = layui.jquery, layer = layui.layer;
        var that = this;

        //系统退出
        $('#sysout').on('click', function () {
            layer.confirm('是否退出系统？', {
                btn: ['退出', '取消'] //按钮
            }, function () {
                location.href = '${pageContext.request.contextPath}/operInf/logout.do';
            }, function () {

            });
        });

        //密码修改
        $('#changePwd').on('click', function () {
            layer.open({
                type: 2,
                title: '密码修改',
                shadeClose: false,//点击遮罩关闭
                anim: 3,
                btnAlign: 'c',
                shade: 0.3,//是否有遮罩，可以设置成false
                maxmin: true, //开启最大化最小化按钮
                area: ['550px', '350px'],
                boolean: true,
                content: ['sys/OperInf/OperInfChangePwd.jsp', 'yes'], //iframe的url，no代表不显示滚动条
                success: function (layero, lockIndex) {
                    var body = layer.getChildFrame('body', lockIndex);
                    //绑定解锁按钮的点击事件
                    body.find('button#close').on('click', function () {
                        layer.close(lockIndex);
                    });
                }
            });
        });
    });
    layui.use('colorpicker',function () {
       var colorpicker = layui.colorpicker;
        var theme = layui.data('lay_theme').color;
        if(theme){
            $('.layui-nav-item>a,div.admin-login-box>a,#admin-header-more,#main_user,.admin-side-full,.admin-side-toggle,.admin-side-helper').css('color', theme[1]);
            var user =  $('#main_user');
            if(user.css('color') === 'rgb(51, 51, 51)'){
                $(user.css('color','#999999'))
            }
            $('.layui-bg-black,.layui-side-scroll,.layui-side-scroll .layui-nav-child,div.header').css('background-color', theme[0]);
        }
        colorpicker.render({
            elem: '#admin-header-theme'
            ,color: ''
            ,format: 'rgb'
            ,predefine: true
            ,alpha: true
            ,size: "xs"
            ,done: function(color){
                layer.msg("换个颜色换种心情");
            }
            ,change: function(color){
                var RgbValue = color.replace("rgba(", "").replace(")", "");
                var RgbValueArry = RgbValue.split(",");
                var $grayLevel = RgbValueArry[0] * 0.299 + RgbValueArry[1] * 0.587 + RgbValueArry[2] * 0.114;
                var thatColor;
                if ($grayLevel >= 192) {
                    thatColor = "#000";
                } else {
                    thatColor = "#fff";
                }
                $('.layui-nav-item>a,div.admin-login-box>a,#admin-header-more,#main_user,.admin-side-full,.admin-side-toggle,.admin-side-helper').css('color', thatColor);
                $('.layui-bg-black,.layui-side-scroll,.layui-side-scroll .layui-nav-child,div.header').css('background-color', color);
                layui.data('lay_theme', {
                    key: 'color'
                    ,value: [color,thatColor]
                });
                layer.msg("主题设置成功,双击右上角按钮可恢复默认");
            }
        });

        $('#admin-header-theme').on('dblclick', function(e){
            layui.data('lay_theme', {
                key: 'color'
                ,remove: true
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
</script>
</body>

</html>