<template>
	<view class="content">
		<!-- 用户统计信息区域 -->
		<!-- <view class="user-stats">
			<text>总订单数: {{ totalOrders }}</text>
			<text>未交互订单数: {{ pendingOrders }}</text>
			<text>总订货量: {{ totalBookingQuantity }}</text>
			<text>未交付订货量: {{ pendingBookingQuantity }}</text>
		</view> -->
		<view class="user-stats">
		  <text>当前订单 共{{ goodsList.length || 0 }}笔，{{ totalWeight ? totalWeight.toFixed(2) : 0 }}斤  {{ totalGoodsNum ? totalGoodsNum.toFixed(2) : 0 }}元</text>


		</view>

		<view class="navbar" :style="{ position: headerPosition }">
			<view class="nav-item" :class="{ current: filterIndex === 0 }" @click="tabClick(0)">
				当前订单
			</view>
			<view class="nav-item" :class="{ current: filterIndex === 1 }" @click="tabClick(1)">
				历史订单
			</view>
		</view>
		<view class="goods-list" @longpress="showDeletePrompt">
			<view v-for="(item, index) in goodsList" :key="index" class="goods-item" @click="navToDetailPage(item)">
				
				<view class="image-wrapper">
					<image :src="currentImage(item.siteGoods)" mode="aspectFill"></image>
				</view>
				<view style="width: calc(100% - 110px); margin-left: 10px; padding-top: 3px;">
					<view class="clamp" style="font-size: 12px;">订单号：{{ item.orderNumber||"—" }}</view>
					<view class="clamp" style="font-size: 12px;">订单日期时间：{{ item.createTime||"—" }}</view>
					<view class="clamp" style="font-size: 12px;">基地/生产地：<text v-for="(val,index) in item.siteGoods.parkSiteList" :key="index">{{val.siteName}}、</text></view>
					<view class="clamp" style="font-size: 12px;">产品名称：{{item.goodsName||"—"}}</view>
					<view class="clamp" >
						<text style="margin-right: 10px;">价格：<text class="price">{{ item.goodsPrice||0 }} 元/{{item.goodsUnit||""}}</text></text>
						<text>订购数量：{{ item.goodsTotalWeight||0 }} {{item.goodsUnit||""}}</text>
						
					</view>
					
					<view class="clamp" >
						<text style="margin-right: 10px;">状态：
							<text class="status" v-if="item.siteGoods.goodsArriveStatus == 0" style="color: red;">未到货</text>
							<text class="status" v-else-if="item.siteGoods.goodsArriveStatus == 1" style="color: green;">已到货</text>
							<text class="status" v-else-if="item.siteGoods.goodsArriveStatus == 2" style="color: red;">已售完</text>
						</text>
						<text class="price">总价:{{ item.goodsTotalPrice||0  }} 元</text>
						

					</view>
					<view class="clamp" style="font-size: 12px;">
						
						<text>订单状态：
						    <text v-if="item.orderStatus == -2" style="color: red;">已过期</text>
						    <text v-else-if="item.orderStatus == -1" style="color: red;">已作废</text>
						    <text v-else-if="item.orderStatus == 0"style="color: orange;">待交货</text>
						    <text v-else-if="item.orderStatus == 1" style="color: green;">已交货</text>	
						</text>
						
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType" style="position: relative;bottom: 40px;margin-left: calc(50% - 50px);"></uni-load-more>
		<view class="ConditionalQuery" @click="showConditionalQuery">
			<view>条件查询</view>
		</view>
		<u-popup  :show="showPop" @close="showPop=false" round="10">
			<view class="from">
				<u-form :labelWidth="80" :model="info" ref="uForm" >
					<u-form-item label="开始时间" prop="info.startTime" borderBottom >
						<picker mode="date" :value="info.startTime" @change="bindDateChange1">
							<view class="uni-input">{{info.startTime}}</view>
						</picker>
					</u-form-item>
					<u-form-item label="结束时间" prop="info.endTime" borderBottom >
						<picker mode="date" :value="info.endTime" @change="bindDateChange2">
							<view class="uni-input">{{info.endTime}}</view>
						</picker>
					</u-form-item>
					<u-form-item label="选择基地" prop="info.base" borderBottom>
					    <view @click="loadBaseList">{{ info.base ? info.base : '选择基地' }}</view>
					  </u-form-item>
					<u-form-item label="订单状态" prop="info.orderStatus" borderBottom >
						<picker mode="selector" :range="orderStatusOptions" :value="info.orderStatus" @change="bindOrderStatusChange">
						  <view class="uni-input">{{ orderStatusOptions[info.orderStatus] }}</view>
						</picker>
					</u-form-item>

				</u-form>
				<u-button type="primary" @click="submitSearch">查询</u-button>
			</view>
			
			<u-picker :show="showBase" :columns="baseList" keyName="name" @confirm="confirm" @cancel="showBase=false;"></u-picker>
			<u-picker :show="showProducts" :columns="productsList" keyName="name" @confirm="confirm" @cancel="showProducts=false;"></u-picker>
		</u-popup>
		
		<custom-tabbar :tabIndex="1"></custom-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				realConfirmTotalWeight: null,
				    totalSiteGoodsNum: null,
				    totalGoodsNum: null,
				    totalWeight: null,
				    totalOrderNum: null,
				    realConfirmOrderNum: null,
				    invalidOrderNum: null,
				    notConfirmOrderNum: null,
				    validSiteGoodsNum: null,
				goodsName:"",
				goodsPrice:"",
				goodsTotalWeight :"",
				cateMaskState: 0,
				headerPosition: "fixed",
				headerTop: "0px",
				loadingType: 'more',
				filterIndex: 0,
				cateId: 0,
				goodsList: [],
				totalOrders: 0,
				pendingOrders: 0,
				totalBookingQuantity: 0,
				pendingBookingQuantity: 0,
				info:{
					startTime:uni.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss'),
					endTime:uni.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss'),
					base:"",
					orderStatus: 0,
				},
				currPage: 1,
				pageSize: 10,
				showPop: false,
				showBase: false,
				showProducts: false,
				baseList:[[]],
				productsList:[[{id:1,name:"产品1"}]],
				createUserId:"",
				orderStatus:0,
				orderStatusOptions: [ '待确认', '已确认', '已过期', '已作废'],
			};
		},
		onLoad(options) {
			//this.cateId = options.tid;
			this.loadData();
		},
		onPageScroll(e) {
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		onReachBottom() {
			this.loadData();
		},
		computed: {
			// baseList(){
			// 	return [[
			// 		{id:1,name:"产地1"},
			// 		{id:2,name:"产地2"},
			// 		{id:3,name:"产地3"},
			// 	]]
			// }
		},
		methods: {
			async loadData(type = 'add', loading) {
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more'
				}
				if (type === 'refresh') {
					this.goodsList = [];
				}
				//let goodsList = await this.$api.json('goodsList');
				let data = await this.getGoodsData();
				if(data.code==200){
					this.goodsList = this.goodsList.concat(data.rows);
				}else if(data.code === 401){
					this.$api.msg("未登录，请先进行登录操作！");
				}else{
					this.$api.msg(data.msg);
				}
				
				//判断是否还有下一页，有是more  没有是nomore
				this.loadingType  = this.goodsList.length >= data.total ? 'nomore' : 'more';

				if (type === 'refresh') {
					if (loading == 1) {
						uni.hideLoading();
					} else {
						uni.stopPullDownRefresh();
					}
				}
			},
			bindOrderStatusChange(e) {
			    this.info.orderStatus = e.detail.value;
			  },
			getGoodsData(){
				return new Promise((resolve, reject) => {
					let sendData = {
						pageNum: this.currPage,
						pageSize: this.pageSize,
						orderStatus:this.orderStatus,
						createUserId:uni.getStorageSync('userId')||"",
						orderByColumn: 'createTime',
						isAsc: 'desc'
					};
					
					uni.request({
					    url: this.$store.state.HTTP+'/shangshe/advanceOrder/list',
						method:"GET",
						header:{
							Authorization:"Bearer " + uni.getStorageSync('token')
						},
					    data:sendData,
					    success: (res) => {
							uni.hideLoading();  
							if (res.data && res.data.otherData !== undefined) {
							    const otherData = res.data.otherData;
							    if (otherData) {
							      this.realConfirmTotalWeight = otherData.realConfirmTotalWeight;
							      this.totalSiteGoodsNum = otherData.totalSiteGoodsNum;
							      this.totalGoodsNum = otherData.totalGoodsNum;
							      this.totalWeight = otherData.totalWeight;
							      this.totalOrderNum = otherData.totalOrderNum;
							      this.realConfirmOrderNum = otherData.realConfirmOrderNum;
							      this.invalidOrderNum = otherData.invalidOrderNum;
							      this.notConfirmOrderNum = otherData.notConfirmOrderNum;
							      this.validSiteGoodsNum = otherData.validSiteGoodsNum;
							    }
								 this.totalGoodsNum = 0;
								          if (res.data.rows && res.data.rows.length > 0) {
								            for (const order of res.data.rows) {
								              this.totalGoodsNum += order.goodsTotalPrice || 0;
								            }
								          }	
								this.totalWeight= 0;
								         if (res.data.rows && res.data.rows.length > 0) {
								           for (const order of res.data.rows) {
								             this.totalWeight += order.goodsTotalWeight || 0;
								           }
								         }				  
											  
											  
											  
							    this.$forceUpdate();
										
							    const rows = res.data.rows;
							  }
							  resolve(res.data);
							},
							fail: (err) =>{
							uni.hideLoading();
							reject(err)
							this.$api.msg(err.errMsg);
						}
					});
				
				})
				
			},
			loadBaseList() {
			      this.getProductAddress();
			      this.showBase = true;
			    },
			
			    // 从后端获取基地数据
			    getProductAddress() {
			      uni.request({
			        url: this.$store.state.HTTP + '/customer/goodsAdress/list',
			        method: 'GET',
			        success: (res) => {
			          if (res.data.code === 200) {
			            let data = res.data.rows;
			            data.forEach((item, index) => {
			              item.name = item.adressSimple;
			            });
			            this.baseList[0] = data;
			          }
			        },
			      });
			    },
				e1() {
				      // 你可以在这里添加具体的逻辑，或者保持为空
				    },
			//产品
			getProductDatas(){
				uni.request({
				    url: this.$store.state.HTTP+'/shangshe/SiteGoods/list',
					method:"GET",
					header:{
						Authorization:"Bearer " + uni.getStorageSync('token')
					},
				    success: (res) => {
						if(res.data.code === 200){
							let data = res.data.rows;
							data.forEach((item, index) => {
							  item.name = item.adressSimple;
							});
							this.productsList[0] = data;
						}
				    }
				});
			},
			tabClick(index) {
				if (this.filterIndex === index) {
					return;
				}
				this.filterIndex = index;
				if(this.filterIndex == 0){
					this.orderStatus = 0;
				}else{
					this.orderStatus = -100;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				});
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				});
			},
			navToDetailPage(item) {
				let orderNum = item.orderNumber;
				uni.navigateTo({
					url: `/pages/ManageWork/orderInfo?orderNum=${orderNum}`
				});
			},
			confirm({value}){
				console.log(value)
				this.info.base=value[0].name;
				this.showBase=false;
			},
			showConditionalQuery(){
				this.getProductAddress();
				this.getProductDatas();
				this.showPop = true;
			},
			submitSearch(){
				let info=this.info;
				this.info.orderStatus = this.orderStatus
				console.log(info)
				this.showPop = false;
				this.loadData('refresh', 1);
			},
			bindDateChange1(e) {
				this.info.startTime = e.detail.value
			},
			bindDateChange2(e) {
				this.info.endTime = e.detail.value
			},
			currentImage(item) {
			      if (item && item.smallPic) {
			        return this.$store.state.HTTP + item.smallPic ;
			      } else {
			        return '/static/images/product/strawberry.jpg';
			      }
			},
			// showDeletePrompt() {
			//         uni.showModal({
			//             title: '确认删除',
			//             content: '确定要删除吗？',
			//             success: (res) => {
			//                 if (res.confirm) {
			//                     // 用户点击确定，调用下架接口
			//                     this.deleteGoods();  // 你需要实现 deleteGoods 方法
			//                 }
			//             }
			//         });
			//     },
			
			//     // 下架接口调用
			//     deleteGoods() {
			//         // 调用下架接口的代码，可以参考之前的 uni.request 示例
			//     },
			stopPrevent() {}
		},
	};
