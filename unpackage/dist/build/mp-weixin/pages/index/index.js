"use strict";const n=require("../../common/vendor.js"),i={data:()=>({navigatorBars:[{id:1,name:"ICPC联盟",icon:"vip"},{id:2,name:"竞赛",icon:"medal"},{id:3,name:"社团",icon:"staff"},{id:4,name:"面试宝典",icon:"gift"}]}),onLaunch(){},methods:{change(n){console.log(n)},toMqtt(){n.index.navigateTo({url:"/pages/index/mqtt"})},toWxLogin(){n.index.navigateTo({url:"/pages/index/wx_login"})}}};if(!Array){(n.resolveComponent("uni-notice-bar")+n.resolveComponent("uni-icons")+n.resolveComponent("uni-grid-item")+n.resolveComponent("uni-grid"))()}Math||((()=>"../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js")+(()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js")+(()=>"../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js")+(()=>"../../uni_modules/uni-grid/components/uni-grid/uni-grid.js"))();const o=n._export_sfc(i,[["render",function(i,o,e,t,r,a){return{a:n.p({"show-icon":!0,scrollable:!0,text:"uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"}),b:n.f(r.navigatorBars,((i,o,e)=>({a:"e79f6488-3-"+e+",e79f6488-2-"+e,b:n.p({type:i.icon,size:40,color:"#777"}),c:n.t(i.name),d:o,e:"e79f6488-2-"+e+",e79f6488-1",f:n.p({index:o})}))),c:n.o(a.change),d:n.p({column:4,highlight:!0}),e:n.o(((...n)=>a.toMqtt&&a.toMqtt(...n))),f:n.o(((...n)=>a.toWxLogin&&a.toWxLogin(...n)))}}]]);wx.createPage(o);