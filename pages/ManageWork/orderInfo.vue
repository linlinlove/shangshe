<template>
	<view class="container">
		
		<view class="c-list" style="padding-top: 10px;">
			<view class="c-list" style="padding-top: 0;">
				<view class="c-row b-b">
					<text class="tit">订单二维码</text>
					<view class="canvas">
					<!-- 二维码插件 width height设置宽高 -->
					<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
					</view>
					<!-- <image src="../../static/images/index/ewm.png" mode="aspectFill" style="width: 100px; height: 100px;padding: 10px;"></image> -->
				</view>
				<view class="c-row b-b">
					<text class="tit">订单号码</text>
					<text class="con t-r">{{ dataInfo.orderNumber }}</text>
				</view>
				<view class="c-row b-b" style="align-items: start;">
					<text class="tit">产品名称</text>
					<text class="con t-r">{{dataInfo.goodsName }}</text>
				</view>
				<view class="c-row b-b">
					<text class="tit">产品图片</text>
					<!-- <image :src="item.image" mode="aspectFill" style="width: 100px;height: 100px;"></image> -->
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
					<text class="con t-r">{{ dataInfo.goodsPrice }} 元 / {{dataInfo.goodsUnit||""}}</text>
				</view>
				<view class="c-row b-b">
					<text class="tit">产品基数</text>
					<text class="con t-r">{{ dataInfo.siteGoods.baseWeight }} {{dataInfo.goodsUnit||""}}</text>
				</view>
				<view class="c-row b-b">
					<text class="tit">预定数量</text>
					<view  v-if="dataInfo.orderStatus == 0" style="display: flex;">
						<view v-if="isEdit" class="quantity-button" @click="changeQuantity('decrease')"><text style="margin-top: -3px;display: block;">-</text></view>
						<view style="width: 70px;border: 1px solid #d0cfcf;border-radius: 5px;">
							<input v-model="dataInfo.goodsTotalWeight" type="number" :disabled="!isEdit" style="border: 1px solid #aaaba4;"></input>
						</view>
						<view v-if="isEdit" class="quantity-button" @click="changeQuantity('increase')">+</view>
						<!-- <input v-model="updatedBookingQuantity" type="number"  style="border: 1px solid #aaaba4;"/>
						<text class="con t-r">{{ dataInfo.goodsTotalWeight }}</text>
						<button @click="updateBookingQuantity"  style="width: 60px;height: 30px;font-size: 14px;line-height: 30px;">确定</button> -->
					</view>
					<view v-else>
						<text class="con t-r">{{ dataInfo.goodsTotalWeight }}</text>
					</view>
					
				</view>
				
				<view class="c-row b-b">
					<text class="tit">总共价格</text>
					<text class="con t-r">{{ dataInfo.goodsTotalPrice }} 元</text>
				</view>
				<view class="c-row b-b">
					<text class="tit">状态</text>
					<text class="con t-r">
						<text v-if="dataInfo.orderStatus == -2" style="color: red;">已过期</text>
						<text v-else-if="dataInfo.orderStatus == -1" style="color: red;">已作废</text>
						<text v-else-if="dataInfo.orderStatus == 0">待确认</text>
						<text v-else-if="dataInfo.orderStatus == 1" style="color: green;">已确认</text>
					</text>
				</view>
				<view class="" v-if="dataInfo.orderStatus == 0">
					<view class="c-row b-b">
					<text class="tit">基地名称</text>
					<text class="con t-r"><text v-for="(val,i) in dataInfo.siteGoods.parkSiteList" :key="i">{{val.siteName}}、</text></text>
					
					<button type="primary" @click="showBase = true" style="background-color: #3c9cff;border-color: #3c9cff;font-size: 12px;padding: 1px 8px;float: right;line-height: 20px;">去进货</button>
				</view>
				<view class="c-row b-b">
					<text class="tit">预定人</text>
					<text class="con t-r">{{ dataInfo.createBy }}</text>
				</view>
				<view class="c-row b-b">
					<text class="tit">联系电话</text>
					<text class="con t-r">{{ dataInfo.phonenumber }}</text>
				</view>
					<view class="c-row b-b" v-if="dataInfo.status === '仓库现货'">
					<text class="tit">提货地址</text>
					<text class="con t-r">{{ dataInfo.deliveryAddress }}</text>
				</view>
				<view style="display: flex;margin-top: 20px;">
					<button type="primary" @click="isEdit = true" v-if="!isEdit" style="background-color: #3c9cff;border-color: #3c9cff;flex: 1;margin-right: 1%;">修改</button>
					<button type="primary" @click="submit" v-else style="background-color: #3c9cff;border-color: #3c9cff;flex: 1;">提交</button>
				</view>
				
			</view>
			
			
			<view class="" v-else>
				<view class="c-row b-b">
				<text class="tit">基地名称</text>
				<text class="con t-r">{{ dataInfo.baseName }}</text>
			</view>
			<view class="c-row b-b">
				<text class="tit">交货时间</text>
				<text class="con t-r">{{ dataInfo.deliveryTime }}</text>
				</view>
				</view>
			</view>
		            
		</view>
		<u-picker :show="showBase" :columns="baseList" confirmText="导航" keyName="name" @confirm="confirm" @cancel="showBase=false;"></u-picker>
		
	</view>
