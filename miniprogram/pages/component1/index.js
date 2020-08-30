// 初始化数据库
const db = wx.cloud.database();
const common = db.collection('kc_common');

Page({


  data: {
    minstu:1,
    maxstu:1,
    mintea:1,
    maxtea:1,
    time:""
  },

  pageData:{
    id:"abd27dd45f36862c009c9aa701c48126"
  },

  // 监听步进器数据
  onminstu:function(event){
    this.setData({
      minstu:event.detail
    })
  },
  onmaxstu:function(event){
    this.setData({
      maxstu:event.detail
    })
  },
  onmintea:function(event){
    this.setData({
      mintea:event.detail
    })
  },
  onmaxtea:function(event){
    this.setData({
      maxtea:event.detail
    })
  },


  //返回上级页面
  onback: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  // 提交表单
  onSubmit:function(event){
    wx.showLoading({
      title: "更新中..."
    })
    common.doc(this.pageData.id).update({
      data:{
        minstu:this.data.minstu,
        maxstu:this.data.maxstu,
        mintea:this.data.mintea,
        maxtea:this.data.maxtea,
        time:event.detail.value.time        
      },
      success:res=>{
        wx.showToast({
          title: '更新成功啦！',
          image: "../../icons/cute.png",
        });
      },
      fail:err=>{
        wx.showToast({
          title: '更新失败了！',
          image: "../../icons/sob.png",
        });
      }

    })
  },

  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'getkc_common',
      success:res=>{
        this.setData({
          minstu:res.result.data[0].minstu,
          maxstu:res.result.data[0].maxstu,
          mintea:res.result.data[0].mintea,
          maxtea:res.result.data[0].maxtea,
          time:res.result.data[0].time
        })
        wx.showToast({
          title: '加载成功啦！',
          image:'../../icons/cute.png'
        })
      },
      fail:err=>{
        wx.showToast({
          title: '加载失败啦！',
          image:'../../icons/sob.png'
        })
      }
    })

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