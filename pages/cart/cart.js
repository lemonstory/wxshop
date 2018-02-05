var app = getApp();
var util = require('../../utils/util.js')
var constant = require('../../utils/constant.js')
Page({
  data: {
    number: 1,
    // checkedAllStatus: false,
    delBtnWidth: 80,
    //cartGoods购物车中的商品列表
    // cartGoods: [{ extension_attributes: { image_url: '../../image/1.png' }, name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', sku: '恩恩恩恩', price: '2000', qty: 4, item_id: 2, checked: true }, { extension_attributes: { image_url: '../../image/1.png' }, name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', sku: '恩恩恩恩', price: '2000', qty: 2, item_id: 1, checked: true }, { extension_attributes: { image_url: '../../image/1.png' }, name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', sku: '恩恩恩恩', price: '2000', qty: 1, item_id: 3, checked: true }],
    cartTotal: {
      "goodsCount": 0,
      "goodsAmount": 0.00,
      // checkedGoodsCount 购物车中全选数量
      "checkedGoodsCount": 0,
      // checkedGoodsAmount 购物车中全选之后的价格
      "checkedGoodsAmount": 0.00
    },

    checkedAllStatus: true,
    /** 是否跳转登录 */
    isJumpToLogin: false,
    /** 选中产品数量 */
    isCheckedNum: 0,
    loadingHidden: true,
    isShow: false,
    price: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    if (util.isEmptyStr(util.getToken(constant.constant.userTokenKey))) {
      console.log('未登录')
      this.setData({ isJumpToLogin: true })
    } else {
      this.setData({ isJumpToLogin: false })
      this.loadingTap()
      console.log('已登录')
      this.getUserCartInfo(util.getToken(constant.constant.userTokenKey))
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // loading
  loadingTap: function () {
    this.setData({
      loadingHidden: false
    });
  },
  /**
   * 获取输入框值
   */
  getInputNum: function (event) {
    var that = this
    var number = event.detail.value
    if (util.isEmptyStr(number) && Number(number) === 0) {
      number = 1
    }
    var price =0
    for (var i = 0; i < that.data.cartGoods.length; i++) {
      if (event.currentTarget.dataset.item_id === that.data.cartGoods[i].item_id) {
        that.data.cartGoods[i].qty = number
      }
      if (that.data.cartGoods[i].checked) {
        price = price + Number(that.data.cartGoods[i].qty) * Number(that.data.cartGoods[i].price)
      }
    }
    that.setData({ cartGoods: that.data.cartGoods,price: price })
  },
  // 购物车数量加减事件
  handleTapcutNumber: function (event) {
    var that = this
    var price = 0
    for (var i = 0; i < that.data.cartGoods.length; i++) {
      if (event.currentTarget.dataset.item_id === that.data.cartGoods[i].item_id) {
        var temp = ((that.data.cartGoods[i].qty - 1 > 1) ? (that.data.cartGoods[i].qty - 1) : 1)
        that.data.cartGoods[i].qty = temp
      }
      if (that.data.cartGoods[i].checked) {
        price = price + Number(that.data.cartGoods[i].qty) * Number(that.data.cartGoods[i].price)
      }
    }
    that.setData({ cartGoods: that.data.cartGoods,price:price })
  },
  handleTapaddNumber: function (event) {
    var that = this
    var price = 0
    for (var i = 0; i < that.data.cartGoods.length; i++) {
      if (event.currentTarget.dataset.item_id === that.data.cartGoods[i].item_id) {
        var temp = that.data.cartGoods[i].qty + 1
        that.data.cartGoods[i].qty = temp
      }
      if (that.data.cartGoods[i].checked) {
        price = price + Number(that.data.cartGoods[i].qty) * Number(that.data.cartGoods[i].price)
      }
    }
    that.setData({ cartGoods: that.data.cartGoods,price:price })
  },
  // 点击商品选中状态事件
  handleTapcheckedItem: function (event) {
    console.log(event)
    // var itemIndex = event.target.dataset.itemIndex;
    var that = this;
    // 编辑状态
    // var tmpCartData = this.data.cartGoods.map(function (element, index, array) {
    //   if (index == itemIndex) {
    //     element.checked = !element.checked;
    //   }
    //   return element;
    // });
    // 判断是否显示下单
    for (var i = 0; i < that.data.cartGoods.length; i++) {
      if (event.currentTarget.dataset.item_id === that.data.cartGoods[i].item_id) {
        that.data.cartGoods[i].checked = !that.data.cartGoods[i].checked
        if (that.data.cartGoods[i].checked) {
          if (that.data.isCheckedNum < that.data.cartGoods.length) {
            that.data.isCheckedNum++
          }
        } else {
          if (that.data.isCheckedNum > 0) {
            that.data.isCheckedNum--
          }
        }
      }
    }
    // 判断是否全选
    if (that.data.isCheckedNum < that.data.cartGoods.length) {
      that.data.checkedAllStatus = false
    } else {
      that.data.checkedAllStatus = true
    }
    // 判断价格
    var price = 0
    for (var j = 0; j < that.data.cartGoods.length; j++) {
      if (that.data.cartGoods[j].checked) {
        price = price + Number(that.data.cartGoods[j].qty) * Number(that.data.cartGoods[j].price)
      }
    }
    that.setData({
      cartGoods: that.data.cartGoods,
      isCheckedNum: that.data.isCheckedNum,
      checkedAllStatus: that.data.checkedAllStatus,
      price: price
    });
  },

  // 点击全选事件
  handleTapcheckedAll: function () {
    var that = this;
    var isCheckNum = 0
    for (var i = 0; i < that.data.cartGoods.length; i++) {
      if (that.data.cartGoods[i].checked) {
        isCheckNum++
      }
    }
    if (isCheckNum === 0) {
      for (var s = 0; s < that.data.cartGoods.length; s++) {
        if (that.data.cartGoods[s].checked === that.data.checkedAllStatus) {
          that.data.cartGoods[s].checked = !that.data.cartGoods[s].checked
        }
      }
      // that.data.checkedAllStatus = false
    } else if (isCheckNum < that.data.cartGoods.length) {
      for (var j = 0; j < that.data.cartGoods.length; j++) {
        if (!that.data.cartGoods[j].checked) {
          that.data.cartGoods[j].checked = !that.data.cartGoods[j].checked
        }
      }
      // that.data.checkedAllStatus = false
    } else {
      for (var z = 0; z < that.data.cartGoods.length; z++) {
        if (that.data.cartGoods[z].checked === that.data.checkedAllStatus) {
          that.data.cartGoods[z].checked = !that.data.cartGoods[z].checked
        }
      }
      // that.data.checkedAllStatus = false
    }
    var isCheckedNum = 0
    var price = 0
    for (var m = 0; m < that.data.cartGoods.length; m++) {
      if (that.data.cartGoods[m].checked) {
        isCheckedNum++
      }
      if (!that.data.checkedAllStatus) {
        price = price + Number(that.data.cartGoods[m].qty) * Number(that.data.cartGoods[m].price)
      }
    }
    that.setData({
      checkedAllStatus: !that.data.checkedAllStatus,
      cartGoods: that.data.cartGoods,
      isCheckedNum: isCheckedNum,
      price: price
    })
  },

  // 点击下单处理事件
  handleTapcheckoutOrder: function () {
    var path = "/pages/shopping/edit-address/edit-address";
    wx.navigateTo({
      url: path
    })
  },

  // 左滑删除触发事件
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },

  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.cartGoods;
      list[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        'cartGoods': list
      });
    }
  },

  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;


      // cartGoods为测试数据列表  TODO
      var list = this.data.cartGoods;
      list[index].txtStyle = txtStyle;
      //更新列表的状态

      this.setData({

        // cartGoods为测试数据列表  TODO
        'cartGoods': list
      });
    }
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },

  //点击删除按钮事件 TODO
  delItem: function (e) {
    //获取列表中要删除项的下标
    var index = e.target.dataset.index;
  },

  /**
    * 点击账号登陆
    */
  handleTapUserLogin: function () {
    var path = "/pages/auth/login";
    wx.navigateTo({
      url: path
    })
  },

  /**
   * 查询购物车信息
   */
  getUserCartInfo: function (token) {
    // 测试token
    token = constant.constant.userToken
    var that = this
    var url = constant.constant.domain + constant.constant.path + '/V1/carts/mine';
    wx.request({
      url: url,
      data: {},
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          // 设置购物车id缓存  + 购物车商品数量
          var quote_id = Number(res.data.id)
          util.setToken(constant.constant.quote_id, quote_id)
          var qty = Number(res.data.items_qty)
          util.setToken(constant.constant.qty, qty)
          var price = 0
          for (var i = 0; i < res.data.items.length; i++) {
            res.data.items[i].checked = true
            price = price + Number(res.data.items[i].qty) * Number(res.data.items[i].price)
          }
          // 获取用户购物车列表
          that.setData({ cartGoods: res.data.items, isCheckedNum: res.data.items.length, price: price})
          // 显示界面
          that.setData({
            loadingHidden: true,
            isShow: true
          });
          // console.log(res.data.items)
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 获取购物车信息错误')
      }
    })
  }
})