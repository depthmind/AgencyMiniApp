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
    "bnr": [{
      "id": "1",
      "name": "name1",
      "url": "images/1.jpg"
    }, {
      "id": "2",
      "name": "name2",
      "url": "images/2.jpg"
    }, {
      "id": "3",
      "name": "name3",
      "url": "images/3.jpg"
    }],
    recommends: [],
    infoTypes: [{
      "id": "1",
      "name": "infoType1"
    }, {
      "id": "2",
      "name": "infoType2"
    }, {
      "id": "3",
      "name": "infoType3"
    }, {
      "id": "4",
      "name": "infoType4"
    }],
    allGoodsList: []
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '首页',
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
              success(res) {
                console.log(res)
              }
            })
          }
        })
      },
      fail() {},
      complete() {}
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    //获取推荐产品
    wx.request({
      url: 'http://localhost:8080/Agency/goods/getGoods.do',
      data: {
        isTop: 1,
        offset: 0,
        rows: 3
      },
      success(recommendRes){
        console.log("recommendRes")
        console.log(recommendRes)
        that.setData({
          recommends: recommendRes.data
        })
      }
    })
    //获取所有商品--分页 0-10
    wx.request({
      url: 'http://localhost:8080/Agency/goods/getGoods.do',
      data: {
        offset: 0,
        rows: 5
      },
      success(allGoodsRes) {
        console.log("allGoodsRes")
        console.log(allGoodsRes)
        that.setData({
          allGoodsList: allGoodsRes.data
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
      url: 'http://localhost:8080/Agency/goods/getGoods.do',
      data: {
        offset: that.data.offset,
        rows: that.data.rows
      },
      success(moreGoodsRes) {
        console.log("moreGoods")
        console.log(moreGoodsRes)

        if (moreGoodsRes.data.length < 1) {
          wx.showToast({
            title: '没有了。。。',
            icon: "none"
          })
        } else {

        var infoList = that.data.allGoodsList;
        for (var i = 0; i < moreGoodsRes.data.length; i++) {
          infoList.push(moreGoodsRes.data[i])
        }
        that.setData({
          allGoodsList: infoList
        })
        that.setData({
          offset: that.data.offset + that.data.rows
        })}
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


  //滑动切换 
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换 
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  //点击搜索框跳转搜索页面
  navigateToSearchPage: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },

})