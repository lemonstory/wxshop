//index.js
//获取应用实例
const app = getApp();
const Toast = require('../../zanui-weapp/dist/toast/index');
var util = require('../../utils/util.js')
Page(Object.assign({}, Toast, {
  data: {
    banner: [{ image: '../../image/1.png' },
    { image: '../../image/1.png' },
    { image: '../../image/1.png' }
    ],
    recommendImg: "../../image/1.png",
    sectionTitle:[{title:'人气推荐'}],
    recommend:[
      { id: '0', favourable: '今日特价', purchase: '加价购', title: '5333', cover: "../../image/1.png", recommendDesc: "严选礼品卡1000元面值", recommendPrice:"￥1000"},
      { id: '1', favourable: '限时', purchase: '加价购', title: '5333', cover: "../../image/1.png", recommendDesc: "严选礼品卡1", recommendPrice: "￥100" },
      { id: '2', favourable: '今日特价', purchase: '加价购', title: '5333', cover: "../../image/1.png", recommendDesc: "严选礼品卡1000元面值", recommendPrice: "￥1000" },
      { id: '3', favourable: '优惠', purchase: '加价购', title: '5333', cover: "../../image/1.png", recommendDesc: "严选礼品卡1000元面值", recommendPrice: "￥1000" },
    ], 
    
    constant: app.constant,
    inputContent: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  onLoad: function () {
  },
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




  //处理用户搜索事件
  bindSearch: function () {
    var path = "/pages/search/search";
    wx.navigateTo({
      url: path
    })

  },


}));
