// pages/person/person.js
var util = require('../../../utils/util.js');
var constant = require('../../../utils/constant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 头像 */
    imgNum: 0,
    name: '未登录',
    level: '点击登录账号',
    /** 是否跳转登录 */
    isJumpToLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('sdasdasdasd')
    // // this.login()
    // if (util.isEmptyStr(util.getToken(constant.constant.userTokenKey))) {
    //   console.log('未登录')
    //   this.setData({ isJumpToLogin: true})
    // } else {
    //   this.setData({ isJumpToLogin: false })
    //   console.log('已登录')
    // }
    wx.showNavigationBarLoading()
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
    if (util.isEmptyStr(util.getToken(constant.constant.userTokenKey))) {
      // console.log('未登录')
      this.setData({ isJumpToLogin: true })
    } else {
      if (!util.isEmptyStr(util.getToken(constant.constant.userInfoKey))) {
        var name = util.getToken(constant.constant.userInfoKey).firstname
        var level = constant.constant.level
        this.setData({ isJumpToLogin: false, name: name, level: level })
      } else {
        this.setData({ isJumpToLogin: true })
      }
    }
    wx.hideNavigationBarLoading()
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
   * 点击账号登陆
   */
  handleTapUserLogin: function () {
    var path = "/pages/auth/login";
    wx.navigateTo({
      url: path
    })
  },

  /**
  * 点击跳转地址管理
  */
  handleTapToAderssManager: function () {
    if (util.isEmptyStr(util.getToken(constant.constant.userTokenKey))) {
      this.handleTapUserLogin()
    } else {
      var path = "/pages/shopping/address-manager/address-manager";
      wx.navigateTo({
        url: path
      })
    }
  },

  /**
  * 点击跳转我的订单
  */
  handleTapToMyOrder: function () {
    if (util.isEmptyStr(util.getToken(constant.constant.userTokenKey))) {
      this.handleTapUserLogin()
    } else {
      var path = "/pages/usercenter/order/order";
      wx.navigateTo({
        url: path
      })
    }
  },
})