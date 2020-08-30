// 初始化数据库
const db = wx.cloud.database();
const notice = db.collection('kc_notice');

Page({

  data: {
    tasks: [],
    identity: "customer"
  },
  pageData: {
    skip: 0
  },

  //返回上级页面
  onback: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  // 拿到通知
  getnotice: function () {
    notice.skip(this.pageData.skip).get({
      success: res => {
        if (res.data.length == 0 && this.data.tasks.length==0) {
          wx.showToast({
            title: '没有更多了！',
            image: '../../icons/sob.png'
          })
        } else {
          wx.showToast({
            title: '加载成功了！',
            image: '../../icons/cute.png'
          })
          console.log(res.data)
          this.setData({
            tasks: this.data.tasks.concat(res.data)
          })
          this.pageData.skip = this.pageData.skip + 20
        }
      },
      fail: err => {
        wx.showToast({
          title: '加载失败了！',
          image: '../../icons/sob.png'
        })
      }
    });
  },

  onLoad: function (options) {
    this.getnotice()
    if (options.user == "manager") {
      this.setData({
        identity: "manager"
      })
    }
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
    this.getnotice()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})