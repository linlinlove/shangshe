<template>
	<view class="tab-bar">
	    <view class="tab-bar-border"></view>
	    <view class="tab-bar-item"
	    v-for="(item,index) in list"
	    :key="index"
		@click="switchTab(item,index)">
	        <image class="img" :src="currentIndex==index?item.selectedIconPath:item.iconPath"></image>
	        <view class="txt" :style="{color:currentIndex==index?selectedColor:color}">
	            {{item.text}}
	        </view>
	    </view>
	</view>
</template>

<script>
	export default {
		name:"custom-tabbar",
		props:{
			tabIndex:{
				type:Number,
				default:0
			}
			
		},
		data() {
			return {
				color:"#000000",
				selectedColor:"var(--app-theme)",
				// currentIndex:uni.getStorageSync('tabIndex')||0,
				userList:[
					{
					  "pagePath": "/pages/index/index",
					  "iconPath": "/static/images/tabbar/home.png",
					  "selectedIconPath": "/static/images/tabbar/home_.png",
					  "text": "首页",
					}, 
					{
					  "pagePath": "/pages/ManageWork/index",
					  "iconPath": "/static/images/tabbar/work.png",
					  "selectedIconPath": "/static/images/tabbar/work_.png",
					  "text": "管理订单",
					},
					{
					  "pagePath": "/pages/mine/index",
					  "iconPath": "/static/images/tabbar/mine.png",
					  "selectedIconPath": "/static/images/tabbar/mine_.png",
					  "text": "我的"
					}
				],
				adminList:[
					{
					  "pagePath": "/pages/release/publish",
					  "iconPath": "/static/images/tabbar/publish.png",
					  "selectedIconPath": "/static/images/tabbar/publish_.png",
					  "text": "发布",
					}, 
					{
					  "pagePath": "/pages/adminManage/index",
					  "iconPath": "/static/images/tabbar/work.png",
					  "selectedIconPath": "/static/images/tabbar/work_.png",
					  "text": "管理",
					},
					{
					  "pagePath": "/pages/release/index",
					  "iconPath": "/static/images/tabbar/shipments.png",
					  "selectedIconPath": "/static/images/tabbar/shipments_.png",
					  "text": "发货",
					},
					 {
					   "pagePath": "/pages/statistics/statistics",
					   "iconPath": "/static/images/tabbar/statistics.png",
					   "selectedIconPath": "/static/images/tabbar/statistics_.png",
					   "text": "统计",
					 },
					{
					  "pagePath": "/pages/mine/index",
					  "iconPath": "/static/images/tabbar/mine.png",
					  "selectedIconPath": "/static/images/tabbar/mine_.png",
					  "text": "我的"
					}
				],
				
			};
		},
		computed:{
			isAdmin(){
				return uni.getStorageSync('isAdmin')||false
			},
			list(){
				return this.isAdmin?this.adminList:this.userList
			},
			currentIndex(){
				return this.tabIndex
			},
		},
		methods:{
			switchTab(item,index){
				// this.currentIndex=index;
				// uni.setStorageSync('tabIndex',index);
				uni.redirectTo({
					url:item.pagePath
				})
			}
		}
	}
</script>

<style lang="scss">
.tab-bar{
    position: fixed;
    z-index: 999999;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--tab-bar-height);
    background: white;
    display: flex;
    padding-bottom:env(safe-area-inset-bottom) ;
}
.tab-bar-border{
    background-color: rgba(0,0,0,0);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
}
.tab-bar-item{
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.tab-bar-item .img{
    width: 50rpx;
    height: 50rpx;
}
.tab-bar-item .txt{
    font-size: 24rpx;
}
</style>