</script>

<style lang="scss">
	page,
	.content {
		//background: $page-color-base;
	}

	.user-stats {
		background-color: #f8f8f8;
		padding: 5px;
		text-align: center;
		box-shadow: 0 2upx 4upx rgba(0, 0, 0, 0.1);

		text {
			padding: 5px;
			font-size: 22upx
		}
	}

	.content {
		padding-top: 96upx;
	}

	.navbar {
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			position: relative;

			&.current {
				color: $app-theme;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}


		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}

		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 20upx;
		margin-bottom: 15px;
		// background: #fff;
		.goods-item {
			display: flex;
			width: 100%;
			padding-bottom: 20upx;
			margin: 10upx 0;
			border-radius: 5px;
			background-color: #fff;

			// &:nth-child(2n+1){
			// 	margin-right: 4%;
			// }
			.cont-wrapper {
				width: calc(100% - 160upx);
				padding: 0 20upx;

				.title {
					font-weight: 600;

					text {
						float: right;
						font-size: 12px;
						font-weight: 400;
						// transform: scale(0.8)
					}
				}

				.labeltext {
					text {
						display: inline-block;
						border: 1upx solid #D6D6D6;
						border-radius: 2px;
						font-size: 12px;
						padding: 1px 2px;
						color: #303133;
						margin-right: 3px;
						// color: #C0C4CC;
						color: rgb(255, 145, 41);
						border: 1px solid rgb(255, 145, 41);
					}
				}

				.attr {
					display: inline-block;
					font-size: 12px;
					color: $font-color-light;
				}

				.bot {
					border-top: 1upx dashed #EAEAEA;

					image {
						width: 12px;
						height: 10px;
					}
				}
			}
		}

		.image-wrapper {
		  position: relative;
		  width: 160upx;
		  height: 160upx;
		  overflow: hidden;
		  margin-top: 70upx;
		
		  image {
		    position: absolute;
		    top: 50%;
		    transform: translateY(-50%);
		    left: 10px; 
		    width: calc(100% - 10px); 
		    height: 100%;
		    border-radius: 5px; 
		    opacity: 1;
		  }
		}
		



		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 60upx;
		}

		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;

			font-size: 12px;
		}

		.price {
			line-height: 1;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	.ConditionalQuery{
		position: fixed;
		right: 20px;
		bottom: 80px;
		background-color:#3c96f3;
		color: #F8F6FC;
		width: 55px;
		height: 55px;
		border-radius: 50%;
		text-align: center;
		line-height: 18px;
		padding: 10px;
		font-size: 12px;
		z-index: 999;
		image{
			width: 20px;
			height: 20px;
			margin-bottom: -4px;
		}
	}
	.from{
		padding: 20upx;
		margin-bottom: 60px;
	}
	.clamp{
		font-size: 12px;
		padding: 3px;
	}
	button{
		    width: 50px;
		    font-size: 11px;
		    height: 20px;
		    line-height: 20px;
		    text-align: center;
		    margin: 0;
		    float: right;
	}
</style>