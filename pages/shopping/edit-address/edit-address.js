// pages/shopping/new-address/new-address.js
var util = require('../../../utils/util.js');
var constant = require('../../../utils/constant.js')
var city = require('../../../utils/city.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_default: '0',
    isAddressPickShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var id = city.provinces[0].id
    this.setData({
      provinces: city.provinces,
      citys: city.citys[id],
      areas: city.areas[city.citys[id][0].id],
      proviceName: '北京市',
      cityName: '市辖区', 
      areaName: '东城区' 
    })
    this.getUserAdressInfo(options.id)
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
  handleTapIsDefault: function () {
    var that = this;
    that.setData({
      'address.default_shipping': !that.data.address.default_shipping,
    })
  },
  // 点击保存按钮事件
  // handleTapSaveAddress: function () {
    // var path = "/pages/shopping/fill-order/fill-order";
    // wx.navigateTo({
    //   url: path
    // })
  // },
  /**
  * 地址选择框的隐藏和显示
  */
  hideOrShowAddressPicker: function () {
    var that = this;
    var isShow = that.data.isAddressPickShow;
    // console.log(isShow);
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

  /**
     * 显示地址信息  
     */
  getUserAdressInfo: function (id) {
    var that = this
    var address = {}
    var addressList = util.getToken(constant.constant.userAddressKey).addresses
    for (var i = 0; i < addressList.length; i++) {
      if (Number(id) === Number(addressList[i].id)) {
        address.name = addressList[i].firstname + addressList[i].lastname
        var telephoneStr = addressList[i].telephone.substring(3, 7)
        address.mobile = addressList[i].telephone.replace(telephoneStr, '****')
        var addressDetails = ''
        for (var j = 1; j < addressList[i].street.length; j++) {
          addressDetails = addressDetails + addressList[i].street[j]
        }
        address.addressDetails = addressDetails
        address.province = addressList[i].region.region
        address.city = addressList[i].city
        address.county = addressList[i].street[0]
        address.default_shipping = addressList[i].default_shipping
        address.id = addressList[i].id
        address.telephone = addressList[i].telephone
      }
    }
    that.setData({ address: address})
  },

  /**
   * 选择地区
   */
  handleSelectChange: function (e) {
      // console.log(e)
      var value = e.detail.value
      var provinces = this.data.provinces
      var citys = this.data.citys
      var areas = this.data.areas
      var provinceNum = value[0]
      var cityNum = value[1]
      var countyNum = value[2]
      // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
      if (this.data.value[0] != provinceNum) {
        var id = provinces[provinceNum].id
        this.setData({
          citys: city.citys[id],
          areas: city.areas[city.citys[id][0].id], 
          value: [provinceNum, 0, 0],
        })
      } else if (this.data.value[1] != cityNum) {
        // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
        var id = citys[cityNum].id
        this.setData({
          value: [provinceNum, cityNum, 0],
          areas: city.areas[citys[cityNum].id],
        })
      } else {
        // 滑动选择了区
        this.setData({
          value: [provinceNum, cityNum, countyNum]
        })
      }
      var proviceName = this.data.provinces[provinceNum].name
      var cityName = this.data.citys[cityNum].name
      var areaName = this.data.areas[countyNum].name
      // this.setData({ 'address.province': proviceName, 'address.city': cityName, 'address.county': areaName})
      this.setData({ proviceName: proviceName, cityName: cityName, areaName: areaName })
  },

  /**
   * 选择地区确认
   */
  handelAddressCommit: function () {
    this.setData({ 'address.province': this.data.proviceName, 'address.city': this.data.cityName, 'address.county': this.data.areaName})
    this.hideOrShowAddressPicker()
  },
  /**
   * 获取输入框内容
   */
  bindInputValueChange: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    var address = that.data.address;
    address[id] = e.detail.value;
    that.setData({
      address: address
    })
    // console.log(that.data.address);
  },

  /**
   * 保存编辑地址信息
   */
  handleTapSaveAddress: function (event) {
    var that = this
    var Body = that.exitPutData(event)
    // var token = util.getToken(constant.constant.userTokenKey)
    // 测试token
    var token = constant.constant.userToken
    var url = constant.constant.domain + constant.constant.path + '/V1/customers/me';
    wx.request({
      url: url,
      data: Body,
      method: 'PUT',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          // console.log('编辑用户地址信息成功')
          that.handleToChangePath()
        }
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 编辑用户地址信息错误')
        console.error(res)
      },
      complete: function (res) {
        // wx.hideNavigationBarLoading()
        // that.setData({ isShow: true })
      }
    })
  },

  /**
   * 编辑用户地址信息Body
   */
  exitPutData: function (event) {
    var that = this
    var Body = {
      customer:{}
    }
    var customer = util.getToken(constant.constant.userAddressKey)
    // Body.customer = customer
    // var userInfo = util.getToken(constant.constant.userInfoKey)
    console.log(that.data.address)
    var addressArr = customer.addresses
    if (util.isEmptyStr(event.currentTarget.dataset.id)) {
      var arr = that.data.address.name.match(/./g)
      var firstname = arr[0]
      var lastname = ''
      for (var j = 1; j < arr.length; j++) {
        lastname = lastname + arr[j]
      }
      var address = {
        "customer_id": customer.id,
        "region": {
          "region_code": that.data.address.province,
          "region": that.data.address.province,
          "region_id": 0
        },
        "region_id": 0,
        "country_id": "CN",
        "street": [
          that.data.address.county,
          that.data.address.addressDetails
        ],
        "telephone": that.data.address.mobile,
        "postcode": "0",
        "city": that.data.address.city,
        "firstname": firstname,
        "lastname": lastname,
        "default_shipping": that.data.address.default_shipping,
        "default_billing ": that.data.address.default_shipping
      }
      addressArr.push(address)
    } else {
      for (var i = 0; i < addressArr.length; i++) {
        if (that.data.address.default_shipping) {
          addressArr[i].default_shipping = false
          addressArr[i].default_billing = false
        }
        if (Number(event.currentTarget.dataset.id) === Number(addressArr[i].id)) {
          if (that.data.address.mobile.substring(3,7) !== '****') {
            addressArr[i].telephone = that.data.address.mobile
          }
          var arr = that.data.address.name.match(/./g)
          addressArr[i].firstname = arr[0]
          addressArr[i].lastname = ''
          for (var j = 1; j < arr.length; j++) {
            addressArr[i].lastname = addressArr[i].lastname + arr[j]
          }
          addressArr[i].region.region_code = that.data.address.province
          addressArr[i].region.region = that.data.address.province
          addressArr[i].street[0] = that.data.address.county
          addressArr[i].street[1] = that.data.address.addressDetails
          addressArr[i].city = that.data.address.city
          addressArr[i].default_shipping = that.data.address.default_shipping
          addressArr[i].default_billing = that.data.address.default_shipping
         }
      }
    }
    Body.customer = customer
    util.setToken(constant.constant.userAddressKey, customer)
    return Body
  },

  /**
   * 保存以后界面跳转
   */
  handleToChangePath: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})