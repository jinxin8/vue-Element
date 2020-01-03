/**
 * 解析url参数
 * @example ?id=12345&a=b
 * 匹配 [?&] ([^?&]非?& = [^?&]) 匹配id=12345,  [?&] ([^?&]非?& = [^?&])匹配a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse(){
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
        	// .substring(1)删掉第一个字符  .split('=') =分割 第一个数组的key是id，val是12345
        	// 第二个数组的key是a，val是b
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    // {id:'12345',a:'b'}
    return obj;
}
