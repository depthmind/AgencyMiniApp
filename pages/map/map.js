// pages/map/map.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk = new QQMapWX({
  key: 'EBNBZ-ELC64-536UJ-XGRBP-FTFGK-OZBMF' // 必填
})
var longitude = wx.getStorageSync("longitude")
var latitude = wx.getStorageSync("latitude")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '位置'  //修改title
    })
    var that = this
    qqmapsdk.reverseGeocoder({
        //位置坐标，默认获取当前位置，非必须参数
      location: latitude + ',' + longitude, //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
      //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
      success: function (res) {//成功后的回调
          console.log(res);
          var address = res.result.address;
          that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
            currentLocation: address
          });
      },
      fail: function (error) {
          console.error(error);
      },
      complete: function (res) {
          console.log(res);
      }
    })
    that.setData({
      longitude: longitude,
      latitude: latitude
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  searchAddress: function(e) {
    var temp = 0
    var cursor = e.detail.cursor
    if (cursor == 0) { //cursor等于0说明拼音输入未完成，不允许进行搜索
      console.log("cursor is 0")
      return;
    }
    if (temp == cursor) { //temp等于cursor说明拼音输入未完成，不允许进行搜索
      console.log("temp = cursor")
      return;
    }
    temp = cursor
    var keyword = e.detail.value.trim()
    if (null == keyword || keyword == '') {
      console.log("keyword is null")
      return;
    }
    var that = this;
    // 调用接口
    qqmapsdk.search({
      keyword: keyword,  //搜索关键词
      location: latitude + ',' + longitude,  //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var addresses = []
        for (var i = 0; i < res.data.length; i++) {
          addresses.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            address: res.data[i].address,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "/images/address.png", //图标路径
            width: 20,
            height: 20
          })
        }
        console.log(addresses)
        that.setData({ //设置markers属性，将搜索结果显示在地图中
          addresses: addresses
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  confirmAddress: function(e) {
    var pages = getCurrentPages(); // 获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    prevPage.setData({
      addressDetail: e._relatedInfo.anchorRelatedText
    })
    wx.navigateBack({
      delta: 1
    })
  }
})