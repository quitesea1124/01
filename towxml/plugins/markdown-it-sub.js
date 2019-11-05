var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, e = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : o(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : o(e);
};

!function(o) {
    "object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define([], o) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).markdownitSub = o();
}(function() {
    return function o(e, n, t) {
        function r(f, i) {
            if (!n[f]) {
                if (!e[f]) {
                    var p = "function" == typeof require && require;
                    if (!i && p) return p(f, !0);
                    if (u) return u(f, !0);
                    var s = new Error("Cannot find module '" + f + "'");
                    throw s.code = "MODULE_NOT_FOUND", s;
                }
                var c = n[f] = {
                    exports: {}
                };
                e[f][0].call(c.exports, function(o) {
                    return r(e[f][1][o] || o);
                }, c, c.exports, o, e, n, t);
            }
            return n[f].exports;
        }
        for (var u = "function" == typeof require && require, f = 0; f < t.length; f++) r(t[f]);
        return r;
    }({
        1: [ function(o, e) {
            function n(o, e) {
                var n, r, u, f = o.posMax, i = o.pos;
                if (126 !== o.src.charCodeAt(i)) return !1;
                if (e) return !1;
                if (i + 2 >= f) return !1;
                for (o.pos = i + 1; o.pos < f; ) {
                    if (126 === o.src.charCodeAt(o.pos)) {
                        n = !0;
                        break;
                    }
                    o.md.inline.skipToken(o);
                }
                return n && i + 1 !== o.pos ? (r = o.src.slice(i + 1, o.pos)).match(/(^|[^\\])(\\\\)*\s/) ? (o.pos = i, 
                !1) : (o.posMax = o.pos, o.pos = i + 1, u = o.push("sub_open", "sub", 1), u.markup = "~", 
                u = o.push("text", "", 0), u.content = r.replace(t, "$1"), u = o.push("sub_close", "sub", -1), 
                u.markup = "~", o.pos = o.posMax + 1, o.posMax = f, !0) : (o.pos = i, !1);
            }
            var t = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
            e.exports = function(o) {
                o.inline.ruler.after("emphasis", "sub", n);
            };
        }, {} ]
    }, {}, [ 1 ])(1);
});