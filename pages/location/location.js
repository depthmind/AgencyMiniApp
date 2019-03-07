// pages/location/location.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    provices: [1, 2, 3],
    cities: [],
    districts: [],
    region: ["请选择", "请选择", "请选择"]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    
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


  bindRegionChange: function (e) {
    console.log("picker选择改变，携带值为：" + e.detail.value)
    this.setData({
      region: String(e.detail.value).split(',')
    })
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2]
    console.log(pages)
    prePage.setData({
      currentProvince: this.data.region[0],
      currentCity: this.data.region[1],
      currentArea: this.data.region[2]
    })
    console.log(this.data.region)
    wx.navigateBack({
      delta: 1,
    })
  }


})