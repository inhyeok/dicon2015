jQuery ->
  @vote_ok = () ->
    check_no = $('#answer_list li input:checked').length
    if check_no isnt 1
      swal(
        title: '투표실패'
        text: '한개의 항목만 선택해주세요.'
        type: 'warning'
      )
      return false
    else
      return true