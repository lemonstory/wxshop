// pages/person/person.js
var util = require('../../../utils/util.js');
var constant = require('../../../utils/constant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户登录
   */
  login: function () {
    var that = this
    wx.login({
      success: res => {
        console.log(res)
        that.getUserInfo(res.code)
      },
      fail: function (res) {
        console.error('调取微信登陆错误')
        console.error(res)
      }
    })
  },

  /**
   * 获取用户信息
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
        console.error('获取用户信息失败')
        console.error(res)
      }
    })
  },

  /**
   * 调取后台登陆接口
   */
  getLoginApi: function (code, encryptedData, iv) {
    console.log("🚀 🚀 🚀 getLoginApi");
    // var that = this;
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
        console.log('res')
        console.log(res)
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 个人页调取getLoginApi错误')
        console.error(res)
      }
    })
  }
})