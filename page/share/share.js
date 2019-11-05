var t = require("../../utils/api"), e = require("../../utils/net"), i = getApp();

Page({
    name: "share",
    data: {
        nickName: "",
        thumb: "",
        title: "",
        path: "",
        painting: {},
        notification: ""
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            nickName: t.nickName,
            thumb: t.thumb,
            title: t.title,
            path: t.path + "?item=" + t.cid
        }), e.share();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), this.share();
    },
    share: function() {
        var a = this;
        e.request({
            url: t.GetAccessCode(this.data.path),
            success: function(e) {
                wx.showToast({
                    title: "图片生成中",
                    icon: "loading",
                    duration: 1e4,
                    mask: !1
                }), e.data.data;
                var n = t.GetDomain() + "qrcode.png";
                a.setData({
                    painting: {
                        width: 375,
                        height: 555,
                        clear: !0,
                        views: [ {
                            type: "image",
                            url: t.GetDomain() + "usr/plugins/WeTypecho/res/cvbg.jpeg",
                            top: 0,
                            left: 0,
                            width: 375,
                            height: 555
                        }, {
                            type: "text",
                            content: "您的好友【" + i.Data.userInfo.nickName + "】",
                            fontSize: 16,
                            color: "#402D16",
                            textAlign: "left",
                            top: 33,
                            left: 29,
                            bolder: !0
                        }, {
                            type: "text",
                            content: "分享了一篇文章，快来看看吧",
                            fontSize: 15,
                            color: "#563D20",
                            textAlign: "left",
                            top: 59.5,
                            left: 29
                        }, {
                            type: "image",
                            url: a.data.thumb,
                            top: 136,
                            left: 42.5,
                            width: 290,
                            height: 186
                        }, {
                            type: "image",
                            url: n,
                            top: 443,
                            left: 85,
                            width: 68,
                            height: 68
                        }, {
                            type: "text",
                            content: a.data.title,
                            fontSize: 24,
                            lineHeight: 30,
                            color: "#383549",
                            textAlign: "left",
                            top: 336,
                            left: 44,
                            width: 287,
                            MaxLineNumber: 2,
                            breakWord: !0,
                            bolder: !0
                        }, {
                            type: "text",
                            content: "长按识别图中二维码查看文章",
                            fontSize: 18,
                            color: "#383549",
                            textAlign: "left",
                            top: 460,
                            left: 165.5,
                            lineHeight: 20,
                            MaxLineNumber: 2,
                            breakWord: !0,
                            width: 125
                        } ]
                    }
                });
            }
        });
    },
    eventGetImage: function(t) {
        wx.hideLoading();
        var e = t.detail, i = e.tempFilePath;
        "canvasdrawer:ok" === e.errMsg && (this.setData({
            shareImage: i
        }), wx.hideToast(), this.Saveimg(), this.setData({
            notification: "图片已保存到相册，快去朋友圈分享吧~"
        }));
    },
    Saveimg: function() {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.shareImage,
            success: function(t) {
                wx.showToast({
                    title: "保存图片成功",
                    icon: "success",
                    duration: 2e3
                });
            }
        });
    }
});