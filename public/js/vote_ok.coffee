jQuery ->
  @vote_ok = () ->
    check_num = $('#answer_list li input:checked').length
    text_num = $('#answer_list li input[type=text]').val().length
    alert text_num
    alert check_num
    if (+check_num is 1 and +text_num is 0) or (+check_num is 0 and +text_num isnt 0)
      return true
    else
      swal
        title: '투표실패'
        text: '한개의 항목을 선택해주세요.'
        type: 'warning'
      return false
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