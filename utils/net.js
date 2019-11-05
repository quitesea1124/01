module.exports = {
    request: function(e) {
        var o = e.data, t = e.url, i = e.method;
        0 != e.showloading && wx.showLoading({
            title: "load...",
            mask: !1
        }), wx.request({
            url: t,
            data: o,
            method: i,
            success: function(o) {
                wx.hideLoading(), e.success(o);
            },
            fail: function() {
                wx.hideLoading(), wx.showToast({
                    title: "网络错误请刷新",
                    image: "../../images/error1.png",
                    duration: 2e3
                }), e.fail();
            },
            complete: function() {}
        });
    }
};