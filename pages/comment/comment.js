var app = getApp();
var util = require('../../utils/util.js');
var constant = require('../../utils/constant.js')
Page({
  data: {
    showMore:1,
    // 用户评论
    // comment: [{ count: '999', userSrc: '../../image/1.png', nickname: '15735921111', add_time: '2018.01.25  16:45', content: '严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈', pic_list: [{ pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }], desc: '白色外套  2件', replyContent:'严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈'},
    //   { count: '999', userSrc: '../../image/1.png', nickname: '15735921111', add_time: '2018.01.25  16:45', content: '严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈', pic_list: [{ pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }], desc: '白色外套  2件', replyContent: '严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈' }
    // ],
    pageSize: constant.constant.pageSize,
    currentPage: constant.constant.currentPage,
    //是否还有更多数据
    'isNoMore': false,
    //是否正在加载中
    'isLoading': false,
},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options)
    wx.showNavigationBarLoading()
    this.getProductComment(options.sku)
    // 将上一页面的数据在此页面显示
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    var imageData = prevPage.data.media_gallery_entries;
    this.setData({ sku: options.sku, total: options.total, name: options.name, imageData: imageData})
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.name,
      imageUrl: constant.constant.requestPath + this.data.imageData[0].file,
      // desc: constant.constant.appDesc,
      // path: '/pages/comment/comment?sku=' + this.data.sku + '&total=' + this.data.total + '&name' + this.data.name
      path: '/pages/goodsDetail/goodsDetail?sku=' + this.data.sku
    }
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
      this.setData({ isLoading: true })
      this.data.currentPage = this.data.currentPage + 1,
        setTimeout(() => {
          this.getCommentMore(this.data.currentPage, this.data.pageSize);
        }, 500);
    } else {
      this.data.isLoading = false
    }
  },
  /**
   * 获取评价
   */
  // TODO 判断当前登录用户是否发表评论
  getProductComment: function (sku) {
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/gmart/products/' + sku + '/reviews/' + that.data.currentPage + '/' + that.data.pageSize;
    wx.request({
      url: url,
      data: {},
      header: util.adminRequestHeader(),
      success: function (res) {
        // console.log('🚀 🚀 🚀 打印商品评价数据')
        // console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          // 名称加*
          var nickname = res.data[i].nickname
          var arr = nickname.match(/./g)
          // console.log(arr)
          var nicknameStr = ''
          if (arr.length <=2) {
            if (util.isEmptyStr(arr[0])) {
              nicknameStr = arr[1] + '****'
            } else if (arr[0] === ' ') {
              nicknameStr = arr[1] + '****'
            } else {
              nicknameStr = arr[0] + '****'
            }
          } else {
            if (util.isEmptyStr(arr[0])) {
              nicknameStr = arr[1] + '****' + arr[arr.length-1]
            } else if (arr[0] === ' ') {
              nicknameStr = arr[1] + '****' + arr[arr.length - 1]
            } else {
              nicknameStr = arr[0] + '****' + arr[arr.length - 1]
            }
          }
          res.data[i].nicknameStr = nicknameStr
          // console.log(nicknameStr)
          res.data[i].ratingNum = Number(res.data[i].rating)
          //获取评论头像
          if (util.isEmptyStr(res.data[i].customer_id)) {
            res.data[i].imgNum = util.getRemainder(Number(res.data[i].review_id))
          } else {
            res.data[i].imgNum = util.getRemainder(Number(res.data[i].customer_id))
          }
          res.data[i].replyNum = 0
          // 获取店主回复
          if (res.data[i].detail.indexOf('{{') > -1 && res.data[i].detail.indexOf('}}') > -1) {
            var reply = res.data[i].detail.match((/{{(\S*)}}/))[1]
            console.log(reply)
            res.data[i].detail = res.data[i].detail.replace(res.data[i].detail.match((/{{(\S*)}}/))[0],'')
            res.data[i].reply = reply
            res.data[i].replyNum = 1
          }
        }
        that.setData({ comment: res.data})
      },
      fail: function (res) {
        console.error('🚀 🚀 🚀 获取商品评价错误')
        console.error(res)
      },
      complete: function (res) {
        wx.hideNavigationBarLoading()
      }
    })
  },
  /**
    * 获取更多评论
    */
  getCommentMore: function (currentPage, pageSize) {
    var that = this;
    var url = constant.constant.domain + constant.constant.path + '/V1/gmart/products/' + that.data.sku + '/reviews/' + currentPage + '/' + pageSize;
    if (!that.data.isNoMore) {
      wx.request({
        url: url,
        data: {},
        header: util.adminRequestHeader(),
        success: function (res) {
          wx.hideLoading();
          var length = res.data.length;
          if (length > 0) {
            // 加入数据
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].ratingNum = Number(res.data[i].rating)
              // 名称加*
              var nickname = res.data[i].nickname
              var arr = nickname.match(/./g)
              // console.log(arr)
              var nicknameStr = ''
              if (arr.length <= 2) {
                if (util.isEmptyStr(arr[0])) {
                  nicknameStr = arr[1] + '****'
                } else if (arr[0] === ' ') {
                  nicknameStr = arr[1] + '****'
                } else {
                  nicknameStr = arr[0] + '****'
                }
              } else {
                if (util.isEmptyStr(arr[0])) {
                  nicknameStr = arr[1] + '****' + arr[arr.length - 1]
                } else if (arr[0] === ' ') {
                  nicknameStr = arr[1] + '****' + arr[arr.length - 1]
                } else {
                  nicknameStr = arr[0] + '****' + arr[arr.length - 1]
                }
              }
              res.data[i].nicknameStr = nicknameStr
              //获取评论头像
              if (util.isEmptyStr(res.data[i].customer_id)) {
                res.data[i].imgNum = util.getRemainder(Number(res.data[i].review_id))
              } else {
                res.data[i].imgNum = util.getRemainder(Number(res.data[i].customer_id))
              }
              res.data[i].replyNum = 0
              // 获取店主回复
              if (res.data[i].detail.indexOf('{{') > -1 && res.data[i].detail.indexOf('}}') > -1) {
                var reply = res.data[i].detail.match((/{{(\S*)}}/))[1]
                console.log(reply)
                res.data[i].detail = res.data[i].detail.replace(res.data[i].detail.match((/{{(\S*)}}/))[0], '')
                res.data[i].reply = reply
                res.data[i].replyNum = 1
              }
            }
            var commentTemp = that.data.comment;
            Array.prototype.push.apply(commentTemp, res.data);
            that.data.comment = commentTemp
            that.setData({
              'comment': that.data.comment
            });
            if (that.data.comment.length == Number(that.data.total)) {
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
          console.error('🚀 🚀 🚀 获取更多评论错误')
          console.error(res)
        },
        complete: function (res) {
          wx.hideNavigationBarLoading()
        }
      })
    }
  },
// 点击更多展开项
  handleTaphowMore:function(){
    this.setData({
      showMore:!this.data.showMore
    });
  },

// 点击选中效果   TODO
  handleTapswitchTab: function () {
    this.setData({
      showType: this.data.showType == 1 ? 0 :1
    });
}
})