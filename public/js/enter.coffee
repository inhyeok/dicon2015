jQuery ->

	options =
		framework: 'bootstrap'
		icon:
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		#excluded: ':disabled'
		fields:
			u_name:
				validators:
					notEmpty:
						message: '항목값을 입력해주세요.'
			u_email:
				validators:
					notEmpty:
						message: '항목값을 입력해주세요.'
					regexp:
						regexp: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
						message: '옳바른 형식으로 입력해주세요.'
			u_pw:
				validators:
					notEmpty:
						message: '항목값을 입력해주세요.'
					stringLength:
						min: 6,
						max: 12,
						message: '6글자 이상 12글자 이하로 입력해주세요.'
			u_pw_ck:
				validators:
					notEmpty:
						message: '항목값을 입력해주세요.'
					identical:
						field : 'u_pw'
						message: '비밀번호가 일치하지 않습니다.'
			u_ph:
				validators:
					notEmpty:
						message: '항목값을 입력해주세요.'
					stringLength:
						min: 9,
						max: 11,
						message: '정확한 번호를 입력해주세요.'

	$('#signForm').formValidation options

	options =
		framework: 'bootstrap'
		icon:
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		#excluded: ':disabled'
		fields:
			l_email:
				validators:
					notEmpty:
						message: '항목값을 입력해주세요.'
					regexp:
						regexp: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
						message: '옳바른 형식으로 입력해주세요.'
			l_pw:
				validators:
					notEmpty:
						message: '항목값을 입력해주세요.'

	$('#loginForm').formValidation options