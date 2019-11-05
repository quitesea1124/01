var n = require("../../utils/api"), o = getApp(), e = require("../../utils/net");

Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    bindGetUserInfo: function(t) {
        t.detail.userInfo && (o.Data.userInfo = t.detail.userInfo, wx.login({
            success: function(t) {
                o.Data.userInfo.code = t.code, e.request({
                    url: n.Login(o.Data.userInfo),
                    success: function(n) {
                        var e = n.data.data;
                        o.Data.userInfo.openid = e, wx.navigateBack();
                    }
                });
            }
        }));
    }
});