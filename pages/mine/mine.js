// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderImage0: '/images/order-img0.jpg',
    orderImage1: '/images/order-img1.jpg',
    orderImage2: '/images/order-img2.jpg',
    orderImage3: '/images/order-img3.jpg',
    orderImage4: '/images/order-img4.jpg',
    orderImage5: '/images/order-img5.jpg',
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
      title: '个人中心',
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

  agencySignin: function () {
    wx.navigateTo({
      url: '../../pages/agencySignin/agencySignin',
    })
  },

  nearbyAgencySignin: function () {
    wx.navigateTo({
      url: '../../pages/nearbyAgencySignin/nearbyAgencySignin',
    })
  },

  aboutUs: function () {
    wx.navigateTo({
      url: '../../pages/aboutUs/aboutUs',
    })
  },

  help: function () {
    wx.navigateTo({
      url: '../../pages/help/help',
    })
  },

  openContact: function () {
    wx.navigateTo({
      url: '../../pages/contactUs/contactUs',
    })
  },

  openAgencyCenter: function () {
    wx.navigateTo({
      url: '../../pages/agencyCenter/agencyCenter',
    })
  }
})