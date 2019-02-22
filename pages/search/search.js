// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canClear: false,
    searchContent: '',
    inputCursor: null,
    resultAgencyList: [{
      id: "1",
      name: "agency1", 
      content: "contendafdfat1"
    }, {
        id: "2",
        name: "agency2",
        content: "contdfaent2"
    }, {
        id: "3",
        name: "agency3",
        content: "contefdafdafdafdafdant3"
    }],
    resultProductList: [{
      id: "1",
      name: "product1",
      content: "contedfadfant1"
    }, {
        id: "2",
        name: "product2",
        content: "contdafdafent2"
    }, {
        id: "3",
        name: "product3",
        content: "conterq32432ent3"
    }, {
        id: "4",
        name: "product4",
        content: "conte112nt4"
    }, {
        id: "5",
        name: "product5",
        content: "con434fraffdafdafdafdafdafdafdafafdewerwqrewqrtent5"
    }, {
        id: "6",
        name: "product6",
        content: "conteafdadfafafnt6"
    }]
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
      searchContent: ''
    })
  },

  search: function(e) {
    let that = this;
    let value = e.detail.value;
    let cursor = e.detail.cursor
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
    if (cursor != that.data.inputCursor) {
      wx.request({
        url: '',
        data: {
          key: value
        },
        success(res) {
          that.setData({
            resultProductList: res.data.productList
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
  }
})