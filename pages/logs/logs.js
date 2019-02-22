//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },

  pay: function () {
    wx.requestPayment({
      timeStamp: '1550830958',
      nonceStr: '175e731c8acf4d249ba8e4e0d0582d1e',
      package: 'wx2218224125377251061936020594850699',
      signType: 'MD5',
      paySign: 'AB920CBF1205F491EC3F8B7BB8A5CC7CEA8E824A14354D3992AA5A4611C68798',
      success(res) {
        console.log(res)
       },
      fail(res) {
        console.log(res)
       }
    })
  }
})
