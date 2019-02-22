/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(() => {
  function createTweetElement(data) {
   let currentDate = new Date(Date.now());
    let tweetDate = new Date(data.created_at);
    let numYear = currentDate.getFullYear() - tweetDate.getFullYear();
    let numMonths = currentDate.getMonth() - tweetDate.getMonth();
    let numDays = currentDate.getDate() - tweetDate.getDate();
    let numHours = currentDate.getHours() - tweetDate.getHours();
    let numMin = currentDate.getMinutes() - tweetDate.getMinutes();

    let displayDate;
      const resolveS = (num) => num !== 1 ? 's' : '';
      if (numYear >= 1) {
        displayDate = `${numYear} year${resolveS(numYear)} ago`;
      } else if (numMonths >= 1) {
        displayDate = `${numMonths} month${resolveS(numMonths)} ago`;
      } else if (numDays >= 1) {
        displayDate = `${numDays} day${resolveS(numDays)} ago`;
      } else if (numHours >= 1) {
        displayDate = `${numHours} hour${resolveS(numHours)} ago`;
      } else if (numMin >= 1) {
        displayDate = `${numMin} minute${resolveS(numMin)} ago`;
      } else {
        displayDate = 'Recent Post';
      }
    let $tweet = $("<article>").addClass("new-tweet");
    let $header = $("<header>").append($('<img>').attr('alt', 'Profile Pic').attr('src', data.user.avatars.small))
                                .append($('<h4>').text(data.user.name))
                                .append($('<p>').text(data.user.handle));


    let $middleDiv = $("<div>").append($('<p>').text(data.content.text));

    let $footer = $("<footer>")
                                .append($('<p>').text(displayDate))
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