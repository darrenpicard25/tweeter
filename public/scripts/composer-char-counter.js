//waiting for the entire dom is ready and loaded
$(() => {

  //Counts number of characters subtracts max-length by this and puts into span tag
  $('.new-tweet form textarea').keyup(function () {
    let max_length = 140;
    let remaining_length = max_length - $(this).val().length;
    //Apparently using this sibling command is better then just looking for the exact item
    $(this).siblings('.counter').text(remaining_length);
    if (remaining_length < 0) {
      $(this).siblings('.counter').css('color', 'red');
    } else {
      $(this).siblings('.counter').css('color', 'grey');
    }
  });
});
