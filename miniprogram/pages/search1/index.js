// 初始化数据库
const db = wx.cloud.database();
const kc = db.collection('kc_form');

Page({


  data: {
    columns: ['姓名', '班级'],
    showpicker: false,
    tasks: [],
    index:0,
    value: "",
    name:""
  },

  pageData:{
    school:"",
    skip:0
  },


  //返回上级页面
  onback: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

// 选择查询条件
onchoose: function () {
  this.setData({
    showpicker: true
  })
},

// 关闭选择器
onClose: function () {
  this.setData({
    showpicker: false
  })
},


// 监听选择的选项
onpicker: function (e) {
  this.setData({
    index:e.detail.index,
    tasks:[]
  })
},


// 监听输入的内容
onChange: function (e) {
  this.setData({
    value:e.detail
  })
  
},


  // 点击查询
  onSearch: function () {
    if (this.data.index == 0) {
      kc.where({
        head: this.data.value,
        school:this.pageData.school
      }).get({
        success: res => {
          this.setData({
            tasks: res.data
          })
          if(res.data.length==0 && this.data.tasks==0){
            wx.showToast({
              title: '啥也没有找到！',
              image:'../../icons/sob.png'
            })
          }else{
             wx.showToast({
            title: '查询成功了！',
            image:'../../icons/cute.png'
          })
          }      
        },
        fail: err => {
          console.log(err)
          wx.showToast({
            title: '查询失败了！',
            image:'../../icons/sob.png'
          })
        }
      })
    } else {
      kc.where({
        class: this.data.value,
        school:this.pageData.school
      }).skip(this.pageData.skip).get({
        success: res => {
          this.setData({
            tasks: this.data.tasks.concat(res.data)
          })
          this.pageData.skip=this.pageData.skip+20
          if(res.data.length==0 && this.data.tasks==0){
            wx.showToast({
              title: '啥也没有找到！',
              image:'../../icons/sob.png'
            })
          }else{
             wx.showToast({
            title: '查询成功了！',
            image:'../../icons/cute.png'
          })
          }      
        },
        fail: err => {
          console.log(err)
          wx.showToast({
            title: '查询失败了！',
            image:'../../icons/sob.png'
          })
        }
      })
    }
  },

  // 点击单元格后复制
  onCopy: function (event) {
    wx.setClipboardData({
      data: "班级："+this.data.value+"\n数量："+this.data.tasks.length,
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
    this.pageData.school=options.school
    this.setData({
      name:options.name
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