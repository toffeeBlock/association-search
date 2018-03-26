/*
* @Author: toffeeblock
* @Date:   2018-02-12 17:16:29
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-26 13:58:22
*/
(function(w){
	function AssociateSearch(id, inputId){
		this.searchContainer = document.getElementById(id);  // 获取容器
		this.input = document.getElementById(inputId); // 获取输入框
		this.searchResult = []; // 搜索结果数组
	}
	AssociateSearch.prototype = {
		constructor: AssociateSearch,
        version: '1.0', // 版本号
        // 删除键入值中的空格
        trim: function(str){ 
			return str.replace(/(^\s*)|(\s*$)/g, ''); 
		},
		// 主功能函数
        ajaxSearch: function(callback){
        	var _this = this,searchResult = this.searchResult;
        	this.input.onkeyup = function(event){
        		// 获取当前键入的值
        		var inputValue = _this.trim(this.value);
        		if(event.keyCode !== 13){
        			_this.creatSearchUl(_this, inputValue, searchResult, callback);
        		}

        	}
        },
        // 键入值不为回车时执行
        creatSearchUl: function(_this, inputValue, searchResult, callback){
        	// 调用callback请求函数,
			// 参数1: 当前键入值,
			// 参数2: 回调函数, 接受请求到的json数据, 并添加为AssociateSearch构造函数的成员
			// 如果文本框中有内容 才调用callback
			if(inputValue !== ''){
				callback(inputValue, function(json){
    				searchResult = json.data; // 此时searchResult就是匹配到的真实数据
    			})
			}

    		// 检测是否有ul, 如果有先删除
			var associateUl = document.getElementById('associateUl');
    		if(associateUl){
    			_this.searchContainer.removeChild(associateUl);
    		}
    		// 如果没有匹配项 就不创建div了
	        if (searchResult.length === 0) {
            	return;
	        }
			// 如果文本框中没有内容 就不创建了
	        if(inputValue == ''){
				return;
			}

    		// 根据新的数组, 动态创建搜索结果
    		associateUl = document.createElement('ul');
    		associateUl.id = 'associateUl';
			_this.searchContainer.appendChild(associateUl);

			// 循环匹配到的结果数组, 动态以li的形式添加到ul中
			for (var i = 0; i < searchResult.length; i++) {
				var associatelis = document.createElement('li');
				associatelis.innerHTML = searchResult[i].title;
				associatelis.setAttribute('data-id', searchResult[i].id)
				associateUl.appendChild(associatelis);
			}

			document.onclick = function(){
				associateUl.style.display = 'none'
			}

			// 循环上一步添加的li, 为其绑定点击事件, 点击后生成标签
			var associateChild = associateUl.getElementsByTagName('li');
			for (var i = 0; i < associateChild.length; i++) {
				associateChild[i].onclick = function(){
					var innerhtml = this.innerText;
					_this.input.value = innerhtml;
				}
			}
        }
	}
	w.AssociateSearch = w.AS = AssociateSearch;
})(window)
