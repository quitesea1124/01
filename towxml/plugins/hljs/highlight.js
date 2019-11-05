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
    var t = "object" == ("undefined" == typeof window ? "undefined" : n(window)) && window || "object" == ("undefined" == typeof self ? "undefined" : n(self)) && self;
    "undefined" != typeof exports ? e(exports) : t && (t.hljs = e({}), "function" == typeof define && define.amd && define([], function() {
        return t.hljs;
    }));
}(function(e) {
    function n(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function t(e) {
        return e.nodeName.toLowerCase();
    }
    function r(e, n) {
        var t = e && e.exec(n);
        return t && 0 === t.index;
    }
    function a(e) {
        return N.test(e);
    }
    function i(e) {
        var n, t, r, i, o = e.className + " ";
        if (o += e.parentNode ? e.parentNode.className : "", t = y.exec(o)) return v(t[1]) ? t[1] : "no-highlight";
        for (n = 0, r = (o = o.split(/\s+/)).length; n < r; n++) if (i = o[n], a(i) || v(i)) return i;
    }
    function o(e) {
        var n, t = {}, r = Array.prototype.slice.call(arguments, 1);
        for (n in e) t[n] = e[n];
        return r.forEach(function(e) {
            for (n in e) t[n] = e[n];
        }), t;
    }
    function s(e) {
        var n = [];
        return function e(r, a) {
            for (var i = r.firstChild; i; i = i.nextSibling) 3 === i.nodeType ? a += i.nodeValue.length : 1 === i.nodeType && (n.push({
                event: "start",
                offset: a,
                node: i
            }), a = e(i, a), t(i).match(/br|hr|img|input/) || n.push({
                event: "stop",
                offset: a,
                node: i
            }));
            return a;
        }(e, 0), n;
    }
    function l(e, r, a) {
        function i() {
            return e.length && r.length ? e[0].offset !== r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" === r[0].event ? e : r : e.length ? e : r;
        }
        function o(e) {
            c += "<" + t(e) + b.map.call(e.attributes, function(e) {
                return " " + e.nodeName + '="' + n(e.value).replace('"', "&quot;") + '"';
            }).join("") + ">";
        }
        function s(e) {
            c += "</" + t(e) + ">";
        }
        function l(e) {
            ("start" === e.event ? o : s)(e.node);
        }
        for (var u = 0, c = "", f = []; e.length || r.length; ) {
            var g = i();
            if (c += n(a.substring(u, g[0].offset)), u = g[0].offset, g === e) {
                f.reverse().forEach(s);
                do {
                    l(g.splice(0, 1)[0]), g = i();
                } while (g === e && g.length && g[0].offset === u);
                f.reverse().forEach(o);
            } else "start" === g[0].event ? f.push(g[0].node) : f.pop(), l(g.splice(0, 1)[0]);
        }
        return c + n(a.substr(u));
    }
    function u(e) {
        return e.variants && !e.cached_variants && (e.cached_variants = e.variants.map(function(n) {
            return o(e, {
                variants: null
            }, n);
        })), e.cached_variants || e.endsWithParent && [ o(e) ] || [ e ];
    }
    function c(e) {
        function n(e) {
            return e && e.source || e;
        }
        function t(t, r) {
            return new RegExp(n(t), "m" + (e.case_insensitive ? "i" : "") + (r ? "g" : ""));
        }
        function r(a, i) {
            if (!a.compiled) {
                if (a.compiled = !0, a.keywords = a.keywords || a.beginKeywords, a.keywords) {
                    var o = {}, s = function(n, t) {
                        e.case_insensitive && (t = t.toLowerCase()), t.split(" ").forEach(function(e) {
                            var t = e.split("|");
                            o[t[0]] = [ n, t[1] ? Number(t[1]) : 1 ];
                        });
                    };
                    "string" == typeof a.keywords ? s("keyword", a.keywords) : h(a.keywords).forEach(function(e) {
                        s(e, a.keywords[e]);
                    }), a.keywords = o;
                }
                a.lexemesRe = t(a.lexemes || /\w+/, !0), i && (a.beginKeywords && (a.begin = "\\b(" + a.beginKeywords.split(" ").join("|") + ")\\b"), 
                a.begin || (a.begin = /\B|\b/), a.beginRe = t(a.begin), a.end || a.endsWithParent || (a.end = /\B|\b/), 
                a.end && (a.endRe = t(a.end)), a.terminator_end = n(a.end) || "", a.endsWithParent && i.terminator_end && (a.terminator_end += (a.end ? "|" : "") + i.terminator_end)), 
                a.illegal && (a.illegalRe = t(a.illegal)), null == a.relevance && (a.relevance = 1), 
                a.contains || (a.contains = []), a.contains = Array.prototype.concat.apply([], a.contains.map(function(e) {
                    return u("self" === e ? a : e);
                })), a.contains.forEach(function(e) {
                    r(e, a);
                }), a.starts && r(a.starts, i);
                var l = a.contains.map(function(e) {
                    return e.beginKeywords ? "\\.?(" + e.begin + ")\\.?" : e.begin;
                }).concat([ a.terminator_end, a.illegal ]).map(n).filter(Boolean);
                a.terminators = l.length ? t(l.join("|"), !0) : {
                    exec: function() {
                        return null;
                    }
                };
            }
        }
        r(e);
    }
    function f(e, t, a, i) {
        function o(e, n) {
            var t, a;
            for (t = 0, a = n.contains.length; t < a; t++) if (r(n.contains[t].beginRe, e)) return n.contains[t];
        }
        function s(e, n) {
            if (r(e.endRe, n)) {
                for (;e.endsParent && e.parent; ) e = e.parent;
                return e;
            }
            if (e.endsWithParent) return s(e.parent, n);
        }
        function l(e, n) {
            return !a && r(n.illegalRe, e);
        }
        function u(e, n) {
            var t = R.case_insensitive ? n[0].toLowerCase() : n[0];
            return e.keywords.hasOwnProperty(t) && e.keywords[t];
        }
        function d(e, n, t, r) {
            var a = '<span class="' + (r ? "" : S.classPrefix);
            return (a += e + '">') + n + (t ? "" : M);
        }
        function m() {
            var e, t, r, a;
            if (!y.keywords) return n(O);
            for (a = "", t = 0, y.lexemesRe.lastIndex = 0, r = y.lexemesRe.exec(O); r; ) a += n(O.substring(t, r.index)), 
            (e = u(y, r)) ? (C += e[1], a += d(e[0], n(r[0]))) : a += n(r[0]), t = y.lexemesRe.lastIndex, 
            r = y.lexemesRe.exec(O);
            return a + n(O.substr(t));
        }
        function E() {
            var e = "string" == typeof y.subLanguage;
            if (e && !_[y.subLanguage]) return n(O);
            var t = e ? f(y.subLanguage, O, !0, w[y.subLanguage]) : g(O, y.subLanguage.length ? y.subLanguage : void 0);
            return y.relevance > 0 && (C += t.relevance), e && (w[y.subLanguage] = t.top), d(t.language, t.value, !1, !0);
        }
        function p() {
            x += null != y.subLanguage ? E() : m(), O = "";
        }
        function b(e) {
            x += e.className ? d(e.className, "", !0) : "", y = Object.create(e, {
                parent: {
                    value: y
                }
            });
        }
        function h(e, n) {
            if (O += e, null == n) return p(), 0;
            var t = o(n, y);
            if (t) return t.skip ? O += n : (t.excludeBegin && (O += n), p(), t.returnBegin || t.excludeBegin || (O = n)), 
            b(t, n), t.returnBegin ? 0 : n.length;
            var r = s(y, n);
            if (r) {
                var a = y;
                a.skip ? O += n : (a.returnEnd || a.excludeEnd || (O += n), p(), a.excludeEnd && (O = n));
                do {
                    y.className && (x += M), y.skip || (C += y.relevance), y = y.parent;
                } while (y !== r.parent);
                return r.starts && b(r.starts, ""), a.returnEnd ? 0 : n.length;
            }
            if (l(n, y)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (y.className || "<unnamed>") + '"');
            return O += n, n.length || 1;
        }
        var R = v(e);
        if (!R) throw new Error('Unknown language: "' + e + '"');
        c(R);
        var N, y = i || R, w = {}, x = "";
        for (N = y; N !== R; N = N.parent) N.className && (x = d(N.className, "", !0) + x);
        var O = "", C = 0;
        try {
            for (var L, A, B = 0; y.terminators.lastIndex = B, L = y.terminators.exec(t); ) A = h(t.substring(B, L.index), L[0]), 
            B = L.index + A;
            for (h(t.substr(B)), N = y; N.parent; N = N.parent) N.className && (x += M);
            return {
                relevance: C,
                value: x,
                language: e,
                top: y
            };
        } catch (e) {
            if (e.message && -1 !== e.message.indexOf("Illegal")) return {
                relevance: 0,
                value: n(t)
            };
            throw e;
        }
    }
    function g(e, t) {
        t = t || S.languages || h(_);
        var r = {
            relevance: 0,
            value: n(e)
        }, a = r;
        return t.filter(v).forEach(function(n) {
            var t = f(n, e, !1);
            t.language = n, t.relevance > a.relevance && (a = t), t.relevance > r.relevance && (a = r, 
            r = t);
        }), a.language && (r.second_best = a), r;
    }
    function d(e) {
        return S.tabReplace || S.useBR ? e.replace(w, function(e, n) {
            return S.useBR && "\n" === e ? "<br>" : S.tabReplace ? n.replace(/\t/g, S.tabReplace) : "";
        }) : e;
    }
    function m(e, n, t) {
        var r = n ? R[n] : t, a = [ e.trim() ];
        return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(r) && a.push(r), 
        a.join(" ").trim();
    }
    function E(e) {
        var n, t, r, o, u, c = i(e);
        a(c) || (S.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), 
        n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e, 
        u = n.textContent, r = c ? f(c, u, !0) : g(u), (t = s(n)).length && (o = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), 
        o.innerHTML = r.value, r.value = l(t, s(o), u)), r.value = d(r.value), e.innerHTML = r.value, 
        e.className = m(e.className, c, r.language), e.result = {
            language: r.language,
            re: r.relevance
        }, r.second_best && (e.second_best = {
            language: r.second_best.language,
            re: r.second_best.relevance
        }));
    }
    function p() {
        if (!p.called) {
            p.called = !0;
            var e = document.querySelectorAll("pre code");
            b.forEach.call(e, E);
        }
    }
    function v(e) {
        return e = (e || "").toLowerCase(), _[e] || _[R[e]];
    }
    var b = [], h = Object.keys, _ = {}, R = {}, N = /^(no-?highlight|plain|text)$/i, y = /\blang(?:uage)?-([\w-]+)\b/i, w = /((^(<[^>]+>|\t|)+|(?:\n)))/gm, M = "</span>", S = {
        classPrefix: "hljs-",
        tabReplace: null,
        useBR: !1,
        languages: void 0
    };
    return e.highlight = f, e.highlightAuto = g, e.fixMarkup = d, e.highlightBlock = E, 
    e.configure = function(e) {
        S = o(S, e);
    }, e.initHighlighting = p, e.initHighlightingOnLoad = function() {
        addEventListener("DOMContentLoaded", p, !1), addEventListener("load", p, !1);
    }, e.registerLanguage = function(n, t) {
        var r = _[n] = t(e);
        r.aliases && r.aliases.forEach(function(e) {
            R[e] = n;
        });
    }, e.listLanguages = function() {
        return h(_);
    }, e.getLanguage = v, e.inherit = o, e.IDENT_RE = "[a-zA-Z]\\w*", e.UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*", 
    e.NUMBER_RE = "\\b\\d+(\\.\\d+)?", e.C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", 
    e.BINARY_NUMBER_RE = "\\b(0b[01]+)", e.RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", 
    e.BACKSLASH_ESCAPE = {
        begin: "\\\\[\\s\\S]",
        relevance: 0
    }, e.APOS_STRING_MODE = {
        className: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [ e.BACKSLASH_ESCAPE ]
    }, e.QUOTE_STRING_MODE = {
        className: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [ e.BACKSLASH_ESCAPE ]
    }, e.PHRASAL_WORDS_MODE = {
        begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    }, e.COMMENT = function(n, t, r) {
        var a = e.inherit({
            className: "comment",
            begin: n,
            end: t,
            contains: []
        }, r || {});
        return a.contains.push(e.PHRASAL_WORDS_MODE), a.contains.push({
            className: "doctag",
            begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            relevance: 0
        }), a;
    }, e.C_LINE_COMMENT_MODE = e.COMMENT("//", "$"), e.C_BLOCK_COMMENT_MODE = e.COMMENT("/\\*", "\\*/"), 
    e.HASH_COMMENT_MODE = e.COMMENT("#", "$"), e.NUMBER_MODE = {
        className: "number",
        begin: e.NUMBER_RE,
        relevance: 0
    }, e.C_NUMBER_MODE = {
        className: "number",
        begin: e.C_NUMBER_RE,
        relevance: 0
    }, e.BINARY_NUMBER_MODE = {
        className: "number",
        begin: e.BINARY_NUMBER_RE,
        relevance: 0
    }, e.CSS_NUMBER_MODE = {
        className: "number",
        begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        relevance: 0
    }, e.REGEXP_MODE = {
        className: "regexp",
        begin: /\//,
        end: /\/[gimuy]*/,
        illegal: /\n/,
        contains: [ e.BACKSLASH_ESCAPE, {
            begin: /\[/,
            end: /\]/,
            relevance: 0,
            contains: [ e.BACKSLASH_ESCAPE ]
        } ]
    }, e.TITLE_MODE = {
        className: "title",
        begin: e.IDENT_RE,
        relevance: 0
    }, e.UNDERSCORE_TITLE_MODE = {
        className: "title",
        begin: e.UNDERSCORE_IDENT_RE,
        relevance: 0
    }, e.METHOD_GUARD = {
        begin: "\\.\\s*" + e.UNDERSCORE_IDENT_RE,
        relevance: 0
    }, e;
});