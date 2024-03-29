/** navbar.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */

/**
 * 获取项目根路径
 * @returns {string}
 */
var baseUrl = getPath();


function getPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0, index + 1);
    return result;
}

layui.define(['element', 'common'], function (exports) {
    "use strict";
    var $ = layui.jquery,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        element = layui.element,
        common = layui.common,
        cacheName = 'tb_navbar';

    var Navbar = function () {
        /**
         *  默认配置
         */
        this.config = {
            elem: undefined, //容器
            data: undefined, //数据源
            url: undefined, //数据源地址
            type: 'GET', //读取方式
            cached: false, //是否使用缓存
            spreadOne: true, //设置是否只展开一个二级菜单
            spreadOneThird: true ////设置是否只展开一个三级菜单
        };
        this.v = '0.0.1';
    };
    Navbar.prototype.render = function () {
        var _that = this;
        var _config = _that.config;
        if (typeof (_config.elem) !== 'string' && typeof (_config.elem) !== 'object') {
            common.throwError('Navbar error: elem参数未定义或设置出错，具体设置格式请参考文档API.');
        }
        var $container;
        if (typeof (_config.elem) === 'string') {
            $container = $('' + _config.elem + '');
        }
        if (typeof (_config.elem) === 'object') {
            $container = _config.elem;
        }
        if ($container.length === 0) {
            common.throwError('Navbar error:找不到elem参数配置的容器，请检查.');
        }
        if (_config.data === undefined && _config.url === undefined) {
            common.throwError('Navbar error:请为Navbar配置数据源.')
        }
        if (_config.data !== undefined && typeof (_config.data) === 'object') {
            var html = getHtml(_config.data);
            $container.html(html);
            element.init();
            _that.config.elem = $container;
        } else {
            if (_config.cached) {
                var cacheNavbar = layui.data(cacheName);
                if (cacheNavbar.navbar === undefined) {
                    $.ajax({
                        type: _config.type,
                        url: _config.url,
                        async: false, //_config.async,
                        dataType: 'json',
                        success: function (result, status, xhr) {
                            //添加缓存
                            layui.data(cacheName, {
                                key: 'navbar',
                                value: result
                            });
                            var html = getHtml(result);
                            $container.html(html);
                            element.init();
                        },
                        error: function (xhr, status, error) {
                            common.msgError('Navbar error:' + error);
                        },
                        complete: function (xhr, status) {
                            _that.config.elem = $container;
                        }
                    });
                } else {
                    var html = getHtml(cacheNavbar.navbar);
                    $container.html(html);
                    element.init();
                    _that.config.elem = $container;
                }
            } else {
                //清空缓存
                layui.data(cacheName, null);
                $.ajax({
                    type: _config.type,
                    url: _config.url,
                    async: false, //_config.async,
                    dataType: 'json',
                    success: function (result, status, xhr) {
                        var html = getHtml(result);
                        $container.html(html);
                        element.init();
                    },
                    error: function (xhr, status, error) {
                        common.msgError('Navbar error:' + error);
                    },
                    complete: function (xhr, status) {
                        _that.config.elem = $container;
                    }
                });
            }
        }

        // 菜单栏的渐进渐出

        var $ul = $container.children('ul');
        $ul.find('li.layui-nav-item').each(function () {
            $(this).on('click', function () {
                $(this).children('a').children('i').html(($(this).hasClass('layui-nav-itemed') ? '&#xe61a;' : '&#xe602;'));
                var c = $(this).children('dl');
                ($(this).hasClass('layui-nav-itemed') || c.css("display") === 'hide') ? c.slideDown() : c.slideUp();
                // 只开启一个二级菜单
                if (_config.spreadOne) {
                    $(this).siblings().children('dl').slideUp();
                    $(this).siblings().removeClass('layui-nav-itemed');
                    $(this).siblings().children('a').children('i').html('&#xe602;');
                }
            });
        });

        $container.find('dd.two').each(function () {
            $(this).on('click', function () {
                if ($(this).children('dl').length > 0) {
                    $(this).children('a').children('i').html(($(this).hasClass('layui-nav-itemed') ? '&#xe61a;' : '&#xe602;'));
                    var c = $(this).children('dl');
                    ($(this).hasClass('layui-nav-itemed') || c.css("display") === 'hide') ? c.slideDown() : c.slideUp();
                    // 只开启一个三级菜单
                    if (_config.spreadOneThird) {
                        $(this).siblings().children('dl').slideUp();
                        $(this).siblings().removeClass('layui-nav-itemed');
                        $(this).siblings().children('a').children('i').html('&#xe602;');
                    }
                }
            })
        });


        return _that;
    };
    /**
     * 配置Navbar
     * @param {Object} options
     */
    Navbar.prototype.set = function (options) {
        var that = this;
        that.config.data = undefined;
        $.extend(true, that.config, options);
        return that;
    };
    /**
     * 绑定事件
     * @param {String} events
     * @param {Function} callback
     */
    Navbar.prototype.on = function (events, callback) {
        var that = this;
        var _con = that.config.elem;
        if (typeof (events) !== 'string') {
            common.throwError('Navbar error:事件名配置出错，请参考API文档.');
        }
        var lIndex = events.indexOf('(');
        var eventName = events.substr(0, lIndex);
        var filter = events.substring(lIndex + 1, events.indexOf(')'));
        if (eventName === 'click') {
            if (_con.attr('lay-filter') !== undefined) {
                _con.children('ul').find('li').each(function () {
                    var $this = $(this);
                    if ($this.find('dl').length > 0) {
                        var $dd = $this.find('dd').each(function () {
                            $(this).on('click', function () {
                                var $a = $(this).children('a');
                                var href = $a.data('url');
                                var title = $a.children('cite').text();
                                var data = {
                                    elem: $a,
                                    field: {
                                        href: href,
                                        title: title
                                    }
                                }
                                callback(data);
                            });
                        });
                    } else {
                        $this.on('click', function () {
                            var $a = $this.children('a');
                            var href = $a.data('url');
                            var title = $a.children('cite').text();
                            var data = {
                                elem: $a,
                                field: {
                                    href: href,
                                    title: title
                                }
                            }
                            callback(data);
                        });
                    }
                });
            }
        }
    };
    /**
     * 清除缓存
     */
    Navbar.prototype.cleanCached = function () {
        layui.data(cacheName, null);
    };

    /**
     * 获取html字符串
     * @param {Object} data
     */
    function getHtml(data) {
        // spread字段不使用 菜单不展开
        var ulHtml = '<ul class="layui-nav layui-nav-tree beg-navbar">';
        for (var i = 0; i < data.length; i++) {
            ulHtml += '<li class="layui-nav-item">';
            if (data[i].children !== undefined && data[i].children.length > 0) {
                ulHtml += '<a href="javascript:;">';
                ulHtml += '<i class="layui-icon" >&#xe602;</i>';
                ulHtml += '<cite>' + data[i].title + '</cite>'
                ulHtml += '</a>';
                ulHtml += '<dl class="layui-nav-child">'
                for (var j = 0; j < data[i].children.length; j++) {
                    var child = data[i].children[j];
                    ulHtml += '<dd title="' + data[i].children[j].title + '" class="two">';
                    if (child !== undefined && child.children.length > 0) {
                        ulHtml += '<a href="javascript:;">';
                        ulHtml += '<i class="layui-icon" >&#xe602;</i>';
                        ulHtml += '<cite>' + data[i].children[j].title + '</cite>'
                        ulHtml += '</a>';
                        ulHtml += '<dl class="layui-nav-child">'
                        for (var x = 0; x < child.children.length; x++) {
                            ulHtml += '<dd title="' + child.children[x].title + '">';
                            ulHtml += '<a href="javascript:;" data-url="' + child.children[x].href + '">';
                            ulHtml += '<i class="layui-icon" >&#xe602;</i>';
                            ulHtml += '<cite>' + child.children[x].title + '</cite>';
                            ulHtml += '</a>';
                            ulHtml += '</dd>';
                        }
                    } else {
                        ulHtml += '<a href="javascript:;" data-url="' + data[i].children[j].href + '">';
                        ulHtml += '<i class="layui-icon" >&#xe602;</i>';
                        ulHtml += '<cite>' + data[i].children[j].title + '</cite>';
                        ulHtml += '</a>';
                    }
                    ulHtml += '</dd>';
                }
                ulHtml += '</dl>';
            } else {
                var dataUrl = (data[i].href !== undefined && data[i].href !== '') ? 'data-url="' + data[i].href + '"' : '';
                ulHtml += '<a href="javascript:;" ' + dataUrl + '>';
                ulHtml += '<i class="layui-icon">&#xe602;</i>';

                ulHtml += '<cite>' + data[i].title + '</cite>'
                ulHtml += '</a>';
            }
            ulHtml += '</li>';
        }
        ulHtml += '</ul>';

        return ulHtml;
    }

    var navbar = new Navbar();

    exports('navbar', function (options) {
        return navbar.set(options);
    });
});