'use strict';

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length));
  }

  let o = {
    'MM': date.getMonth() + 1,
    'dd': date.getDate(),
    'hh': date.getHours(),
    'mm': date.getMinutes(),
    'ss': date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let v = lpad(o[k] + '');
      fmt = fmt.replace(RegExp.$1, v);
    }
  }

  return fmt;
}

function lpad(val) {
  let str = '0' + val;
  return str.substr(val.length - 1);
}
