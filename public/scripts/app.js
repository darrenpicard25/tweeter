/*
Main Front side Scripting
-----------------------------------------------------------------------
*/
$(() => {
  function createTweetElement(data) {
    //These first lines grab the date and do some testing to insure that the
    //time stamps displayed under the tweet is accurate
   let currentDate = new Date(Date.now());
    let tweetDate = new Date(data.created_at);
    let numYear = currentDate.getFullYear() - tweetDate.getFullYear();
    let numMonths = currentDate.getMonth() - tweetDate.getMonth();
    let numDays = currentDate.getDate() - tweetDate.getDate();
    let numHours = currentDate.getHours() - tweetDate.getHours();
    let numMin = currentDate.getMinutes() - tweetDate.getMinutes();
    let displayDate;
      const resolveS = (num) => num !== 1 ? 's' : ''; //This just checks if an 's' should be added to the string
      //All this is just comparing the numbers from above to determine the amount of time that has passed
      //Set displayDate to string
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
    //This creates the Jquery object that will be appended
    //Adds the appropriate information depending on the object passed into the function
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

//Loads all the tweets stored in the database
  function loadTweets() {
    $.get('/tweets').then(function (tweetData) {
      renderTweets(tweetData);
    });
  }

  //This just loads the tweets to the main page when the page loads/refreshs
  loadTweets();


//This is the functionality of the 'Compose' Button
  $('#toggle-button').click(function() {
    //If the post spot is hidden and the buttons clicked it shows up
    if ( $( "#postTweet" ).is( ":hidden" ) ) {
      $( "#postTweet" ).slideDown();
      $('#postTweet textarea').select();
      $('#Popup').hide();
      $('#newTweetForm textarea').css('background-color', 'white');
      //If its down and buttons clicked. Then it goes up
    } else {
      $( "#postTweet" ).slideUp();
      $('#Popup').hide();
      $('#newTweetForm textarea').css('background-color', 'white');
    }
  });

//This Jquery is just the convert the textarea back to white if it was red from the error
  $('#newTweetForm').on('click', function() {
    $('#Popup').hide();
    $('#newTweetForm textarea').css('background-color', 'white');

  });

//This Jquery is for on the submit of the tweet
  $('#newTweetForm').on('submit', function() {
    event.preventDefault();
    let counter = $(this).children('.counter').text(); //Grabs the value in the counter
    //Checks to see if its empty or to full. If its not then we can send the post request
    if (counter >= 0 && counter < 140) {
      let data = $(this).serialize();
      $(this).children('textarea').val('');
      $(this).children('.counter').text(140);
      $.post('/tweets', data, function(returnData) {
      $('#tweets-container').prepend(createTweetElement(returnData));

      });
    //If it is empty or to much then we check which one it is and display the appropriate message
    } else if (counter < 0) {
        $('#Popup').text('Message is to long').show();
        $('#newTweetForm textarea').css('background-color', '#f68181');
    } else {
        $('#Popup').text('Need to enter message to Tweet').show();
        $('#newTweetForm textarea').css('background-color', '#f68181');

    }
  });
});