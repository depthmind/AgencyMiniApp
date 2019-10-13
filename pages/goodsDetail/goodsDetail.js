const favoriteType = '1' //1代表收藏的是商品
const app = getApp()
const operatePlatformUrl = app.globalData.operatePlatformUrl
const entNum = app.globalData.entNum
var selectIndex;//选择的大规格key
var attrIndex;//选择的小规格的key
var selectIndexArray = [];//选择属性名字的数组
var selectAttrid = [];//选择的属性id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    isFavorited: false,
    inFavorited: false, //是否收藏过
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,

    //swiper相关
    circular: true,
    //选择的规格
    num: 1,//初始数量
    amount: 0,//初始金额
    minusStatus: 'disabled', // 使用data数据对象设置样式名
    choose_modal: "none", // 规格数量框
    buttom_modal: "inline",
    flag: 0,//点选规格时来源 0：规格点 1：立即购买 2：加入购物车
    //规格数据
    spec: [],
    selectName: "",//已选的属性名字
    selectAttrid: [],//选择的属性id
    //商品信息
    goods_info: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var goodsId = options.goodsId
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var unionId = userInfo.unionId
    wx.request({
      url: operatePlatformUrl + 'api/product/detail',
      data: {
        id: goodsId
      },
      success(res) {
        var data = res.data
        var agencyId = data.agencyId
        var area = data.area
        var city = data.city
        var goodsDescription = data.goodsDescription
        var goodsName = data.goodsName
        var goodsPic = data.descriptionImage
        var stock = data.stock
        //var goodsPic = 'http://www.caoxianyoushun.com/Agency/attachment/upload/15523977802fedd15a624c4e70bc0682.jpg,http://www.caoxianyoushun.com/Agency/attachment/upload/15523977802fedd15a624c4e70bc0682.jpg'
        var goodsPicArr = []
        var firstPic = ''
        if (goodsPic) {
          goodsPicArr = goodsPic.split(';')
          firstPic = goodsPicArr[0]
        }
        that.setData({
          goodsPicArr: goodsPicArr,
          goodsName: goodsName,
          goodsId: goodsId,
          goods: res.data,
          firstPic: firstPic,
          goodsDescription: goodsDescription
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

  favoriteAdd: function () {
    var that = this
    var goodsId = that.data.goodsId
    var isFavorited = that.data.isFavorited
    //var inFavorited = that.data.inFavorited
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var unionId = userInfo.unionId
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/favorite/favoriteAdd.do',
      data: {
        openId: openId,
        unionId: unionId,
        type: favoriteType,
        favoriteId: goodsId
      },
      success(res) {
        that.setData({
          isFavorited: true,
          favorite_img_url: '/images/shoucangred.png'
        })
      }
    })
  },

  favoriteRemove: function() {
    var that = this
    var goodsId = that.data.goodsId
    var isFavorited = that.data.isFavorited
    var inFavorited = that.data.inFavorited
    var userInfo = wx.getStorageSync('userInfo')
    var openId = userInfo.openId
    var unionId = userInfo.unionId
    wx.request({
      url: 'https://www.caoxianyoushun.com:8443/Agency/favorite/deleteFavorite.do',
      data: {
        openId: openId,
        type: favoriteType,
        favoriteId: goodsId
      },
      success(res) {
        that.setData({
          isFavorited: false,
          favorite_img_url: '/images/shoucang.png'
        })
      }
    })
  },

  backToAgencyDetail: function () {
    wx.navigateBack({
      delta: 2
    })
  },

  modal_none: function () {
    this.setData({
      choose_modal: "none",
      bottom_modal: "",
    });
    selectIndexArray = [];
    selectAttrid = [];
  },

  //弹出
  modal_show: function (e) {
    var flag = e.currentTarget.dataset.flag;
    var that = this;
    wx.request({
      url: operatePlatformUrl + 'api/product/productitem',
      data:{
        productId: 6,
      },
      success(res) {
        console.log(res.data)
        that.setData({
          spec: res.data
        })
        that.init_attr();
      }
    })
    that.setData({
      flag: flag,
      choose_modal: "block",
      bottom_modal: "none",
    });
  },

  clickAttr: function (e) {
    // console.log(e);return;
    var selectIndex = e.currentTarget.dataset.selectIndex;
    var attrIndex = e.currentTarget.dataset.attrIndex;
    var spec = this.data.spec;
    var count = spec[selectIndex].child.length;
    // console.log(count); return;
    for (var i = 0; i < count; i++) {
      spec[selectIndex].child[i].isSelect = false;
    }
    spec[selectIndex].child[attrIndex].isSelect = true;

    var name = spec[selectIndex].child[attrIndex].name;//点击属性的名称
    var attrid = spec[selectIndex].child[attrIndex].id;
    // //点击过，修改属性
    var selectName = "";
    //点击过，修改属性
    selectIndexArray[selectIndex].value = name;
    selectAttrid[selectIndex] = attrid;
    var selectIndexArraySize = selectIndexArray.length;
    //将数组的所有属性名拼接起来
    for (var i = 0; i < selectIndexArraySize; i++) {
      selectName += ' "' + selectIndexArray[i].value + '" ';
    }
    console.log(selectName);
    this.setData({
      spec: spec,//变换选择框
      selectName: selectName,
      selectAttrid: selectAttrid
    });
    this.getProductItemDetail();
  },

  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
    this.change_spec();
    this.change_price();
  },
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
    //this.change_spec();
    //this.change_price();
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    if (isNaN(num)) {
      num = 1;
    }
    // 将数值与状态写回
    this.setData({
      num: parseInt(num)
    });
    //this.change_spec();
    //this.change_price();
  },

  //初始化规格选择
  init_attr: function () {
    //初始化规格选择
    var name = "";
    var spec = this.data.spec;
    var size = spec.length;
    for (var i = 0; i < size; i++) {
      selectIndexArray.push({ key: i, value: spec[i].child[0].name });
      selectAttrid.push(spec[i].child[0].id)
      name += ' "' + selectIndexArray[i].value + '" ';
    }
    var selectName = this.data.selectName;
    selectName = name;
    this.getProductItemDetail();
    this.setData({
      selectName: selectName,
      selectAttrid: selectAttrid
    });
  },

  addCart: function () {
    var that = this;
    var num = that.data.num; //购买数量
    var attribute_one = selectAttrid[0];
    var attribute_two = selectAttrid[1];
    console.log(selectAttrid)
  },

  getProductItemDetail: function () {
    var attribute_one = selectAttrid[0];
    var attribute_two = selectAttrid[1];
    var that = this
    wx.request({
      url: operatePlatformUrl + '/api/product/getProductItemDetail',
      data: {
        attributeOne: attribute_one,
        attributeTwo: attribute_two
      },
      success (res) {
        console.log(res.data)
        that.setData({
          productItem: res.data
        })
      }
    })
  },
})