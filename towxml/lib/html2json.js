var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
};

!function(e) {
    "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).html2json = e();
}(function() {
    function e(e) {
        for (var t = {}, n = e.split(","), o = 0; o < n.length; o++) t[n[o]] = !0;
        return t;
    }
    function t(e) {
        return e.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*\>\n/, "").replace(/<!DOCTYPE.*\>\n/, "");
    }
    var n = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, o = /^<\/([-A-Za-z0-9_]+)[^>]*>/, r = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, i = e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), a = e("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), s = e("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), l = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), c = e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), d = e("script,style"), f = function(e, t) {
        function f(e, n) {
            if (n) for (o = m.length - 1; o >= 0 && m[o] != n; o--) ; else var o = 0;
            if (o >= 0) {
                for (var r = m.length - 1; r >= o; r--) t.end && t.end(m[r]);
                m.length = o;
            }
        }
        var u, p, h, m = [], b = e;
        for (m.last = function() {
            return this[this.length - 1];
        }; e; ) {
            if (p = !0, m.last() && d[m.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + m.last() + "[^>]*>"), function(e, n) {
                return n = n.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars && t.chars(n), 
                "";
            }), f(0, m.last()); else if (0 == e.indexOf("\x3c!--") ? (u = e.indexOf("--\x3e")) >= 0 && (t.comment && t.comment(e.substring(4, u)), 
            e = e.substring(u + 3), p = !1) : 0 == e.indexOf("</") ? (h = e.match(o)) && (e = e.substring(h[0].length), 
            h[0].replace(o, f), p = !1) : 0 == e.indexOf("<") && (h = e.match(n)) && (e = e.substring(h[0].length), 
            h[0].replace(n, function(e, n, o, d) {
                if (n = n.toLowerCase(), a[n]) for (;m.last() && s[m.last()]; ) f(0, m.last());
                if (l[n] && m.last() == n && f(0, n), (d = i[n] || !!d) || m.push(n), t.start) {
                    var u = [];
                    o.replace(r, function(e, t) {
                        var n = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : c[t] ? t : "";
                        u.push({
                            name: t,
                            value: n,
                            escaped: n.replace(/(^|[^\\])"/g, '$1\\"')
                        });
                    }), t.start && t.start(n, u, d);
                }
            }), p = !1), p) {
                var y = (u = e.indexOf("<")) < 0 ? e : e.substring(0, u);
                e = u < 0 ? "" : e.substring(u), t.chars && t.chars(y);
            }
            if (e == b) throw "Parse Error: " + e;
            b = e;
        }
        f();
    };
    return function(e) {
        e = t(e);
        var n = [], o = {
            node: "root",
            child: []
        };
        return f(e, {
            start: function(e, t, r) {
                var i = {
                    node: "element",
                    tag: e
                };
                if (0 !== t.length && (i.attr = t.reduce(function(e, t) {
                    var n = t.name, o = t.value;
                    return o.match(/ /) && (o = o.split(" ")), e[n] ? Array.isArray(e[n]) ? e[n].push(o) : e[n] = [ e[n], o ] : e[n] = o, 
                    e;
                }, {})), r) {
                    var a = n[0] || o;
                    void 0 === a.child && (a.child = []), a.child.push(i);
                } else n.unshift(i);
            },
            end: function(e) {
                var t = n.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), 0 === n.length) o.child.push(t); else {
                    var r = n[0];
                    void 0 === r.child && (r.child = []), r.child.push(t);
                }
            },
            chars: function(e) {
                var t = {
                    node: "text",
                    text: e
                };
                if (0 === n.length) o.child.push(t); else {
                    var r = n[0];
                    void 0 === r.child && (r.child = []), r.child.push(t);
                }
            },
            comment: function(e) {
                var t = {
                    node: "comment",
                    text: e
                }, o = n[0];
                void 0 === o.child && (o.child = []), o.child.push(t);
            }
        }), o;
    };
});