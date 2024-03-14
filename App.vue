<script>
  import config from './config'
  import store from '@/store'
  import { getToken } from '@/utils/auth'

  export default {
    onLaunch: function() {
      this.initApp()
    },
    methods: {
      // 初始化应用
      initApp() {
        // 初始化应用配置
        this.initConfig()
        // 检查用户登录状态
        //#ifdef H5
        //this.checkLogin()
        //#endif
		
		//获取用户
		if(uni.getStorageSync('token')){
			uni.request({
			  url: this.$store.state.HTTP+'/getInfo',
			  method:"GET",
			  header:{
			    Authorization:"Bearer " + uni.getStorageSync('token')
			  },
			  data: {},
			  success: (res) => {
			    if(res.data.code === 200){
					if(res.data.user.userType == '00'){//管理员
						uni.getStorageSync('isAdmin',true);
						uni.redirectTo({
							url:'/pages/release/publish'
						})
					}else{
						uni.getStorageSync('isAdmin',false);
						uni.redirectTo({
							url:'/pages/index/index'
						})
					}
					
			    } 
			  }
			});
		}
		
		
		// let isAdmin=uni.getStorageSync('isAdmin')
		// if(isAdmin){
		// 	uni.redirectTo({
		// 		url:'/pages/release/publish'
		// 	})
		// }
      },
      initConfig() {
        this.globalData.config = config
      },
      checkLogin() {
        if (!getToken()) {
          this.$tab.reLaunch('/pages/login') 
        }
      }
    }
  }
</script>

<style lang="scss">
  page{
	  --app-theme:#3c96f3;
	 
  }
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import "@/uni_modules/uview-ui/index.scss";
  @import '@/static/scss/index.scss'
</style>
