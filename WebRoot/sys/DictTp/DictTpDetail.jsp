<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>

<head>
<title>查看</title>
<jsp:include page="../../inc.jsp"></jsp:include>
</head>
<body>
<form name="form" class="layui-form" style="margin-top: 20px;" method="post" action="">
   <div class="layui-form-item">
    <label class="layui-form-label">类型编号</label>
    <div class="layui-input-block">
      <input type="text" name="dictTypeCd"  placeholder="请输入" autocomplete="off" class="layui-input" />
    </div>
  </div>
   <div class="layui-form-item">
    <label class="layui-form-label">类型名称</label>
    <div class="layui-input-block">
      <input type="text" name="dictTypeNm"  placeholder="请输入" autocomplete="off" class="layui-input" />
    </div>
  </div>
  <!-- 按钮组 -->
  <div class="layui-form-item">
  	<div class="layui-input-block">
	     <button class="layui-btn layui-btn-primary" id="close">关闭</button>
   </div>
  </div>
		
</form>
</body>
</html>
