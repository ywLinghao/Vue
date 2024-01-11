"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "bgyxedit",
  props: {
    taskinfodtv: {
      type: Array,
      default() {
        return [{ type: "text", value: "", f: false }];
      }
    },
    mtype: {
      type: Array,
      default() {
        return ["text", "img", "video"];
      }
    },
    uploadurl: {
      type: String,
      default: ""
    },
    showdone: {
      type: Boolean,
      default: false
    },
    filename: {
      type: String,
      default: "uploadfile"
    }
  },
  data() {
    return {
      htmlinfo: ""
    };
  },
  methods: {
    returnthisinfo: function() {
      console.log(this.taskinfodtv);
      this.$emit("bgyxchange", this.returninfo());
    },
    returninfo: function() {
      var that = this;
      var infoarr = that.taskinfodtv;
      var info = "";
      for (var o in infoarr) {
        var arr = infoarr[o];
        if (arr.value) {
          if (arr.type == "text") {
            info = info + '<p style="margin:5px auto;">' + arr.value + "</p>";
          }
          if (arr.type == "img") {
            info = info + '<p style="text-align:center;margin:5px auto;"><img style="width:300px;margin:auto;" src="' + arr.value + '"></p>';
          }
          if (arr.type == "video") {
            info = info + '<p style="text-align:center;margin:5px auto;"><video controls="controls" style="width:300px;margin:auto;" src="' + arr.value + '"></video></p>';
          }
        }
      }
      if (info) {
        info = '<p style="text-align:center;margin:5px auto;">' + info + "</p>";
        return { "html": info, "data": infoarr };
      } else {
        return { "html": "", "data": infoarr };
      }
    },
    addvuetype: function(e) {
      var that = this;
      if (e == 0) {
        this.taskinfodtv.push({ type: "text", value: "", f: true });
      }
      if (e == 1) {
        common_vendor.index.chooseImage({
          count: 1,
          success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;
            common_vendor.index.showLoading({
              title: "上传中..."
            });
            common_vendor.index.uploadFile({
              url: that.uploadurl,
              //上传后返回文件保存的路径即可
              filePath: tempFilePaths[0],
              name: "img",
              success: (uploadFileRes) => {
                console.log(uploadFileRes.data);
                var upimg = uploadFileRes.data;
                that.taskinfodtv.push({ type: "img", value: upimg });
                that.$emit("bgyxchange", that.returninfo());
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      }
      if (e == 2) {
        common_vendor.index.chooseVideo({
          count: 1,
          sourceType: ["camera", "album"],
          success: function(res) {
            var vd = res.tempFilePath;
            common_vendor.index.showLoading({
              title: "上传中..."
            });
            common_vendor.index.uploadFile({
              url: that.uploadurl,
              //上传后返回文件保存的路径即可
              filePath: vd,
              name: "video",
              success: (uploadFileRes) => {
                console.log(uploadFileRes.data);
                var video = uploadFileRes.data;
                that.taskinfodtv.push({ type: "video", value: video });
                that.$emit("bgyxchange", that.returninfo());
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      }
    },
    delthisel: function(i) {
      var that = this;
      var arr = this.taskinfodtv;
      common_vendor.index.showActionSheet({
        itemList: ["↑上移↑", "↓下移↓", "删除"],
        success: function(res) {
          var k = res.tapIndex;
          console.log(k);
          if (k == 0) {
            if (i > 0) {
              var ls = arr[i];
              arr[i] = arr[i - 1];
              arr[i - 1] = ls;
              that.taskinfodtv = [];
              for (var o in arr) {
                that.taskinfodtv.push(arr[o]);
              }
              that.$emit("bgyxchange", that.returninfo());
              console.log(that.taskinfodtv);
            }
          }
          if (k == 1) {
            if (i < arr.length - 1) {
              var ls = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = ls;
              that.taskinfodtv = [];
              for (var o in arr) {
                that.taskinfodtv.push(arr[o]);
              }
              that.$emit("bgyxchange", that.returninfo());
              console.log(that.taskinfodtv);
            }
          }
          if (k == 2) {
            that.taskinfodtv.splice(i, 1);
            that.$emit("bgyxchange", that.returninfo());
            console.log(that.taskinfodtv);
          }
        },
        fail: function(res) {
          console.log(res.errMsg);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.taskinfodtv, (u, i, i0) => {
      return common_vendor.e({
        a: u.type == "text"
      }, u.type == "text" ? {
        b: common_vendor.o(($event) => $options.returnthisinfo()),
        c: common_vendor.o([($event) => $props.taskinfodtv[i].value = $event.detail.value, ($event) => $options.returnthisinfo()]),
        d: common_vendor.o(($event) => $options.returnthisinfo()),
        e: u.f,
        f: $props.taskinfodtv[i].value,
        g: common_vendor.o(($event) => $options.delthisel(i))
      } : {}, {
        h: u.type == "img"
      }, u.type == "img" ? {
        i: common_vendor.o(($event) => $options.delthisel(i)),
        j: $props.taskinfodtv[i]["value"]
      } : {}, {
        k: u.type == "video"
      }, u.type == "video" ? {
        l: common_vendor.o(($event) => $options.delthisel(i))
      } : {});
    }),
    b: $props.showdone
  }, $props.showdone ? {
    c: common_vendor.o(($event) => $options.returnthisinfo()),
    d: common_assets._imports_0$1
  } : {}, {
    e: common_vendor.o(($event) => $options.addvuetype(0)),
    f: common_assets._imports_1,
    g: common_vendor.o(($event) => $options.addvuetype(1)),
    h: common_assets._imports_2,
    i: common_vendor.o(($event) => $options.addvuetype(2)),
    j: common_assets._imports_3
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp-vue3-wx/components/bgyxedit/bgyxedit.vue"]]);
wx.createComponent(Component);
