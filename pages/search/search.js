// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canClear: false,
    searchContent: '',
    resultProductList: []
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

  clearInputText: function () {
    this.setData({
      searchContent: ''
    })
  },

  search: function (e) {
    let that = this;
    let value = e.detail.value;
    if (value.length > 0) {
      that.setData({
        canClear: true
      })
    } else {
      that.setData({
        canClear: false
      })
    }
    wx.request({
      url: '',
      data: {
        key: value
      },
      success(res){
        that.setData({
          resultProductList: res.data.productList
        })
      }
    })
  }
})