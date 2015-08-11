$(document).ready( () ->
  $('.alertBox p').hide()

  $('#u_email').focusout ->
    u_email = $('#u_email').val()
    regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    if regex.test(u_email) == false
      $('#email-alert p').show()
      return false
    else
      $('#email-alert p').hide()
      return true

  $('#u_pw').focusout ->
    u_pw = $('#u_pw').val()
    if u_pw.length < 6 or u_pw.length >12
      $('#pw-alert p').show()
      return false
    else
      $('#pw-alert p').hide()
      return true

  $('#u_pw_ch').focusout ->
    u_pw = $('#u_pw').val()
    u_pw_ch = $('#u_pw_ch').val()
    if u_pw != u_pw_ch
      $('#pw-ch-alert p').show()
      return false
    else
      $('#pw-ch-alert p').hide()
      return true
)