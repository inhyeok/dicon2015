(function() {
  $(document).ready(function() {
    $('#u_ph').inputmask('999-9999-9999');
    return console.log(moment().format('YYYY-MM-DD hh-mm-ss a'));
  });

}).call(this);
