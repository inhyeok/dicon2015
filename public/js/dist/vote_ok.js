(function() {
  jQuery(function() {
    return this.vote_ok = function() {
      var check_num, text_num;
      check_num = $('#answer_list li input:checked').length;
      text_num = $('#answer_list li input[type=text]').val();
      if (check_num !== 0 && text_num !== null) {
        swal({
          title: '투표실패',
          text: '한개의 항목을 선택해주세요.',
          type: 'warning'
        });
        return false;
      } else {
        return true;
      }
    };
  });

}).call(this);
