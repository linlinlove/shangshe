<template>
	<view class="content">
		<view class="statistics" v-show="filterIndex === 0">
		      <text>所有发布</text>
		      <text>{{ totalPublishedProducts||0 }}条有效</text>
		      <!-- <text>{{ totalOrders }} 条过期</text> -->
			  
		</view>
		<view  class="statistics" v-show="filterIndex === 1">
		      <text>未交付有效订单数: {{ notConfirmOrderNum||0 }}</text>
		      <text>无效订单数: {{ invalidOrderNum||0  }}</text>
		      <text>已确认订单数: {{ realConfirmOrderNum||0 }}</text>
		</view>
		<view  class="statistics" v-show="filterIndex === 2">
		      <text>产品总数: {{ totalGoodsNum||0  }}</text>
		      <text>当前有效发布信息数: {{validSiteGoodsNum||0 }}</text>
		</view>
		<view class="navbar" :style="{position:headerPosition}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				发布信息
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				订货信息
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				产品信息
			</view>
		</view>
		
		<view class="goods-list">
			<view v-for="(item, index) in goodsList" :key="index" class="goods-item" @click="navToDetailPage(item)" @longpress="showDeletePrompt(item)">
				<template v-if="filterIndex === 0 ">
					<view class="image-wrapper">
						<image :src="currentImage(item)" mode="aspectFill"></image>
					</view>
					<view style="width: calc(100% - 85px);margin-left: 5px;">
						<view class="title clamp">
							<text style="font-weight: 600;">产品：{{item.goodsName}}</text>
							<text class="price-box" style="float: right;"><text class="price"><text style="color: red;font-size: 1.2rem;margin-right: 5px;">{{item.goodsPrice}}</text> / 公斤</text></text>
							<text style="float: right;;margin-right: 10px;" v-if="item.arriveType === 0">临新</text>
							<text style="float: right;margin-right: 10px;" v-else>现货</text>
							
						</view>
						<view class="price-box" style="color: #909399;">
							<text>描述：{{item.goodsDesc}}</text>
						</view>
						<view class="clamp price-box" style="color: #909399;">
							<view style="width: calc(100% - 50px);overflow: hidden;text-overflow: ellipsis;white-space: nowrap">
								基地：<text v-for="(val,i) in item.parkSiteList" :key="i">{{val.siteName}}、</text>
							</view>
							<text style="float: right;" v-if="item.goodsArriveStatus == 0">未到货</text>
							<text style="float: right;color: green;" v-else-if="item.goodsArriveStatus == 1">已到货</text>
							<text style="float: right;color: red;" v-else>已售完</text>
				            
				                 
						</view>
						<view class="clamp price-box" style="color: #909399;">
							<text style="float: right;margin-right: 10px;">发布时间：{{ item.createTime }}</text>
						         
						</view>
				<view class="clamp price-box" style="color: #909399;">
					
				          <!-- 添加截止时间 -->
				          <text style="float: right; margin-right: 10px;" v-if="item.advanceEndTime !== null">
				              截止时间：{{ item.advanceEndTime }}
				          </text>

				          <text style="float: right;margin-right: 10px;" v-else>截止时间：暂无</text>
				
				
				         
				</view>
				<view class="clamp price-box" style="color: #909399;float: right;">
					
				         
				
				
				          <!-- 添加产品基数 -->
				          <text style="float: right;margin-right: 10px;">产品基数：{{ item.baseWeight }}</text>
				</view>				
				
				
					</view>	
				</template>
				<template v-else-if="filterIndex === 1">	
					<view class="image-wrapper">
						<image :src="currentImage(item.siteGoods)" mode="aspectFill"></image>
					</view>
					<view style="width: calc(100% - 85px);margin-left: 5px;">
						<view class="clam6p" style="font-weight: 400;font-size: 13px;margin-top: 5px;">订单：{{item.orderNumber||"—"}}</view>
						<view class="clam6p" style="font-weight: 400;font-size: 13px;margin-top: 5px;">创建时间：{{item.createTime||"—"}}</view>
						<view class="title clamp" style="font-weight: 800;height: 20px;line-height: 20px;">产品：{{item.goodsName}}</view>
						<view class="price-box" style="color: #909399;">
							<view style="width: calc(100% - 100px);overflow: hidden;text-overflow: ellipsis;white-space: nowrap">
								基地：<text v-for="(val,i) in item.siteGoods.parkSiteList" :key="i">{{val.siteName}}、</text>
							</view>
							
						</view>
						<view class="price-box" style="color: #909399;">
							<text>总价格：<text class="price">{{item.goodsPrice*item.goodsTotalWeight}} 元</text></text>
							<text>订购数量：{{item.goodsTotalWeight}} 公斤</text>
							
						</view>
						<view class="price-box" style="color: #909399;">
							<text style="color:#008000 ;">
								<text style="float: right;" v-if="item.goodsArriveStatus == 0">未到货</text>
								<text style="float: right;color: green;" v-else-if="item.goodsArriveStatus == 1">已到货</text>
								<text style="float: right;color: red;" v-else-if="item.goodsArriveStatus == 2">已售完</text>
							</text>	
							<text>订单状态：
							    <text v-if="item.orderStatus == -2" style="color: red;">已过期</text>
							    <text v-else-if="item.orderStatus == -1" style="color: red;">已作废</text>
							    <text v-else-if="item.orderStatus == 0"style="color: orange;">未交货</text>
							    <text v-else-if="item.orderStatus == 1" style="color: green;">已交货</text>	
							</text>
						</view>
						<view class="price-box" style="color: #909399;">
							<text>联系人：{{item.createBy}}</text>
							<text>联系电话：{{item.phonenumber}}</text>
						</view>
					</view>
				</template>		
				<template v-else-if="filterIndex === 2">	
					<view class="image-wrapper">
						<image :src="currentImage(item)" mode="aspectFill"></image>
					</view>
					<view style="width: calc(100% - 85px);margin-left: 5px;">
						<view class="title clamp">
							<text style="font-weight: 600;">产品：{{item.goodsName}}</text>
							<text class="price-box" style="float: right;"><text class="price"><text style="color: red;font-size: 1.2rem;margin-right: 5px;">{{item.goodsPrice}}</text> / {{item.goodsUnit}}</text></text>
						</view>
						<view class="price-box" style="color: #909399;">
							<text>描述：{{item.goodsDesc}}</text>
						</view>
					</view>
				</template>		
					
					
						
					
				
				
			</view>
		</view>
		<uni-load-more :status="loadingType" style="position: relative;bottom: 40px;margin-left: calc(50% - 50px);"></uni-load-more>
		<view class="ConditionalQuery" @click="showPop = true">
			<view v-show="filterIndex == 0">搜索发布</view>
			<view v-show="filterIndex == 1">搜索订货</view>
			<view v-show="filterIndex == 2">搜索产品</view>
		</view>
		<u-popup  :show="showPop" @close="showPop = false" round="10">
			<view class="from">
				<u--form :labelWidth="80" :model="info" ref="uForm" >
					<u-form-item label="开始时间" prop="info.searchBegin" borderBottom>
					  <picker mode="date" :value="info.searchBegin" @change="bindDateChange1">
					    <view class="uni-input">{{info.searchBegin}}</view>
					  </picker>
					</u-form-item>
					<u-form-item label="结束时间" prop="info.searchEnd" borderBottom>
					  <picker mode="date" :value="info.searchEnd" @change="bindDateChange2">
					    <view class="uni-input">{{info.searchEnd}}</view>
					  </picker>
					</u-form-item>


					<u-form-item label="输入产品" prop="info.base" borderBottom >
						<u--input v-model="info.name" disabledColor="#ffffff" placeholder="产品"
								border="none" type="text"></u--input>
					</u-form-item>
					<u-form-item label="订单状态" prop="info.orderStatus" borderBottom >
						<picker mode="selector" :range="orderStatusOptions" :value="info.orderStatus?info.orderStatus:0" @change="bindOrderStatusChange">
						  <view class="uni-input">{{ orderStatusOptions[info.orderStatus||0] }}</view>
						</picker>
					</u-form-item>
						
				</u--form>
				<u-button type="primary" @click="submitSearch">查询</u-button>
			</view>
			
		</u-popup>
		<custom-tabbar  :tabIndex="1"></custom-tabbar>
	</view>
