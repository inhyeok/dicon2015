(function() {
  $(document).ready(function() {
    $('.alertBox p').hide();
    $('#u_email').focusout(function() {
      var regex, u_email;
      u_email = $('#u_email').val();
      regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
      if (regex.test(u_email) === false) {
        $('#email-alert p').show();
        return false;
      } else {
        $('#email-alert p').hide();
        return true;
      }
    });
    $('#u_pw').focusout(function() {
      var u_pw;
      u_pw = $('#u_pw').val();
      if (u_pw.length < 6 || u_pw.length > 12) {
        $('#pw-alert p').show();
        return false;
      } else {
        $('#pw-alert p').hide();
        return true;
      }
    });
    return $('#u_pw_ck').focusout(function() {
      var u_pw, u_pw_ck;
      u_pw = $('#u_pw').val();
      u_pw_ck = $('#u_pw_ck').val();
      if (u_pw !== u_pw_ck) {
        $('#pw-ck-alert p').show();
        return false;
      } else {
        $('#pw-ck-alert p').hide();
        return true;
      }
    });
  });

}).call(this);
