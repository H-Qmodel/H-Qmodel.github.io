/*复用部分的区分 隐藏 显示*/
$(function() {
	$(".contentLeft").hide();
	$(".headerUL_li").hover(function() {
		$(".content").show();

	}, function() {
		$(".content").hide();
	})
})


$(function(){
	$('.wangzhangdh1').mouseover(function(){
		$('.webdhbox').show();
	});
	$('.wangzhangdh1').mouseout(function(){
		$('.webdhbox').hide();
	});
});	

$(function(){	
	$('#headerUL_id2').mouseover(function(){
		$('.headerUL_box_2').show();
	});
	$('#headerUL_id2').mouseout(function(){
		$('.headerUL_box_2').hide();
	});
});		

$(function(){
	$('#headerUL_id3').mouseover(function(){
		$('.headerUL_box_3').show();
	});
	$('#headerUL_id3').mouseout(function(){
		$('.headerUL_box_3').hide();
	});	
});	

/*导航左侧栏js效果 start*/
$(function(){
		$(".contentLi").hover(function(){
			$(".contentLeft_itemt").hide();
			$(this).find(".content_i").children("img").eq(0).css("display","none");
			$(this).find(".content_i").children("img").eq(1).css("display","block");
			$(this).find(".content_i").stop(true).animate({
				marginLeft:20,
			},400,"linear");
			
			$(".contentLeft").fadeIn();
			var index=$(this).index(".contentLi");
			$(this).addClass("menulihover").siblings().removeClass("menulihover");
			$(this).addClass("mliselected").siblings().removeClass("mliselected");
			$($(".contentLeft_itemt")[index]).fadeIn().siblings().fadeOut();
			$($(".contentLeft_itemt")[index]).addClass("yMenuLConinhover").siblings().removeClass("yMenuLConinhover");
			$(this).siblings().children("contentLeft_itemt").hide();
		},function(){
			$(this).find(".content_i").children("img").eq(0).css("display","block");
			$(this).find(".content_i").children("img").eq(1).css("display","none");
			$(this).find(".content_i").stop(true).animate({
				marginLeft:0,
			},400,"linear");
			
		});
		$(".headerUL_li").mouseleave(function(){
			$(".contentLeft").fadeOut();
			$(".contentLeft_itemt").fadeOut();
			$(".contentLi").removeClass("menulihover");
		})
	})


