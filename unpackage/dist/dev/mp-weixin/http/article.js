"use strict";
const http_index = require("./index.js");
const getArticleCats = (url) => {
  return http_index.getRequest(url);
};
exports.getArticleCats = getArticleCats;
