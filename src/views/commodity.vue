<template>
	<div>
		<el-col :span="6">
			<el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" v-model="commodity.cname" clearable></el-input>
		</el-col>
		<el-col :span="4">
			<el-form>
				<el-form-item label>
					<el-select v-model="commodity.status" placeholder="请选择商品状态">
						<el-option label="全部" value=""></el-option>
						<el-option label="在售" value="1"></el-option>
						<el-option label="下架" value="0"></el-option>
					</el-select>
				</el-form-item>
			</el-form>

		</el-col>
		<el-col :span="2">
			<el-button type="primary" @click="searchCommodityByCommodity">查找</el-button>
		</el-col>
		<el-col :span="2">
			<el-button type="primary" @click="addCommodity">新增商品</el-button>
		</el-col>

		<el-table :data="tableData" v-loading="loading" style="width: 100%">
    		<el-table-column prop="id" label="id" width="120"></el-table-column>
    		<el-table-column prop="cname" label="cname" width="120"></el-table-column>
    		<el-table-column prop="price" label="price" width="120"></el-table-column>
    		<el-table-column prop="repertory" label="repertory" width="120"></el-table-column>
    		<el-table-column prop="status" label="status" width="120">
    			<template slot-scope="scope">
    				<span v-if="scope.row.status == '1'">在售</span>
    				<span v-if="scope.row.status == '0'">下架</span>
    			</template>
    		</el-table-column>
    		<el-table-column label="操作">
    			<template slot-scope="scope">
					<el-button size="mini" :type="scope.row.status == '1' ? 'danger' : 'success'" @click="updateStatus(scope.row)">{{scope.row.status == "1" ? "下架" : "发布"}}</el-button>
    				<el-button size="mini" type="danger" @click="updateCommodity(scope.row)">修改商品</el-button>
    			</template>
    		</el-table-column>
  		</el-table>
  		  	<div class="block">
    			<el-pagination
    			  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="10"></el-pagination>
  			</div>
	</div>
</template>

<style type="text/css"></style>

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
				dialogVisible: false,
				pageNum: 1,
				pageSize: 5,
			}
		},
		created() {
			this.findAllCommodity()
		},
		methods: {
			findAllCommodity() {
				const URL = "http://127.0.0.1:9999/commodity" + "?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize

				console.log(URL)
				this.axios.get(URL)
				.then((response) => {
					this.tableData = response.data
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
			updateStatus(rowData) {
				const URL = "http://127.0.0.1:9999/commodity/update"
				this.axios.put(URL, this.$qs.stringify(rowData))
				.then((response) => {
					this.loading = false
					if (response.data == true) {
						this.$message.success("update successful")
						rowData.status = rowData.status == "1" ? "0" : "1"
						window.location.reload
					} else {
						this.$message.error("update failed")
					}
				}).catch((error) => {
					this.$message.error("error...")
				})
			},
			updateCommodity(rowData) {
				this.$router.push({name: "UpdateCommodity", params: {rowData: rowData}})
			},
			addCommodity() {
				this.$router.push("/addCommodity")
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.findAllCommodity()
			},
			handleCurrentChange(val) {
				this.pageNum = val
				this.findAllCommodity()
			}
		},
	}
</script>
