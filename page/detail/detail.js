function t(t, a) {
    this.nickname = t, this.avatarUrl = a;
}

var a = require("../../utils/api"), e = require("../../utils/net"), i = getApp();

Page({
    name: "detail",
    data: {
        zannum: 0,
        item: [],
        vcomment: [],
        isshare: 0,
        commentlist: [],
        thispath: "page/detail/detail",
        cid: 0,
        hiddenmodalput: !0,
        replaycoid: "",
        replaycontent: "",
        zanimg: "../../images/good-on.png",
        likelist: [],
        createdtime: "1分钟前",
        replytxt: "评论...",
        cmplaceholder: "评论...",
        focus: !1,
        cmtext: "",
        replyauthor: !0,
        qrcode_temp: "",
        painting: {},
        cmbtnclick: !1,
        resendUrl: a.GetDomain() + "usr/plugins/WeTypecho/res/resend.png",
        related_post: [],
        display_related: "none"
    },
    onLoad: function(t) {
        this.data.cid = t.item, 1 == t.isshare && (console.log("是分享进入"), this.setData({
            isshare: t.isshare
        }));
    },
    eventRun_bind_tap: function(t) {
        var e = t.target.dataset._el.attr.href;
        if (a.IsNull(e)) {
            var i = e.search("cid=");
            if (-1 != e.search(a.GetDomain()) && -1 != i) {
                var s = e.search(".html"), n = e.substring(i + 4, s);
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
    getdetails: function(t) {
        var s = this;
        e.request({
            url: a.GetPostsbyCID(t),
            success: function(t) {
                t.data.data[0].thumb[0].str_value = "" == t.data.data[0].thumb[4].str_value ? "https://p2.pstatp.com/large/pgc-image/9182fd71bb5b401baea210e6d29387c6" : t.data.data[0].thumb[4].str_value;
                var e = t.data.data, n = a.ParseItem(e[0]), o = n.text.replace(/!!!/g, ""), r = i.towxml.toJson(o, "markdown");
                s.setData({
                    content: r,
                    item: n
                }), s.data.createdtime = a.getcreatedtime(n.created), s.setData({
                    createdtime: s.data.createdtime
                }), s.fetchpostbymid(s.data.item.mid);
            }
        }), this.getcomments(t), this.getlikelist(t);
    },
    fetchpostbymid: function(t) {
        var i = this;
        e.request({
            url: a.GetPostsbyMIDLimit(t, 3, i.data.item.cid),
            success: function(t) {
              
                var e = t.data.data;
              if (null == e && void 0 == e) return;
              e[0].thumb[0].str_value = "" == e[0].thumb[4].str_value ? "https://p2.pstatp.com/large/pgc-image/9182fd71bb5b401baea210e6d29387c6" : e[0].thumb[4].str_value;
                null != e && void 0 != e && (i.data.related_post = e.map(function(t) {
                    return t.posttime = a.getcreatedtime(t.created), t;
                }), i.data.related_post.length > 0 && i.setData({
                    display_related: "block",
                    related_post: i.data.related_post,
                    postheight: 180 * i.data.related_post.length + "rpx"
                }));
            }
        });
    },
    getlikelist: function(i) {
        var s = this;
        e.request({
            url: a.Getuserlikedlist(i),
            success: function(a) {
                var e = a.data.data;
                if (null != e && void 0 != e) {
                    if (e.length < s.data.item.likes) for (var i = s.data.item.likes - e.length, n = 0; n < i; n++) r = new t("网页用户", "../../images/chrome.png"), 
                    e.push(r);
                    s.setData({
                        likelist: e.map(function(t) {
                            return t;
                        })
                    });
                } else if (s.data.item.likes > 0) {
                    for (var o = [], n = 0; n < s.data.item.likes; n++) {
                        var r = new t("网页用户", "../../images/chrome.png");
                        o.push(r);
                    }
                    s.setData({
                        likelist: o.map(function(t) {
                            return t;
                        })
                    });
                } else s.setData({
                    likelist: []
                });
            }
        });
    },
    navigateBack: function(t) {
        wx.switchTab({
            url: "../index/index"
        });
    },
    getcomments: function(t) {
        var i = this;
        e.request({
            url: a.GetPostsCommentbyCID(t),
            success: function(t) {
                var e = t.data.data;
                i.setData({
                    commentlist: e.map(function(t) {
                        return null != t.author && "undefined" != t.author || (t.author = "游客"), null != t.authorImg && "undefined" != t.authorImg || (t.authorImg = "https://mat1.gtimg.com/v/comment/images/avatar_default.9d95c455.jpg"), 
                        t.comcreatedtime = a.getcreatedtime(t.created), t;
                    })
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.getdetails(t.data.cid), a.loginsuccess(i) && e.request({
            url: a.Getuserlikedinfo(t.data.cid, i.Data.userInfo.openid),
            success: function(a) {
                "false" == a.data.data ? t.setData({
                    zanimg: "../../images/good.png"
                }) : t.setData({
                    zanimg: "../../images/good-on.png"
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
        a.loginsuccess(i) ? e.request({
            url: a.PostLike(t.data.item.cid, i.Data.userInfo.openid),
            success: function(a) {
                var e = a.data.data, i = e.status;
                t.data.item.likes = e[0].likes, t.setData({
                    item: t.data.item
                }), "like" == i ? t.setData({
                    zanimg: "../../images/good-on.png"
                }) : t.setData({
                    zanimg: "../../images/good.png"
                }), t.getlikelist(t.data.cid);
            }
        }) : a.ConfirmAuth();
    },
    replayto: function(t) {
        if (a.loginsuccess(i)) {
            var e = t.target.dataset.author;
            this.data.replaycoid = t.target.dataset.authorid, this.setData({
                to: e,
                focus: !0,
                cmplaceholder: "回复 " + e + ":",
                replyauthor: !1
            });
        } else a.ConfirmAuth();
    },
    sendcm: function() {
        var t = this;
        t.setData({
            cmbtnclick: !0
        }), "" != this.data.cmtext && void 0 != this.data.cmtext && null != this.data.cmtext ? a.loginsuccess(i) ? (this.data.replyauthor && (this.data.replaycoid = 0), 
        this.data.replyauthor = !0, e.request({
            url: a.Postcomment(t.data.item.cid, i.Data.userInfo.nickName, t.data.cmtext, t.data.replaycoid, i.Data.userInfo.avatarUrl),
            success: function(a) {
                t.getcomments(t.data.item.cid), t.setData({
                    cmtext: "",
                    cmplaceholder: "说点什么吧..."
                });
            }
        })) : a.ConfirmAuth() : wx.showToast({
            title: "请输入回复文字",
            icon: "none",
            duration: 2e3
        });
    },
    cmfocus: function(t) {
        var a = this;
        a.data.focus || a.setData({
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
        a.loginsuccess(i) ? wx.navigateTo({
            url: "../share/share?nickName=" + i.Data.userInfo.nickName + "&thumb=" + t.data.item.thumb + "&title=" + t.data.item.title + "&path=" + t.data.thispath + "&cid=" + t.data.cid
        }) : a.ConfirmAuth();
    },
    eventGetImage: function(t) {
        wx.hideLoading();
        var a = t.detail, e = a.tempFilePath;
        "canvasdrawer:ok" === a.errMsg && this.setData({
            shareImage: e
        });
    },
    onShareAppMessage: function(t) {
        return t.from, {
            title: this.data.item.title,
            path: this.data.item.thispath,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    cmloss: function() {
        this.setData({
            cmplaceholder: "说点什么吧..."
        });
    }
});