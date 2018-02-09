// pages/usercenter/order-detail/order-detail.js
var util = require('../../../utils/util.js')
var constant = require('../../../utils/constant.js')

const Toast = require('../../../zanui-weapp/dist/toast/index');
const { Dialog, extend } = require('../../../zanui-weapp/dist/index');

Page(Object.assign({}, Toast, Dialog, {

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading()
    this.getOrderDetails(options.id)
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
   * 获取订单详情
   */
  getOrderDetails: function (id) {
    var that = this
    var token = util.getToken(constant.constant.adminTokenKey)
    var url = constant.constant.domain + constant.constant.path + '/V1/orders/' + id;
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
          var tempOrder = res.data.extension_attributes.shipping_assignments[0]
          // 设置商品信息
          var goods = []
          for (var i = 0; i < tempOrder.items.length; i++) {
            var good = {}
            if (tempOrder.items[i].product_type === 'virtual') {
              good.img_url = tempOrder.items[i].extension_attributes.image_url
              good.name = tempOrder.items[i].parent_item.name
              good.price = tempOrder.items[i].parent_item.price
              good.qty = tempOrder.items[i].parent_item.qty_ordered
              good.item_id = tempOrder.items[i].parent_item.item_id
              goods.push(good)
            }
            if (tempOrder.items[i].product_type === 'simple') {
              good.img_url = tempOrder.items[i].extension_attributes.image_url
              good.name = tempOrder.items[i].parent_item.name
              good.price = tempOrder.items[i].parent_item.price
              good.qty = tempOrder.items[i].parent_item.qty_ordered
              good.item_id = tempOrder.items[i].parent_item.item_id
              goods.push(good)
            }
          }
          // 设置地址信息
          var user_address = {}
          user_address.name = '';
          if (!util.isEmptyObject(tempOrder.shipping.address)) {
            user_address.name = tempOrder.shipping.address.firstname + tempOrder.shipping.address.lastname
            user_address.address = tempOrder.shipping.address.region + tempOrder.shipping.address.city + tempOrder.shipping.address.street[0] + tempOrder.shipping.address.street[1]
            user_address.telephone = tempOrder.shipping.address.telephone
            res.data.user_address = user_address
          }

          res.data.goods = goods
          that.setData({ order: res.data})
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 获取用户订单列表错误')
        console.error(res)
      },
      complete: function (res) {
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
          wx.navigateBack({
            delta:1
          })
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