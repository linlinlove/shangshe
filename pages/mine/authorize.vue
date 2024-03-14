<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<!-- <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view> -->
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				社商仓库
			</view>
			<view class="input-content">
				<view>申请获取以下权限</view>
				<view class="tip">获取您的公开信息（昵称、头像等）</view>
			</view>
			

			
			<!-- 微信小程序或公众号 -->
			<view @tap="comfirm"><button class="confirm-btn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber_WX">授权登录</button></view>
			
		</view>

	</view>
</template>

<script>
	import {  mapMutations  } from 'vuex';
	import store from '@/store/index.js';
	export default{
		data(){
			return {
				code : '',
				openid:"",
				unionid: "",
				sessionKey:"",
				wxInfo:{}
			}
		},
		onLoad(){
			
		},
		methods: {
			navBack(){
				uni.navigateBack();
			},
			comfirm(){//授权
				let _this = this; 
				/*  #ifdef APP-PLUS */
				_this.$api.msg("充电APP暂时只支持账号密码登录");
				/* #endif */
				/*  #ifdef MP-WEIXIN */
				wx.login({
				  success (Res) {
				    if (Res.code) {
						//获取sessionKey
						wx.request({
							url: _this.$store.state.HTTP+'/app/wechat/user/ma/skey',
							data: {code: Res.code,appId: _this.$store.state.wxappMPID},
							success: (res) => {
								_this.sessionKey =  res.data.data.sessionKey;
								_this.openid =  res.data.data.openid;
								_this.unionid =  res.data.data.unionid;
							},fail: (err) =>{
								
							}
						})
				    } else {
				      
				    }
				  }
				})
				/* #endif */
				
			},
			onGetPhoneNumber_WX(e) {//微信
				setTimeout(()=>{
					if(e.detail.errMsg == "getPhoneNumber:ok"){
						let params = {
							appId: this.$store.state.wxappMPID,
							merchantId: this.$store.state.merchantId,
							openId: this.openid,
							code: e.detail.code,
						}
						this.sendData(params);
					}
				},100)
			},
			sendData(params){//微信
				wx.request({
					url: this.$store.state.HTTP+'/app/wechat/user/ma/bind',
					data: params,
					success: (res) => {
						if(res.data.code==200){
							uni.setStorageSync('token',res.data.data);
							uni.redirectTo({
								url: '/pages/index/index'
							});
						}else{
							this.$api.msg(res.data.msg);
						}
					},fail: (err) =>{
						this.$api.msg('登录异常');
					}
				})
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 15vh;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
		padding-top: 30px;
		border-top: 1upx solid #E4E7ED;
		.tip{
			font-size: $font-sm;
			color: $font-color-base;
			margin-top: 10px;
		}
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin: auto;
		margin-top: 70upx;
		background: $base-color;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		/* margin-top: 40upx; */
		flex: 1;
		justify-content: center;
	}
	.register-section{
		/* position:absolute;
		left: 0;
		bottom: 50upx; */
		/* width: 100%; */
		flex: 1;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		justify-content: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	.wxLogin{
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		overflow: hidden;
		margin: 20upx auto;
		image{
			width: 100%;
			height: 100%	;
		}
	}
	.halving-line{
		display: flex;
		height: 60upx;
		margin: 0 10%;
		view{
			flex: 1;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
	}
	.sevice{
		margin-top: 20px;
		text-align: center;
		font-size: $font-sm+2upx;
		color: $font-color-base;
	}
</style>
