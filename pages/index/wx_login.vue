<template>
	<view>
		<!-- 按照要求实现微信小程序授权 -->
		<button type="primary" @click="login">微信授权登录</button>
	</view>
	
	
</template>

<script>
	import useUserStore from '@/store/user'
	export default {
	  data() {
	    return {
	
	    }
	  },
	  methods: {
	
	    login() {
	      if (uni.getUserProfile) {
	        //获取用户信息
	        uni.getUserProfile({
	          lang: 'zh_CN',
	          desc: '用来授权登录该小程序！',
	          success: (res) => {
	            //https://uniapp.dcloud.net.cn/tutorial/app-oauth-weixin.html
	            uni.login({
	              "provider": "weixin",
	
	              "onlyAuthorize": true, 
	              success: function(event){
	                //获取code
	                const {code} = event
	                const wxInfo = {
	                  appid:'wx61baab1c4aae2e47',
	                  secret:'c68984e75aadd11d80b3fb78cc087aff',
	                  js_code:code,
	                  grant_type:'authorization_code'
	                };
	                //获取openid
	                uni.request({
	                  url: 'https://api.weixin.qq.com/sns/jscode2session', 
	                  method:'GET',
	                  data: wxInfo,
	                  success: (result) => {
	                    const userStore = useUserStore()
	                    const { data } = result;
	
	                    //保存信息
	                    userStore.setToken(data.openid);
	                    userStore.fillUser(res.userInfo);
	
	                    uni.showToast({title:'登录成功'});
	                    uni.switchTab({url:'/pages/my/my'})
	                  }
	                });
	              },
	              fail: function (err) {
	                uni.showToast({title:'登录失败'});
	              }
	            })
	
	
	          }
	        })
	      }
	    }
	  }
	}
</script>

<style>

</style>