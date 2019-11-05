function t(t, a, i) {
    this.name = t, this.active = a, this.idx = i;
}

var a = require("../../utils/api"), i = (getApp(), require("../../utils/net"));

Page({
    name: "cat",
    data: {
        allcatslist: [],
        catpostlist: [],
        ranklist: [],
        active_idx: 0,
        windowHeight: 100,
        current_cat_mid: -1,
        searchkeyword: "",
        allrankpostlist: [ null, null, null ]
    },
    changeCat: function(t) {
        this.data.ranklist[this.data.active_idx].active = !1, this.data.ranklist[t.target.dataset.idx].active = !0, 
        this.setData({
            active_idx: t.target.dataset.idx,
            ranklist: this.data.ranklist
        }), this.fetchrank(t.target.dataset.idx);
    },
    change_finish: function(t) {
        t.detail.current != this.data.active_idx && (this.data.ranklist[this.data.active_idx].active = !1, 
        this.data.ranklist[t.detail.current].active = !0, this.setData({
            active_idx: t.detail.current,
            ranklist: this.data.ranklist
        })), this.fetchrank(t.detail.current);
    },
    searchBtn: function(t) {
        var a = this;
        a.data.searchkeyword.length > 0 ? wx.navigateTo({
            url: "../list/list?keyword=" + a.data.searchkeyword
        }) : wx.showToast({
            title: "请输入关键字",
            image: "../../images/error1.png",
            duration: 2e3
        });
    },
    searchinput: function(t) {
        this.setData({
            searchkeyword: t.detail.value
        });
    },
    onLoad: function() {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight
                });
            }
        }), this.data.ranklist.push(new t("浏览量", 1, 0)), this.data.ranklist.push(new t("评论数", 0, 1)), 
        this.data.ranklist.push(new t("点赞数", 0, 2)), this.setData({
            ranklist: this.data.ranklist,
            active_idx: 0
        }), this.fetchrank(0);
    },
    fetchrank: function(t) {
        var e = this;
        i.request({
            url: a.GetRankedPosts(t),
            success: function(i) {
                i.data.data.map(function(t) {
                    t.thumb[0].str_value = "" == t.thumb[4].str_value ? "https://p2.pstatp.com/large/pgc-image/9182fd71bb5b401baea210e6d29387c6" : t.thumb[4].str_value;
                });
                var s = i.data.data, n = 1;
                e.data.allrankpostlist[t] = s.map(function(t) {
                    var i = a.ParseItem(t);
                    return i.posttime = a.getcreatedtime(i.created), i.rank = n++, i;
                }), e.setData({
                    allrankpostlist: e.data.allrankpostlist,
                    postheight: 170 * e.data.allrankpostlist[t].length + "rpx"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.fetchallcats();
    }
});