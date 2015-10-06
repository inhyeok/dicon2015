jQuery ->

	today_date = moment(Date()).format('YYYY-MM-DD')
	today_at = moment(Date()).format('HH:mm')
	$('#create_date').val(today_date)
	$('#create_at').val(today_at)
	console.log $('#create_date').val(), $('#create_at').val()
	$('#finish_date').attr('min', today_date)
	if $('#create_date').val() is $('#finish_date').val()
		$('#finish_date').attr('min', $('#create_at').val())

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

	@vote_ok = () ->
		check_no = $('#answer_list li input:checked').length
		if check_no isnt 1
			swal(
				title: '투표실패'
				text: '한개의 항목만 선택해주세요.'
				type: 'warning'
			)
			false
		else
			true
	true