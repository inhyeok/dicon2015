jQuery ->
	@answerAdd = () ->
		answerNo = $('#answerList li').length
		if answerNo is 10
			alert '더 이상 추가할 수 없습니다.'
		else
			text = '<input id="answer" type="text" name="answer" placeholder="항목 입력" class="form-control"/>'
			$('#answerList').append(text)
		false

	@answerDel = () ->
		answerNo = $('#answerList input').length
		if answerNo is 1
			swal(
				title: '삭제실패'
				text: '더 이상 삭제할 수 없습니다.'
				type: 'error'
			)
		else
			$('#answerList input:last').remove()
		false

	@voteOk = () ->
		checkNo = $('#answerList li input:checked').length
		if checkNo isnt 1
			swal(
				title: '투표실패'
				text: '한개의 항목만 선택해주세요.'
				type: 'warning'
			)
			false
		else
			true
	true