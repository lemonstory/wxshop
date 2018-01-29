// pages/cart/cart.js
var app = getApp();
// var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var constant = require('../../utils/constant.js')
Page({
  data: {
    id: 0,
    number: 1,
    // 购物车产品数量
    cartGoodsCount: 0,
    banner: [
      { image: '../../image/1.png' },
      { image: '../../image/1.png' },
      { image: '../../image/1.png' },
      { image: '../../image/1.png' },
      { image: '../../image/1.png' }
    ],
    inputContent: constant.constant.inputContent,
    indicatorDots: constant.constant.indicatorDots,
    autoplay: constant.constant.autoplay,
    interval: constant.constant.interval,
    duration: constant.constant.duration,

    // goods:商品信息
    goods: { name: '御赐金福零食礼盒福零食礼1.1千克', goods_desc: '玫瑰香葡萄干+玫瑰香葡萄干玫瑰香葡萄干+玫瑰香葡萄干+玫瑰香葡萄干', retail_price: '10000' },
    
    // brand 优惠活动
    brand: [{ name: '恩恩讷讷恩额额呢' }, { name: '哈哈哈哈哈哈或或或或' }],
    // 用户评论
    comment: { count: '999', userSrc: '../../image/1.png', nickname: '15735921111', add_time: '2018.01.25  16:45', content: '严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈', pic_list: [{ pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }], desc: '白色外套  2件' },
// relatedGoods: 评论下面的分类
relatedGoods: [
      { cover: '../../image/1.png', favourable: '哈哈', purchase: '额额呢', recommendDesc: '剪辑剪辑军军', recommendPrice: '123' },
      { cover: '../../image/1.png', favourable: '哈哈', purchase: '额额呢', recommendDesc: '剪辑剪辑军军', recommendPrice: '123' },
      { cover: '../../image/1.png', favourable: '哈哈', purchase: '额额呢', recommendDesc: '剪辑剪辑军军', recommendPrice: '123' },
      { cover: '../../image/1.png', favourable: '哈哈', purchase: '额额呢', recommendDesc: '剪辑剪辑军军', recommendPrice: '123' }],
   
 //  attribute 商品参数列表
    attribute: [{ name: 'hahhahha', value: '5555522222222222222222222222222222222222222222222222222222222222' },
    { name: 'hahhahha', value: '5555522222222222222222222222222222222222222222222222222222222222' },
    { name: 'hahhahha', value: '5555522222222222222222222222222222222222222222222222222222222222' }],

 //specificationList 底部弹出层中商品属性规格列表
    specificationList: [{name: '颜色', valueList: [{ value:'黑色'}, { value:'绿色'},]}],
    requestPath: constant.constant.requestPath
  },

onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getGoodsDetails(options.sku)
    console.log(options)
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
  // 点击用户评论
  handleTapUserComment: function () {
    var path = "/pages/comment/comment";
    wx.navigateTo({
      url: path
    })
  },

  handleTapswitchTab: function () {
    this.setData({
      showType: this.data.showType == 1 ? 0 : 1
    });
  },
  // 点击添加到购物车弹出层
  handleTapaddToCart: function () {
    var that = this;
    this.setData({
      isShowBottomPopup:true,
    });
},
// 点击服务弹出层交互
handleTapBottomToast:function(){
  var that = this;
  console.log('1111111111111');
  that.setData({
    isShowBottomToast: true,
  });
},

// 购物车弹出层开关
  toggleBottomPopup() {
    this.setData({
      isShowBottomPopup: !this.data.isShowBottomPopup,
     });
  },

// 服务弹出层开关
toggleBottomToast(){
  this.setData({
    isShowBottomToast: !this.data.isShowBottomToast,
  })
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

  //弹出层中商品属性的选择  TODO
  handleTapclickSkuValue: function (event) {
    var that = this;
    var specNameId = event.currentTarget.dataset.nameId;
    var specValueId = event.currentTarget.dataset.valueId;
    that.setData({
   
     });
},

  // 获取商品详情
  getGoodsDetails: function (sku) {
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/products/' + sku;
    wx.request({
      url: url,
      // data: {},
      header: util.adminRequestHeader(true),
      success: function (res) {
        console.log('🚀 🚀 🚀 打印商品详情数据')
        console.log(res.data)
        var description = util.isNeed(res.data.custom_attributes, 'description')
        var shortDescription = util.isNeed(res.data.custom_attributes, 'short_description')
        console.log(description)
        // var html = new HtmlParser(description).nodes
        // console.log(html)
        that.setData({ 'description': description })
        that.setData({ 'shortDescription': shortDescription })
        that.setData(res.data)
      }
    })
  }
})






