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
    wx.request({
      url: 'http://localhost:8080/Agency/pay/jsapiPay?tradeNo=koejoijfwer2goi&totalFee=1',
      success(res) {
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.prepayId,
          signType: 'MD5',
          paySign: res.data.paySign,
          success(res) {
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
