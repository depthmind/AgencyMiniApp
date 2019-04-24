// pages/goodsList/goodsList.js
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
      url: 'https://www.caoxianyoushun.com:8443/Agency/goods/findGoodsByOpenId.do',
      //url: 'http://localhost:8080/Agency/goods/findGoodsByOpenId.do',
      data: {
        openId: openId
      },
      success (res) {
        console.log(res)
        if (res.data) {
          for (var i = 0; i < res.data.length; i++) {
            var images = res.data[i].goodsPic
            if (images && images.indexOf(',') > -1) {
              var imagesArr = images.split(',')
              res.data[i].thumbnail = imagesArr[0]
            } else {
              res.data[i].thumbnail = images
            }
          }
        }
        that.setData({
          goods: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '商品列表'
    })
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

  openGoods: function (e) {
    console.log(e)
    var goodsId = e.currentTarget.dataset.goodsId
    wx.navigateTo({
      url: '../goodsEdit/goodsEdit?goodsId=' + goodsId,
    })
  },

  delete: function (e) {
    console.log(e)
    var that = this
    var brandId = e.currentTarget.dataset.id
    that.setData({
      deletedBrandId: brandId
    })
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.caoxianyoushun.com:8443/Agency/goods/deleteGoods.do',
            //url: 'http://localhost:8080/Agency/goods/deleteGoods.do',
            data: {
              id: brandId
            },
            success(res) {
              that.onLoad()
            }
          })
        }
      }
    })
  },

  offline: function (e) {
    console.log(e)
    var that = this
    var brandId = e.currentTarget.dataset.id
    that.setData({
      deletedBrandId: brandId
    })
    wx.showModal({
      title: '提示',
      content: '是否下架？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.caoxianyoushun.com:8443/Agency/goods/offlineGoods.do',
            //url: 'http://localhost:8080/Agency/goods/offlineGoods.do',
            data: {
              id: brandId
            },
            success(res) {
              that.onLoad()
            }
          })
        }
      }
    })
  },

  online: function (e) {
    console.log(e)
    var that = this
    var brandId = e.currentTarget.dataset.id
    that.setData({
      deletedBrandId: brandId
    })
    wx.showModal({
      title: '提示',
      content: '是否上架？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.caoxianyoushun.com:8443/Agency/goods/onlineGoods.do',
            //url: 'http://localhost:8080/Agency/goods/onlineGoods.do',
            data: {
              id: brandId
            },
            success(res) {
              that.onLoad()
            }
          })
        }
      }
    })
  },
})