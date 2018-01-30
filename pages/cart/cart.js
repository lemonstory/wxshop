var app = getApp();
Page({
  data: {
    number: 1,
    checkedAllStatus: false,
    //cartGoods购物车中的商品列表
    cartGoods: [{ list_pic_url: '../../image/1.png', goods_name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', goods_desc: '恩恩恩恩', retail_price: '2000' }, { list_pic_url: '../../image/1.png', goods_name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', goods_desc: '恩恩恩恩', retail_price: '2000' }],
    cartTotal: {
      "goodsCount": 0,
      "goodsAmount": 0.00,
      // checkedGoodsCount 购物车中全选数量
      "checkedGoodsCount": 0,
      // checkedGoodsAmount 购物车中全选之后的价格
      "checkedGoodsAmount": 0.00
    },

    checkedAllStatus: false,

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // 购物车数量加减事件 TODO
  handleTapcutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  handleTapaddNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  },


  // 点击商品选中状态事件
  handleTapcheckedItem: function (event) {
    var itemIndex = event.target.dataset.itemIndex;
    var that = this;
    //编辑状态
    var tmpCartData = this.data.cartGoods.map(function (element, index, array) {
      if (index == itemIndex) {
        element.checked = !element.checked;
      }
      return element;
    });
    that.setData({
      cartGoods: tmpCartData
    });
  },

  // 点击全选事件
  handleTapcheckedAll: function () {
    var that = this;
    that.setData({
      checkedAllStatus: !this.data.checkedAllStatus,
    })
  },

// 点击下单处理事件
  handleTapcheckoutOrder: function () {
 var path = "/pages/shopping/new-address/new-address";
    wx.navigateTo({
      url: path
    })
 }
})