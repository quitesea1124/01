var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e];
        for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (t[a] = i[a]);
    }
    return t;
};

Component({
    properties: {
        painting: {
            type: Object,
            value: {
                view: []
            },
            observer: function(t, e) {
                this.data.isPainting || (JSON.stringify(t) !== JSON.stringify(e) ? t && t.width && t.height && (this.setData({
                    showCanvas: !0,
                    isPainting: !0
                }), this.readyPigment()) : t && "same" !== t.mode && this.triggerEvent("getImage", {
                    errMsg: "canvasdrawer:samme params"
                }));
            }
        }
    },
    data: {
        showCanvas: !1,
        width: 100,
        height: 100,
        index: 0,
        imageList: [],
        tempFileList: [],
        isPainting: !1
    },
    ctx: null,
    cache: {},
    ready: function() {
        wx.removeStorageSync("canvasdrawer_pic_cache"), this.cache = wx.getStorageSync("canvasdrawer_pic_cache") || {}, 
        this.ctx = wx.createCanvasContext("canvasdrawer", this);
    },
    methods: {
        readyPigment: function() {
            var t = this, e = this.data.painting, i = e.width, a = e.height, s = e.views;
            this.setData({
                width: i,
                height: a
            });
            var n = setInterval(function() {
                t.ctx && (clearInterval(n), t.ctx.clearActions(), t.ctx.save(), t.getImageList(s), 
                t.downLoadImages(0));
            }, 100);
        },
        getImageList: function(t) {
            for (var e = [], i = 0; i < t.length; i++) "image" === t[i].type && e.push(t[i].url);
            this.setData({
                imageList: e
            });
        },
        downLoadImages: function(t) {
            var e = this, i = this.data, a = i.imageList, s = i.tempFileList;
            t < a.length ? this.getImageInfo(a[t]).then(function(i) {
                s.push(i), e.setData({
                    tempFileList: s
                }), e.downLoadImages(t + 1);
            }) : this.startPainting();
        },
        startPainting: function() {
            for (var e = this, i = this.data, a = i.tempFileList, s = i.painting.views, n = 0, r = 0; n < s.length; n++) if ("image" === s[n].type) this.drawImage(t({}, s[n], {
                url: a[r]
            })), r++; else if ("text" === s[n].type) {
                if (!this.ctx.measureText) return wx.showModal({
                    title: "提示",
                    content: "当前微信版本过低，无法使用 measureText 功能，请升级到最新微信版本后重试。"
                }), void this.triggerEvent("getImage", {
                    errMsg: "canvasdrawer:version too low"
                });
                this.drawText(s[n]);
            } else "rect" === s[n].type && this.drawRect(s[n]);
            this.ctx.draw(!1, function() {
                wx.setStorageSync("canvasdrawer_pic_cache", e.cache), e.saveImageToLocal();
            });
        },
        drawImage: function(t) {
            this.ctx.save();
            var e = t.url, i = t.top, a = void 0 === i ? 0 : i, s = t.left, n = void 0 === s ? 0 : s, r = t.width, h = void 0 === r ? 0 : r, o = t.height, c = void 0 === o ? 0 : o;
            t.borderRadius, this.ctx.drawImage(e, n, a, h, c), this.ctx.restore();
        },
        drawText: function(e) {
            this.ctx.save();
            var i = e.MaxLineNumber, a = void 0 === i ? 2 : i, s = e.breakWord, n = void 0 !== s && s, r = e.color, h = void 0 === r ? "black" : r, o = e.content, c = void 0 === o ? "" : o, g = e.fontSize, d = void 0 === g ? 16 : g, l = e.top, v = void 0 === l ? 0 : l, w = e.left, x = void 0 === w ? 0 : w, m = e.lineHeight, f = void 0 === m ? 20 : m, u = e.textAlign, p = void 0 === u ? "left" : u, I = e.width, T = e.bolder, L = void 0 !== T && T, y = e.textDecoration, b = void 0 === y ? "none" : y;
            if (this.ctx.beginPath(), this.ctx.setTextBaseline("top"), this.ctx.setTextAlign(p), 
            this.ctx.setFillStyle(h), this.ctx.setFontSize(d), n) {
                for (var P = "", F = v, S = 1, k = 0; k < c.length; k++) if (P += [ c[k] ], this.ctx.measureText(P).width > I) {
                    if (S === a && k !== c.length) {
                        P = P.substring(0, P.length - 1) + "...", this.ctx.fillText(P, x, F), this.drawTextLine(x, F, b, h, d, P), 
                        P = "";
                        break;
                    }
                    this.ctx.fillText(P, x, F), this.drawTextLine(x, F, b, h, d, P), P = "", F += f, 
                    S++;
                }
                this.ctx.fillText(P, x, F), this.drawTextLine(x, F, b, h, d, P);
            } else this.ctx.fillText(c, x, v), this.drawTextLine(x, v, b, h, d, c);
            this.ctx.restore(), L && this.drawText(t({}, e, {
                left: x + .3,
                top: v + .3,
                bolder: !1,
                textDecoration: "none"
            }));
        },
        drawTextLine: function(t, e, i, a, s, n) {
            "underline" === i ? this.drawRect({
                background: a,
                top: e + 1.2 * s,
                left: t - 1,
                width: this.ctx.measureText(n).width + 3,
                height: 1
            }) : "line-through" === i && this.drawRect({
                background: a,
                top: e + .6 * s,
                left: t - 1,
                width: this.ctx.measureText(n).width + 3,
                height: 1
            });
        },
        drawRect: function(t) {
            this.ctx.save();
            var e = t.background, i = t.top, a = void 0 === i ? 0 : i, s = t.left, n = void 0 === s ? 0 : s, r = t.width, h = void 0 === r ? 0 : r, o = t.height, c = void 0 === o ? 0 : o;
            this.ctx.setFillStyle(e), this.ctx.fillRect(n, a, h, c), this.ctx.restore();
        },
        getImageInfo: function(t) {
            var e = this;
            return new Promise(function(i, a) {
                e.cache[t] ? i(e.cache[t]) : new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/).test(t) ? wx.getImageInfo({
                    src: t,
                    complete: function(s) {
                        "getImageInfo:ok" === s.errMsg ? (e.cache[t] = s.path, i(s.path)) : (e.triggerEvent("getImage", {
                            errMsg: "canvasdrawer:download fail"
                        }), a(new Error("getImageInfo fail")));
                    }
                }) : (e.cache[t] = t, i(t));
            });
        },
        saveImageToLocal: function() {
            var t = this, e = this.data, i = e.width, a = e.height;
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: i,
                height: a,
                canvasId: "canvasdrawer",
                complete: function(e) {
                    "canvasToTempFilePath:ok" === e.errMsg ? (t.setData({
                        showCanvas: !1,
                        isPainting: !1,
                        imageList: [],
                        tempFileList: []
                    }), t.triggerEvent("getImage", {
                        tempFilePath: e.tempFilePath,
                        errMsg: "canvasdrawer:ok"
                    })) : t.triggerEvent("getImage", {
                        errMsg: "canvasdrawer:fail"
                    });
                }
            }, this);
        }
    }
});