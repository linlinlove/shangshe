<template>
	<view class="container">
		<view class="c-list" style="padding-top: 10px;">
		            
		            <view class="c-row b-b">
		                <text class="tit">订单号码</text>
		                <text class="con t-r">{{ dataInfo.orderNumber }}</text>
		            </view>
					<view class="c-row b-b">
					    <text class="tit">订单类型</text>
					    <text class="con t-r">
							<text v-if="dataInfo.orderType == 1" >现货订单</text>
							<text v-else-if="dataInfo.orderType == 2" >预约订单</text>
							
						</text>
					</view>
		            <view class="c-row b-b">
		                <text class="tit">产品名称</text>
		                <text class="con t-r">{{ dataInfo.goodsName }}</text>
		            </view>
		            <view class="c-row b-b">
		                <text class="tit">产品图片</text>
		                <!-- <image :src="$store.state.HTTP+dataInfo.siteGoods.smallPic" mode="aspectFill" style="width: 100px;height: 100px;"></image> -->
						<image :src="currentImage(dataInfo.siteGoods)" mode="aspectFill" style="width: 100px;height: 100px;"></image>
		            </view>
		            <view class="c-row b-b">
		                <text class="tit">产品说明</text>
		                <text class="con t-r">{{ dataInfo.goodsDesc }}</text>
		            </view>
		            <view class="c-row b-b">
		                <text class="tit">预定时间</text>
		                <text class="con t-r">{{ dataInfo.createTime }}</text>
		            </view>
					<view class="c-row b-b">
					    <text class="tit">产品单价</text>
					    <text class="con t-r">{{ dataInfo.goodsPrice }} 元</text>
					</view>
		            <view class="c-row b-b">
		                <text class="tit">预定数量</text>
		                <text class="con t-r">{{ dataInfo.goodsTotalWeight }} {{ dataInfo.goodsUnit }}</text>
		            </view>
		            <view class="c-row b-b">
		                <text class="tit">总共价格</text>
		                <text class="con t-r">{{ dataInfo.goodsTotalPrice }} 元</text>
		            </view>
					
					<view class="c-row b-b">
					    <text class="tit">订购人</text>
					    <text class="con t-r">{{ dataInfo.createBy }} </text>
					</view>
					<view class="c-row b-b">
					    <text class="tit">联系电话</text>
					    <text class="con t-r">{{ dataInfo.phonenumber}} </text>
					</view>
					<view class="c-row b-b">
					    <text class="tit">车牌号</text>
					    <text class="con t-r">{{ dataInfo.plateNum}} </text>
					</view>
					<view class="c-row b-b">
					    <text class="tit">下单时间</text>
					    <text class="con t-r">{{ dataInfo.createTime}} </text>
					</view>
					<view class="c-row b-b">
					    <text class="tit">订单状态</text>
					    <text class="con t-r">
						
							    <text v-if="dataInfo.orderStatus == -2" style="color: red;">已过期</text>
							    <text v-else-if="dataInfo.orderStatus == -1" style="color: red;">已作废</text>
							    <text v-else-if="dataInfo.orderStatus == 0"style="color: orange;">待交货</text>
							    <text v-else-if="dataInfo.orderStatus == 1" style="color: green;">已交货</text>	
					
						</text>
					</view>
					
					
		            <view class="c-row b-b">
		                <text class="tit">状态</text>
		                <text class="con t-r">
							<text v-if="dataInfo.goodsArriveStatus == 0" style="color: red;">未到货</text>
							<text v-else-if="dataInfo.goodsArriveStatus == 1" style="color: green;">已到货</text>
							<text v-else-if="dataInfo.goodsArriveStatus == 2" style="color: red;">已售完</text>
						</text>
		            </view>
		
		            <!-- 根据订单状态显示不同的信息 -->
		            <view class="c-row b-b">
		                <text class="tit">基地名称</text>
		                <text class="con t-r"><text v-for="(val,i) in dataInfo.siteGoods.parkSiteList" :key="i">{{val.siteName}}、</text></text>
		            </view>
		            <view class="c-row b-b" v-if="dataInfo.status === '已交货'">
		                <text class="tit">交货时间</text>
		                <text class="con t-r">{{ dataInfo.deliveryTime }}</text>
		            </view>
					
		        </view>
		
		
	</view>
</template>

<script>
	export default{
		components: {
		},
		data() {
			return {
				dataInfo:{},
				dataTypeList:[],
				orderid:""
			};
		},
		onLoad(options){
			this.orderid = options.id;
			this.loadData();
		},
		methods:{
			loadData(){
				uni.request({
				    url: this.$store.state.HTTP+`/shangshe/advanceOrder/${this.orderid}`,
					method:"GET",
					header:{
						Authorization:"Bearer " + uni.getStorageSync('token')
					},
				    data: {},
				    success: (res) => {
						if(res.data.code === 200){
							this.dataInfo = res.data.data;
						}
				    }
				});
			},
			currentImage(item) {
			      if (item && item.smallPic) {
			        return this.$store.state.HTTP + item.smallPic ;
			      } else {
			        return '/static/images/product/strawberry.jpg';
			      }
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
			width: 140upx;
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

</style>
