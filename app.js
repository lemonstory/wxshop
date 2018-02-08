//app.js
var constant = require('utils/constant.js')
var util = require('utils/util.js')
// var login = require('pages/auth/login.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // console.log(util.getToken(constant.constant.adminTokenKey))
    this.getAdminToken()
    if (!util.isEmptyStr(util.getToken(constant.constant.userTokenKey))) {
      this.handleTapWXlogin()
    }
  },
  onShow: function (options) {
    // Do something when show.
    // console.log(constant.constant.domain);
    // console.log("App onShow run");
    // this.getUserToken()
  },
  onHide: function () {
    // Do something when hide.
    // console.log("App onHide run");
  },
  onError: function (msg) {
    console.log("App onHide run");
    console.log(msg);
  },

  globalUserToken: '',
  constant: constant.constant,
  // 获取访问令牌
  getAdminToken: function () {
    // console.log("🚀 🚀 🚀 getUserToken run");
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
          util.setToken(constant.constant.adminTokenKey,res.data)
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 app.js设置缓存错误')
        console.error(res)
      }
    })
  },
  /**
 * 用户授权登陆
 */
  handleTapWXlogin: function () {
    var that = this
    wx.login({
      success: res => {
        // console.log(res)
        that.getUserInfo(res.code)
      },
      fail: function (res) {
        console.error('调取微信登陆错误')
        console.error(res)
      }
    })
  },

  /**
   * 微信获取用户信息
   */
  getUserInfo: function (code) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        // console.log(res.encryptedData)
        // console.log( res.iv)
        that.getLoginApi(code, res.encryptedData, res.iv)
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      },
      fail: function (res) {
        console.log('微信获取用户信息失败')
        console.log(res)
        that.handleTapCancleAuth()
      }
    })
  },

  /**
   * 调取后台登陆接口
   */
  getLoginApi: function (code, encryptedData, iv) {
    // console.log("🚀 🚀 🚀 getLoginApi");
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/wxlogin/';
    wx.request({
      url: url,
      data: {
        code: code,
        encryptedData: encryptedData,
        iv: iv
      },
      method: 'POST',
      header: util.adminRequestHeader(),
      success: function (res) {
        if (res.statusCode === 200) {
          util.setToken(constant.constant.userTokenKey, res.data)
          that.getUserCartInfo(res.data)
          that.getCustomerInfo(res.data)
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 登陆页调取getLoginApi错误')
        console.error(res)
      }
    })
  },

  /**
   * 后台获取客户信息
   */
  getCustomerInfo: function (token) {
    var that = this
    var url = constant.constant.domain + constant.constant.path + '/V1/customers/me';
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          util.setToken(constant.constant.userInfoKey, res.data)
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 后台获取客户信息成功错误')
      }
    })
  },
  /**
   * 获取当前用户购物车信息  //TODO  404
   */
  getUserCartInfo: function (userToken) {
    // console.log(userToken)
    // 测试token
    userToken = constant.constant.userToken
    var that = this
    var url = constant.constant.domain + constant.constant.path + '/V1/carts/mine';
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + userToken
      },
      success: function (res) {
        // console.log('获取购物车信息')
        // console.log(res)
        if (res.statusCode === 200) {
          // 设置购物车id缓存  + 购物车商品数量
          var quote_id = Number(res.data.id)
          util.setToken(constant.constant.quote_id, quote_id)
          var qty = Number(res.data.items_qty)
          util.setToken(constant.constant.qty, qty)
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 获取购物车信息错误')
      }
    })
  }
  
})