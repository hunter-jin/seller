'use strict';

/**
 * 解析url参数
 * @example ?id=12356&a=b
 */
export function urlParse() {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;

  let arr = url.match(reg) || [];
  arr.forEach(item => {
    let s = decodeURIComponent(item.substr(1));
    let pairs = s.split('=');
    obj[pairs[0]] = pairs[1];
  });

  return obj;
}
