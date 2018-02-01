var app = getApp();
var util = require('../../utils/util.js');
var constant = require('../../utils/constant.js')
Page({
  data: {
    // 用户评论
    comment: [{ count: '999', userSrc: '../../image/1.png', nickname: '15735921111', add_time: '2018.01.25  16:45', content: '严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈', pic_list: [{ pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }], desc: '白色外套  2件', replyContent:'严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈'},
      { count: '999', userSrc: '../../image/1.png', nickname: '15735921111', add_time: '2018.01.25  16:45', content: '严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈', pic_list: [{ pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }], desc: '白色外套  2件', replyContent: '严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈' }
    ],
    pageSize: constant.constant.pageSize,
    currentPage: constant.constant.currentPage
},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getProductComment(options.sku)
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
  /**
   * 获取评价
   */
  getProductComment: function (sku) {
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/gmart/products/' + sku + '/reviews/' + that.data.currentPage + '/' + that.data.pageSize;
    wx.request({
      url: url,
      data: {},
      header: util.adminRequestHeader(),
      success: function (res) {
        console.log('🚀 🚀 🚀 打印商品评价数据')
        console.log(res.data)
        that.setData({ comment: res.data})
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 获取商品评价错误')
      }
    })
  },
  handleTapswitchTab: function () {
    this.setData({
      showType: this.data.showType == 1 ? 0 :1
    });
},
  onReachBottom: function(){
}
})