</template>

<script>
	import uniLoadMore from '@/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
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
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0, 
				cateId: 0, //已选三级分类id
				goodsList: [],
				publishedProducts: 0,
				totalPublishedProducts: 0,
				totalOrders: 0,
				pendingValidOrders: 0,
				pendingInvalidOrders: 0,
				pendingFuturesOrders: 0,
				totalBookingQuantity: 0,
				pendingBookingQuantity: 0,
				orderStatusOptions: [ '待确认', '已确认', '已过期', '已作废'],
				currPage: 1,
				pageSize: 10,
				showPop: false,
				info:{
					searchBegin: "请选择开始时间", // 添加开始时间
					searchEnd: "请选择结束时间",    // 添加截止时间
					name:"",
					orderStatus: "",
				},
			};
		},
		
		onLoad(options){
			this.cateId = options.tid;
			this.loadData();
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				if(type === 'refresh'){
					this.goodsList = [];
					this.currPage = 1; 
				}
				
				let data = await this.getGoodsData();
				if(data.code!==200){
					this.$api.msg(data.msg);
				}else{
					this.goodsList = this.goodsList.concat(data.rows);
				}
				this.currPage++; 
				
				//判断是否还有下一页，有是more  没有是nomore
				this.totalPublishedProducts = data.total || 0;
				this.loadingType  = this.goodsList.length >= data.total ? 'nomore' : 'more';
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
			},
			bindOrderStatusChange(e) {
			    this.info.orderStatus = e.detail.value;
			  },

			getGoodsData() {
			    return new Promise((resolve, reject) => {
			        let Url;
			        let sendData = {
			            pageNum: this.currPage,
			            pageSize: this.pageSize,
			            goodsName: this.info.name,
			            orderStatus: this.info.orderStatus,
			            searchBegin: this.info.searchBegin,
			            searchEnd: this.info.searchEnd,
						orderByColumn:"createTime",
						isAsc:"desc"
			        };
			
			        if (this.filterIndex === 0) {
			            // 发布信息
			            Url = this.$store.state.HTTP + '/shangshe/SiteGoods/list';
			            sendData.status = 1;  // 仅获取上架商品
			        } else if (this.filterIndex === 1) {
			            // 订货信息
			            Url = this.$store.state.HTTP + '/shangshe/advanceOrder/list';
			        } else {
			            // 产品信息
			            Url = this.$store.state.HTTP + '/shangshe/GoodsInfo/list';
			        }
			
			        console.log(sendData);
			
			        uni.request({
			            url: Url,
			            method: "GET",
			            header: {
			                Authorization: "Bearer " + uni.getStorageSync('token')
			            },
			            data: sendData,
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
			
			                    this.$forceUpdate();
			
			                    const rows = res.data.rows;
			
			                    if (res.data.code === 200) {
			                        // 过滤出 status 为 1 的商品信息
			      //                   const filteredData = rows;
									// rows.sort((a, b) => {
									// 	const timeA = new Date(a.createTime).getTime();
									// 	const timeB = new Date(b.createTime).getTime();
									// 	return timeB - timeA;
									// });

			                       resolve({
			                           code: 200,
			                           rows: rows,
			                           total: res.data.total,
			                       });

			                    } else {
			                        reject(res.data);
			                    }
			                }
			            },
			            fail: (err) => {
			                console.log(err);
			                uni.hideLoading();
			                reject(err);
			                this.$api.msg(err.errMsg);
			            }
			        });
			    });
			},


			tabClick(index) {
			      if (this.filterIndex === index && index !== 2) {
			        return;
			      }
			      this.filterIndex = index;
			      uni.pageScrollTo({
			        duration: 300,
			        scrollTop: 0,
			      });
			      this.loadData("refresh", 1);
			      uni.showLoading({
			        title: "正在加载",
			      });
			    },
			    //详情
			    navToDetailPage(item) {
			      let id = item.id,Url;
				  if(this.filterIndex == 1){
					  Url = `/pages/adminManage/details?id=${id}`;
				  }else if(this.filterIndex == 2){
					  Url = `/pages/adminManage/productDetails?id=${id}`;
				  }else{
					  Url = `/pages/adminManage/publishDetails?id=${id}`;
				  }
			      uni.navigateTo({
			        url: Url,
			      });
			    },
				bindDateChange1(e) {
				  this.info.searchBegin = e.detail.value;
				  console.log('Search Begin:', this.info.searchBegin);
				},
				
				bindDateChange2(e) {
				  this.info.searchEnd = e.detail.value;
				  console.log('Search End:', this.info.searchEnd);
				},

				submitSearch() {
					console.log(this.info);
				
				  this.loadData("refresh", 1, {
				    'siteGoods.searchBegin': this.info.searchBegin,
				    'siteGoods.searchEnd': this.info.searchEnd
				  });
				},
				currentImage(item) {
				      if (item && item.smallPic) {
				        return this.$store.state.HTTP + item.smallPic ;
				      } else {
				        return '/static/images/product/strawberry.jpg';
				      }
				},
				
				
				
				showDeletePrompt(item) {
				        uni.showModal({
				            title: '删除确认',
				            content: '确定要删除这条信息吗？',
				            success: (res) => {
				                if (res.confirm) {
				                    // 用户点击确定，调用下架接口
				                    this.removeGoods(item);
				                }
				            }
				        });
				    },
				
				    // 调用下架接口，将 status 改为下架状态
				    removeGoods(item) {
				       
				        let sendData = {
				            goodsId: item.goodsId,
							status:0,
				            
				        };
	
				
				uni.request({
				    url: this.$store.state.HTTP + '/shangshe/advanceOrder/update',
				    method: "PUT",
				    header: {
				        Authorization: "Bearer " + uni.getStorageSync('token')
				    },
				    data: {
				        goodsId: item.goodsId,  // 替换成你要下架的订单的ID
				        status: 0  // 将订单的状态修改为 0，表示下架
				        // 其他需要更新的字段也可以在这里添加
				    },
				    success: (res) => {
				        console.log(res);
				        if (res.data.code === 200) {
				            // 下架成功后，重新加载数据或其他操作
				            this.loadData('refresh');
				        } else {
				            uni.showToast({
				                title: '下架失败，请重试',
				                icon: 'none',
				            });
				        }
				    },
				    fail: (err) => {
				        uni.showToast({
				            title: '下架失败，请重试',
				            icon: 'none',
				        });
				    }
				});

	
				    },
				
				
			    stopPrevent() {},
			  },
			};
			
</script>

<style lang="scss">
	
	.content{
		padding-top: 96upx;
	}
		
	.statistics{
		background-color: #f8f8f8;
		padding: 10px;
		text-align: center;
		box-shadow: 0 2upx 4upx rgba(0, 0, 0, 0.1);
		text{
			  padding: 2px;
			  font-size: 18upx;
			}
		}
	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			position: relative;
			&.current{
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
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
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
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
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
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
 			font-size: 28upx;
			color: #555;
			position: relative;
		}
		.two{
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
	}

	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding:  30upx;
		//background: #fff;
		margin-bottom: 15px;
		
		.goods-item{
			border-radius: 5px;
			display:flex;
			// flex-direction: column;
			background-color: #fff;
			margin: 5px 0px;
			width: 100%;
			//padding-bottom: 40upx;
			padding: 5px;
			// &:nth-child(2n+1){
			// 	margin-right: 4%;
			// }
		}
		.image-wrapper{
			width: 80px;
			height: 80px;
			border-radius: 5px;
			overflow: hidden;
			margin: 15px 2px;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			line-height: 80upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
		}
		.price{
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	.ConditionalQuery{
		position: fixed;
		right: 20px;
		bottom: 80px;
		background-color: #3c96f3;
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
</style>
