//该类封装公共数组处理工具，调用方式：vm.tool.array.format(new Date(), "yyyy-MM-dd")

class ArrayTool {

  /**
   日期格式化
   @param {Date} date 需要改变的日期对象;
          {String} fmt 时间格式，如：yyyy-MM-dd hh:mm:ss
   @return {String} 
  */
  format(date, fmt){
    var o = {
      "M+" : date.getMonth()+1,                 //月份
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours(),                   //小时
      "m+" : date.getMinutes(),                 //分
      "s+" : date.getSeconds(),                 //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  }

  /**
   改变日期对象的月份
   @param {Date} date 需要改变的日期对象;
          {Number} [number=0] 需要改变的月份值，如果为负数，则减少对应月份
   @return {Date} 修改后的时间对象
  
  */
  addMonth(date, number = 0){
    let year = date.getFullYear();
    let month = date.getMonth(); 
    year = year + Math.floor((month + number) / 11); //月份从0开始
    month = (month + number) % 12;  //取余数
    date.setFullYear(year);
    date.setMonth(month);
    return date;
  }
}

export default new ArrayTool();