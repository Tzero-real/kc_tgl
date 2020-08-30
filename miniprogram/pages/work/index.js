// pages/work/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  pageData: {
    school: "",
    role: "",
    name: "",
    value: "",
    h1: false,
    h2: false
  },

  // 监听输入
  onChange: function (e) {
    this.pageData.value = e.detail
  },


  // 开启权限
  onSearch: function () {
    if (this.pageData.value == "daaikechuangujn") {
      this.pageData.h1 = true
      this.pageData.h2 = true
      wx.showToast({
        title: '超级管理员！',
        image: "../../icons/cute.png"
      })
    } else if (this.pageData.value == "daaikechuang123") {
      this.pageData.h2 = true
      wx.showToast({
        title: '高级管理员！',
        image: "../../icons/cute.png"
      })
    } else {
      wx.showToast({
        title: '密钥错误！',
        image: "../../icons/warn.png"
      })
    }
  },

  // 敬请期待
  onForward: function () {
    wx.showToast({
      title: '敬请期待！',
      image: '../../icons/success.png'
    })
  },

  // 数据监控跳转
  ondata: function () {
    switch (this.pageData.role) {
      case "普通管理员":
        wx.navigateTo({
          url: `/pages/data/index?school=${this.pageData.school}`,
        })
        break
      case "高级管理员":
        wx.navigateTo({
          url: `/pages/data/index?school=${this.pageData.school}`,
        })
        break
      case "超级管理员":
        wx.showToast({
          title: '没有权限！',
          image: "../../icons/sleep.png"
        })
        break
      case "开发者":
        wx.navigateTo({
          url: `/pages/data/index?school=${this.pageData.school}`,
        })
        break
      default:
        wx.showToast({
          title: '没有权限！',
          image: "../../icons/sleep.png"
        })
    }
  },

  // 通知发布跳转
  onnoticeback: function () {
    if (this.pageData.h1) {
      switch (this.pageData.role) {
        case "普通管理员":
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
          break
        case "高级管理员":
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
          break
        case "超级管理员":
          wx.navigateTo({
            url: "/pages/noticeback/index",
          })
          break
        case "开发者":
          wx.navigateTo({
            url: "/pages/noticeback/index",
          })
          break
        default:
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
      }
    } else {
      wx.showToast({
        title: '请输入密钥！',
        image: '../../icons/warn.png'
      })
    }
  },

  // 通知跳转
  onNotice: function () {
    if (this.pageData.h1) {
      switch (this.pageData.role) {
        case "普通管理员":
          wx.navigateTo({
            url: '/pages/noticeuser/index',
          })
          break
        case "高级管理员":
          wx.navigateTo({
            url: '/pages/noticeuser/index',
          })
          break
        case "超级管理员":
          wx.navigateTo({
            url: '/pages/noticeuser/index?user=manager',
          })
          break
        case "开发者":
          wx.navigateTo({
            url: '/pages/noticeuser/index?user=manager',
          })
          break
        default:
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
      }
    } else {
      wx.showToast({
        title: '请输入密钥！',
        image: '../../icons/warn.png'
      })
    }
  },


  // 高级搜索
  onsearch1: function () {
    switch (this.pageData.role) {
      case "普通管理员":
        wx.navigateTo({
          url: `/pages/search1/index?school=${this.pageData.school}&name=${this.pageData.name}`,
        })
        break
      case "高级管理员":
        wx.navigateTo({
          url: `/pages/search1/index?school=${this.pageData.school}&name=${this.pageData.name}`,
        })
        break
      case "超级管理员":
        wx.showToast({
          title: '没有权限！',
          image: "../../icons/sleep.png"
        })
        break
      case "开发者":
        wx.navigateTo({
          url: `/pages/search1/index?school=${this.pageData.school}&name=${this.pageData.name}`,
        })
        break
      default:
        wx.showToast({
          title: '没有权限！',
          image: "../../icons/sleep.png"
        })
    }
  },

  // 超级搜索
  onsearch2: function () {
    if (this.pageData.h2) {
      switch (this.pageData.role) {
        case "普通管理员":
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
          break
        case "高级管理员":
          wx.navigateTo({
            url: `/pages/search2/index?school=${this.pageData.school}`,
          })
          break
        case "超级管理员":
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
          break
        case "开发者":
          wx.navigateTo({
            url: `/pages/search2/index?school=${this.pageData.school}`,
          })
          break
        default:
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
      }
    } else {
      wx.showToast({
        title: '请输入密钥！',
        image: '../../icons/warn.png'
      })
    }
  },

  //返回上级页面
  onback: function () {
    wx.navigateBack({
      delta: 1,
    })
  },

  // 组件自定义
  onComponent1: function () {
    if (this.pageData.h1) {
      switch (this.pageData.role) {
        case "普通管理员":
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
          break
        case "高级管理员":
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
          break
        case "超级管理员":
          wx.navigateTo({
            url: '/pages/component1/index',
          })
          break
        case "开发者":
          wx.navigateTo({
            url: '/pages/component1/index',
          })
          break
        default:
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
      }
    } else {
      wx.showToast({
        title: '请输入密钥！',
        image: '../../icons/warn.png'
      })
    }

  },

  // 人员管理
  onComponent2: function () {
    switch (this.pageData.role) {
      case "普通管理员":
        wx.showToast({
          title: '没有权限！',
          image: "../../icons/sleep.png"
        })
        break
      case "高级管理员":
        wx.showToast({
          title: '没有权限！',
          image: "../../icons/sleep.png"
        })
        break
      case "超级管理员":
        wx.showToast({
          title: '没有权限！',
          image: "../../icons/sleep.png"
        })
        break
      case "开发者":
        wx.navigateTo({
          url: '/pages/component2/index',
        })
        break
      default:
        wx.showToast({
          title: '没有权限！',
          image: "../../icons/sleep.png"
        })
    }
  },


  // 1.0点击生成excel
  onExcel: function () {
    if (this.pageData.h2) {
      switch (this.pageData.role) {
        case "普通管理员":
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
          break
        case "高级管理员":
          this.onread()
          break
        case "超级管理员":
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
          break
        case "开发者":
          this.onread()
          break
        default:
          wx.showToast({
            title: '没有权限！',
            image: "../../icons/sleep.png"
          })
      }
    } else {
      wx.showToast({
        title: '请输入密钥！',
        image: '../../icons/warn.png'
      })
    }
  },

  //2.0 读取数据
  onread: function () {
    wx.showLoading({
      title: '读取中...',
    })
    //读取kc_form表数据
    wx.cloud.callFunction({
      name: "getkc_form",
      data: {
        school: this.pageData.school
      },
      success: res => {
        this.savaExcel(res.result.data)
        wx.showLoading({
          title: '上传中...',
        })
      },
      fail: err => {
        wx.showToast({
          title: '读取数据失败！',
          image: '../../icons/fail.png'
        })
      }
    })
  },


  //3.0把数据保存到excel里，并把excel上传到云存储
  savaExcel(kc_form) {
    wx.cloud.callFunction({
      name: "excel",
      data: {
        kc_form: kc_form
      },
      success: res => {
        this.ondownloadexcel(res.result.fileID)
        wx.showLoading({
          title: '下载中...',
        })
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '上传数据失败！',
          image: '../../icons/fail.png'
        })
      }
    })
  },



  // 4.0获取到临时文件地址并下载
  ondownloadexcel: function (fileID) {
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        wx.setClipboardData({
          data: res.fileList[0].tempFileURL,
          success: res => {
            wx.showToast({
              title: '复制成功！',
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
      fail: err => {
        wx.showToast({
          title: '下载失败！',
          image: '../../icons/fail.png'
        })
      }
    })
  },


  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });
    this.pageData.school = options.school
    this.pageData.role = options.role
    this.pageData.name = options.name
    if(options.role=="开发者"){
      this.pageData.h1=true;
      this.pageData.h2=true;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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