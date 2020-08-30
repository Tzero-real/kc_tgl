// 初始化数据库
const db = wx.cloud.database();
const kc = db.collection('kc_form');
const manager = db.collection('kc_manager');
const user = db.collection('kc_user');
// 获取全局数据
const app = getApp();

Page({


  data: {
    activeindex: 0,
    task1: [],
    task2: [],
    task3: [],
    name: ""
  },

  pageData: {
    CurrentActiveIndex: 0,
    school: "",
    role: "",
    skip1: 0,
    skip2: 0,
    skip3: 0
  },

  // 监听切换事件
  onChangeIndex: function (event) {
    this.pageData.CurrentActiveIndex = event.detail.name
    if (event.detail.name == 1) {
      this.setData({
        task2: []
      })
      this.pageData.skip2 = 0
      this.ontask2()
    } else if (event.detail.name == 2) {
      this.setData({
        task3: []
      })
      this.pageData.skip3 = 0
      this.ontask3()
    } else {
      this.setData({
        task1: []
      })
      this.pageData.skip1 = 0
      this.ontask1()
    }
  },


  // 跳转到工作台页面
  onwork: function () {
    wx.navigateTo({
      url: `/pages/work/index?school=${this.pageData.school}&role=${this.pageData.role}&name=${this.data.name}`,
    })
  },


  // 拿到task1数据
  ontask1: function () {
    wx.showLoading({
      title: '加载中...'
    })
    kc.where({
      tag: "未审批",
      school: this.pageData.school
    }).skip(this.pageData.skip1).get({
      success: res => {
        this.setData({
          task1: this.data.task1.concat(res.data)
        });
        this.pageData.skip1 = this.pageData.skip1 + 20
        wx.hideLoading();
        if (this.data.task1.length == 0) {
          wx.showToast({
            title: '没有更多了！',
            image: "../../icons/sob.png"
          })
        } else {
          wx.showToast({
            title: '哇，成功了耶',
            image: "../../icons/cute.png"
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: '查询失败',
          image: "../../icons/fail.png"
        })
      }
    })
  },

  // 拿到task2数据
  ontask2: function () {
    wx.showLoading({
      title: '加载中...'
    })
    kc.where({
      tag: "有错误",
      school: this.pageData.school
    }).skip(this.pageData.skip2).get({
      success: res => {
        this.setData({
          task2: this.data.task2.concat(res.data)
        });

        this.pageData.skip2 = this.pageData.skip2 + 20
        wx.hideLoading();
        if (this.data.task2.length == 0) {
          wx.showToast({
            title: '没有更多了！',
            image: "../../icons/sob.png"
          })
        } else {
          wx.showToast({
            title: '哇，成功了耶',
            image: "../../icons/cute.png"
          })

        }
      },
      fail: err => {
        wx.showToast({
          title: '查询失败',
          image: "../../icons/fail.png"
        })

      }
    })
  },

  // 拿到task3数据
  ontask3: function () {
    wx.showLoading({
      title: '加载中...'
    })
    kc.where({
      tag: "已通过",
      school: this.pageData.school
    }).skip(this.pageData.skip3).get({
      success: res => {
        this.setData({
          task3: this.data.task3.concat(res.data)
        });
        this.pageData.skip3 = this.pageData.skip3 + 20
        wx.hideLoading();
        if (this.data.task3.length == 0) {
          wx.showToast({
            title: '没有更多了！',
            image: "../../icons/sob.png"
          })

        } else {
          wx.showToast({
            title: '哇，成功了耶',
            image: "../../icons/cute.png"
          })

        }
      },
      fail: err => {
        wx.showToast({
          title: '查询失败',
          image: "../../icons/fail.png"
        })

      }
    })
  },

  // 刷新按钮
  onAgain: function () {
    if (this.pageData.CurrentActiveIndex == 1) {
      this.setData({
        task2: []
      })
      this.pageData.skip2 = 0
      this.ontask2()
    } else if (this.pageData.CurrentActiveIndex == 2) {
      this.setData({
        task3: []
      })
      this.pageData.skip3 = 0
      this.ontask3()
    } else {
      this.setData({
        task1: []
      })
      this.pageData.skip1 = 0
      this.ontask1()
    }
  },




  onLoad: function (options) {
    if (options.user != "manager") {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
    this.pageData.school = options.school
    this.pageData.role = options.role
    this.setData({
      name: options.name
    })
  },



  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onAgain()
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
    if (this.pageData.CurrentActiveIndex == 1) {
      this.ontask2()
    } else if (this.pageData.CurrentActiveIndex == 2) {
      this.ontask3()
    } else {
      this.ontask1()
    }
  },


})