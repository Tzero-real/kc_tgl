// 获取全局数据
const app = getApp();
// 初始化数据库
const db = wx.cloud.database();
const manager = db.collection('kc_manager')

Page({



  data: {
    activeNames: ['0'],
  },

  pageData: {
    manager: [],
    show:false
  },

  // 点击单元格后复制
  onCopy2: function (event) {
    wx.setClipboardData({
      data: "呀！这是什么东西塞到了我的粘贴板!\n（老脸一红）\n加入我们吧！邮箱:tglstudio@163.com\n始终期待着邮箱的小红点哦ღ",
      success: res => {
        // 强制覆盖原样式
        wx.showToast({
          title: '快看粘贴板！',
          image: '../../icons/surprise.png'
        })
      },
      fail: err => {
        wx.showToast({
          title: '数据错误！',
          image: '../../icons/fail.png'
        })
      }
    })
  },

  // 监听折叠面板状态
  onChange: function (event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  // 通知跳转
  onnotice: function () {
    wx.navigateTo({
      url: '/pages/noticeuser/index',
    })
  },

  // 特别鸣谢跳转
  onaward:function(){
    wx.navigateTo({
      url: '/pages/award/index',
    })
  },

  // 反馈界面跳转
  onfeedback:function(){
    wx.navigateTo({
      url: '/pages/feedback/index',
    })
  },


  // 返回跳转
  onback: function () {
    wx.navigateBack()
  },

  // 打赏跳转
  onMoney: function () {
    wx.navigateTo({
      url: '/pages/money/index',
    })
  },

  // 跳转后台
  onbackoffice: function () {
    manager.get({
      success: res => {
        wx.showLoading({
          title: '判断权限中！',
        })
        for (let i = 0; i < res.data.length; i++) {
          if (app.globalData.openId == res.data[i].openid) { 
            this.pageData.show=false
            wx.showToast({
              title: '验证成功！',
              image: '../../icons/cute.png'
            });
            wx.navigateTo({
              url: `/pages/index2/index?user=manager&school=${res.data[i].school}&name=${res.data[i].name}&role=${res.data[i].role}`,
            })
            break
          } else {
            this.pageData.show=true
          }
        }
        if(this.pageData.show){
          wx.showToast({
            title: '权限不足！',
            image: '../../icons/sleep.png'
          });
        }
      },fail:err=>{
        wx.showToast({
          title: '权限不足！',
          image: '../../icons/sleep.png'
        });
      }
    })
  },

  // 点击单元格后复制
  onCopy: function (event) {
    wx.setClipboardData({
      data: "内部码:" + app.globalData.openId,
      success: res => {
        // 强制覆盖样式
        wx.showToast({
          title: '复制到粘贴板！',
          image: '../../icons/cute.png'
        })
      },
      fail: err => {
        wx.showToast({
          title: '复制失败！',
          image: '../../icons/fail.png'
        })
      }
    })
  },

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

  }
})