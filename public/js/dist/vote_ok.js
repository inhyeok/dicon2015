(function() {
  jQuery(function() {
    return this.vote_ok = function() {
      var check_no;
      check_no = $('#answer_list li input:checked').length;
      if (check_no !== 1) {
        swal({
          title: '투표실패',
          text: '한개의 항목을 선택해주세요.',
          type: 'warning'
        });
        return false;
      } else {
        swal({
          title: '투표성공',
          text: '참여해주셔서 감사합니다.',
          type: 'success'
        });
        return true;
      }
      return false;
    };
  });

}).call(this);
