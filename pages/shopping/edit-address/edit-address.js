// pages/shopping/new-address/new-address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_default:'0',
    isAddressPickShow: false,
    province: [{ name: '北京' }, { name: '上海' },{name: '天津' },],
    city: [{ name: '武汉' }, { name: '河南' }, {name: '郑州' },],
    district: [{ name: '哈哈' }, { name: '哈哈' }, { name: '哈哈' },],
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
 // 默认地址的选择状态
  handleTapIsDefault:function(){
    var that=this;
   that.setData({
     is_default:!that.data.is_default,
      })
  },
// 点击保存按钮事件
handleTapSaveAddress:function(){
  var path = "/pages/shopping/fill-order/fill-order";
  wx.navigateTo({
    url: path
  })
},
/**
* 地址选择框的隐藏和显示
*/
hideOrShowAddressPicker: function () {
  var that = this;
  var isShow = that.data.isAddressPickShow;
  console.log(isShow);
  if (isShow) {
    isShow = false;
  } else {
    isShow = true;
    that.setData({
});
  }
that.setData({
    isAddressPickShow: isShow,
  })
},

/**
 *  监听地址点击事件
 */
handelAddressTap: function (e) {
  var that = this;
  that.hideOrShowAddressPicker();
},

/**
   * 处理地址点击取消
   */
handelAddressDis: function (e) {
  var that = this;
  that.hideOrShowAddressPicker();
},
})