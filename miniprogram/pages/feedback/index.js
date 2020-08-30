Page({


  data: {
    tip:"反馈须知：\n  亲爱的用户，在反馈时，请用简练的话语描述相关问题或功能建议，最好可以提供图片或者视频，方便开发者理解和处理，联系方式时最好留QQ或者微信，以便我们进一步沟通和您的进一步跟进，我们将在7个工作日内对您做出答复！紧急bug请直接联系vx：tgl--studio。\n  最后，感谢您的反馈。"

  },

  //返回上级页面
  onback: function () {
    wx.navigateBack({
      delta: 1,
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
    return{
      title:"余生还长，请多多指教！",
      imageUrl:'cloud://tglstudio-key.7467-tglstudio-key-1301127223/ban/feedback.png'
    }
  }
})