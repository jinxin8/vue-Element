// 导出模块
export function formatDate(date, fmt) {
    // y+ 正则表达式 y+表示y开头一个或多个这样的字符串,用正则表达式匹配fmt
    if (/(y+)/.test(fmt)) {
        // RegExp.$1就是匹配(y+)的值4个y，(date.getFullYear()+'')获取年转换成字符串， .substr的作用的是如果RegExp.$1取到的值不是4个y，是三个y或者2个y的时候就在取得的年字符串上从第4-RegExp.$1.length个字符开始取值， 如RegExp.$1=2 (date.getFullYear()+'')=2016 .substr(4-RegExp.$1.length)=16，  hello world  .substr(3)  输出lo world
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    // 如果输入的字符串是09  00+09 从第二个开始截取  如果输入009 00+009 从第三个开始截取
    return ('00' + str).substr(str.length);
}
