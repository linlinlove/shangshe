<template>
	<view class="container">
		<view class="from" style="padding-bottom: 50px;">
			<u--form :labelWidth="80" ref="uForm" >
				
				<u-form-item label="选择类别" borderBottom >
					<picker :value="categoryIndex" :range="categoryOptions" @change="onCategoryChange">
						<view class="picker">{{ categoryOptions[categoryIndex] }}</view>
					</picker>
				</u-form-item>
				  <u-form-item :label="categoryIndex == 0 ? '选择基地' : '选择产地'" borderBottom>
					 <!-- 多选框的显示条件是 categoryIndex 为 0 -->
					 <template v-if="categoryIndex == 0">
						 <checkbox-group @change="onBaseChange">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in baseDatas" :key="index" :value="index">
								<view>
									<checkbox :value="item.id" style="transform:scale(0.5)"  />
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
									<checkbox :value="item.id" style="transform:scale(0.5)"  />
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
						border="none" type="textarea" style="height: 100px;"></u--input>
				</u-form-item>
				<u-form-item label="产品单位" borderBottom>
				    <picker :value="goodsUnit" :range="unitOptions" @change="onUnitChange">
				        <view class="picker">{{ goodsUnit }}</view>
				    </picker>

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
						border="none" type="number"></u--input><text style="position: absolute;right: 18px;color: #999;font-size: 12px;top: 15px;">{{goodsUnit}}</text>
				</u-form-item> -->
				<u-form-item label="是否上架" borderBottom >
					<picker :value="statusIndex" :range="statusOptions" @change="onStatusChange">
						<view class="picker">{{ statusOptions[statusIndex] }}</view>
					</picker>
				</u-form-item>
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
			baseOptions: ['请选择'],
			baseIndexes: [],
			productDatas:[],
			productOptions: ['请选择'],
			productIndex: 0,
			productName: '',
			productImage: '',
			productPrice: '',
			goodsUnit: '', // 用户选择的产品单位
			unitOptions: [], // 单位选项列表
			baseWeight: '',
			goodsTotalWeight: '',
			productDescription: '',
			advanceEndTime:uni.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss'),
			imageValue:[],
			smallPic:"",
			statusIndex: 1,
			statusOptions: ['下架','上架'],
		};
	},
	onLoad(){
		this.getProductDatas();
		this.getProductSite();
		this.getUnitOptions();
	},
	methods: {
		onCategoryChange(e) {
		  this.categoryIndex = e.detail.value;
		  if(e.detail.value == 1){
			  this.getProductAddress();
		  }else{
			  this.getProductSite();
		  }
		},
		onBaseChange(e) {
		  this.baseIndexes = e.detail.value;
		},
		onValidityChange(e) {
		  this.productIndex = e.detail.value;
		  this.productPrice = this.productDatas[e.detail.value].goodsPrice;
		  this.productDescription = this.productDatas[e.detail.value].goodsDesc;
		  this.goodsUnit = this.productDatas[e.detail.value].goodsUnit;
		  this.baseWeight = this.productDatas[e.detail.value].baseWeight;
		  let imgObj = {
		  			url: this.$store.state.HTTP+this.productDatas[e.detail.value].smallPic,
		  			extname: 'png',
		  			name: this.productDatas[e.detail.value].smallPic
		  		}
		  this.smallPic = this.productDatas[e.detail.value].smallPic;
		  this.imageValue = [];
		  this.imageValue.push(imgObj);
		},
		onStatusChange(e) {
		  this.statusIndex = e.detail.value;
		},
		bindDateChange(e) {
			this.advanceEndTime = e.detail.value
		},
		 onUnitChange(e) {
		     // 检查是否存在 rows 属性和 rows 数组
		     if (this.unitOptions) {
		         // 使用 e.detail.value 作为索引获取单位数据
		         const selectedUnit = this.unitOptions[e.detail.value];
		         // 处理选中的单位数据
		         console.log('选中的单位：', selectedUnit);
		     } else {
		         console.error('单位数据不正确或为空');
		     }
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
						
						this.productPrice = this.productDatas[0].goodsPrice;
						this.productDescription = this.productDatas[0].goodsDesc;
						this.goodsUnit = this.productDatas[0].goodsUnit;
						this.baseWeight = this.productDatas[0].baseWeight;
						this.smallPic = this.productDatas[0].smallPic;
						let imgObj = {
									url: this.$store.state.HTTP+this.productDatas[0].smallPic,
									extname: 'png',
									name: this.productDatas[0].smallPic
								}
						this.imageValue.push(imgObj);
					}
			    }
			});
		},
		getUnitOptions() {
		        uni.request({
		            url:  this.$store.state.HTTP+'/system/dict/data/list?pageNum=1&pageSize=10&dictType=goods_unit_dict',
		            method: 'GET',
					header:{
						Authorization:"Bearer " + uni.getStorageSync('token')
					},
		           success: (res) => {
		               console.log('接口返回的单位选项数据：', res.data);
		               if (res.data.code === 200) {
						   let data =  res.data.rows;
						   let newArr = [];
						   data.forEach((item,idnex)=>{
							   newArr.push(item.dictValue);
						   })
		                   this.unitOptions = newArr;
		               } else {
		                   // 处理接口请求失败的情况
		               }
		           },

		            fail: (err) => {
		                // 处理接口请求失败的情况
		            }
		        });
		    },
		submit() {
		  // 执行您的逻辑
		  let parame = {
		    arriveType: this.categoryIndex,
		    siteIdList: this.baseIndexes, 
		    goodsId: this.productDatas[this.productIndex].id,
		    goodsName: this.productOptions[this.productIndex],
		    productImage: this.productImage,
		    goodsPrice: this.productPrice,
		    baseWeight: this.baseWeight,
			goodsUnit:this.goodsUnit,
			smallPic:this.smallPic,
		    goodsDesc: this.productDescription,
		    advanceEndTime: this.advanceEndTime + " 00:00:00",
		    goodsTotalWeight: 0,
		    status: this.statusIndex,
		  };
		  		
		  console.log("提交数据：", parame);
		  uni.request({
		    url: this.$store.state.HTTP + "/shangshe/SiteGoods",
		    method: "POST",
		    header: {
		      Authorization: "Bearer " + uni.getStorageSync("token"),
		    },
		    data: parame,
		    success: (res) => {
		      if (res.data.code === 200) {
		        this.$modal.showToast("提交成功");
		        this.clear();
		      }
		    },
		  });
		},
		clear() {
		  // 清空表单数据
		  this.categoryIndex = 0;
		  this.baseIndexes = []; // 清空选中基地的数组
		  this.productIndex = 0;
		  this.productImage = "";
		  this.productPrice = "";
		  this.baseWeight = "";
		  this.goodsUnit = "";
		  this.smallPic = "";
		  this.productDescription = "";
		  this.goodsTotalWeight = "";
		  this.statusIndex = 0;
		  this.advanceEndTime = uni.$u.timeFormat(new Date().getTime(), "yyyy-mm-dd hh:MM:ss");
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

	.u-form-item-checkbox-group {
	  display: flex;
	  flex-direction: column;
	}
	
	.checkbox-label {
	  margin-left: 10px; 
	}
	
	.checkbox-item {
	  display: flex;
	  align-items: center;
	}
.u-form-item-checkbox-group {
  display: flex;
  flex-direction: column;
}

.checkbox-label {
  margin-left: 10px; /* Adjust the margin as needed */
}

.checkbox-item {
  display: flex;
  align-items: center;
}
.uni-list-cell {
	display: flex;
	justify-content: flex-start
}

</style>
