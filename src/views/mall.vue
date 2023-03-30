<template>
	<div>
		<el-card>
			<el-row>
				<el-col :span="22">&nbsp;</el-col>
				<el-col :span="1">
					<el-button type="primary" @click="exit">退 出</el-button>
				</el-col>
			</el-row>
			<h1 style="text-align: center;">UI 不要太介意！</h1>
			<el-row class="mb">
				<el-col :span="6">&nbsp;</el-col>
				<el-col :span="8">
					<el-input v-model="commodity.cname" placeholder="请输入需要查询的商品"></el-input>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" icon="el-icon-search" @click="searchCommodityByCommodity"></el-button>
				</el-col>
				<el-col :span="2">
					<el-button type="warning" @click="goToCart">进入购物车</el-button>
				</el-col>
			</el-row>
			
			<el-row class="mb">
				<el-col :span="2">&nbsp;</el-col>
				<el-col :span="13">
					<el-card>
						<el-table :data="tableData" v-loading="loading" style="width: 100%" stripe>
    						<el-table-column prop="id" label="id" width="220"></el-table-column>
    						<el-table-column prop="cname" label="cname" width="220"></el-table-column>
    						<el-table-column prop="price" label="price" width="220"></el-table-column>
    						<el-table-column label="操作">
    							<template slot-scope="scope">
    								<el-button size="mini" type="danger" @click="addToCart(scope.row)">加入购物车</el-button>
    								<el-button size="mini" type="warning" @click="detailCommodity(scope.row)">查看详情页</el-button>
    							</template>
    						</el-table-column>
  						</el-table>
					</el-card>
				</el-col>
				<el-col :span="1">&nbsp;</el-col>
				<el-col :span="4">
					<el-card>
							<el-row class="mb">
								<h1>用户：{{username}}</h1>
							</el-row>
							<el-row class="mb">
								<el-button type="primary" @click="goToCart">我的购物车</el-button>
								<el-button type="primary" @click="goToMyOrder">&nbsp;&nbsp;我的订单&nbsp;&nbsp;</el-button>
							</el-row>
							<el-row class="mb">
								<el-button type="warning" @click="goToPersonCenter">&nbsp;&nbsp;个人中心&nbsp;&nbsp;</el-button>
								<el-button type="warning" @click="goToMyOrder">&nbsp;&nbsp;我的订单&nbsp;&nbsp;</el-button>
							</el-row>
							<el-row>
								<el-button type="danger" @click="withoutAdvice">意见与建议</el-button>
								<el-button type="danger" @click="withoutHelp">&nbsp;&nbsp;帮助中心&nbsp;&nbsp;</el-button>
							</el-row>
<!-- 							<el-row>
								<h2 style="text-align: center;">当前购物车数量：{{cartList.length}}</h2>
							</el-row> -->
					</el-card>
				</el-col>
				<el-col :span="2">&nbsp;</el-col>
			</el-row>

		</el-card>
	</div>
</template>

<style>
.mb {
	margin-bottom: 25px;
}
</style>

<script>
export default {
	data() {
		return {
			tableData: [],
			loading: true,
			commodity: {
				cname: '',
				status: '',
			},
			pageNum: 1,
			pageSize: 50,
			username: "",
			cartList: []
		}
	},
	created() {
		this.findAllCommodity()
		this.username = this.$route.params.username
		this.cartList = this.$route.params.cartList
	},
	methods: {
		addToCart(rowData) {
			var flag = 0
			for (var i = this.cartList.length - 1; i >= 0; i--) {
				if (this.cartList[i].cname == rowData.cname) {
					this.cartList[i].num += 1
					flag = 1
					break
				}
			}
			if (flag == 0) {
				rowData.checked = false
				rowData.num = 1
				this.cartList.push(rowData)
			}
			console.log(this.cartList)
		},
		exit() {
			this.$router.push("/registerAndLogin")
		},
		withoutAdvice() {
			this.$message.success("不，你没有意见")
		},
		withoutHelp() {
			this.$message.success("提供不了任何帮助")
		},
		detailCommodity(rowData) {
			this.$router.push({name: "DetailCommodity", params: {rowData: rowData, username: this.username, cartList: this.cartList}})
		},
		goToMyOrder() {
			this.$router.push({name: "MyOrder", params: {username: this.username, cartList: this.cartList}})
		},
		goToPersonCenter() {
			this.$router.push({name: "PersonCenter", params: {username: this.username, cartList: this.cartList}})
		},
		goToCart() {
			this.$router.push({name: "Cart", params: {username: this.username, cartList: this.cartList}})
		},
		findAllCommodity() {
			const URL = "http://127.0.0.1:9999/commodity" + "?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize

			console.log(URL)
			this.axios.get(URL)
			.then((response) => {
				for (var i = 0; i < response.data.length; i++) {
					if (response.data[i].status == '1') {
						this.tableData.push(response.data[i])
					}
				}
				// this.tableData = response.data
				this.loading = false
				this.$message.success("successful")
			}).catch((error) => {
				this.$message.error("error...")
			})
		},
		searchCommodityByCommodity() {
			if (this.commodity.cname == "") {
				this.findAllCommodity()
			} else {
				this.loading = true
				const URL = "http://127.0.0.1:9999/commodity/findByCommodity"

				this.axios.post(URL, this.$qs.stringify(this.commodity))
				.then((response) => {
					this.tableData = response.data
					this.loading = false
					this.$message.success("successful")
				}).catch((error) => {
					this.$message.error("error...")
				})
			}
		},
		todo() {
			this.$message.error("别点了，这里没东西！！！")
		}
	}
}
</script>