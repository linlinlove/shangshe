<template>
  <view>
    
    <!-- 订单信息 -->
    <view class="order-info">
      <view class="example">
        <uni-forms ref="form" labelWidth="80px">
          <uni-forms-item label="订单号" name="orderNumber">
            <uni-easyinput v-model="orderNumber" placeholder="请输入订单号" />
          </uni-forms-item>
          <uni-forms-item label="姓名" name="createBy">
            <uni-easyinput v-model="name" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="手机号码" name="phone">
            <uni-easyinput v-model="phone" placeholder="请输入手机号码" />
          </uni-forms-item>
          <uni-forms-item label="车牌号" name="plateNum">
            <uni-easyinput v-model="plateNum" placeholder="请输入车牌号" />
          </uni-forms-item>
        </uni-forms>

        <view style="display: flex;">
          <button type="primary" @click="queryOrderInfo" style="width: 100px;height: 26px;line-height: 26px;font-size: 12px;background-color: #3c96f3;">查询</button>
          <button type="primary" @click="saveOrderInfo" style="width: 100px;height: 26px;line-height: 26px;font-size: 12px;background-color: #3c96f3;">保存</button>
          <button type="primary" @click="clearOrderInfo" style="width: 100px;height: 26px;line-height: 26px;font-size: 12px;background-color: #3c96f3;">清空</button>
        </view>              
      </view>
      
    </view>

    <!-- 订货列表 -->
    <view class="order-list">
      <text class="subtitle">未交货订单：<text>{{ notConfirmOrderNum }}</text></text>
      
      <text class="subtitle">已交货订单：<text>{{ realConfirmOrderNum }}</text></text>
      
	<text class="subtitle">已作废订单：<text>{{ invalidOrderNum }}</text></text>
	
      <!-- 订单详情 -->
      <view class="goods-list">
        <view v-for="(item, index) in orderList" :key="index" class="goods-item"@click="navToOrderDetailPage(item)" >
          <view style="width: 100%; padding-top: 3px;">
            <!-- 添加图片部分 -->
            <view class="image-wrapper">
              <image :src="currentImage(item)" mode="aspectFill"></image>
            </view>
      
            <view style="width: calc(100% - 85px);margin-left: 5px;float: right;padding: 5px;">
            	<view class="clam6p" style="font-weight: 400;font-size: 13px;margin-top: 5px;">订单：{{item.orderNumber||"—"}}</view>
            	<view class="title clamp" style="    font-weight: 600;height: 20px;color: black;line-height: 20px;font-size: 12px;">产品：{{item.goodsName}}</view>
            	<view class="price-box" style="color: #909399;">
            		
					<view style="width: calc(100% - 100px);overflow: hidden;text-overflow: ellipsis;white-space: nowrap">
            			基地：<text v-for="(val,i) in item.siteGoods.parkSiteList" :key="i">{{val.siteName}}、</text>
            		</view>
            		
            	</view>
				<view class="price-box" style="color: #909399;">
					<view class="clamp" style="font-size: 12px;">订单日期时间：{{ item.createTime||"—" }}</view>
					
					
				</view>
            	<view class="price-box" style="color: #909399;">
            		<text>总价格：<text class="price">{{item.goodsPrice*item.goodsTotalWeight}} 元</text></text>
            		<text>订购数量：{{item.goodsTotalWeight}} 公斤</text>
            		
            	</view>
            	<view class="price-box" style="color: #909399;">
            		<text>订单状态：
            		    <text v-if="item.orderStatus == -2" style="color: red;">已过期</text>
            		    <text v-else-if="item.orderStatus == -1" style="color: red;">已作废</text>
            		    <text v-else-if="item.orderStatus == 0"style="color: orange;">待交货</text>
            		    <text v-else-if="item.orderStatus == 1" style="color: green;">已交货</text>	
            		</text>
					<view v-if="item.orderStatus == 0">
					  <button type="info" @click="confirmDelivery(item)" style="    width: 80px;font-size: 10px;height: 20px; line-height: 20px;text-align: center;float: right;">确认交货</button>
					</view>
            	</view>
              
            </view>
          </view>
        </view>
      </view>


      
    </view>
    <view class="scanCode" @click="qrHandle">
      <image src="../../static/images/index/scan.png"></image>
      <view>扫码</view>
    </view>
	<u-popup  :show="showPop" @close="showPop = false" round="10">
		<view class="from" style="padding: 20px;margin-bottom: 60px;">
			<u--form :labelWidth="80" :model="orderInfo" ref="uForm" >
				<u-form-item label="产品单价" borderBottom >
					<u--input v-model="orderInfo.goodsPrice" disabledColor="#ffffff" placeholder="请输入价格"
						border="none" type="number"></u--input><text style="position: absolute;right: 18px;color: #999;font-size: 12px;top: 15px;">每{{orderInfo.goodsUnit}}</text>
				</u-form-item>
				<u-form-item label="产品总重" borderBottom >
					<u--input v-model="orderInfo.goodsTotalWeight" disabledColor="#ffffff" placeholder="请输入产品总重"
						border="none" type="number"></u--input><text style="position: absolute;right: 18px;color: #999;font-size: 12px;top: 15px;">{{orderInfo.goodsUnit}}</text>
				</u-form-item>
				
				<u-form-item label="总价" prop="info.allPrice" borderBottom>
					<view class="price">￥<text>{{(orderInfo.goodsTotalWeight*orderInfo.goodsPrice)||0}}</text> 元</view>
				</u-form-item>
				
			</u--form>
			<view style="display: flex;">
				<u-button type="primary" @click="submit('-1')" style="flex: 1;margin-right: 1%;">作废订单</u-button>
				<u-button type="primary" @click="submit('1')" style="flex: 1;">订单交货</u-button>
			</view>
			
		</view>
		
	</u-popup>
	
    <custom-tabbar  :tabIndex="2"></custom-tabbar>
    
  </view>
