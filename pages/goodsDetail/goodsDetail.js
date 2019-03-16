// pages/goodsDetail/goodsDetail.js
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
    var goodsId = options.goodsId
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/goods/findGoodsById.do?goodsId=' + goodsId,
      success(res) {
        console.log(res)
        var data = res.data
        var agencyId = data.agencyId
        var area = data.area
        var city = data.city
        var goodsDescription = data.goodsDescription
        var goodsName = data.goodsName
        //var goodsPic = data.goodsPic
        var goodsPic = 'http://www.caoxianyoushun.com/Agency/attachment/upload/15523977802fedd15a624c4e70bc0682.jpg,http://www.caoxianyoushun.com/Agency/attachment/upload/15523977802fedd15a624c4e70bc0682.jpg'
        var goodsPicArr = goodsPic.split(',')
        that.setData({
          goodsPicArr: goodsPicArr,
          goodsName: goodsName,
          
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

  }
})