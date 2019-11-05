function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}();

new (function() {
    function n(e) {
        t(this, n);
        var i = this;
        i.config = {}, e = e || {};
        for (var a in e) i.config[a] = e[a];
        var r = require("./main");
        i.m = {
            fs: require("fs"),
            path: require("path"),
            towxml: new r()
        };
    }
    return e(n, [ {
        key: "init",
        value: function() {
            var t = this;
            t.outtag();
            var e = t.outwxml();
            t.m.fs.writeFileSync("./renderTemplate.wxml", e);
        }
    }, {
        key: "outtag",
        value: function(t) {
            var e = this, n = "", i = e.outattr();
            return e.m.towxml.wxmlTag.forEach(function(e, a) {
                var r = "";
                "image" === e && (r = 'mode="widthFix"'), "checkbox-group" === e && (i += "bindchange=\"{{item.attr['bindchange']}}\""), 
                "checkbox" === e && (i += "value=\"{{item.attr['value']}}\""), n += "<" + e + " wx:if=\"{{item.node === 'element' && item.tag === '" + e + "'}}\" " + i + " " + r + '><block wx:for="{{item.child}}" wx:key="{{item}}"><template is="m' + t + '" data="{{item}}"/></block></' + e + ">";
            }), n;
        }
    }, {
        key: "outattr",
        value: function() {
            var t = "";
            return t += 'data-_el="{{item}}"', [ "class", "width", "height", "data", "src", "id", "style", "href", "checked", "bind:touchstart", "bind:touchmove", "bind:touchcancel", "bind:touchend", "bind:tap", "bind:longpress", "bind:longtap", "bind:transitionend", "bind:animationstart", "bind:animationiteration", "bind:animationend", "bind:touchforcechange" ].forEach(function(e, n) {
                switch (e) {
                  case "class":
                    t += e + '="{{item.attr.class}}"';
                    break;

                  case "href":
                    t += 'url="{{item.attr.' + e + '}}"';
                    break;

                  default:
                    var i = e.split(":");
                    i.length > 1 ? t += e + "='eventRun_" + i[0] + "_" + i[1] + "'" : t += e + "=\"{{item.attr['" + e + "']}}\"";
                }
            }), t;
        }
    }, {
        key: "outwxml",
        value: function() {
            for (var t = this, e = "", n = 0, i = t.config.depth; n < i; n++) {
                var a = n < i - 1 ? n + 1 : n;
                e += '<template name="m' + n + '"><block wx:if="{{item.node === \'text\'}}">{{item.text}}</block>' + t.outtag(a) + "</template>";
            }
            return e;
        }
    } ]), n;
}())({
    depth: 10
}).init();