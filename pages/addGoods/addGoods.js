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
    brandCategorysArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/agency/findAgencyByOpenId.do',
      data: {
        openId: openId,
        type: 'normal'
      },
      success(res) {
        that.setData({
          agencyId: res.data.id
        })
      }
    })
    wx.request({ //查询可选择的类目参数
      url: 'https://www.caoxianyoushun.com:8443/Agency/category/findOneLevelCategory.do',
      success(res) {
        console.log(res)
        that.setData({
          oneLevelCategorys: res.data
        })
      }
    })

    wx.request({ //查询可选择的品牌分类
      url: 'https://www.caoxianyoushun.com:8443/Agency/brand/findBrandCategory.do',
      data: {
        openId: openId
      },
      success(res) {
        console.log(res)
        that.setData({
          brandCategorys: res.data,
          brandCategorysArr: res.data
        })
      }
    })

    wx.request({ //查询可选择的类目参数
      url: 'https://www.caoxianyoushun.com:8443/Agency/category/findSecondLevelCategory.do',
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
  if (data.price == '') {
    that.showModal("请填写价格")
    return;
  }
  if (data.stock == '') {
    that.showModal("请填写商品数量")
    return;
  }
  if (data.goodsDescription == '') {
    that.showModal("请填写商品介绍")
    return;
  }
  var oneLevelCategory = that.data.choosedOneLevelCategory
  var secondLevelCategory = that.data.choosedSecondLevelCategory
  var brandCategory = that.data.choosedBrandCategory
  var seriesCategory = that.data.choosedSeriesCategory
  var agencyId = that.data.agencyId
  var goodsName = data.goodsName
  var price = data.price
  var stock = data.stock
  var goodsDescription = data.goodsDescription
  var goodsPic = that.data.uploadImagePath
  var currentProvince = wx.getStorageSync('currentProvince')
  var currentCity = wx.getStorageSync('currentCity')
  var currentArea = wx.getStorageSync('currentArea')
  wx.request({
    url: 'https://www.caoxianyoushun.com:8443/Agency/goods/addGoods.do',
    data: {
      openId: openId,
      province: currentProvince,
      city: currentCity,
      area: currentArea,
      goodsName: goodsName,
      goodsDescription: goodsDescription,
      price: price,
      stock: stock,
      goodsPic: goodsPic,
      oneLevelCategory: oneLevelCategory,
      secondLevelCategory: secondLevelCategory,
      brandCategory: brandCategory,
      seriesCategory: seriesCategory,
      agencyId: agencyId
    },
    success(res) {
      wx.navigateTo({
        url: '../../pages/goodsList/goodsList',
      })
    }
  })
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

  chooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.uploadDIY(tempFilePaths, 0, 0, 0, tempFilePaths.length)
        // for (var j = 0; j < tempFilePaths.length; j++) {
        //   wx.uploadFile({
        //     url: 'http://47.105.169.49/Agency/upfile',
        //     filePath: tempFilePaths[j],
        //     name: 'fileData',
        //     success: (resp) => {
        //       console.log(resp.data)
        //       wx.setStorageSync(tempFilePaths[j], resp.data)
        //     },
        //     fail: (res) => {

        //     }
        //   })
        // }

        for (var i = 0; i < res.tempFilePaths.length; i++) {
          for (var j = 0; j < that.data.tempFilePaths.length; j++) {
            if (res.tempFilePaths[i] == that.data.tempFilePaths[j]) {
              res.tempFilePaths[i].splice(i, 1)
            }
          }
        }
        console.log("sss", res.tempFilePaths)
        that.data.tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: that.data.tempFilePaths
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
        console.log(resp)
        if (wx.getStorageSync(filePaths[i]) != undefined) {
          wx.setStorageSync(filePaths[i], resp.data)
        }
        var tempUploadImagePath = that.data.uploadImagePath
        if (tempUploadImagePath == '') {
          that.data.uploadImagePath = resp.data
        } else {
          that.data.uploadImagePath = tempUploadImagePath + ',' + resp.data
        }
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {
          //this.showToast('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
        }
        else {  //递归调用uploadDIY函数
          this.uploadDIY(filePaths, successUp, failUp, i, length);
        }
      },
    });
  },
})