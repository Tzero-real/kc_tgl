// 初始化数据库
const db = wx.cloud.database();
const notice = db.collection('kc_notice');

Page({


  data: {
    tasks: "",
    show: false,
  },

  pageData: {
    fileID: "",
    filetitle: "",
    filePath: ""
  },

  //返回上级页面
  onback: function () {
    wx.navigateBack({
      delta: 1,
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
          if (this.data.tasks.filetitle != res.tempFiles[0].name) {
            wx.cloud.deleteFile({
              fileList: [this.data.tasks.fileID, this.pageData.fileID]
            })
            this.pageData.filetitle = res.tempFiles[0].name;
            this.pageData.filePath = res.tempFiles[0].path;
            // 上传到数据库
            wx.cloud.uploadFile({
              cloudPath: "common/" + this.pageData.filetitle, // 文件名字
              filePath: this.pageData.filePath, // 文件路径
              success: res => {
                wx.showToast({
                  title: '文件上传成功',
                  image: "../../icons/success.png"
                })
                this.pageData.fileID = res.fileID
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
                cloudPath: "common/" + this.pageData.filetitle, // 文件名字
                filePath: this.pageData.filePath, // 文件路径
                success: res => {
                  wx.showToast({
                    title: '文件上传成功',
                    image: "../../icons/success.png"
                  })
                  this.pageData.fileID = res.fileID
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

  // 点击下载文件按钮
  onDownload: function () {
    wx.showLoading({
      title: '下载中...',
    })
    wx.cloud.getTempFileURL({
      fileList: [this.data.tasks.fileID],
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

  // 提交表单
  onSubmit: function (event) {
    wx.showLoading({
      title: "修改中..."
    })
    notice.doc(this.data.tasks._id)
      .update({
        data: {
          title: event.detail.value.title,
          notice: event.detail.value.notice,
          tag: event.detail.value.tag,
          fileID: this.pageData.fileID,
          filetitle: this.pageData.filetitle
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

  // 删除通知
  ondelate: function () {
    wx.showModal({
      title: "提示",
      content: "你确定要删除这个通知吗？",
      success: res => {
        if (res.confirm) {
          wx.cloud.deleteFile({
            fileList: [this.data.tasks.fileID, this.pageData.fileID]
          })

          notice.where({
            _id: this.data.tasks._id
          }).remove({
            success: res => {
              wx.showToast({
                title: '删除成功啦！',
                image: '../../icons/success.png',
                success: res => {
                  setTimeout(function () {
                    wx.navigateTo({
                      url: '/pages/noticeuser/index',
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


  onLoad: function (options) {
    notice.doc(options.id).get({
      success: res => {
        wx.showToast({
          title: '加载成功了！',
          image: '../../icons/cute.png'
        })
        this.setData({
          tasks: res.data
        })
      },
      fail: err => {
        wx.showToast({
          title: '加载失败了！',
          image: '../../icons/sob.png'
        })
      }
    });
    if (options.user == "manager") {
      this.setData({
        show: true
      })
    }
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