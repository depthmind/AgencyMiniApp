//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isNotAuthorized: null,
    offset: 0,
    rows: 5, //主体内容一次加载行数
    adOffset: 0,
    recommendOffset: 0,
    publishOffset: 0,
    agencyOffset: 0,
    currentProvince: "北京",
    currentCity: "北京",
    currentArea: "朝阳区",
    isCooperation: true,
    ads: [{ "agencyName": "加华印象", "id": 1, "logoImagePath": "http://47.105.169.49/Agency/attachment/upload/155164247199297de0f6cb4ee2a9877a.jpg", "seachValue": "" }, { "agencyName": "中信旅行4", "id": 5, "logoImagePath": "http://47.105.169.49/Agency/attachment/upload/155164247199297de0f6cb4ee2a9877a.jpg", "seachValue": "" }, { "agencyName": "测试商家", "id": 30, "logoImagePath": "http://47.105.169.49/Agency/attachment/upload/1551172519.jpg", "seachValue": "" }],
    agencyList: [{ "address": "北京市朝阳区", "agencyName": "加华印象", "city": "北京", "createTime": 1550644191000, "distance": "8514.0米", "email": "123@123.com", "id": 1, "isCooperation": 0, "isDel": 0, "latitude": "39.9075635785", "logoImagePath": "http://47.105.169.49/Agency/attachment/upload/10000000001.jpg", "longitude": "116.4688968606", "mobilephone": "1312000888", "seachValue": "", "sysUserName": "加华印象", "sysUserPassword": "123456", "updateTime": 1550644193000, "wechatImagePath": "http://47.105.169.49/Agency/attachment/upload/10000000001.jpg" }, { "address": "北京朝阳区", "agencyName": "中信旅行1", "city": "北京", "createTime": 1550645115000, "distance": "8514.0米", "id": 2, "isCooperation": 1, "isDel": 0, "latitude": "39.9075635785", "logoImagePath": "http://47.105.169.49/Agency/attachment/upload/10000000001.jpg", "longitude": "116.4688968606", "mobilephone": "1231231232", "seachValue": "", "sysUserName": "中信", "sysUserPassword": "123456", "updateTime": 1550645117000, "wechatImagePath": "http://47.105.169.49/Agency/attachment/upload/1551136298.jpg" }, { "address": "北京朝阳区", "agencyName": "中信旅行2", "city": "北京", "createTime": 1550645115000, "distance": "8514.0米", "email": "", "id": 3, "isCooperation": 1, "isDel": 0, "latitude": "39.9075635785", "logoImagePath": "http://47.105.169.49/Agency/attachment/upload/10000000001.jpg", "longitude": "116.4688968606", "mobilephone": "1231231232", "openId": "", "seachValue": "", "sysUserName": "中信", "sysUserPassword": "123456", "updateTime": 1550645117000, "wechatImagePath": "http://47.105.169.49/Agency/attachment/upload/1551136298.jpg" }, { "address": "北京朝阳区", "agencyName": "中信旅行3", "city": "北京", "createTime": 1550645115000, "distance": "8514.0米", "email": "", "id": 4, "isCooperation": 1, "isDel": 0, "latitude": "39.9075635785", "logoImagePath": "http://47.105.169.49/Agency/attachment/upload/10000000001.jpg", "longitude": "116.4688968606", "mobilephone": "1231231232", "openId": "", "seachValue": "", "sysUserName": "中信", "sysUserPassword": "123456", "updateTime": 1550645117000, "wechatImagePath": "http://47.105.169.49/Agency/attachment/upload/1551136298.jpg" }, { "address": "北京朝阳区", "agencyName": "中信旅行4", "city": "北京", "createTime": 1550645115000, "distance": "8514.0米", "email": "", "id": 5, "isCooperation": 1, "isDel": 0, "latitude": "39.9075635785", "logoImagePath": "http://47.105.169.49/Agency/attachment/upload/10000000001.jpg", "longitude": "116.4688968606", "mobilephone": "1231231232", "openId": "", "seachValue": "", "sysUserName": "中信", "sysUserPassword": "123456", "updateTime": 1550645117000, "wechatImagePath": "http://47.105.169.49/Agency/attachment/upload/1551136298.jpg" }],
    recommends: [{ "agencyId": 1, "agencyName": "加华印象", "goodsDescription": "凡客 1 帆布鞋", "goodsName": "凡客帆布鞋", "goodsPic": ["http://47.105.169.49/Agency/attachment/upload/10000000001.jpg", "http://47.105.169.49/Agency/attachment/upload/10000000002.jpg", "http://47.105.169.49/Agency/attachment/upload/10000000003.jpg"], "id": 8, "productId": 1, "productName": "鞋子" }, { "agencyId": 2, "agencyName": "中信旅行1", "goodsDescription": "adidas boost 1", "goodsName": "adidas boost", "goodsPic": ["http://47.105.169.49/Agency/attachment/upload/10000000001.jpg", "http://47.105.169.49/Agency/attachment/upload/10000000002.jpg", "http://47.105.169.49/Agency/attachment/upload/10000000003.jpg"], "id": 7, "productId": 1, "productName": "鞋子" }, { "agencyId": 1, "agencyName": "加华印象", "goodsDescription": "匡威 1 帆布鞋", "goodsName": "匡威帆布鞋", "goodsPic": ["http://47.105.169.49/Agency/attachment/upload/10000000001.jpg", "http://47.105.169.49/Agency/attachment/upload/10000000002.jpg", "http://47.105.169.49/Agency/attachment/upload/10000000003.jpg"], "id": 6, "productId": 1, "productName": "鞋子" }, { "agencyId": 1, "agencyName": "加华印象", "goodsDescription": "牙牙乐 3 牙刷", "goodsName": "中信 牙牙乐牙刷", "goodsPic": ["http://47.105.169.49/Agency/attachment/upload/10000000001.jpg", "http://47.105.169.49/Agency/attachment/upload/10000000002.jpg", "http://47.105.169.49/Agency/attachment/upload/10000000003.jpg"], "id": 5, "productId": 2, "productName": "牙刷" }],
    tabs: [{ "chinese": "陈列", "seachValue": "", "value": "1" }, { "chinese": "优惠", "seachValue": "", "value": "2" }, { "chinese": "优惠", "seachValue": "", "value": "3" }, { "chinese": "优惠", "seachValue": "", "value": "4" }, { "chinese": "优惠", "seachValue": "", "value": "5" }],
    tabType: 1, //1-agency,2-publish
    currentTab: -1, //-1-附近二批,1~n-publish
    publishList: [{ "category": "租车", "city": "北京", "description": "出租东风雪铁龙轿车一辆，每日200元", "id": 1, "images": ["http://47.105.169.49/Agency/attachment/upload/10000000003.jpg", "http://47.105.169.49/Agency/attachment/upload/10000000002.jpg"], "location": "39.9075635785,116.4688968606", "mobilephone": "13888888888", "seachValue": "" }, { "category": "卖车", "city": "北京", "description": "出售东风雪铁龙轿车一辆，100000元", "id": 2, "images": ["http://47.105.169.49/Agency/attachment/upload/10000000003.jpg", "http://47.105.169.49/Agency/attachment/upload/10000000002.jpg"], "location": "39.9049958097,116.6331768036", "mobilephone": "13889998888", "seachValue": "" }, { "category": "0", "city": "北京", "description": "12", "id": 3, "mobilephone": "13641716360", "seachValue": "" }],
    currentLatitude: 39.90469,
    currentLongitude: 116.40717,
    adsImage1: '/images/ad1.jpg',
    adsImage2: '/images/ad2.jpg',
    labaImage: '/images/laba.jpg',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //授权
    if (app.globalData.isNotAuthorized == null) {
      console.log("app.globalData.isNotAuthorized is null")
      app.getSettingCallback = isNotAuthorized => {
        console.log("app.getSettingCallback is defind")
        if (isNotAuthorized != null) {
          that.setData({
            isNotAuthorized: app.globalData.isNotAuthorized
          })
        }
      }
    }
    console.log("buy_onLoad before setData isNotAuthorized=" + that.data.isNotAuthorized)
    that.setData({
      isNotAuthorized: app.globalData.isNotAuthorized
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      },
    })
    // wx.authorize({
    //   scope: 'scope.userLocation',
    //   success(res) {
    //     wx.getLocation({
    //       type: 'wgs84',
    //       success(res) {
    //         const latitude = res.latitude
    //         const longitude = res.longitude
    //         const speed = res.speed
    //         const accuracy = res.accuracy
    //         console.log("latitude = " + latitude)
    //         console.log("longitude = " + longitude)
    //         wx.setStorageSync("latitude", latitude)
    //         wx.setStorageSync("longitude", longitude)
    //         console.log("speed = " + speed)
    //         console.log("accuracy = " + accuracy)
    //         wx.request({
    //           url: 'https://apis.map.qq.com/ws/geocoder/v1/?key=EBNBZ-ELC64-536UJ-XGRBP-FTFGK-OZBMF&location=' + latitude + ',' + longitude,
    //           success(locationRes) {
    //             console.log("location_res")
    //             console.log(locationRes)
    //             that.setData({
    //               currentLatitude: latitude,
    //               currentLongitude: longitude,
    //               //currentArea: locationRes.data.result.address_component.district,
    //               //currentCity: locationRes.data.result.address_component.city,
    //               //currentProvince: locationRes.data.result.address_component.province
    //             })
    //           }
    //         })
    //       }
    //     })
    //   },
    //   fail() {},
    //   complete() {
    //     //获取轮播图
    //     that.getAds()

    //     //获取推荐
    //     that.getRecommends()


    //     //获取scroll-view-tabs
    //     wx.request({
    //       url: 'http://localhost:8080/Agency/parameter/findParameter.do',
    //       data: {
    //         paraDomain: "product.category"
    //       },
    //       success(tabRes) {
    //         that.setData({
    //           tabs: tabRes.data
    //         })
    //         console.log("tabRes")
    //         console.log(tabRes)
    //       }
    //     })

    //     //根据tab类型加载内容
    //     that.getContents()

        
    //   }
    // })
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    wx.setNavigationBarTitle({
      title: '首页',
    })
    //that.login()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //根据tab类型加载内容
    this.getContents()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //点击搜索框跳转搜索页面
  navigateToSearchPage: function() {
    console.log('search page')
    wx.navigateTo({
      url: '../search/search'
    })
  },

  //跳转修改定位页面
  changeLocation: function() {
    console.log('location page')
    wx.navigateTo({
      url: '../location/location?currentProvince=' + this.data.currentProvince + '&currentCity=' + this.data.currentCity + '&currentArea=' + this.data.currentArea
    })
  },

  tapTab: function(e) {
    console.log("tapTab:" + e.currentTarget.dataset.tabId)
    console.log(e.currentTarget.dataset.tabId)
    this.setData({
      currentTab: e.currentTarget.dataset.tabId
    })
    if (e.currentTarget.dataset.tabId == '-1') {
      this.setData({
        tabType: 1
      })
    } else {
      this.setData({
        tabType: 2,
        
      })
    }
    console.log("tabType=" + this.data.tabType)
    console.log("currentTab:" + this.data.currentTab)
    this.getContents(this.data.tabType)
  },


  //获取轮播图信息
  getAds: function(e) {
    var that = this
    wx.request({
      url: 'http://localhost:8080/Agency/agency/findAdAgency.do',
      data: {
        offset: this.data.adOffset,
        rows: 4,
        province: that.data.currentProvince,
        city: that.data.currentCity,
        area: that.data.currentArea
      },
      success(adRes) {
        console.log("adRes")
        console.log(adRes)
        that.setData({
          ads: adRes.data
        })
      }
    })
  },

  //获取推荐产品
  getRecommends: function() {
    var that = this
    wx.request({
      url: 'http://localhost:8080/Agency/goods/getGoods.do',
      data: {
        isTop: 1,
        offset: this.data.recommendOffset,
        rows: 4,
        province: that.data.currentProvince,
        city: that.data.currentCity,
        area: that.data.currentArea
      },
      success(recommendRes) {
        console.log("recommendRes")
        console.log(recommendRes)
        var recommends = recommendRes.data
        for (var i = 0; i < recommends.length; i++) {
          if (recommends[i].goodsPic != undefined) {
            recommends[i].goodsPic = recommends[i].goodsPic.split(",")
          }
        }
        that.setData({
          recommends: recommends
        })
        that.setData({
          recommendOffset: that.data.recommendOffset + 4
        })
      }
    })
  },

  //获取主页主体内容
  getContents: function() {
    var that = this
    var tabType = that.data.tabType
    switch (tabType) {
      case 1:   //获取agency
      that.getAgency()
      break;
      case 2:   //获取publish
      that.getPublish()
      break;
      default:  //error
      break;
    }
  },

  //获取附近二批
  getAgency: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    console.log(that.data.currentLat)


    wx.request({
      url: 'http://localhost:8080/Agency/agency/findAgencyBase.do',
      data: {
        offset: that.data.agencyOffset,
        limit: that.data.rows,
        city: that.data.location,
        currentLat: that.data.currentLatitude,
        currentLon: that.data.currentLongitude,
        province: that.data.currentProvince,
        city: that.data.currentCity,
        area: that.data.currentArea
      },
      success(agencyRes) {
        console.log("agencyRes")
        console.log(agencyRes)
        var agency = agencyRes.data
        if (agency.length < 1) {
          wx.showToast({
            title: '没有了。。。',
            icon: "none"
          })
        } else {
          that.setData({
            agencyList: that.data.agencyList.concat(agency)
          })
          that.setData({
            agencyOffset: that.data.agencyOffset + that.data.rows
          })
          console.log("offset")
          console.log(that.data.offset)
        }
      },
      fail() {
        wx.showToast({
          title: '请检查网络。。。',
          icon: "none"
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },

  //获取发布信息
  getPublish: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: 'http://localhost:8080/Agency/publish/getPublish.do',
      data: {
        offset: that.data.publishOffset,
        rows: that.data.rows,
        province: that.data.currentProvince,
        paraId: that.data.currentTab,
        city: that.data.currentCity,
        area: that.data.currentArea
      },
      success(publishRes) {
        console.log("publishRes")
        console.log(publishRes)
        var publish = publishRes.data
        if (publish.length < 1) {
          wx.showToast({
            title: '没有了。。。',
            icon: "none"
          })
        } else {
          for (var i = 0; i < publish.length; i++) {
            if (publish[i].images != undefined) {
              publish[i].images = publish[i].images.split(",")
            }
          }

          console.log("publishRes111")
          console.log(publishRes)
          that.setData({
            publishList: that.data.publishList.concat(publish)
          })
          that.setData({
            publishOffset: that.data.publishOffset + that.data.rows
          })
          console.log("offset")
          console.log(that.data.offset)
        }
      },
      fail() {
        wx.showToast({
          title: '请检查网络。。。',
          icon: "none"
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isNotAuthorized 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isNotAuthorized: false
      });
      wx.login({
        success: res => {
          console.log(res)
          //获取用户信息
          wx.getUserInfo({
            success(userRes) {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              if (app.globalData.openId == null || app.globalData.openId == '') {
                if (res.code) {
                  wx.request({
                    url: 'http://localhost:8080/Agency/wechat/getUnionId.do?jsCode=' + res.code + '&iv=' + userRes.iv + '&encryptedData=' + userRes.encryptedData,
                    success(loginRes) {
                      console.log(loginRes)
                      var userInfo = loginRes.data
                      app.globalData.userInfo = userInfo
                      wx.setStorageSync('userInfo', userInfo)
                      app.globalData.openId = userInfo.openId
                    }
                  })
                  console.log("success")
                } else {
                  console.log("fail" + res.errMsg)
                }
              }

            }
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isNotAuthorized 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  
  login: function () {
    wx.login({
      success: res => {
        console.log(res)
        //获取用户信息
        wx.getUserInfo({
          success(userRes) {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (app.globalData.openId == null || app.globalData.openId == '') {
              if (res.code) {
                wx.request({
                  url: 'http://localhost:8080/Agency/wechat/getUnionId.do?jsCode=' + res.code + '&iv=' + userRes.iv + '&encryptedData=' + userRes.encryptedData,
                  success(loginRes) {
                    console.log(loginRes)
                    var userInfo = loginRes.data
                    app.globalData.userInfo = userInfo
                    wx.setStorageSync('userInfo', userInfo)
                    app.globalData.openId = userInfo.openId
                  }
                })
                console.log("success")
              } else {
                console.log("fail" + res.errMsg)
              }
            }

          }
        })
      }
    })
  }
})