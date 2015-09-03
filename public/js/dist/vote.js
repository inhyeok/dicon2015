(function() {
  jQuery(function() {
    this.answerAdd = function() {
      var answerNo, text;
      answerNo = $('#answerList li').length;
      if (answerNo === 10) {
        return alert('더 이상 추가할 수 없습니다.');
      } else {
        text = '<li><input type="text" placeholder="항목이름 입력" id="answerValue#{@answerNo}" /></li>';
        return $('#answerList').append(text);
      }
    };
    this.answerDel = function() {
      var answerNo;
      answerNo = $('#answerList li').length;
      if (answerNo === 1) {
        return alert('더 이상 삭제할 수 없습니다.');
      } else {
        return $('#answerList li:last').remove();
      }
    };
    this.voteOk = function() {
      var checkNo;
      checkNo = $('#answerList li input:checked').length;
      if (checkNo !== 1) {
        alert("하나만 선택해 주세요.");
        return false;
      } else {
        return true;
      }
    };
    return true;
  });

}).call(this);
