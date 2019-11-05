var t = require("../../utils/api"), e = getApp(), s = require("../../utils/net");

Page({
    name: "list",
    data: {
        showstat: !1,
        genlist: [],
        netlist: [],
        serverlist: [],
        downloadprogress: 0,
        disablebtn: !1,
        speedtext: "",
        lastspeed: "0"
    },
    onLoad: function(t) {
        this.auth();
    },
    auth: function() {
        var a = this;
        t.loginsuccess(e) ? s.request({
            url: t.MonitorVerfy(e.Data.userInfo.openid),
            showloading: !0,
            success: function(e) {
                "true" == e.data.data ? (a.setData({
                    showstat: !0
                }), t.Init_speed(), a.Countdown()) : a.setData({
                    showstat: !1
                });
            }
        }) : t.ConfirmAuth();
    },
    getstat: function() {
        var e = this;
        s.request({
            url: t.GetServerStat(),
            showloading: !1,
            success: function(s) {
                var a = s.data.data;
                if (null != a && void 0 != a) {
                    var n = t.ParseStat(a);
                    e.setData({
                        genlist: n.genlist,
                        netlist: n.netlist,
                        serverlist: n.serverlist
                    });
                }
            }
        });
    },
    starttestspeed: function() {
        var e = this, s = this, a = 0;
        s.setData({
            disablebtn: !0
        });
        var n = new Date().valueOf();
        wx.downloadFile({
            url: t.GetDomain() + "usr/plugins/WeTypecho/res/test.bin",
            success: function(t) {
                var e = new Date().valueOf() - n, o = Math.round(a / 1024 / (e / 1e3) * 100) / 100;
                s.setData({
                    speedtext: "文件大小:" + a / 1048576 + "MB,花费时间:" + e / 1e3 + "秒。\n平均速度:" + o + "kb/s,上次测速:" + s.data.lastspeed + "kb/s。"
                }), s.setData({
                    lastspeed: o
                }), wx.showModal({
                    tilte: "测速完成",
                    content: s.data.speedtext
                });
            },
            fail: function(t) {
                wx.showModal({
                    tilte: "测速失败",
                    content: "你的网速太不给力了！"
                }), s.setData({
                    speedtext: "测速失败，请重新开始测速"
                });
            },
            complete: function(t) {
                s.setData({
                    disablebtn: !1
                });
            }
        }).onProgressUpdate(function(t) {
            e.setData({
                downloadprogress: t.progress
            }), a = t.totalBytesExpectedToWrite;
        });
    },
    Countdown: function() {
        var t = this;
        setTimeout(function() {
            t.getstat(), t.Countdown();
        }, 1e3);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), t.loginsuccess(e) || this.data.showstat || this.auth();
    }
});