<template>
	<div>
		<h1 style="text-align: center; margin-top: 100px">{{username}}：的订单</h1>
			<el-card style="width: 40%; margin: 80px auto; padding: 20px;">
				<el-button type="primary" @click="toBack">返回</el-button>
					<el-card style="margin: 20px">
						<el-table :data="tableData" v-loading="loading" style="width: 100%">
  			  				<el-table-column prop="id" label="id" width="160"></el-table-column>
  			  				<el-table-column prop="ordertime" label="ordertime" width="160"></el-table-column>
  			  				<el-table-column prop="total" label="total" width="160"></el-table-column>
  						</el-table>
					</el-card>
			</el-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			loading: true,
			username: "",
			userId: null,
			cartList: [],
		}
	},
	created(username) {
		this.username = this.$route.params.username
		this.cartList = this.$route.params.cartList
		this.findUserIdByUsername()
	},
	methods: {
		toBack() {
			this.$router.push({name: "Mall", params: {username: this.username, cartList: this.cartList}})
		},
		findUserIdByUsername() {
			const URL = "http://127.0.0.1:9999/user/findUserIdByUsername/" + this.username
			this.axios.get(URL)
			.then((response) => {
				this.userId = response.data
				this.loading = false
				this.searchOrderById()
			}).catch((error) => {
				this.$message.error("error...")
			})
		},
		searchOrderById() {
			const URL = "http://127.0.0.1:9999/orders/userId/" + this.userId 
			this.axios.get(URL)
			.then((response) => {
				this.tableData = response.data
				this.loading = false
				this.$message.success("successful")
			}).catch((error) => {
				this.$message.error("error...")
			})

		}
	}
}
</script>