(function() {
  $(document).ready(function() {
    this.answerAdd = function() {
      var answerNo, text;
      answerNo = $('#answerList li').length + 1;
      text = '<li><input type="text" placeholder="항목이름 입력" id="answerValue#{@answerNo}" /></li>';
      return $('#answerList').append(text);
    };
    this.answerDel = function() {
      return $('#answerList li:last').remove();
    };
    return this.voteOk = function() {
      var checkNo;
      checkNo = $('#answerList li input:checked').length;
      if (checkNo !== 1) {
        alert("하나만 선택해 주세요.");
        return false;
      } else {
        return true;
      }
    };
  });

}).call(this);
