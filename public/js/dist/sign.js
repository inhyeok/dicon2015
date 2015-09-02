(function() {
  jQuery(function() {
    var options;
    $('.alertBox p').hide();
    this.email_alert = function() {
      $('#email-alert p').show();
      return false;
    };
    this.pw_alert = function() {
      $('#pw-alert p').show();
      return false;
    };
    this.pw_ck_alert = function() {
      $('#pw-ck-alert p').show();
      return false;
    };
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
          required: true
        }
      },
      massages: {
        u_name: {
          required: '이름을 입력해주세요.'
        },
        u_email: {
          required: this.email_alert(),
          email: this.email_alert()
        },
        u_pw: {
          required: this.pw_alert()
        }
      }
    };
    $('#signForm').validate(options);
    return true;
  });

}).call(this);
