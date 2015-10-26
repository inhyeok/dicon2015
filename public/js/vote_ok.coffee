jQuery ->
  @vote_ok = () ->
    check_num = $('#answer_list li input:checked').length
    text_num = $('#answer_list li input[type=text]').val()
    if check_num isnt 0 && text_num isnt null
      swal
        title: '투표실패'
        text: '한개의 항목을 선택해주세요.'
        type: 'warning'
      return false

    else
      return true
  # @vote_ok = (vote_id) ->
  #   alert vote_id
  #   check_no = $('#answer_list li input:checked').length
  #   if check_no isnt 1
  #     swal
  #       title: '투표실패'
  #       text: '한개의 항목을 선택해주세요.'
  #       type: 'warning'
  #     return false
  #   # $('#vote_form').
  #   $ajax(
  #     url: '/vote/'+vote_id
  #     type: 'POST'
  #     success: () ->
  #       alert 'good'
  #     error: (err) ->
  #       alert err
  #   )
  #   return false