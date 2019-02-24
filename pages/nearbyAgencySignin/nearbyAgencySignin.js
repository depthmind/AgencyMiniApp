// pages/agency/agency.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'halfYear', value: '半年' },
      { name: 'onYear', value: '一年', checked: 'true' },
    ],
    addressDetail: '',
    logoImagePath: '/images/logo-image.jpg',
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
      title: '代理商入驻',
    })
    var that = this
    var longitude = wx.getStorageSync("longitude")
    var latitude = wx.getStorageSync("latitude")
    var markers = [{
      iconPath: '/images/address.png',
      id: 0,
      latitude: latitude,
      longitude: longitude,
      width: 50,
      height: 50
    }]
    that.setData({
      longitude: longitude,
      latitude: latitude,
      markers: markers
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.setData({
      addressDetail: that.data.addressDetail
    })
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

  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imagePath: tempFilePaths
        })
      }
    })
  },

  chooseAddress: function () {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },

  radioChange: function (e) {
    console.log(e.detail.value)
  }
})