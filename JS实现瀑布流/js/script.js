window.onload=function () {
	// body...
	waterfall('main','box');
	//模拟JSON格式数据
	var dataTnt = {"data":[{"src":'0.png'},{"src":'1.png'},{"src":'2.jpg'}]}
	window.onscroll = function(){
		if(checkScrollSlide()){
			var oParent = document.getElementById('main');
			//将数据块渲染到页面尾部
			for(var i = 0;i<dataTnt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/"+dataTnt.data[i].src;
				oPic.appendChild(oImg);			}
		}
		// checkScrollSlide();
		waterfall('main','box');
	}
}

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
//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array();//存储获取到的所有class为box的元素
	var oElements = document.getElementsByTagName('*');
	for(var i = 0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
// 获取最小高度图片索引值
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}
//检测是否具备滚动加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById('mian');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	// console.log(scrollTop);
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	// console.log(height);
	return (lastBoxH<scrollTop+height)?true:false;
}