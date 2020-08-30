// 初始化数据库
const db = wx.cloud.database();
const kc = db.collection('kc_form');
const common = db.collection('kc_common');
// 获取全局数据
const app = getApp();
const tmplIds = "xGmh4S4t0yddmfjDygiRhl1oL6lgfmBAz30AjRH99Vs";

Page({


  data: {
    tasks: [],
    showId: 1,
    cancorrect: true,
    filetitle: "",
    fileID: "",
    title: "未修改",
    showteacher: 1,
    show: true
  },
  pageData: {
    id: "",
    ID: "abd27dd45f36862c009c9aa701c48126",
    filetitle: "",
    filePath: "",
    fileID: ""
  },


  // 点击图片展示
  imageshow: function (event) {
    wx.previewImage({
      urls: [event.currentTarget.dataset.url],
    })
  },

  // 点击修改文件按钮
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
          console.log(res.tempFiles[0])
          if (this.data.tasks.filetitle != res.tempFiles[0].name) {
            wx.cloud.deleteFile({
              fileList: [this.data.tasks.fileID, this.pageData.fileID],
              fail: err => {
                wx.showToast({
                  title: '文件上传失败',
                  image: "../../icons/fail.png"
                });
              }
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
                  title: "已修改"
                });
                kc.doc(this.data.tasks._id)
                  .update({
                    data: {
                      title: "已修改",
                    }
                  })
              },
              fail: err => {
                wx.showToast({
                  title: '文件上传失败',
                  image: "../../icons/fail.png"
                })
              }
            })
          } else {
            try {
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
                    title: "已修改"
                  })
                  kc.doc(this.data.tasks._id)
                    .update({
                      data: {
                        title: "已修改",
                      }
                    })
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
          }
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


  // 开启修改按钮
  onCorrect: function () {
    wx.showToast({
      title: '请开始修改！',
      image: '../../icons/correct.png'
    })
    this.setData({
      cancorrect: false
    })
  },

  // 放弃修改按钮
  onabandon: function () {
    wx.showToast({
      title: '放弃修改成功！',
      image: '../../icons/sleep.png'
    })
    this.setData({
      cancorrect: true
    })

  },

  // 跳转主页
  ongo: function () {
    wx.redirectTo({
      url: "/pages/index/index"
    })
  },


  // 提交（修改）表单
  onSubmit: function (event) {
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

    wx.showLoading({
      title: "修改中..."
    })
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
    kc.doc(this.data.tasks._id)
      .update({
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
          class: event.detail.value.class,
          filetitle: this.pageData.filetitle,
          filePath: this.pageData.filePath,
          fileID: this.pageData.fileID,
          tagType: "primary",
          tag: "未审批",
          title: this.data.title,
          showId: this.data.showId,
          showteacher: this.data.showteacher
        },
        success: res => {
          wx.showToast({
            title: '修改成功啦！',
            image: "../../icons/cute.png",

          });
        },
        fail: err => {
          console.log(err)
          wx.showToast({
            title: '修改失败了！',
            image: "../../icons/sob.png",
          });
        },
        complete: com => {
          this.setData({
            cancorrect: true
          })
        }
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

  // 删除项目
  ondelate: function () {
    wx.showModal({
      title: "提示",
      content: "你确定要删除这个项目吗？",
      success: res => {
        if (res.confirm) {
          wx.cloud.deleteFile({
            fileList: [this.data.tasks.fileID, this.pageData.fileID]
          })

          kc.where({
            _id: this.pageData.id
          }).remove({
            success: res => {
              wx.showToast({
                title: '删除成功啦！',
                image: '../../icons/success.png',
                success: res => {
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '/pages/index/index',
                    })
                  }, 1000)
                }
              })

            },
            fail: err => {
              wx.showToast({
                title: '删除失败！',
                image: '../../icons/sob.png'
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

  // 返回跳转
  onback: function () {
    wx.navigateBack()
  },

  // 通知跳转
  onNotice: function () {
    wx.navigateTo({
      url: '/pages/notice/index',
    })
  },

  // 获取组件信息
  getcommon: function () {
    common.doc(this.pageData.ID).get({
      success: res => {
        console.log(res)
        this.setData({
          common: res.data
        })
        wx.showToast({
          title: '读取组件成功！',
          image: '../../icons/cute.png'
        })
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '读取组件失败！',
          image: '../../icons/fail.png'
        })
      }
    })
  },

  onLoad: function (options) {
    wx.showLoading({
      title: "加载中..."
    })

    // 拿到上个页面传来的id
    this.pageData.id = options.id
    kc.doc(options.id)
      .get({
        success: res => {
          this.setData({
            tasks: res.data,
            showId: parseInt(res.data.showId),
            fileIDList: res.data.fileIDList,
            showteacher: parseInt(res.data.showteacher)
          });
          wx.showToast({
            title: '加载成功喽~',
            image: '../../icons/success.png'
          })
        },
        fail: err => {
          wx.showToast({
            title: '加载失败了~',
            image: '../../icons/fail.png'
          })
        }
      });
    if (app.globalData.scene == 1107) {
      this.setData({
        show: false
      })
    }

    // 获取组件和倒计时信息
    this.getcommon()
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