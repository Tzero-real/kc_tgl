// 初始化数据库
const db = wx.cloud.database();
const kc = db.collection('kc_form');

Page({


  data: {
    tasks: [],
    showId: 1,
    showteacher: 1,
    filetitle: "",
    filePath: "",
    fileID: "",
    title: "未修改",
    img3: "",
    img2: "",
    img1: "",
    fileList: [],
    delfile: []
  },
  pageData: {
    id: "",
    fileIDList: [],
    name: "没有获取到，请联系开发者/科创人员！"
  },

  // 添加照片
  afterRead(event) {
    const {
      file
    } = event.detail;
    console.log(file)
    this.setData({
      fileList: file
    });

    wx.cloud.deleteFile({
      fileList: this.pageData.fileIDList
    })

    wx.cloud.deleteFile({
      fileList:this.data.delfile
    })

    // 上传图片到数据库
    for (let i = 0; i < this.data.fileList.length; i++) {
      wx.cloud.uploadFile({
        cloudPath: "img/" + `${Math.floor(Math.random()*9999999)}.jpg`,
        filePath: this.data.fileList[i].path,
        success: res => {
          this.pageData.fileIDList.push(res.fileID)
          wx.showToast({
            title: '图片上传成功！',
            image: '../../icons/cute.png'
          })
        },
        fail: err => {
          wx.showToast({
            title: '图片上传失败！',
            image: '../../icons/sob.png'
          })
        }
      })
    }
  },


  // 点击审核文件按钮
  onReview: function () {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.downloadFile({
      fileID: this.data.fileID,
      success: res => {
        console.log(res)
        wx.openDocument({
          filePath: res.tempFilePath,
          success: res => {
            wx.showToast({
              title: '加载成功！',
              image: '../../icons/cute.png'
            })
          },
          fail: err => {
            wx.showToast({
              title: '加载失败！',
              image: '../../icons/fail.png'
            })
            console.log(err)
          }
        })
      },
      fail: err => {
        wx.showToast({
          title: '加载失败！',
          image: '../../icons/fail.png'
        })
        console.log(err)
      }
    })
  },


  // 点击下载文件按钮
  onDownload: function () {
    wx.showLoading({
      title: '下载中...',
    })
    wx.cloud.getTempFileURL({
      fileList: [this.data.fileID],
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



  // 已通过修改评语和发送订阅消息
  onSuccess: function (event) {
    wx.showLoading({
      title: "传递中..."
    })
    try {
      for (let i = 0; i < this.data.delfile.length; i++) {
        wx.cloud.deleteFile({
          fileList: [this.data.delfile[i]],
        })
      }
    } catch {
      kc.doc(this.data.tasks._id)
        .update({
          data: {
            tagType: "success",
            tag: "已通过",
            title: "未修改",
            correct: '已通过审核，请打印后送至特教大楼！审核人:' + this.pageData.name + ',如有疑问请直接联系此人！',
            fileIDList: null
          },
          success: res => {
            wx.showToast({
              title: '传递成功啦！',
              image: "../../icons/cute.png",
            });
            wx.cloud.callFunction({
              name: 'sub',
              data: {
                id: this.data.tasks._id,
                name: this.data.tasks.name,
                head: this.data.tasks.head,
                openId: this.data.tasks._openid,
                tag: "已通过",
                correct: '已通过审核，请打印后送至特教大楼！'
              },
              success: res => {
                wx.showToast({
                  title: '发布成功啦！',
                  image: "../../icons/success.png",
                });
              },
              fail: err => {
                console.log(err)
                wx.showToast({
                  title: '发布失败了！',
                  image: "../../icons/sob.png",
                });
              }
            })
          },
          fail: err => {
            console.log(err)
            wx.showToast({
              title: '传递失败了！',
              image: "../../icons/sob.png",
            });
          }
        })

    }



    kc.doc(this.data.tasks._id)
      .update({
        data: {
          tagType: "success",
          tag: "已通过",
          title: "未修改",
          correct: '已通过审核，请打印后送至特教大楼！审核人：' + this.pageData.name + ',如有疑问请直接联系此人！',
          fileIDList: null
        },
        success: res => {
          wx.showToast({
            title: '传递成功啦！',
            image: "../../icons/cute.png",
          });
          wx.cloud.callFunction({
            name: 'sub',
            data: {
              id: this.data.tasks._id,
              name: this.data.tasks.name,
              head: this.data.tasks.head,
              openId: this.data.tasks._openid,
              tag: "已通过",
              correct: '已通过审核，请打印后送至特教大楼！'
            },
            success: res => {
              wx.showToast({
                title: '发布成功啦！',
                image: "../../icons/success.png",
              });
            },
            fail: err => {
              console.log(err)
              wx.showToast({
                title: '发布失败了！',
                image: "../../icons/sob.png",
              });
            }
          })
        },
        fail: err => {
          console.log(err)
          wx.showToast({
            title: '传递失败了！',
            image: "../../icons/sob.png",
          });
        }
      })

  },

  // 有错误提交表单
  onSubmit: function (event) {
    wx.showLoading({
      title: "传递中..."
    })

    console.log(event)
    kc.doc(this.data.tasks._id)
      .update({
        data: {
          tagType: "danger",
          tag: "有错误",
          title: "未修改",
          correct: event.detail.value.correct + "~审核人：" + this.pageData.name + "，如有疑问请直接联系此人！",
          fileIDList: this.pageData.fileIDList
        },
        success: res => {
          wx.showToast({
            title: '传递成功啦！',
            image: "../../icons/cute.png",
          });
        },
        fail: err => {
          console.log(err)
          wx.showToast({
            title: '传递失败了！',
            image: "../../icons/sob.png",
          });
        }
      })
  },
  // 有错误提交2
  onfail: function () {

    wx.cloud.callFunction({
      name: 'sub',
      data: {
        id: this.data.tasks._id,
        name: this.data.tasks.name,
        head: this.data.tasks.head,
        openId: this.data.tasks._openid,
        tag: "有错误",
        correct: '请按照评语尽快修改，再次提交！'
      },
      success: res => {
        wx.showToast({
          title: '发布成功啦！',
          image: "../../icons/success.png",
        });
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '发布失败了！',
          image: "../../icons/sob.png",
        });
      }
    })
  },

  // 返回跳转
  onback: function () {
    wx.navigateBack()
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
            showteacher: parseInt(res.data.showteacher),
            filetitle: res.data.filetitle,
            filePath: res.data.filePath,
            fileID: res.data.fileID,
            title: res.data.title,
            delfile: res.data.fileIDList
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
      // 拿到操作员名字
    this.pageData.name = options.name
  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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