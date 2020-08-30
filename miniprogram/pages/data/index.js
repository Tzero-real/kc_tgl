// 初始化数据库
const db = wx.cloud.database();
const kc = db.collection('kc_form');

Page({

  
  data: {
    school:"未获取到",
    total:0,
    d1:0,
    d2:0,
    d3:0
  },

  //返回上级页面
  onback: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  // 点击单元格后复制
  onCopy: function (event) {
    wx.setClipboardData({
      data: "学院："+this.data.school+"-全部数量："+this.data.total+"\n未审批："+this.data.d1+"\n有错误："+this.data.d2+"\n已通过："+this.data.d3,
      success:res=>{
        wx.showToast({
          title: '复制到粘贴板！',
          image: '../../icons/cute.png'
        })
      },
      fail:err=>{
        wx.showToast({
          title: '复制失败！',
          image: '../../icons/fail.png'
        })
      }
    })   
  },

  
  onLoad: function (options) {
    this.setData({
      school:options.school
    })
    kc.where({
      school:options.school
    }).count({
      success:res=>{
        console.log(res)
        this.setData({
          total:res.total
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
    kc.where({
      school:options.school,
      tag:'未审批'
    }).count({
      success:res=>{
        this.setData({
          d1:res.total
        })
      }
    })
    kc.where({
      school:options.school,
      tag:'有错误'
    }).count({
      success:res=>{
        this.setData({
          d2:res.total
        })
      }
    })
    kc.where({
      school:options.school,
      tag:'已通过'
    }).count({
      success:res=>{
        this.setData({
          d3:res.total
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