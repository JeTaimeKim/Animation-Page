window.onload = function() {
    //常用函数
    function getElem(elem) {
        return document.querySelector(elem);
    }

    function getElemAll(elem) {
        return document.querySelectorAll(elem);
    }

    function getClass(elem) {
        return elem.getAttribute('class');
    }

    function setClass(elem, cls) {
        return elem.setAttribute('class', cls);
    }

    function addClass(elem, cls) {
        var beforeCls = getClass(elem);
        if (beforeCls.indexOf(cls) === -1) {
            setClass(elem, beforeCls + ' ' + cls);
        }
    }

    function removeClass(elem, cls) {
        var beforeCls = getClass(elem);
        if (beforeCls.indexOf(cls) != -1) {
            setClass(elem, beforeCls.split(cls).join(' ').replace(/\s+/g, ' '));
        }
    }


    //导航部分
    var nav = getElemAll('.tip'),
        aside = getElem('aside'),
        asideNav = aside.getElementsByTagName('a'),
        imp = getElem('.imp');

    //清除高亮设置函数
    function removeStyle(elem, cls) {
        for (var j = 0; j < nav.length; j++) {
            removeClass(elem[j], cls);
        }
    }

    //屏幕滚动函数
    function screenChange(which) {
        document.body.scrollTop = which * 650;
    }

    //点击事件
    for (var i = 0; i < nav.length; i++) {
        nav[i].setAttribute('now', i);
        asideNav[i].setAttribute('now', i);
        //主导航
        nav[i].onclick = function() {
            var now = this.getAttribute('now');
            screenChange(now);
            imp.style.left = now * 85 + 'px';
        };
        //侧边导航
        asideNav[i].onclick = function() {
            var now = this.getAttribute('now');
            screenChange(now);
            imp.style.left = now * 85 + 'px';
        };
    }
    //滑动门
    for (var n = 0; n < nav.length; n++) {
        nav[n].onmouseover = function() {
            var now = this.getAttribute('now');
            imp.style.left = now * 85 + 'px';
            imp.style.transition = '-webkit-all 1s';
        }
    }
    for (var n = 0; n < nav.length; n++) {
        nav[n].onmouseout = function() {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t >= 0) {
                imp.style.left = 0 * 85 + 'px';
            };
            if (t >= 1 * 650) {
                imp.style.left = 1 * 85 + 'px';
            };
            if (t >= 2 * 650) {
                imp.style.left = 2 * 85 + 'px';
            };
            if (t >= 3 * 650) {
                imp.style.left = 3 * 85 + 'px';
            };
            if (t >= 4 * 650) {
                imp.style.left = 4 * 85 + 'px';
            };
            imp.style.transition = '-webkit-all 1s';
        }
    }


    //动画部分
    var h1 = getElemAll('h1'),
        article = getElemAll('article'),
        header = getElem('header'),
        cut = getElemAll('.h1')
    	person = getElem('.person'),
        rocket = getElem('.rocket'),
        elements = getElem('.elements'),
        icon = getElem('.icon'),
        pic1 = getElem('.pic-1'),
        pic2 = getElem('.pic-2'),
        pic3 = getElem('.pic-3'),
        pic4 = getElem('.pic-4'),
        head = getElem('.head'),
        transitionElem = {
            'screen1': [h1[0], article[0], header],
            'screen2': [h1[1], article[1], cut[0], person, rocket],
            'screen3': [h1[2], article[2], cut[1], elements, icon],
            'screen4': [h1[3], article[3], cut[2], pic1, pic2, pic3, pic4],
            'screen5': [h1[4], article[4], cut[3], head]
        };

    //初始化函数
    function transitionStart(elem) {
        if (elem.getAttribute('class')) {
            addClass(elem, 'start');
        } 
        else {
            setClass(elem, 'start');
        }
    }

    //动画效果函数
    function transitionDone(elem) {
        var baseCls = elem.getAttribute('class');
        elem.setAttribute('class', baseCls.replace('start', 'done'));
    }


    //初始化
    for (j in transitionElem.screen1) {
        transitionDone(transitionElem.screen1[j]);
    }
    for (j in transitionElem.screen2) {
        transitionStart(transitionElem.screen2[j]);
    }
    for (j in transitionElem.screen3) {
        transitionStart(transitionElem.screen3[j]);
    }
    for (j in transitionElem.screen4) {
        transitionStart(transitionElem.screen4[j]);
    }
    for (j in transitionElem.screen5) {
        transitionStart(transitionElem.screen5[j]);
    }


    //滚动条调用函数
    window.onscroll = function() {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t >= 0) {
                imp.style.left = 0 * 85 + 'px';
                aside.style.display = 'none';
                //导航背景颜色更改
                var headerCls = header.getAttribute('class');
                if (headerCls.indexOf('activeHeader') != -1) {
                    removeClass(header, 'activeHeader');
                }

            }
            if (t >= 1 * 650 - 150) {
                for (k in transitionElem.screen2) {
                    transitionDone(transitionElem.screen2[k]);
                    imp.style.left = 1 * 85 + 'px';
                    aside.style.display = 'block'; //侧边导航出现
                    addClass(header, 'activeHeader'); //导航背景颜色变化
                }
            }
            if (t >= 2 * 650 - 150) {
                for (k in transitionElem.screen3) {
                    transitionDone(transitionElem.screen3[k]);
                    imp.style.left = 2 * 85 + 'px';
                }
            }
            if (t >= 3 * 650 - 150) {
                for (k in transitionElem.screen4) {
                    transitionDone(transitionElem.screen4[k]);
                    imp.style.left = 3 * 85 + 'px';
                }
            }
            if (t >= 4 * 650 - 150) {
                for (k in transitionElem.screen5) {
                    transitionDone(transitionElem.screen5[k]);
                    imp.style.left = 4 * 85 + 'px';
                }
            }
        }


    //返回顶部
    var ctn = getElem('.ctn');
    ctn.onclick = function() {
        document.body.scrollTop = 0;
    };

}
