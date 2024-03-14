<template>
	<view class="container">
		<view class="from" style="padding-bottom: 50px;">
			<u--form :labelWidth="80" :model="productInfo" ref="uForm" >
				
				<u-form-item label="产品名称" borderBottom >
					<u--input v-model="productInfo.goodsName" disabledColor="#ffffff" placeholder="产品介绍"
						border="none" type="text"></u--input>
				</u-form-item>
				<u-form-item label="产品图片" borderBottom >
					<uni-file-picker 
						v-model="imageValue" 
						fileMediatype="image" 
						mode="grid" 
						@select="select" 
						@progress="progress" 
						@success="success" 
						@fail="fail" 
					/>
				</u-form-item>
				<u-form-item label="产品介绍" borderBottom >
					<u--input v-model="productInfo.goodsDesc" disabledColor="#ffffff" placeholder="产品介绍"
						border="none" type="textarea"></u--input>
				</u-form-item>
				<u-form-item label="产品单位" borderBottom >
					<u--input v-model="productInfo.goodsUnit" disabledColor="#ffffff" placeholder="请输入数量"
						border="none" type="text"></u--input>
				</u-form-item>
				<u-form-item label="产品单价" borderBottom >
					<u--input v-model="productInfo.goodsPrice" disabledColor="#ffffff" placeholder="请输入价格"
						border="none" type="number"></u--input><text style="position: absolute;right: 18px;color: #999;font-size: 12px;top: 15px;">元 /{{productInfo.goodsUnit}}</text>
				</u-form-item>
				<u-form-item label="产品基数" borderBottom >
					<u--input v-model="productInfo.baseWeight" disabledColor="#ffffff" placeholder="请输入价格"
						border="none" type="number"></u--input>
				</u-form-item>
				<u-form-item label="备注" borderBottom >
					<u--input v-model="productInfo.remark" disabledColor="#ffffff" placeholder="备注"
						border="none" type="textarea"></u--input>
				</u-form-item>
			</u--form>
			<u-button type="primary" @click="submit" style="margin-top: 20px;">提交</u-button>
		</view>
		<custom-tabbar  :tabIndex="0"></custom-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			categoryOptions: ['现货', '临新出品'],
			categoryIndex: 0,
			baseLable:"选择基地",
			baseDatas:[],
			baseOptions: ['基地1'],
			baseIndex: 0,
			productDatas:[],
			productOptions: ['产品1'],
			productIndex: 0,
			productName: '',
			productImage: '',
			productPrice: '',
			goodsTotalWeight: '',
			productDescription: '',
			
			imageValue:[],
			statusIndex: 1,
			statusOptions: ['下架','上架'],
			productId:"",
			productInfo:{
				advanceEndTime:uni.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss'),
			}
		};
	},
	onLoad(options){
		this.productId = options.id;
		this.loadData();
		this.getProductAddress();
		this.getProductDatas();
	},
	methods: {
		loadData(){
			uni.request({
			    url: this.$store.state.HTTP+`/shangshe/GoodsInfo/${this.productId}`,
				method:"GET",
				header:{
					Authorization:"Bearer " + uni.getStorageSync('token')
				},
			    data: {},
			    success: (res) => {
					if(res.data.code === 200){
						this.productInfo = res.data.data;
						let imgObj = {
							url: this.$store.state.HTTP+res.data.data.smallPic,
							extname: 'png',
							name: res.data.data.smallPic
						}
						this.imageValue.push(imgObj);
					}
			    }
			});
		},
		onCategoryChange(e) {
		  this.categoryIndex = e.detail.value;
		  if(e.detail.value == 1){
			  this.baseLable = "选择产地";
		  }else{
			  this.baseLable = "选择基地";
		  }
		},
		onBaseChange(e) {
		  this.baseIndex = e.detail.value;
		},
		onValidityChange(e) {
		  this.productIndex = e.detail.value;
		},
		onStatusChange(e) {
		  this.statusIndex = e.detail.value;
		},
		bindDateChange(e) {
			this.productInfo.advanceEndTime = e.detail.value
		},
		//产地
		getProductAddress(){
			uni.request({
			    url: this.$store.state.HTTP+'/customer/goodsAdress/list',
				method:"GET",
			    success: (res) => {
					if(res.data.code === 200){
						let data = res.data.rows||[];
						this.baseDatas = res.data.rows||[];
						let newArr = [];
						data.forEach((item, index) => {
						  newArr.push(item.adressSimple);
						});
						this.baseOptions = newArr;
					}
			    }
			});
		},
		//产品
		getProductDatas(){
			uni.request({
			    url: this.$store.state.HTTP+'/shangshe/GoodsInfo/list',
				method:"GET",
				header:{
					Authorization:"Bearer " + uni.getStorageSync('token')
				},
			    success: (res) => {
					if(res.data.code === 200){
						let data = res.data.rows||[];
						this.productDatas = res.data.rows||[];
						let newArr = [];
						data.forEach((item, index) => {
						  newArr.push(item.goodsName);
						});
						this.productOptions = newArr;
					}
			    }
			});
		},
		uploadImage() {
		  // 上传图片逻辑，可以使用uni.uploadFile等方法
		  // 上传成功后，将图片路径赋值给productImage
		},
		submit() {
			let parame = {
				arriveType: this.categoryIndex,
				siteIdList: [this.baseDatas[this.baseIndex].id],
				goodsId: this.productDatas[this.productIndex].id,
				goodsName: this.productOptions[this.productIndex],
				productImage: this.productImage,
				goodsPrice: this.productPrice,
				goodsDesc: this.productDescription,
				advanceEndTime: this.advanceEndTime+" 00:00:00",
				goodsTotalWeight: 0,
				status:this.statusIndex
			}
		  console.log('提交数据：', parame);
		   uni.request({
		       url: this.$store.state.HTTP+'/shangshe/SiteGoods',
				method:"POST",
				header:{
					Authorization:"Bearer " + uni.getStorageSync('token')
				},
				data:parame,
				success: (res) => {
					if(res.data.code === 200){
						this.$modal.showToast("提交成功")
						this.clear();
					}
				}
			});
		},
		clear() {
			// 清空表单数据
			this.categoryIndex = 0;
			this.baseIndex = 0;
			this.productIndex = 0;
			this.productIndex = 0;
			this.productImage = "";
			this.productPrice = "";
			this.productDescription = "";
			this.goodsTotalWeight = "";
			this.statusIndex = 0;
			this.advanceEndTime = uni.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss');
		},
		// 获取上传状态
		select(e){
			console.log('选择文件：',e)
		},
		// 获取上传进度
		progress(e){
			console.log('上传进度：',e)
		},
		
		// 上传成功
		success(e){
			console.log('上传成功')
		},
		
		// 上传失败
		fail(e){
			console.log('上传失败：',e)
		},
		currentImage(item) {
		      if (item && item.smallPic) {
		        return this.$store.state.HTTP + item.smallPic ;
		      } else {
		        return '/static/images/product/strawberry.jpg';
		      }
		},
	},
};
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		background-color: #fff;
		padding: 20px;
	}
	.title {
		font-size: 18px;
		font-weight: bold;
		margin: 20px 0;
		text-align: center;
	}
	text{
		font-size: 16px;
	}
	.item {
		margin: 8px 0;
		display: flex;
		
	}
	
	.picker {
		/* border: 1px solid #1b9c35; */
		padding: 5px;
		border-radius: 5px;
	}
		
	textarea{
		width: 250px;
		height: 150px;
	}
	.btn-group {
		display: flex;
		justify-content: space-between;
	}
	image{
		width: 100px;
		height: 100px;
	}
	button {
		background-color: #1b9c35;
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		height: 35px;
		width: 100px;
		text-align: center;
		line-height: 35px;
	}
	.u-form-item{
		position: relative !important;
	}
</style>
