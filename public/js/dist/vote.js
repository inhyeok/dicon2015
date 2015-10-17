(function() {
  jQuery(function() {
    var today_at, today_date;
    today_date = moment(Date()).format('YYYY-MM-DD');
    today_at = moment(Date()).format('HH:mm');
    $('#create_date').val(today_date);
    $('#create_at').val(today_at);
    console.log($('#create_date').val(), $('#create_at').val());
    $('#finish_date').attr('min', today_date);
    if ($('#create_date').val() === $('#finish_date').val()) {
      $('#finish_date').attr('min', $('#create_at').val());
    }
    this.create_vote = function() {};
    this.answer_add = function() {
      var answer_no, text;
      answer_no = $('#answer_list li').length;
      if (answer_no === 10) {
        alert('더 이상 추가할 수 없습니다.');
      } else {
        text = '<input id="answer" type="text" name="answer" placeholder="항목 입력" class="form-control" required/>';
        $('#answer_list').append(text);
      }
      return false;
    };
    return this.answer_del = function() {
      var answer_no;
      answer_no = $('#answer_list input').length;
      if (answer_no === 2) {
        swal({
          title: '삭제실패',
          text: '더 이상 삭제할 수 없습니다.',
          type: 'error'
        });
      } else {
        $('#answer_list input:last').remove();
      }
      return false;
    };
  });

}).call(this);
