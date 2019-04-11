var app = getApp();
Page({
  data: {
    // types: null,
    typeTree: {}, // 数据缓存
    currType: 0,
    // 当前类型
    types: [],
    typeTree: [],
  },

  onLoad: function (option) {
    var that = this;
    var agencyId = option.agencyId
    var mobilephone = option.mobilephone
    that.data.agencyId = agencyId
    that.data.mobilephone = mobilephone
    console.log('agencyId=', agencyId)
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    wx.request({ //查询可选择的品牌分类
      url: 'https://www.caoxianyoushun.com:8443/Agency/brand/findBrandCategory.do',
      data: {
        openId: openId
      },
      success(res) {
        console.log(res)
        that.setData({
          types: res.data,
          brandCategorysArr: res.data
        })
        var brandId = res.data[0].id
        that.setData({
          brandId: brandId
        });
        wx.request({
          url: 'https://www.caoxianyoushun.com:8443/Agency/goods/findGoodsByBrandId.do',
          data: {
            brandCategory: brandId,
            agencyId: agencyId
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res)
            if (res.data) {
              for (var i = 0; i < res.data.length; i++) {
                var images = res.data[i].goodsPic
                var imagesArr = images.split(',')
                res.data[i].thumbnail = imagesArr[0]
              }
            }
            that.setData({
              goodses: res.data,
            });
          },
          error: function (e) {
            wx.showToast({
              title: '网络异常！',
              duration: 2000,
            });
          }
        });
      }
    })
    // wx.request({
    //   url: 'http://',
    //   method: 'post',
    //   data: {},
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     //--init data 
    //     var status = res.data.status;
    //     if (status == 1) {
    //       var list = res.data.list;
    //       var catList = res.data.catList;
    //       var firstId = res.data.list[0].id;
    //       that.setData({
    //         currType: firstId,
    //         types: list,
    //         typeTree: catList,
    //       });
    //     } else {
    //       wx.showToast({
    //         title: res.data.err,
    //         duration: 2000,
    //       });
    //     }
    //   },
    //   error: function (e) {
    //     wx.showToast({
    //       title: '网络异常！',
    //       duration: 2000,
    //     });
    //   }
    // });
  },
  tapType: function (e) {
    var that = this;
    var brandId = e.currentTarget.dataset.id;
    that.setData({
      brandId: brandId
    });
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/goods/findGoodsByBrandId.do',
      data: {
        brandCategory: brandId,
        agencyId: that.data.agencyId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data) {
          for (var i = 0; i < res.data.length; i++) {
            var images = res.data[i].goodsPic
            var imagesArr = images.split(',')
            res.data[i].thumbnail = imagesArr[0]
          }
        }
        that.setData({
          goodses: res.data,
        });
        // var status = res.data.status;
        // if (status == 1) {
        //   var catList = res.data.catList;
        //   that.setData({
        //     typeTree: catList,
        //   });
        // } else {
        //   wx.showToast({
        //     title: res.data.err,
        //     duration: 2000,
        //   });
        // }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      }
    });
  },
  // 加载品牌、二级类目数据
  getTypeTree(currType) {
    const me = this, _data = me.data;
    if (!_data.typeTree[currType]) {
      request({
        url: ApiList.goodsTypeTree,
        data: { typeId: +currType },
        success: function (res) {
          _data.typeTree[currType] = res.data.data;
          me.setData({
            typeTree: _data.typeTree
          });
        }
      });
    }
  },

  openGoods: function (e) {
    var goodsId = e.currentTarget.dataset.goodsId
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + goodsId,
    })
  },

  makePhoneCall: function (e) {
    var that = this
    var mobilephone = that.data.mobilephone
    wx.makePhoneCall({
      phoneNumber: mobilephone,
    })
  },
})