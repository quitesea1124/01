var t = getApp();

Page({
    data: {
        isloading: !0,
        article: {},
        timer: void 0
    },
    onLoad: function() {
        var a = this, o = this;
        t.getText(t.docDir + "demo.md?v=110", function(e) {
            if (e.data) {
                var n = t.towxml.toJson(e.data, "markdown", o);
                n.theme = "dark", a.event_bind_touchstart = function(t) {
                    console.log(t.target.dataset._el);
                }, a.eventRun_todo_checkboxChange = function(t) {
                    console.log(t.detail);
                }, o.setData({
                    article: n,
                    isloading: !1
                });
            }
        });
    }
});