<template>
	<view class="content" style="height: calc(100% - 45px)">
		<view class="navbar" :style="{position:headerPosition}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				现货
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				临新出品
			</view>
		</view>
		<!-- <u-sticky bgColor="#fff" offset-top="40">
		    <u-tabs :list="searchTabs[filterIndex]" keyName="name" :current="tabIndex" @change="tabChange" lineColor="var(--app-theme)"></u-tabs>
		</u-sticky> -->
		<view class="goods-list">
			<view v-for="(item, index) in goodsList" :key="index" class="goods-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<image :src="currentImage(item)" mode="aspectFill"></image>
				</view>
				<view style="width: calc(100% - 110px);margin-left: 10px;padding-top: 3px;">
					<view class="clamp" style="font-weight: 600;overflow: hidden;text-overflow: ellipsis; white-space: nowrap;">基地：<text v-for="(val,i) in item.parkSiteList" :key="i">{{val.siteName}}、</text></view>
					<text class="title clamp" style="font-size: 13px;">产品：{{item.goodsName||"—"}}</text>
					<view class="price-box" style="color: #ff0000;">
						<text>价格：<text class="price" style="margin-right: 5px;">{{item.goodsPrice||0}}</text> 元</text>
						<text>产品基数：{{item.baseWeight}} {{item.goodsUnit}}</text>
					</view>
					<view class="price-box " style="margin-right: 5px;">
						{{item.goodsDesc}}
					</view>
					
					
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		<view class="ConditionalQuery" @click="showConditionalQuery">
			<view>条件查询</view>
		</view>
		<u-popup  :show="showPop" @close="showPop=false" round="10">
			<view class="from">
				<u--form :labelWidth="80" :model="info" ref="uForm" >
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
					<u-form-item label="选择基地" prop="info.base" borderBottom >
						<view @click="showBase=true">{{info.base?info.base:'选择基地'}}</view>
					</u-form-item>
				</u--form>
				<u-button type="primary" @click="submitSearch">查询</u-button>
			</view>
			
			<u-picker :show="showBase" :columns="baseList" keyName="name" @confirm="confirm" @cancel="showBase=false;"></u-picker>
		</u-popup>
		<custom-tabbar  :tabIndex="0"></custom-tabbar>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	export default {
		data() {
			return {
				    
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0, 
				cateId: 0, //已选三级分类id
				goodsList: [],
				siteName: "",    // 场站名
				goodsName: "",   // 货品名
				goodsDesc: "",
				tabIndex:0,
				searchTabs:[
					[
						{type:0,name:"全部"},
						{type:1,name:"按时间"},
						{type:2,name:"按基地"},
						{type:3,name:"按产品"},
					],
					[
						{type:0,name:"全部"},
						{type:1,name:"按时间"},
						{type:2,name:"按产地"},
						{type:3,name:"按产品"},
					]
				],
				showPop: false,
				showBase: false,
				info:{
					startTime:uni.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss'),
					endTime:uni.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss'),
					base:"",
				},
				currPage: 1,
				pageSize: 10,
				baseList:[[{id:1,name:"基地1"}]]
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
		computed: {
			// baseList(){
			// 	return [[
			// 		{id:1,name:"基地1"},
			// 		{id:2,name:"基地2"},
			// 		{id:3,name:"基地3"},
			// 	]]
			// }
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
				
				//let goodsList = await this.$api.json('goodsList');
				let data = await this.getGoodsData();
				if(data.code!==200){
					this.$api.msg(data.msg);
				}else{
					this.goodsList = this.goodsList.concat(data.rows);
				}
				this.currPage++; 
				//判断是否还有下一页，有是more  没有是nomore
				this.loadingType  = this.goodsList.length >= data.total ? 'nomore' : 'more';
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
			},
			getGoodsData(){
				return new Promise((resolve, reject) => {
					let sendData = {
						pageNum: this.currPage,
						pageSize: this.pageSize,
						arriveType: this.filterIndex == 1?0:1,
						siteName: this.siteName,    // 将前端字段值传递给后端
						goodsName: this.goodsName,
						goodsDesc: this.goodsDesc,
						status:1,
					};
					uni.request({
					            url: this.$store.state.HTTP + '/customer/SiteGoods/list',
					            method: "GET",
					            data: sendData,
					            success: (res) => {
					                uni.hideLoading();
					                if (res.data.code === 200) {
					                    // 过滤出 status 为 1 的商品信息
					                    const filteredData = res.data.rows.filter(item => item.status === 1);
					                    resolve({
					                        code: 200,
					                        rows: filteredData,
					                        total: filteredData.length,
					                    });
					                } else {
					                    reject(res.data);
					                }
					            },

					            fail: (err) => {
					                uni.hideLoading();
					                reject(err);
					                this.$api.msg(err.errMsg);
						}
					});
				
				})
				
			},
			//产地
			getProductAddress(){
				uni.request({
				    url: this.$store.state.HTTP+'/customer/goodsAdress/list',
					method:"GET",
				    success: (res) => {
						if(res.data.code === 200){
							let data = res.data.rows;
							data.forEach((item, index) => {
							  item.name = item.adressSimple;
							});
							this.baseList[0] = data;
						}
				    }
				});
			},
			//筛选点击
			tabClick(index){
				if(this.filterIndex === index && index !== 2){
					return;
				}
				this.filterIndex = index;
				this.tabIndex=0;//重置筛选
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			tabChange({index,name}){
				console.log(index,name)
				this.tabIndex=index;
				// 筛选数据
				this.loadData('refresh', 1);
			},
			//详情
			navToDetailPage(item){
				let id = item.id;
				uni.navigateTo({
					url: `/pages/index/reserve?id=${id}`
				})
			},
			confirm({value}){
				console.log(value)
				this.info.base=value[0].name;
				this.showBase=false;
			},
			showConditionalQuery(){
				this.getProductAddress();
				this.showPop = true;
			},
			submitSearch(){
				let info=this.info;
				console.log(info)
				this.showPop = false;
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
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	page, .content{
		//background: $page-color-base;
		background-color: #f4f4f4;
	}
	
	.navbar{
		position: relative;
		left: 0;
		// top: var(--window-top);
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
			color: $font-color-dark;
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
				&.active{
					color: $base-color;
				}
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
		// background: rgba(0,0,0,0);
		// z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 100%;
			max-height: 80%;
			background: #fff;
			float:right;
			transform: translateY(100%);
			transition: .3s;
			font-size: 30upx;
			color: $font-color-dark;
			padding: 0 20upx;
			overflow-y: scroll;
			/*  #ifdef APP-PLUS */
			padding-top: 180px !important;
			/* #endif */
			.distance-lable{
				padding: 10upx 0;
				display: flex;
				flex-wrap: wrap;
				text{
					// width: 50px;
					border: 1upx solid #dcdcdc;
					margin-right: 5upx;
					margin-bottom: 20upx;
					border-radius: 5px;
					text-align: center;
					padding: 10upx 20upx;
				}
				.active{
					border-color: #ff0000c2;
					color: #ff0000c2;
					background-color: #f0bdb699;
				}
			}
			.server-lable{
				padding: 10upx 0;
				display: flex;
				flex-wrap: wrap;
				text{
					border: 1upx solid #dcdcdc;
					margin-right: 10upx;
					margin-bottom: 20upx;
					border-radius: 5px;
					text-align: center;
					padding: 10upx 20upx;
				}
			}
			.bottom-btn{
				// position: absolute;
				// bottom: 0px;
				padding: 20upx 0;
				button{
					width: 60%;
				}
			}
			.radioGroup{
				view{
					padding: 20upx 10upx;
					border-bottom: 1upx solid #EBEEF5;
				}
				.active{
					color: #F95748;
				}
			}
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			.cate-content{
				transform: translateY(0);
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
		.active{
			color: $base-color;
		}
	}
	.map-box{
		height: calc(100% - 84px);
		margin-top: 84px;
		/*  #ifdef APP-PLUS */
		height: calc(100% - 164px);
		margin-top: 164px;
		/* #endif */
	}
	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 20upx;
		padding-top: 44px;
		// background: #fff;
		.goods-item{
			display:flex;
			width: 100%;
			padding-bottom: 20upx;
			margin:5px 0;
			border-radius: 5px;
			background-color: #fff;
			// &:nth-child(2n+1){
			// 	margin-right: 4%;
			// }
			padding: 5px;
			.cont-wrapper{
				width: calc(100% - 160upx);
				padding: 0 20upx;
				.title{
					font-weight: 600;
					text{
						float: right;
						font-size: 12px;
						font-weight: 400;
						// transform: scale(0.8)
					}
				}
				.labeltext{
					text{
						display: inline-block;
						border:1upx solid #D6D6D6;
						border-radius: 2px;
						font-size: 12px;
						padding: 1px 2px;
						color: #303133;
						margin-right:3px;
						// color: #C0C4CC;
						color: rgb(255, 145, 41);
						border: 1px solid rgb(255, 145, 41);
					}
				}
				.attr{
					display: inline-block;
					font-size: 12px;
					color: $font-color-light;
				}
				.bot{
					border-top: 1upx dashed #EAEAEA;
					image{
						width: 12px;
						height: 10px;
					}
				}
			}
		}
		.image-wrapper{
			width: 80px;
			height: 80px;
			border-radius: 5px;
			overflow: hidden;
			margin: 10px 2px;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 60upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24upx;
			color: $font-color-light;
			// margin-top: -5px;
		}
		.price{
			font-size: $font-lg;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
			// text{
			// 	font-size: 40upx;
			// 	color: $uni-color-primary;
			// 	color: #FF371B;
			// 	font-weight: 600;
			// 	margin-right: 10upx;
			// }
		}
		.state-box{
			// display: flex;
			// view{
			// 	flex: 1;
			// }
			text{
				display: inline-block;
				padding:0px 3px;
				color: #fff;
				border-radius: 3px;
				margin: 0px 2px 0px 5px; 
			}
		}
	}
	/*头部标签*/
	.label-box{
		overflow-x: scroll;
		word-break: keep-all;
		display: flex;
		background-color: rgb(255, 255, 255);
		position: fixed;
		padding-top: 5px;
		width: 100%;
		z-index: 10;
		.label-text{
			display: inline-block;
			border:1px solid #D6D6D6;
			border-radius: 10px;
			font-size: 12px;
			margin: 0px 5px 10px 5px;
			padding: 1px 5px;
			color: #303133;
			word-break: keep-all;
		}
		.active{
			border:1px solid #49D9AC;
		}

	}
	.scanCode{
		position: fixed;
		right: 20px;
		bottom: 80px;
		background-color: #49D9AC;
		color: #F8F6FC;
		width: 55px;
		height: 55px;
		border-radius: 50%;
		text-align: center;
		line-height: 18px;
		padding: 10px;
		font-size: 12px;
		image{
			width: 20px;
			height: 20px;
			margin-bottom: -4px;
		}
	}
	.navigation-box{
		position: fixed;
		bottom: 0px;
		padding: 15upx;
		font-size: 30upx;
		color: $font-color-light;
		text-align: center;
		width: 100%;
		.cont{
			border-radius: 5px;
			background-color: #FFFFFF;
			padding-top: 5px;
		}
		.btn{
			font-size: 40upx;
			background-color: #FFFFFF;
			margin: 5px 0;
			border-radius: 5px;
			line-height: 40px;
			color: #1890FF;
		}
	}
	.popWindow{
		position: fixed;
		bottom: 0px;
		width: 100%;
	}
	.bottom-btn{
		display: flex;
		border-top:1upx solid #EAEAEA;
		font-size: 13px;
		view{
			flex: 1;
			text-align: center;
			padding-top: 20upx;
			padding-bottom: 20upx;
		}
		.p-b-btn{
			display:flex;
			/* flex-direction: column; */
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
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
		image{
			display: inline-block;
			vertical-align: middle;
		}
		text{
			 display: inline-block;
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