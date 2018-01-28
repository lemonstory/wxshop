//index.js
//获取应用实例
const app = getApp();
const Toast = require('../../zanui-weapp/dist/toast/index');
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')
Page(Object.assign({}, Toast, {
  data: {
    banner: [
    {image: '../../image/1.png' },
    { image: '../../image/1.png' },
    { image: '../../image/1.png' }
    ],
    recommendImg: "../../image/1.png",
    sectionTitle: [{ title: '人气推荐' }, { title: '新品推荐' }],
  // items: [
  //     { id: 53, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰" }, { value: "顺丰打赏" }, {value: "顺丰" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }, { id: 47, name: "白色羽绒服", custom_attributes: [{ value: "白色羽绒服" }, { value: "白色羽绒服" }, { value: "白色羽绒服" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 50 }, { id: 49, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏的发顺丰" }, { value: "顺丰" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }, { id: 50, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏的发顺丰" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }, { id: 34, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏的发顺丰" }, { value: "" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }
  //   ],
  //   newData: [{ id: 53, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏的发顺丰" }, { value: "顺丰" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }, { id: 47, name: "白色羽绒服", custom_attributes: [{ value: "白色羽绒服" }, { value: "白色羽绒服" }, { value: "白色羽绒服" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 50 }, { id: 49, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏的发顺丰" }, { value: "" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }, { id: 50, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }, { id: 34, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }],
    constant: app.constant,
    inputContent: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    requestPath: constant.constant.requestPath,
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

  // 点击查看更多按钮
  handleTapMore:function(){
   var path ="/pages/categoryList/categoryList";
    wx.navigateTo({
      url: path
    })

  },
  // 点击商品详情
  handleTapGoodsDetail:function(event){
    console.log('打印当前id')
    console.log(event)
    var path = "/pages/goodsDetail/goodsDetail?sku=" + event.currentTarget.dataset.sku;
    wx.navigateTo({
      url: path
    })
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
        console.log('打印  getHomePopData  返回数据')
        console.log(res.data)
        for (var i = 0; i < res.data.items.length; i++) {
          var img = util.isNeed(res.data.items[i].custom_attributes, 'image')
          res.data.items[i].img = that.data.requestPath + img
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
    console.log(util.adminRequestHeader(true))
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/products?searchCriteria[filterGroups][0][filters][0][field]=news_from_date&searchCriteria[filterGroups][0][filters][0][value]=' + that.data.newParams.startTime + '&searchCriteria[filterGroups][0][filters][0][conditionType]=lteq&searchCriteria[filterGroups][1][filters][0][field]=news_to_date&searchCriteria[filterGroups][1][filters][0][value]=' + that.data.newParams.startTime + '&searchCriteria[filterGroups][1][filters][0][conditionType]=gteq&searchCriteria[sortOrders][0][field]=updated_at&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=' + that.data.newParams.pageSize + '&searchCriteria[currentPage]=' + that.data.newParams.currentPage;
    wx.request({
      url: url,
      // data: {},
      header: util.adminRequestHeader(true),
      success: function (res) {
        console.log('打印  getHomeNewData  返回数据')
        console.log(res.data)
        for (var i = 0; i < res.data.items.length; i++) {
          var img = util.isNeed(res.data.items[i].custom_attributes, 'image')
          res.data.items[i].img = that.data.requestPath + img
        }
        that.setData({ 'newData': res.data.items })
      }
    })
  }

}));