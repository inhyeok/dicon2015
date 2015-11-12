jQuery ->

	today_date = moment(Date()).format('YYYY-MM-DD')
	today_at = moment(Date()).format('HH:mm')
	$('#create_date').val(today_date)
	$('#create_at').val(today_at)
	$('#finish_date').attr('min', today_date)

	if $('#create_date').val() is $('#finish_date').val()
		$('#finish_date').attr('min', $('#create_at').val())

	if $('#question_type').val() is 'description'
		# $('#vote_content input').prop 'required', false
		$('#vote_content').css 'display', 'none'
		$('#vote_content div').remove()
		$('#vote_ath').css 'display', 'none'
	else
		# $('#vote_content').css 'display', 'inherit'
		# $('#vote_content input').prop 'required', true
		$('#vote_ath').css 'display', 'inherit'

	$('#question_type').change ->
		if $('#question_type').val() is 'description'
			# $('#vote_content input').prop 'required', false
			$('#vote_content').css 'display', 'none'
			$('#vote_content div').remove()
			$('#vote_ath').css 'display', 'none'
		else
			# $('#vote_content input').prop 'required', true
			$('#vote_content').css 'display', 'inherit'
			$('#vote_content').append('<div class="col-sm-2">
					<label>질문 항목 : </label>
				</div>
				<div class="col-sm-8">
					<input class="form-control" id="answer" name="answer" type="text" placeholder="항목입력" required />
					<input class="form-control" id="answer" name="answer" type="text" placeholder="항목입력" required />
				</div>
				<div class="col-sm-2">
					<div class="col-sm-6 col-xs-6">
						<a id="answer_add" class="control_btn" onclick="answer_add()">추가</a>
					</div>
					<div class="col-sm-6 col-xs-6">
						<a id="answer_delete" class="control_btn" onclick="answer_delete()">삭제</a>
					</div>
				</div>
			')
			$('#vote_ath').css 'display', 'inherit'


	@create_vote = () ->
		# $ajax
		# 	type: 'PUT'
		# 	url: '/vote/create'
		# 	data: avc

	@answer_add = () ->
		answer_no = $('#answer_list lnput').length
		if answer_no is 10
			swal
				title: '실패'
				text: '더 이상 추가할 수 없습니다.'
				type: 'error'
		else
			text = '<input id="answer" type="text" name="answer" placeholder="항목 입력" class="form-control" required/>'
			$('#answer_list').append(text)
		false

	@answer_del = () ->
		answer_no = $('#answer_list input').length
		if answer_no is 2
			swal
				title: '실패'
				text: '더 이상 삭제할 수 없습니다.'
				type: 'error'
		else
			$('#answer_list input:last').remove()
		false