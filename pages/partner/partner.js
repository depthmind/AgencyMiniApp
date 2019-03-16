// pages/partner/partner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    isChecked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/parameter/findParameter.do?paraDomain=partner.fee',
      success (res) {
        console.log(res)
        that.setData({
          partnerFee: res.data[0].value
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
  
  onConfirm: function () {
    this.setData({
      showModal: false
    });
  },

  showDialog: function () {
    this.setData({
      showModal: true
    });
  },

  agreeNotice: function (e) {
    var that = this
    that.data.isChecked = true
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
    if (data.partnerName == undefined || data.partnerName == '') {
      that.showModal("请填写姓名")
      return;
    }
    if (data.mobilephone == undefined || data.mobilephone == '') {
      that.showModal("请填写联系人电话")
      return;
    }
    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(data.mobilephone))) {
      that.showModal("请填写正确的手机号")
      return;
    }
    if (!that.data.isChecked) {
      that.showModal("阅读并同意合伙人须知")
      return;
    }
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/pay/jsapiPay?tradeNo=' + data.mobilephone + '&totalFee=' + that.data.partnerFee,
      success(res) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.prepayId,
          signType: 'MD5',
          paySign: res.data.paySign,
          success(res) {
            wx.request({
              url: 'https://www.caoxianyoushun.com:8443/Agency/partner/savePartner.do?partnerName=' + data.partnerName + '&mobilephone=' + data.mobilephone + '&introducer=' + data.introducer,
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
              }
            })
            wx.redirectTo({
              url: '/pages/paySuccess/paySuccess',
            })
            console.log(res)
          },
          fail(res) {
            console.log(res)
          }
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