</template>

<script>

export default {
  data() {
    return {
      orderNumber: '',
      name: '',
      phone: '',
      plateNum: '',
      orderList: [],
	  orderInfo:{},
	  showPop:false,
	  notConfirmOrderNum: 0,
	  realConfirmOrderNum:0,
	  invalidOrderNum:0,
    };
  },
  computed: {
    orderQuantity() {
      return this.orderList.length;
    },
  },
  methods: {
	  currentImage(item) {
	        if (item && item.smallPic) {
	          return this.$store.state.HTTP + item.smallPic ;
	        } else {
	          return '/static/images/product/strawberry.jpg';
	        }
	  },
	qrHandle() {
		uni.scanCode({
			onlyFromCamera: false,
			scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
			success: (res) => {
				console.log('扫描成功', res.result);
				this.phone = res.result; // 扫码那都对方的电话
			},
			fail: (error) => {
				console.log('扫码失败', error.errMsg);
				uni.showToast({
					title: '扫描失败',
					icon: 'none',
					duration: 2000,
				});
			},
		});
	},
    clearOrderInfo() {
      // 清空订单信息
      this.orderList = [];
    },
	queryOrderInfo() {
	  const queryParams = {
	    pageNum: 1,
	    pageSize: 50,
	    orderNumber: this.orderNumber,
	    phonenumber: this.phone,
	    nickName: this.name,
	    plateNum: this.plateNum
	  };
	
	  uni.request({
	    url: this.$store.state.HTTP + '/shangshe/advanceOrder/list',
	    method: "GET",
	    header: {
	      Authorization: "Bearer " + uni.getStorageSync('token')
	    },
	    data: queryParams,
	    success: (res) => {
	      if (res.data.code === 200) {
	        const { notConfirmOrderNum } = res.data.otherData || {}; // 解构赋值，确保 otherData 存在
			const { realConfirmOrderNum } = res.data.otherData || {};
			const { invalidOrderNum } = res.data.otherData || {};
	        if (notConfirmOrderNum !== undefined) {
	          this.notConfirmOrderNum = notConfirmOrderNum;
			  this.realConfirmOrderNum=realConfirmOrderNum;
			  this.invalidOrderNum=invalidOrderNum;
	          this.$forceUpdate();
	        }
	
	        if (res.data.rows && res.data.rows.length > 0) {
	          // 重新排列订单数组，确保未交货订单在第一个位置
	          this.orderList = this.sortOrders(res.data.rows);
	
	          const firstOrder = this.orderList[0];
	          this.$set(this.$data, 'name', firstOrder.createBy);
	          this.$set(this.$data, 'phone', firstOrder.phonenumber);
	          this.$set(this.$data, 'plateNum', firstOrder.plateNum);
	        } else {
	          console.error('响应数据结构不正确:', res.data);
	        }
	      } else {
	        console.error('获取数据失败。服务器返回:', res.data);
	      }
	    },
	    fail: (err) => {
	      console.error('查询订单信息失败:', err);
	      this.$api.msg(err.errMsg);
	    }
	  });
	},
	
	// 新增方法，根据订单状态和创建时间排序
	sortOrders(orders) {
	  // 按照创建时间降序排序
	  const sortedOrders = orders.sort((a, b) => {
	    const timeA = new Date(a.createTime).getTime();
	    const timeB = new Date(b.createTime).getTime();
	    return timeB - timeA;
	  });
	
	  return sortedOrders;
	},
	
	navToOrderDetailPage(order) {
	    let id = order.id;
	    uni.navigateTo({
	      url: `/pages/adminManage/details?id=${id}`,
	      success: (res) => {
	        console.log('跳转成功', res);
	      },
	      fail: (err) => {
	        console.error('跳转失败', err);
	      },
	    });
	  },






    saveOrderInfo() {
      
      console.log('保存订单信息');
    },
    confirmDelivery(order) {
		this.orderInfo = order;
		this.showPop = true;
	    
    },
	submit(type) {
	  let parame = {
	    goodsPrice: this.orderInfo.goodsPrice,
	    goodsTotalWeight: this.orderInfo.goodsTotalWeight,
	    id: this.orderInfo.id,
	    orderStatus: type
	  };
	
	  uni.request({
	    url: this.$store.state.HTTP + '/shangshe/advanceOrder/verify',
	    method: "PUT",
	    header: {
	      Authorization: "Bearer " + uni.getStorageSync('token')
	    },
	    data: parame,
	    success: (res) => {
	      if (res.data.code === 200) {
	        this.$modal.showToast("提交成功");
	        this.showPop = false;
	
	        // 更新成功后重新获取订单信息
	        this.queryOrderInfo();
	
	      } else {
	        console.error('获取数据失败。服务器返回:', res.data);
	      }
	    },
	    fail: (err) => {
	      this.$api.msg(err.errMsg);
	    }
	  });
	}

  },
};
</script>




