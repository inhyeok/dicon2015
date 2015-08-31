$(document).ready( () ->
	@answerAdd = () ->
		answerNo = $('#answerList li').length
		if answerNo is 10
			alert '더 이상 추가할 수 없습니다.'
		else
			text = '<li><input type="text" placeholder="항목이름 입력" id="answerValue#{@answerNo}" /></li>'
			$('#answerList').append(text)

	@answerDel = () ->
		answerNo = $('#answerList li').length
		if answerNo is 1
			alert '더 이상 삭제할 수 없습니다.'
		else
			$('#answerList li:last').remove()

	@voteOk = () ->
		checkNo = $('#answerList li input:checked').length
		if checkNo isnt 1
			alert "하나만 선택해 주세요."
			false
		else
			true
)