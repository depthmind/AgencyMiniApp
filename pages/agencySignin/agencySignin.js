const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk = new QQMapWX({
  key: 'EBNBZ-ELC64-536UJ-XGRBP-FTFGK-OZBMF' // 必填
})
const agencyType = 'normal'
var allValidPeriod = [] //全部可选时长和需支付的费用
var fee = '0';
var longitude = wx.getStorageSync("longitude")
var latitude = wx.getStorageSync("latitude")
var currentProvince = wx.getStorageSync('currentProvince')
var currentCity = wx.getStorageSync('currentCity')
var currentArea = wx.getStorageSync('currentArea')
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
    validPeriod: '',
    provinceIndex: 0,
    cityIndex: 0,
    areaIndex: 0,
    selectedArea: '',
    arr: [], //标签数组：用来存储选中的值
    showModal: false,
    dingwei: '/images/dingwei.jpg',
    wenImage: '/images/wen.png',
    defaultProvince: '北京市',
    defaultCity: '北京市',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    wx.getLocation({ //初始地址
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
    wx.request({ //判断是否已入驻
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyByOpenId.do?openId=' + openId + '&type=' + agencyType,
      success(res) {
        console.log('点一下这里--', res.data)
        if (res.data && res.data.isCooperation == '1') {
          wx.showModal({
            title: '提示',
            content: '您已经入驻过了哦',
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/mine/mine',
                })
              } else if (res.cancel) {
                wx.switchTab({
                  url: '/pages/mine/mine',
                })
              }
            }
          })
        }
      }
    })
    wx.request({ //查询可选择的入驻时长参数
      url: 'https://www.caoxianyoushun.com:8443/Agency/parameter/findParameter.do?paraDomain=agency.validPeriod',
      //url: 'http://localhost:8080/Agency/parameter/findParameter.do?paraDomain=agency.validPeriod',
      success(res) {
        allValidPeriod = res.data
        that.setData({
          validPeriod: res.data
        })
      }
    })

    wx.request({ //查询可选择的入驻时长参数
      url: 'https://www.caoxianyoushun.com:8443/Agency/parameter/findParameter.do?paraDomain=area.fee',
      success(res) {
        that.setData({
          areaFee: res.data[0].value
        })
      }
    })

    qqmapsdk.getCityList({
      success: function (res) {//成功后的回调
        //console.log(res);
        var province = new Array()
        province = res.result[0]
        console.log(province);
        wx.setStorageSync("provinces", province)
        var provinceId = province[0].id
        var citys = res.result[1]
        wx.setStorageSync("citys", citys)
        var city = new Array()
        city.push(province[0])
        var tmp = new Array()
        for (var i = 0; i < citys.length; i++) {
          var start = citys[i].id.slice(0, 3)
          if (start == 110) { //直辖市可以比较前三位
            tmp.push(citys[i])
          }
        }
        var area = res.result[2]
        that.setData({
          province: province,
          provinceIndex: 0,
          city: province,
          citys: city,
          area: tmp
        })
        //console.log('省份数据：', res.result[0]); //打印省份数据
        //console.log('城市数据：', res.result[1]); //打印城市数据
        //console.log('区县数据：', res.result[2]); //打印区县数据
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
        });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '代理商入驻',
    })
    var that = this
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/parameter/findParameter.do',
      data: {
        paraDomain: 'signin.notice'
      },
      success(res) {
        console.log(res)
        that.setData({
          signinNotice: res.data[0].value
        })
      }
    })
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
          wechatImagePath: tempFilePaths,
          wechatImagePathSubmit: tempFilePaths
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
    var that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          addressDetail: res.address
        });
      },
    })
  },

  radioChange: function (e) {
    console.log(e.detail.value)
    var that = this
    fee = '0'
    fee = allValidPeriod[e.detail.value - 1].chinese;
    that.data.validPeriod = e.detail.value
  },

  formSubmit: function (e) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var temp = that.data.tempFilePaths
    var data = e.detail.value
    that.validation(data)
    wx.showToast({
      title: '拼命加载中',
      image: '/images/loading.png',
      duration: 3000,
      mask: true
    })
    //选中区域
    var selectedArea = that.data.arr
    var area = ''
    var cityArea = that.data.area //所选城市下的区县
    var amountOfSelectedArea = selectedArea.length
    var areaFee = that.data.areaFee
    var totalFee = fee
    if (amountOfSelectedArea > 1) {
      var tmpFee = parseInt(areaFee) * (selectedArea.length - 1)
      totalFee = parseInt(fee) + tmpFee
    }
    for (var s = 0; s < amountOfSelectedArea; s++) {
      for (var c = 0; c < cityArea.length; c++) {
        if (cityArea[c].id == selectedArea[s]) {
          if (area == '') {
            area = cityArea[c].fullname
          } else {
            area = area + ',' + cityArea[c].fullname
          }
        }
      }
    }
    console.log('area-----', area)
    var parameter = "agencyName=" + data.agencyName + '&description=' + data.description + '&contactName=' + data.contactName + "&address=" + data.addressDetail + "&mobilephone=" + data.mobilephone + "&time=" + data.time + '&area=' + area + '&type=' + agencyType + '&openId=' + openId + '&longitude=' + longitude + '&latitude=' + latitude + '&province=' + that.data.defaultProvince + '&city=' + that.data.defaultCity
    wx.uploadFile({ // 上传代理商logo
      url: 'https://www.caoxianyoushun.com:8443/Agency/upfile',
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
            url: 'https://www.caoxianyoushun.com:8443/Agency/upfile',
            filePath: that.data.wechatImagePath[0],
            name: 'file',
            formData: {
              user: 'test'
            },
            success(res) {
              var path = res.data
              parameter = parameter + '&wechatImagePath=' + path
              wx.uploadFile({ // 上传营业执照
                url: 'https://www.caoxianyoushun.com:8443/Agency/upfile',
                filePath: that.data.wechatImagePath[0],
                name: 'file',
                formData: {
                  user: 'test'
                },
                success(res) {
                  var path = res.data
                  parameter = parameter + '&licence1ImagePath=' + path
                  wx.uploadFile({ // 上传食品经营许可证
                    url: 'https://www.caoxianyoushun.com:8443/Agency/upfile',
                    filePath: that.data.wechatImagePath[0],
                    name: 'file',
                    formData: {
                      user: 'test'
                    },
                    success(res) {
                      var path = res.data
                      parameter = parameter + '&licence2ImagePath=' + path
                      console.log("parameter", parameter)
                      wx.request({
                        url: 'https://www.caoxianyoushun.com:8443/Agency/pay/jsapiPay?tradeNo=' + data.mobilephone + '&totalFee=' + totalFee + '&openId=' + openId,
                        success(res) {
                          wx.requestPayment({
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.prepayId,
                            signType: 'MD5',
                            paySign: res.data.paySign,
                            success(res) {
                              wx.showToast({
                                title: '支付成功',
                              })
                              wx.request({
                                url: 'https://www.caoxianyoushun.com:8443/Agency/agency/saveAgencyBase.do?' + parameter + '&isCooperation=1' + '&validPeriod=' + that.data.validPeriod,
                                success(res) {
                                  wx.showToast({
                                    title: '保存代理商成功',
                                  })
                                  wx.redirectTo({
                                    url: '/pages/agencyCenter/agencyCenter',
                                  })
                                },
                                fail(res) {
                                  wx.showToast({
                                    title: res.errMsg,
                                  })
                                }
                              })
                              console.log(res)
                            },
                            fail(res) {
                              console.log(res)
                              wx.showToast({
                                title: res.errMsg,
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
        } else {
          wx.uploadFile({ // 上传营业执照
            url: 'https://www.caoxianyoushun.com:8443/Agency/upfile',
            filePath: that.data.licence1ImagePath[0],
            name: 'file',
            formData: {
              user: 'test'
            },
            success(res) {
              var path = res.data
              parameter = parameter + '&licence1ImagePath=' + path
              wx.uploadFile({ // 上传食品经营许可证
                url: 'https://www.caoxianyoushun.com:8443/Agency/upfile',
                filePath: that.data.licence2ImagePath[0],
                name: 'file',
                formData: {
                  user: 'test'
                },
                success(res) {
                  var path = res.data
                  parameter = parameter + '&licence2ImagePath=' + path
                  console.log("parameter", parameter)
                  wx.request({
                    url: 'https://www.caoxianyoushun.com:8443/Agency/pay/jsapiPay?tradeNo=' + data.mobilephone + '&totalFee=' + totalFee + '&openId=' + openId,
                    success(res) {
                      wx.requestPayment({
                        timeStamp: res.data.timeStamp,
                        nonceStr: res.data.nonceStr,
                        package: res.data.prepayId,
                        signType: 'MD5',
                        paySign: res.data.paySign,
                        success(res) {
                          wx.request({
                            url: 'https://www.caoxianyoushun.com:8443/Agency/agency/saveAgencyBase.do?' + parameter + '&isCooperation=1' + '&validPeriod=' + that.data.validPeriod,
                            success(res) {
                              var tmp = Date.parse(new Date()).toString();
                              tmp = tmp.substr(0, 10);

                            }
                          })
                          wx.redirectTo({
                            url: '/pages/agencyCenter/agencyCenter',
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
    // var description = data.description
    if (agencyName == undefined || agencyName == '') {
      that.showModal("请输入商家名称")
      return;
    }
    // if (description == undefined || description == '') {
    //   that.showModal("请填写商家简介")
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
    if (!(/^1[34578]\d{9}$/.test(mobilephone))) {
      that.showModal("请填写正确的手机号")
      return;
    }
    // if (validateCode == undefined || validateCode == '') {
    //   that.showModal("验证码错误")
    //   return;
    // }
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
  },
  
  chooseAddress: function () {
    // wx.navigateTo({
    //   url: '/pages/map/map',
    // })
    var that = this
    // wx.getLocation({
    //   success: function(res) {
    //     var new_latitude = res.latitude
    //     var new_longitude = res.longitude
    //     wx.setStorageSync('latitude', new_latitude)
    //     wx.setStorageSync('longitude', new_longitude)
    //     that.translateAddress(new_latitude, new_longitude)
    //     that.setData({
    //       latitude: latitude,
    //       longitude: longitude
    //     })
    //   },
    // })
    wx.chooseLocation({
      success: function (res) {
        that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          addressDetail: res.address
        });
      },
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

  bindPickerChangeProvince: function (e) {
    var that = this
    console.log(e)
    that.data.arr = []
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;

    var provinceId = this.data.province[index].id; // 这个id就是选中项的id
    var province = wx.getStorageSync("provinces")[index]
    that.data.defaultProvince = province.fullname
    that.data.defaultCity = province.fullname
    if (provinceId == "110000" || provinceId == "120000" || provinceId == "310000" || provinceId == "500000"
      || provinceId == "810000" || provinceId == "820000") {
      var id = provinceId.slice(0, 2)
      var citys = wx.getStorageSync("citys")
      var tmp = new Array(); //city
      for (var i = 0; i < citys.length; i++) {
        var start = citys[i].id.slice(0, 2)
        if (start == id) {
          tmp.push(citys[i])
        }
      }
      var provinceArr = []
      provinceArr.push(province)
      
      that.setData({
        citys: provinceArr,
        area: tmp,
        provinceIndex: index,
        cityIndex: 0
      })
    } else {
      var id = provinceId.slice(0, 2)
      var citys = wx.getStorageSync("citys")
      var tmp = new Array(); //city
      for (var i = 0; i < citys.length; i++) {
        var start = citys[i].id.slice(0, 2)
        if (start == id) {
          tmp.push(citys[i])
        }
      }
      that.data.defaultCity = tmp[0].fullname //第一个市的名称
      qqmapsdk.getDistrictByCityId({
        // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
        id: tmp[0].id, //对应接口getCityList返回数据的Id，如：北京是'110000'
        success: function (res) {//成功后的回调
          var area = res.result[0]
          
          for (var a = 0; a < area.length; a++) {
            area[a].checked = ''
          }
          that.setData({
            area: area
          })
          //wx.setStorageSync("area", citys) 查询之后存储，下次就不通过网络查询了
        },
        fail: function (error) {
          console.error(error);
        },
        complete: function (res) {
          console.log(res);
        }
      })
      that.setData({
        citys: tmp,
        provinceIndex: index,
        cityIndex: 0
      })
    }

    
    // this.setData({
    //   index: e.detail.value
    // })
  },

  bindPickerChangeCity: function (e) {
    var that = this
    that.data.arr = []
    console.log(e)
    var cityIndex = e.detail.value
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var cityId = that.data.citys[cityIndex].id;
    that.data.defaultCity = that.data.citys[cityIndex].fullname
    qqmapsdk.getDistrictByCityId({
      // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
      id: cityId, //对应接口getCityList返回数据的Id，如：北京是'110000'
      success: function (res) {//成功后的回调
        console.log(res);
        console.log('对应城市ID下的区县数据(以北京为例)：', res.result[0]);
        var area = res.result[0]
        for (var a=0;a<area.length;a++) {
          area[a].checked=''
        }
        that.setData({
          cityIndex: e.detail.value,
          area: area
        })
        //wx.setStorageSync("area", citys) 查询之后存储，下次就不通过网络查询了
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  checkLabs: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index,
      area = that.data.area,
      value = e.currentTarget.dataset.value,
      arr = this.data.arr,
      val = area[index].checked, //点击前的值
      limitNum = 5,
      curNum = 0; //已选择数量
    // if (that.data.selectedArea == '') {
    //   selectedArea = area[index].fullname
    // } else {
    //   selectedArea
    // }
    //选中累加
    for (var i in area) {
      if (area[i].checked) {
        curNum += 1;
      }
    }
    if (!val) {
      arr.push(value);
    } else {
      for (var i in arr) {
        if (arr[i] == value) {
          arr.splice(i, 1);
        }
      }

    }
    area[index].checked = !val;

    this.setData({
      area: area
    })

  },

  //隐藏发布须知
  onConfirm: function () {
    this.setData({
      showModal: false
    });
  },

  //显示发布须知
  showDialog: function () {
    this.setData({
      showModal: true
    });
  },

  uploadDIY(filePaths, successUp, failUp, i, length) {
    var that = this
    wx.uploadFile({
      url: 'https://www.caoxianyoushun.com:8443/Agency/upfile',
      filePath: filePaths[i],
      name: 'fileData',
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
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {
          var parameter = that.data.parameter + '&images=' + encodeURIComponent(that.data.images)
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
})