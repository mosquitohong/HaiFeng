// 登录信息公共类
var oStorage;
var bIsFinished = false;

$(function () {
    LoginInfo.GetReady();
});

//登录信息类
var LoginInfo = {
    oRet: null,
    GetReady: function () {
        oStorage = window.sessionStorage;
        if (!oStorage) {
            alert('浏览器不支持，请切换标准浏览器，如Chrome、FireFox、IE8+等');
            //这里可以做关闭处理或者跳转至相应说明页面
        } else {
            var that = this;
            var oLoginInfo = that.GetStorageByKey("LoginInfo");
            if (oLoginInfo !== null) {
                bIsFinished = true;
                if (callback)
                    callback(oLoginInfo);
            } else {
                $.post('/Ajax/Login.ashx', { action: 'GetLoginInfo' }, function (resp) {
                    if (resp.status === 'ok') {
                        bIsFinished = true;
                        that.SaveStorage("LoginInfo", JSON.stringify(resp.data));
                        if (callback)
                            callback(resp.data);
                    } else {
                        alert("登录超时，请重新登录");
                        window.location = "index.html";
                    }
                });
            }
        }
    },
    Init: function (callback) {
        var that = this;
        that.GetReady();
        if (bIsFinished) {
            var oLoginInfo = that.GetStorageByKey("LoginInfo");
            if (oLoginInfo !== null) {
                bIsFinished = true;
                if (callback)
                    callback(oLoginInfo);
            } else {
                $.post('/Ajax/Login.ashx', { action: 'GetLoginInfo' }, function (resp) {
                    if (resp.status === 'ok') {
                        bIsFinished = true;
                        that.SaveStorage("LoginInfo", JSON.stringify(resp.data));
                        if (callback)
                            callback(resp.data);
                    } else {
                        alert("登录超时，请重新登录");
                        window.location = "index.html";
                    }
                });
            }
        }
    },
    SaveStorage: function (key, value) {
        oStorage.setItem(key, value);

    },
    GetStorageByKey: function (key) {
        var that = this;
        try {
            that.oRet = oStorage.getItem(key) === "" ? null : JSON.parse(oStorage.getItem(key));
        } catch (e) {
            that.oRet = oStorage.getItem(key);
        }
        return function () {
            return that.oRet;
        }.call(that);
    },
    RemoveStorageByKey: function (key) {
        oStorage.removeItem(key);

    },
    RemoveAllStorage: function () {
        oStorage.clear();
    }
}


var Common = {
    Format: function () {
        var that = this;
        if (arguments.length === 0)
            return null;
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp("\\{" + (i - 1) + "\\}", "gm");
            str = str.replace(re, arguments[i]);
        }
        return function () {
            return that.str;
        }.call(that);
    }
}