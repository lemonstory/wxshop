//index.js
//获取应用实例
const app = getApp();
const Toast = require('../../zanui-weapp/dist/toast/index');
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')
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
    requestPath: 'http://dev.magento.com/media/catalog/product/cache/f073062f50e48eb0f0998593e568d857',
    // 人气推荐参数
    params: {
        pageSize: 10,
        currentPage: 1
    },
    // 新品推荐参数
    newParams: {
        pageSize: 10,
        currentPage: 1,
        startTime: new Date
    }
  },
  onLoad: function () {
    this.getHomePopData()
    this.getHomeNewData()
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
  /**
     * 获取首页人气推荐数据
     */
  getHomePopData: function () {
    console.log("🚀 🚀 🚀 getHomePopData run");
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/products?searchCriteria[filterGroups][0][filters][0][field]=is_featured&searchCriteria[filterGroups][0][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[sortOrders][0][field]=updated_at&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=' + that.data.params.pageSize + '&searchCriteria[currentPage]=' + that.data.params.currentPage;
    wx.request({
      url: url,
      // data: {},
      header: util.adminRequestHeader(true),
      success: function (res) {
        // console.log('打印返回数据')
        // console.log(res.data)
        for (var i = 0; i < res.data.items.length; i++) {
          res.data.items[i].custom_attributes[3].value = that.data.requestPath + res.data.items[i].custom_attributes[3].value
        }
        that.setData(res.data)
      }
    })
  },
  /**
     * 获取首页新品推荐数据
     */
  getHomeNewData: function () {
    console.log("🚀 🚀 🚀 getHomeNewData run");
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/products?searchCriteria[filterGroups][0][filters][0][field]=news_from_date&searchCriteria[filterGroups][0][filters][0][value]=' + that.data.newParams.startTime + '&searchCriteria[filterGroups][0][filters][0][conditionType]=lteq&searchCriteria[filterGroups][1][filters][0][field]=news_to_date&searchCriteria[filterGroups][1][filters][0][value]=' + that.data.newParams.startTime + '&searchCriteria[filterGroups][1][filters][0][conditionType]=gteq&searchCriteria[sortOrders][0][field]=updated_at&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=' + that.data.newParams.pageSize + '&searchCriteria[currentPage]=' + that.data.newParams.currentPage;
    wx.request({
      url: url,
      // data: {},
      header: util.adminRequestHeader(true),
      success: function (res) {
        console.log('打印返回数据')
        console.log(res.data)
        for (var i = 0; i < res.data.items.length; i++) {
          res.data.items[i].custom_attributes[3].value = that.data.requestPath + res.data.items[i].custom_attributes[3].value
        }
        that.setData({'newData': res.data.items})
      }
    })
  }

}));
