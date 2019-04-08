const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk = new QQMapWX({
  key: 'EBNBZ-ELC64-536UJ-XGRBP-FTFGK-OZBMF' // 必填
})
const agencyType = 'normal'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressDetail: '',
    logoImagePath: '/images/logo-image.jpg',
    logoImagePathSubmit: '', //表单提交时做判断用
    wechatImagePath: '/images/logo-image.jpg',
    wechatImagePathSubmit: '',
    licence1ImagePath: '/images/logo-image.jpg',
    licence1ImagePathSubmit: '',
    licence2ImagePath: '/images/logo-image.jpg',
    licence2ImagePathSubmit: '',
    validPeriod: '',
    provinceIndex: 0,
    cityIndex: 0,
    areaIndex: 0,
    selectedArea: '',
    arr: [], //标签数组：用来存储选中的值
    showModal: false,
    dingwei: '/images/dingwei.jpg',
    wenImage: '/images/wen.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    wx.getLocation({ //初始地址
      success: function (res) {
        var new_latitude = res.latitude
        var new_longitude = res.longitude
        wx.setStorageSync('latitude', new_latitude)
        wx.setStorageSync('longitude', new_longitude)
        that.translateAddress(new_latitude, new_longitude)
        that.setData({
          latitude: new_latitude,
          longitude: new_longitude
        })
      },
    })

    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyByOpenId.do',
      //url: 'http://localhost:8080/Agency/agency/findAgencyByOpenId.do',
      data: {
        openId: openId,
        type: agencyType
      },
      success (res) {
        console.log(res)
        that.setData({
          agency: res.data
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

  },

  translateAddress: function (latitude, longitude) {
    var that = this
    qqmapsdk.reverseGeocoder({
      location: latitude + ',' + longitude,
      success: function (res) {//成功后的回调
        console.log(res);
        var address = res.result.address;
        that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          addressDetail: address
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  formSubmit: function (e) {
    var formId = e.detail.formId
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var data = e.detail.value
    var agencyName = data.agencyName
    var contactName = data.contactName
    var mobilephone = data.mobilephone
    var address = data.addressDetail
    wx.request({ //保存formId发送模板消息时使用
      url: 'https://www.caoxianyoushun.com:8443/Agency/template/saveFormIdForTemplate',
      data: {
        openId: openId,
        formId: formId
      }
    })

    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/updateAgencyBaseByOpenId.do',
      data: {
        openId: openId,
        type: agencyType,
        agencyName: agencyName,
        contactName: contactName,
        mobilephone: mobilephone,
        address: address,
      }
    })
  }
})