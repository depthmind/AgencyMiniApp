Page({

  /**
   * 页面的初始数据
   */
  data: {
    canClear: false,
    searchContent: '',
    inputCursor: null,
    resultAgencyList: [],
    resultGoodsList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  clearInputText: function() {
    this.setData({
      searchContent: '',
      canClear: false
    })
  },

  search: function(e) {
    let that = this;
    let value = e.detail.value;
    let cursor = e.detail.cursor
    var currentProvince = wx.getStorageSync('currentProvince')
    var currentCity = wx.getStorageSync('currentCity')
    var currentArea = wx.getStorageSync('currentArea')
    console.log(value)
    console.log(cursor)
    if (value.length > 0) {
      that.setData({
        canClear: true
      })
    } else {
      that.setData({
        canClear: false
      })
    }
    if (cursor != that.data.inputCursor && value.length > 0) {
      wx.request({
        url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyByName.do',
        //url: 'http://localhost:8080/Agency/agency/findAgencyByName.do',
        data: {
          name: value,
          province: currentProvince,
          city: currentCity,
          area: currentArea,
          offset: 0,
          rows: 3
        },
        success(res) {
          console.log("findAgency")
          console.log(res.data)
          that.setData({
            resultAgencyList: res.data
          })
        }
      })
      wx.request({
        url: 'https://www.caoxianyoushun.com:8443/Agency/goods/getGoods.do',
        //url: 'http://localhost:8080/Agency/goods/getGoods.do',
        data: {
          goodsName: value,
          province: currentProvince,
          city: currentCity,
          area: currentArea,
          offset: 0,
          rows: 10
        },
        success(res) {
          console.log("findGoods")
          console.log(res.data)
          that.setData({
            resultGoodsList: res.data
          })
        }
      })
    }
    that.setData({
      inputCursor: cursor
    })
  },
  getProductInfo: function(e) {
    wx.request({
      url: '',
      data: {
        productId: e.detail.productId
      }
    })
  },

  openAgency: function (e) {
    var agencyId = e.currentTarget.dataset.agencyId
    wx.navigateTo({
      url: '../agencyDetail/agencyDetail?id=' + agencyId,
    })
  },

  openGoods: function (e) {
    console.log(e)
    var goodsId = e.currentTarget.dataset.goodsId
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + goodsId,
    })
  },
})