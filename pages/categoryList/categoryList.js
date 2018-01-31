// pages/person/person.js
const app = getApp();
const Toast = require('../../zanui-weapp/dist/toast/index');
var util = require('../../utils/util.js')
const Tab = require('../../zanui-weapp/dist/tab/index');
var constant = require('../../utils/constant.js')
Page(Object.assign({}, Toast, Tab,{

  /**
   * 页面的初始数据
   */
data: {
    tab: {
      list: [{title:"编辑推荐",id:'0'},
        { title: "24小时热销", id: '1'},
        { title: "人气周榜" ,id: '2' },
        { title: "热销总榜", id: '3'},
        { title: "24小时热销", id: '4'},
        { title: "24小时热销", id: '5'},
    ],
      selectedId:'0',
      scroll: true,
      height: 45,
    },
    //页面的初始数据
    'currentTagId': '',
    'selectedId': '',
    constant: app.constant,
    requestPath: constant.constant.requestPath,
    // 人气推荐参数
    params: {
      // pageSize: constant.constant.pageSize,
      // currentPage: constant.constant.currentPage
      pageSize: 6,
      currentPage: 1
    },
    //是否还有更多数据
    'isNoMore': false,
    //是否正在加载中
    'isLoading': false,
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomePopData()
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
    // console.log('页面上拉触底事件的处理函数')
    if (!this.data.isNoMore) {
      this.setData({ isLoading: true})
      this.data.params.currentPage = this.data.params.currentPage + 1,
      setTimeout(() => {
        this.getDataMore(this.data.params.currentPage, this.data.params.pageSize);
      }, 500);
    } else {
      this.data.isLoading = false
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 获取更多数据
   */
  getDataMore: function (currentPage, pageSize) {
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/products?searchCriteria[filterGroups][0][filters][0][field]=is_featured&searchCriteria[filterGroups][0][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[sortOrders][0][field]=updated_at&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=' + pageSize + '&searchCriteria[currentPage]=' + currentPage;
    if (!that.data.isNoMore) {
      wx.request({
        url: url,
        data: {},
        header: util.adminRequestHeader(),
        success: function (res) {
          wx.hideLoading();
          var length = res.data.items.length;
          if (length > 0) {
            // 加入数据
            for (var i = 0; i < res.data.items.length; i++) {
              var img = util.isNeed(res.data.items[i].custom_attributes, 'image')
              res.data.items[i].img = that.data.requestPath + img
            }
            var itemsTemp = that.data.items;
            Array.prototype.push.apply(itemsTemp, res.data.items);
            that.data.items = itemsTemp
            that.setData({
              'items': that.data.items
            });
            if (that.data.items.length == that.data.total_count) {
              that.setData({
                'isNoMore': true,
                'isLoading': false
              })
            }
          }
          else {
            that.setData({
              'isNoMore': true,
              'isLoading': false,
            });
          }
        },
        fail: function (res) {
          console.error('🚀 🚀 🚀 获取更多数据错误')
        }
      })
    }
  },
  /**
      * 获取人气推荐数据
      */
  getHomePopData: function () {
    console.log("🚀 🚀 🚀 getHomePopData run");
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/products?searchCriteria[filterGroups][0][filters][0][field]=is_featured&searchCriteria[filterGroups][0][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[sortOrders][0][field]=updated_at&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=' + that.data.params.pageSize + '&searchCriteria[currentPage]=' + that.data.params.currentPage;
    wx.request({
      url: url,
      // data: {},
      header: util.adminRequestHeader(),
      success: function (res) {
        for (var i = 0; i < res.data.items.length; i++) {
          var img = util.isNeed(res.data.items[i].custom_attributes, 'image')
          res.data.items[i].img = that.data.requestPath + img
          if (res.data.items[i].type_id === 'configurable') {
            that.getConfigurableProChlid(res.data.items[i].sku, res.data.items)
          }
        }
        that.setData(res.data)
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 列表获取人气推荐错误')
      }
    })
  },
  /**
     * 获取可配置商品children
     */
  getConfigurableProChlid: function (sku, arr) {
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
        that.setData({ items: arr })
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 列表获取可配置商品children错误')
      }
    })
  },
  // 点击商品详情
  handleTapGoodsDetail: function (event) {
    var path = "/pages/goodsDetail/goodsDetail?sku=" + event.currentTarget.dataset.sku;
    wx.navigateTo({
      url: path
    })
  },

  
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    this.setData({
      [`${componentId}.selectedId`]: selectedId,
      selectSecondTagId: selectedId,
      selectedId: selectedId,
      tagalbumlist: [],
      startrelationid: 0,
      isNoMore: false,
      isLoading: true
    });},

}))