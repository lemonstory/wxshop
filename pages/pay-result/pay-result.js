// pages/pay-result/pay-result.js
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // status:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.sign === 'ok') {
      this.setData({ status: true, isShow: true })
    } else {
      this.setData({ status: false,isShow:true })
    }
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
   * 重新付款
   */
  payOrder: function () {
    var body = util.getToken(constant.constant.payParams)
    wx.requestPayment({
      timeStamp: body.timeStamp.toString(),
      nonceStr: body.nonceStr,
      package: body.package,
      signType: body.signType,
      paySign: body.paySign,
      success: function (res) {
        
      },
      fail: function (res) {
        
      }
    })
  }
})