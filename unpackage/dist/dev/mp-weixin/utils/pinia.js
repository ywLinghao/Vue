"use strict";
const common_vendor = require("../common/vendor.js");
const pinia = common_vendor.createPinia();
pinia.use(common_vendor.index$1);
exports.pinia = pinia;
