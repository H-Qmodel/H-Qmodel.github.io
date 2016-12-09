$(function(){
	function login() {
		// 用户名
		var userName = $("#mobile").val();
		// 密码
		var userPass = $("#Mpassword").val();
		// 验证码
		var userPhp = $("#captcha_li>a").val();
		
		if (userName == "" || userName == null) {
			alert("用户名不能为空");
			return false;
		} else if (userPass == "" || userPass == null) {
			alert("密码不能为空");
			return false;
		}else if (userPass == "" || userPass == null) {
			alert("请输入验证码");
			return false;
		}  else {
			return true;
		}
	}
	
	
	
	
	var landP={
		phoneNum:$('#loginname01'),//输入用户名
		passWord: $('#loginname02'),//密码输入框
		phoneCapture:$('#captcha'),//手机验证码输入框
		phoneCode: '',//手机验证码
		registerBtn: $('.login_btn'),//点击登录按钮
		
	
	init:function(){
		//用户名验证
		this.checkPhoneNum();
		//密码验证
		
		//随机产生验证码
		this.randomCapture2();

		//点击更换验证码
		this.changeCaptcha();

		//验证输入的验证码
		this.judgeInputCaptcha();
		
		//注册按钮点击时
		this.registerMember();
	},
	checkPhoneNum:function(){
		
	},
		//随机产生4位数验证码
	randomCapture2:function(){
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
	//点击登录按钮时
	registerMember: function(){
		var that = this;
		//登录按钮被点击时
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
				$('#mobile').parent().find('#tip_m_m').html('手机号不存在！');
				
			}else{
				location.href="index.html";
				return;
			}
			console.log( registerInfo );
			//写到cookie中
			$.cookie('zol_register',JSON.stringify(registerInfo),{expires:10,path: '/'});

			//alert('注册成功');

			console.log( JSON.parse( $.cookie('zol_register')) );
		});
	},

	
	}
	landP.init();
})



