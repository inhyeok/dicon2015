jQuery ->
  $('.alertBox p').hide()

  @email_alert = () ->
    $('#email-alert p').show()
    return false

  @pw_alert = () ->
    $('#pw-alert p').show()
    return false

  @pw_ck_alert = () ->
    $('#pw-ck-alert p').show()
    return false

  options =
    rules:
      u_name:
        required: true
      u_email:
        required: true
      u_pw:
        required: true,
        minlength: 6,
        maxlength: 12
      u_pw_ck:
        equalTo: '#u_pw'
      u_ph:
        required: true
    massages:
      u_name:
        required: '이름을 입력해주세요.'
      u_email:
        required: @email_alert(),
        email: @email_alert()
      u_pw:
        required: @pw_alert()

  $('#signForm').validate options

  true