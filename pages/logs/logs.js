//logs.js
const util = require('../../utils/util.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk = new QQMapWX({
  key: 'EBNBZ-ELC64-536UJ-XGRBP-FTFGK-OZBMF' // 必填
})

Page({
  data: {
    logs: [],
    value: [0, 0, 0],
    provinceIndex: 0,
    cityIndex: 0,
    areaIndex: 0,
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
      if (provinceId == "110000" || provinceId == "120000" || provinceId == "310000" || provinceId == "500000"
        || provinceId == "810000" || provinceId == "820000") {
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
        success: function (res) {//成功后的回调
          console.log(res);
          console.log('对应城市ID下的区县数据(以北京为例)：', res.result[0]);
          that.setData({
            city: tmp,
            area: res.result[0]
          })
          //wx.setStorageSync("area", citys) 查询之后存储，下次就不通过网络查询了
        },
        fail: function (error) {
          console.error(error);
        },
        complete: function (res) {
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
        success: function (res) {//成功后的回调
          console.log(res);
          console.log('对应城市ID下的区县数据(以北京为例)：', res.result[0]);
          that.setData({
            area: res.result[0]
          })
          //wx.setStorageSync("area", citys) 查询之后存储，下次就不通过网络查询了
        },
        fail: function (error) {
          console.error(error);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    }
    console.log(val)
    that.data.provinceIndex = provinceIndex
    that.data.cityIndex = cityIndex
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShow: function () {
    var that = this;
    qqmapsdk.getCityList({
        success: function (res) {//成功后的回调
          console.log(res);
          var province = res.result[0]
          wx.setStorageSync("provinces", province)
          var provinceId = province[0].id
          var citys = res.result[1]
          wx.setStorageSync("citys", citys)
          var city = citys[0]
          var tmp = new Array();
          for (var i=0; i<citys.length;i++) {
            var start = citys[i].id.slice(0,3)
            if (start == 110) { //直辖市可以比较前三位
              tmp.push(citys[i])
            }
          }


          var area = res.result[2]
          that.setData({
            province: province,
            city: province,
            area: tmp
          })
          console.log('省份数据：', res.result[0]); //打印省份数据
          console.log('城市数据：', res.result[1]); //打印城市数据
          console.log('区县数据：', res.result[2]); //打印区县数据
          // qqmapsdk.getDistrictByCityId({
          //   // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
          //   id: citys[that.data.cityIndex].id, //对应接口getCityList返回数据的Id，如：北京是'110000'
          //   success: function (res) {//成功后的回调
          //     console.log(res);
          //     console.log('对应城市ID下的区县数据(以北京为例)：', res.result[0]);
          //     that.setData({
          //       area: res.result[0]
          //     })
          //     //wx.setStorageSync("area", citys) 查询之后存储，下次就不通过网络查询了
          //   },
          //   fail: function (error) {
          //     console.error(error);
          //   },
          //   complete: function (res) {
          //     console.log(res);
          //   }
          // });
        },
        fail: function (error) {
            console.error(error);
        },
        complete: function (res) {
            console.log(res);
        }
    });
  },

  pay: function () {
    wx.request({
      url: 'http://localhost:8080/Agency/pay/jsapiPay?tradeNo=koejoijfwer2goi&totalFee=1',
      success(res) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.prepayId,
          signType: 'MD5',
          paySign: res.data.paySign,
          success(res) {
            console.log(res)
          },
          fail(res) {
            console.log(res)
          }
        })
      }
    })
    
  }
})
