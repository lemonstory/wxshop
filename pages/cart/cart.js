var app = getApp();
Page({
  data: {
    number:1,
    //cartGoods购物车中的商品列表
    cartGoods: [{ list_pic_url: '../../image/1.png', goods_name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', goods_desc: '恩恩恩恩', retail_price: '2000' }, {list_pic_url: '../../image/1.png', goods_name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', goods_desc: '恩恩恩恩', retail_price: '2000'}],
    cartTotal: {
      "goodsCount": 0,
      "goodsAmount": 0.00,
      "checkedGoodsCount": 0,
      "checkedGoodsAmount": 0.00
    },
    isEditCart: true,
    checkedAllStatus: false,
    editCartList:[]
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
  // 购物车数量加减事件
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

})