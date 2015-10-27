(function() {
  jQuery(function() {
    return this.vote_ok = function() {
      var check_num, text_num;
      check_num = $('#answer_list li input:checked').length;
      text_num = $('#answer_list li input[type=text]').val().length;
      alert(text_num);
      alert(check_num);
      if ((+check_num === 1 && +text_num === 0) || (+check_num === 0 && +text_num !== 0)) {
        return true;
      } else {
        swal({
          title: '투표실패',
          text: '한개의 항목을 선택해주세요.',
          type: 'warning'
        });
        return false;
      }
    };
  });

}).call(this);
