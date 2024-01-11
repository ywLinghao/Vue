"use strict";const e=require("./request.js");exports.getRequest=(t,s)=>e.request({url:t,method:"GET",data:s}),exports.postRequest=(t,s)=>e.request({url:t,method:"POST",data:s});
