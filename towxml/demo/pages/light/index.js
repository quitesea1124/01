var t = getApp();

Page({
    data: {
        isloading: !0,
        article: {},
        timer: void 0
    },
    onLoad: function() {
        var o = this, a = this;
        t.getText(t.docDir + "demo.md?v=110", function(e) {
            if (e.data) {
                var n = t.towxml.toJson(e.data, "markdown", a);
                o.event_bind_touchstart = function(t) {
                    console.log(t.target.dataset._el);
                }, o.eventRun_todo_checkboxChange = function(t) {
                    console.log(t.detail);
                }, a.setData({
                    article: n,
                    isloading: !1
                });
            }
        });
    }
});