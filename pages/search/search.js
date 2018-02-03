// pages/search/search.js
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')
Page({
/**
   * 页面的初始数据
   */
  data: {
    pageSize: constant.constant.pageSize,
    currentPage: constant.constant.currentPage,
    //是否还有更多数据
    'isNoMore': false,
    //是否正在加载中
    'isLoading': false
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
   * 获取搜索内容
   */
  getSearchContent: function (event) {
    this.setData({ searchContent: event.detail.value });
    setTimeout(() => {
      this.searchProduct()
    }, 500);
  },
  /**
   * 搜索商品
   */
  searchProduct: function () {
    // console.log(event)
    var that = this 
    var url = constant.constant.domain + constant.constant.path + '/V1/products?searchCriteria[filterGroups][0][filters][0][field]=name&searchCriteria[filterGroups][0][filters][0][value]=%' + that.data.searchContent + '%&searchCriteria[filterGroups][0][filters][0][conditionType]=like&searchCriteria[sortOrders][0][field]=updated_at&searchCriteria[sortOrders][0][direction]=DESC&searchCriteria[pageSize]=' + that.data.pageSize + '&searchCriteria[currentPage]=' + that.data.currentPage;
    wx.request({
      url: encodeURI(url),
      data: {},
      header: util.adminRequestHeader(),
      success: function (res) {
        console.log('打印返回数据')
        console.log(res.data)
        that.setData(res.data)
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 搜索商品错误')
        console.error(res)
      }
    })
  }
})