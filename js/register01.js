$(function(){
	$('#form_dy').submit(function() {
		var email = $(this).find('input[name=email]').val();
		$.post($(this).attr('action'), {
			'email': email
		}, function(data) {
			$('#subscription-prompt').html(data.msg).show().delay(5000).fadeOut(400)();
		}, 'json')
		return false;
	});
})
