function t(t, e, n, r) {
    this.title = t, this.value = e, this.showpr = n, this.progress = r;
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../config.js")), n = e.default.getdomain, r = e.default.getapisecret, i = "https://" + n + "/api/", s = 0, o = 0;

module.exports = {
    GetDomain: function() {
        return "https://" + n + "/";
    },
    GetPosts: function() {
        return this.appendAPISEC(i + "posts?&pageSize=10");
    },
    GetRankedPosts: function(t) {
        return this.appendAPISEC(i + "posts?&pageSize=30&idx=" + t);
    },
    GetAboutCid: function() {
        return this.appendAPISEC(i + "getaboutcid?");
    },
    GetSwiperPost: function() {
        return this.appendAPISEC(i + "getswiperpost?");
    },
    GetCat: function() {
        return this.appendAPISEC(i + "getcat?");
    },
    GetAccessCode: function(t) {
        return this.appendAPISEC(i + "getaccesscode?path=" + t);
    },
    GetPostsbyCID: function(t) {
        return this.appendAPISEC(i + "posts?cid=" + t);
    },
    GetPagebyCID: function(t) {
        return this.appendAPISEC(i + "posts?cid=" + t + "&getpage=1");
    },
    GetPostsbyMID: function(t) {
        return this.appendAPISEC(i + "getpostbymid?count=90&mid=" + t);
    },
    GetPostsbyMIDLimit: function(t, e, n) {
        return this.appendAPISEC(i + "getpostbymid?mid=" + t + "&pageSize=" + e + "&except=" + n);
    },
    PostLike: function(t, e) {
        return this.appendAPISEC(i + "likePost?cid=" + t + "&openid=" + e);
    },
    GetPostsCommentbyCID: function(t) {
        return this.appendAPISEC(i + "getcomment?cid=" + t);
    },
    GetPostsReplybyCID: function(t, e) {
        return this.appendAPISEC(i + "getcomment?cid=" + t + "&parent=" + e);
    },
    Postcomment: function(t, e, n, r, s) {
        return this.appendAPISEC(i + "addcomment?cid=" + t + "&author=" + e + "&text=" + n + "&parent=" + r + "&icon=" + s);
    },
    Login: function(t) {
        return this.appendAPISEC(i + "login?code=" + t.code + "&nickname=" + t.nickName + "&avatarUrl=" + t.avatarUrl + "&city=" + t.city + "&country=" + t.country + "&gender=" + t.gender + "&province=" + t.province);
    },
    Getuserlikedinfo: function(t, e) {
        return this.appendAPISEC(i + "getuserlikedinfo?cid=" + t + "&openid=" + e);
    },
    Getuserlikedlist: function(t) {
        return this.appendAPISEC(i + "getuserlikedlist?cid=" + t);
    },
    GetServerStat: function() {
        return this.appendAPISEC(i + "get_stat?");
    },
    Search: function(t) {
        return this.appendAPISEC(i + "search?keyword=" + t);
    },
    MonitorVerfy: function(t) {
        return this.appendAPISEC(i + "monitorverfy?openid=" + t);
    },
    loginsuccess: function(t) {
        return null != t.Data.userInfo && void 0 !== t.Data.userInfo.openid && void 0 != t.Data.userInfo.openid && t.Data.userInfo.openid.length >= 28;
    },
    ParseStat: function(e) {
        var n = [], r = [], i = [], s = e.loadAvg.split(" "), o = s[s.length - 1].split("/"), u = o[0] / o[1] * 100;
        u = Math.round(100 * u) / 100, n.push(new t("负载", e.loadAvg, !0, u));
        var a = "总空间:" + e.DiskTotal + "GB 空余:" + e.DiskFree + "GB", p = (e.DiskTotal - e.DiskFree) / e.DiskTotal * 100;
        p = Math.round(100 * p) / 100, n.push(new t("磁盘", a, !0, p));
        var c = "已用:" + Math.round(100 * e.memRealUsed) / 100 + "MB 空余:" + Math.round(100 * e.memRealFree) / 100 + "MB";
        n.push(new t("内存", c, !0, e.memRealPercent)), r.push(new t("入网", this.speedparse(e.NetInput), !1, 0)), 
        r.push(new t("出网", this.speedparse(e.NetOut), !1, 0));
        var d = "出网:" + this.caculate_spped_in(e.NetOut) + " 入网:" + this.caculate_spped_out(e.NetInput);
        r.push(new t("实时", d, !1, 0));
        var h = e.cpu;
        return this.IsNull(h.model) && i.push(new t("型号", h.model, !1, 0)), this.IsNull(h.num) && i.push(new t("核心", h.num, !1, 0)), 
        this.IsNull(h.mhz) && i.push(new t("主频", h.mhz, !1, 0)), this.IsNull(h.cache) && i.push(new t("缓存", h.cache, !1, 0)), 
        this.IsNull(h.bogomips) && i.push(new t("bogomips", h.bogomips, !1, 0)), {
            genlist: n,
            netlist: r,
            serverlist: i
        };
    },
    IsNull: function(t) {
        return null != t && void 0 != t;
    },
    Init_speed: function() {
        s = 0, o = 0;
    },
    caculate_spped_in: function(t) {
        if (0 != s) {
            var e = (t - s) / 1024;
            return s = t, Math.round(100 * e) / 100 + " kb/s";
        }
        return s = t, "0 kb/s";
    },
    caculate_spped_out: function(t) {
        if (0 != o) {
            var e = (t - o) / 1024;
            return o = t, Math.round(100 * e) / 100 + " kb/s";
        }
        return o = t, "0 kb/s";
    },
    speedparse: function(t) {
        var e = 1073741824, n = Math.floor(t / e);
        t %= e;
        var r = Math.floor(t / 1048576);
        t %= 1048576;
        var i = Math.floor(t / 1024);
        t %= 1024;
        var s = Math.floor(t);
        return (n > 0 ? n + " GB " : "") + (r > 0 ? r + " MB " : " ") + (i > 0 ? i + " KB " : " ") + (s > 0 ? s + " B" : " ");
    },
    ParseItem: function(t) {
        var e = this, n = {
            year: t.year,
            month: t.month,
            day: t.day
        };
        return {
            cid: t.cid,
            title: t.title,
            created: t.created,
            date: n,
            text: t.text,
            commentsNum: t.commentsNum,
            link: t.permalink,
            thumb: t.thumb[0].str_value,
            views: t.views[0].views,
            likes: t.likes[0].likes,
            category: t.categories.map(function(t) {
                return t.length = t.name.length, t.background = e.randomHexColor(), t;
            }),
            mid: t.categories.length > 0 ? t.categories[0].mid : null,
            showshare: t.showshare
        };
    },
    appendAPISEC: function(t) {
        return t + "&apisec=" + r;
    },
    randomHexColor: function() {
        for (var t = Math.floor(16777216 * Math.random()).toString(16); t.length < 6; ) t = "0" + t;
        return "#" + t;
    },
    ConfirmAuth: function() {
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(t) {}
                }) : wx.navigateTo({
                    url: "../../page/auth/auth"
                });
            }
        });
    },
    getcreatedtime: function(t) {
        var e = Date.parse(new Date()) / 1e3, n = e - t > 0 ? e - t : 0;
        if (n <= 3600) return (r = Math.round(n / 60)) + "分钟前";
        if (n < 86400) return (r = Math.round(n / 3600)) + "小时前";
        var r = Math.round(n / 86400);
        return r + "天前";
    }
};