// pages/publishList/publishList.js
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
    console.log('userInfo----', userInfo)
    var openId = userInfo.openId
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/publish/findPublishContentByParam.do',
      //url: 'http://localhost:8080/Agency/publish/findPublishContentByParam.do',
      data: {
        openId: openId
      },
      success(res) {
        var publishes = res.data
        console.log('publishes--', publishes)
        if (publishes.length > 0) {
          for (var i = 0; i < publishes.length; i++) {
            if (publishes[i].images != undefined) {
              publishes[i].images = publishes[i].images.split(",")
            }
          }
        }
        that.setData({
          publishes: res.data
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

  openPublish: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/publishDetail/publishDetail?id=' + id,
    })
  }
})