// pages/agency/agency.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'halfYear', value: '半年' },
      { name: 'oneMonth', value: '一个月' },
      { name: 'onYear', value: '一年', checked: 'true' },
    ],
    addressDetail: '',
    logoImagePath: '/images/logo-image.jpg',
    wechatImagePath: '/images/logo-image.jpg',
    licence1ImagePath: '/images/logo-image.jpg',
    licence2ImagePath: '/images/logo-image.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
          logoImagePath: tempFilePaths
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
          licence1ImagePath: tempFilePaths
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
          licence2ImagePath: tempFilePaths
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
  },

  formSubmit: function (e) {
    var that = this
    var temp = that.data.tempFilePaths
    var data = e.detail.value
    var validateCode= data.validateCode //先判断验证码是否正确
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
                      url: 'http://localhost:8080/Agency/agency/saveAgencyBase.do?' + parameter,
                      success(res) {
                        
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
    
  }
})