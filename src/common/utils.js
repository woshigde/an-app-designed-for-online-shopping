export function debounce(func,delay){
    let timer =null
    return function(...args){
        if (timer) clearTimeout(timer)
        timer = setTimeout(() =>{
            func.apply(this,args)
        },delay)
    }
}

 // 时间对象的格式化; 
//  正则表达式是干什么的？ ---字符匹配
export function formatDate(date,format) {
    /* 
     * eg:format="yyyy-MM-dd hh:mm:ss"; 
     */
    var o = {
        "M+": date.getMonth() + 1, // month  
        "d+": date.getDate(), // day  
        "h+": date.getHours(), // hour  
        "m+": date.getMinutes(), // minute  
        "s+": date.getSeconds(), // second  
        // "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        // "S": this.getMilliseconds()
        // millisecond  
    }
    //1.获取年份
    //y+ -> 一个或者多个y
    //y* -> 0个或者多个y
    //y? ->0个或者1个y

    //2019
    //yy - 19
    //yyyy - 2019
    //y - 9
    //yyy -019 
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            //format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            format =format.replace(RegExp.$1,(RegExp.$1.length===1) ? str :padLeftZero(str))
        }
    }
    return format; 
}

function padLeftZero(str){
    return('00'+4).substr(str.length)
}