// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],  
    index: 0,
    items: [
      { name: 'top', value: '是' },
      { name: 'notTop', value: '否', checked: 'true' },
    ],
    imagePath: '/images/photo.png',
    addressDetail: '',
    tempFilePaths: [],
    uploadImagePath: '',
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
    wx.setNavigationBarTitle({
      title: '信息发布',
    })
    var that = this;
    // wx.request({
    //   url: '', //查询分类信息
    //   success(res) {
    //     console.log(res.data)
    //     that.setData
    //   }
    // })
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

  /**
   * 选择产品分类
   */
  bindPickerChange: function (e) {
    console.log("选择产品分类")
    console.log(e)
    this.setData({
      index: e.detail.value
    })
  },

  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.data.tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: that.data.tempFilePaths
        })
      }
    })
  },

  radioChange: function (e) {
    console.log(e.detail.value)
  },

  chooseAddress: function () {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },

  formSubmit: function (e) {
    console.log(e)
    var that = this
    var temp = that.data.tempFilePaths
    var data = e.detail.value
    var isTop = 0
    if (data.switch) {
      isTop = 1
    }
    var parameter = 'address=' + data.address + '&contactName=' + data.contactName + '&mobilePhone=' + data.mobilePhone
      + '&description=' + data.description + '&isTop=' + isTop
    if (temp.length > 0) {
      for (var i = 0; i < temp.length; i++) {
        wx.uploadFile({
          url: 'http://47.105.169.49/Agency/upfile',
          filePath: temp[i],
          name: 'file',
          formData: {
            user: 'test'
          },
          success(res) {
            var path = res.data
            if (that.data.uploadImagePath == '') {
              that.data.uploadImagePath = path
            } else {
              that.data.uploadImagePath = that.data.uploadImagePath + '|' + path 
            }
            if (i = temp.length - 1) {
              console.log(that.data.uploadImagePath)
              parameter = parameter + '&images=' + that.data.uploadImagePath
              wx.request({
                url: 'http://47.105.169.49/Agency/publish/savePublishContent.do?' + parameter,
                success(res) {
                  console.log(res)
                }
              })
            }
          }
        })
      }
    } else { //直接调用保存发布信息的接口
      wx.request({
        url: 'http://47.105.169.49/Agency/publish/savePublishContent.do?' + parameter,
        success(res) {
          console.log(res)
        }
      })
    }
    console.log(e)
  }
})