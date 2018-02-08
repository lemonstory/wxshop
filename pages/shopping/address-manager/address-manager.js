// pages/shopping/address-manager/address-manager.js
var util = require('../../../utils/util.js');
var constant = require('../../../utils/constant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    isJumpToEditAddress: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  console.log(options)
    if (util.isEmptyStr(util.getToken(constant.constant.userTokenKey))) {
      // console.log('未登录')
      this.handleTapUserLogin()
    } else {
      wx.showNavigationBarLoading()
        this.getUserAdressInfo(util.getToken(constant.constant.userTokenKey),options)
      // console.log('已登录')
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
  onShow: function (options) {
   
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
   * 获取用户地址信息
   */
  getUserAdressInfo: function (token,options) {
    var that = this
    // 测试token
    token = constant.constant.userToken
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
          util.setToken(constant.constant.userAddressKey, res.data)
          // console.log(res.data)
          // console.log('获取用户地址信息正确')
          var list = res.data.addresses
          for (var i = 0; i < list.length; i++) {
            var address = list[i].region.region + list[i].city
            for (var j = 0; j < list[i].street.length; j++) {
              address = address + list[i].street[j]
            }
            list[i].address = address
            list[i].name = list[i].firstname + list[i].lastname
            var telephoneStr = list[i].telephone.substring(3,7)
            list[i].telephoneStr = list[i].telephone.replace(telephoneStr,'****')
          }
          list.sort(util.arrSort('default_shipping'))
          // console.log(list)
          if (!util.isEmptyStr(options.sign)) {
            if (res.data.addresses.length === 0) {
              var path = "/pages/shopping/edit-address/edit-address?id=0";
              wx.navigateTo({
                url: path
              })
            }
          }
          
          that.setData({ addressList: list, addressNum: res.data.addresses.length, isJumpToEditAddress: that.data.isJumpToEditAddress})
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 获取用户地址信息错误')
        console.error(res)
      },
      complete: function (res) {
        wx.hideNavigationBarLoading()
        that.setData({ isShow: true})
      }
    })
  },

// 点击新建地址及编辑图标事件
  handleTapEditAddress:function(event){
    var path = "/pages/shopping/edit-address/edit-address?id=" + event.currentTarget.dataset.id;
    wx.navigateTo({
      url: path
    })
  },

  /**
    * 跳转登录页
    */
  handleTapUserLogin: function () {
    var path = "/pages/auth/login";
    wx.navigateTo({
      url: path
    })
  },
})