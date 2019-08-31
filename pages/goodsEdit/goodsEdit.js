var currentProvince = wx.getStorageSync('currentProvince')
var currentCity = wx.getStorageSync('currentCity')
var currentArea = wx.getStorageSync('currentArea')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '/images/photo.png',
    uploadImagePath: '',
    oneLevelCategory: '',
    secondLevelCategory: '',
    choosedOneLevelCategory: '',
    choosedSecondLevelCategory: '',
    choosedBrandCategory: '',
    choosedSeriesCategory: '',
    arr: [], //标签数组：用来存储选中的值
    platformCategoryFlag: false,
    seriesCategoryFlag: false,
    seriesCategorys: '',
    brandCategory: '',
    tempFilePaths: [],
    oldTempFilePaths: [],
    newTempFilePaths: [],
    brandCategorysArr: [],
    goodsPicArr: [],
    index1: '',
    index2: '',
    goodsId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var goodsId = options.goodsId
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var oneLevelCategorys = []
    that.data.goodsId = goodsId //全局使用
    wx.request({ //查询可选择的类目参数
      url: 'https://www.caoxianyoushun.com:8443/Agency/category/findOneLevelCategory.do',
      success(res) {
        oneLevelCategorys = res.data
        console.log(res)
        that.setData({
          oneLevelCategorys: oneLevelCategorys
        })

        var brandCategorys = []
        wx.request({ //查询可选择的品牌分类
          url: 'https://www.caoxianyoushun.com:8443/Agency/brand/findBrandCategory.do',
          data: {
            openId: openId
          },
          success(res) {
            brandCategorys = res.data
            console.log(res)
            that.setData({
              brandCategorys: brandCategorys,
              brandCategorysArr: brandCategorys
            })

            wx.request({
              url: 'https://www.caoxianyoushun.com:8443/Agency/goods/findGoodsById.do?goodsId=' + goodsId,
              //url: 'http://localhost:8080/Agency/goods/findGoodsById.do?goodsId=' + goodsId,
              success(res) {
                var data = res.data
                var agencyId = data.agencyId
                var area = data.area
                var city = data.city
                var goodsDescription = data.goodsDescription
                var goodsName = data.goodsName
                var goodsPic = data.goodsPic
                var stock = data.stock
                var goodsPicArr = []
                var firstPic = ''
                if (goodsPic) {
                  goodsPicArr = goodsPic.split(',')
                  firstPic = goodsPicArr[0]
                }
                var index1 = ''
                var index2 = ''
                for (var i = 0; i < oneLevelCategorys.length; i++) {
                  if (oneLevelCategorys[i].id == res.data.oneLevelCategory) {
                    index1 = i
                  }
                }
                for (var i = 0; i < brandCategorys.length; i++) {
                  if (brandCategorys[i].id == res.data.brandCategory) {
                    index2 = i
                  }
                }
                var brandCategory = ''
                if (brandCategorys[index2] && brandCategorys[index2].categoryName) {
                  brandCategory = brandCategorys[index2].categoryName
                }
                that.setData({
                  goodsPicArr: goodsPicArr,
                  tempFilePaths: goodsPicArr,
                  oldTempFilePaths: goodsPicArr, //用于删除图片操作
                  globalTempFilePaths: goodsPicArr,
                  goodsName: goodsName,
                  goodsId: goodsId,
                  goods: res.data,
                  firstPic: firstPic,
                  goodsDescription: goodsDescription,
                  index1: index1,
                  index2: index2,
                  oneLevelCategory: oneLevelCategorys[index1].text,
                  brandCategory: brandCategory
                })
              }
            })
          }
        })
      }
    })

    // wx.request({ //查询可选择的类目参数
    //   url: 'https://www.caoxianyoushun.com:8443/Agency/category/findSecondLevelCategory.do',
    //   success(res) {
    //     console.log(res)
    //     that.setData({
    //       secondLevelCategorys: res.data
    //     })
    //   }
    // })
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
    var that = this
    console.log("选择产品分类")
    console.log(e)
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/category/findSecondLevelCategory.do',
      data: {
        oneLevelCategoryId: parseInt(e.detail.value) + 1
      },
      success(res) {
        that.setData({
          secondLevelCategorys: res.data,
          platformCategoryFlag: true,
        })
      }
    })
    that.setData({
      index1: e.detail.value,
      oneLevelCategory: "sss",
      choosedOneLevelCategory: parseInt(e.detail.value) + 1
    })
  },

  bindPickerChange2: function (e) {
    var that = this
    console.log("选择产品分类")
    console.log(e)
    var index = e.detail.value
    var brandId = that.data.brandCategorysArr[index].id
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/series/findSeriesCategory.do',
      data: {
        brandId: brandId
      },
      success(res) {
        that.setData({
          seriesCategorys: res.data,
          seriesCategoryFlag: true,
        })
      }
    })
    that.setData({
      index2: e.detail.value,
      brandCategory: "sss",
      choosedBrandCategory: brandId,
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

  formSubmit: function (e) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var data = e.detail.value
    if (that.data.oneLevelCategory == '') {
      that.showModal("请选择平台分类")
      return;
    }
    if (that.data.brandCategory == '') {
      that.showModal("请选择品牌分类")
      return;
    }
    if (data.goodsName == '') {
      that.showModal("请填写商品名称")
      return;
    }
    // if (data.price == '') {
    //   that.showModal("请填写价格")
    //   return;
    // }
    // if (data.stock == '') {
    //   that.showModal("请填写商品数量")
    //   return;
    // }
    if (data.goodsDescription == '') {
      that.showModal("请填写商品介绍")
      return;
    }
    wx.showToast({
      title: '拼命加载中',
      image: '/images/loading.png',
      duration: 3000,
      mask: true
    })
    var oneLevelCategory = that.data.choosedOneLevelCategory
    var secondLevelCategory = that.data.choosedSecondLevelCategory
    var brandCategory = that.data.choosedBrandCategory
    var seriesCategory = that.data.choosedSeriesCategory
    var agencyId = that.data.agencyId
    var goodsName = data.goodsName
    var price = data.price
    var stock = data.stock
    var goodsDescription = data.goodsDescription
    var pictures = that.data.oldTempFilePaths
    var goodsPic = ''
    if (pictures.length > 0) {
      for (var i = 0; i < pictures.length; i ++) {
        if (i == pictures.length - 1) {
          goodsPic = pictures[i]
        } else {
          goodsPic = pictures[i] + ','
        }
      }
    }
    var allGoodsPic = that.data.tempFilePaths
    var newGoodsPic = []
    var oldGoodsPic = ''
    for (var i = 0; i < allGoodsPic.length; i++) {
      if (allGoodsPic[i].indexOf("/tmp/") > -1) {
        newGoodsPic.push(allGoodsPic[i])
      } else {
        if (oldGoodsPic == '') {
          oldGoodsPic = allGoodsPic[i]
        } else {
          oldGoodsPic = oldGoodsPic + ',' + allGoodsPic[i]
        }
      }
    }
    that.data.oldGoodsPic = oldGoodsPic
    that.data.goodsPic = goodsPic //用于判断是否将原来的图片全部删除
    var currentProvince = wx.getStorageSync('currentProvince')
    var currentCity = wx.getStorageSync('currentCity')
    var currentArea = wx.getStorageSync('currentArea')
    var newTempFilePaths = that.data.newTempFilePaths
    if (newGoodsPic.length > 0) {
      var parameter = 'openId=' + openId + '&province=' + currentProvince + '&city=' + currentCity + '&area=' + currentArea + '&goodsName=' + goodsName + '&goodsDescription=' + goodsDescription + '&price=' + price + '&stock=' + stock + '&oneLevelCategory=' + oneLevelCategory + '&brandCategory=' + brandCategory + '&id=' + that.data.goodsId
      that.data.parameter = parameter
      that.uploadDIY(newGoodsPic, 0, 0, 0, newGoodsPic.length)
    } else {
      wx.request({
        url: 'https://www.caoxianyoushun.com:8443/Agency/goods/updateGoods.do',
        //url: 'http://localhost:8080/Agency/goods/updateGoods.do',
        data: {
          openId: openId,
          province: currentProvince,
          city: currentCity,
          area: currentArea,
          goodsName: goodsName,
          goodsDescription: goodsDescription,
          price: price,
          stock: stock,
          goodsPic: oldGoodsPic,
          oneLevelCategory: oneLevelCategory,
          secondLevelCategory: secondLevelCategory,
          brandCategory: brandCategory,
          seriesCategory: seriesCategory,
          id: that.data.goodsId
        },
        success(res) {
          wx.navigateTo({
            url: '../../pages/goodsList/goodsList',
          })
        }
      })
    }
  },

  checkLabs1: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index,
      secondLevelCategorys = that.data.secondLevelCategorys,
      value = e.currentTarget.dataset.value,
      arr = this.data.arr,
      val = secondLevelCategorys[index].checked, //点击前的值
      limitNum = 1,
      curNum = 0; //已选择数量
    // if (that.data.selectedArea == '') {
    //   selectedArea = area[index].fullname
    // } else {
    //   selectedArea
    // }

    //选中累加
    for (var i in secondLevelCategorys) {
      if (secondLevelCategorys[i].checked) {
        curNum += 1;
      }
    }

    if (!val) {
      if (curNum >= limitNum) {
        wx.showModal({
          title: '提示',
          content: '只能选择一个分类哦',
        })
        return;
      }
      arr.push(value);
    } else {
      for (var i in arr) {
        if (arr[i] == value) {
          arr.splice(i, 1);
        }
      }
    }

    secondLevelCategorys[index].checked = !val;

    this.setData({
      secondLevelCategorys: secondLevelCategorys,
      choosedSecondLevelCategory: secondLevelCategorys[index].id
    })

  },

  checkLabs2: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index,
      seriesCategorys = that.data.seriesCategorys,
      value = e.currentTarget.dataset.value,
      arr = this.data.arr,
      val = seriesCategorys[index].checked, //点击前的值
      limitNum = 1,
      curNum = 0;

    //选中累加
    for (var i in seriesCategorys) {
      if (seriesCategorys[i].checked) {
        curNum += 1;
      }
    }

    if (!val) {
      if (curNum >= limitNum) {
        wx.showModal({
          title: '提示',
          content: '只能选择一个分类哦',
        })
        return;
      }
      arr.push(value);
    } else {
      for (var i in arr) {
        if (arr[i] == value) {
          arr.splice(i, 1);
        }
      }
    }

    seriesCategorys[index].checked = !val;

    that.setData({
      seriesCategorys: seriesCategorys,
      choosedSeriesCategory: seriesCategorys[index].id
    })
  },

  // chooseImage: function () {
  //   var that = this;
  //   wx.chooseImage({
  //     count: 9,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album'],
  //     success(res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       const tempFilePaths = res.tempFilePaths
  //       that.uploadDIY(tempFilePaths, 0, 0, 0, tempFilePaths.length)
  //       // for (var j = 0; j < tempFilePaths.length; j++) {
  //       //   wx.uploadFile({
  //       //     url: 'http://47.105.169.49/Agency/upfile',
  //       //     filePath: tempFilePaths[j],
  //       //     name: 'fileData',
  //       //     success: (resp) => {
  //       //       console.log(resp.data)
  //       //       wx.setStorageSync(tempFilePaths[j], resp.data)
  //       //     },
  //       //     fail: (res) => {

  //       //     }
  //       //   })
  //       // }

  //       for (var i = 0; i < res.tempFilePaths.length; i++) {
  //         for (var j = 0; j < that.data.tempFilePaths.length; j++) {
  //           if (res.tempFilePaths[i] == that.data.tempFilePaths[j]) {
  //             res.tempFilePaths[i].splice(i, 1)
  //           }
  //         }
  //       }
  //       console.log("sss", res.tempFilePaths)
  //       that.data.tempFilePaths = res.tempFilePaths
  //       that.setData({
  //         tempFilePaths: that.data.tempFilePaths
  //       })
  //     }
  //   })
  // },

  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var newTempFilePaths = tempFilePaths
        var globalTempFilePaths = that.data.tempFilePaths
        if (globalTempFilePaths.length == 0) {
          globalTempFilePaths = tempFilePaths
        } else {
          for (var i = 0; i < tempFilePaths.length; i++) {
            globalTempFilePaths.push(tempFilePaths[i])
          }
        }

        that.setData({
          tempFilePaths: globalTempFilePaths, 
          newTempFilePaths: newTempFilePaths
        })
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
          var parameter = that.data.parameter
          if (that.data.oldGoodsPic) {
            parameter = parameter + '&goodsPic=' + encodeURIComponent(that.data.oldGoodsPic + ',' + that.data.images) 
          } else {
            parameter = parameter + '&goodsPic=' + encodeURIComponent(that.data.images) 
          }
          wx.request({
            url: 'https://www.caoxianyoushun.com:8443/Agency/goods/updateGoods.do?' + parameter,
            //url: 'http://localhost:8080/Agency/goods/updateGoods.do',
            success(res) {
              wx.navigateTo({
                url: '../../pages/goodsList/goodsList',
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

  deleteImg: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.id
    var that = this
    var tempFilePaths = that.data.tempFilePaths
    tempFilePaths.splice(index, 1)
    // var oldTempFilePaths = that.data.oldTempFilePaths
    // oldTempFilePaths.splice(index, 1)
    that.setData({
      tempFilePaths: tempFilePaths,
      //oldTempFilePaths: oldTempFilePaths
    })
  }
})