// js作用域 分为 函数作用域,全局作用域；为避免全局污染，在局部变量；
(function (global){
	//  防止核心代码被重写
	var Table = function(initJson){
		//  创建表格节点
		var tableWrap = initJson.el,
			table = document.createElement("table");
		table.id = "sygTable"
		table.border = 1;
		table.style.width = "100%";
		tableWrap.appendChild(table)
		
		// 获取表头信息
		var header = initJson.tableHeader;
			thTr = document.createElement('tr');
			thWidth = 100/header.length;
			
		var css = document.getElementsByTagName("style")[0] || document.head.appendChild(document.createElement("style"));
		css.innerHTML += "#sygTable tr{width:100%;}#sygTable th,#sygTable td{width:"+thWidth+"%;}"
		//console.log(css);
		
		table.appendChild(thTr);
		//  循环将表头添加进th
		header.forEach(function(el){
			var th = document.createElement('th');
			th.innerHTML = el;
			//console.log(el);
			thTr.appendChild(th);
		});
		
		//  获取表格内容
		var content = initJson.content;
		content.forEach(function(el){
			var tr = document.createElement("tr");
				table.appendChild(tr);
			//console.log(el);
			//  遍历对象  从forEach 变成了 for in
			for(var key in el){
				var td = document.createElement("td");
				console.log(key);
				td.style.textAlign = "center";
				td.innerHTML = el[key];
				tr.appendChild(td);
			}
			
		})
		
	};
	
	global.Table = Table;
	
})(window);



/*
*       表格插件
*           根据用户提供的内容自定义表格    表头th   内容td
*       1、做插件思想不可以禁锢在浏览器端(全局对象window)服务器端(node全局对象global)
*   	2、global.Table = function(){}   这样用户会修改table的值，写成插件中的形式避免table被篡改；
*		3、样式布局，不需要用js，宽度100%
*		4、for in 影响效率 看不同场合，代码量少用for in
*
*/