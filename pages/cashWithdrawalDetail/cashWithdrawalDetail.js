// pages/cashWithdrawalDetail/cashWithdrawalDetail.js
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
    wx.request({
      url: 'http://localhost:8080/Agency/withdrawal/findWithdrawalRecord.do',
      data: {
        openId: openId,
        status : '1'
      },
      success(res) {
        that.setData({
          recorder1: res.data
        })
      }
    })
    wx.request({
      url: 'http://localhost:8080/Agency/withdrawal/findWithdrawalRecord.do',
      data: {
        openId: openId,
        status: '2'
      },
      success(res) {
        that.setData({
          recorder2: res.data
        })
      }
    })
    wx.request({
      url: 'http://localhost:8080/Agency/withdrawal/findWithdrawalRecord.do',
      data: {
        openId: openId,
        status: '3'
      },
      success(res) {
        that.setData({
          recorder3: res.data
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
})