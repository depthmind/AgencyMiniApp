//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    offset: 0,
    rows: 5, //主体内容一次加载行数
    adOffset: 0,
    recommendOffset: 0,
    publishOffset: 0,
    location: "正在定位...",
    isCooperation: true,
    ads: [],
    recommends: [],
    tabs: [],
    tabType: 0,
    currentTab: null,
    publishList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
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
                that.setData({
                  //location: locationRes.data.result.address_component.district
                })
              }
            })
          }
        })
      },
      fail() {},
      complete() {}
    })
    var that = this;
    //获取轮播图
    this.getAds()

    //获取推荐
    this.getRecommends()


    //获取scroll-view-tabs
    wx.request({
      url: 'http://localhost:8080/Agency/parameter/findParameter.do',
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

    //获取发布信息
    this.getPublish()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '首页',
    })
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
    switch (this.data.tabType) {
      case 0: //默认 publish
        this.getPublish()
        break;
      case 1: //附近 二批 ？ 是不是同一个东西，如果是就在一起
        break;
      case 2: //scroll-view里的类型
        break;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //点击切换tab
  clickTab: function(e) {
    var that = this;
    console.log(e)
    that.setData({
      offset: 0
    })
    wx.request({
      url: 'http://localhost:8080/Agency/goods/getGoods.do',
      data: {

      }
    })
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
      url: '../location/location'
    })
  },

  tapNearBy: function() {
    this.setData({
      currentTab: -2
    })
    wx.request({
      url: '',
    })
  },

  tap2p: function() {
    this.setData({
      currentTab: -1
    })
    wx.request({
      url: '',
    })
  },

  tapTab: function(e) {
    console.log("tapTab:" + e.currentTarget.dataset.tabId)
    console.log(e.currentTarget.dataset.index)
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
    wx.request({
      url: '',
    })
  },


  //获取轮播图信息
  getAds: function(e) {
    var that = this
    wx.request({
      url: 'http://localhost:8080/Agency/agency/findAdAgency.do',
      data: {
        offset: this.data.adOffset,
        rows: 4
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
        rows: 4
      },
      success(recommendRes) {
        console.log("recommendRes")
        console.log(recommendRes)
        that.setData({
          recommends: recommendRes.data
        })
        that.setData({
          recommendOffset: that.data.recommendOffset + 4
        })
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
        rows: that.data.rows
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
          console.log(publish[2].images)
          for (var i = 0; i < publish.length; i++) {
            if (publish[i].images != undefined) {
              publish[i].images = publish[i].images.split(",")
            }
          }
          that.setData({
            publishList: that.data.publishList.concat(publish)
          })
          that.setData({
            publishOffset: that.data.publishOffset + that.data.rows
          })
          console.log("offset")
          console.log(that.data.offset)
          console.log(that.data.offset)
        }
      },
      fail: {

      },
      complete() {
        wx.hideLoading()
      }
    })
  }


})