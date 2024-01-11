"use strict";
const http_request = require("./request.js");
const getRequest = (url, params) => {
  return http_request.request({
    url,
    method: "GET",
    data: params
  });
};
const postRequest = (url, params) => {
  return http_request.request({
    url,
    method: "POST",
    data: params
  });
};
exports.getRequest = getRequest;
exports.postRequest = postRequest;
