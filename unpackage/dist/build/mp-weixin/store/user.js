"use strict";const e=require("../common/vendor.js").defineStore("user",{state:()=>({token:"",userinfo:{id:0,state:0,userName:"",userType:"",token:"",binding:0,email:"",mobile:""},wx_userinfo:{nickName:"",avatarUrl:"",openid:""}}),actions:{setToken(e){this.token=e},fillUser(e){this.userinfo=e},saveWxUserinfo(e){this.wx_userinfo=e}},persist:{enabled:!0,H5Storage:null==window?void 0:window.localStorage}});exports.useUserStore=e;