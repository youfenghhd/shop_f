<template>
	<div>
		<section class="commodity-item">
			<div class="header">
				<el-page-header @back="() => this.$router.back()"/>
			</div>

			<el-form ref="form">
				
				<el-card>
					<header>添加商品信息</header>
					<el-form-item label="cname" prop="cname" disabled>
						<el-input v-model="commodity.cname" type="text" maxlength="50" show-word-limit/>
					</el-form-item>
					<el-form-item label="price" prop="price" disabled>
						<el-input v-model="commodity.price" type="text" maxlength="100" show-word-limit/>
					</el-form-item>
					<el-form-item label="repertory" prop="repertory" disabled>
						<el-input v-model="commodity.repertory" type="text" maxlength="50" show-word-limit/>
					</el-form-item>
					
				</el-card>

				<div class="action">
					<el-button type="primary" @click="handleUpdate">确认添加</el-button>
				</div>
			</el-form>

		</section>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				commodity: {
					cname: "",
					price: "",
					repertory: "",
				},
			}
		},
		methods: {
			backTocommodity() {
				this.$router.back()
			},
			handleUpdate() {
				const URL = "http://127.0.0.1:9999/commodity/insert"
				this.axios.post(URL, this.$qs.stringify(this.commodity))
				.then((response) => {
					this.loading = false
					if (response.data == true) {
						this.$message.success("update successful")
						this.backTocommodity()
					} else {
						this.$message.error("update failed")
					}
				}).catch((error) => {
					this.$message.error("error...")
				})
			},
		}
	}
</script>
