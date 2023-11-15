/*

作者：@Sliverkiss
更新日期：2023.10.21 16:37:17

一个很简单的饿了么自动获取ck工具，用于解决elmck有效期过短，需要频繁抓取的问题
脚本兼容：Surge、QuantumultX、Loon、Shadowrocket

使用方法：
1.将获取ck脚本添加到本地
2.打开饿了么app->点击我的->点击吃货豆，进入吃货豆页面
3.若提示获取ck成功，自行复制通知ck粘贴到青龙
3.关闭获取ck脚本，防止产生不必要的mitm

[Script]
http-request ^https:\/\/h5\.ele\.me\/.+ script-path=elmck.js, timeout=10, tag=饿了么自动获取ck

[MITM]
hostname =h5.ele.me
*/
const cookieName = '饿了么自动获取ck'
const sliverkiss = init();

//获取Cookie

if (ckItems && ckItems.length >= 4) {
    console.log(ckItems[0]);
    console.log(ckItems[1]);
    console.log(ckItems[2]);
    console.log(ckItems[3]);

    const tokenValue = `${ckItems[2]}${ckItems[3]}${ckItems[0]}${ckItems[1]}`;
    console.log(tokenValue);

    sliverkiss.msg(cookieName, "", `获取签到Cookie成功🎉\n${tokenValue}`);
} else {
    sliverkiss.msg(cookieName, "", "❌获取签到Cookie失败");
}

}

function init() {
    isSurge = () => {
        return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
        return undefined === this.$task ? false : true
    }
    getdata = (key) => {
        if (isSurge()) return $persistentStore.read(key)
        if (isQuanX()) return $prefs.valueForKey(key)
    }
    setdata = (key, val) => {
        if (isSurge()) return $persistentStore.write(key, val)
        if (isQuanX()) return $prefs.setValueForKey(key, val)
    }
    msg = (title, subtitle, body) => {
        if (isSurge()) $notification.post(title, subtitle, body)
        if (isQuanX()) $notify(title, subtitle, body)
    }
    log = (message) => console.log(message)
    get = (url, cb) => {
        if (isSurge()) {
            $httpClient.get(url, cb)
        }
        if (isQuanX()) {
            url.method = 'GET'
            $task.fetch(url).then((resp) => cb(null, {}, resp.body))
        }
    }
    post = (url, cb) => {
        if (isSurge()) {
            $httpClient.post(url, cb)
        }
        if (isQuanX()) {
            url.method = 'POST'
            $task.fetch(url).then((resp) => cb(null, {}, resp.body))
        }
    }
    done = (value = {}) => {
        $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
sliverkiss.done()
