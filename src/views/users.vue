<template>
	<div>
		<el-col :span="6">
			<el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="searchName" clearable></el-input>
		</el-col>
		<el-col :span="2">
			<el-button type="primary" @click="searchUserByName">查找</el-button>
		</el-col>

		<el-table :data="tableData" v-loading="loading" style="width: 100%">
    		<el-table-column prop="id" label="id" width="120"></el-table-column>
    		<el-table-column prop="username" label="username" width="120"></el-table-column>
    		<el-table-column prop="password" label="password" width="120"></el-table-column>
    		<el-table-column prop="gender" label="gender" width="120"></el-table-column>
    		<el-table-column prop="address" label="address" width="180"></el-table-column>
    		<el-table-column prop="balance" label="balance" width="180"></el-table-column>
    		<el-table-column prop="status" label="status" width="120">
    			<template slot-scope="scope">
    				<span v-if="scope.row.status == '1'">正常</span>
    				<span v-if="scope.row.status == '0'">停用</span>
    			</template>
    		</el-table-column>
    		<el-table-column label="操作">
    			<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="openUpdatePasswordDialog(scope.row)">重置密码</el-button>
    				<el-button size="mini" type="danger" @click="updateStatus(scope.row)">切换状态</el-button>
    			</template>
    		</el-table-column>
  		</el-table>

  		<el-dialog title="修改密码" :visible.sync="updatePasswordDialogVisible" width="40%">
  			username:<el-input v-model="currentUser.username" disabled ></el-input>
  			<br/>
  			password:<el-input v-model="currentUser.password"></el-input>
  			<br/>
  		    <el-button @click="updatePasswordDialogVisible = false">取 消</el-button>
      		<el-button type="primary" @click="updatePassword">提 交</el-button>
  		</el-dialog>
	</div>
</template>

<style type="text/css"></style>

<script>
	export default {
		data() {
			return {
				tableData: [],
				loading: true,
				searchName: "",
				updatePasswordDialogVisible: false,
				currentUser: {},
			}
		},
		created() {
			this.findAllUser()
		},
		methods: {
			openUpdatePasswordDialog(rowData) {
				this.updatePasswordDialogVisible = true
				this.currentUser = rowData
				console.log(this.currentUser)
			},
			updateStatus(rowData) {
				const URL = "http://127.0.0.1:9999/user/updateStatus?id=" + rowData.id + "&status=" + rowData.status
				console.log(URL)
				this.axios.put(URL)
				.then((response) => {
					this.loading = false
					if (response.data == true) {
						this.$message.success("update user status successful")
						rowData.status = rowData.status == "1" ? "0" : "1"
						window.location.reload
					} else {
						this.$message.error("update failed")
					}
				}).catch((error) => {
					this.$message.error("error...")
				})
			},
			findAllUser() {
				const URL = "http://127.0.0.1:9999/user"
				this.axios.get(URL)
				.then((response) => {
					this.tableData = response.data
					this.loading = false
					this.$message.success("successful")
				}).catch((error) => {
					this.$message.error("error...")
				})
			},
			updatePassword() {
				const URL = "http://127.0.0.1:9999/user/updatePassword?id=" + this.currentUser.id + "&password=" + this.currentUser.password 
				this.axios.put(URL)
				.then(response => {
					this.$message.success("password has been modified")
					this.updatePasswordDialogVisible = false
				}).catch(error => {
					this.$message.error("error...")
				})
			},
			searchUserByName() {
				if (this.searchName == "") {
					this.findAllUser()
				} else {
					this.loading = true
					const URL = "http://127.0.0.1:9999/user/username/" + this.searchName
					console.log(URL)

					this.axios.get(URL)
					.then((response) => {
						this.tableData = [response.data]
						this.loading = false
						this.$message.success("successful")
					}).catch((error) => {
						this.$message.error("error...")
					})
				}
			},
		},
	}
</script>
