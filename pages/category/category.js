// pages/category/category.js
//  navList:左侧导航
// currentCategory：选中左侧导航栏对应的右边整体
// subCategoryList：右侧分类下面对应的小图及文字
var util = require('../../utils/util.js');
Page({
  data: {
    navList: [{ id: 0, name: '居家' },
    { id: 1, name: '餐厨' },
    { id: 2, name: '配件' },
    { id: 3, name: '服装' },
    { id: 4, name: '电器' }],
    currentCategory: { id: 0, wap_banner_url: "../../image/1.png", name: "衣服分类", subCategoryList: [{ wap_banner_url: "../../image/1.png", name: '哈哈哈' }, { wap_banner_url: "../../image/1.png", name: '哈哈哈' }, { wap_banner_url: "../../image/1.png", name: '哈哈哈' }, { wap_banner_url: "../../image/1.png", name: '哈哈哈' }] },
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  },
  onLoad: function (options) {

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

  // 点击处理左侧导航选中事件 TODO
  handleTapSelected: function (event) {
    var that = this;
    var that = this;
    var id = event.currentTarget.dataset.id;
    console.log(id);
  }
})