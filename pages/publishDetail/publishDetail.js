// pages/publishDetail/publishDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobilephone: '13641716360'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/publish/findPublishContentById.do?id=' + id,
      //url: 'http://localhost:8080/Agency/publish/findPublishContentById.do?id=' + id,
      success(res) {
        console.log(res)
        var publishContent = res.data
        wx.setNavigationBarTitle({
          title: '信息详情', //待定
        })
        var images = publishContent.images
        var imagesArr = images.split(',')
        console.log(imagesArr)
        that.setData({
          publishContent: publishContent,
          imagesArr: imagesArr
        })
        console.log(publishContent)
        // if (typeof agency != 'object') {
        //   agency = agency.replace(/\ufeff/g, "");//重点
        //   var jj = JSON.parse(agency);
        //   console.log(jj)
        // }
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

  makePhoneCall: function (event) {
    console.log(event)
    var mobilephone = event.currentTarget.dataset.mobilephone
    wx.makePhoneCall({
      phoneNumber: mobilephone // 仅为示例，并非真实的电话号码
    })
  }
})