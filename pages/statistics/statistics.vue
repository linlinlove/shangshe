<template>
	<view class="container">
		
		<view class="from">
			<u--form :labelWidth="80" :model="info" ref="uForm" >

				<u-form-item label="选择基地" prop="info.base" borderBottom >
					<view @click="showBase = true">{{info.base?info.base:'选择基地'}}</view>
				</u-form-item>
				
				<u-form-item label="输入产品" prop="info.base" borderBottom >
					<view @click="showProduct = true">{{info.product?info.product:'选择产品'}}</view>
				</u-form-item>
				<u-form-item label="开始时间" prop="info.searchBegin" borderBottom>
				  <picker mode="date" :value="info.searchBegin" @change="bindDateChange1">
				    <view class="uni-input">{{ info.searchBegin }}</view>
				  </picker>
				</u-form-item>
				
				<u-form-item label="截止时间" prop="info.searchEnd" borderBottom>
				  <picker mode="date" :value="info.searchEnd" @change="bindDateChange2">
				    <view class="uni-input">{{ info.searchEnd }}</view>
				  </picker>
				</u-form-item>


			</u--form>
			<view style="display: flex;">
				<u-button type="primary" @click="submitSearch" style="margin-right: 2%;">按条件统计</u-button>
				<u-button type="primary" @click="allSearch">全部统计</u-button>
			</view>
		</view>
		<view class="c-list" style="padding-top: 10px;">
			<view class="c-row b-b">
				<text class="tit">产品信息数</text>
				<text class="con t-r">{{ dataInfo.totalGoodsNum||0 }} 个</text>
			</view>
			<view class="c-row b-b">
				<text class="tit">总发布信息数</text>
				<text class="con t-r">{{ dataInfo.totalSiteGoodsNum||0 }} 笔</text>
			</view>
			<view class="c-row b-b">
				<text class="tit">当前有效发布信息数</text>
				<text class="con t-r">{{ dataInfo.validSiteGoodsNum||0 }} 笔</text>
			</view>
			<view class="c-row b-b">
				<text class="tit">累计订单数数</text>
				<text class="con t-r">{{ dataInfo.totalOrderNum||0 }} 笔</text>
			</view>
			<view class="c-row b-b">
				<text class="tit">未交付订单数</text>
				<text class="con t-r">{{ dataInfo.notConfirmOrderNum||0 }} 笔</text>
			</view>
			<view class="c-row b-b">
				<text class="tit">已交互订单数</text>
				<text class="con t-r">{{ dataInfo.realConfirmOrderNum||0 }} 笔</text>
			</view>
			<view class="c-row b-b">
				<text class="tit">无效订单数</text>
				<text class="con t-r">{{ dataInfo.invalidOrderNum||0 }} 笔</text>
			</view>
			<!-- <view class="c-row b-b">
				<text class="tit">产品种类</text>
				<text class="con t-r">{{ dataInfo.productDescription }} 种</text>
			</view>
			<view class="c-row b-b">
				<text class="tit">开始时间</text>
				<text class="con t-r">{{ dataInfo.bookingTime }}</text>
			</view>
			<view class="c-row b-b">
				<text class="tit">总共收益</text>
				<text class="con t-r">{{ dataInfo.totalPrice }} 元</text>
			</view> -->
		</view>
		<u-picker :show="showBase" :columns="[baseList]" keyName="name" @confirm="confirm1" @cancel="showBase=false;"></u-picker>
		<u-picker :show="showProduct" :columns="[productList]" keyName="name" @confirm="confirm2" @cancel="showProduct=false;"></u-picker>
		<custom-tabbar  :tabIndex="3"></custom-tabbar>
		
	</view>
</template>

