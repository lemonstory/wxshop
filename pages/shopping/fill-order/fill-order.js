// pages/shopping/fill-order/fill-order.js
var util = require('../../../utils/util.js');
var constant = require('../../../utils/constant.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // isSelect:判断是否同意协议
        isSelect:1,
        //不同意协议时的状态
        unSelected: '/static/images/unselect.png',
        //同意协议时的状态
        selected: '/static/images/select.png',
        cartGoods: [{ list_pic_url: '/image/1.png', goods_name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', goods_desc: '恩恩恩恩', retail_price: '2000' }, { list_pic_url: '/image/1.png', goods_name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', goods_desc: '恩恩恩恩', retail_price: '2000' }],
        isShow:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      //将上一页的数据在显示在当前页面
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面
      var prevPageData = prevPage.data.cartGoods;
      console.log(prevPageData)
      that.setData({ cartGoods: prevPageData})
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
      // var userInfo = util.getToken(constant.constant.userInfoKey).addresses
      // 测试
      var userInfo = util.getToken(constant.constant.userAddressKey).addresses
      if (userInfo.length === 0) {
        var path = "/pages/shopping/edit-address/edit-address?id=0";
        wx.navigateTo({
          url: path
        })
      } else {
        wx.showNavigationBarLoading()
        this.fillUserOrder()
        // console.log('已登录')
      }
      // this.getUserCartInfo()
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

    // 点击选择地址事件：
    handleTapSelectAddress: function () {
        var path = "/pages/shopping/address-manager/address-manager";
        wx.navigateTo({
            url: path
        })
    },

    // 点击是否同意协议事件
    handleTapIsSelected: function () {
        var that = this;
        that.setData({
            isSelect: !that.data.isSelect
        })
    },

    /**
     * 填写用户订单信息
     */
    fillUserOrder: function () {
      var that = this
      // var userInfo = util.getToken(constant.constant.userInfoKey).addresses
      // 测试
      var userInfo = util.getToken(constant.constant.userAddressKey).addresses
      var address = {}
      var temp = true
      for (var i = 0; i < userInfo.length; i++) {
        if (!util.isEmptyStr(userInfo[i].default_shipping) || userInfo[i].default_shipping) {
          address.name = userInfo[i].firstname + userInfo[i].lastname
          var telephoneStr = userInfo[i].telephone.substring(3, 7)
          address.mobile = userInfo[i].telephone.replace(telephoneStr, '****')
          var addressDetails = ''
          for (var j = 0; j < userInfo[i].street.length; j++) {
            addressDetails = addressDetails + userInfo[i].street[j]
          }
          address.addressDetails = userInfo[i].region.region + userInfo[i].city + addressDetails
          temp = false
        }
      }
      // 没有默认时选择第一项
      if (temp) {
        address.name = userInfo[0].firstname + userInfo[0].lastname
        var telephoneStr = userInfo[0].telephone.substring(3, 7)
        address.mobile = userInfo[0].telephone.replace(telephoneStr, '****')
        var addressDetails = ''
        for (var j = 0; j < userInfo[0].street.length; j++) {
          addressDetails = addressDetails + userInfo[0].street[j]
        }
        address.addressDetails = userInfo[0].region.region + userInfo[0].city + addressDetails
      }
      wx.hideNavigationBarLoading()
      // that.setData({ isShow: true })
      that.setData({ address: address, isShow:true})
    },
})