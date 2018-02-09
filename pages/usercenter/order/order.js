// pages/usercenter/order/order.js
const app = getApp();
const Toast = require('../../../zanui-weapp/dist/toast/index');
var util = require('../../../utils/util.js')
const Tab = require('../../../zanui-weapp/dist/tab/index');
var constant = require('../../../utils/constant.js')
const { Dialog, extend } = require('../../../zanui-weapp/dist/index');
Page(Object.assign({}, Toast, Tab, Dialog,{

  data: {
    tab: {
      list: [{ title: "全部", id: 'all' },
        { title: "待付款", id: 'pending_payment' },
        { title: "待发货", id: 'pending_send_courier' },
        { title: "已发货", id: 'pending_receive_courier' },
        { title: "待评价", id: 'pending_review' },
      ],
      selectedId: 'all',
      scroll: true,
      height: 45,
    },
    //页面的初始数据
    'currentTagId': '',
    isShow: false,
    orderNum: 0,

    //TODO:测试
    customer_id: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    
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

    var that = this;
    that.getUserOrderList(that.data.tab.selectedId,true);    
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
      startrelationid: 0,
      isNoMore: false,
      isLoading: true
    });

    this.getUserOrderList(selectedId,true);
  },

  /**
   * 查看订单详情
   */
  handleTapOrderDetail: function (event) {
    // console.log(event)
    var path = "/pages/usercenter/order-detail/order-detail?id=" + event.currentTarget.dataset.entity_id;
    wx.navigateTo({
      url: path
    })
  },

  /**
   * 获取我的订单
   */
  getUserOrderList: function (selectedId,isClear=false) {

    var that = this
    wx.showNavigationBarLoading();
    if (isClear) {
      that.setData(
        {
          orders: [],
          orderNum: 0,
          isShow: false
        });
    }
    var token = util.getToken(constant.constant.adminTokenKey)
    
    //TODO:测试
    var customer_id = util.getToken(constant.constant.userInfoKey).id;

    var defaultSearchCriteria = 'searchCriteria[filterGroups][0][filters][0][field]=customer_id&searchCriteria[filterGroups][0][filters][0][value]=' + customer_id + '&searchCriteria[filterGroups][0][filters][0][conditionType]=eq';
    var searchCriteria = '';

    if (selectedId == 'all') {

      searchCriteria = defaultSearchCriteria;
    } else {

      searchCriteria = defaultSearchCriteria + '&searchCriteria[filterGroups][1][filters][0][field]=status&searchCriteria[filterGroups][1][filters][0][value]=' + selectedId+'&searchCriteria[filterGroups][1][filters][0][conditionType]=eq';
    }

    console.log(searchCriteria);

    // var customer_id = util.getToken(constant.constant.userInfoKey).id
    var url = constant.constant.domain + constant.constant.path + '/V1/orders?' + searchCriteria;
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          var orderList = res.data.items
          for (var i = 0; i < orderList.length; i++) {
            // 设置订单显示图片
            var imgArr = []
            var items = orderList[i].extension_attributes.shipping_assignments[0].items
            var order_simple_name = ''
            for (var j = 0; j < items.length; j++) {
              if (items[j].product_type === 'virtual') {
                imgArr.push(items[j].extension_attributes.image_url)
              }
              if (items[j].product_type === 'simple') {
                imgArr.push(items[j].extension_attributes.image_url)
              }
            }
            // 添加商品名称  TODO
            for (var k = 0; k < orderList[i].items.length; k++) {
              if (orderList[i].items[k].product_type === 'simple') {
                orderList[i].order_simple_name = orderList[i].items[k].parent_item.name
              }
              if (orderList[i].items[k].product_type === 'virtual') {
                orderList[i].order_simple_name = orderList[i].items[k].parent_item.name
              }
            }
            orderList[i].imgArr = imgArr
          }
          that.setData({ orders: orderList, orderNum: orderList.length })
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 获取用户订单列表错误')
        console.error(res)
      },
      complete: function (res) {
        // console.log('complete')
        wx.hideNavigationBarLoading()
        that.setData({ isShow: true })
      }
    })
  },


  /**
   * 
   * 取消订单
   */
  handleTapOrderCanceled: function (event) {

    console.log(event.currentTarget.dataset);
    var that = this;
    this.showZanDialog({
      content: '是否取消此订单?',
      showCancel: true,
      cancelText: '否',
      showConfirm: true,
      confirmColor: '#ab2b2b',
      confirmText: '是',
    }).then(() => {
      wx.showNavigationBarLoading();
      var url = constant.constant.domain + constant.constant.path + '/V1/orders';

      //TODO 测试token
      var token = util.getToken(constant.constant.adminTokenKey)

      wx.request({
        url: url,
        data: {
          "entity": {
            "entity_id": event.currentTarget.dataset.entity_id,           //订单id
            "status": "canceled",                                         //订单状态(见顶部 订单状态 说明)
            "increment_id": event.currentTarget.dataset.increment_id      //订单编号
          }
        },
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },

        success: function (res) {
          that.showZanToast('订单已取消');
          that.getUserOrderList(that.data.tab.selectedId);
        },

        fail: function (res) {
          console.error(res)
        },

        complete: function (res) {
          wx.hideNavigationBarLoading()
        }
      })
    }).catch(() => {
      //console.log('=== dialog ===', 'type: cancel');
    });
  }




}))