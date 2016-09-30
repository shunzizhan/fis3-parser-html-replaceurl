# fis3-parser-html-replaceurl

*html*文件替换静态url

## 安装

```bash
npm install -g fis3-parser-html-replaceurl
```



## 自定义函数名

```js
fis.media('test')
    .match("*", {
        domain: "${domain_test}",
    })
    .match('*.html', {
      parser: fis.plugin('html-replaceurl', {
        newWords:{
          csdn_url:"http://blog.csdn.net",
          github_url:"https://github.com",
          fdc_img3_url:"http://img3.fdc.com.cn"
        }
      })
    });

```
**newWords** key为需要替换的字眼，value为替换后的string
```html
<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
  <meta charset="UTF-8">
  <title>个人中心</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width">
  <meta name="renderer" content="webkit|ie-comp|ie-stand">
  <link rel="shortcut icon" href="/images/favicon.ico">
  <link rel="stylesheet" href="less/a.less">
  <link rel="stylesheet" href="fdc_img3_url/usercenter/css/common.css">
  <link rel="stylesheet" href="fdc_img3_url/usercenter/css/home.css">
</head>
  <body>
    <a class="main" href="github_url/shunzizhan">我的git主页</a>
    <a href="csdn_url/u011613356/article/details/51914528">knockout技术分享</a>
  <!-- 版权:END -->

  <!-- 版权:END -->
  <script src="js/a.js"></script>
  <script src="fdc_img3_url/usercenter/js/home.js"></script>
  </body>
</html>
```
``` html
<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
  <meta charset="UTF-8">
  <title>亿房网-个人中心</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width">
  <meta name="renderer" content="webkit|ie-comp|ie-stand">
  <link rel="shortcut icon" href="/images/favicon.ico">
  <link rel="stylesheet" href="/css/a_0d7e657.css">
  <link rel="stylesheet" href="http://img3.fdc.com.cn/usercenter/css/common.css">
  <link rel="stylesheet" href="http://img3.fdc.com.cn/usercenter/css/home.css">
</head>
  <body>
    <a class="main" href="https://github.com/shunzizhan">我的git主页</a>
    <a href="http://blog.csdn.net/u011613356/article/details/51914528">knockout技术分享</a>
  <!-- 版权:END -->

  <!-- 版权:END -->
  <script src="/js/a_7e347e2.js"></script>
  <script src="http://img3.fdc.com.cn/usercenter/js/home.js"></script>
  <script type="text/javascript" charset="utf-8" src="http://192.168.20.36:8132/livereload.js"></script></body>
</html>

```