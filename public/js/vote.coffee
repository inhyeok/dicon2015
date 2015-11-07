jQuery ->

	today_date = moment(Date()).format('YYYY-MM-DD')
	today_at = moment(Date()).format('HH:mm')
	$('#create_date').val(today_date)
	$('#create_at').val(today_at)
	console.log $('#create_date').val(), $('#create_at').val()
	$('#finish_date').attr('min', today_date)
	if $('#create_date').val() is $('#finish_date').val()
		$('#finish_date').attr('min', $('#create_at').val())

	$('#question_type').change ->
		if $('#question_type').val() is 'description'
			$('#vote_content').css 'display', 'none'
			$('#vote_ath').css 'display', 'none'
		else
			$('#vote_content').css 'display', 'inherit'
			$('#vote_ath').css 'display', 'inherit'

	@create_vote = () ->
		# $ajax
		# 	type: 'PUT'
		# 	url: '/vote/create'
		# 	data: avc

	@answer_add = () ->
		answer_no = $('#answer_list li').length
		if answer_no is 10
			alert '더 이상 추가할 수 없습니다.'
		else
			text = '<input id="answer" type="text" name="answer" placeholder="항목 입력" class="form-control" required/>'
			$('#answer_list').append(text)
		false

	@answer_del = () ->
		answer_no = $('#answer_list input').length
		if answer_no is 2
			swal(
				title: '삭제실패'
				text: '더 이상 삭제할 수 없습니다.'
				type: 'error'
			)
		else
			$('#answer_list input:last').remove()
		false