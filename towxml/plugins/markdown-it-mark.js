var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(n) {
    return void 0 === n ? "undefined" : e(n);
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : void 0 === n ? "undefined" : e(n);
};

!function(e) {
    "object" == ("undefined" == typeof exports ? "undefined" : n(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).markdownitMark = e();
}(function() {
    return function e(n, t, o) {
        function r(f, u) {
            if (!t[f]) {
                if (!n[f]) {
                    var s = "function" == typeof require && require;
                    if (!u && s) return s(f, !0);
                    if (i) return i(f, !0);
                    var l = new Error("Cannot find module '" + f + "'");
                    throw l.code = "MODULE_NOT_FOUND", l;
                }
                var p = t[f] = {
                    exports: {}
                };
                n[f][0].call(p.exports, function(e) {
                    return r(n[f][1][e] || e);
                }, p, p.exports, e, n, t, o);
            }
            return t[f].exports;
        }
        for (var i = "function" == typeof require && require, f = 0; f < o.length; f++) r(o[f]);
        return r;
    }({
        1: [ function(e, n, t) {
            n.exports = function(e) {
                e.inline.ruler.before("emphasis", "mark", function(e, n) {
                    var t, o, r, i, f, u = e.pos, s = e.src.charCodeAt(u);
                    if (n) return !1;
                    if (61 !== s) return !1;
                    if (o = e.scanDelims(e.pos, !0), i = o.length, f = String.fromCharCode(s), 2 > i) return !1;
                    for (i % 2 && (r = e.push("text", "", 0), r.content = f, i--), t = 0; i > t; t += 2) (r = e.push("text", "", 0)).content = f + f, 
                    e.delimiters.push({
                        marker: s,
                        jump: t,
                        token: e.tokens.length - 1,
                        level: e.level,
                        end: -1,
                        open: o.can_open,
                        close: o.can_close
                    });
                    return e.pos += o.length, !0;
                }), e.inline.ruler2.before("emphasis", "mark", function(e) {
                    var n, t, o, r, i, f = [], u = e.delimiters, s = e.delimiters.length;
                    for (n = 0; s > n; n++) 61 === (o = u[n]).marker && -1 !== o.end && (r = u[o.end], 
                    i = e.tokens[o.token], i.type = "mark_open", i.tag = "mark", i.nesting = 1, i.markup = "==", 
                    i.content = "", i = e.tokens[r.token], i.type = "mark_close", i.tag = "mark", i.nesting = -1, 
                    i.markup = "==", i.content = "", "text" === e.tokens[r.token - 1].type && "=" === e.tokens[r.token - 1].content && f.push(r.token - 1));
                    for (;f.length; ) {
                        for (t = (n = f.pop()) + 1; t < e.tokens.length && "mark_close" === e.tokens[t].type; ) t++;
                        n !== --t && (i = e.tokens[t], e.tokens[t] = e.tokens[n], e.tokens[n] = i);
                    }
                });
            };
        }, {} ]
    }, {}, [ 1 ])(1);
});