const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk = new QQMapWX({
  key: 'EBNBZ-ELC64-536UJ-XGRBP-FTFGK-OZBMF' // 必填
})
var longitude = wx.getStorageSync("longitude")
var latitude = wx.getStorageSync("latitude")
const userInfo = wx.getStorageSync('userInfo')
const openId = userInfo.openId
var currentProvince = wx.getStorageSync('currentProvince')
var currentCity = wx.getStorageSync('currentCity')
var currentArea = wx.getStorageSync('currentArea')

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
    dingwei: '/images/dingwei.jpg',
    wenImage: '/images/wen.png',
    addressDetail: '',
    tempFilePaths: [],
    uploadImagePath: '',
    publishCategory:'',
    choosedCategory: '',
    images: '', //最终需要上传的图片
    needPay: false, //设置为false是因为前期都不需要支付
    showModal: false,
    publishCost: '', //发布需要支付的费用
    publishCategorys: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({ //查询可选择的类目参数
      url: 'https://www.caoxianyoushun.com:8443/Agency/parameter/findParameter.do?paraDomain=publish.category',
      success(res) {
        console.log(res)
        that.setData({
          publishCategorys: res.data
        })
      }
    })
    wx.request({ //查询如果需要支付时的费用
      url: 'https://www.caoxianyoushun.com:8443/Agency/parameter/findParameter.do?paraDomain=publish.cost',
      success(res) {
        console.log(res)
        that.setData({
          publishCost: res.data[0].value
        })
      }
    })
    //that.translateAddress(latitude, longitude);
    wx.getLocation({
      success: function (res) {
        var new_latitude = res.latitude
        var new_longitude = res.longitude
        wx.setStorageSync('latitude', new_latitude)
        wx.setStorageSync('longitude', new_longitude)
        that.translateAddress(new_latitude, new_longitude)
        that.setData({
          latitude: new_latitude,
          longitude: new_longitude
        })
      },
    })
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    wx.request({ //判断是否已入驻
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyByOpenId.do?openId=' + openId,
      success(res) {
        if (res.data && res.data.isCooperation == '1') {
          that.setData({
            needPay: false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '信息发布',
    })
    var that = this;
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/parameter/findParameter.do',
      data: {
        paraDomain: 'publish.notice'
      },
      success (res) {
        console.log(res)
        that.setData({
          publishNotice: res.data[0].value
        })
      }
    })
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
    var that = this
    var choosedCategory = that.data.publishCategorys[e.detail.value]
    this.setData({
      index: e.detail.value,
      publishCategory: "sss",
      choosedCategory: choosedCategory.value
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
        var tempFilePaths = res.tempFilePaths
        var globalTempFilePaths = that.data.tempFilePaths
        if (globalTempFilePaths.length == 0) {
          globalTempFilePaths = tempFilePaths
        } else {
          for (var i = 0; i < tempFilePaths.length; i++) {
            globalTempFilePaths.push(tempFilePaths[i])
          }
        }
        

        // for (var i = 0; i < res.tempFilePaths.length; i++) {
        //   for (var j = 0; j < that.data.tempFilePaths.length; j ++) {
        //     if (res.tempFilePaths[i] == that.data.tempFilePaths[j]) {
        //       res.tempFilePaths[i].splice(i,1)
        //     }
        //   }
        // }
        console.log("sss", tempFilePaths)
        that.setData({
          tempFilePaths: globalTempFilePaths
        })
      }
    })
  },

  radioChange: function (e) {
    console.log(e.detail.value)
  },

  formSubmit: function (e) {
    console.log(e)
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var avatarUrl = userInfo.avatarUrl
    var nickName = userInfo.nickName
    var ranges = [
      '\ud83c[\udf00-\udfff]',
      '\ud83d[\udc00-\ude4f]',
      '\ud83d[\ude80-\udeff]'
    ]
    nickName = nickName.replace(new RegExp(ranges.join('|'), 'g'), '')
    var formId = e.detail.formId
    wx.request({ //保存formId发送模板消息时使用
      url: 'https://www.caoxianyoushun.com:8443/Agency/template/saveFormIdForTemplate',
      data: {
        openId: openId,
        formId: formId
      }
    })
    var temp = that.data.tempFilePaths
    var data = e.detail.value
    var isTop = 0
    var description = data.description
    var contactName = data.contactName
    var mobilephone = data.mobilephone
    var address = data.address
    var tempFilePaths = that.data.tempFilePaths
    if (that.data.publishCategory == '') {
      that.showModal("请选择类目")
      return;
    }
    if (description == undefined || description == '') {
      that.showModal("请填写信息内容")
      return;
    }
    if (contactName == undefined || contactName == '') {
      that.showModal("请填写联系人姓名")
      return;
    }
    if (mobilephone == undefined || mobilephone == '') {
      that.showModal("请填写联系人电话")
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(mobilephone))) {
      that.showModal("请填写正确的手机号")
      return;
    }
    if (address == undefined || address == '') {
      that.showModal("请填写详细地址")
      return;
    }
    description = description.replace(new RegExp(ranges.join('|'), 'g'), '')
    if (data.switch) {
      isTop = 1
    }
    wx.showToast({
      title: '拼命加载中',
      image: '/images/loading.png',
      duration: 3000,
      mask: true
    })
    var imagePath = wx.getStorageSync('images')
    if (!currentProvince) {
      that.resetLocation()
    }
    var currentProvince = wx.getStorageSync('currentProvince')
    var currentCity = wx.getStorageSync('currentCity')
    var currentArea = wx.getStorageSync('currentArea')
    var parameter = 'address=' + data.address + '&contactName=' + data.contactName + '&mobilephone=' + data.mobilephone
      + '&description=' + data.description + '&category=' + that.data.choosedCategory + '&openId=' + openId + '&province=' + currentProvince + '&city=' + currentCity + '&area=' + currentArea + '&avatarUrl=' + avatarUrl + '&nickName=' + nickName
    that.data.parameter = parameter
    that.uploadDIY(tempFilePaths, 0, 0, 0, tempFilePaths.length, parameter)
    if (temp.length > 0) {
      // var imagePath = ''
      // for (var i = 0; i < temp.length; i++) {
      //   //that.uploadDIY(temp, 0, 0, 0, temp.length, parameter)
      //   if (wx.getStorageSync(temp[i])) {
      //     console.log('key', wx.getStorageSync(temp[i]))
      //     if (imagePath == '') {
      //       imagePath = wx.getStorageSync(temp[i])
      //     } else {
      //       imagePath = imagePath + ',' + wx.getStorageSync(temp[i])
      //     }
      //   }
      // }
      // parameter = parameter + '&images=' + encodeURIComponent(imagePath)
      // console.log(parameter)
    } //直接调用保存发布信息的接口
    console.log("parameter", parameter)
    if (that.data.needPay) {
      wx.request({
        url: 'https://www.caoxianyoushun.com:8443/Agency/pay/jsapiPay?tradeNo=' + data.mobilephone + '&totalFee=' + that.data.publishCost,
        success(res) {
          wx.requestPayment({
            timeStamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.prepayId,
            signType: 'MD5',
            paySign: res.data.paySign,
            success(res) {
              wx.request({
                url: 'https://www.caoxianyoushun.com:8443/Agency/publish/savePublishContent.do?' + parameter,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  wx.removeStorage({ //清楚图片路径缓存
                    key: 'images',
                    success: function(res) {},
                  })
                  that.setData({
                    uploadImagePath: ''
                  })
                }
              })
              wx.redirectTo({
                url: '/pages/publishSuccess/publishSuccess',
              })
              console.log(res)
            },
            fail(res) {
              console.log(res)
            }
          })
        }
      })
    } else {
      // wx.request({
      //   url: 'https://www.caoxianyoushun.com:8443/Agency/publish/savePublishContent.do?' + parameter,
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success(res) {
      //     wx.removeStorage({ //清楚图片路径缓存
      //       key: 'images',
      //       success: function (res) { },
      //     })
      //     that.setData({
      //       uploadImagePath: ''
      //     })
      //     wx.redirectTo({
      //       url: '/pages/publishSuccess/publishSuccess',
      //     })
      //   }
      // })
      //并且需要跳转到提交成功页面
    }
    //提交成功之后需要删除缓存里的图片路径
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

  translateAddress: function (latitude, longitude) {
    var that = this
    qqmapsdk.reverseGeocoder({
      location: latitude + ',' + longitude,
      success: function (res) {//成功后的回调
        console.log(res);
        var address = res.result.address;
        that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          addressDetail: address
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  
  uploadDIY(filePaths, successUp, failUp, i, length) {
    var that = this
    wx.uploadFile({
      url: 'https://www.caoxianyoushun.com:8443/Agency/upfile',
      filePath: filePaths[i],
      name: 'fileData',
      // formData: {
      //   'pictureUid': owerId,
      //   'pictureAid': albumId
      // },
      success: (resp) => {
        console.log(resp)
        var images = that.data.images
        if (images) {
          images = images + ',' + resp.data
        } else {
          images = resp.data
        }
        that.setData({
          images: images
        })
        wx.setStorageSync('images', images)
        // if (wx.getStorageSync(filePaths[i]) != undefined) {
        //   wx.setStorageSync(filePaths[i], resp.data)
        // }
        // var tempUploadImagePath = that.data.uploadImagePath
        // if (tempUploadImagePath == '') {
        //   that.data.uploadImagePath = resp.data
        // } else {
        //   that.data.uploadImagePath = tempUploadImagePath + ',' + resp.data
        // }
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {
          var parameter = that.data.parameter+ '&images=' + encodeURIComponent(that.data.images) 
          wx.request({
            url: 'https://www.caoxianyoushun.com:8443/Agency/publish/savePublishContent.do?' + parameter,
            //url: 'http://localhost:8080/Agency/publish/savePublishContent.do?' + parameter,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              wx.removeStorage({ //清楚图片路径缓存
                key: 'images',
                success: function (res) { },
              })
              that.setData({
                uploadImagePath: ''
              })
              wx.redirectTo({
                url: '/pages/publishSuccess/publishSuccess',
              })
            }
          })
        }
        else {  //递归调用uploadDIY函数
          this.uploadDIY(filePaths, successUp, failUp, i, length);
        }
      },
    });
  },

  //隐藏发布须知
  onConfirm: function() {
    this.setData({
      showModal: false
    });
  },

  //显示发布须知
  showDialog: function() {
    this.setData({
      showModal: true
    });
  },

  chooseAddress: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          addressDetail: res.address
        });
      },
    })
  },

  deleteImg: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.id
    var that = this
    var globalTempFilePaths = that.data.tempFilePaths
    globalTempFilePaths.splice(index, 1)
    that.setData({
      tempFilePaths: globalTempFilePaths
    })
  },

  resetLocation: function () { //再次获取定位
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log("latitude = " + latitude)
        console.log("longitude = " + longitude)
        wx.setStorageSync("latitude", latitude)
        wx.setStorageSync("longitude", longitude)
        console.log("speed = " + speed)
        console.log("accuracy = " + accuracy)
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?key=EBNBZ-ELC64-536UJ-XGRBP-FTFGK-OZBMF&location=' + latitude + ',' + longitude,
          success(locationRes) {
            console.log("location_res")
            console.log(locationRes)

            wx.setStorageSync('currentProvince', locationRes.data.result.address_component.province)
            wx.setStorageSync('currentCity', locationRes.data.result.address_component.city)
            wx.setStorageSync('currentArea', locationRes.data.result.address_component.district)
          }
        })
      }
    })
  }
})