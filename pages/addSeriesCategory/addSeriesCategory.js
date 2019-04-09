// pages/addCategory/addCategory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brandId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.data.brandId = options.id
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
    var formId = e.detail.formId
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var data = e.detail.value
    if (data.seriesCategoryName == undefined || data.seriesCategoryName == '') {
      wx.showModal({
        title: '提示',
        content: '请填写分类名称',
      })
      return;
    }
    wx.request({ //保存formId发送模板消息时使用
      url: 'https://www.caoxianyoushun.com:8443/Agency/template/saveFormIdForTemplate',
      data: {
        openId: openId,
        formId: formId
      }
    })
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/series/addSeriesCategory.do',
      data: {
        categoryName: data.seriesCategoryName,
        brandId: that.data.brandId
      },
      success (res) {
        wx.navigateBack({
          
        })
      }
    })
  }
})