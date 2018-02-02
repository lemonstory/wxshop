//index.js
//获取应用实例
const app = getApp();
const Toast = require('../../zanui-weapp/dist/toast/index');
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')

Page(Object.assign({}, Toast, {
  data: {
    banner: [
      { image: '../../image/1.png' },
      { image: '../../image/1.png' },
      { image: '../../image/1.png' }
    ],
    recommendImg: "../../image/1.png",
    sectionTitle: [{ title: '人气推荐' }, { title: '新品推荐' }],
    constant: app.constant,
    inputContent: constant.constant.inputContent,
    indicatorDots: constant.constant.indicatorDots,
    autoplay: constant.constant.autoplay,
    interval: constant.constant.interval,
    duration: constant.constant.duration,
    requestPath: constant.constant.requestPath,
    // 人气推荐参数
    params: {
      pageSize: constant.constant.pageSize,
      currentPage: constant.constant.currentPage
    },
    // 新品推荐参数
    newParams: {
      pageSize: constant.constant.pageSize,
      currentPage: constant.constant.currentPage,
      startTime: new Date
    },
    adminToken: ''
  },

  onLoad: function () {
    if (util.getAdminToken() === '') {
      this.getAdminToken()
    } else {
      this.getHomePopData()
      this.getHomeNewData()
    }
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

  // 点击查看更多按钮
  handleTapMore: function () {
    var path = "/pages/categoryList/categoryList";
    wx.navigateTo({
      url: path
    })

  },
  // 点击商品详情
  handleTapGoodsDetail: function (event) {
    var path = "/pages/goodsDetail/goodsDetail?sku=" + event.currentTarget.dataset.sku;
    wx.navigateTo({
      url: path
    })
  },

  //处理用户搜索事件
  handleTapSearch: function () {
    var path = "/pages/search/search";
    wx.navigateTo({
      url: path
    })
},

  /**
   * 获取adminToken
   */
  getAdminToken: function () {
    console.log("🚀 🚀 🚀 getUserToken run");
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/integration/admin/token';
    wx.request({
      url: url,
      data: {
        username: constant.constant.username,
        password: constant.constant.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        that.data.adminToken = res.data
        that.getHomePopData()
        that.getHomeNewData()
        if (!util.isEmptyStr(res.data)) {
          util.setAdminToken(res.data)
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 首页调取adminToken错误')
      }
    })
  },
  /**
     * 获取首页人气推荐数据
     */
  getHomePopData: function () {

    // console.log("🚀 🚀 🚀 getHomePopData run");
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/products?searchCriteria[filterGroups][0][filters][0][field]=is_featured&searchCriteria[filterGroups][0][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[sortOrders][0][field]=updated_at&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=' + that.data.params.pageSize + '&searchCriteria[currentPage]=' + that.data.params.currentPage;
    wx.request({
      url: url,
      data: {},
      header: util.adminRequestHeader(that.data.adminToken),
      success: function (res) {
        for (var i = 0; i < res.data.items.length; i++) {
          var img = util.isNeed(res.data.items[i].custom_attributes, 'image')
          res.data.items[i].img = that.data.requestPath + img
          if (res.data.items[i].type_id === 'configurable') {
            that.getConfigurableProChlid(res.data.items[i].sku, res.data.items, 'pop')
          }
        }
        that.setData(res.data)
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 首页调取人气推荐错误')
      }
    })
  },
  /**
     * 获取首页新品推荐数据
     */
  getHomeNewData: function () {

    // console.log("🚀 🚀 🚀 getHomeNewData run");
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/products?searchCriteria[filterGroups][0][filters][0][field]=news_from_date&searchCriteria[filterGroups][0][filters][0][value]=' + that.data.newParams.startTime + '&searchCriteria[filterGroups][0][filters][0][conditionType]=lteq&searchCriteria[filterGroups][1][filters][0][field]=news_to_date&searchCriteria[filterGroups][1][filters][0][value]=' + that.data.newParams.startTime + '&searchCriteria[filterGroups][1][filters][0][conditionType]=gteq&searchCriteria[sortOrders][0][field]=updated_at&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=' + that.data.newParams.pageSize + '&searchCriteria[currentPage]=' + that.data.newParams.currentPage;
    wx.request({
      url: url,
      // data: {},
      header: util.adminRequestHeader(that.data.adminToken),
      success: function (res) {
        for (var i = 0; i < res.data.items.length; i++) {
          var img = util.isNeed(res.data.items[i].custom_attributes, 'image')
          res.data.items[i].img = that.data.requestPath + img
          if (res.data.items[i].type_id === 'configurable') {
            that.getConfigurableProChlid(res.data.items[i].sku, res.data.items, 'new')
          }
        }
        that.setData({ newData: res.data.items })
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 首页调取新品推荐错误')
      }
    })
  },

  /**
   * 获取可配置商品children
   */
  getConfigurableProChlid: function (sku, arr, sign) {
    var that = this
    var url = constant.constant.domain + constant.constant.path + '/V1/configurable-products/' + sku + '/children';
    wx.request({
      url: url,
      data: {},
      header: util.adminRequestHeader(),
      success: function (res) {
        // 将子产品的最低价格设置为当前可配置商品的价格
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].sku === sku) {
            arr[i].price = util.isMin(res.data)
            var shortDescription = util.isNeed(arr[i].custom_attributes, 'short_description')
            arr[i].shortDescription = shortDescription
          }
        }
        if (sign === 'pop') {
          that.setData({ items: arr })
        } else if (sign === 'new') {
          that.setData({ newData: arr })
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 首页获取可配置商品children错误')
      }
    })
  }
}));