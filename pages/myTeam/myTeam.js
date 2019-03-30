Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_current: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    console.log("openId---", openId)
    console.log("userInfo---", userInfo)
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/partner/findPartnerByIntroducer.do',
      data: {
        openId: openId
      },
      success(res) {
        var partners = res.data
        console.log(res.data)
        that.setData({
          partners: res.data
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

  swiperChange: function (a) {
    this.setData({
      swiper_current: a.detail.current
    });
  },

  tabSwitch: function (a) {
    var t = this, o = a.currentTarget.dataset.index;
    t.setData({
      swiper_current: o
    });
  },

  formatTime: function (date) {
    var date = getDate(date); //返回当前时间对象
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    return [year, month, day].join('-')
  }
})