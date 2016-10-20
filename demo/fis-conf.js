// 保持发布使用相对路径
// fis.hook('relative'); 

//域
// 测试环境
fis.set('domain_test', ''); //开发环境静态资源
// 预发布环境
fis.set('domain_pre', 'http://preuc.fdc.com.cn'); 
// 线上环境
fis.set('domain_build', 'http://img3.fdc.com.cn'); 

// 定义不同域的url
var domain_url = {
  test:{
    "csdn_url":"http://blog.test.csdn.net",
    "github_url":"https://github.test.com",
    "fdc_img3_url":"http://img3.test.fdc.com.cn"
  },
  pre:{
    "csdn_url":"http://preblog.csdn.net",
    "github_url":"https://pregithub.com",
    "fdc_img3_url":"http://preimg3.fdc.com.cn"
  },
  build:{
    "csdn_url":"http://blog.csdn.net",
    "github_url":"https://github.com",
    "fdc_img3_url":"http://img3.fdc.com.cn"
  }
}



// 过滤指定的文件类型
fis.set('project.files', [
  '*.css',
  '*.js',
  'images/**',
  '*.html'
]);

fis.match("*", {
        // domain: "${domain_pre}",
        relative: true
    })
    .match('::package', {
      spriter: fis.plugin('csssprites', {
        htmlUseSprite: true, //开启模板内联css处理,默认关闭
        styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig,
        margin: 5 //图之间的边距
      })
    })
    // js进行压缩，并使用hash值
    .match(/\/js\/(\w+).js/, {
        useHash: true,
        id:"$1",
        optimizer: fis.plugin('uglify-js', {
            mangle: {
              except: 'exports, module, require, define' //不需要混淆的关键字
            },
            compress: {
              drop_console: true //自动删除console
            }
        })
    })
    // 将less文件编译成css
    .match('/{css,less}/*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    .match('/less/(*.{css,less})', {
        release: '/css/$1$2'
    })
    // 对css进行压缩，使用hash值，并合成雪碧图
    .match('/{css,less}/*.{less,css}', {
        useHash: true,
        useSprite: true,
        optimizer: fis.plugin('clean-css')
    })
    // 给图片添加hash值
    .match("::image", {
        useHash: true
    })
    // 压缩图片
    .match('images/*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant' 
        })
    })
    // 将合成的雪碧图直接放在images/sprite文件中
    .match('/css/(*.{png,gif})', {
      //发布到/images/sprite/xxx目录下
      release: '/images/sprite/$1$2'
    });

// 测试开发
fis.media('test')
    .match("*", {
        domain: "${domain_test}",
    })
    .match('*.html', {
      parser: fis.plugin('html-replaceurl', {
        newWords:domain_url.test
      })
    });

// 预发布
fis.media('pre')
    .match("*", {
      domain: "${domain_pre}",
      // deploy: [
      //   fis.plugin('skip-packed', {
      //     // 配置项
      //     skipPackedToCssSprite:true
      //   }),
      //   fis.plugin('http-push', {
      //     // receiver: 'http://192.168.1.9:8999/receiver',
      //     // //远端目录
      //     // to: '/root/fis_test/test/'
      //   })
      // ]
    })
    .match('*.html', {
      parser: fis.plugin('html-replaceurl', {
        newWords:domain_url.pre,
        removeComments:true, //是否删除注释
        ignoreWords:['ko'], //删除注释时，需要过滤的字眼，主要排除模板引擎自带的注释
        minifier:true //是否压缩
      })
    });

// 线上
fis.media('build')
    .match('*', {
      domain: "${domain_build}"
    })
    .match('*.html', {
      parser: fis.plugin('html-replaceurl', {
        newWords:domain_url.build
      })
    })
    // .match('*.html', {
    //   deploy: fis.plugin('http-push', {
    //     receiver: 'http://192.168.1.9:8999/receiver',
    //     //远端目录
    //     to: '/root/fis_test/html/'
    //   })
    // })
    // .match('/{js,css,images}/**', {
    //   deploy: [
    //     fis.plugin('skip-packed', {
    //       // 配置项
    //       skipPackedToCssSprite:true
    //     }),
    //     fis.plugin('http-push', {
    //       receiver: 'http://192.168.1.9:8999/receiver',
    //       //远端目录
    //       to: '/root/fis_test/other/'
    //     })
    //   ]
    // })

//postpackager插件接受4个参数，
//ret包含了所有项目资源以及资源表、依赖树，其中包括：
//   ret.src: 所有项目文件对象
//   ret.pkg: 所有项目打包生成的额外文件
//   reg.map: 资源表结构化数据
//其他参数暂时不用管
var createFrameworkConfig = function(ret, conf, settings, opt){
    //创建一个对象，存放处理后的配置项
    var map = {};
    //依赖树数据
    map.deps = {};
    //遍历所有项目文件
    fis.util.map(ret.src, function(subpath, file){
      // console.log(file);
      console.log("/////////////////////////////////");
      console.log(file.id);
      console.log("????????????")
      console.log(file.requires);
      console.log("/////////////////////////////////");
        //文件的依赖数据就在file对象的requires属性中，直接赋值即可
        if(file.requires && file.requires.length){
            map.deps[file.id] = file.requires;
        }
    });
    console.log("*****************************");
    console.log(map.deps);
    console.log("*****************************");
};
//在modules.postpackager阶段处理依赖树，调用插件函数
fis.config.set('modules.postpackager', [createFrameworkConfig]);
