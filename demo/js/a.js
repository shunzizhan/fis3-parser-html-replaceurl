var jquery = require('b.js')
var str = window.location.href.split("#")[0];

str = "http://oldhouse.wh.fdc.com.cn/house";
// str = "http://oldhouse.wh.fdc.com.cn/metro";
// str = "http://oldhouse.wh.fdc.com.cn/qiugou";
// str = "http://oldhouse.wh.fdc.com.cn/subway";
// str = "http://oldhouse.wh.fdc.com.cn/chushou/detail/57eccce8d8dbb3049f024686.htm";
// str = "http://uc.fdc.com.cn/esf/myrelsnew.html";

var newLink = str.replace(/(https?:\/\/)([A-z]+)\.([A-z]+)\.([A-z\.]+)\/(.+){0,}/,function(match,g1,g2,g3,g4,g5,index,origin){
  var port = "",last="",head="";
  //判断环境，测试or预发布
  // if(window.location.hostname.indexOf("test") > -1){
  //   head = "oldhouse.m";
  // }else{
  //   head = "prehouse.m";
  // }
  if(g3=='wh'){
    port="wuhan"
  }
  console.log(g5);
  if(!g5){
    return g1+g2+".m.pre."+g4+'/';
  }else{
    if(g5.indexOf("chushou/") > -1){
      last = port+'/'+g5;
      return g1+g2+".m.pre."+g4+'/'+port+'/'+g5;
    }else if(g5.indexOf("house") > -1 || g5.indexOf("metro") > -1 || g5.indexOf("qiugou") > -1){
      return g1+g2+".m.pre."+g4+'/';
    }else{
      return str;
    }
    
  }
})
console.log(newLink);