//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
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
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        if (!res['scope.record']) {
          // 设置询问
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              wx.getLocation({
                type: 'wgs84',
                success(res) {
                  const latitude = res.latitude
                  const longitude = res.longitude
                  const speed = res.speed
                  const accuracy = res.accuracy
                  console.log("latitude = " + latitude)
                  console.log("longitude = " + longitude)
                  console.log("speed = " + speed)
                  console.log("accuracy = " + accuracy)
                  wx.request({
                    url: 'https://apis.map.qq.com/ws/geocoder/v1/?key=JBEBZ-3HSCI-XYMGH-5IN3V-FLYDT-LRFEU&location=' + latitude + ',' + longitude,
                    success(res) {
                      console.log(res)
                    }
                  })
                }
              })    
            },
            fail() { },
            complete() { }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})


  // "tabBar":{
  //   "list": [{
  //     "selectedIconPath": "",
  //     "iconPath": "",
  //     "pagePath": "pages/index/index",
  //     "text": "首页" 
  //   },
  //   {
  //     "selectedIconPath": "",
  //     "iconPath": "",
  //     "pagePath": "pages/publish/publish",
  //     "text": "发布"  
  //   },
  //   {
  //     "selectedIconPath": "",
  //     "iconPath": "",
  //     "pagePath": "pages/agency/agency",
  //     "text": "代理商"
  //   },
  //   {
  //     "selectedIconPath": "",
  //     "iconPath": "",
  //     "pagePath": "pages/mine/mine",
  //     "text": "我的"
  //   }]
  // },