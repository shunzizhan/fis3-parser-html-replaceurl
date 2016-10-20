
module.exports = function (content, file, opt) {
  // 只对 html 类文件进行处理
  // if (!file.isHtmlLike){
  //   return content;
  // }
  var newWords = opt.newWords,
      ignoreCommentWords = opt.ignoreWords || [],
      ignoreWordsReg = new RegExp(ignoreCommentWords.join('|'),'g');
  for(var ele in newWords){
    var Reg = new RegExp(ele,'g');
    content = content.replace(Reg,newWords[ele]);
  }
  
  if(file.isHtmlLike){
    // 删除注释
    if(opt.removeComments){
      content = content.replace(/(<!--)(.{0,})(-->)/g,function(match,g1,g2,g3,index,origin){
        if(g2.search(ignoreWordsReg)>-1){
          return g1+g2+g3;
        }else{
          return "";
        }
      });
    }
    // 压缩文件
    if(opt.minifier){
      content = content.replace(/>\s+</gm,"><");
    }
  }
  
  return content;
};