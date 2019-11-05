var t = !1;

module.exports = {
    success: function(t) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
        if (setTimeout(function() {
            wx.showToast({
                title: t,
                icon: "success",
                mask: !0,
                duration: o
            });
        }, 300), o > 0) return new Promise(function(t, i) {
            setTimeout(function() {
                t();
            }, o);
        });
    },
    toast: function(t, o) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "success";
        setTimeout(function() {
            wx.showToast({
                title: t,
                icon: i,
                mask: !0,
                duration: 500
            });
        }, 300), o && setTimeout(function() {
            o();
        }, 500);
    },
    alert: function(t) {
        wx.showToast({
            title: t,
            image: "../images/alert.png",
            mask: !0,
            duration: 1500
        });
    },
    error: function(t, o) {
        wx.showToast({
            title: t,
            image: "../images/error.png",
            mask: !0,
            duration: 500
        }), o && setTimeout(function() {
            o();
        }, 500);
    },
    loading: function() {
        var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "加载中";
        t || (t = !0, wx.showLoading({
            title: o,
            mask: !0
        }));
    },
    loaded: function() {
        t && (t = !1, wx.hideLoading());
    },
    loadfailed: function(o) {
        t && (t = !1, wx.hideLoading(), wx.showToast({
            title: o,
            image: "../../images/error.png",
            mask: !0,
            duration: 2e3
        }));
    },
    share: function(t, o, i) {
        return {
            title: t,
            path: o,
            desc: i,
            success: function(t) {
                Tips.toast("分享成功");
            }
        };
    }
};