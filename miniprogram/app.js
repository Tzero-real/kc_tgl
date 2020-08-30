//app.js
App({
  onLaunch: function (options) {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'tglstudio-key',
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      userInfo: null,
      // 用户唯一标识openId
      openId: null,
      scene:options.scene,
    },

    // 获取组件信息和倒计时信息
    wx.cloud.callFunction({
      name: "getkc_common",
      success: res => {
        getApp().globalData.common=res.result.data[0],
        getApp().globalData.endtime=res.result.data[0].time
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

  }
})