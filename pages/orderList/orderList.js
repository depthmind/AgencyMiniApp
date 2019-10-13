var app = getApp();
const operatePlatformUrl = app.globalData.operatePlatformUrl
const entNum = app.globalData.entNum
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '全部', index: 0 }, { name: '待付款', index: 1 }, { name: '待收货', index: 2 }, { name: '已完成', index: 3 }, { name: '售后', index: 4 }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    if (options.status == 1) {
      that.setData({
        currtab: 1
      })
    } else if (options.status == 2) {
      that.setData({
        currtab: 2
      })
    } else if (options.status == 3) {
      that.setData({
        currtab: 3
      })
    } else if (options.status == 4) {
      that.setData({
        currtab: 4
      })
    } else if (options.status == 5) {
      that.setData({
        currtab: 0
      })
    }
    // that.setData({
    //   currtab: onCurrtab
    // })
    //that.initOrderList(options.status)
    that.getDeviceInfo()
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

  /**订单列表 */
  initOrderList: function (status) {
    var that = this
    wx.request({
      url: operatePlatformUrl + '/api/order/orders/status',
      data:{
        entNum: entNum,
        openId: 1,
        status: status
      },
      success (res) {
        console.log(res.data)
        switch (status) {
          case 1:
            that.setData({
              waitPayOrder: res.data
            })
          break
          case 2:
            that.setData({
              waitReceiveOrder: res.data
            })
          break
          case 3:
            that.setData({
              completedOrder: res.data
            })
            break
          case 4:
            that.setData({
              afterSaleList: res.data
            })
            break
          case 5:
            that.setData({
              allOrder: res.data
            })
            break
        }
      }
    })
  },

  /**切换订单状态 */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.initOrderList(e.detail.current)
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
})