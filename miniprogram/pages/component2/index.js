// 初始化数据库
const db = wx.cloud.database();
const manager = db.collection('kc_manager')

Page({


  data: {
    manager: [],

  },

  pageData: {
    openid: "",
    name: "",
    school: "",
    role: "",
    skip:0
  },

  // 长按删除
  ondelate: function (e) {
    wx.showModal({
      title: '提示',
      content: '你确定要删除这个管理员吗？',
      success: res => {
        if (res.confirm) {
          manager.doc(e.currentTarget.dataset.index._id).remove({
            success: res => {
              wx.showToast({
                title: '删除成功了！',
                image: '../../icons/cute.png'
              })
              this.setData({
                manager:[]
              })
              this.pageData.skip=0
              this.getmanager()
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

  // 点击单元格后复制
  onCopy: function (event) {
    wx.setClipboardData({
      data: "姓名：" + event.currentTarget.dataset.index.name + "\nopenid：" + event.currentTarget.dataset.index.openid + "\n学院：" + event.currentTarget.dataset.index.school + "\n权限:" + event.currentTarget.dataset.index.role,
      success: res => {
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


  // 监听输入的内容
  onChange: function (e) {
    var mes = e.detail;
    var message = [];
    message = mes.split(" ");
    this.pageData.name = message[0];
    this.pageData.role = message[1];
    this.pageData.school = message[2];
    this.pageData.openid = message[3];
  },

  //返回上级页面
  onback: function () {
    wx.navigateBack({
      delta: 1,
    });
  },

  // 添加成员权限
  onSearch: function () {
    manager.add({
      data: {
        openid: this.pageData.openid,
        name: this.pageData.name,
        school: this.pageData.school,
        role: this.pageData.role
      },
      success:res=>{
        wx.showToast({
          title: '添加成功了！',
          image:'../../icons/cute.png'
        })
        this.setData({
          manager:[]
        })
        this.pageData.skip=0
        this.getmanager()
      },
      fail:err=>{
        wx.showToast({
          title: '提交失败了！',
          image:'../../icons/sob.png'
        })
      }
    })
  },

  // 获取管理员列表
  getmanager: function () {
    manager.skip(this.pageData.skip).get({
      success: res => {
        wx.showToast({
          title: '加载成功了！',
          image: '../../icons/cute.png'
        })
        this.setData({
          manager: this.data.manager.concat(res.data)
        })
        this.pageData.skip=this.pageData.skip+20
      },
      fail: err => {
        wx.showToast({
          title: '加载失败了！',
          image: '../../icons/fail.png'
        })
      }
    })
  },

  onLoad: function (options) {
    this.getmanager()
    this.pageData.skip=0
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
    this.getmanager()
  },
})