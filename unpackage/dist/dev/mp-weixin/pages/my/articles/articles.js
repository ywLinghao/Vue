"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      },
      horizontal: "right",
      vertical: "bottom"
    };
  },
  methods: {
    fabClick() {
      common_vendor.index.navigateTo({
        url: "/pages/my/articles/create"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  _easycom_uni_fab2();
}
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  _easycom_uni_fab();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("fab", "72f7c556-0"),
    b: common_vendor.o($options.fabClick),
    c: common_vendor.p({
      pattern: $data.pattern,
      horizontal: $data.horizontal,
      vertical: $data.vertical
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp-vue3-wx/pages/my/articles/articles.vue"]]);
wx.createPage(MiniProgramPage);
