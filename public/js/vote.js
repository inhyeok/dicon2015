// Generated by CoffeeScript 1.9.3
jQuery(function() {
  this.answerAdd = function() {
    var answerNo, text;
    answerNo = $('#answerList li').length;
    if (answerNo === 10) {
      alert('더 이상 추가할 수 없습니다.');
    } else {
      text = '<input id="answer" type="text" name="answer" placeholder="항목 입력" class="form-control"/>';
      $('#answerList').append(text);
    }
    return false;
  };
  this.answerDel = function() {
    var answerNo;
    answerNo = $('#answerList input').length;
    if (answerNo === 1) {
      swal({
        title: '삭제실패',
        text: '더 이상 삭제할 수 없습니다.',
        type: 'error'
      });
    } else {
      $('#answerList input:last').remove();
    }
    return false;
  };
  this.voteOk = function() {
    var checkNo;
    checkNo = $('#answerList li input:checked').length;
    if (checkNo !== 1) {
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
  return true;
});
