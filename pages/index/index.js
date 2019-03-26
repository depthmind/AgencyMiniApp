//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isNotAuthorized: null,
    rows: 5, //主体内容一次加载行数
    adOffset: 0,
    recommendOffset: 0,
    publishOffset: 0,
    agencyOffset: 0,
    changeLocationFlag: false,
    currentProvince: "",
    currentCity: "",
    currentArea: "",
    isCooperation: true,
    ads: [],
    agencyList: [],
    recommends: [],
    tabs: [],
    tabType: 1, //1-agency,2-publish
    currentTab: -1, //-1-附近二批,1~n-publish
    publishList: [],
    currentLatitude: 39.90469,
    currentLongitude: 116.40717,
    adsImage1: '/images/ad1.jpg',
    adsImage2: '/images/agency-list.jpg',
    labaImage: '/images/laba.jpg'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    this.beforeEverything()

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
    if (this.data.changeLocationFlag) {
      this.setData({
        recommendOffset: 0,
        recommends: [],
        agencyOffset: 0,
        agencyList: [],
        publishOffset: 0,
        publishList: [],
        changeLocationFlag: false
      })
      this.init()
    }
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
        tabType: 1, //agency
        agencyOffset: 0, //重头获取agency
        agencyList: []
      })
    } else {
      this.setData({
        tabType: 2, //publish
        publishOffset: 0, //重头获取publish
        publishList: []
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
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAdAgency.do',
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
      url: 'https://www.caoxianyoushun.com:8443/Agency/goods/getGoods.do',
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
        if (recommends.length > 0 || that.data.recommendOffset == 0) {  //判断offset，防止一条数据都没有陷入死循环
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
        } else { //如果recommends换完一波，重头开始
          that.setData({
            recommendOffset: 0
          })
          that.getRecommends()
        }
      }
    })
  },

  //获取主页主体内容
  getContents: function() {
    var that = this
    var tabType = that.data.tabType
    switch (tabType) {
      case 1: //获取agency
        that.getAgency()
        break;
      case 2: //获取publish
        that.getPublish()
        break;
      default: //error
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
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyBase.do',
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
          console.log("agencyOffset")
          console.log(that.data.agencyOffset)
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
      url: 'https://www.caoxianyoushun.com:8443/Agency/publish/getPublish.do',
      //url: 'http://localhost:8080/Agency/publish/getPublish.do',
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
          console.log("publishOffset")
          console.log(that.data.publishOffset)
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

  bindGetUserInfo: function(e) {
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
                    url: 'https://www.caoxianyoushun.com:8443/Agency/wechat/getUnionId.do?jsCode=' + res.code + '&iv=' + userRes.iv + '&encryptedData=' + userRes.encryptedData,
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
        success: function(res) {
          // 用户没有授权成功，不需要改变 isNotAuthorized 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  login: function() {
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
                  url: 'https://www.caoxianyoushun.com:8443/Agency/wechat/getUnionId.do?jsCode=' + res.code + '&iv=' + userRes.iv + '&encryptedData=' + userRes.encryptedData,
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
  },

  redirctToAgencyList: function() {
    wx.switchTab({
      url: '../../pages/agencyList/agencyList',
    })
  },

  openGoods: function(e) {
    console.log(e)
    var goodsId = e.currentTarget.dataset.goodsId
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + goodsId,
    })
  },

  openNearbyAgency: function(e) {
    var agencyId = e.currentTarget.dataset.agencyId
    wx.navigateTo({
      url: '../agencyDetail/agencyDetail?id=' + agencyId,
    })
  },

  redirctToPartner: function() {
    wx.navigateTo({
      url: '../partner/partner',
    })
  },

  beforeEverything: function() {
    var that = this
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
        success: function (res) {
          that.setData({
            scrollHeight: res.windowHeight
          })
        },
      })
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
              wx.setStorageSync("latitude", latitude)
              wx.setStorageSync("longitude", longitude)
              console.log("speed = " + speed)
              console.log("accuracy = " + accuracy)
              wx.request({
                url: 'https://apis.map.qq.com/ws/geocoder/v1/?key=EBNBZ-ELC64-536UJ-XGRBP-FTFGK-OZBMF&location=' + latitude + ',' + longitude,
                success(locationRes) {
                  console.log("location_res")
                  console.log(locationRes)

                  wx.setStorageSync('currentProvince', locationRes.data.result.address_component.province)
                  wx.setStorageSync('currentCity', locationRes.data.result.address_component.city)
                  wx.setStorageSync('currentArea', locationRes.data.result.address_component.district)

                  that.setData({
                    currentLatitude: latitude,
                    currentLongitude: longitude,
                    currentArea: locationRes.data.result.address_component.district,
                    currentCity: locationRes.data.result.address_component.city,
                    currentProvince: locationRes.data.result.address_component.province
                  })
                  that.init()
                }
              })
            }
          })
        },
        fail() { }
      })
  },

  init: function () {
    var that = this;
    //获取轮播图
    that.getAds()

    //获取推荐
    that.getRecommends()


    //获取scroll-view-tabs
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/parameter/findParameter.do',
      data: {
        paraDomain: "product.category"
      },
      success(tabRes) {
        that.setData({
          tabs: tabRes.data
        })
        console.log("tabRes")
        console.log(tabRes)
      }
    })

    //根据tab类型加载内容
    that.getContents()


    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/parameter/findParameter.do',
      data: {
        paraDomain: "index.notice"
      },
      success(res) {
        that.setData({
          notice: res.data[0].chinese
        })
      }
    })
  }
})