<style scoped lang="scss">
	.title {
		font-size: 18px;
		font-weight: bold;
		color: #fff;
	}

	.scan-button {
		position: absolute;
		top: 10px;
		right: 15px;
		width: 28px;
		height: 28px;
		text-align: center;
		line-height: 40px;
	}
	.title-scan {
		display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
		background-color: #3c96f3;
		height: 50px;
	}
	

	.order-info {
		margin: 10px;
		// background-color: #fff;
		padding: 10px;
		// border: 1px solid #ccc;
	}

	.order-info text {
		font-size: 16px;
	}

	.button-group {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
	.button-group button{
		background-color: #3c96f3;
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		height: 35px;
		width: 100px;
		text-align: center;
		line-height: 35px;
	}
	.order-list {
		margin: 5px;
		padding: 0px 10px;
	}

	.subtitle {
		font-size: 14px;
		font-weight: bold;
		padding-right: 20px;
	}



	.order-item {
		margin: 10px 0;
		padding: 10px;
		border: 1px solid #ccc;

		background-color: #fff;
	}

	.order-item text {
		display: block;
		margin-bottom: 5px;
	}

	.order-item button {
		background-color: #3c96f3;
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		height: 35px;
		width: 100px;
		text-align: center;
		line-height: 35px;
	}
	.scanCode{
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
		
	}
	.scanCode image{
		width: 20px;
		height: 20px;
		margin-bottom: -4px;
	}
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		//padding:  30upx;
		//background: #fff;
		margin-bottom: 55px;
		
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
			width: 75px;
			height: 75px;
			border-radius: 5px;
			overflow: hidden;
			margin: 10px 2px;
			float: left;
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

</style>

