import date from "./dateTool"
import array from "./arrayTool"
import city from "./city"
// import user from './userTool'
import pageclick from './PageClickSkip'

export const timestampToTime = function(timestamp) {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = '';
  if (date.getDate() < 10){D = '0' + date.getDate() + ' ';} else { D = date.getDate() + ' '; }
  let h = '';
  if (date.getHours() < 10){h = '0' + date.getHours() + ':';} else { h = date.getHours() + ':'; }
  let m = '';
  if (date.getMinutes() < 10){m = '0' + date.getMinutes() + ':';} else { m = date.getMinutes() + ':'; }
  let s = '';
  if (date.getSeconds() < 10){s = '0' + date.getSeconds() ;} else { s = date.getSeconds(); }
  return Y + M + D + h + m + s;
};
export const timestampToDate = function(timestamp) {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = '';
  if (date.getDate() < 10){D = '0' + date.getDate() + ' ';} else { D = date.getDate() + ' '; }
  return Y + M + D;
};

export default {date, array, pageclick, city};
// export default {date, array, user, pageclick};
