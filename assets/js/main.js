var iUp = (function () {
	var t = 0,
		d = 150,
		clean = function () {
			t = 0;
		},
		up = function (e) {
			setTimeout(function () {
				$(e).addClass("up")
			}, t);
			t += d;
		},
		down = function (e) {
			$(e).removeClass("up");
		},
		toggle = function (e) {
			setTimeout(function () {
				$(e).toggleClass("up")
			}, t);
			t += d;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	}
})();

$(document).ready(function () {

	// 获取一言数据
	fetch('https://v1.hitokoto.cn').then(function (res) {
		return res.json();
	}).then(function (e) {
		$('#description').html(e.hitokoto + "<strong class=mdui-card-primary-subtitle>来自:" + e.from + "</strong>")
	}).catch(function (err) {
		console.error(err);
	})

	var url = 'https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8';
	var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
	var index = sessionStorage.getItem("index");
	var $panel = $('#panel');
	if(imgUrls == null){
		imgUrls = new Array();
		index = 0;		
		$.get(url,function (result) {
			images = result.images;
			for (let i = 0; i < images.length; i++) {
				const item = images[i];
				imgUrls.push(item.url);
			}
			var imgUrl = imgUrls[index];
			var url = "https://www.bing.com"+imgUrl;
			$panel.css("background", "url('"+url+"') center center no-repeat #666");
			$panel.css("background-size", "cover");
			sessionStorage.setItem("imgUrls",JSON.stringify(imgUrls));
			sessionStorage.setItem("index",index);
			});
	}else{
		if(index == 7)
			index = 0;
		else
			index++;
		var imgUrl = imgUrls[index];
		var url = "https://www.bing.com"+imgUrl;
		$panel.css("background", "url('"+url+"') center center no-repeat #666");
		$panel.css("background-size", "cover");
		sessionStorage.setItem("index",index);
	}
	
	$(".iUp").each(function (i, e) {
		iUp.up(e);
	});

	$(".js-avatar")[0].onload = function () {
		$(".js-avatar").addClass("show");
	}
});