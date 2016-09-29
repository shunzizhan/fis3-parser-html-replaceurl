# fis3-parser-html-uri

*html*文件替换静态url

## 安装

```bash
$ npm install fis3-parser-html-replaceurl
```



## 自定义函数名

```js
fis.media('test')
    .match("*", {
        domain: "${domain_test}",
    })
    .match('*.html', {
      parser: fis.plugin('html-replaceurl', {
        repWords : ["fdc_uc_url","fdc_home_url"],
        newWords:{
          fdc_uc_url:"http://uc.fdc.com.cn",
          fdc_home_url:"http://www.fdc.com.cn"
        }
      })
    });

```

```html

```