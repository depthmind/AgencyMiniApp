// pages/agencyDetail/agencyDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneImage2: '/images/phone2.jpg',
    addressImage: '/images/address.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
    wx.request({
      url: 'http://localhost:8080/Agency/agency/findAgencyById.do?id=' + id,
      success(res) {
        console.log(res)
        var agency = res.data
        wx.setNavigationBarTitle({
          title: agency.agencyName, //页面title用代理商名称
        })
        that.setData({
          agency: agency
        })
        console.log(agency)
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

  makePhoneCall: function (e) {
    console.log(e)
    var mobilephone = e.currentTarget.dataset.mobilephone
    wx.makePhoneCall({
      phoneNumber: mobilephone,
    })
  }
})