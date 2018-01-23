//app.js
var constant = require('utils/constant.js')
var util = require('utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getAdminToken() 
  },
  onShow: function (options) {
    // Do something when show.
    console.log(constant.constant.domain);
    console.log("App onShow run");
    // this.getUserToken()
  },
  onHide: function () {
    // Do something when hide.
    console.log("App onHide run");
  },
  onError: function (msg) {
    console.log("App onHide run");
    console.log(msg);
  },

  globalUserToken: '',
  constant: constant.constant,
  // 获取访问令牌
  getAdminToken: function () {
    console.log("🚀 🚀 🚀 getUserToken run");
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/integration/admin/token';
    wx.request({
      url: url,
      data: {
        username: constant.constant.username,
        password: constant.constant.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        // 'user-agent': 'api.xiaoningmeng.net/2.8.0/adr (M5 Note,864883030379469,460027404571654,6.0,1080*1920,4.589389937671455,480,wifi,_360,zh)',
      },
      success: function (res) {
        if (!util.isEmptyStr(res.data)) {
          util.setAdminToken(res.data)
        }
      }
    })
  }
  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  // globalData: {
  //   userInfo: null
  // }
})