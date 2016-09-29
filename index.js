module.exports = function (content, file, opt) {
  // 只对 html 类文件进行处理
  if (!file.isHtmlLike){
    return content;
  }
 
  // var name = opt.repWords,
  //    newWords = opt.newWords;
  // name.forEach(function(key){
  //   var Reg = new RegExp(key,'g');
  //   if(newWords[key]){
  //     content = content.replace(Reg,newWords[key]);
  //   }else{
  //     console.log(key+"~~~~~~~~~所对应的url不存在")
  //   }
  // })
  // 
  var newWords = opt.newWords;
  for(var ele in newWords){
    var Reg = new RegExp(ele,'g');
    content = content.replace(Reg,newWords[ele]);
  }
  return content;
};