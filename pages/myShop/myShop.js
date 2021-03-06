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
    wx.request({ //查到agencyId
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyByOpenId.do',
      data: {
        openId: openId,
        type: 'normal'
      },
      success(res) {
        var agencyId = res.data.id
        that.setData({
          agencyId: agencyId
        })
        wx.request({ //查到联系人列表
          url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgnecyContactByAgencyId.do',
          //url: 'http://localhost:8080/Agency/agency/findAgnecyContactByAgencyId.do',
          data: {
            agencyId: agencyId
          },
          success(res) {
            console.log(res.data)
            that.setData({
              agencyContacts: res.data
            })
          }
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
    this.onLoad()
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
    console.log(e)
    var goodsId = e.currentTarget.dataset.goodsId
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + goodsId,
    })
  },

  openAgency: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/agencyDetail/agencyDetail?id=' + e.currentTarget.dataset.cid,
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
            url: 'https://www.caoxianyoushun.com:8443/Agency/agency/deleteAgencyContact.do',
            //url: 'http://localhost:8080/Agency/agency/deleteAgencyContact.do',
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

  editContact: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/editContact/editContact?id=' + id,
    })
  }
})