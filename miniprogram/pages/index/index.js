// 初始化数据库
const db = wx.cloud.database();
const kc = db.collection('kc_form');
const common = db.collection('kc_common')
// 获取全局数据
const app = getApp();
const tmplIds = "xGmh4S4t0yddmfjDygiRhl1oL6lgfmBAz30AjRH99Vs";

Page({



  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    errorMessage: "",
    showId: 1,
    showteacher: 1,
    title: "未上传",
    head: "",
    headId: "",
    message: "",
    name: "",
    school: "",
    subject: "",
    code: "",
    class: "",
    time: 5000,
    timeData: {},
    common: [],
    endTime: '2000-03-04 23:59:00'
  },

  pageData: {
    cansubmit: true,
    filetitle: "",
    filePath: "",
    fileID: "",
    finishtime: false,
    id: "abd27dd45f36862c009c9aa701c48126"

  },

  // 倒计时
  oncount: function () {
    var nowTime = new Date().getTime(); //现在时间（时间戳）
    var endTime = new Date(this.data.endTime).getTime(); //结束时间（时间戳）
    var time = endTime - nowTime;
    this.setData({
      time: time
    })
    console.log(time)
  },

  // 倒计时监听事件
  onChange: function (e) {
    this.setData({
      timeData: e.detail,
    });
  },


  // 倒计时结束
  onfinish: function () {
    this.pageData.finishtime = true
  },


  // 个人中心跳转
  onMe: function () {
    wx.navigateTo({
      url: '/pages/me/index',
    })
  },



  // 通知跳转
  onNotice: function () {
    wx.navigateTo({
      url: '/pages/notice/index',
    })
  },


  // 通过学号判断是否提交过
  onheadId: function (event) {
    kc.where({
        headId: event.detail
      })
      .get({
        success: res => {
          if (res.data.length != 0) {
            this.setData({
              errorMessage: "该学号已经使用过，请勿重复提交"
            });
            this.pageData.cansubmit = false
          } else {
            this.setData({
              errorMessage: ""
            });
            this.pageData.cansubmit = true
          }
        },
        fail: err => {
          wx.showToast({
            title: '系统错误',
            image: '../../icons/fail.png'
          })
        }
      })
  },

  // 点击上传文件按钮
  onUp: function () {
    wx.showLoading({
      title: '上传中...',
      mask: true,
    });
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      success: res => {
        try {

          wx.cloud.deleteFile({
            fileList: [this.pageData.fileID]
          })
          this.pageData.filetitle = res.tempFiles[0].name;
          this.pageData.filePath = res.tempFiles[0].path;
          // 上传到数据库
          wx.cloud.uploadFile({
            cloudPath: "main/" + this.pageData.filetitle, // 文件名字
            filePath: this.pageData.filePath, // 文件路径
            success: res => {
              wx.showToast({
                title: '文件上传成功',
                image: "../../icons/success.png"
              })
              this.pageData.fileID = res.fileID
              this.setData({
                title: "已上传"
              });
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


  // 点击反馈按钮
  onQuestion: function () {
    wx.navigateTo({
      url: '/pages/feedback/index',
    })
  },


  // 点击加号增加成员
  onPlus: function () {
    if (this.data.showId < this.data.common.maxstu) {
      this.setData({
        showId: this.data.showId + 1
      })
    }
  },


  // 点击减号删减成员
  onCut: function () {
    if (this.data.showId > this.data.common.minstu) {
      this.setData({
        showId: this.data.showId - 1
      })
    }
  },

  // 点击增加老师
  onPlusTeach: function () {
    if (this.data.showteacher < this.data.common.maxtea) {
      this.setData({
        showteacher: this.data.showteacher + 1
      })
    }
  },

  // 点击减号删减老师
  onCutTeach: function () {
    if (this.data.showteacher > this.data.common.mintea) {
      this.setData({
        showteacher: this.data.showteacher - 1
      })
    }
  },

  // 表单提交
  onSubmit: function (event) {
    wx.showLoading({
      title: "提交中..."
    })
    console.log(event)
    // 将成员变为数组
    let stu = [];
    stu.push(event.detail.value.stu1)
    stu.push(event.detail.value.stu2)
    stu.push(event.detail.value.stu3)
    stu.push(event.detail.value.stu4)
    stu.push(event.detail.value.stu5)
    stu.push(event.detail.value.stu6)
    stu.push(event.detail.value.stu7)
    stu.push(event.detail.value.stu8)
    stu.push(event.detail.value.stu9)
    stu.push(event.detail.value.stu10)
    stu.push(event.detail.value.stu11)
    stu.push(event.detail.value.stu12)
    stu.push(event.detail.value.stu13)
    stu.push(event.detail.value.stu14)
    stu.push(event.detail.value.stu15)
    // 将老师变为数组
    let teacher = [];
    teacher.push(event.detail.value.teacher1)
    teacher.push(event.detail.value.teacher2)
    teacher.push(event.detail.value.teacher3)
    // 将职称变为数组
    let teachertitle = [];
    teachertitle.push(event.detail.value.teachertitle1)
    teachertitle.push(event.detail.value.teachertitle2)
    teachertitle.push(event.detail.value.teachertitle3)
    // 提交条件判断
    if (this.pageData.finishtime == false) {
      if (event.detail.value.code.length == 6) {
        if (event.detail.value.headId.length == 12) {
          if (this.pageData.cansubmit == true) {
            if (this.pageData.fileID != "") {
              wx.requestSubscribeMessage({
                tmplIds: [tmplIds],
                success: res => {
                  wx.showLoading({
                    title: '订阅中...',
                    mask: true
                  })
                  console.log(res)
                  if (res.xGmh4S4t0yddmfjDygiRhl1oL6lgfmBAz30AjRH99Vs === "accept") {
                    wx.showToast({
                      title: '订阅成功!',
                      image: '../../icons/cute.png'
                    })
                  } else {
                    wx.showToast({
                      title: '订阅失败!',
                      image: '../../icons/fail.png'
                    })
                  }
                },
                fail: err => {
                  wx.showToast({
                    title: '订阅失败!',
                    image: '../../icons/fail.png'
                  })
                }
              })


              kc.add({
                data: {
                  head: event.detail.value.head,
                  headId: event.detail.value.headId,
                  message: event.detail.value.message,
                  name: event.detail.value.name,
                  school: event.detail.value.school,
                  stu: stu,
                  subject: event.detail.value.subject,
                  teacher: teacher,
                  teachertitle: teachertitle,
                  code: event.detail.value.code,
                  class: event.detail.value.class,
                  filetitle: this.pageData.filetitle,
                  filePath: this.pageData.filePath,
                  fileID: this.pageData.fileID,
                  tagType: "primary",
                  tag: "未审批",
                  title: "未修改",
                  showId: this.data.showId,
                  showteacher: this.data.showteacher,
                  tmplIds: tmplIds
                },
                success: res => {
                  wx.showToast({
                    title: '上传成功',
                    image: "../../icons/success.png"
                  });
                  this.pageData.cansubmit = false
                },
                fail: err => {
                  console.log(err)
                  wx.showToast({
                    title: '上传失败',
                    image: "../../icons/fail.png"
                  })
                }
              });
            } else {
              wx.showToast({
                title: '请上传文件',
                image: "../../icons/warn.png"
              })
            }
          } else {
            wx.showToast({
              title: '请勿重复提交！',
              image: '../../icons/warn.png'
            })
          }
        } else {
          wx.showToast({
            title: '学号12位哦！',
            image: '../../icons/warn.png'
          })
        }
      } else {
        wx.showToast({
          title: '校验码6位呀！',
          image: '../../icons/warn.png'
        })
      }
    } else {
      wx.showToast({
        title: '收取已经结束！',
        image: '../../icons/sleep.png'
      })
    }

  },


  // 获取用户标识openID
  getOpenId: function (e) {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log(res)
        this.setData({
          openId: res.result.openId
        })
        // 添加到本地存储openId
        wx.setStorage({
          data: res.result.openId,
          key: 'openId',
        })
        app.globalData.openId = res.result.openId
      },
      fail: err => {
        console.log(err)
      }
    })

  },



  // 获取用户登录信息
  getUserInfo: function (e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    })
    // 添加到本地存储userInfo
    wx.setStorage({
      data: e.detail.userInfo,
      key: 'userInfo',
    })
  },

  // 获取组件信息和倒计时信息
  getcommon: function () {
    common.doc(this.pageData.id).get({
      success: res => {
        this.setData({
          common: res.data,
          endTime: res.data.time,
          showId: res.data.minstu,
          showteacher: res.data.mintea
        })
        wx.showToast({
          title: '读取组件成功！',
          image: '../../icons/cute.png'
        })
      },
      fail: err => {
        wx.showToast({
          title: '读取组件失败！',
          image: '../../icons/fail.png'
        })
      }
    })
  },


  onLoad: function (options) {

    // 获取组件和倒计时信息
    this.getcommon()

    // 判断本地存储有没有userInfo
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.setData({
          userInfo: res.data
        })
      }
    })


    //判断本地存储有没有openId
    wx.getStorage({
      key: 'openId',
      success: res => {
        this.setData({
          openId: res.data
        })
        app.globalData.openId = res.data
      },
      fail: err => {
        // 调用函数获取本地openId
        this.getOpenId();
      }
    })


    //更新用户信息 
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    };


  },


  onReady: function () {
    // 倒计时
    setTimeout(this.oncount, 500)
  },



  onShow: function () {

  },



  onHide: function () {
    
  },



  onUnload: function () {
    
  },



  onPullDownRefresh: function () {

  },



  onReachBottom: function () {

  },



  onShareAppMessage: function () {

  }
})