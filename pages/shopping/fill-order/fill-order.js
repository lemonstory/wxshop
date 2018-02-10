// pages/shopping/fill-order/fill-order.js
var util = require('../../../utils/util.js');
var constant = require('../../../utils/constant.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // isSelect:判断是否同意协议
        isSelect:1,
        //不同意协议时的状态
        unSelected: '/static/images/unselect.png',
        //同意协议时的状态
        selected: '/static/images/select.png',
        cartGoods: [{ list_pic_url: '/image/1.png', goods_name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', goods_desc: '恩恩恩恩', retail_price: '2000' }, { list_pic_url: '/image/1.png', goods_name: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', goods_desc: '恩恩恩恩', retail_price: '2000' }],
        isShow:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      //将上一页的数据在显示在当前页面
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];  //上一个页面
      var prevPageData = prevPage.data.cartGoods;
      var price = prevPage.data.price;
      console.log(prevPageData)
      that.setData({ cartGoods: prevPageData, price: price})
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
      var userInfo = util.getToken(constant.constant.userInfoKey).addresses
      // 测试
      // var userInfo = util.getToken(constant.constant.userAddressKey).addresses
      if (userInfo.length === 0) {
        var path = "/pages/shopping/edit-address/edit-address?id=0";
        wx.navigateTo({
          url: path
        })
      } else {
        wx.showNavigationBarLoading()
        this.fillUserOrder()
        // console.log('已登录')
      }
      // this.getUserCartInfo()
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

    // 点击选择地址事件：
    handleTapSelectAddress: function () {
        var path = "/pages/shopping/address-manager/address-manager";
        wx.navigateTo({
            url: path
        })
    },

    // 点击是否同意协议事件
    handleTapIsSelected: function () {
        var that = this;
        that.setData({
            isSelect: !that.data.isSelect
        })
    },

    /**
     * 填写用户订单信息
     */
    fillUserOrder: function () {
      var that = this
      var userInfo = util.getToken(constant.constant.userInfoKey).addresses
      // 测试
      // var userInfo = util.getToken(constant.constant.userAddressKey).addresses
      var address = {}
      var temp = true
      for (var i = 0; i < userInfo.length; i++) {
        if (!util.isEmptyStr(userInfo[i].default_shipping) || userInfo[i].default_shipping) {
          address.name = userInfo[i].firstname + userInfo[i].lastname
          var telephoneStr = userInfo[i].telephone.substring(3, 7)
          address.mobile = userInfo[i].telephone.replace(telephoneStr, '****')
          var addressDetails = ''
          for (var j = 0; j < userInfo[i].street.length; j++) {
            addressDetails = addressDetails + userInfo[i].street[j]
          }
          address.addressDetails = userInfo[i].region.region + userInfo[i].city + addressDetails
          address.id = userInfo[i].id
          temp = false
        }
      }
      // 没有默认时选择第一项
      if (temp) {
        address.name = userInfo[0].firstname + userInfo[0].lastname
        var telephoneStr = userInfo[0].telephone.substring(3, 7)
        address.mobile = userInfo[0].telephone.replace(telephoneStr, '****')
        var addressDetails = ''
        for (var j = 0; j < userInfo[0].street.length; j++) {
          addressDetails = addressDetails + userInfo[0].street[j]
        }
        address.addressDetails = userInfo[0].region.region + userInfo[0].city + addressDetails
        address.id = userInfo[0].id
      }
      wx.hideNavigationBarLoading()
      // that.setData({ isShow: true })
      that.setData({ address: address, isShow:true})
    },

    /**
     * 获取支付订单的Body
     */
    getPayBody: function () {
      var that = this
      var Body = {
        cartId: util.getToken(constant.constant.quote_id),
        paymentMethod: {
          method: 'wxpay',
          po_number: null,
          additional_data:null
        }
      }
      var billingAddress = {}
      var address = that.data.address
      var userInfo = util.getToken(constant.constant.userInfoKey).addresses
      for (var i = 0; i < userInfo.length;i++ ) {
        if (address.id === userInfo[i].id) {
          billingAddress.customerAddressId = userInfo[i].id
          billingAddress.countryId = userInfo[i].country_id
          billingAddress.regionCode = userInfo[i].region.region_code
          billingAddress.region = userInfo[i].region.region
          billingAddress.customerId = userInfo[i].customer_id
          billingAddress.street = userInfo[i].street
          billingAddress.telephone = userInfo[i].telephone
          billingAddress.postcode = userInfo[i].postcode
          billingAddress.city = userInfo[i].city
          billingAddress.firstname = userInfo[i].firstname
          billingAddress.lastname = userInfo[i].lastname
          billingAddress.extensionAttributes = { checkoutFields:{}}
          billingAddress.saveInAddressBook = null
        }
      }
      Body.billingAddress = billingAddress
      // console.log(Body)
      return Body
    },
    /**
     * 下订单
     */
    handleTapSubmitOrder: function () {
      var that = this
      var Body = that.getPayBody()
      console.log(Body)
      // 测试token
      var token = util.getToken(constant.constant.userTokenKey)
      var url = constant.constant.domain + constant.constant.path + '/V1/carts/mine/payment-information';
      wx.request({
        url: url,
        data: Body,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': 'Bearer ' + token
        },
        success: function (res) {
          if (res.statusCode === 200) {
           that.orderPay(res.data)
           that.setData({ orderNo: res.data})
          }
        },
        fail: function (res) {
          console.error('🚀 🚀 🚀 下单错误')
          console.error(res)
        },
        complete: function (res) {
          // console.log('complete')
          // wx.hideNavigationBarLoading()
          // that.setData({ isShow: true })
        }
      })
    },

    /**
     * 订单支付
     */
    orderPay: function (orderNo) {
      // orderNo = 111112
      var that = this
      var email = util.getToken(constant.constant.userInfoKey).email
      var temp = email.indexOf('@')
      var open_id = email.substring(0,temp)
      var Body = {
        openId: open_id,
        productId: 2,
        orderNo: orderNo,
        body:'灞源味道',
        totalFee: Number(that.data.price)*100,
        // totalFee:1,
        detail:''
      }
      // console.log('打印订单支付body')
      // console.log(Body)
      // 测试token
      var token = util.getToken(constant.constant.userTokenKey)
      var url = constant.constant.domain + constant.constant.path + '/V1/mobileshop/wxpay';
      wx.request({
        url: url,
        data: Body,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': 'Bearer ' + token
        },
        success: function (res) {
          if (res.statusCode === 200) {
            var arr = res.data
            that.transferWXPay(arr[0].data)
            util.setToken(constant.constant.payParams, arr[0].data)
            util.setToken(constant.constant.qty, 0)
          }
        },
        fail: function (res) {
          console.error('🚀 🚀 🚀 订单支付错误')
          console.error(res)
        },
        complete: function (res) {
        }
      })
    },

    /**
     * 调用微信支付
     */
    transferWXPay: function (body) {
      // console.log('微信支付')
      // console.log(body)
      var that = this
      wx.requestPayment({
        timeStamp: body.timeStamp.toString(),
        nonceStr: body.nonceStr,
        package: body.package,
        signType: body.signType,
        paySign: body.paySign,
        success: function (res) {
          // console.log('success')
          var temp = res.errMsg
          var num = temp.indexOf(':')
          var sign = temp.substring(num + 1)
          that.changeOrderStatus(sign)
        },
        fail: function (res) {
          // console.log('error')
          var temp = res.errMsg
          var num = temp.indexOf(':')
          var sign = temp.substring(num + 1)
          that.payResultTransfer(sign)
        }
      })
    },

    /**
     * 支付成功回调
     */
    payResultTransfer: function (sign) {
      // console.log(sign)
      var path = "/pages/pay-result/pay-result?sign=" + sign;
      wx.navigateTo({
        url: path
      })
    },

    /**
     * 修改订单状态
     */
    changeOrderStatus: function (sign) {
      var that = this
      var token = util.getToken(constant.constant.adminTokenKey)
      var Body = {
        entity:{
          entity_id: that.data.orderNo,
          status: 'pending_send_courier',
          increment_id: ''
        }
      }
      var url = constant.constant.domain + constant.constant.path + '/V1/orders';
      wx.request({
        url: url,
        data: Body,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': 'Bearer ' + token
        },
        success: function (res) {
          console.log('修改状态')
          console.log(res)
          that.payResultTransfer(sign)
          if (res.statusCode === 200) {
          
          }
        },
        fail: function (res) {
          console.error('🚀 🚀 🚀 修改订单状态错误')
          console.error(res)
        },
        complete: function (res) {
        }
      })
    },

    /**
     * 跳转服务协议
     */
    handleTapToProtocol: function () {
      var path = "/pages/contract/contract";
      wx.navigateTo({
        url: path
      })
    }
})