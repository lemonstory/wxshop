// pages/usercenter/order/order.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
const Tab = require('../../../zanui-weapp/dist/tab/index');
var constant = require('../../../utils/constant.js')
Page(Object.assign({}, Toast, Tab, {
  data: {
    tab: {
      list: [{ title: "全部", id: '0' },
      { title: "待付款", id: '1' },
      { title: "待发货", id: '2' },
      { title: "已发货", id: '3' },
      { title: "待评价", id: '4' },
      ],
      selectedId: '0',
      scroll: true,
      height: 45,
    },
    //页面的初始数据
    'currentTagId': '',
    'selectedId': '',
    isShow:false,
    orderNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.showNavigationBarLoading()
    this.getUserOrderList()
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

  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    this.setData({
      [`${componentId}.selectedId`]: selectedId,
      selectSecondTagId: selectedId,
      selectedId: selectedId,
      startrelationid: 0,
      isNoMore: false,
      isLoading: true
    });
  },

  /**
   * 查看订单详情
   */
  handleTapOrderDetail:function(){
    var path = "/pages/usercenter/order-detail/order-detail";
    wx.navigateTo({
      url: path
    })
  },

  /**
   * 获取我的订单
   */
  getUserOrderList: function () {
    var that = this
    var token = util.getToken(constant.constant.adminTokenKey)
    // 测试token
    // var token = constant.constant.userToken
    var url = constant.constant.domain + constant.constant.path + '/V1/orders?searchCriteria[filterGroups][0][filters][0][field]=customer_id&searchCriteria[filterGroups][0][filters][0][value]=2&searchCriteria[filterGroups][0][filters][0][conditionType]=eq'; 
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res.data)
          console.log('获取用户订单列表成功')
          that.setData({ orders: res.data.items, orderNum: res.data.items.length})
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 获取用户订单列表错误')
        console.error(res)
      },
      complete: function (res) {
        console.log('complete')
        wx.hideNavigationBarLoading()
        that.setData({ isShow: true })
      }
    })
  }
}))