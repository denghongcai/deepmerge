(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.deepmerge = factory();
    }
}(this, function () {

return function deepmerge(target, src) {
    var array = Array.isArray(src);
    var dst, len, srcKeys, key, i = 0;

    if (array) {
        target = target || [];
        dst = target;
        len = src.length;
        for (i = 0; i < len; i++) {
            if (typeof dst[i] === 'undefined') {
                dst[i] = src[i];
            } else if (typeof src[i] === 'object') {
                dst[i] = deepmerge(target[i], src[i]);
            } else {
                if (target.indexOf(src[i]) === -1) {
                    dst.push(src[i]);
                }
            }
        }
    } else {
    	dst = target;
    	srcKeys = Object.keys(src);
    	len = srcKeys.length;
    	for (i = 0; i < len; i++) {
    		key = srcKeys[i];
            if (typeof src[key] !== 'object' || !src[key]) {
                dst[key] = src[key];
            } else {
                if (!target[key]) {
                    dst[key] = src[key];
                } else if (typeof src[key] !== typeof target[key]) {
                	dst[key] = src[key];
                } else {
                    dst[key] = deepmerge(target[key], src[key]);
                }
            }
    	}
    }

    return dst;
}

}));
