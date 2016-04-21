 var userAgent = navigator.userAgent,
        rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
        rFirefox = /(firefox)\/([\w.]+)/,
        rOpera = /(opera).+version\/([\w.]+)/,
        rChrome = /(chrome)\/([\w.]+)/,
        rSafari = /version\/([\w.]+).*(safari)/;
        var browser;
        var version;
        var ua = userAgent.toLowerCase();
        function uaMatch(ua) {
            var match = rMsie.exec(ua);
            if (match != null) {
                return { browser: "IE", version: match[2] || "0" };
            }
            var match = rFirefox.exec(ua);
            if (match != null) {
                return { browser: match[1] || "", version: match[2] || "0" };
            }
            var match = rOpera.exec(ua);
            if (match != null) {
                return { browser: match[1] || "", version: match[2] || "0" };
            }
            var match = rChrome.exec(ua);
            if (match != null) {
                return { browser: match[1] || "", version: match[2] || "0" };
            }
            var match = rSafari.exec(ua);
            if (match != null) {
                return { browser: match[2] || "", version: match[1] || "0" };
            }
            if (match != null) {
                return { browser: "", version: "0" };
            }
        }
        var browserMatch = uaMatch(userAgent.toLowerCase());
        if (browserMatch.browser) {
            browser = browserMatch.browser;
            version = browserMatch.version;
        }
        // document.write(browser + version);
        function browserTest(){
            var str=version.split('.',1);
            if (str<=9) {
            alert(browser+":"+str);
                alert('当前使用的浏览器版本过低，请升级浏览器或更换浏览器！若为360等浏览器，请切换急速模式！');
            }
            if (browser=='chrome' && str<=52) {
                alert('当前使用的浏览器版本过低，请升级浏览器或更换浏览器！');
            }
        }