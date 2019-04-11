const favoriteType = '2' //1代表收藏的是代理商
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneImage2: '/images/phone2.jpg',
    addressImage: '/images/address.png',
    isFavorited: false,
    inFavorited: false, //是否收藏过
    agencyId: '',
    phoneImage: '/images/phone.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
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
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyById.do?id=' + id,
      success(res) {
        console.log(res)
        var agency = res.data
        wx.setNavigationBarTitle({
          title: agency.agencyName, //页面title用代理商名称
        })
        that.setData({
          agency: agency,
          agencyId: id
        })
        console.log(agency)
        // if (typeof agency != 'object') {
        //   agency = agency.replace(/\ufeff/g, "");//重点
        //   var jj = JSON.parse(agency);
        //   console.log(jj)
        // }
      }
    })

    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/favorite/findFavorite.do',
      data: {
        openId: openId,
        type: favoriteType,
        favoriteId: id
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

  makePhoneCall: function (e) {
    console.log(e)
    var mobilephone = e.currentTarget.dataset.mobilephone
    wx.makePhoneCall({
      phoneNumber: mobilephone,
    })
  },

  favoriteAdd: function () {
    var that = this
    var agencyId = that.data.agencyId
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
        favoriteId: agencyId
      },
      success(res) {
        that.setData({
          isFavorited: true,
          favorite_img_url: '../../images/收藏red.png'
        })
      }
    })
  },

  favoriteRemove: function () {
    var that = this
    var agencyId = that.data.agencyId
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
        favoriteId: agencyId
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