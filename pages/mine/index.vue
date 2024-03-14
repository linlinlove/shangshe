<template>
  <view class="mine-container" :style="{height: `${windowHeight}px`}">
    <!--顶部个人信息栏-->
    <view class="header-section">
      <view class="flex padding justify-between">
        <view class="flex align-center">
          <view v-if="!avatar" class="cu-avatar xl round bg-white">
            <view class="iconfont icon-people text-gray icon"></view>
          </view>
          <image v-if="avatar" @click="handleToAvatar" :src="avatar" class="cu-avatar xl round" mode="widthFix">
          </image>
          <view v-if="!name" class="login-tip">游客 </view>
          <view v-if="name" @click="handleToInfo" class="user-info">
            <view class="u_title">
              {{ name }}
            </view>
          </view>
        </view>
        <view @click="handleToEmpower" class="flex align-center" v-if="!isLogin">
          <text>绑定微信</text>
          <view class="iconfont icon-right"></view>
        </view>
      </view>
    </view>

    <view class="content-section">
      <!-- <view class="mine-actions grid col-3 text-center">
        <view class="action-item" @click="handleJiaoLiuQun">
          <view class="iconfont icon-friendfill text-pink icon"></view>
          <text class="text">交流群</text>
        </view>
        <view class="action-item" @click="handleBuilding">
          <view class="iconfont icon-service text-blue icon"></view>
          <text class="text">在线客服</text>
        </view>
        <view class="action-item" @click="handleBuilding">
          <view class="iconfont icon-community text-mauve icon"></view>
          <text class="text">反馈社区</text>
        </view> 
        <view class="action-item" @click="handleBuilding">
          <view class="iconfont icon-dianzan text-green icon"></view>
          <text class="text">点赞我们</text>
        </view>
      </view> -->

      <view class="menu-list">
        <view class="list-cell list-cell-arrow" @click="handleToEditInfo">
          <view class="menu-item-box">
            <view class="iconfont icon-user menu-icon"></view>
            <view>编辑资料</view>
          </view>
        </view>
		<view class="list-cell list-cell-arrow" @click="handleCallPhone">
		  <view class="menu-item-box">
		    <view class="iconfont icon-user menu-icon"></view>
		    <view>客服电话</view>
		  </view>
		</view>
		
        <!-- <view class="list-cell list-cell-arrow" @click="handleHelp">
          <view class="menu-item-box">
            <view class="iconfont icon-help menu-icon"></view>
            <view>常见问题</view>
          </view>
        </view> -->
        <!-- <view class="list-cell list-cell-arrow" @click="handleAbout">
          <view class="menu-item-box">
            <view class="iconfont icon-aixin menu-icon"></view>
            <view>关于我们</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleToSetting">
          <view class="menu-item-box">
            <view class="iconfont icon-setting menu-icon"></view>
            <view>应用设置</view>
          </view>
        </view> -->
		<view class="list-cell list-cell-arrow" @click="handleToPwd">
		  <view class="menu-item-box">
		    <view class="iconfont icon-password menu-icon"></view>
		    <view>修改密码</view>
		  </view>
		</view>
<!-- 		<view class="list-cell list-cell-arrow">
		  <view class="menu-item-box">
		    <view class="iconfont icon-share menu-icon"></view>
		    <!-- <view>小程序分享</view> 
			<button open-type="share" style="font-size: 14px;display: inline;margin: 0;background-color: #fff;border: 0px;padding: 0;">小程序分享</button>
		  </view>
		</view> -->
		<view class="list-cell list-cell-arrow" @click="adminLogin" v-if="!isLogin">
		  <view class="menu-item-box">
		    <view class="iconfont icon-setting menu-icon"></view>
		    <view>管理员登录</view>
		  </view>
		</view>
		<button open-type="share"  class="list-cell list-cell-arrow" style="height: 45.2px;">
			<view class="iconfont icon-share menu-icon " style="    float: left;color: #50a3ff;line-height: 19.2px;"></view>
			<view class=" " style="    line-height: 19.2px;float: left;font-size: 14px;padding: 0 4px;">
				小程序分享
			</view>
			
		</button>
		
		
		
      </view>
		<view class="cu-list menu" v-if="isLogin">
		  <view class="cu-item item-box">
		    <view class="content text-center" @click="handleLogout">
		      <text class="text-black">退出登录</text>
		    </view>
		  </view>
		</view>
    </view>
	<custom-tabbar  :tabIndex="tabIndex"></custom-tabbar>
  </view>
</template>

