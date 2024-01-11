"use strict";
const common_vendor = require("../../common/vendor.js");
const http_index = require("../../http/index.js");
require("../../http/request.js");
require("../../store/user.js");
require("../../http/config.js");
const _sfc_main = {
  data() {
    return {
      searchValue: "",
      bgcolor: "#e43d33",
      frontColor: "#ffffff",
      type: "bottom",
      articleCats: [],
      activeIndex: 5,
      first: true
    };
  },
  onLoad() {
    common_vendor.index.setNavigationBarColor({
      backgroundColor: this.bgcolor,
      frontColor: this.fontColor
    });
    this.getArticleCats();
  },
  onShow() {
    if (this.articleCats.length == 0 && !this.first) {
      this.getArticleCats();
    }
  },
  onHide() {
    this.first = false;
  },
  methods: {
    search(e) {
      console.log(e);
    },
    getArticleCats() {
      http_index.getRequest("api/articleCat/all").then((res) => {
        console.log(res);
        if (res.success) {
          this.articleCats = res.data.articleCats;
        }
      });
    },
    getArticles(articleCatId, index) {
      this.activeIndex = index;
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.bgcolor,
    b: common_vendor.o($options.search),
    c: common_vendor.o(($event) => $data.searchValue = $event),
    d: common_vendor.p({
      ["cancel-button"]: "none",
      focus: true,
      modelValue: $data.searchValue
    }),
    e: common_vendor.f($data.articleCats, (item, index, i0) => {
      return common_vendor.e({
        a: item.showInNav
      }, item.showInNav ? {
        b: common_vendor.t(item.catName),
        c: index == $data.activeIndex ? 1 : "",
        d: common_vendor.o(($event) => $options.getArticles(item.id, index))
      } : {});
    }),
    f: common_vendor.p({
      type: $data.type
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp-vue3-wx/pages/index/wiki.vue"]]);
wx.createPage(MiniProgramPage);
