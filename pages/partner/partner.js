const userInfo = wx.getStorageSync('userInfo')
const openId = userInfo.openId
const province = wx.getStorageSync('currentProvince')
const city = wx.getStorageSync('currentCity')
const area = wx.getStorageSync('currentArea')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    isChecked: false,
    source: '', //分享者openId
    isPartner: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log("分享-----",options)
    if (options && options.source) { //判断是否为分享出来的页面
      that.setData({
        source: options.source
      })
      wx.setStorageSync('source', options.source) //分享者的open_id
    }
    var openId = wx.getStorageSync('openId')
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/parameter/findParameter.do?paraDomain=partner.fee',
      success (res) {
        console.log(res)
        that.setData({
          partnerFee: res.data[0].value
        })
      }
    })

    wx.request({ //判断是否已经入驻
      url: 'https://www.caoxianyoushun.com:8443/Agency/partner/findPartnerByOpenId.do',
      data: {
        openId: openId
      },
      success(res) {
        var partner = res.data
        if (partner) {
          that.setData({
            isPartner: true
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '期待您的加入',
      path: '/pages/partner/partner?source=' + openId
    }
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
    if (!(/^1[34578]\d{9}$/.test(data.mobilephone))) {
      that.showModal("请填写正确的手机号")
      return;
    }
    if (!that.data.isChecked) {
      that.showModal("阅读并同意合伙人须知")
      return;
    }
    //暂时加入合伙人不需要收费
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/partner/savePartner.do?partnerName=' + data.partnerName + '&mobilephone=' + data.mobilephone + '&introducer=' + data.introducer + '&openId=' + openId + '&province=' + province + '&city=' + city + '&area=' + area + '&introducer=' + taht.data.source,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
      }
    })
    wx.redirectTo({
      url: '/pages/joinSuccess/joinSuccess',
    })
    // wx.request({
    //   url: 'https://www.caoxianyoushun.com:8443/Agency/pay/jsapiPay?tradeNo=' + data.mobilephone + '&totalFee=' + that.data.partnerFee,
    //   success(res) {
    //     wx.requestPayment({
    //       timeStamp: res.data.timeStamp,
    //       nonceStr: res.data.nonceStr,
    //       package: res.data.prepayId,
    //       signType: 'MD5',
    //       paySign: res.data.paySign,
    //       success(res) {
    //         wx.request({
    //           url: 'https://www.caoxianyoushun.com:8443/Agency/partner/savePartner.do?partnerName=' + data.partnerName + '&mobilephone=' + data.mobilephone + '&introducer=' + data.introducer,
    //           header: {
    //             'content-type': 'application/json' // 默认值
    //           },
    //           success(res) {
    //           }
    //         })
    //         wx.redirectTo({
    //           url: '/pages/paySuccess/paySuccess',
    //         })
    //         console.log(res)
    //       },
    //       fail(res) {
    //         console.log(res)
    //       }
    //     })
    //   }
    // })
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

  redirctToIndex: function () {
    wx.reLaunch({
      url: "/pages/index/index"
    });
  },

  redirctToMyTeam: function () {
    wx.navigateTo({
      url: '../../pages/myTeam/myTeam',
    })
  },

  redirctToCommission: function () {
    wx.navigateTo({
      url: '../../pages/commission/commission',
    })
  },

  redirctToCashWithdrawalDetail: function () {
    wx.navigateTo({
      url: '../../pages/cashWithdrawalDetail/cashWithdrawalDetail',
    })
  },

  introduceAgency: function () {
    wx.navigateTo({
      url: '../../pages/introduceAgency/introduceAgency',
    })
  }
})