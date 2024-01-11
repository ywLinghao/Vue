"use strict";
const common_vendor = require("../common/vendor.js");
const store_user = require("../store/user.js");
const http_config = require("./config.js");
const request = (options) => {
  const {
    method,
    url,
    data,
    timeout = http_config.config.timeOut,
    header = {}
  } = options;
  const userStore = store_user.useUserStore();
  const token = userStore.userinfo.token;
  let contentType = "application/json;charset=UTF-8";
  if (token.length > 0) {
    header["token"] = token;
  }
  header["content-type"] = contentType;
  common_vendor.index.showLoading({
    title: "加载中"
  });
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      header,
      method,
      timeout: http_config.config.timeOut,
      url: http_config.config.baseUrl + url,
      data,
      success: ({ data: data2 }) => {
        if (data2.success) {
          resolve(data2);
        } else {
          if (data2.code == 2005) {
            common_vendor.index.navigateTo({
              url: "/pages/index/login"
            });
          }
          common_vendor.index.showToast({
            title: data2.msg,
            duration: 2e3,
            icon: "none"
          });
        }
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        common_vendor.index.hideLoading();
        common_vendor.index.stopPullDownRefresh();
      }
    });
  });
};
exports.request = request;
