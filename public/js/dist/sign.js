(function() {
  jQuery(function() {
    var options;
    options = {
      rules: {
        u_name: {
          required: true
        },
        u_email: {
          required: true
        },
        u_pw: {
          required: true,
          minlength: 6,
          maxlength: 12
        },
        u_pw_ck: {
          equalTo: '#u_pw'
        },
        u_ph: {
          required: true,
          minlength: 9,
          maxlength: 11
        }
      },
      messages: {
        u_name: {
          required: '성명을 입력해주세요.'
        },
        u_email: {
          required: '이메일을 입력해주세요.',
          email: '옳바른 이메일을 입력해주세요.'
        },
        u_pw: {
          required: '비밀번호를 입력해주세요',
          minlength: '6글자이상 12글자 이하로 입력해주세요.',
          maxlength: '6글자이상 12글자 이하로 입력해주세요.'
        },
        u_pw_ck: {
          equalTo: '비밀번호가 일치하지 않습니다.'
        },
        u_ph: {
          required: '휴대번호를 입력해주세요.',
          minlength: '옳바른 번호를 입력해주세요.',
          maxlength: '옳바른 번호를 입력해주세요.'
        }
      }
    };
    $('#signForm').validate(options);
    return true;
  });

}).call(this);
