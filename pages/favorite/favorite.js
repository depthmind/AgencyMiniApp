// pages/favorite/favorite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper_current: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var unionId = userInfo.unionId
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/favorite/findFavoriteGoods.do',
      //url: 'http://localhost:8080/Agency/favorite/findFavoriteGoods.do',
      data: {
        openId: openId,
        type: '1',
      },
      success(res) {
        console.log(res)
        var favoriteGoods = res.data
        if (favoriteGoods) {
          for (var i = 0; i < favoriteGoods.length; i++) {
            if (favoriteGoods[i].goodsPic.indexOf(',') > -1) {
              favoriteGoods[i].thumbnail = favoriteGoods[i].goodsPic.split(',')[0]
            } else {
              favoriteGoods[i].thumbnail = goodsPic
            }
          }
        }
        that.setData({
          favoriteGoods: favoriteGoods,
          swiper_current: 0
        })
      }
    })
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/favorite/findFavoriteAgency.do',
      //url: 'http://localhost:8080/Agency/favorite/findFavoriteAgency.do',
      data: {
        openId: openId,
        type: '1',
      },
      success(res) {
        console.log(res)
        that.setData({
          favoriteAgency: res.data,
          swiper_current: 0
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

  tabSwitch: function (a) {
    var t = this, o = a.currentTarget.dataset.index;
    t.setData({
      swiper_current: o
    });
  },
  swiperChange: function (a) {
    this.setData({
      swiper_current: a.detail.current
    });
  },
  loadGoodsList: function (o) {
    var i = this;
    i.data.goods.is_loading || o.loadmore && !i.data.goods.is_more || (i.data.goods.is_loading = !0,
      i.setData({
        goods: i.data.goods
      }), t.request({
        url: a.user.favorite_list,
        data: {
          page: o.page
        },
        success: function (a) {
          0 == a.code && (o.reload && (i.data.goods.list = a.data.list), o.loadmore && (i.data.goods.list = i.data.goods.list.concat(a.data.list)),
            i.data.goods.page = o.page, i.data.goods.is_more = a.data.list.length > 0, i.setData({
              goods: i.data.goods
            }));
        },
        complete: function () {
          i.data.goods.is_loading = !1, i.setData({
            goods: i.data.goods
          });
        }
      }));
  },
  goodsScrollBottom: function () {
    var a = this;
    a.loadGoodsList({
      loadmore: !0,
      page: a.data.goods.page + 1
    });
  },
  loadTopicList: function (o) {
    var i = this;
    i.data.topic.is_loading || o.loadmore && !i.data.topic.is_more || (i.data.topic.is_loading = !0,
      i.setData({
        topic: i.data.topic
      }), t.request({
        url: a.user.topic_favorite_list,
        data: {
          page: o.page
        },
        success: function (a) {
          0 == a.code && (o.reload && (i.data.topic.list = a.data.list), o.loadmore && (i.data.topic.list = i.data.topic.list.concat(a.data.list)),
            i.data.topic.page = o.page, i.data.topic.is_more = a.data.list.length > 0, i.setData({
              topic: i.data.topic
            }));
        },
        complete: function () {
          i.data.topic.is_loading = !1, i.setData({
            topic: i.data.topic
          });
        }
      }));
  },
  topicScrollBottom: function () {
    var a = this;
    a.loadTopicList({
      loadmore: !0,
      page: a.data.topic.page + 1
    });
  },

  openGoods: function (e) {
    var that = this
    var favoriteId = e.currentTarget.dataset.id
    var goodsArr = that.data.favoriteGoods
    var goods
    for (var i = 0; i < goodsArr.length; i++) {
      if (goodsArr[i].favoriteId == favoriteId) {
        goods = goodsArr[i]
      }
    }
    
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + goods.id,
    })
  },

  openAgency: function (e) {
    var that = this
    var favoriteId = e.currentTarget.dataset.id
    var agencyArr = that.data.favoriteAgency
    var agency
    for (var i = 0; i < agencyArr.length; i++) {
      if (agencyArr[i].favoriteId == favoriteId) {
        agency = agencyArr[i]
      }
    }
    wx.navigateTo({
      url: '/pages/agencyDetail/agencyDetail?id=' + agency.id,
    })
  },

  delete: function (e) {
    console.log(e)
    var that = this
    var id = e.currentTarget.dataset.id
    // that.setData({
    //   deletedBrandId: brandId
    // })
    wx.showModal({
      title: '提示',
      content: '是否删除？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.caoxianyoushun.com:8443/Agency/favorite/deleteFavoriteById.do',
            //url: 'http://localhost:8080/Agency/favorite/deleteFavoriteById.do',
            data: {
              id: id
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