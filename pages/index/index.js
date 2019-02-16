//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    location: "正在定位...",
    "bnrUrl": [{
      "url": "images/1.jpg"
    }, {
      "url": "images/2.jpg"
    }, {
      "url": "images/3.jpg"
    }],
    recommends: [{
      "id": 1,
      "name": "recommendName1",
      "content": "recommendContent1"
    }, {
      "id": 2,
      "name": "recommendName2",
      "content": "recommendContent2"
    }, {
      "id": 3,
      "name": "recommendName3",
      "content": "recommendContent3"
    }],
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
    infoList: [{
      "id": "1",
      "name": "name1",
      "content": "content1"
    }, {
      "id": "2",
      "name": "name2",
      "content": "content2"
    }, {
      "id": "3",
      "name": "name3",
      "content": "content3"
    }, {
      "id": "4",
      "name": "name4",
      "content": "content4"
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
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
  }


})