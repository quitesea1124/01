function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = "function" == typeof Symbol && "symbol" == n(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : n(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : n(e);
}, o = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n;
    };
}(), i = require("./deCode"), r = function() {
    function n(t) {
        e(this, n);
        var o = this;
        t = t || {};
        for (var i in t) o.config[i] = t[i];
        o.m = {};
        var r = {
            html: !0,
            xhtmlOut: !0,
            typographer: !0,
            highlight: function(e, n, t) {
                return o.m.highlight.highlightAuto(e).value;
            }
        };
        global ? (o.m.html2json = require("./lib/html2json"), o.m.highlight = require("./plugins/hljs/index"), 
        o.m.md = require("./lib/markdown-it")(r), o.m.md_sub = require("./plugins/markdown-it-sub"), 
        o.m.md_sup = require("./plugins/markdown-it-sup"), o.m.md_ins = require("./plugins/markdown-it-ins"), 
        o.m.md_mark = require("./plugins/markdown-it-mark"), o.m.md_emoji = require("./plugins/markdown-it-emoji"), 
        o.m.md_todo = require("./plugins/markdown-it-todoList")) : window && (o.m.html2json = window.html2json, 
        o.m.highlight = window.hljs, o.m.md = new window.markdownit(r), o.m.md_sub = window.markdownitSub, 
        o.m.md_sup = window.markdownitSup, o.m.md_ins = window.markdownitIns, o.m.md_mark = window.markdownitMark, 
        o.m.md_emoji = window.markdownitEmoji, o.m.md_todo = window.markdownitTaskLists), 
        o.m.md.use(o.m.md_sub), o.m.md.use(o.m.md_sup), o.m.md.use(o.m.md_ins), o.m.md.use(o.m.md_mark), 
        o.m.md.use(o.m.md_emoji), o.m.md.use(o.m.md_todo), o.m.md.renderer.rules.emoji = function(e, n) {
            return '<g-emoji class="h2w__emoji h2w__emoji--' + e[n].markup + '">' + e[n].content + "</g-emoji>";
        }, o.wxmlTag = [ "view", "video", "swiper", "block", "swiper-item", "button", "slider", "scroll-view", "movable-area", "movable-view", "text", "progress", "checkbox-group", "label", "checkbox", "form", "switch", "input", "radio-group", "radio", "picker", "picker-view", "switch", "textarea", "navigator", "audio", "image", "map", "canvas", "contact-button" ];
    }
    return o(n, [ {
        key: "md2html",
        value: function(e) {
            return this.m.md.render(e);
        }
    }, {
        key: "html2wxml",
        value: function(e) {
            var n = this, t = /<[^<]*>/gi, o = e.replace(t, function(e) {
                if ("</" === e.substr(0, 2)) {
                    var t = e.substr(2, e.length - 3).toLowerCase();
                    if (n.isConversion(t)) return "</" + n.newLabel(t) + ">";
                } else {
                    var o = e.substr(1, e.length - 2).split(" "), i = o[0].toLowerCase(), r = "h2w__" + i;
                    if (n.isConversion(i)) {
                        o.splice(0, 1);
                        var m = o.length;
                        (function() {
                            if (m) for (var e = 0; e < m; e++) {
                                var n = o[e], t = /class="/gi;
                                if (t.test(n)) return o[e] = n.replace(t, function(e) {
                                    return e + r + " ";
                                }), !0;
                            }
                            return !1;
                        })() || o.unshift('class="' + r + '"');
                        var a = function() {
                            var e = "";
                            return o.forEach(function(n, t) {
                                e += n + " ";
                            }), e = e.substr(0, e.length - 1);
                        }();
                        return "todogroup" === i && (a += ' bindchange="eventRun_todo_checkboxChange"'), 
                        "img" === i ? "<image " + a + "></image>" : "<" + n.newLabel(i) + " " + a + ">" + n.needClose(i);
                    }
                }
                return e;
            });
            return i(o);
        }
    }, {
        key: "md2wxml",
        value: function(e) {
            var n = this, t = n.md2html(e);
            return n.html2wxml(t);
        }
    }, {
        key: "isConversion",
        value: function(e) {
            return !this.wxmlTag.some(function(n, t) {
                return e === n;
            });
        }
    }, {
        key: "needClose",
        value: function(e) {
            var n = "";
            return [ "hr", "br" ].some(function(n, t) {
                return e === n;
            }) && (n = "</view>"), n;
        }
    }, {
        key: "newLabel",
        value: function(e) {
            var n = "view";
            switch (e) {
              case "a":
                n = "navigator";
                break;

              case "span":
              case "b":
              case "strong":
              case "i":
              case "em":
              case "code":
              case "sub":
              case "sup":
              case "g-emoji":
              case "mark":
              case "ins":
                n = "text";
                break;

              case "todogroup":
                n = "checkbox-group";
            }
            return n;
        }
    }, {
        key: "toJson",
        value: function(e, n, o) {
            var i = this, r = "", m = void 0;
            return "markdown" === (n = n || "html") ? r = i.m.html2json(i.md2wxml(e)) : "html" === n && (r = i.m.html2json(i.html2wxml(e))), 
            (m = function(e) {
                for (var n in e) "child" === n && "object" === t(e[n]) && e[n].length && e[n].forEach(function(e, n) {
                    m(e);
                }), "attr" === n && ("string" == typeof e[n].class ? e[n].className = e[n].class : "object" === t(e[n].class) && e[n].class.length && (e[n].className = e[n].class.toString().replace(/,/g, " ")));
            })(r), r.theme = "light", o && ([ "bind:touchstart", "bind:touchmove", "bind:touchcancel", "bind:touchend", "bind:tap", "bind:longpress", "bind:longtap", "bind:transitionend", "bind:animationstart", "bind:animationiteration", "bind:animationend", "bind:touchforcechange" ].forEach(function(e) {
                var n = e.split(":"), t = n[0], i = n[1];
                o["eventRun_" + t + "_" + i] = function(e) {
                    var n = "event_" + t + "_" + i, r = n + "_timer", m = o[n];
                    "function" == typeof m && (clearTimeout(o[r]), o[r] = setTimeout(function() {
                        m(e);
                    }));
                };
            }), o.eventRun_todo_checkboxChange = function(e) {}), r;
        }
    } ]), n;
}();

module.exports = r;