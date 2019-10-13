var app = getApp();
const operatePlatformUrl = app.globalData.operatePlatformUrl
const entNum = app.globalData.entNum

Page({
  data: {
    contact_tel: "",
    show_customer_service: 0
  },
  onLoad: function (e) {
    this.initOrders();
    //t.pageOnLoad(this);
  },
  loadData: function (a) {
    var n = this;
    n.setData({
      store: wx.getStorageSync("store")
    });
    var i = wx.getStorageSync("pages_user_user");
    i && n.setData(i), t.request({
      url: e.user.index,
      success: function (e) {
        0 == e.code && (n.setData(e.data), wx.setStorageSync("pages_user_user", e.data),
          wx.setStorageSync("share_setting", e.data.share_setting), wx.setStorageSync("user_info", e.data.user_info));
      }
    });
  },
  onReady: function () { },
  onShow: function () {
    //t.pageOnShow(this), this.loadData();
  },
  callTel: function (e) {
    var t = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: t
    });
  },
  apply: function (a) {
    var n = wx.getStorageSync("share_setting"), i = wx.getStorageSync("user_info");
    1 == n.share_condition ? wx.navigateTo({
      url: "/pages/add-share/index"
    }) : 0 != n.share_condition && 2 != n.share_condition || (0 == i.is_distributor ? wx.showModal({
      title: "申请成为分销商",
      content: "是否申请？",
      success: function (s) {
        s.confirm && (wx.showLoading({
          title: "正在加载",
          mask: !0
        }), t.request({
          url: e.share.join,
          method: "POST",
          data: {
            form_id: a.detail.formId
          },
          success: function (e) {
            0 == e.code && (0 == n.share_condition ? (i.is_distributor = 2, wx.navigateTo({
              url: "/pages/add-share/index"
            })) : (i.is_distributor = 1, wx.navigateTo({
              url: "/pages/share/index"
            })), wx.setStorageSync("user_info", i));
          },
          complete: function () {
            wx.hideLoading();
          }
        }));
      }
    }) : wx.navigateTo({
      url: "/pages/add-share/index"
    }));
  },
  verify: function (e) {
    wx.scanCode({
      onlyFromCamera: !1,
      success: function (e) {
        wx.navigateTo({
          url: "/" + e.path
        });
      },
      fail: function (e) {
        wx.showToast({
          title: "失败"
        });
      }
    });
  },
  member: function () {
    wx.navigateTo({
      url: "/pages/member/member"
    });
  },
  integral_mall: function (e) {
    t.permission_list && t.permission_list.length && function (e, t) {
      return -1 != ("," + e.join(",") + ",").indexOf("," + t + ",");
    }(t.permission_list, "integralmall") && wx.navigateTo({
      url: "/pages/integral-mall/index/index"
    });
  },

  initOrders: function() {
    var that = this
    wx.request({
      url: operatePlatformUrl + '/api/order/all/orders',
      data: {
        entNum: entNum,
        openId: 1
      },
      success (res) {
        console.log(res.data);
        that.setData({
          order_count: res.data
        })
      }
    })
  }
});