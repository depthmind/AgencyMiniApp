const favoriteType = '1' //1代表收藏的是商品
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    isFavorited: false,
    inFavorited: false, //是否收藏过
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var goodsId = options.goodsId
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var unionId = userInfo.unionId
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/goods/findGoodsById.do?goodsId=' + goodsId,
      //url: 'http://localhost:8080/Agency/goods/findGoodsById.do?goodsId=' + goodsId,
      success(res) {
        var data = res.data
        var agencyId = data.agencyId
        var area = data.area
        var city = data.city
        var goodsDescription = data.goodsDescription
        var goodsName = data.goodsName
        var goodsPic = data.goodsPic
        var stock = data.stock
        //var goodsPic = 'http://www.caoxianyoushun.com/Agency/attachment/upload/15523977802fedd15a624c4e70bc0682.jpg,http://www.caoxianyoushun.com/Agency/attachment/upload/15523977802fedd15a624c4e70bc0682.jpg'
        var goodsPicArr = []
        var firstPic = ''
        if (goodsPic) {
          goodsPicArr = goodsPic.split('|')
          firstPic = goodsPicArr[0]
        }
        that.setData({
          goodsPicArr: goodsPicArr,
          goodsName: goodsName,
          goodsId: goodsId,
          goods: res.data,
          firstPic: firstPic,
          goodsDescription: goodsDescription
        })
      }
    })
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/favorite/findFavorite.do',
      data: {
        openId: openId,
        type: favoriteType,
        favoriteId: goodsId
      },
      success(res) {
        console.log(res)
        if (res.data) {
          that.setData({
            inFavorited: true,
          })
        }
        var favorite = res.data
        if (favorite && favorite.status == '1') {
          that.setData({
            isFavorited: true,
            favorite_img_url: '../../images/收藏red.png'
          })
        } else {
          that.setData({
            isFavorited: false,
            favorite_img_url: '../../images/收藏.png'
          })
        }
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

  favoriteAdd: function () {
    var that = this
    var goodsId = that.data.goodsId
    var isFavorited = that.data.isFavorited
    //var inFavorited = that.data.inFavorited
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var unionId = userInfo.unionId
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/favorite/favoriteAdd.do',
      data: {
        openId: openId,
        unionId: unionId,
        type: favoriteType,
        favoriteId: goodsId
      },
      success(res) {
        that.setData({
          isFavorited: true,
          favorite_img_url: '../../images/收藏red.png'
        })
      }
    })
  },

  favoriteRemove: function() {
    var that = this
    var goodsId = that.data.goodsId
    var isFavorited = that.data.isFavorited
    var inFavorited = that.data.inFavorited
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var unionId = userInfo.unionId
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/favorite/deleteFavorite.do',
      data: {
        openId: openId,
        type: favoriteType,
        favoriteId: goodsId
      },
      success(res) {
        that.setData({
          isFavorited: false,
          favorite_img_url: '../../images/收藏.png'
        })
      }
    })
  }
})