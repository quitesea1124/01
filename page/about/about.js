function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function e(t, e) {
    this.nickname = t, this.avatarUrl = e;
}

var a, i = require("../../utils/api"), s = require("../../utils/net"), n = getApp();

Page((a = {
    name: "detail",
    data: {
        zannum: 0,
        item: [],
        vcomment: [],
        commentlist: [],
        thispath: "page/detail/detail",
        cid: 0,
        hiddenmodalput: !0,
        replaycoid: "",
        replaycontent: "",
        zanimg: "../../images/zanoff.png",
        likelist: [],
        createdtime: "1分钟前",
        replytxt: "说点什么吧...",
        cmplaceholder: "说点什么吧...",
        focus: !1,
        cmtext: "",
        replyauthor: !0,
        qrcode_temp: "",
        painting: {},
        cmbtnclick: !1,
        resendUrl: i.GetDomain() + "usr/plugins/WeTypecho/res/resend.png",
        aboutstr: "猪元帅小程序"
    },
    onLoad: function(t) {
        this.setData({
            aboutstr: "By Catbei".replace(/\\u/g, "%u")
        }), this.getabout();
    },
    getabout: function() {
        var t = this;
        s.request({
            url: i.GetAboutCid(),
            success: function(e) {
                var a = e.data.data;
                i.IsNull(a) && "none" != a && (t.data.cid = a, t.getdetails(t.data.cid));
            }
        });
    },
    eventRun_bind_tap: function(t) {
        var e = t.target.dataset._el.attr.href;
        if (i.IsNull(e)) {
            var a = e.search("cid=");
            if (-1 != e.search(i.GetDomain()) && -1 != a) {
                var s = e.search(".html"), n = e.substring(a + 4, s);
                wx.navigateTo({
                    url: "../detail/detail?item=" + n
                });
            } else wx.setClipboardData({
                data: e,
                success: function() {
                    wx.hideToast(), wx.showToast({
                        title: "链接已复制",
                        duration: 2e3
                    });
                }
            });
        }
    },
    onShareAppMessage: function() {},
    showSupport: function() {
        wx.previewImage({
          urls: [ "https://p9-tt.byteimg.com/large/pgc-image/c3fc3a6dbc9f472b860ef511c14f3be6.jpg" ],
          current: "https://p9-tt.byteimg.com/large/pgc-image/c3fc3a6dbc9f472b860ef511c14f3be6.jpg"
        });
    },
    getdetails: function(t) {
        var e = this;
        s.request({
            url: i.GetPagebyCID(t),
            success: function(t) {
              if (t.data.data.length==0) return;
                var a = t.data.data, s = i.ParseItem(a[0]), r = s.text.replace(/!!!/g, ""), o = n.towxml.toJson(r, "markdown");
                e.setData({
                    content: o,
                    item: s
                }), e.data.createdtime = i.getcreatedtime(s.created), e.setData({
                    createdtime: e.data.createdtime
                });
            }
        }), this.getcomments(t), this.getlikelist(t);
    },
    getlikelist: function(t) {
        var a = this;
        s.request({
            url: i.Getuserlikedlist(t),
            success: function(t) {
                var i = t.data.data;
                if (null != i && void 0 != i) {
                    if (i.length < a.data.item.likes) for (var s = a.data.item.likes - i.length, n = 0; n < s; n++) o = new e("网页用户", "../../resources/chrome.png"), 
                    i.push(o);
                    a.setData({
                        likelist: i.map(function(t) {
                            return t;
                        })
                    });
                } else if (a.data.item.likes > 0) {
                    for (var r = [], n = 0; n < a.data.item.likes; n++) {
                        var o = new e("网页用户", "../../resources/chrome.png");
                        r.push(o);
                    }
                    a.setData({
                        likelist: r.map(function(t) {
                            return t;
                        })
                    });
                } else a.setData({
                    likelist: []
                });
            }
        });
    },
    getcomments: function(t) {
        var e = this;
        s.request({
            url: i.GetPostsCommentbyCID(t),
            success: function(t) {
                var a = t.data.data;
                e.setData({
                    commentlist: a.map(function(t) {
                        return null != t.author && "undefined" != t.author || (t.author = "游客"), null != t.authorImg && "undefined" != t.authorImg || (t.authorImg = "http://secure.gravatar.com/avatar/"), 
                        t.comcreatedtime = i.getcreatedtime(t.created), t;
                    })
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        i.loginsuccess(n) && s.request({
            url: i.Getuserlikedinfo(t.data.cid, n.Data.userInfo.openid),
            success: function(e) {
                "false" == e.data.data ? t.setData({
                    zanimg: "../../resources/zanoff.png"
                }) : t.setData({
                    zanimg: "../../resources/zanon.png"
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), this.getdetails(this.data.cid);
    },
    zanstart: function() {
        var t = this;
        i.loginsuccess(n) ? s.request({
            url: i.PostLike(t.data.item.cid, n.Data.userInfo.openid),
            success: function(e) {
                var a = e.data.data, i = a.status;
                t.data.item.likes = a[0].likes, t.setData({
                    item: t.data.item
                }), "like" == i ? t.setData({
                    zanimg: "../../resources/zanon.png"
                }) : t.setData({
                    zanimg: "../../resources/zanoff.png"
                }), t.getlikelist(t.data.cid);
            }
        }) : i.ConfirmAuth();
    },
    replayto: function(t) {
        if (i.loginsuccess(n)) {
            var e = t.target.dataset.author;
            this.data.replaycoid = t.target.dataset.authorid, this.setData({
                to: e,
                focus: !0,
                cmplaceholder: "回复 " + e + ":",
                replyauthor: !1
            });
        } else i.ConfirmAuth();
    },
    sendcm: function() {
        var t = this;
        t.setData({
            cmbtnclick: !0
        }), "" != this.data.cmtext && void 0 != this.data.cmtext && null != this.data.cmtext ? i.loginsuccess(n) ? (this.data.replyauthor && (this.data.replaycoid = 0), 
        this.data.replyauthor = !0, s.request({
            url: i.Postcomment(t.data.item.cid, n.Data.userInfo.nickName, t.data.cmtext, t.data.replaycoid, n.Data.userInfo.avatarUrl),
            success: function(e) {
                t.getcomments(t.data.item.cid), t.setData({
                    cmtext: "",
                    cmplaceholder: "说点什么吧..."
                });
            }
        })) : i.ConfirmAuth() : wx.showToast({
            title: "请输入回复文字",
            icon: "none",
            duration: 2e3
        });
    },
    cmfocus: function(t) {
        var e = this;
        e.data.focus || e.setData({
            focus: !0
        });
    },
    cminput: function(t) {
        this.setData({
            cmtext: t.detail.value.trim()
        });
    },
    replaycontent: function(t) {
        this.setData({
            replaycontent: t.detail.value
        });
    },
    share: function() {
        var t = this;
        i.loginsuccess(n) ? wx.navigateTo({
            url: "../share/share?nickName=" + n.Data.userInfo.nickName + "&thumb=" + t.data.item.thumb + "&title=" + t.data.item.title + "&path=" + t.data.thispath + "&cid=" + t.data.cid
        }) : i.ConfirmAuth();
    },
    eventGetImage: function(t) {
        wx.hideLoading();
        var e = t.detail, a = e.tempFilePath;
        "canvasdrawer:ok" === e.errMsg && this.setData({
            shareImage: a
        });
    }
}, t(a, "onShareAppMessage", function(t) {
    return t.from, {
        title: this.data.item.title,
        path: this.data.item.thispath,
        success: function(t) {},
        fail: function(t) {}
    };
}), t(a, "cmloss", function() {
    this.setData({
        cmplaceholder: "说点什么吧..."
    });
}), a));