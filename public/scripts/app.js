/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(() => {
  function createTweetElement(data) {
    let $tweet = $("<article>").addClass("new-tweet");
    let $header = $("<header>").append($('<img>').attr('alt', 'Profile Pic').attr('src', data.user.avatars.small))
                                .append($('<h4>').text(data.user.name))
                                .append($('<p>').text(data.user.handle));


    let $middleDiv = $("<div>").append($('<p>').text(data.content.text));

    let $footer = $("<footer>")
                                .append($('<p>').text(data.created_at))
                                .append($('<i>').addClass("far fa-flag"))
                                .append($('<i>').addClass("fas fa-retweet"))
                                .append($('<i>').addClass("fas fa-heart"));

    $tweet.append($header).append($middleDiv).append($footer);
  return $tweet;
  }

  function renderTweets(tweets) {
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      for (let tweetInfo of tweets) {
        displayData = createTweetElement(tweetInfo);
        $('#tweets-container').prepend(displayData);
      }
  }

  function loadTweets() {
    $.get('/tweets').then(function (tweetData) {
      renderTweets(tweetData);
    });
  }

  loadTweets();

  $('#toggle-button').click(function() {
    console.log('Click');
    if ( $( "#postTweet" ).is( ":hidden" ) ) {
      $( "#postTweet" ).slideDown();
      $('#postTweet textarea').select();
      $('#Popup').hide();
      $('#newTweetForm textarea').css('background-color', 'white');

    } else {
      $( "#postTweet" ).slideUp();
      $('#Popup').hide();
      $('#newTweetForm textarea').css('background-color', 'white');

    }
});
  $('#newTweetForm').on('click', function() {
    $('#Popup').hide();
    $('#newTweetForm textarea').css('background-color', 'white');

  });

  $('#newTweetForm').on('submit', function() {
    event.preventDefault();
    let counter = $(this).children('.counter').text();
    if (counter >= 0 && counter < 140) {
      let data = $(this).serialize();
      $(this).children('textarea').val('');
      $(this).children('.counter').text(140);
      $.post('/tweets', data, function(returnData) {
        console.log(returnData);
      $('#tweets-container').prepend(createTweetElement(returnData));

      });
    } else if (counter < 0) {
        $('#Popup').text('Message is to long').show();
        $('#newTweetForm textarea').css('background-color', '#f68181');
    } else {
        $('#Popup').text('Need to enter message to Tweet').show();
        $('#newTweetForm textarea').css('background-color', '#f68181');

    }
  });
});