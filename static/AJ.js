const data = {
	action: "list",
	path: "/"
	};
let str = '',str0 = '';
let arr = new Array();
 
Init = Datas => {
	const Div = document.getElementById("myDiv");
	Div.innerHTML=''
	const obj = JSON.parse(Datas);
	ShowPath();

	if(arr.length != 0){
	const Ele = document.createElement('li');
	const P = document.createElement('button');
	P.innerHTML = '...';
	P.addEventListener('click',()=>{
		data.path = arr.pop();
		GT(str);})
	Ele.appendChild(P);
	Div.appendChild(Ele);}
	
	for(x in obj.result){
		const Ele = document.createElement('li');
		const text1 = document.createTextNode(obj.result[x].name);
		if(obj.result[x].type == 'dir'){
			const P = document.createElement('button');
			P.innerHTML = '+';
			(K => {P.addEventListener('click',()=>{
				arr.push(data.path);
				data.path += obj.result[K].name +'/';
				GT(str);})})(x);
			Ele.appendChild(P);}			
		if(obj.result[x].type == 'file'){
			const P = document.createElement('button');
			P.innerHTML = ':)';
			(K=>{P.addEventListener('click',()=>{
				if(arr.length!=0)Download(str0+data.path+obj.result[K].name);
					else Download(str0+'/'+obj.result[K].name);
				})})(x);
			Ele.appendChild(P);}
		Ele.appendChild(text1);
		Div.appendChild(Ele);
	}
}

GTS = url => {
	return new Promise((resolve,reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("POST",url,true);
		xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
		xhr.onload = () => resolve(xhr.responseText);
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send(JSON.stringify(data));
	})
}
GT = async(url) => {
	try{	
		const Dat = await GTS(url);
		Init(Dat);
	}
	catch(Err){
		alert(Err);
	}
}

OhLetsStart = (url1,url2) => {
	str = url1;
	str0 = url2;
	GT(str);
}

Download = url => {
	window.location = url;
}

ShowPath = () => {
	const Div = document.getElementById("PathMonitor");
	Div.innerHTML=''
	const Ele = document.createElement('pre');
	const text0 = document.createTextNode(data.path);
	Ele.appendChild(text0);
	Div.appendChild(Ele);
}