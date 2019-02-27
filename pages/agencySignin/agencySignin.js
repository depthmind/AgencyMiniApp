// pages/agency/agency.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressDetail: '',
    logoImagePath: '/images/logo-image.jpg',
    logoImagePathSubmit: '', //表单提交时做判断用
    wechatImagePath: '/images/logo-image.jpg',
    wechatImagePathSubmit: '',
    licence1ImagePath: '/images/logo-image.jpg',
    licence1ImagePathSubmit: '',
    licence2ImagePath: '/images/logo-image.jpg',
    licence2ImagePathSubmit: '',
    validPeriod: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openId = wx.getStorageSync('openId')
    wx.request({
      url: 'http://localhost:8080/Agency/agency/findAgencyByOpenId.do?openId=' + openId,
      success(res) {
        if (res.data.isCooperation == '1') {
          wx.showModal({
            title: '提示',
            content: '您已经入驻过了哦',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
    wx.request({ //查询可选择的入驻时长参数
      url: 'http://localhost:8080/Agency/parameter/findParameter.do?paraDomain=agency.validPeriod',
      success(res) {
        console.log(res)
        that.setData({
          validPeriod: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '代理商入驻',
    })
    var that = this
    var longitude = wx.getStorageSync("longitude")
    var latitude = wx.getStorageSync("latitude")
    var markers = [{
      iconPath: '/images/address.png',
      id: 0,
      latitude: latitude,
      longitude: longitude,
      width: 50,
      height: 50
    }]
    that.setData({
      longitude: longitude,
      latitude: latitude,
      markers: markers
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.setData({
      addressDetail: that.data.addressDetail
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  chooseLogoImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          logoImagePath: tempFilePaths,
          logoImagePathSubmit: tempFilePaths
        })
      }
    })
  },

  chooseWechatImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          wechatImagePath: tempFilePaths
        })
      }
    })
  },

  chooseLicence1Image: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          licence1ImagePath: tempFilePaths,
          licence1ImagePathSubmit: tempFilePaths
        })
      }
    })
  },

  chooseLicence2Image: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          licence2ImagePath: tempFilePaths,
          licence2ImagePathSubmit: tempFilePaths
        })
      }
    })
  },

  chooseAddress: function () {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },

  radioChange: function (e) {
    console.log(e.detail.value)
    var that = this
    that.data.validPeriod = e.detail.value
  },

  formSubmit: function (e) {
    var that = this
    var temp = that.data.tempFilePaths
    var data = e.detail.value
    that.validation(data)
    var parameter = "agencyName=" + data.agencyName + "&addressDetail=" + data.addressDetail + "&serviceNumber=" + data.serviceNumber + "&mobilephone=" + data.mobilephone + "&time=" + data.time
    wx.uploadFile({ // 上传代理商logo
      url: 'http://47.105.169.49/Agency/upfile',
      filePath: that.data.logoImagePath[0],
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        var path = res.data
        parameter = parameter + '&logoImagePath=' + path
        if (that.data.wechatImagePathSubmit != '') { //判断是否上传了老板微信
          wx.uploadFile({ // 上传老板微信
            url: 'http://47.105.169.49/Agency/upfile',
            filePath: that.data.wechatImagePath[0],
            name: 'file',
            formData: {
              user: 'test'
            },
            success(res) {
              var path = res.data
              parameter = parameter + '&wechatImagePath=' + path
              wx.uploadFile({ // 上传营业执照
                url: 'http://47.105.169.49/Agency/upfile',
                filePath: that.data.wechatImagePath[0],
                name: 'file',
                formData: {
                  user: 'test'
                },
                success(res) {
                  var path = res.data
                  parameter = parameter + '&licence1ImagePath=' + path
                  wx.uploadFile({ // 上传食品经营许可证
                    url: 'http://47.105.169.49/Agency/upfile',
                    filePath: that.data.wechatImagePath[0],
                    name: 'file',
                    formData: {
                      user: 'test'
                    },
                    success(res) {
                      var path = res.data
                      parameter = parameter + '&licence2ImagePath=' + path
                      wx.request({
                        url: 'http://localhost:8080/Agency/pay/jsapiPay?tradeNo=' + data.mobilephone + '&totalFee=0.01',
                        success(res) {
                          wx.requestPayment({
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.prepayId,
                            signType: 'MD5',
                            paySign: res.data.paySign,
                            success(res) {
                              wx.request({
                                url: 'http://localhost:8080/Agency/agency/saveAgencyBase.do?' + parameter + '&isCooperation=1' + '&validPeriod=' + that.data.validPeriod,
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
                    }
                  })
                }
              })
            }
          })
        } else {
          wx.uploadFile({ // 上传营业执照
            url: 'http://47.105.169.49/Agency/upfile',
            filePath: that.data.licence1ImagePath[0],
            name: 'file',
            formData: {
              user: 'test'
            },
            success(res) {
              var path = res.data
              parameter = parameter + '&licence1ImagePath=' + path
              wx.uploadFile({ // 上传食品经营许可证
                url: 'http://47.105.169.49/Agency/upfile',
                filePath: that.data.licence2ImagePath[0],
                name: 'file',
                formData: {
                  user: 'test'
                },
                success(res) {
                  var path = res.data
                  parameter = parameter + '&licence2ImagePath=' + path
                  var openId = wx.getStorageSync('openId')
                  if (openId != undefined && openId != '') {
                    parameter = parameter + '&openId=' + openId
                  }
                  wx.request({
                    url: 'http://localhost:8080/Agency/pay/jsapiPay?tradeNo=' + data.mobilephone + '&totalFee=0.01',
                    success(res) {
                      wx.requestPayment({
                        timeStamp: res.data.timeStamp,
                        nonceStr: res.data.nonceStr,
                        package: res.data.prepayId,
                        signType: 'MD5',
                        paySign: res.data.paySign,
                        success(res) {
                          wx.request({
                            url: 'http://localhost:8080/Agency/agency/saveAgencyBase.do?' + parameter + '&isCooperation=1' + '&validPeriod=' + that.data.validPeriod,
                            success(res) {
                              var tmp = Date.parse(new Date()).toString();
                              tmp = tmp.substr(0, 10);

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
                }
              })
            }
          })
        }
      }
    })
  },

  //表单提交前的验证
  validation: function (data) {
    var that = this
    var agencyName = data.agencyName
    var addressDetail = data.addressDetail
    var logoImagePath = that.data.logoImagePathSubmit
    var licence1ImagePath = that.data.licence1ImagePathSubmit
    var licence2ImagePath = that.data.licence2ImagePathSubmit
    var mobilephone = data.mobilephone
    var validateCode = data.validateCode //判断验证码是否正确
    var validPeriod = data.time
    if (agencyName == undefined || agencyName == '') {
      that.showModal("请输入商家名称")
      return;
    }
    // if (addressDetail == undefined || addressDetail == '') {
    //   that.showModal("请输入地址")
    //   return;
    // }
    if (logoImagePath == undefined || logoImagePath == '') {
      that.showModal("请上传代理商logo")
      return;
    }
    if (licence1ImagePath == undefined || licence1ImagePath == '') {
      that.showModal("请上传营业执照")
      return;
    }
    if (licence2ImagePath == undefined || licence2ImagePath == '') {
      that.showModal("请上传食品经营许可证")
      return;
    }
    if (mobilephone == undefined || mobilephone == '') {
      that.showModal("请输入正确的手机号")
      return;
    }
    if (validateCode == undefined || validateCode == '') {
      that.showModal("验证码错误")
      return;
    }
    if (validPeriod == undefined || validPeriod == '') {
      that.showModal("请选择入驻时长")
      return;
    }
  },

  showModal: function(msg) {
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
  }
})