// pages/agencyCenter/agencyCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderImage0: '/images/order-img0.jpg',
    orderImage1: '/images/order-img1.jpg',
    orderImage2: '/images/order-img2.jpg',
    orderImage3: '/images/order-img3.jpg',
    orderImage4: '/images/order-img4.jpg',
    orderImage5: '/images/order-img5.jpg',
    orderImage6: '/images/yuangongguanli.png',
    orderImage7: '/images/shangjiajianjie.png',
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

  addCategory: function () {
    wx.navigateTo({
      url: '../addCategory/addCategory',
    })
  },

  addGoods: function() {
    wx.navigateTo({
      url: '../addGoods/addGoods',
    })
  },

  goodsList: function() {
    wx.navigateTo({
      url: '../goodsList/goodsList',
    })
  },

  myShop: function() {
    wx.navigateTo({
      url: '../agencyDetail/agencyDetail',
    })
  },

  updateDate: function() {
    wx.navigateTo({
      url: '../agencyUpdate/agencyUpdate',
    })
  },

  brandCategorys: function() {
    wx.navigateTo({
      url: '../brandCategoryList/brandCategoryList',
    })
  },

  updateDescription: function() { //跳转到商家简介编辑页面
    wx.navigateTo({
      url: '../brandCategoryList/brandCategoryList',
    })
  },

  contactList: function () { //跳转到商家简介编辑页面
    wx.navigateTo({
      url: '../myShop/myShop',
    })
  }
})