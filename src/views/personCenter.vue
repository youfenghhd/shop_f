<template>
	<div>

		<el-card style="width: 40%; margin: 100px auto">
			<el-button type="primary" @click="toBack">返回</el-button>
			<el-card style="margin: 20px auto; width: 65%;">
				<el-row style="margin-bottom: 20px;">
					用 户 ID ：<el-input style="width: 60%;" v-model="user.id" disabled/>
				</el-row>
				<el-row style="margin-bottom: 20px;">
					用户名称：<el-input style="width: 60%;" v-model="user.username" disabled/>
				</el-row>
				<el-row style="margin-bottom: 20px;">
					用户密码：<el-input style="width: 60%;" v-model="user.password"/>
				</el-row>
				<el-row style="margin-bottom: 20px;">
					用户余额：<el-input style="width: 60%;" v-model="user.balance" disabled/>
				</el-row>
				<el-row style="margin-bottom: 20px;">
					用户地址：<el-input style="width: 60%;" v-model="user.address"/>
				</el-row>
				<el-row style="margin-bottom: 20px;">
					用户状态：<el-input style="width: 60%;" v-model="user.status" disabled/>
				</el-row>
				<el-row>
					<el-button type="primary" @click="updateUser">提交修改</el-button>
				</el-row>
			</el-card>
		</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: true,
			user: {
				id: "",
				username: "",
				password: "",
				gender: "",
				address: "",
				status: "",
				balance: "",
				cartList: [],
			}
		}
	},
	created() {
		this.username = this.$route.params.username
		this.cartList = this.$route.params.cartList
		this.findUserByUsername()
	},
	methods: {
		toBack() {
			this.$router.push({name: "Mall", params: {username: this.username, cartList: this.cartList}})
		},
		findUserByUsername() {
			const URL = "http://127.0.0.1:9999/user/findUserByUsername/" + this.username
			this.axios.get(URL)
			.then((response) => {
				this.user = response.data
				this.loading = false
			}).catch((error) => {
				this.$message.error("error...")
			})
		},
		updateUser() {
			const URL = "http://127.0.0.1:9999/user/updateUser/" + this.user.id + "/" + this.user.address + "/" + this.user.password
			this.axios.put(URL)
			.then((response) => {
				this.$message.success("update successful")
				this.loading = false
			}).catch((error) => {
				this.$message.error("error...")
			})
		},

	}
}
</script>