<template>
	<div>
		<el-container>
  			<el-header>商城后台管理</el-header>
  			<el-container>
    			<el-aside width="200px">
    				<el-menu default-active="1" class="el-menu-vertical-demo" ackground-color="#545c64" text-color="#000" active-text-color="#ffd04b" router>
      					<el-menu-item index="/users">
      					  <i class="el-icon-menu"></i>
      					  <span slot="title">用户管理</span>
      					</el-menu-item>
      					<el-menu-item index="/commodity">
      					  <i class="el-icon-document"></i>
      					  <span slot="title">商品管理</span>
      					</el-menu-item>
      					<el-menu-item index="/orders">
      					  <i class="el-icon-setting"></i>
      					  <span slot="title">订单管理</span>
      					</el-menu-item>
      					<el-menu-item index="/index">
      					  <i class="el-icon-search"></i>
      					  <span slot="title">退出</span>
      					</el-menu-item>
    				</el-menu>
    			</el-aside>
    			<el-main>
    				<router-view></router-view>
    			</el-main>
  			</el-container>
		</el-container>
	</div>
</template>


<style type="text/css">
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
  
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 500px;
}
  
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
}
  
body > .el-container {
    margin-bottom: 40px;
}

</style>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>