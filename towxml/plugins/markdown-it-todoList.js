var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, n = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(n) {
    return void 0 === n ? "undefined" : t(n);
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : void 0 === n ? "undefined" : t(n);
};

!function(t) {
    "object" === ("undefined" == typeof exports ? "undefined" : n(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).markdownitTaskLists = t();
}(function() {
    return function() {
        function t(n, e, o) {
            function i(l, c) {
                if (!e[l]) {
                    if (!n[l]) {
                        var f = "function" == typeof require && require;
                        if (!c && f) return f(l, !0);
                        if (r) return r(l, !0);
                        var u = new Error("Cannot find module '" + l + "'");
                        throw u.code = "MODULE_NOT_FOUND", u;
                    }
                    var s = e[l] = {
                        exports: {}
                    };
                    n[l][0].call(s.exports, function(t) {
                        return i(n[l][1][t] || t);
                    }, s, s.exports, t, n, e, o);
                }
                return e[l].exports;
            }
            for (var r = "function" == typeof require && require, l = 0; l < o.length; l++) i(o[l]);
            return i;
        }
        return t;
    }()({
        1: [ function(t, n, e) {
            function o(t, n, e) {
                var o = t.attrIndex(n), i = [ n, e ];
                o < 0 ? t.attrPush(i) : t.attrs[o] = i;
            }
            function i(t, n) {
                for (var e = t[n].level - 1, o = n - 1; o >= 0; o--) if (t[o].level === e) return o;
                return -1;
            }
            function r(t, n) {
                return a(t[n]) && d(t[n - 1]) && p(t[n - 2]) && b(t[n]);
            }
            function l(t, n) {
                if (t.children.unshift(c(t, n)), t.children[1].content = t.children[1].content.slice(3), 
                t.content = t.content.slice(3), y) if (m) {
                    t.children.pop();
                    var e = "task-item-" + Math.ceil(1e7 * Math.random() - 1e3);
                    t.children[0].content = t.children[0].content.slice(0, -1) + ' id="' + e + '">', 
                    t.children.push(s(t.content, e, n));
                } else t.children.unshift(f(n)), t.children.push(u(n));
            }
            function c(t, n) {
                var e = new n("html_inline", "", 0), o = h ? ' disabled="" ' : "", i = ' value="' + t.content + '" ';
                return 0 === t.content.indexOf("[ ] ") ? e.content = '<checkbox class="h2w__todoCheckbox task-list-item-checkbox"' + o + i + "/>" : 0 !== t.content.indexOf("[x] ") && 0 !== t.content.indexOf("[X] ") || (e.content = '<checkbox class="h2w__todoCheckbox task-list-item-checkbox" checked="true"' + o + i + "/>"), 
                e;
            }
            function f(t) {
                var n = new t("html_inline", "", 0);
                return n.content = "<label>", n;
            }
            function u(t) {
                var n = new t("html_inline", "", 0);
                return n.content = "</label>", n;
            }
            function s(t, n, e) {
                var o = new e("html_inline", "", 0);
                return o.content = '<label class="task-list-item-label" for="' + n + '">' + t + "</label>", 
                o.attrs = [ {
                    for: n
                } ], o;
            }
            function a(t) {
                return "inline" === t.type;
            }
            function d(t) {
                return "paragraph_open" === t.type;
            }
            function p(t) {
                return "list_item_open" === t.type;
            }
            function b(t) {
                return 0 === t.content.indexOf("[ ] ") || 0 === t.content.indexOf("[x] ") || 0 === t.content.indexOf("[X] ");
            }
            var h = !0, y = !1, m = !1;
            n.exports = function(t, n) {
                n && (h = !n.enabled, y = !!n.label, m = !!n.labelAfter), t.core.ruler.after("inline", "github-task-lists", function(t) {
                    for (var n = t.tokens, e = function(t) {
                        for (var e = void 0, o = n[t], i = o.tag, r = o.level, l = "list_item_open" === o.type ? "list_item_close" : "bullet_list_close", c = t, f = n.length; c < f; c++) {
                            var u = n[c];
                            if (u.tag === i && r === u.level && u.type === l) {
                                e = u;
                                break;
                            }
                        }
                        return e;
                    }, c = 2; c < n.length; c++) r(n, c) && (l(n[c], t.Token), o(n[c - 2], "class", "task-list-item" + (h ? "" : " enabled")), 
                    o(n[i(n, c - 2)], "class", "contains-task-list"), e(i(n, c - 2)).tag = "todogroup", 
                    n[i(n, c - 2)].tag = "todogroup", e(c - 2).tag = "todolist", n[c - 2].tag = "todolist");
                });
            };
        }, {} ]
    }, {}, [ 1 ])(1);
});