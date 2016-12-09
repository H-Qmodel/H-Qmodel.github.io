$(function(){
	/**手机注册和邮箱注册页面切换**/
		$('#regTitle>a').click(function(){
			$('#regTitle>a').eq( $(this).index() ).addClass("register_emailbtn").siblings().removeClass("register_emailbtn");
			$(".register_tip>span").hide().eq( $(this).index() ).show();
			$("#regDiv>form").hide().eq( $(this).index() ).show();
			
			/*$('#regTitle>a').mouseleave(function(){
				$('#regTitle>a').removerClass("register_emailbtn");
			})*/
		})









/**手机注册验证**/
var registerP ={
	phoneNum:$('#mobile'),//输入手机号码
	phoneCaptureBtn: $('#send_valid_code'),//获取手机验证码按钮
	phoneCapture:$('#valid_code'),//手机验证码输入框
	phoneCode: '',//手机验证码
	passWord: $('#Mpassword'),//密码输入框
	confirmPassword: $('#MCpassword'),//确认密码输入框
	vPsw: '',//输入密码的值*/
	registerBtn: $('#reg_mobile_submit'),//点击注册按钮
	inputCaptcha2:$('#captcha_li2>a'),//验证码
	
	
	init:function(){
		//手机号验证
		this.checkPhoneNum();
		//随机产生验证码
		this.randomCapture2();

		//点击更换验证码
		this.changeCaptcha();

		//验证输入的验证码
		this.judgeInputCaptcha();
		
		//注册按钮点击时
		this.registerMember();
	},
	
	//验证手机号
	/*
	 	1.验证手机号码是否符合标准
	 		不符合标准  提示：手机格式不正确
	 		符合标准 切换显示绿勾图案
	 	2.是否输入
	 		限制输入字符11位 多出不显示
	 		未输入 提示：手机格式不正确
	 	3.cookie里是否有同样手机号
	 		如果有 提示:该手机号已存在
	 * */
	checkPhoneNum:function(){
		var that=this;
		//手机号码判断 正则表达式
		var CPNum=/^1[3|4|5|7|8]\d{9}$/;
		//失焦判断
		this.phoneNum.blur(function(){
			var vphoneNum = that.phoneNum.val().trim();
			that.judgeTips( $(this),vphoneNum );
			if( !CPNum.test(vphoneNum) ){
				$(this).parent().find('#tip_m_m').html('手机号格式不正确').show();
				return;
			}else{
				$(this).parent().find('#tip_m_m').append("<img src='img/20161207190237.png'/>").show();
			}
			
			/*selector.parent().find('#tip_m_m').html('').hide();
			$(this).parent().find('#tip_m_m').hide();*/
			
		});	
	},
		//随机产生4位数验证码
	randomCapture2:function(){
		var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var result = '';
		for(var i=0; i<4; i++){
			var index = parseInt( Math.random()*62 );
			result += str[index];
		}
		$('#captcha_li2>a').html( result );
		this.vCaptcha = result;
	},	
	//点击更换验证码
	changeCaptcha:function(){
		var that = this;
		$('#captcha_li2>a').click(function(){
			that.randomCapture2();
		});
	},
	//验证输入的验证码
	judgeInputCaptcha: function(){
		var that = this;

		//失焦判断
		/*this.inputCaptcha2.blur(function(){
			var vInputCaptcha = that.inputCaptcha2.val().trim();
			that.judgeTips( $(this),vInputCaptcha );
			if( vInputCaptcha != that.vCaptcha ){
				$(this).parent().find('#tip_e_yzm').html('验证码不正确').show();
				//$(this).parent().find('.right-tips').hide();
				return;
			}
		});*/
	},
	//点击注册按钮时
	registerMember: function(){
		var that = this;
		//注册按钮被点击时
		this.registerBtn.click(function(){
			//data() 获取以data-开的自定义属性的值 手机号
			var PhoneNumber = that.phoneNum.attr('mobile');
			//passWord 密码
			var PassWord = that.passWord.attr('validcode');
			//读取cookie() 
			console.log( PhoneNumber,PassWord );
			var registerInfo = $.cookie('zol_register') || '{}';
			//将JSON字符串转化为JSON对象
			registerInfo = JSON.parse( registerInfo );
			
			//判断手机号是否存在
			if( !registerInfo[PhoneNumber] ){
				registerInfo[PhoneNumber]={
					'mobile':PhoneNumber,
					'validCode':PassWord
				};
			}else{
				$('#mobile').parent().find('#tip_m_m').html('手机号已存在！');
				return;
			}
			console.log( registerInfo );
			//写到cookie中
			$.cookie('zol_register',JSON.stringify(registerInfo),{expires:10,path: '/'});

			alert('注册成功');

			console.log( JSON.parse( $.cookie('zol_register')) );
		});
	},
	//判断后的提示信息
	judgeTips: function( selector,value ){
		if( value == '' ){
			selector.parent().find('#tip_m_m').show();
			//selector.parent().find('.right-tips').hide();
			return;
		}
		selector.parent().find('#tip_m_m').html('').hide();
		//selector.parent().find('.right-tips').show();
	}

}
//调用方法
registerP.init();



/************************************/
//验证邮箱
var registerE ={
	passEmail: $('#email'),//邮箱输入框
	inputCaptcha:$('#captcha_li>a'),//验证码
	init:function(){
		//邮箱验证
		this.checkEmail();
		//随机产生验证码
		this.randomCapture();

		//点击更换验证码
		this.changeCaptcha();

		//验证输入的验证码
		this.judgeInputCaptcha();

		//判断手机验证码
		//this.judgePhoneCode();
		//注册按钮点击时
		//this.registerMember();
	},
	
	
	checkEmail:function(){
		var that=this;
		//邮箱正则表达式
		var regEmail = /^([\s\S])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		//失焦判断
		this.passEmail.blur(function(){
			var vemail = that.passEmail.val().trim();
			that.judgeTips( $(this),vemail );
			
			if( !regEmail.test(vemail) ){
				$(this).parent().find('#tip_e_e').html('邮箱格式不正确').show();
				return;
			}else{
				$(this).parent().find('#tip_e_e').append("<img src='img/20161207190237.png'/>").show();
			}
			
			//selector.parent().find('#tip_e_e').html('邮箱格式不正确').hide();
		});
		
	},
	//随机产生4位数验证码
	randomCapture:function(){
		var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var result = '';
		for(var i=0; i<4; i++){
			var index = parseInt( Math.random()*62 );
			result += str[index];
		}
		$('#captcha_li>a').html( result );
		this.vCaptcha = result;
	},	
	//点击更换验证码
	changeCaptcha:function(){
		var that = this;
		$('#captcha_li>a').click(function(){
			that.randomCapture();
		});
	},
	//验证输入的验证码
	judgeInputCaptcha: function(){
		var that = this;

		/*//失焦判断
		this.inputCaptcha.blur(function(){
			var vInputCaptcha = that.inputCaptcha.val().trim();
			that.judgeTips( $(this),vInputCaptcha );
			if( vInputCaptcha != that.vCaptcha ){
				$(this).parent().find('#tip_e_yzm').html('验证码不正确').show();
				//$(this).parent().find('.right-tips').hide();
				return;
			}
		});*/
	},//判断后的提示信息
	judgeTips: function( selector,value ){
		if( value == '' ){
			selector.parent().find('#tip_e_e').show();
			//selector.parent().find('.right-tips').hide();
			return;
		}
		selector.parent().find('#tip_e_e').html('').hide();
		//selector.parent().find('.right-tips').show();
	}
	
}
	//调用方法
	registerE.init();	
	

/**********************************************************************/	
	$('#form_dy').submit(function() {
		var email = $(this).find('input[name=email]').val();
		$.post($(this).attr('action'), {
			'email': email
		}, function(data) {
			$('#subscription-prompt').html(data.msg).show().delay(5000).fadeOut(400)();
		}, 'json')
		return false;
	})
})	
	
	
	










