//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res.userInfo)
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //     if (!res['scope.record']) {
    //       // 设置询问
    //       wx.authorize({
    //         scope: 'scope.userLocation',
    //         success(res) {
    //           wx.getLocation({
    //             type: 'wgs84',
    //             success(res) {
    //               const latitude = res.latitude
    //               const longitude = res.longitude
    //               const speed = res.speed
    //               const accuracy = res.accuracy
    //               wx.request({
    //                 url: 'https://apis.map.qq.com/ws/geocoder/v1/?key=JBEBZ-3HSCI-XYMGH-5IN3V-FLYDT-LRFEU&location=' + latitude + ',' + longitude,
    //                 success(res) {
    //                   console.log(res)
    //                 }
    //               })
    //             }
    //           })    
    //         },
    //         fail() { },
    //         complete() { }
    //       })
    //     }
    //   }
    // })
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          console.log("before getSetting isNotAuthorized=" + that.globalData.isNotAuthorized)
          that.globalData.isNotAuthorized = false;
          console.log("getSetting isNotAuthorized=" + that.globalData.isNotAuthorized)
          if (that.getSettingCallback != null) {
            that.getSettingCallback(that.globalData.isNotAuthorized)
          }
        } else {
          console.log('scope.userInfo_fuck')
          that.globalData.isNotAuthorized = true;
          console.log('scope.userInfo_fucked')
          if (that.getSettingCallback) {
            console.log('scope.userInfo_else_callback')
            that.getSettingCallback(that.globalData.isNotAuthorized)
          }
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    isNotAuthorized: null,
    openId: null,
    userBetSites: null,
    operatePlatformUrl: "http://192.168.2.146:6022/",
    entNum: "20190831001"
  }
})