---
title: 图片预加载与瀑布流布局
date: 2018-04-24 00:57:45
tags: 
- CSS3
---
使用图片预加载技术可以在页面打开前加载完成而省略多次请求部分直接调用缓存，能够提高用户体验，而瀑布流布局是目前较为火热的布局方式，结合流行的单页面站点，可以简化用户操作步骤，同样提升了用户体验，而两者又是相辅相成的。

- 图片预加载分为无序加载、有序加载和基于用户行为的预加载
- 通过CSS3和原生JS的方式分别实现瀑布流布局
- 瀑布流布局结合的是懒加载：当用户拖动滚动条时才发生加载行为


### Github仓库地址

https://github.com/Meow-starone/Preload-Waterfall-layout-TST


### 无序预加载
``` bash
	var index = 0,
    len = imgs.length;
    count = 0;
    $progress = $('.progress');
    
    $.each(imgs,function(i,src){
	var imgObj = new Image();
    $(imgObj).on('load error',function(){
    $progress.html(Math.round((count+1)/len*100)+'%');
    if(count>=len-1){
    $('.loading').hide();
	Document.title='1/'+len;
    }
    count++;
    });
    imgObj.src = src;
    });
```
通过调试器我们可以看到图片的加载是无序的：

### 有序预加载
``` bash
 function load() {
    	var imgObj = new Image();

    	$(imgObj).on('load error',function(){
    		if (count>=len){

    		}else{
    			load();
    		}
    		count++;
    	});
    	imgObj.src = imgs[count];
    }
```
通过图片加载进程图，我们可以知道图片加载是很有顺序的，在很多场景这是很实用的

### CSS3实现瀑布流
``` bash
#main{
	-webkit-column-width:297px;
	-moz-column-width:297px;
	-o-column-width:297px;
	-ms-column-width:297px;
}
.box{
	padding: 10px 0 0 15px;
}
.pic{
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 0 5px #ccc;
	width: 260px;
}
.pic img{
	display: block;
	width: 260px;
	height: auto;
}
```

### 原生JS实现瀑布流
``` bash
function waterfall(parent,box){
	//取出main下box元素
	var oParent = document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面显示的列数（页面宽/box宽）
	var oBoxW = oBoxs[0].offsetWidth; 
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	// console.log(cols);
	//设置main的宽
	oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto';
	//存第一行图片的高度,之后为每列的高度
	var hArr = [];
	for(var i = 0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinhIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH+'px';
			oBoxs[i].style.left=oBoxW*index+'px';
			//改变此列高度的值再做比较
			hArr[index]+=oBoxs[i].offsetHeight;	
		}
	}
	// console.log(hArr);
}
```

