// pages/commission/commission.js
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
      url: 'http://localhost:8080/Agency/withdrawal/sumWithdrawalRecord.do',
      data: {
        openId: openId
      },
      success(res) {
        withdrawalRecord: res.data
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
    var data = e.detail.value
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var formId = e.detail.formId
    wx.request({ //保存formId发送模板消息时使用
      url: 'https://www.caoxianyoushun.com:8443/Agency/template/saveFormIdForTemplate',
      data: {
        openId: openId,
        formId: formId
      }
    })
    if (data.amount == undefined || data.amount == '') {
      that.showModal("请填写提现金额")
      return;
    }
    if (data.name == undefined || data.name == '') {
      that.showModal("请填写姓名")
      return;
    }
    if (data.wechat == undefined || data.wechat == '') {
      that.showModal("请填写微信账号")
      return;
    }
    wx.request({
      url: 'http://localhost:8080/Agency/withdrawal/add.do',
      data: {
        openId: openId,
        amount: data.amount,
        name: data.name,
        wechat: data.wechat
      },
      success (res) {
        console.log(res)
        // if (res.data.success) {
        //   wx.
        // }
        wx.navigateTo({
          url: '../../pages/cashWithdrawalDetail/cashWithdrawalDetail',
        })
      }
    })
  },

  showModal: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})