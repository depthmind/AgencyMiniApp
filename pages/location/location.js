// pages/location/location.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk = new QQMapWX({
  key: 'EBNBZ-ELC64-536UJ-XGRBP-FTFGK-OZBMF' // 必填
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    provices: [1, 2, 3],
    cities: [],
    districts: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy

        qqmapsdk.getCityList({ //获取城市列表
          success: function(citiesListRes) {
            console.log('citiesListRes');
            console.log(citiesListRes)
            var provinces = citiesListRes.result[0]
            var cities = citiesListRes.result[1]
            var districts = citiesListRes.result[2]
            wx.setStorageSync("provinces", provinces)
            console.log(wx.getStorageSync("provinces"))
            wx.setStorageSync("cities", cities)
            console.log(wx.getStorageSync("cities"))
            wx.setStorageSync("districts", districts)
            console.log(wx.getStorageSync("districts"))
            that.setData({
              provices: wx.getStorageSync("provinces"),
              cities: wx.getStorageSync("cities"),
              districts: wx.getStorageSync("districts")
            })
          }
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  bindChange(e) {
    var that = this
    const val = e.detail.value
    var provinceIndex = val[0]
    var cityIndex = val[1]
    var areaIndex = val[2]
    var province = wx.getStorageSync("provinces")[provinceIndex]
    var provinceId = province.id
    if (provinceIndex != that.data.provinceIndex) {
      if (provinceId == "110000" || provinceId == "120000" || provinceId == "310000" || provinceId == "500000" ||
        provinceId == "810000" || provinceId == "820000") {
        var id = provinceId.slice(0, 2)
        var citys = wx.getStorageSync("citys")
        var tmp = new Array(); //city
        for (var i = 0; i < citys.length; i++) {
          var start = citys[i].id.slice(0, 2)
          if (start == id) {
            tmp.push(citys[i])
          }
        }
        var provinceArr = []
        provinceArr.push(province)
        that.setData({
          city: provinceArr,
          area: tmp
        })
        that.data.provinceIndex = provinceIndex
        that.data.cityIndex = cityIndex
        return;
      }
      var id = provinceId.slice(0, 2)
      var citys = wx.getStorageSync("citys")
      var tmp = new Array(); //city
      for (var i = 0; i < citys.length; i++) {
        var start = citys[i].id.slice(0, 2)
        if (start == id) {
          tmp.push(citys[i])
        }
      }
      qqmapsdk.getDistrictByCityId({
        // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
        id: tmp[cityIndex].id, //对应接口getCityList返回数据的Id，如：北京是'110000'
        success: function(res) { //成功后的回调
          console.log(res);
          console.log('对应城市ID下的区县数据(以北京为例)：', res.result[0]);
          that.setData({
            city: tmp,
            area: res.result[0]
          })
          //wx.setStorageSync("area", citys) 查询之后存储，下次就不通过网络查询了
        },
        fail: function(error) {
          console.error(error);
        },
        complete: function(res) {
          console.log(res);
        }
      });
    }
    if (cityIndex != that.data.cityIndex) {
      var id = provinceId.slice(0, 2)
      var citys = wx.getStorageSync("citys")
      var tmp = new Array(); //city
      for (var i = 0; i < citys.length; i++) {
        var start = citys[i].id.slice(0, 2)
        if (start == id) {
          tmp.push(citys[i])
        }
      }
      qqmapsdk.getDistrictByCityId({
        // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
        id: tmp[cityIndex].id, //对应接口getCityList返回数据的Id，如：北京是'110000'
        success: function(res) { //成功后的回调
          console.log(res);
          console.log('对应城市ID下的区县数据(以北京为例)：', res.result[0]);
          that.setData({
            area: res.result[0]
          })
          //wx.setStorageSync("area", citys) 查询之后存储，下次就不通过网络查询了
        },
        fail: function(error) {
          console.error(error);
        },
        complete: function(res) {
          console.log(res);
        }
      });
    }
    console.log(val)
    that.data.provinceIndex = provinceIndex
    that.data.cityIndex = cityIndex
  }
})