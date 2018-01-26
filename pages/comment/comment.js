var app = getApp();
Page({
  data: {
    // 用户评论
    comment: [{ count: '999', userSrc: '../../image/1.png', nickname: '15735921111', add_time: '2018.01.25  16:45', content: '严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈', pic_list: [{ pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }], desc: '白色外套  2件', replyContent:'严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈'},
      { count: '999', userSrc: '../../image/1.png', nickname: '15735921111', add_time: '2018.01.25  16:45', content: '严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈', pic_list: [{ pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }, { pic_url: '../../image/1.png' }], desc: '白色外套  2件', replyContent: '严选宝贝,呵呵哈哈哈剪辑剪辑军军军军军军军军军军军看呵呵哈哈哈' }
    ],
},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    
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
  handleTapswitchTab: function () {
    this.setData({
      showType: this.data.showType == 1 ? 0 :1
    });
},
  onReachBottom: function(){
}
})