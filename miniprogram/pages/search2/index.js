// 初始化数据库
const db = wx.cloud.database();
const kc = db.collection('kc_form');

Page({

  data: {
    columns: ['学号', '姓名'],
    showpicker: false,
    tasks: []
  },
  pageData: {
    index: 0,
    value: "",
    school:"",
    url:''
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
    this.pageData.index = e.detail.index
  },


  // 监听输入的内容
  onChange: function (e) {
    this.pageData.value = e.detail
  },

  // 点击查询
  onSearch: function () {
    if (this.pageData.index == 0) {
      kc.where({
        headId: this.pageData.value,
        school:this.pageData.school
      }).get({
        success: res => {
          this.setData({
            tasks: res.data
          })
          if(res.data.length==0){
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
          console.log(err);
          wx.showToast({
            title: '查询失败了！',
            image:'../../icons/sob.png'
          })
        }
      })
    } else {
      kc.where({
        head: this.pageData.value,
        school:this.pageData.school
      }).get({
        success: res => {
          this.setData({
            tasks: res.data
          })
          if(res.data.length==0){
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
          console.log(err);
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
      data: "校验码："+event.currentTarget.dataset.index.code+"\n学号："+event.currentTarget.dataset.index.headId,
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

  // 长按删除
  ondelate: function (e) {
    console.log(e)
    this.pageData.url=e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '你确定要删除这个项目吗？',
      success: res => {
        if (res.confirm) {
          kc.doc(this.pageData.url._id).remove({
            success: res => {
              wx.cloud.deleteFile({
                fileList: [this.pageData.url.fileID]
              })
              wx.showToast({
                title: '删除成功了！',
                image: '../../icons/cute.png'
              })
              kc.where({
                headId: this.pageData.value,
                school:this.pageData.school
              }).get({
                success: res => {
                  this.setData({
                    tasks: res.data
                  })
                },
                fail:err=>{
                  wx.showToast({
                    title: '刷新失败！',
                    image:'../../icons/fail.png'
                  })
                }
              })
            },
            fail: err => {
              wx.showToast({
                title: '删除失败了！',
                image: '../../icons/fail.png'
              })
            }
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消删除！',
            image: '../../icons/warn.png'
          })
        }
      }
    })

  },


  onLoad: function (options) {
    this.pageData.school=options.school
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