//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    offset: 0,
    rows: 5,
    scrollHeight: 0,
    scrollTop: 0,
    location: "正在定位...",
    isCooperation: true,
    ads: [],
    recommends: [],
    tabs: [],
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
    //获取轮播图信息
    wx.request({
      url: 'http://localhost:8080/Agency/agency/findAdAgency.do',
      success(adRes) {
        console.log(adRes)
      }
    })

    //获取推荐产品
    wx.request({
      url: 'http://localhost:8080/Agency/goods/getGoods.do',
      data: {
        isTop: 1,
        offset: 0,
        rows: 4
      },
      success(recommendRes) {
        console.log("recommendRes")
        console.log(recommendRes)
        that.setData({
          recommends: recommendRes.data
        })
      }
    })

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
      }
    })

    //获取所有商品--分页 0-10
    wx.request({
      url: 'http://localhost:8080/Agency/publish/getPublish.do',
      data: {
        offset: that.data.offset,
        rows: that.data.rows
      },
      success(publishRes) {
        console.log("publishRes")
        console.log(publishRes)
        var publish = publishRes.data
        for (var i = 0; i < publish.length; i++) {
          publish[i].images = publish[i].images.split(",")
        }
        that.setData({
          publishList: publish
        })
        that.setData({
          offset: that.data.offset + that.data.rows
        })
        console.log("offset")
        console.log(that.data.offset)
        console.log(that.data.offset)
      }
    })
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
    var that = this;
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: 'http://localhost:8080/Agency/publish/getPublish.do',
      data: {
        offset: that.data.offset,
        rows: that.data.rows
      },
      success(morePublishRes) {
        console.log("morePublish")
        console.log(morePublishRes)

        if (morePublishRes.data.length < 1) {
          wx.showToast({
            title: '没有了。。。',
            icon: "none"
          })
        } else {

          var publishList = that.data.publishList;
          for (var i = 0; i < morePublishRes.data.length; i++) {
            publishList.push(morePublishRes.data[i])
          }
          that.setData({
            publishList: publishList
          })
          that.setData({
            offset: that.data.offset + that.data.rows
          })
        }
      },
      fail: {

      },
      complete() {
        wx.hideLoading()
      }
    })
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
    wx.navigateTo({
      url: '../search/search'
    })
  },

  //跳转修改定位页面
  changeLocation: function() {
    wx.navigateTo({
      url: '../location/location?currentProvince=' + this.data.currentProvince + '&currentCity=' + this.data.currentCity + '&currentDistrict=' + this.data.currentDistrict
    })
  }

})