<script>
  import storage from '@/utils/storage'
  
  export default {
    data() {
      return {
        name: "游客",
		isLogin:false,
        version: getApp().globalData.config.appInfo.version
      }
    },
	onLoad() {
		this.getUser();
		uni.showShareMenu({
				  withShareTicket: true, // 是否使用带shareTicket的转发详情（用于获取更多转发信息）
				  menus: ['shareAppMessage', 'shareTimeline'], // 指定要显示的分享菜单项，可以是'分享到朋友圈'或'发送给朋友'
		});
	},
    computed: {
      avatar() {
        return this.$store.state.user.avatar
      },
      windowHeight() {
        return uni.getSystemInfoSync().windowHeight - 50
      },
	  tabIndex(){
		  return uni.getStorageSync('isAdmin')?4:2
	  }
    },
    methods: {
	  getUser() {
		  uni.request({
			  url: this.$store.state.HTTP+'/getInfo',
			  method:"GET",
			  header:{
			  	Authorization:"Bearer " + uni.getStorageSync('token')
			  },
			  data: {},
			  success: (res) => {
				if(res.data.code === 200){
					this.isLogin = true;
					this.name = res.data.user.nickName;
				}else{
					this.isLogin = false;
				}
			  }
		  });
	  },
      handleToInfo() {
        this.$tab.navigateTo('/pages/mine/info/edit')
      },
      handleToEditInfo() {
        this.$tab.navigateTo('/pages/mine/info/edit')
      },
      handleToSetting() {
        this.$tab.navigateTo('/pages/mine/setting/index')
      },
      handleToLogin() {
        this.$tab.reLaunch('/pages/login')
      },
      handleToAvatar() {
        this.$tab.navigateTo('/pages/mine/avatar/index')
      },
      handleLogout() {
        this.$modal.confirm('确定注销并退出系统吗？').then(() => {
			uni.request({
			  url: this.$store.state.HTTP+'/logout',
			  method:"POST",
			  header:{
				Authorization:"Bearer " + uni.getStorageSync('token')
			  },
			  success: (res) => {
				if(res.data.code === 200){
					uni.setStorageSync('token',"");
					uni.setStorageSync('isAdmin',"");
					this.$tab.navigateTo('/pages/index/index');
				}else{
					this.$modal.showToast(res.data.msg)
				}
			  }
			});
        })
      },
	  handleToPwd() {
	    this.$tab.navigateTo('/pages/mine/pwd/index')
	  },
	  handleToUpgrade() {
	    this.$modal.showToast('模块建设中~')
	  },
	  handleCleanTmp() {
	    this.$modal.showToast('模块建设中~')
	  },
      handleHelp() {
        this.$tab.navigateTo('/pages/mine/help/index')
      },
      handleAbout() {
        this.$tab.navigateTo('/pages/mine/about/index')
      },
      handleJiaoLiuQun() {
        this.$modal.showToast('微信群：①133713780、②146013835')
      },
	  handleCallPhone(){
		  this.$modal.showToast('客服电话：15888888888')
	  },
      handleBuilding() {
        this.$modal.showToast('模块建设中~')
      },
	  onShareAppMessage() {
	      return {
	          title: '三千万棒骨钛',
	          path: '/pages/detail?id=123',
	          imageUrl: '../../static/images/product/strawberry.jpg', // 根据实际图片格式调整扩展名
	          success(res) {
	              console.log('分享成功');
	          },
	          fail(err) {
	              console.log('分享失败', err);
	          }
	      };
	  },

	  adminLogin(){
		  this.$tab.navigateTo('/pages/login')
		  //this.$tab.reLaunch('/pages/login')
		// let isAdmin=uni.getStorageSync('isAdmin')||false;
		// uni.setStorageSync('isAdmin',!isAdmin);
		// uni.redirectTo({
		// 	url:isAdmin?'/pages/index/index':"/pages/release/publish"
		// })
	  },
	  handleToEmpower(){
		  uni.navigateTo({
		  	url:'/pages/mine/authorize'
		  })
	  }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f5f6f7;
  }

  .mine-container {
    width: 100%;
    height: 100%;


    .header-section {
      padding: 15px 15px 45px 15px;
      background-color: #3c96f3;
      color: white;

      .login-tip {
        font-size: 18px;
        margin-left: 10px;
      }

      .cu-avatar {
        border: 2px solid #eaeaea;

        .icon {
          font-size: 40px;
        }
      }

      .user-info {
        margin-left: 15px;

        .u_title {
          font-size: 18px;
          line-height: 30px;
        }
      }
    }

    .content-section {
      position: relative;
      top: -50px;

      .mine-actions {
        margin: 15px 15px;
        padding: 20px 0px;
        border-radius: 8px;
        background-color: white;

        .action-item {
          .icon {
            font-size: 28px;
          }

          .text {
            display: block;
            font-size: 13px;
            margin: 8px 0px;
          }
        }
      }
    }
  }
  button:after{
	  border: 0px !important;
  }
</style>
