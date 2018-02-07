// pages/shopping/fill-order/fill-order.js
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

    }
})