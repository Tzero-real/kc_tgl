// 初始化数据库
const db = wx.cloud.database();
const kc = db.collection('kc_form');
// 获取全局数据
const app = getApp();
Page({



  data: {
    name:"数据错误",
    tagType:"primary",
    tag:"未审批" ,
    tasks:[],
    value:""
  },


  // 监听输入框
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },


  // 点击搜索按钮触发
  onSearch:function(){
    var headId = this.data.value.substr(0,12)
    var code = this.data.value.substr(12,18)
    if(this.data.value.length == 18){
      wx.showLoading({
        title:'加载中...'
      })
      kc.where({
        headId:headId,
        code:code
      }).get({
        success:res=>{
          this.setData({
            tasks:res.data
          });
          wx.hideLoading();
          if(this.data.tasks.length==0){
            wx.showToast({
              title: '啥也没找到？',
              image:"../../icons/sob.png"
            })
          }else{
            wx.showToast({
              title: '哇，查到了耶',
              image:"../../icons/cute.png"
            })
          }
        },
        fail:err=>{
          wx.showToast({
            title: '查询失败',
            image:"../../icons/fail.png"
          })
        }
      })
    }else{
      wx.showToast({
        title: '你没输入全呀！',
        image:'../../icons/sob.png'
      })
    }
  },



// 返回跳转
  onback:function(){
      wx.navigateBack()
  },

  // 通知跳转
onNotice:function(){
  wx.navigateTo({
    url: '/pages/notice/index',
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