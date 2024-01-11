"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      registerModel: {
        email: "",
        userName: "",
        password: "",
        repassword: "",
        emailCode: ""
      },
      emailCode: "123456",
      loading: true,
      rules: {
        email: {
          rules: [
            {
              required: true,
              errorMessage: "必填项"
            },
            {
              validateFunction: function(rule, value, data, callback) {
                let reg = /^([0-9a-zA-Z_.-])+@([0-9a-zA-Z_.-])+.([a-zA-Z]+)$/;
                if (value.match(reg) == null) {
                  callback("邮件格式不正确");
                }
                return true;
              }
            }
            //验证是否邮件重复
          ]
        },
        userName: {
          rules: [
            {
              required: true,
              errorMessage: "必填项"
            },
            {
              validateFunction: function(rule, value, data, callback) {
                let reg = /^[a-zA-Z0-9_-]{8,20}$/;
                if (value.match(reg) == null) {
                  callback("用户账号长度8到20位（字母，数字，下划线，减号）");
                }
                return true;
              }
            }
            //用户账号不能重复
          ]
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: "必填项"
            },
            {
              validateFunction: function(rule, value, data, callback) {
                let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
                if (value.match(reg) == null) {
                  callback("至少8-16个字符，1个大写字母，1个小写字母和1个数字");
                }
                return true;
              }
            }
          ]
        },
        repassword: {
          rules: [
            {
              required: true,
              errorMessage: "必填项"
            },
            {
              validateFunction: function(rule, value, data, callback) {
                let psw = data.password;
                if (value !== psw) {
                  callback("两次输入密码不一致");
                }
                return true;
              }
            }
          ]
        },
        emailCode: {
          rules: [
            {
              required: true,
              errorMessage: "必填项"
            },
            {
              validateFunction: function(rule, value, data, callback) {
                let emailCode = this.emailCode;
                if (value == emailCode) {
                  callback("邮件验证码不一致");
                }
                return true;
              }
            }
          ]
        }
      }
    };
  },
  onReady() {
    this.$refs.myForm.setRules(this.rules);
  },
  methods: {
    btnRegister() {
      this.$refs.myForm.validate().then((res) => {
        console.log(res);
      }).catch((err) => {
      });
    },
    btnEmailCode() {
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.o(($event) => $data.registerModel.email = $event),
    c: common_vendor.p({
      inputmode: "email",
      placeholder: "请输入电子邮箱",
      ["suffix-icon"]: "email",
      modelValue: $data.registerModel.email
    }),
    d: common_vendor.p({
      name: "email",
      required: true
    }),
    e: common_vendor.o(($event) => $data.registerModel.userName = $event),
    f: common_vendor.p({
      placeholder: "请输入用户账号",
      ["suffix-icon"]: "person",
      modelValue: $data.registerModel.userName
    }),
    g: common_vendor.p({
      name: "userName",
      required: true
    }),
    h: common_vendor.o(($event) => $data.registerModel.emailCode = $event),
    i: common_vendor.p({
      placeholder: "请输入邮箱验证码",
      modelValue: $data.registerModel.emailCode
    }),
    j: $data.loading,
    k: common_vendor.o((...args) => $options.btnEmailCode && $options.btnEmailCode(...args)),
    l: common_vendor.p({
      name: "emailCode",
      required: true
    }),
    m: common_vendor.o(($event) => $data.registerModel.password = $event),
    n: common_vendor.p({
      type: "password",
      placeholder: "请输入密码",
      modelValue: $data.registerModel.password
    }),
    o: common_vendor.p({
      name: "password",
      required: true
    }),
    p: common_vendor.o(($event) => $data.registerModel.repassword = $event),
    q: common_vendor.p({
      type: "password",
      placeholder: "请输入确认密码",
      modelValue: $data.registerModel.repassword
    }),
    r: common_vendor.p({
      name: "repassword",
      required: true
    }),
    s: common_vendor.o((...args) => $options.btnRegister && $options.btnRegister(...args)),
    t: common_vendor.sr("myForm", "72931329-0"),
    v: common_vendor.p({
      modelValue: $data.registerModel,
      rules: $data.rules
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp-vue3-wx/pages/index/register.vue"]]);
wx.createPage(MiniProgramPage);
