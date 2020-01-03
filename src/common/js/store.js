// 存
export function saveToLocal(id, key, value) {
    // 把值放在__seller__下面
    let seller = window.localStorage.__seller__;
    // 如果seller没有值也就是第一次存储，seller设置成一个空对象。seller[id]也设置成一个空对象
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        // 如果不是第一次存储，也就是seller有值
        // JSON.parse 用于将一个JSON字符串转换为对象
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    // JSON.stringify方法用于将JavaScript值转换为JSON字符串，保存在__seller__下
    window.localStorage.__seller__ = JSON.stringify(seller);
};

// 读取
export function loadFromLocal(id, key, def) {
    let seller = window.localStorage.__seller__;
    if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return def;
    }
    let ret = seller[key];
    return ret || def;
};