</template>

<script>
	import uQRCode from '@/uni_modules/cc-defineQRCode/components/cc-defineQRCode/common/uqrcode.js'
	export default{
		components: {},
		data() {
			return {
				dataInfo:{},
				dataTypeList:[],
				updatedBookingQuantity: '', 
				orderNum:"",
				calculateBase:1,
				// 二维码标识串
				qrcodeText: '13198571544',
				// 二维码尺寸
				qrcodeSize: 100,
				// 最终生成的二维码图片
				qrcodeSrc: '',
				isEdit:false,
				showBase:false,
				baseList:[[{id:1,name:"基地1"}]],
			};
		},
		onLoad(options){
			this.orderNum = options.orderNum;
			this.loadData();
			this.getProductAddress();
		},
		methods:{
			loadData() {
				uni.request({
					url:  this.$store.state.HTTP+'/shangshe/advanceOrder/infoByOrderNumber', 
					method: 'GET',
					header:{
						Authorization:"Bearer " + uni.getStorageSync('token')
					},
					data:{orderNumber:this.orderNum},
					success: (res) => {
						// 请求成功，处理返回的数据
						if (res.data.code === 200) {
							this.dataInfo = res.data.data;
							this.calculateBase = res.data.data.siteGoods.baseWeight||1;
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
				this.makeQRCode();
			},
			natoBackpage() {
				uni.navigateBack();
			},
			updateBookingQuantity() {
				  // 验证
				  if (!this.updatedBookingQuantity) {
					return;
				  }
			
				  // 更新预定数量
				  this.dataInfo.bookingQuantity = this.updatedBookingQuantity;
			
				  // 打印更新后的数据
				  console.log('更新后的数据：', this.dataInfo);
			
				  // 此处可以添加发送请求给后端保存的逻辑
			
				  // 清空输入框
				  this.updatedBookingQuantity = '';
			},
		
			sendUpdatedQuantityToBackend() {
		
				console.log('向后端发送更新后的数量：', this.updatedBookingQuantity);
			},
			makeQRCode(){
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})

				uQRCode.make({
					canvasId: 'qrcode',
					text: this.qrcodeText,
					size: this.qrcodeSize,
					margin: 10,
					success: res => {
						this.qrcodeSrc = res
						console.log('qrcodeSrc = ' + this.qrcodeSrc);
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			changeQuantity(type) {
			    // 获取当前数量
			    let currentQuantity = this.dataInfo.goodsTotalWeight;
			
			    // 根据点击的类型进行增加或减少
			    if (type === 'increase') {
			      currentQuantity += Number(this.calculateBase);
			    } else if (type === 'decrease' && currentQuantity > 0) {
			      currentQuantity -= Number(this.calculateBase);
			    }
			
			    // 更新预定数量
			    this.dataInfo.goodsTotalWeight = currentQuantity;
				this.dataInfo.goodsTotalPrice = this.dataInfo.goodsPrice*currentQuantity;
			},
			//基地
			getProductAddress(){
				uni.request({
				    url: this.$store.state.HTTP+'/customer/parkSite/list',
					method:"GET",
				    success: (res) => {
						if(res.data.code === 200){
							let data = res.data.rows;
							data.forEach((item, index) => {
							  item.name = item.siteName;
							});
							this.baseList[0] = data;
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
			confirm(e){
				this.showBase = false;
				console.log(e)
				
				wx.openLocation({
					latitude: Number(e.value[0].stationLat), // 纬度,
					longitude: Number(e.value[0].stationLng), // 经度
					name: e.value[0].name, // 位置名
					address: e.value[0].siteAdress, // 地址详情说明
					success: function (res) {
						return;
					},fail: err => { 
						console.log(err)
					   this.$api.msg(`导航功能异常，请联系管理员`);
					}
				})
			},
			submit() {
				uni.showModal({
					title: '提示',
					content: '是否提交修改后的订单信息？',
					success: (res)=> {
						if (res.confirm) {
							console.log('用户点击确定');
							this.updateOrder();
						}
					}
				});
			},
			updateOrder(){
				
				uni.request({
					url:  this.$store.state.HTTP+'/shangshe/advanceOrder/update', 
					method: 'PUT',
					header:{
						Authorization:"Bearer " + uni.getStorageSync('token')
					},
					data:{id:this.dataInfo.id,orderBaseWeightNumber:this.dataInfo.goodsTotalWeight/this.dataInfo.siteGoods.baseWeight},
					success: (res) => {
						// 请求成功，处理返回的数据
						if (res.data.code === 200) {
							this.$api.msg(`修改成功`);
							uni.redirectTo({
								url:"/pages/ManageWork/index"
							})
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
			}
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
	.canvas {
		margin-top: 50rpx;
		margin-bottom: 36rpx;
		text-align: center;
	}
	.quantity-button {
	  cursor: pointer;
	  margin: 0 5px;  /* 调整按钮之间的间距 */
	  align-items: center;
	  border: 1px solid #969191;
	  border-radius:50%;
	  width: 20px;
	  height: 20px;
	  font-size: 20px;
	  text-align: center;
	  line-height: 20px;
	}
	
</style>
