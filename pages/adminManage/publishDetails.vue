<template>
	<view class="container">
		<view class="from" style="padding-bottom: 50px;">
			<u--form :labelWidth="80" ref="uForm" >
				
				<u-form-item label="选择类别" borderBottom >
					<picker :value="categoryIndex" :range="categoryOptions" @change="onCategoryChange">
						<view class="picker">{{ categoryOptions[categoryIndex] }}</view>
					</picker>
				</u-form-item>
				<u-form-item label="是否上架" borderBottom>
				    <picker :value="statusIndex" :range="statusOptions" @change="onStatusChange">
				        <view class="picker">{{ statusOptions[statusIndex] }}</view>
				    </picker>
				</u-form-item>


				<u-form-item :label="categoryIndex == 0 ? '选择基地' : '选择产地'" borderBottom>
					 <!-- 多选框的显示条件是 categoryIndex 为 0 -->
					 <template v-if="categoryIndex == 0">
						 <checkbox-group @change="onBaseChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in baseDatas" :key="index" :value="index">
								<view>
									<checkbox :value="item.id" :checked="item.checked" style="transform:scale(0.5)"  />
								</view>
								<view style="margin-top: 3px;">{{item.siteName}}</view>
							</label>
						</checkbox-group>
					 </template>
					 
					 <!-- 多选框的显示条件是 categoryIndex 为 1 -->
					 <template v-else>
						 <checkbox-group @change="onBaseChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in baseDatas" :key="index" :value="index">
								<view>
									<checkbox :value="item.id" :checked="item.checked" style="transform:scale(0.5)"  />
								</view>
								<view style="margin-top: 3px;">{{item.adressSimple}}</view>
							</label>
						</checkbox-group>
					 </template>
				 </u-form-item>
				<u-form-item label="产品名称" borderBottom >
					<picker :value="productIndex" mode="selector" :range="productOptions" @change="onValidityChange">
						<view class="picker">{{ productOptions[productIndex] }}</view>
					</picker>
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
					<u--input v-model="productDescription" disabledColor="#ffffff" placeholder="产品介绍"
						border="none" type="textarea"></u--input>
				</u-form-item>
				<u-form-item label="产品单位" borderBottom >
					<u--input v-model="goodsUnit" disabledColor="#ffffff" placeholder="请输入数量"
						border="none" type="text"></u--input>
				</u-form-item>
				<u-form-item label="产品价格" borderBottom >
					<u--input v-model="productPrice" disabledColor="#ffffff" placeholder="请输入价格"
						border="none" type="number"></u--input><text style="position: absolute;right: 18px;color: #999;font-size: 12px;top: 15px;">每{{goodsUnit}}</text>
				</u-form-item>
				<u-form-item label="产品基数" borderBottom >
					<u--input v-model="baseWeight" disabledColor="#ffffff" placeholder="请输入数量"
						border="none" type="number"></u--input><text style="position: absolute;right: 18px;color: #999;font-size: 12px;top: 15px;">{{goodsUnit}}</text>
				</u-form-item>
				<!-- <u-form-item label="产品总重" borderBottom >
					<u--input v-model="goodsTotalWeight" disabledColor="#ffffff" placeholder="请输入产品总重量"
						border="none" type="number"></u--input><text style="position: absolute;right: 18px;color: #999;font-size: 12px;top: 15px;">公斤</text>
				</u-form-item> -->
				<!-- <u-form-item label="是否上架" borderBottom >
					<picker :value="statusIndex" :range="statusOptions" @change="onStatusChange">
						<view class="picker">{{ statusOptions[statusIndex] }}</view>
					</picker>
				</u-form-item> -->
				<u-form-item label="截止时间" borderBottom >
					<picker mode="date" :value="advanceEndTime" @change="bindDateChange">
						<view class="uni-input">{{advanceEndTime}}</view>
					</picker>
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
			baseDatas:[],
			baseOptions: ['基地1'],
			baseIndex: 0,
			productDatas:[],
			productOptions: ['产品1'],
			productIndex: 0,
			productName: '',
			productImage: '',
			productPrice: '',
			goodsUnit:'公斤',
			baseWeight: '',
			goodsTotalWeight: '',
			productDescription: '',
			advanceEndTime:uni.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss'),
			imageValue:[],
			smallPic:"",
			statusIndex: 1,
			statusOptions: ['下架','上架'],
			productId:"",
			isShelf: true, 
			siteIdList:[]
		};
	},
	onLoad(options){
		this.productId = options.id;
		this.getProductDatas();
		this.getProductSite();
		uni.showLoading({
			title: '加载中'
		})
	},
	methods: {
		loadData(){
			uni.request({
			    url: this.$store.state.HTTP+`/shangshe/SiteGoods/${this.productId}`,
				method:"GET",
				header:{
					Authorization:"Bearer " + uni.getStorageSync('token')
				},
			    data: {},
			    success: (res) => {
					if(res.data.code === 200){
						this.productPrice = res.data.data.goodsPrice;
						this.productDescription = res.data.data.goodsDesc;
						this.goodsUnit = res.data.data.goodsUnit;
						this.baseWeight = res.data.data.baseWeight;
						this.smallPic = res.data.data.smallPic;
						this.statusIndex = res.data.data.status;
						let imgObj = {
									url: this.$store.state.HTTP+res.data.data.smallPic,
									extname: 'png',
									name: res.data.data.smallPic
								}
						this.imageValue.push(imgObj);
						
						this.productDatas.forEach((item, index) => {
							if(res.data.data.goodsId == item.id){
								this.productIndex = index;
							}
						});
						let siteData = res.data.data.siteIdList||[];
						this.baseDatas.forEach((item, index) => {
							siteData.forEach((val, i) => {
								if(item.id == val){
									item.checked = true;
								}
							});
						});
						uni.hideLoading();
					}
			    }
			});
		},
		onCategoryChange(e) {
		  this.categoryIndex = e.detail.value;
		  if(e.detail.value == 1){
			  this.getProductAddress();
		  }else{
			  this.getProductSite();
		  }
		},
		onBaseChange(e) {
		  this.baseIndex = e.detail.value;
		},
		onValidityChange(e) {
		  this.productIndex = e.detail.value;
		  this.productPrice = this.productDatas[e.detail.value].goodsPrice;
		  this.productDescription = this.productDatas[e.detail.value].goodsDesc;
		  this.goodsUnit = this.productDatas[e.detail.value].goodsUnit;
		  this.smallPic = this.productDatas[e.detail.value].smallPic;
		  let imgObj = {
		  			url: this.$store.state.HTTP+this.productDatas[e.detail.value].smallPic,
		  			extname: 'png',
		  			name: this.productDatas[e.detail.value].smallPic
		  		}
		  this.imageValue = [];
		  this.imageValue.push(imgObj);
		},
		onStatusChange(e) {
		  this.statusIndex = e.detail.value;
		  this.isShelf = this.statusIndex === 1;
		},
		bindDateChange(e) {
			this.advanceEndTime = e.detail.value
		},
		//基地
		getProductSite(){
			uni.request({
			    url: this.$store.state.HTTP+'/customer/parkSite/list',
				method:"GET",
			    success: (res) => {
					if(res.data.code === 200){
						let data = res.data.rows||[];
						this.baseDatas = res.data.rows||[];
						let newArr = [];
						data.forEach((item, index) => {
						  newArr.push(item.siteName);
						});
						this.baseOptions = newArr;
					}
			    }
			});
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
						this.loadData();
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
				goodsUnit: this.goodsUnit,
				baseWeight: this.baseWeight,
				smallPic:this.smallPic,
				goodsDesc: this.productDescription,
				advanceEndTime: this.advanceEndTime+" 00:00:00",
				goodsTotalWeight: 0,
				status: this.statusIndex,
				isShelf: this.isShelf, // 将是否上架的值加入参数
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
			this.baseWeight = "";
			this.goodsUnit = "";
			this.smallPic = "";
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
		}
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
	.uni-list-cell {
		display: flex;
		justify-content: flex-start
	}
</style>
