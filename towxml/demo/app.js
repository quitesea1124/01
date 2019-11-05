var t = require("/towxml/main");

App({
    onLaunch: function() {},
    towxml: new t(),
    docDir: "https://raw.githubusercontent.com/sbfkcel/towxml/master/docs/",
    getText: function(t, e) {
        wx.request({
            url: t,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                "function" == typeof e && e(t);
            }
        });
    }
});