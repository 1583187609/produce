(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{267:function(e,t,r){r(92);const n=r(268),i=r(269),{indexName:l}=r(270),o=new(r(304))({headingStyle:"atx",bulletListMarker:"-"});function s(e){return!!i.existsSync(e)||(s(n.dirname(e))?(i.mkdirSync(e),!0):void 0)}o.keep(["h1","h2","h3","h4","h5","h6","a","img","code","pre"]),e.exports={typeOf:function(e){return Object.prototype.toString.call(e).split(" ")[1].slice(0,-1)},turndownService:o,mkdirsSync:s,getSubPaths:async function e(t="",r=[]){return function(e=[],t=" "){return e.sort((function(e,r){const n="string"==typeof r,i="string"==typeof e?e:Array.isArray(e)?e[1]:e.title,l=n?r:Array.isArray(r)?r[1]:r.title;return(Number(i.split(t)[0])||0)-(Number(l.split(t)[0])||0)})),e}(await Promise.all(i.readdirSync(t).map(async(o,s)=>{const c=n.join(t,o),a=i.lstatSync(c).isDirectory(),h=JSON.parse(JSON.stringify(r));if(h.push(o),a){return{title:o,collapsable:!1,children:await e(c,h)}}return o===l?"":[h.join("/"),h.slice(-1)[0].replace("_"," ").slice(0,-3)]}))," ")},upperFirst:(e="")=>e?e.slice(0,1).toUpperCase()+e.slice(1):e,camelCase:(e="")=>e?e.replace(/(?:^\w|[A-Z]|\b\w)/g,(e,t)=>0===t?e.toLowerCase():e.toUpperCase()).replace(/\s+|\/|-|}/g,"").replace(/{/g,"By"):e,writeFileSync(e,t,r=!0,l="utf-8"){const o=n.basename(e);if(s(e.replace(o,""))){const n=i.writeFileSync(e,t,l);return n?console.log(e+"写入失败",n):r&&console.log(e+"写入成功！"),n}return console.log("创建文件目录失败"),{err:"创建文件目录失败"}},addToFileLineSync(e="",t="",r=[],n=!1){const l=(n?i.readFileSync(e,"utf8"):e).split(/\r\n|\n|\r/gm);let o=l.findIndex(e=>e.replace(/ +/g,"").includes(t))+1;return-1===o&&(o=l.length-1),l.splice(o,0,...r),l.join("\r\n")}}},270:function(e,t){e.exports={indexName:"README.md",excludes:["demo"],crawlerMap:{git:{title:"Git教程",basePath:"https://git-scm.com",navs:{url:"/book/zh/v2",selectors:[".book-toc h2","+ol"]},handleTpl:{selector:"#main",handleOriginHtmlFile:(e,t)=>("6.3"===t&&(e=e.replace(/&amp;gt/g,"&gt;")),e),handleMainHtmlFile:(e,t)=>e=e.replace(/<h5/g,"<h6").replace(/\/h5>/g,"/h6>").replace(/<h4/g,"<h5").replace(/\/h4>/g,"/h5>").replace(/<h3/g,"<h4").replace(/\/h3>/g,"/h4>").replace(/<h2/g,"<h3").replace(/\/h2>/g,"/h3>").replace(/<h1/g,"<h2").replace(/\/h1>/g,"/h2>")}},markdown:{title:"Markdown教程",basePath:"http://markdown.p2hp.com",navs:[{id:"1",title:"入门",href:"/getting-started/"},{id:"2",title:"基本语法",href:"/basic-syntax/"},{id:"3",title:"扩展语法",href:"/extended-syntax/"},{id:"4",title:"备忘表",href:"/cheat-sheet/"}],handleTpl:{selector:".container .row"}},regexp:{title:"regexp教程",basePath:"https://www.runoob.com",navs:[{id:"1",title:"表达式全集",href:"https://tool.oschina.net/uploads/apidocs/jquery/regexp.html"}],handleTpl:{selector:"body"}},jquery:{title:"Jquery教程",basePath:"https://www.runoob.com",home:{children:[{id:"0.1",title:"简介",href:"/jquery/jquery-intro.html"},{id:"0.2",title:"安装",href:"/jquery/jquery-install.html"},{id:"0.3",title:"语法",href:"/jquery/jquery-syntax.html"},{id:"0.4",title:"选择器",href:"/jquery/jquery-selectors.html"},{id:"0.5",title:"事件",href:"/jquery/jquery-events.html"}]},navs:{url:"/jquery/jquery-tutorial.html",selectors:["#leftcolumn h2","-h2"]},handleTpl:"runoob"},ts:{title:"TypeScript基础",basePath:"https://juejin.cn/post",navs:[{id:"1",title:"第一部分",href:"/7102384712504573982"},{id:"2",title:"第二部分",href:"/7102996554541170696"}],handleTpl:"juejin"},note:{title:"杂记",basePath:"https://juejin.cn/post",navs:[{id:"1",title:"vue2源码解读",href:"/6949370458793836580",children:[{id:"1.1",title:"前言",href:"/6949370458793836580"},{id:"1.2",title:"前言",href:"/6950084496515399717"},{id:"1.3",title:"前言",href:"/6950826293923414047"}]},{id:"2",title:"vue3源码解读",href:"/6949370458793836580",children:[{id:"2.1",title:"createApp",href:"/6881910894473773069"},{id:"2.2",title:"mount",href:"/6883072260123394061"},{id:"2.3",title:"patch",href:"/6883398472368652296"},{id:"2.4",title:"compositionApi",href:"/6893045604592418830"}]},{id:"3",title:"设计模式",href:"/7072175210874535967"},{id:"4",title:"ES6特性概括",href:"/6844903959283367950"},{id:"5",title:"正则表达式",href:"/7101213997487095844"}],handleTpl:"juejin"},interview:{title:"面试题",basePath:"https://juejin.cn/post",navs:[{id:"1",title:"Html",href:"/7095899257072254989"},{id:"2",title:"CSS",href:"/7098689890933538853"},{id:"3",title:"JavaScript",href:"/7197070078360322109",children:[{id:"3.1",title:"第一部分",href:"/7153593226526457887"},{id:"3.2",title:"第二部分",href:"/7155647370233905188"},{id:"3.3",title:"第三部分",href:"/7159042278252609550"}]},{id:"4",title:"网络",href:"/7197070078360322109"},{id:"5",title:"前端面试题-偏难",href:"/6844903821429178382"}],handleTpl:"juejin"}}}},271:function(e,t,r){(function(t){const n=r(252),i=r(312),l=r(273);e.exports=async function(e="GET",r="",o={},s="utf-8"){return e=e.toUpperCase(),await new Promise((c,a)=>{const h=n.parse(r,!0),{port:d,hostname:u,query:p,path:f}=h,y="POST"===e?l.stringify(o):"",g={method:e,hostname:u,port:d,path:f,headers:{"Content-Length":t.byteLength(y)}},m=i.request(g,(function(e){let t="";e.setEncoding(s),e.on("data",(function(e){t+=e})),e.on("end",(function(){return c(t)}))}));m.setTimeout(1e4,(function(){return console.log("********** 请求超时 **********"),m.abort(),a({msg:"请求超时",data:{url:r}})})),m.on("error",(function(e){return console.log("********** 请求错误 **********"),a({msg:"请求错误",data:{err:e,url:r}})})),m.write(y),m.end()})}}).call(this,r(243).Buffer)},303:function(e,t,r){const n=r(267),i=r(305),l=r(323),o=r(271);e.exports={...n,...i,fetch:o,regexp:l}},305:function(e,t,r){r(92),r(93);const n=r(268),i=r(271),l=r(269),{writeFileSync:o,getSubPaths:s,addToFileLineSync:c,upperFirst:a,camelCase:h}=r(267),{indexName:d,excludes:u,crawlerMap:p}=r(270),f=[".vuepress",d,...u];e.exports={deleteFolderSync(e,t=!0){l.existsSync(e)&&(l.readdirSync(e).forEach((t,r)=>{const i=n.join(e,t);l.lstatSync(i).isDirectory()?deleteFolderSync(i,!0):l.unlinkSync(i)}),t&&l.rmdirSync(e))},getHomeFeatures(e="docs/"){const t=[];return l.readdirSync(e).forEach((r,i)=>{const o=n.join(e,r);if(l.lstatSync(o).isDirectory()&&!f.includes(r)){var s;const e=(null===(s=p[r])||void 0===s?void 0:s.title)||a(h(r));t.push({title:""+e,details:`这是关于${e}的内容介绍。`})}}),t},getHeadNavs(e="docs/"){const t=[];return l.readdirSync(e).forEach((r,i)=>{const o=n.join(e,r);if(l.lstatSync(o).isDirectory()&&!f.includes(r)){var s;const e=(null===(s=p[r])||void 0===s?void 0:s.title)||a(h(r));t.push({text:e,link:`/${r}/`})}}),t},getSideNavs(e="docs/"){const t={};return l.readdirSync(e).map(async(r,i)=>{const l=n.join(e,r);if(!f.includes(r)){const e=await s(l);t[`/${r}/`]=e}}),t},getCrawlerNames:(e=f)=>Object.keys(p).filter(t=>!e.includes(t)),async fetchHtml(e="",t,r=e){try{return await i("GET",e).then(n=>{if(!n)throw new Error("返回的html为空，有可能是地址错误："+e);return n=c(n,"<head>",[`  <base href="${r}" />`]),t&&o(t,n),n})}catch(e){return console.log(e),""}},downloadImg:async(e,t)=>await i("GET",e,"binary").then(e=>{const r=o(t,e,"binary");return console.log("下载"+(r?"失败":"成功"),r||""),null}).catch(e=>(console.log("下载失败",e),e))}},315:function(e,t){},317:function(e,t){},323:function(e,t){e.exports={}},334:function(e,t,r){"use strict";r.r(t);var n=r(0),i=r(303),l=Object(n.b)({__name:"BaseImg",setup(e){const{pinyin:t}=r(324);return console.log(Object(i.toEnglish)("翻译-"),"翻译----"),{__sfc:!0,pinyin:t}}}),o=r(15),s=Object(o.a)(l,(function(){var e=this._self._c;this._self._setupProxy;return e("div",{},[this._v("这是base-img组件")])}),[],!1,null,"c4339a2e",null);t.default=s.exports}}]);