// pages/addGoods/addGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oneLevelCategory: '',
    secondLevelCategory: '',
    choosedOneLevelCategory: '',
    choosedSecondLevelCategory: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({ //查询可选择的类目参数
      url: 'http://localhost:8080/Agency/category/findOneLevelCategory.do',
      success(res) {
        console.log(res)
        that.setData({
          oneLevelCategorys: res.data
        })
      }
    })
    wx.request({ //查询可选择的类目参数
      url: 'http://localhost:8080/Agency/category/findSecondLevelCategory.do',
      success(res) {
        console.log(res)
        that.setData({
          secondLevelCategorys: res.data
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

  bindPickerChange1: function (e) {
    console.log("选择产品分类")
    console.log(e)
    this.setData({
      index1: e.detail.value,
      oneLevelCategory: "sss",
      choosedOneLevelCategory: e.detail.value + 1
    })
  },

  bindPickerChange2: function (e) {
    console.log("选择产品分类")
    console.log(e)
    this.setData({
      index2: e.detail.value,
      secondLevelCategory: "sss",
      choosedSecondLevelCategory: e.detail.value + 1
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

formSubmit: function () {
  if (that.data.publishCategory == '') {
    that.showModal("请选择类目")
    return;
  }
}
})