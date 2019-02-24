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
    currentProvince: "",
    currentCity: "",
    currentDistrict: "",
    provincesListIndex: 0,
    provincesList: [{
      "id": "420500",
      "name": "宜昌",
      "fullname": "宜昌市",
      "pinyin": [
        "yi",
        "chang"
      ],
      "location": {
        "lat": 30.69186,
        "lng": 111.28642
      },
      "cidx": [
        1473,
        1485
      ]
    },
      {
        "id": "420600",
        "name": "襄阳",
        "fullname": "襄阳市",
        "pinyin": [
          "xiang",
          "yang"
        ],
        "location": {
          "lat": 32.009,
          "lng": 112.12255
        },
        "cidx": [
          1486,
          1494
        ]
      },
      {
        "id": "420700",
        "name": "鄂州",
        "fullname": "鄂州市",
        "pinyin": [
          "e",
          "zhou"
        ],
        "location": {
          "lat": 30.39085,
          "lng": 114.89495
        },
        "cidx": [
          1495,
          1497
        ]
      }],
    citiesList: [{
      "id": "421000",
      "name": "荆州",
      "fullname": "荆州市",
      "pinyin": [
        "jing",
        "zhou"
      ],
      "location": {
        "lat": 30.33479,
        "lng": 112.24069
      },
      "cidx": [
        1510,
        1517
      ]
    }],
    districtsList: [{
      "id": "421100",
      "name": "黄冈",
      "fullname": "黄冈市",
      "pinyin": [
        "huang",
        "gang"
      ],
      "location": {
        "lat": 30.45347,
        "lng": 114.87238
      },
      "cidx": [
        1518,
        1527
      ]
    },
      {
        "id": "421200",
        "name": "咸宁",
        "fullname": "咸宁市",
        "pinyin": [
          "xian",
          "ning"
        ],
        "location": {
          "lat": 29.84126,
          "lng": 114.32245
        },
        "cidx": [
          1528,
          1533
        ]
      },
      {
        "id": "421300",
        "name": "随州",
        "fullname": "随州市",
        "pinyin": [
          "sui",
          "zhou"
        ],
        "location": {
          "lat": 31.69013,
          "lng": 113.38262
        },
        "cidx": [
          1534,
          1536
        ]
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      currentCity: options.currentCity,
      currentProvince: options.currentProvince,
      currentDistrict: options.currentDistrict
    })
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        
        qqmapsdk.getCityList({//获取城市列表
          success: function (provincesListRes) {
            console.log('provincesListRes');
            console.log(provincesListRes); 
            that.setData({
              provincesList: provincesListRes.result[0],
            })
          }
        })
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})