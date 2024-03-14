<template>
	<view>
		<!-- 预定详情 -->
		<u-swiper :list="imgList" previousMargin="30" nextMargin="30" circular :autoplay="false" radius="5"
			bgColor="#ffffff"></u-swiper>
		<view class="content" style="    background-color: #fff;margin: 10px 0px;border-radius: 15px;">
			<view class="item">
				<view class="share-button">
					<u-button open-type="share" style="    border: none;">
					    <view class="iconfont icon-share menu-icon"></view>
					</u-button>
				</view>
				<view class="title">{{productInfo.goodsName}}</view>
				
				<view class="price">单价：￥<text>{{productInfo.goodsPrice}}</text> 元 / {{productInfo.goodsUnit}}</view>
			</view>
			<view class="item">
				基地：<text v-for="(item,index) in productInfo.parkSiteList" :key="index">{{item.siteName}}、</text>
			</view>
			<view class="item">
				{{productInfo.createBy||"—"}}: {{productInfo.createUserMobile||"暂无"}}
			</view>
			<view class="item" style="color: #999;margin-bottom: 30px;">
				{{productInfo.goodsDesc}}
			</view>
			
			
			
			<view class="item">
			    <text class="status" v-if="productInfo.goodsArriveStatus == 1" style="color: green;">已到货</text>
			    <text v-else-if="productInfo.goodsArriveStatus == 0" style="color: red;">未到货</text>
			    <text v-else-if="productInfo.goodsArriveStatus == 2" style="color: red;">已售完</text>
			</view>
			
			<view class="item" v-if="productInfo.goodsArriveStatus == 1">
			    到货时间：{{ productInfo.possTime }}
			</view>
			<view class="item">
			    创建时间：{{ productInfo.createTime }}
			</view>

			
			
			<!-- 提交按钮 -->
			<u-button type="primary" @click="openPop">立即预订</u-button>
			

		</view>
		<u-popup  :show="showPop" @close="showPop = false" round="10">
			<view class="from">
				<u--form :labelWidth="80" :model="info" ref="uForm" >
					<u-form-item label="预定数量" prop="info.goodsTotalWeight" borderBottom>
					  <view class="quantity-container">
					
						  
						<view class="quantity-button" @click="changeQuantity('decrease')"><text style="margin-top: -1px;display: block;">-</text></view>
						<view style="width: 70px; border: 1px solid #d0cfcf; border-radius: 5px;text-align: center;">
						  <u-input v-model="info.goodsTotalWeight" disabledColor="#ffffff" disabled placeholder="请输入预定数量" border="none" type="number" style="text-align: center;"></u-input>
						</view>

						<view class="quantity-button" @click="changeQuantity('increase')">+</view>
						<!-- <view class="quantity-buttons" style="font-size: 40px;">
						  
						</view> -->
					  </view>
					</u-form-item>
					<u-form-item label="产品基数" prop="info.goodsPrice" borderBottom>
						<view><text>{{calculateBase}} {{productInfo.goodsUnit}}</text></view>
					</u-form-item>
					<u-form-item label="产品单价" prop="info.goodsPrice" borderBottom>
						<view><text>{{productInfo.goodsPrice}}元 / {{productInfo.goodsUnit}}</text></view>
					</u-form-item>
					<u-form-item label="总价" prop="info.allPrice" borderBottom>
						<view class="price">￥<text>{{allPrice}}</text></view>
					</u-form-item>
					<u-form-item label="选择基地" prop="info.base" borderBottom >
						<text v-for="(item,index) in productInfo.parkSiteList" :key="index">{{item.siteName}}</text>
					</u-form-item> 
				
					
				</u--form>
				<u-button type="primary" @click="submit">提交</u-button>
			</view>
			
			<u-picker :show="showBase" :columns="baseList" keyName="name" @confirm="confirm" @cancel="showBase=false;"></u-picker>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				showPop: false,
				showBase:false,
				rules:[],
				info:{
					goodsTotalWeight:0,
					userName:"",
					phone:"",
					allPrice:""
				},
				baseList:[[{id:1,name:"基地1"}]],
				productId:"",
				productInfo:{},
				calculateBase:1,
				imgList:['/static/images/product/strawberry.jpg'],
				calculateNum:0
			};
		},
		computed: {
			allPrice(){
				return  (this.productInfo.goodsPrice * this.info.goodsTotalWeight).toFixed(2)
			},
		},
		onLoad(options) {
		    this.productId = options.id || "";
			this.loadData();
		    //this.checkLoginAndLoadData();
		    uni.showShareMenu({
		      withShareTicket: true,
		      menus: ['shareAppMessage', 'shareTimeline'],
		    });
		  },
		methods: {
			async checkLoginAndLoadData() {
			      try {
			        // 检查登录状态
			        const isAuthenticated = await this.$store.dispatch('checkAuthentication');
			
			        if (!isAuthenticated) {
			          // 未登录，弹出提示信息
			          this.$api.msg("未登录，请先进行登录操作！");
			        } else {
			          // 已登录，加载数据
			          this.loadData();
			        }
			      } catch (error) {
			        console.error('检查登录状态异常', error);
			        this.$api.msg('检查登录状态异常');
			      }
			    },
			loadData() {
				//产品信息
				uni.request({
				    url: this.$store.state.HTTP+`/customer/SiteGoods/detail?id=${this.productId}`,
					method:"GET",
					header:{
						Authorization:"Bearer " + uni.getStorageSync('token')
					},
				    success: (res) => {
						if (res.data.code === 200) {
						    this.productInfo = res.data.data;
							this.calculateBase = res.data.data.baseWeight;
							this.imgList[0] = this.$store.state.HTTP + res.data.data.smallPic;
							let data = res.data.data.parkSiteList||[];
							data.forEach((item, index) => {
							  item.name = item.siteName;
							});
							this.baseList[0] = data;
							
							if (res.data.data.goodsArriveStatus === 1) {
							                    this.arrivalTime = res.data.data.possTime;
							                }
							
							
						}else {
						    this.$api.msg("请求异常");
						}				
				    },fail:() =>{
						this.$api.msg("请求异常");
					}
				});
			},
			openPop() {
				//this.getProductAddress();
				this.showPop = true;
			},
			bindDateChange(e) {
				this.info.time = e.detail.value
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
			changeQuantity(type) {
			    // 获取当前数量
			    let currentQuantity = this.info.goodsTotalWeight;
			
			    // 根据点击的类型进行增加或减少
			    if (type === 'increase') {
			      currentQuantity += Number(this.calculateBase);
				  this.calculateNum++
			    } else if (type === 'decrease' && this.calculateNum > 0) {
			      currentQuantity -= Number(this.calculateBase);
				  this.calculateNum--
			    }
			
			    // 更新预定数量
			    this.info.goodsTotalWeight = currentQuantity;
			},
			confirm({value}){
				this.info.base=value[0].name;
				this.showBase=false
			},
			onShareAppMessage() {
			    return {
			        title: this.productInfo.goodsName, // 使用产品的名字作为分享卡片标题
			        path: `/pages/index/reserve?id=${this.productId}`,
			        imageUrl: this.imgList[0],
			        success(res) {
			            console.log('分享成功');
			        },
			        fail(err) {
			            console.log('分享失败', err);
			        }
			    };
			},

			submit(){
				let info = this.info;
				console.log(info)
				if(!info.goodsTotalWeight){
					this.$modal.showToast('请数入正确的预定数量')
					return
				}
				uni.request({
				    url: this.$store.state.HTTP+'/shangshe/advanceOrder',
					method:"POST",
					header:{
						Authorization:"Bearer " + uni.getStorageSync('token')
					},
					data:{siteGoodsId:this.productId,orderBaseWeightNumber:this.calculateNum},
				    success: (res) => {
						if(res.data.code === 200){
							this.$modal.showToast('下单成功');
							this.showPop = false;
							this.info = {goodsTotalWeight:"",userName:"",phone:"",allPrice:"",calculateNum:0};
						}
				    }
				});
			}
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		padding: 20upx;
	}
	.from{
		padding: 20upx;
	}
	.price{
		color:red;
		padding: 5px;
		text{
			font-size: 36upx;
		}
	}
	.item{
		margin: 20upx 0;
		
		.title{
			font-weight: bold;
			font-size: 40upx;
			margin-bottom: 10px;
		}
	}
	.quantity-container {
	  display: flex;
	  align-items: center;
	}
	
	.quantity-buttons {
		
	  margin-left: 10px;  /* 调整按钮之间的间距 */
	  display: flex;
	  align-items: center;
	}
	
	.quantity-button {
	  cursor: pointer;
	  margin: 0 5px;  /* 调整按钮之间的间距 */
	  align-items: center;
	  border: 1px solid #969191;
	  border-radius:50%;
	  width: 25px;
	  height: 25px;
	  font-size: 20px;
	  text-align: center;
	  line-height: 20px;
	}


.share-button {
	
    border: none;  /* 无边框 */
    background-color: transparent;  /* 无背景色 */
    width: 40px;  /* 设置宽度 */
    height: 40px;  /* 设置高度 */
    padding: 0;  /* 取消内边距 */
	float: right;
}

::v-deep .u-button--square {
    border: none !important;
}
</style>