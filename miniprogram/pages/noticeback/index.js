// 初始化数据库
const db = wx.cloud.database();
const notice = db.collection('kc_notice');

Page({

  data: {

  },

  pageData: {
    filetitle: "",
    filePath: "",
    fileID: "",
  },

  //返回上级页面
  onback: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  // 点击上传按钮
  onUp: function () {
    wx.showLoading({
      title: '上传中...',
      mask: true,
    });
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      success: res => {
        console.log(res.tempFiles[0])
        try {
          this.pageData.filetitle = res.tempFiles[0].name;
          this.pageData.filePath = res.tempFiles[0].path;
          // 上传到数据库
          wx.cloud.uploadFile({
            cloudPath: "common/" +this.pageData.filetitle, // 文件名字
            filePath: this.pageData.filePath, // 文件路径
            success: res => {
              wx.showToast({
                title: '文件上传成功',
                image: "../../icons/success.png"
              })
              this.pageData.fileID = res.fileID
            },
            fail: err => {
              wx.showToast({
                title: '文件上传失败',
                image: "../../icons/fail.png"
              })
            }
          })
        } catch {
          wx.showToast({
            title: '文件不可用！',
            image: "../../icons/fail.png"
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: '取消上传',
          image: "../../icons/warn.png"
        })
      },
    })
  },


  // 提交表单
  onSubmit: function (event) {
    notice.add({
      data: {
        title: event.detail.value.title,
        notice: event.detail.value.notice,
        tag: event.detail.value.tag,
        fileID: this.pageData.fileID,
        date: (new Date().getMonth() + 1 + "月" + new Date().getDate() + "日" + new Date().getHours() + "点" + new Date().getMinutes() + "分").toString()
      },
      success: res => {
        wx.showToast({
          title: '提交成功了！',
          image: '../../icons/cute.png'
        })
      },
      fail: err => {
        wx.showToast({
          title: '提交失败了！',
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

})