<script>
	export default{
		components: {
		},
		data() {
			return {
				dataInfo:{},
				showBase: false,
				showProduct: false,
				info:{
					base:"",
					product:"",
					searchBegin: "请选择开始时间", // 添加开始时间
					searchEnd: "请选择结束时间",    // 添加截止时间
				},
				baseIndex:'',
				baseId:'',
				baseDatas:[],
				baseList:[{id:1,name:"基地1"}],
				productId:"",
				productIndex: '',
				productDatas:[],
				productList:[{id:1,name:"产品1"}],
				searchBegin:"",
				searchEnd:""
			};
		},
		onLoad(){
			this.loadData();
			//this.getProductAddress();//产地
			this.getProductSite();//基地
			this.getProductDatas();
		},
		methods:{
			 bindDateChange1(e) {
			    this.info.searchBegin = e.detail.value;
			  },
			
			  bindDateChange2(e) {
			    this.info.searchEnd = e.detail.value;
			  },
			 loadData() {
			    this.dataInfo = {};
				uni.request({
				    url:  this.$store.state.HTTP+'/shangshe/advanceOrder/count', 
				    method: 'GET',
					header:{
						Authorization:"Bearer " + uni.getStorageSync('token')
					},
					data:{goodsId:this.productId,siteId:this.baseId,searchBegin:this.searchBegin,searchEnd:this.searchEnd},
				    success: (res) => {
						// 请求成功，处理返回的数据
						if (res.data.code === 200) {
							this.dataInfo = res.data.data;
						} else {
							// 请求失败，处理错误信息
							uni.showToast({
								title: res.data.msg || '请求失败',
								icon: 'none',
								duration: 2000,
							});
						}
					},
					fail: (err) => {
				        // 请求失败，处理错误信息
						uni.showToast({
							title: '请求失败',
							icon: 'none',
							duration: 2000,
						});
					},
				});
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
							this.baseList = newArr;
						}
				    }
				});
			},
			//产地
			getProductAddress(){
				uni.request({
				    url: this.$store.state.HTTP+'/shangshe/goodsAdress/list',
					method:"GET",
					header:{
						Authorization:"Bearer " + uni.getStorageSync('token')
					},
				    success: (res) => {
						if(res.data.code === 200){
							this.baseDatas = res.data.rows;
							let data = res.data.rows;
							data.forEach((item, index) => {
							  item.name = item.adressSimple;
							});
							this.baseList = data;
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
							this.productList = newArr;
							
						}
				    }
				});
			},
			confirm1(e){
				this.info.base = e.value[0];
				this.baseIndex = e.indexs[0];
				this.showBase = false;
			},
			confirm2(e){
				this.info.product = e.value[0];
				this.productIndex = e.indexs[0];
				this.showProduct = false;
			},
			
			submitSearch() {
				if(this.baseIndex){
					this.baseId = this.baseDatas[this.baseIndex].id;
				}
				if(this.productIndex){
					this.productId = this.productDatas[this.productIndex].id;
				}
				this.searchBegin = this.info.searchBegin;
				this.searchEnd = this.info.searchEnd;
			    this.loadData();
			  },
			  allSearch() {
				this.baseId = "";
			    this.productId = "";
				this.searchBegin = "";
				this.searchEnd = "";
			    this.loadData();
			  },
			natoBackpage(){
				uni.navigateBack();
			},
		},
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 360upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 30upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				/* left: -20upx; */
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
		.p-b-btn{
			display:flex;
			/* flex-direction: column; */
			align-items: center;
			/* justify-content: center; */
			font-size: $font-sm;
			color: $font-color-base;
			width: 200upx;
			height: 40upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: $uni-color-primary;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		padding: 20upx 30upx;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 0upx;
			position:relative;
		}
		.tit{
			width: 320upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
			}
		}
		.bz-list{
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
			font-weight: 600;
		}
		.price-row{
			display: flex;
			view{
				flex: 1;
			}
		}
	}
	.pile-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		padding: 20upx 30upx;
		margin-top: 10px;
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
			font-weight: 600;
		}
		.lablespan{
			margin: 10px 0;
			text{
				border: 1px solid #E4E7ED;
				padding: 2px 8px;
				border-radius: 8px;
				margin-right: 3px;
			}
		}
		.piles-box{
			.piles-item{
				display: flex;
				border-bottom: 1px solid #DCDFE6;
				margin-bottom: 20rpx;
				padding-bottom: 10px;
				.ucharts{
					width: 100px;
				}
				.cont{
					width: calc(100% - 100px);
				}
			}
		}
	}
	.clockBox{
		background-color:#FFFFFF;
		padding: 40upx 0;
		.clockBtn{
			width:220upx;
			height:220upx;
			border-radius: 50%;
			background: linear-gradient(0deg,#016AFE, #0195FE);
			box-shadow: 0px 4px 7px #888888;
			margin: auto;
			text-align: center;
			padding-top: 60upx;
			view{
				color: #FFFFFF;
				font-size: 36upx;
			}
			.time{
				color: #c4d7ef;
				font-size: 26upx;
			}
		}
		.clockTip{
			text-align: center;
			color: green;
			font-size: 20upx;
			margin-top: 40upx;
		}
	}
	.price-box{
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: $font-sm + 2upx;
		color: $font-color-light;
		padding: 20upx 0upx;
		// .num{
		// 	margin: 0 8upx;
		// 	color: $font-color-dark;
		// }
		.price{
			font-size: $font-lg;
			color: $font-color-dark;
			// &:before{
			// 	content: '￥';
			// 	font-size: $font-sm;
			// 	margin: 0 2upx 0 8upx;
			// }
		}
	}
	.from{
		padding: 10px;
	}
</style>
