const agencyType = 'normal'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyByOpenId.do',
      //url: 'http://localhost:8080/Agency/agency/findAgencyByOpenId.do',
      data: {
        openId: openId,
        type: agencyType
      },
      success(res) {
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

  formSubmit: function (e) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var data = e.detail.value
    if (data.description == undefined || data.description == '') {
      wx.showModal({
        title: '提示',
        content: '请填写商家简介',
      })
      return;
    }
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/updateAgencyBaseByOpenId.do',
      data: {
        openId: openId,
        description: data.description
      },
      success(res) {
        wx.navigateBack({
          
        })
      }
    })
  }
})