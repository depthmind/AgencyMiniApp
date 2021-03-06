// pages/addCategory/addCategory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    agencyId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var brandId = options.id
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/brand/findBrandCategoryById.do',
      //url: 'http://localhost:8080/Agency/brand/findBrandCategoryById.do',
      data: {
        id: brandId
      },
      success(res) {
        var brandCategory = res.data
        that.setData({
          brandCategory: brandCategory,
          brandId: brandId
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

  formSubmit: function (e) {
    var that = this
    var formId = e.detail.formId
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var data = e.detail.value
    if (data.categoryName == undefined || data.categoryName == '') {
      wx.showModal({
        title: '提示',
        content: '请填写分类名称',
      })
      return;
    }
    wx.request({ //保存formId发送模板消息时使用
      url: 'https://www.caoxianyoushun.com:8443/Agency/template/saveFormIdForTemplate',
      data: {
        openId: openId,
        formId: formId
      }
    })
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/brand/updateBrandCategory.do',
      //url: 'http://localhost:8080/Agency/brand/updateBrandCategory.do',
      data: {
        categoryName: data.categoryName,
        openId: openId,
        id: that.data.brandId
      },
      success(res) {
        // var pages = getCurrentPages();//获取页面栈
        // if (pages.length > 1) {
        //   //上一个页面实例对象
        //   var prePage = pages[pages.length - 2];
        //   //调用上一个页面的onShow方法
        //   prePage.onShow()
        // } 
        wx.navigateBack({

        })
      }
    })
  }
})