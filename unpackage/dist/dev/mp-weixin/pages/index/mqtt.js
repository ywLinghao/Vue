"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  computed: {
    uri() {
      const {
        protocol,
        host,
        port,
        endpoint
      } = this.connection;
      return `${protocol}://${host}:${port}${endpoint}`;
    }
  },
  data() {
    return {
      //连接参数
      connection: {
        protocol: "wxs",
        port: 8084,
        // ws: 8083; wss: 8084
        host: "jqrjq.cn",
        endpoint: "/mqtt",
        // for more options, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
        clean: true,
        connectTimeout: 30 * 1e3,
        // ms
        reconnectPeriod: 4e3,
        // ms
        clientId: "emqx_vue_" + Math.random().toString(16).substring(2, 8),
        // auth
        username: "emqx_test",
        password: "emqx_test",
        keep_alive: 60
      },
      //订阅
      subscription: {
        topic: "envs",
        qos: 0
      },
      //发布
      publish: {
        topic: "topic/browser",
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }'
      },
      receiveNews: "",
      qosList: [0, 1, 2],
      client: {
        connected: false
      },
      subscribeSuccess: false,
      connecting: false,
      retryTimes: 0,
      ssl: false,
      connected: false,
      //消息列表
      msgs: []
    };
  },
  methods: {
    //方法、参数参考https://www.emqx.com/en/blog/how-to-use-mqtt-in-vue
    //初始化
    initData() {
      this.client = {
        connected: false
      };
      this.retryTimes = 0;
      this.connecting = false;
      this.subscribeSuccess = false;
    },
    //重连操作
    handleOnReConnect() {
      this.retryTimes += 1;
      if (this.retryTimes > 5) {
        try {
          this.client.end();
          this.initData();
          this.$message.error("Connection maxReconnectTimes limit, stop retry");
        } catch (error) {
          this.$message.error(error.toString());
        }
      }
    },
    createConnection() {
      try {
        this.connecting = true;
        const {
          protocol,
          host,
          port,
          endpoint,
          ...options
        } = this.connection;
        const connectUrl = `${protocol}://${host}:${port}${endpoint}`;
        this.client = common_vendor.mqtt.connect(connectUrl, options);
        if (this.client.on) {
          this.client.on("connect", () => {
            this.connecting = false;
            this.connected = true;
            console.log("Connection succeeded!");
          });
          this.client.on("reconnect", this.handleOnReConnect);
          this.client.on("error", (error) => {
            console.log("Connection failed", error);
          });
          this.client.on("message", (topic, message) => {
            this.receiveNews = this.receiveNews.concat(message);
            const data = JSON.parse(message);
            this.msgs.push(data);
          });
        }
      } catch (error) {
        this.connecting = false;
        console.log("mqtt.connect error", error);
      }
    },
    //断开连接
    destroyConnection() {
      if (this.client.connected) {
        try {
          this.client.end(false, () => {
            this.initData();
            this.connected = false;
            console.log("Successfully disconnected!");
          });
        } catch (error) {
          console.log("Disconnect failed", error.toString());
        }
      }
    },
    //订阅主题
    doSubscribe() {
      const {
        topic,
        qos
      } = this.subscription;
      this.client.subscribe(topic, {
        qos
      }, (error, res) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        this.subscribeSuccess = true;
        console.log("Subscribe to topics res", res);
      });
    },
    //取消订阅
    doUnSubscribe() {
      const { topic } = this.subscription;
      this.client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
        }
      });
    },
    //发布消息
    doPublish() {
      const {
        topic,
        qos,
        payload
      } = this.publish;
      this.client.publish(topic, payload, {
        qos
      }, (error) => {
        if (error) {
          console.log("Publish error", error);
        }
      });
    },
    changeUrl: function(e) {
      const {
        value
      } = e.detail;
      value.forEach((item) => {
        this.connection.port = item == "SSL" ? 8084 : 8083;
        this.connection.protocol = item == "SSL" ? "wss" : "ws";
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.connection.host,
    b: $data.connection.port,
    c: $data.connection.endpoint,
    d: $data.connection.clientId,
    e: $data.connection.username,
    f: $data.connection.password,
    g: $data.connection.keep_alive,
    h: $data.subscription.topic,
    i: $data.publish.topic,
    j: $data.publish.payload,
    k: common_vendor.t($options.uri),
    l: common_vendor.o((...args) => $options.changeUrl && $options.changeUrl(...args)),
    m: !$data.connected
  }, !$data.connected ? {
    n: common_vendor.o((...args) => $options.createConnection && $options.createConnection(...args))
  } : {}, {
    o: common_vendor.o((...args) => $options.destroyConnection && $options.destroyConnection(...args)),
    p: !$data.connected
  }, !$data.connected ? {} : {}, {
    q: common_vendor.o((...args) => $options.doSubscribe && $options.doSubscribe(...args)),
    r: common_vendor.o((...args) => $options.doUnSubscribe && $options.doUnSubscribe(...args)),
    s: common_vendor.f($data.msgs, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.msg)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp-vue3-wx/pages/index/mqtt.vue"]]);
wx.createPage(MiniProgramPage);
