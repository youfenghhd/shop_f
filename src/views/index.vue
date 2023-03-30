<template>
	<div>
		<el-card style="width: 60%; margin: 80px auto;">
			<el-row>
				<el-col :span="10">&nbsp;</el-col>
				<el-col :span="2">
					<el-button @click="goToClient">客户端</el-button>
				</el-col>
				<el-col :span="2">
					<el-button @click="goToManager">后台管理</el-button>
				</el-col>
				<el-col :span="10">&nbsp;</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		goToClient() {
			this.$router.push("/registerAndLogin")
		},
		goToManager() {
			this.$router.push("/login")
		}
	}
}
</script>