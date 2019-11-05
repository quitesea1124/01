var t = require("../../utils/api"), e = (getApp(), require("../../utils/net"));

Page({
    name: "list",
    data: {
        allpostslist: [],
        title: ""
    },
    fetchposts: function() {
        var s = this;
        e.request({
            url: t.GetPosts(),
            success: function(e) {
                var a = e.data.data;
                s.setData({
                    allpostslist: a.map(function(e) {
                        var s = t.ParseItem(e);
                        return s.posttime = t.getcreatedtime(s.created), s;
                    })
                });
            }
        });
    },
    fetchserach: function(s) {
        var a = this;
        e.request({
            url: t.Search(s),
            success: function(e) {
                var s = e.data.data;
                "none" != s ? a.setData({
                    allpostslist: s.map(function(e) {
                        var s = t.ParseItem(e);
                        return s.posttime = t.getcreatedtime(s.created), s;
                    })
                }) : (wx.showToast({
                    title: "没有搜索结果",
                    image: "../../resources/error1.png",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack();
                }, 2e3));
            }
        });
    },
    onLoad: function(t) {
        if ("{}" == JSON.stringify(t)) this.fetchposts(), this.setData({
            title: "所有文章列表："
        }); else if (void 0 != t.keyword) {
            var e = t.keyword;
            this.setData({
                title: "搜索关键字 “" + e + "” 的结果："
            }), this.fetchserach(e);
        } else void 0 != t.mid && void 0 != t.name && (this.setData({
            title: "分类 “" + t.name + "” 下的所有文章："
        }), this.fetchpostbymid(t.mid));
    },
    fetchpostbymid: function(s) {
        var a = this;
        e.request({
            url: t.GetPostsbyMID(s),
            success: function(e) {
                var s = e.data.data;
                s.map(function(t) {
                    t.thumb[0].str_value = "" == t.thumb[4].str_value ? "https://cdn.xiaohuwei.cn/2019/04/361969506.jpg" : t.thumb[4].str_value;
                }), null != s && void 0 != s ? a.setData({
                    allpostslist: s.map(function(e) {
                        return e.posttime = t.getcreatedtime(e.created), e.thumb = e.thumb[0].str_value, 
                        e;
                    })
                }) : wx.showToast({
                    title: "该分类没有文章",
                    image: "../../resources/error1.png",
                    duration: 2e3
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.fetchposts();
    }
});