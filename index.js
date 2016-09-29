
module.exports = function (content, file, opt) {
  // 只对 html 类文件进行处理
  if (!file.isHtmlLike){
    return content;
  }
  var name = opt.repWords,
      newWords = opt.newWords;
  for(var ele in name){
    var Reg = new RegExp(ele,'g');
    content = content.replace(Reg,newWords[ele]);
  }
  return content;
};