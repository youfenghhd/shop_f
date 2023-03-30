<template>
	<div>
		<el-col :span="6">
			<el-input placeholder="请输入订单ID" v-model="orderId" prefix-icon="el-icon-search" clearable></el-input>
		</el-col>

		<el-col :span="2">
			<el-button type="primary" @click="searchOrderById">查找</el-button>
		</el-col>


		<el-table :data="tableData" v-loading="loading" style="width: 100%">
    		<el-table-column prop="id" label="id" width="120"></el-table-column>
    		<el-table-column prop="ordertime" label="ordertime" width="120"></el-table-column>
    		<el-table-column prop="total" label="total" width="120"></el-table-column>
    		<el-table-column prop="uid" label="uid" width="120"></el-table-column>

    		<el-table-column label="操作">
    			<template slot-scope="scope">
    				<el-button size="mini" type="danger">我累了，先不做了</el-button>
    			</template>
    		</el-table-column>

  		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			loading: true,
			orderId: null,
		}
	},
	created() {
		this.findAllOrders()
	},
	methods: {
		findAllOrders() {
			const URL = "http://127.0.0.1:9999/orders"
			this.axios.get(URL)
			.then((response) => {
				this.tableData = response.data
				this.loading = false
				this.$message.success("successful")
			}).catch((error) => {
				this.$message.error("error...")
			})
		},
		searchOrderById() {
			if (this.orderId == "" || this.orderId == null) {
				this.findAllOrders()
				return
			}
			const URL = "http://127.0.0.1:9999/orders/id/" + this.orderId 
			this.axios.get(URL)
			.then((response) => {
				this.tableData = [response.data]
				this.loading = false
				this.$message.success("successful")
			}).catch((error) => {
				this.$message.error("error...")
			})

		}
	}
}
</script>