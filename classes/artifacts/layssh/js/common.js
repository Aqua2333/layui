/** common.js By Beginner Emain:zheng_jinfan@126.com HomePage:http://www.zhengjinfan.cn */

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

layui.define(['layer'], function(exports) {
	"use strict";

	var $ = layui.jquery,
		layer = layui.layer;

	var common = {
		/**
		 * 抛出一个异常错误信息
		 * @param {String} msg
		 */
		throwError: function(msg) {
			throw new Error(msg);
			return;
		},
		/**
		 * 弹出一个错误提示
		 * @param {String} msg
		 */
		msgError: function(msg) {
			layer.msg(msg, {
				icon: 5
			});
			return;
		}
	};

	exports('common', common);
});