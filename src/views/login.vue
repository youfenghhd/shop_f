<template>
	<div>
		<el-row>
			<el-col :span="23">&nbsp;</el-col>
			<el-col :span="1">
				<el-button type="primary" @click="exit">主页</el-button>
			</el-col>
		</el-row>
		<el-card style="width: 60%; margin: 80px auto;">
			<el-form>
				<el-form-item lable="用户账号" :label-width="formLabelWidth">
					用户账号：<el-input v-model="user.username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item lable="用户密码" :label-width="formLabelWidth">
					用户密码：<el-input v-model="user.password" autocomplete="off" show-password></el-input>
				</el-form-item>
			</el-form>
			<el-row>
				<el-col :span="11">&nbsp;</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="handleLogin">登录</el-button>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formLabelWidth: "120px",
				user: {
					username: "",
					password: "",
				}
			}
		},
		methods: {
			exit() {
				this.$router.push("/index")
			},
			handleLogin() {
				const URL = "http://127.0.0.1:9999/user/login"
				this.axios.post(URL, this.$qs.stringify(this.user))
				.then(response => {
					if (response.data == false) {
						this.$message.error("login failed")
					} else {
						this.$message.success("successful")
						this.$router.push('/home')
					}
				}).catch(error => {
					this.$message.error("failed")
				})
			}
		}
	}
</script>