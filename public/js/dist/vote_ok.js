(function() {
  jQuery(function() {
    return this.vote_ok = function() {
      var check_no;
      check_no = $('#answer_list li input:checked').length;
      if (check_no !== 1) {
        swal({
          title: '투표실패',
          text: '한개의 항목만 선택해주세요.',
          type: 'warning'
        });
        return false;
      } else {
        return true;
      }
    };
  });

}).call(this);
