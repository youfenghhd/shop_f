<template>
	<div style="margin-top: 40px">
		<el-row>
			<el-col :span="23">&nbsp;</el-col>
			<el-col :span="1">
				<el-button type="primary" @click="exit">主页</el-button>
			</el-col>
		</el-row>

		<el-col :span="4">&nbsp;</el-col>
		<el-col :span="7">
			<el-card>
				<el-form>
					<h2>注册</h2>
					<el-form-item lable="用户账号">
					姓名：<el-input v-model="register.username" maxlength="20"></el-input>
					</el-form-item>
					<el-form-item lable="用户密码">
					用户密码：<el-input v-model="register.password" show-password></el-input>
					</el-form-item>
					<el-form-item lable="确认密码">
					确认密码：<el-input v-model="passwordVerify" show-password></el-input>
					</el-form-item>
					<el-form-item lable="性别">
					性别：<el-input v-model="register.gender" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item lable="地址">
					地址：<el-input v-model="register.address"></el-input>
					</el-form-item>

					<el-button native-type="reset">重置</el-button>
					<el-button type="primary" @click="handleRegister">注册</el-button>
				</el-form>
			</el-card>
		</el-col>
		<el-col :span="2">&nbsp;</el-col>
		<el-col :span="7">
			<el-card>
				<el-form>
					<h2>登录</h2>
					<el-form-item lable="用户账号">
						姓名：<el-input v-model="login.username" maxlength="20"></el-input>
					</el-form-item>
					<el-form-item lable="用户密码">
					用户密码：<el-input v-model="login.password" show-password></el-input>
					</el-form-item>
					<el-button native-type="reset">重置</el-button>
					<el-button type="primary" @click="handleLogin">登录</el-button>
				</el-form>
			</el-card>
		</el-col>
		<el-col :span="4">&nbsp;</el-col>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				passwordVerify: "",
				register: {
					username: "",
					password: "",
					address: "",
					gender: "",
				},
				login: {
					username: "",
					password: "",
				}
			}
		},
		methods: {
			// resetRegisterForm() {
			// 	this.user = {}
			// },
			exit() {
				this.$router.push("/index")
			},
			handleLogin() {
				const URL = "http://127.0.0.1:9999/user/login"
				this.axios.post(URL, this.$qs.stringify(this.login))
				.then(response => {
					if (response.data == false) {
						this.$message.error("login failed")
					} else {
						this.$message.success("successful")
						this.$router.push({name: "Mall", params: {username: this.login.username, cartList: []}})
					}
				}).catch(error => {
					this.dialogFormVisible = false
					this.$message.error("failed")
				})
			},
			handleRegister() {
				if (this.register.password !== this.passwordVerify) {
					this.$message.error("ERROR：verify password")
					return
				}

				const URL = "http://127.0.0.1:9999/user/register"
				this.axios.post(URL, this.$qs.stringify(this.register))
				.then(response => {
					this.$message.success("successful")
					this.register = {}
					this.passwordVerify = ""
				}).catch(error => {
					this.$message.error("failed")
				})
			}
		}
	}
</script>