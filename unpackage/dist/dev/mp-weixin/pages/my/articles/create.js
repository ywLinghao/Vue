"use strict";
const common_vendor = require("../../../common/vendor.js");
const http_article = require("../../../http/article.js");
require("../../../http/index.js");
require("../../../http/request.js");
require("../../../store/user.js");
require("../../../http/config.js");
const _sfc_main = {
  data() {
    return {
      article: {
        id: 0,
        articleCatId: 0,
        title: "",
        content: "",
        status: 0,
        userinfoId: 0
      },
      articleCats: [{
        id: 0,
        catName: ""
      }],
      index: 0,
      rules: []
    };
  },
  onLoad() {
    this.getAllArticleCats();
  },
  methods: {
    change(e) {
    },
    getAllArticleCats() {
      const that = this;
      const url = `articleCat/getArticleCatsByField?fields=cat_name,id`;
      http_article.getArticleCats(url).then((res) => {
        if (res.success) {
          that.articleCats = res.data.data;
        } else {
          common_vendor.index.showToast({
            title: "res.msg"
          });
        }
      });
    },
    bindArticleCatChange(e) {
      let index = e.detail.value;
      this.index = index;
      console.log(e);
    },
    getbgyxinfo(e) {
      console.log(e.html);
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_bgyxedit2 = common_vendor.resolveComponent("bgyxedit");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_bgyxedit2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_bgyxedit = () => "../../../components/bgyxedit/bgyxedit.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_bgyxedit + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.articleCats[$data.index].catName = $event),
    b: common_vendor.p({
      modelValue: $data.articleCats[$data.index].catName
    }),
    c: common_vendor.o((...args) => $options.bindArticleCatChange && $options.bindArticleCatChange(...args)),
    d: $data.index,
    e: $data.articleCats,
    f: common_vendor.p({
      required: true,
      name: "articleCatId"
    }),
    g: common_vendor.o(($event) => $data.article.title = $event),
    h: common_vendor.p({
      placeholder: "请输入文章标题",
      modelValue: $data.article.title
    }),
    i: common_vendor.p({
      required: true,
      name: "title"
    }),
    j: common_vendor.o($options.getbgyxinfo),
    k: common_vendor.p({
      showdone: false,
      uploadurl: "#",
      filename: "img"
    }),
    l: common_vendor.p({
      required: true,
      name: "content"
    }),
    m: common_vendor.sr("articleForm", "d1ed96d8-0"),
    n: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.article
    }),
    o: common_vendor.o(($event) => _ctx.submit("articleForm"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp-vue3-wx/pages/my/articles/create.vue"]]);
wx.createPage(MiniProgramPage);
