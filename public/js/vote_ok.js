// Generated by CoffeeScript 1.9.3
jQuery(function() {
  return this.vote_ok = function() {
    var check_no;
    check_no = $('#answer_list li input:checked').length;
    if (check_no !== 1) {
      swal({
        title: '투표실패',
        text: '한개의 항목만 선택해주세요.',
        type: 'warning',
        timer: 1000,
        showConfirmButton: false
      });
      return false;
    }
    return true;
  };
});