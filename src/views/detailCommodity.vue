<template>
	<div>
		<section class="commodity-item">
			<el-card style="width: 40%; margin: 80px auto; padding: 20px;">
				<el-button type="primary" @click="toBack">返回</el-button>
				<el-card style="margin: 20px;">
					<h1>只能查看的商品信息</h1>
					<el-row>
						<h1 style="text-align: center;">商品ID：{{commodity.id}}</h1>
					</el-row>
					<el-row>
						<h1 style="text-align: center;">商品名称：{{commodity.cname}}</h1>
					</el-row>
					<el-row>
						<h1 style="text-align: center;">商品价格：{{commodity.price}}</h1>
					</el-row>
					<el-row>
						<h1 style="text-align: center;">商品库存：{{commodity.repertory}}</h1>
					</el-row>
					
				</el-card>
			</el-card>


		</section>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				commodity: {
					id: "",
					cname: "",
					price: "",
					repertory: "",
				},
				username: "",
				cartList: [],
			}
		},
		created(rowData, username) {
			console.log(this.$route.params)
			this.commodity.id= this.$route.params.rowData.id
			this.commodity.cname = this.$route.params.rowData.cname
			this.commodity.price = this.$route.params.rowData.price
			this.commodity.repertory = this.$route.params.rowData.repertory
			this.username = this.$route.params.username
			this.cartList = this.$route.params.cartList
		},
		methods: {
			toBack() {
				this.$router.push({name: "Mall", params: {username: this.username, cartList: this.cartList}})
			},

		}
	}
</script>
