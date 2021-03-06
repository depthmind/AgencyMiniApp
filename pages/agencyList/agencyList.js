
Page({
  /**
   * 页面的初始数据
   */
  data: {
    offset: 0,
    limit: 8,
    phoneImage: '/images/phone.jpg',
    //agencyes: [{ "address": "北京市朝阳区西大望路甲20号", "agencyName": "测试","mobilephone":"13641716360","logo":"../../images/add.png"}]
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
    var that = this
    var currentProvince = wx.getStorageSync('currentProvince')
    var currentCity = wx.getStorageSync('currentCity')
    var currentArea = wx.getStorageSync('currentArea')
    wx.setNavigationBarTitle({
      title: '代理商中心',
    })
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyBase.do',
      //url: 'http://localhost:8080/Agency/agency/findAgencyBase.do',
      data: {
        offset: that.data.offset,
        limit: that.data.limit,
        province: currentProvince,
        city: currentCity,
        area: currentArea
      },
      success(res) {
        console.log(res)
        that.setData({
          agencyes: res.data,
          //agencyes: that.data.agencyes,
          offset: that.data.offset + that.data.limit
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var currentProvince = wx.getStorageSync('currentProvince')
    var currentCity = wx.getStorageSync('currentCity')
    var currentArea = wx.getStorageSync('currentArea')
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyBase.do',
      //url: 'http://localhost:8080/Agency/agency/findAgencyBase.do',
      data: {
        offset: 0,
        limit: 8,
        province: currentProvince,
        city: currentCity,
        area: currentArea
      },
      success(res) {
        console.log(res)
        that.setData({
          agencyes: res.data,
          //agencyes: that.data.agencyes,
          offset: that.data.offset + that.data.limit
        })
      }
    })
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
    var that = this;
    var currentProvince = wx.getStorageSync('currentProvince')
    var currentCity = wx.getStorageSync('currentCity')
    var currentArea = wx.getStorageSync('currentArea')
    wx.showLoading({
      title: '正在加载中',
    })
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyBase.do',
      //url: 'http://localhost:8080/Agency/agency/findAgencyBase.do',
      data: {
        offset: that.data.offset,
        limit: that.data.limit,
        province: currentProvince,
        city: currentCity,
        area: currentArea
      },
      success(res) {
        console.log(res)
        var array = res.data
        var agencyes = that.data.agencyes
        for(var i=0; i<array.length; i++) {
          agencyes.push(array[i])
        }
        that.setData({
          agencyes: agencyes,
          offset: that.data.offset + that.data.limit
        })
        wx.hideLoading();
      }
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  openAgency: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/agencyDetail/agencyDetail?id=' + e.currentTarget.dataset.cid,
    })
  }
})