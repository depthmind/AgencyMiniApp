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
    var id = options.id
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyContactById.do',
      //url: 'http://localhost:8080/Agency/agency/findAgencyContactById.do',
      data: {
        id: id
      },
      success (res) {
        that.setData({
          contact: res.data
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
    wx.request({ //保存formId发送模板消息时使用
      url: 'https://www.caoxianyoushun.com:8443/Agency/template/saveFormIdForTemplate',
      data: {
        openId: openId,
        formId: formId
      }
    })
    if (data.contactName == undefined || data.contactName == '') {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
      })
      return;
    }
    if (data.mobilephone == undefined || data.mobilephone == '') {
      that.showModal("请填写联系人电话")
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(data.mobilephone))) {
      that.showModal("请填写正确的手机号")
      return;
    }
    if (data.area == undefined || data.area == '') {
      wx.showModal({
        title: '提示',
        content: '请填写负责区域',
      })
      return;
    }

    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/updateAgencyContact.do',
      //url: 'http://localhost:8080/Agency/agency/updateAgencyContact.do',
      data: {
        contactName: data.contactName,
        mobilephone: data.mobilephone,
        area: data.area,
        id: that.data.contact.id
      },
      success(res) {
        wx.navigateBack({
          
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