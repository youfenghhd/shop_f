<template>
	<div>
		<el-card style="margin: 80px auto; width: 40%;">
		<h3>测试支付宝支付</h3>
      		<el-row>
      		    <el-col :span="21">&nbsp;</el-col>
      		    <el-col :span="1">
      		        <el-button type="primary" @click="toBack">返回</el-button>
      		    </el-col>
      		</el-row>

      		<el-row style="margin-top: 30px;">
				<el-form label-width="80px" :model="aliPay">
					<el-form-item label="订单id">
						<el-input v-model="aliPay.traceNo" disabled></el-input>
					</el-form-item>
					<el-form-item label="订单价格">
						<el-input v-model="aliPay.totalAmount" disabled></el-input>
					</el-form-item>
				</el-form>
				<a :href="payURL">确定支付</a>
      		</el-row>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				aliPay: {
					traceNo: "",
					totalAmount: 0.0
				},
				cartList: [],
				username: "",
			};
		},
		created() {
    		this.aliPay.totalAmount = this.$route.params.price
    		this.cartList = this.$route.params.cartList
    		this.username = this.$route.params.username
    		this.aliPay.traceNo = this.randomString(32)
		},
		computed:{
			payURL:function() {
				return "http://localhost:9999/alipay/pay?subject=收购阿里&traceNo=" +
          this.aliPay.traceNo + "&totalAmount=" + this.aliPay.totalAmount
			}
		},
		methods: {
			toBack() {
      			this.$router.push({name: "Cart", params: {cartList: this.cartList, username: this.username}})
			},
			randomString(e) {
				e = e || 32
				var t = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890"
				var a = t.length
				var n = ""

				for (var i = 0; i < e; i++) {
					n += t.charAt(Math.floor(Math.random() * a))
				}
				return n
			}
		}

	};
</script>
