$(document).ready( () ->
  @answerAdd = () ->
      answerNo = $('#answerList li').length + 1;
      text = '<li><input type="text" placeholder="항목이름 입력" id="answerValue#{@answerNo}" /></li>'
      $('#answerList').append(text)

  @answerDel = () ->
      $('#answerList li:last').remove()

  @voteOk = () ->
    checkNo = $('#answerList li input:checked').length
    if checkNo isnt 1
      alert "하나만 선택해 주세요."
      false
    else
      true
)