// pages/person/person.js
const app = getApp();
const Toast = require('../../zanui-weapp/dist/toast/index');
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')
Page(Object.assign({}, Toast, {

  /**
   * 页面的初始数据
   */
data: {
    tab: {
      list: [{title:"编辑推荐"},
      {title:"24小时热销"},
      { title: "人气周榜" },
      { title: "热销总榜" },
      { title: "24小时热销" },
      { title: "24小时热销" },
    ],
      selectedId:'',
      scroll: true,
      height: 45,

    },

    items: [
      { id: 53, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰" }, { value: "顺丰打赏" }, { value: "顺丰" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }, { id: 47, name: "白色羽绒服", custom_attributes: [{ value: "白色羽绒服" }, { value: "白色羽绒服" }, { value: "白色" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 50 }, { id: 49, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏" }, { value: "" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }, { id: 50, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏的发" }, { value: "顺丰" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }, { id: 34, name: "顺丰打赏的发顺丰", custom_attributes: [{ value: "顺丰打赏的发顺丰" }, { value: "顺丰打赏的发顺丰" }, { value: "顺丰" }, { value: "https://gd2.alicdn.com/imgextra/i4/403519390/TB2S6_2lAfb_uJjSsrbXXb6bVXa_!!403519390.jpg" }], price: 10 }
    ],
    
    //页面的初始数据
    'currentTagId': '',
    'selectedId': '',
    constant: app.constant,
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
    },
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
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    this.setData({
      [`${componentId}.selectedId`]: selectedId,
      selectSecondTagId: selectedId,
      selectedId: selectedId,
     
    });

  },

}))