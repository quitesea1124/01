function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../config.js")), s = require("../../utils/api"), i = (require("../../utils/tips"), 
require("../../utils/net")), n = getApp();

Page({
    name: "index",
    data: (a = {
        postslist: [],
        swipelist: [],
        topswiper: "none",
        midposts: "none",
        showerror: "none",
        navshow: "none",
        height: "",
        allcatslist: [],
        allcatpostlist: [],
        current_cat: 0,
        curidx: 0
    }, t(a, "allcatslist", []), t(a, "allcatpostlist", []), t(a, "currentpost", []), 
    t(a, "current_position", "mid_99999999"), t(a, "postheight", "0"), t(a, "topNav", []), 
    a),
    fetchposts: function() {
        var t = this;
        i.request({
            url: s.GetSwiperPost(),
            success: function(a) {
                var e = a.data.data;
                s.IsNull(e) && t.setData({
                    topswiper: "block",
                    swipelist: e.map(function(t) {
                      t.thumb[0].str_value = "" == t.thumb[4].str_value ? "https://p2.pstatp.com/large/pgc-image/9182fd71bb5b401baea210e6d29387c6" : t.thumb[4].str_value;
                        return s.ParseItem(t);
                    })
                });
            }
        });
    },
    touchmove: function(t) {},
    fetchallcats: function() {
        var t = this;
        i.request({
            url: s.GetCat(),
            success: function(a) {
                var e = a.data.data;
                t.data.allcatslist = e.map(function(t) {
                    return t.id_tag = "mid_" + t.mid, t;
                }), t.data.allcatpostlist = e.map(function(t) {
                    return null;
                }), t.data.allcatslist.length > 0 && t.changeCatex(t.data.allcatslist[0].mid), t.setData({
                    navshow: "block",
                    allcatslist: t.data.allcatslist
                });
            }
        });
    },
    onNavRedirect: function(t) {
        var a = t.currentTarget.dataset.redicttype, e = null == t.currentTarget.dataset.url ? "" : t.currentTarget.dataset.url, s = null == t.currentTarget.dataset.appid ? "" : t.currentTarget.dataset.appid, i = null == t.currentTarget.dataset.extraData ? "" : t.currentTarget.dataset.extraData;
        "apppage" == a ? wx.navigateTo({
            url: e
        }) : "webpage" == a ? wx.switchTab({
            url: e
        }) : "miniapp" == a && wx.navigateToMiniProgram({
            appId: s,
            envVersion: "release",
            path: e,
            extraData: i,
            success: function(t) {},
            fail: function(t) {}
        });
    },
    fetchpostbymid: function(t) {
        var a = this, e = this.getmidindex(t);
        i.request({
            url: s.GetPostsbyMID(t),
            success: function(t) {
                var i = t.data.data;
                i.map(function(t) {
                    t.thumb[0].str_value = "" == t.thumb[4].str_value ? "https://p2.pstatp.com/large/pgc-image/9182fd71bb5b401baea210e6d29387c6" : t.thumb[4].str_value;
                }), null != i && void 0 != i ? (a.data.allcatpostlist[e] = i.map(function(t) {
                    return t.posttime = s.getcreatedtime(t.created), t;
                }), a.setData({
                    allcatpostlist: a.data.allcatpostlist,
                    postheight: 480 * a.data.allcatpostlist[e].length + "rpx"
                })) : wx.showToast({
                    title: "该分类没有文章",
                    image: "../../images/error.png",
                    duration: 2e3
                });
                for (var n = 0; n < 5 && !(a.data.curidx > a.data.allcatpostlist[e].length - 1); n++) a.data.currentpost[a.data.curidx] = a.data.allcatpostlist[e][a.data.curidx], 
                a.setData({
                    curidx: a.data.curidx + 1
                });
                a.setData({
                    currentpost: a.data.currentpost,
                    postheight: 480 * a.data.currentpost.length + 150 + "rpx"
                });
            }
        });
    },
    getmidindex: function(t) {
        for (var a = 0; a < this.data.allcatslist.length; a++) if (t == this.data.allcatslist[a].mid) return a;
    },
    change_finish: function(t) {
        var a = this;
        t.detail.current != this.data.current_cat && (this.changeCatex(this.data.allcatslist[t.detail.current].mid), 
        this.setData({
            current_cat: t.detail.current,
            current_position: a.data.allcatslist[t.detail.current].id_tag
        }));
    },
    changeCat: function(t) {
        this.data.current_cat_mid = t.target.dataset.mid;
        var a = this.getmidindex(this.data.current_cat_mid);
        a != this.data.current_cat && (this.setData({
            current_cat: a
        }), this.changeCatex(this.data.current_cat_mid));
    },
    changeCatex: function(t) {
        this.setData({
            catpostlist: [],
            currentpost: [],
            curidx: 0
        }), this.data.allcatslist = this.data.allcatslist.map(function(a) {
            return a.mid == t ? a.active = !0 : a.active = !1, a;
        }), this.setData({
            allcatslist: this.data.allcatslist
        }), this.fetchpostbymid(t);
    },
    onReachBottom: function() {
        var t = this, a = t.data.current_cat;
        if (t.data.curidx > t.data.allcatpostlist[a].length - 1) wx.showToast({
            title: "已经加载完啦",
            duration: 1500
        }); else {
            wx.showLoading({
                title: "load..."
            });
            for (var e = 0; e < 5 && !(t.data.curidx > t.data.allcatpostlist[a].length - 1); e++) t.data.currentpost[t.data.curidx] = t.data.allcatpostlist[a][t.data.curidx], 
            t.setData({
                curidx: t.data.curidx + 1
            });
            t.setData({
                currentpost: t.data.currentpost,
                postheight: 480 * t.data.currentpost.length + 50 + "rpx"
            }), wx.hideLoading();
        }
    },
    onLoad: function() {
        wx.getUserInfo({
            success: function(t) {
                n.Data.userInfo = t.userInfo, wx.login({
                    success: function(t) {
                        n.Data.userInfo.code = t.code, i.request({
                            url: s.Login(n.Data.userInfo),
                            success: function(t) {
                                var a = t.data.data;
                                n.Data.userInfo.openid = a;
                            },
                            fail: function() {}
                        });
                    }
                });
            }
        }), this.fetchposts(), this.fetchallcats(), this.setData({
            topNav: e.default.getIndexMenu
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), this.setData({
            showerror: "none",
            swipelist: [],
            postslist: [],
            midposts: "none",
            topswiper: "none",
            current_cat: 0,
            current_position: "mid_99999999"
        }), this.onLoad();
    }
}), wx.showShareMenu({
    withShareTicket: !0
});