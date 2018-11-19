import router from '../router/BootRouter';
import { Dialog } from 'vant';

let commonFunction = {
    setPageTitle (str) {
        let domain = window.QxApi || window;
        document.title = str;
        domain.setPageTitle && domain.setPageTitle(str);
    },
    isShowAppClose () {
        // Android 中在返回按钮上显示关闭按钮
        let domain = window.QxApi || window;
        domain.QxAppShowClose && domain.QxAppShowClose(true);
    },
    isRefreshAppPage () {
        // ios中，获取相册图片返回页面之后 调用isCommunityRefresh不让刷新页面
        let domain = window.QxApi || window;
        domain.isCommunityRefresh && domain.isCommunityRefresh('noRefresh');
    },
    isRefreshAppToken () {
        let domain = window.QxApi || window;
        domain.getQxToken && domain.getQxToken();
    },
    isRefreshAppInfo () {
        let domain = window.QxApi || window;
        domain.getQxAppInfo && domain.getQxAppInfo();
    },
    toAppPage (str) {
        let domain = window.QxApi || window;
        domain.jumpToAppPage && domain.jumpToAppPage(str);
    },
    getLocalToken () {
        if (this.isApp()) {
            this.isRefreshAppToken();
        }
        return localStorage.getItem('token');
    },
    // 判断是否登录
    hasLogin () {
        // true 已经登录
        // false 未登录
        return !!this.getLocalToken();
    },
    appIsOld () {
        // 判断app版本是否小于2.4.6， 需要更新app版本，有token才能打开社区
        if (!commonFunction.isApp()) return false;
        let appVersion = commonFunction.appObj();
        let versionArr = appVersion.AppVersion.split('.');
        if (versionArr[0] < 2) {
            return true;
        }
        if (versionArr[0] == 2 && versionArr[1] < 4) {
            return true;
        }
        if (versionArr[0] == 2 && versionArr[1] == 4 && versionArr[2] <= 5) {
            return true;
        }
        return false;
    },
    showOldAppTip () {
        Dialog.alert({
            message: '当前APP版本过低，无法访问社区，请至应用市场下载更新钱香金融APP~'
        }).then(() => {
            // on close
            this.toAppPage('find');
        });
    },
    toLogin (topath) {
        if (this.isApp()) {
            this.toAppPage('login');
        } else {
            // let baseUrl = process.env.VUE_APP_REQ_BASE_URL;
            let http = window.location.protocol + '//';
            let host = window.location.host;
            let baseUrl = http + host;
            let loginUrl = baseUrl + '/home/main?url=' + router.history.base + router.history.current.path;
            if (topath) {
                loginUrl = baseUrl + '/home/main?url=' + router.history.base + topath;
            }
            window.location.href = loginUrl;
        }
    },
    appObj () {
        let appData = localStorage.getItem('appInfo');
        let my = {};
        if (this.isJSON(appData)) {
            let getApp = JSON.parse(appData);
            my = {
                OSName: getApp.OSName,
                OSVersion: getApp.OSVersion,
                AppVersion: getApp.AppVersion,
                DeviceType: getApp.DeviceType
            };
        }
        return my;
    },
    isWeChat () {
        var ua = window.navigator.userAgent.toLowerCase();
        // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    isQQ () {
        var ua = window.navigator.userAgent.toLowerCase();
        // console.log(ua)
        // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    isApp () {
        let my = this.appObj();
        if (my.OSName) {
            // console.log('is app: ' + my.OSName + my.AppVersion);
            return true;
        } else {
            return false;
        }
    },
    // 返回字数
    checkLength (str) {
        let realLength = 0;
        if (str) {
            let len = this.trim(str).length;
            realLength = len;
        }
        return realLength;
    },
    // 清除空格
    trim (str, gl) {
        // 参数gl='g'时，把字符串所有空格去除
        let result = '';
        if (str) {
            result = str.replace(/(^\s+)|(\s+$)/g, '');
        }
        if (gl) {
            if (gl.toLowerCase() === 'g') {
                result = result.replace(/\s/g, '');
            }
        }
        return result;
    },
    isJSON (str) {
        if (typeof str == 'string') {
            try {
                let obj = JSON.parse(str);
                if (typeof obj == 'object' && obj) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }
    },
    goBack () {
        window.history.length > 1 ? router.back() : router.push('/');
    },
    compressImgTwo (img) {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        // 图片原始尺寸
        let originWidth = img.width;
        let originHeight = img.height;
        // 最大尺寸限制
        let maxWidth = 800, maxHeight = 800;
        // 目标尺寸
        let targetWidth = originWidth, targetHeight = originHeight;
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        let ndata = canvas.toDataURL('image/jpeg', 0.2);
        return ndata;
    },
    compressImg: (img) => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let tCanvas = document.createElement('canvas');
        let tctx = tCanvas.getContext('2d');
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        let ratio;
        if ((ratio = width * height / 200000) > 1) {
            // console.log('大于400万像素')
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        } else {
            ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        // 铺底色
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        let count;
        if ((count = width * height / 10000) > 1) {
            // console.log('超过100W像素');
            count = ~~(Math.sqrt(count) + 1);
            // 计算每块瓦片的宽和高
            let nw = ~~(width / count);
            let nh = ~~(height / count);
            tCanvas.width = nw;
            tCanvas.height = nh;
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            ctx.drawImage(img, 0, 0, width, height);
        }
        let ndata = canvas.toDataURL('image/jpeg', 0.2);
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
    },
    autoTextarea (elem, extra, maxHeight) {
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
            isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
            addEvent = function (type, callback) {
                elem.addEventListener ?
                    elem.addEventListener(type, callback, false) :
                    elem.attachEvent('on' + type, callback);
            },
            getStyle = elem.currentStyle ? function (name) {
                var val = elem.currentStyle[name];

                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                }
                ;

                return val;
            } : function (name) {
                return getComputedStyle(elem, null)[name];
            },
            minHeight = parseFloat(getStyle('height'));

        elem.style.resize = 'none';

        var change = function () {
            var scrollTop, height,
                padding = 0,
                style = elem.style;

            if (elem._length === elem.value.length) return;
            elem._length = elem.value.length;

            if (!isFirefox && !isOpera) {
                padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
            }
            ;
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            elem.style.height = minHeight + 'px';
            if (elem.scrollHeight > minHeight) {
                if (maxHeight && elem.scrollHeight > maxHeight) {
                    height = maxHeight - padding;
                    style.overflowY = 'auto';
                } else {
                    height = elem.scrollHeight - padding;
                    style.overflowY = 'hidden';
                }
                ;
                style.height = height + extra + 'px';
                scrollTop += parseInt(style.height) - elem.currHeight;
                document.body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;
                elem.currHeight = parseInt(style.height);
            }
            ;
        };

        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
    },
    // 过滤后端传来的带标签的富文本
    delHtmlDiv (value) {
        value = value.replace(/(\n)/g, "");
        value = value.replace(/(\t)/g, "");
        value = value.replace(/(\r)/g, "");
        value = value.replace(/<\/?[^>]*>/g, "");
        value = value.replace(/\s*/g, "");
        return value;
    },
    isScrollUp (className) {
        let element = document.querySelectorAll(className);
        // console.log(element)
        // 滑动处理
        var startX, startY;
        document.addEventListener('touchstart', function (ev) {
            startX = ev.touches[0].pageX;
            startY = ev.touches[0].pageY;
        }, false);

        document.addEventListener('touchend', function (ev) {
            var endX, endY;
            endX = ev.changedTouches[0].pageX;
            endY = ev.changedTouches[0].pageY;
            var direction = this.GetSlideDirection(startX, startY, endX, endY);
            switch (direction) {
                case 0:
                    // alert("无操作");
                    // element.style.display = 'block';
                    break;
                case 1:
                    // 向上
                    // alert("up");
                    element.forEach(function (e) {
                        // console.log(e)
                        e.style.display = 'none';
                    });
                    break;
                case 2:
                    // 向下
                    // alert("down");
                    // element.style.display = 'block';
                    element.forEach(function (e) {
                        // console.log(e)
                        e.style.display = 'block';
                    });
                    break;

                default:
            }
        }, false);
    },
    GetSlideDirection (startX, startY, endX, endY) {
        var dy = startY - endY;
        // var dx = endX - startX;
        var result = 0;
        if (dy > 0) {
            // 向上滑动
            result = 1;
        } else if (dy < 0) {
            // 向下滑动
            result = 2;
        } else {
            result = 0;
        }
        return result;
    },
    addHandler: function (element, type, handler) {
        if (element.addEventListener)
            element.addEventListener(type, handler, false);
        else if (element.attachEvent)
            element.attachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener)
            element.removeEventListener(type, handler, false);
        else if (element.detachEvent)
            element.detachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },
    /**
     * 监听触摸的方向
     * @param target            要绑定监听的目标元素
     * @param isPreventDefault  是否屏蔽掉触摸滑动的默认行为（例如页面的上下滚动，缩放等）
     * @param upCallback        向上滑动的监听回调（若不关心，可以不传，或传false）
     * @param rightCallback     向右滑动的监听回调（若不关心，可以不传，或传false）
     * @param downCallback      向下滑动的监听回调（若不关心，可以不传，或传false）
     * @param leftCallback      向左滑动的监听回调（若不关心，可以不传，或传false）
     */
    listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);
        var startX;
        var startY;

        function handleTouchEvent (event) {
            switch (event.type) {
                case "touchstart":
                    startX = event.touches[0].pageX;
                    startY = event.touches[0].pageY;
                    break;
                case "touchend":
                    var spanX = event.changedTouches[0].pageX - startX;
                    var spanY = event.changedTouches[0].pageY - startY;

                    if (Math.abs(spanX) > Math.abs(spanY)) {
                        // 认定为水平方向滑动
                        if (spanX > 30) {
                            // 向右
                            if (rightCallback)
                                rightCallback();
                        } else if (spanX < -30) {
                            // 向左
                            if (leftCallback)
                                leftCallback();
                        }
                    } else {
                        // 认定为垂直方向滑动
                        if (spanY > 30) {
                            // 向下
                            if (downCallback)
                                downCallback();
                        } else if (spanY < -30) {
                            // 向上
                            if (upCallback)
                                upCallback();
                        }
                    }

                    break;
                case "touchmove":
                    // 阻止默认行为
                    if (isPreventDefault)
                        event.preventDefault();
                    break;
            }
        }
    }
};
export { commonFunction };
