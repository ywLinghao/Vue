"use strict";
const common_vendor = require("../../common/vendor.js");
let sysInfo = common_vendor.index.getSystemInfoSync();
let SCREEN_WIDTH = sysInfo.screenWidth;
let PAGE_X, PAGE_Y;
sysInfo.pixelRatio;
let T_PAGE_X, T_PAGE_Y, CUT_L, CUT_T, CUT_R, CUT_B, IMG_RATIO, IMG_REAL_W, IMG_REAL_H, DRAFG_MOVE_RATIO = 1, INIT_DRAG_POSITION = 100, DRAW_IMAGE_W = sysInfo.screenWidth;
const _sfc_main = {
  /**
   * 页面的初始数据
   */
  data() {
    return {
      name: "杨大宝",
      imageSrc: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b31d90c0-5168-11eb-bdc1-8bd33eb6adaa.jpg",
      isShowImg: false,
      // 初始化的宽高
      cropperInitW: SCREEN_WIDTH,
      cropperInitH: SCREEN_WIDTH,
      // 动态的宽高
      cropperW: SCREEN_WIDTH,
      cropperH: SCREEN_WIDTH,
      // 动态的left top值
      cropperL: 0,
      cropperT: 0,
      transL: 0,
      transT: 0,
      // 图片缩放值
      scaleP: 0,
      imageW: 0,
      imageH: 0,
      // 裁剪框 宽高
      cutL: 0,
      cutT: 0,
      cutB: SCREEN_WIDTH,
      cutR: "100%",
      qualityWidth: DRAW_IMAGE_W,
      innerAspectRadio: DRAFG_MOVE_RATIO
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.loadImage();
  },
  methods: {
    setData: function(obj) {
      let that = this;
      Object.keys(obj).forEach(function(key) {
        that.$set(that.$data, key, obj[key]);
      });
    },
    getImage: function() {
      var _this = this;
      common_vendor.index.chooseImage({
        success: function(res) {
          _this.setData({
            imageSrc: res.tempFilePaths[0]
          });
          _this.loadImage();
        }
      });
    },
    loadImage: function() {
      var _this = this;
      common_vendor.index.showLoading({
        title: "图片加载中..."
      });
      common_vendor.index.getImageInfo({
        src: _this.imageSrc,
        success: function success(res) {
          IMG_RATIO = res.width / res.height;
          if (IMG_RATIO >= 1) {
            IMG_REAL_W = SCREEN_WIDTH;
            IMG_REAL_H = SCREEN_WIDTH / IMG_RATIO;
          } else {
            IMG_REAL_W = SCREEN_WIDTH * IMG_RATIO;
            IMG_REAL_H = SCREEN_WIDTH;
          }
          let minRange = IMG_REAL_W > IMG_REAL_H ? IMG_REAL_W : IMG_REAL_H;
          INIT_DRAG_POSITION = minRange > INIT_DRAG_POSITION ? INIT_DRAG_POSITION : minRange;
          if (IMG_RATIO >= 1) {
            let cutT = Math.ceil((SCREEN_WIDTH / IMG_RATIO - (SCREEN_WIDTH / IMG_RATIO - INIT_DRAG_POSITION)) / 2);
            let cutB = cutT;
            let cutL = Math.ceil((SCREEN_WIDTH - SCREEN_WIDTH + INIT_DRAG_POSITION) / 2);
            let cutR = cutL;
            _this.setData({
              cropperW: SCREEN_WIDTH,
              cropperH: SCREEN_WIDTH / IMG_RATIO,
              // 初始化left right
              cropperL: Math.ceil((SCREEN_WIDTH - SCREEN_WIDTH) / 2),
              cropperT: Math.ceil((SCREEN_WIDTH - SCREEN_WIDTH / IMG_RATIO) / 2),
              cutL,
              cutT,
              cutR,
              cutB,
              // 图片缩放值
              imageW: IMG_REAL_W,
              imageH: IMG_REAL_H,
              scaleP: IMG_REAL_W / SCREEN_WIDTH,
              qualityWidth: DRAW_IMAGE_W,
              innerAspectRadio: IMG_RATIO
            });
          } else {
            let cutL = Math.ceil((SCREEN_WIDTH * IMG_RATIO - SCREEN_WIDTH * IMG_RATIO) / 2);
            let cutR = cutL;
            let cutT = Math.ceil((SCREEN_WIDTH - INIT_DRAG_POSITION) / 2);
            let cutB = cutT;
            _this.setData({
              cropperW: SCREEN_WIDTH * IMG_RATIO,
              cropperH: SCREEN_WIDTH,
              // 初始化left right
              cropperL: Math.ceil((SCREEN_WIDTH - SCREEN_WIDTH * IMG_RATIO) / 2),
              cropperT: Math.ceil((SCREEN_WIDTH - SCREEN_WIDTH) / 2),
              cutL,
              cutT,
              cutR,
              cutB,
              // 图片缩放值
              imageW: IMG_REAL_W,
              imageH: IMG_REAL_H,
              scaleP: IMG_REAL_W / SCREEN_WIDTH,
              qualityWidth: DRAW_IMAGE_W,
              innerAspectRadio: IMG_RATIO
            });
          }
          _this.setData({
            isShowImg: true
          });
          common_vendor.index.hideLoading();
        }
      });
    },
    // 拖动时候触发的touchStart事件
    contentStartMove(e) {
      PAGE_X = e.touches[0].pageX;
      PAGE_Y = e.touches[0].pageY;
    },
    // 拖动时候触发的touchMove事件
    contentMoveing(e) {
      var dragLengthX = (PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO;
      var dragLengthY = (PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO;
      if (dragLengthX > 0) {
        if (this.cutL - dragLengthX < 0)
          dragLengthX = this.cutL;
      } else {
        if (this.cutR + dragLengthX < 0)
          dragLengthX = -this.cutR;
      }
      if (dragLengthY > 0) {
        if (this.cutT - dragLengthY < 0)
          dragLengthY = this.cutT;
      } else {
        if (this.cutB + dragLengthY < 0)
          dragLengthY = -this.cutB;
      }
      this.setData({
        cutL: this.cutL - dragLengthX,
        cutT: this.cutT - dragLengthY,
        cutR: this.cutR + dragLengthX,
        cutB: this.cutB + dragLengthY
      });
      PAGE_X = e.touches[0].pageX;
      PAGE_Y = e.touches[0].pageY;
    },
    contentTouchEnd() {
    },
    // 获取图片
    getImageInfo() {
      var _this = this;
      common_vendor.index.showLoading({
        title: "图片生成中..."
      });
      const ctx = common_vendor.index.createCanvasContext("myCanvas");
      ctx.drawImage(_this.imageSrc, 0, 0, IMG_REAL_W, IMG_REAL_H);
      ctx.draw(true, () => {
        var canvasW = (_this.cropperW - _this.cutL - _this.cutR) / _this.cropperW * IMG_REAL_W;
        var canvasH = (_this.cropperH - _this.cutT - _this.cutB) / _this.cropperH * IMG_REAL_H;
        var canvasL = _this.cutL / _this.cropperW * IMG_REAL_W;
        var canvasT = _this.cutT / _this.cropperH * IMG_REAL_H;
        common_vendor.index.canvasToTempFilePath({
          x: canvasL,
          y: canvasT,
          width: canvasW,
          height: canvasH,
          destWidth: canvasW,
          destHeight: canvasH,
          quality: 0.5,
          canvasId: "myCanvas",
          success: function(res) {
            common_vendor.index.hideLoading();
            common_vendor.index.previewImage({
              current: "",
              // 当前显示图片的http链接
              urls: [res.tempFilePath]
              // 需要预览的图片http链接列表
            });
          }
        });
      });
    },
    // 设置大小的时候触发的touchStart事件
    dragStart(e) {
      T_PAGE_X = e.touches[0].pageX;
      T_PAGE_Y = e.touches[0].pageY;
      CUT_L = this.cutL;
      CUT_R = this.cutR;
      CUT_B = this.cutB;
      CUT_T = this.cutT;
    },
    // 设置大小的时候触发的touchMove事件
    dragMove(e) {
      var dragType = e.target.dataset.drag;
      switch (dragType) {
        case "right":
          var dragLength = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO;
          if (CUT_R + dragLength < 0)
            dragLength = -CUT_R;
          this.setData({
            cutR: CUT_R + dragLength
          });
          break;
        case "left":
          var dragLength = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO;
          if (CUT_L - dragLength < 0)
            dragLength = CUT_L;
          if (CUT_L - dragLength > this.cropperW - this.cutR)
            dragLength = CUT_L - (this.cropperW - this.cutR);
          this.setData({
            cutL: CUT_L - dragLength
          });
          break;
        case "top":
          var dragLength = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO;
          if (CUT_T - dragLength < 0)
            dragLength = CUT_T;
          if (CUT_T - dragLength > this.cropperH - this.cutB)
            dragLength = CUT_T - (this.cropperH - this.cutB);
          this.setData({
            cutT: CUT_T - dragLength
          });
          break;
        case "bottom":
          var dragLength = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO;
          if (CUT_B + dragLength < 0)
            dragLength = -CUT_B;
          this.setData({
            cutB: CUT_B + dragLength
          });
          break;
        case "rightBottom":
          var dragLengthX = (T_PAGE_X - e.touches[0].pageX) * DRAFG_MOVE_RATIO;
          var dragLengthY = (T_PAGE_Y - e.touches[0].pageY) * DRAFG_MOVE_RATIO;
          if (CUT_B + dragLengthY < 0)
            dragLengthY = -CUT_B;
          if (CUT_R + dragLengthX < 0)
            dragLengthX = -CUT_R;
          let cutB = CUT_B + dragLengthY;
          let cutR = CUT_R + dragLengthX;
          this.setData({
            cutB,
            cutR
          });
          break;
      }
    }
  }
};
if (!Array) {
  const _component_page_foot = common_vendor.resolveComponent("page-foot");
  _component_page_foot();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isShowImg
  }, $data.isShowImg ? {
    b: $data.imageSrc,
    c: common_vendor.s("width:" + $data.cropperW + "px;height:" + $data.cropperH + "px"),
    d: common_vendor.o((...args) => $options.dragStart && $options.dragStart(...args)),
    e: common_vendor.o((...args) => $options.dragMove && $options.dragMove(...args)),
    f: common_vendor.o((...args) => $options.dragStart && $options.dragStart(...args)),
    g: common_vendor.o((...args) => $options.dragMove && $options.dragMove(...args)),
    h: common_vendor.o((...args) => $options.dragStart && $options.dragStart(...args)),
    i: common_vendor.o((...args) => $options.dragMove && $options.dragMove(...args)),
    j: common_vendor.o((...args) => $options.dragStart && $options.dragStart(...args)),
    k: common_vendor.o((...args) => $options.dragMove && $options.dragMove(...args)),
    l: common_vendor.o((...args) => $options.dragStart && $options.dragStart(...args)),
    m: common_vendor.o((...args) => $options.dragMove && $options.dragMove(...args)),
    n: common_vendor.o((...args) => $options.dragStart && $options.dragStart(...args)),
    o: common_vendor.o((...args) => $options.dragMove && $options.dragMove(...args)),
    p: common_vendor.o((...args) => $options.dragStart && $options.dragStart(...args)),
    q: common_vendor.o((...args) => $options.dragMove && $options.dragMove(...args)),
    r: common_vendor.o((...args) => $options.dragStart && $options.dragStart(...args)),
    s: common_vendor.o((...args) => $options.dragMove && $options.dragMove(...args)),
    t: common_vendor.o((...args) => _ctx.dragEnd && _ctx.dragEnd(...args)),
    v: common_vendor.o((...args) => $options.dragStart && $options.dragStart(...args)),
    w: common_vendor.o((...args) => $options.dragMove && $options.dragMove(...args)),
    x: common_vendor.o((...args) => $options.contentStartMove && $options.contentStartMove(...args)),
    y: common_vendor.o((...args) => $options.contentMoveing && $options.contentMoveing(...args)),
    z: common_vendor.o((...args) => $options.contentTouchEnd && $options.contentTouchEnd(...args)),
    A: common_vendor.s("left:" + $data.cutL + "px;top:" + $data.cutT + "px;right:" + $data.cutR + "px;bottom:" + $data.cutB + "px"),
    B: common_vendor.s("width:" + $data.cropperW + "px;height:" + $data.cropperH + "px;left:" + $data.cropperL + "px;top:" + $data.cropperT + "px"),
    C: common_vendor.s("width:" + $data.cropperInitW + "px;height:" + $data.cropperInitH + "px;background:#000")
  } : {}, {
    D: common_vendor.o((...args) => $options.getImage && $options.getImage(...args)),
    E: common_vendor.o((...args) => $options.getImageInfo && $options.getImageInfo(...args)),
    F: common_vendor.s("position:absolute;border: 1px solid red; width:" + $data.imageW + "px;height:" + $data.imageH + "px;top:-9999px;left:-9999px;"),
    G: common_vendor.p({
      name: $data.name
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp-vue3-wx/pages/index/crop.vue"]]);
wx.createPage(MiniProgramPage);
