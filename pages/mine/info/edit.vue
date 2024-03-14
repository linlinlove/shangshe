<template>
  <view class="container">
    <view class="example">
      <uni-forms ref="form" :model="user" labelWidth="80px">
        <uni-forms-item label="姓名" name="nickName">
          <uni-easyinput v-model="user.nickName" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="手机号码" name="phonenumber">
          <uni-easyinput v-model="user.phonenumber" placeholder="请输入手机号码" />
        </uni-forms-item>
        <uni-forms-item label="车牌号" name="plateNum" v-if="user.userType === '01'">
          <uni-easyinput v-model="user.plateNum" placeholder="请输入车牌号" />
        </uni-forms-item>
        <uni-forms-item label="登记时间">
          <uni-easyinput v-model="user.signTime" placeholder="登记时间" disabled />
        </uni-forms-item>
        <uni-forms-item label="登记平台">
          <uni-easyinput v-if="user.signllay === '1'" placeholder="平台登记" disabled />
          <uni-easyinput v-else placeholder="用户登记" disabled />
        </uni-forms-item>
        <uni-forms-item label="用户类型">
          <uni-easyinput v-if="user.userType === '01'" placeholder="普通客户" disabled />
          <uni-easyinput v-else placeholder="系统业务员" disabled />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">提交</button>
    </view>
  </view>
</template>

<script>
import store from '@/store/index.js';
import { getUserProfile } from "@/api/system/user"
import { updateUserProfile } from "@/api/system/user"

export default {
  data() {
    return {
      user: {
        nickName: "",
        phonenumber: "",
        plateNum: "",
        userType: "" // Add userType property
      },
      rules: {
        nickName: {
          rules: [{
            required: true,
            errorMessage: '用户昵称不能为空'
          }]
        },
        phonenumber: {
          rules: [{
            required: true,
            errorMessage: '手机号码不能为空'
          }, {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            errorMessage: '请输入正确的手机号码'
          }]
        },
      }
    }
  },
  onLoad() {
    this.getUser()
  },
  onReady() {
    this.$refs.form.setRules(this.rules)
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
            this.user.nickName = res.data.user.nickName;
            this.user.phonenumber = res.data.user.phonenumber;
            this.user.plateNum = res.data.user.plateNum;
            this.user.userType = res.data.user.userType; // Set userType
          } else if(res.data.code === 401){
            this.$modal.showToast("未登录，或登录失效！");
          } else {
            this.$modal.showToast(res.data.msg);
          }
        }
      });
    },
    submit(ref) {
      this.$refs.form.validate().then(res => {
        uni.request({
          url: this.$store.state.HTTP+'/customer/user/update',
          method:"PUT",
          header:{
            Authorization:"Bearer " + uni.getStorageSync('token')
          },
          data: this.user,
          success: (res) => {
            if(res.data.code === 200){
              this.$modal.showToast('修改成功');
              setTimeout(()=>{
                this.$tab.navigateTo('/pages/mine/index')
              },1500)
            }
          }
        });
      })
    }
  }
}
</script>


<style lang="scss">
  page {
    background-color: #ffffff;
  }

  .example {
    padding: 15px;
    background-color: #fff;
  }

  .segmented-control {
    margin-bottom: 15px;
  }

  .button-group {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
  }

  .form-item {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .button {
    display: flex;
    align-items: center;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
  }
</style>
