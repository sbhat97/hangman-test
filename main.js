//gobal variables
var wordsArray = ["pandemic","dolphin","consulting","tiktok famous","chimichurri","georgia","tillamook","fermentation","spirit airlines","bohemian rhapsody","shia labeouf","smoked salmon","shambles","rotten egg","nicki minaj","soft serve","humpty dumpty","quasimodo","absentee ballot","pictionary","social distancing"]
let indices = [];
let replacePlaceholder = "";
let letter = '';
let wrongAttempts = '';
let attemptsRem = 10;
var overlay = document.getElementById('overlay')
var messageWin = document.getElementById('youWin')
var messageLose = document.getElementById('youLose')
let counter = 0;

//choose a random word from array
  var index = Math.floor(wordsArray.length * Math.random())
  var answer = wordsArray[index]

//creating space and underscore variables to use in the placeholder for the answer
  var blank = '_';
  var space = ' ';

//checking it it's a two-word or one-word answer
//if two words, split to determine length of each words
//else simply determine length of one word and create placeholder blanks accordingly

  if (answer.indexOf(' ') >= 0){
    twoWords = answer.split(' ')
    lengthOne = twoWords[0].length;
    lengthTwo = twoWords[1].length;

    wordOne = blank.repeat(lengthOne);
    wordTwo = blank.repeat(lengthTwo);
    placeholder = wordOne.concat(space,wordTwo);
    wordCount = 2;
  } else {
    lengthOne = answer.length;
    placeholder = blank.repeat(lengthOne);
    wordCount = 1;
  }

  wc = wordCount + ('-Word Answer')

  document.getElementById("placeHolder").innerHTML = placeholder;
  document.getElementById("wordCount").innerHTML = wc;

//listen for key press and check if user's guess is right or wrong
  window.addEventListener('keypress', function(e){
    valPressed = e.keyCode;
    console.log(e.keyCode)
    indices = [];
    replacePlaceholder = "";

    //
    if (valPressed >= 97 && valPressed <= 122) {
      letter = String.fromCharCode(valPressed)
      if (answer.indexOf(letter) >= 0){
        //looping through the answer to find all indices of a match for the letter that was guessed
        for (i = 0; i < answer.length; i++){

          if (answer[i] === letter){
            indices.push(i)
          }
        }
        //rewrite placeholder value to replace the blank "_" with guessed letter and update in the UI
      for (i=0;i<answer.length;i++){

        if (indices.indexOf(i) >= 0){
          replacePlaceholder = replacePlaceholder + letter;
        } else {
          replacePlaceholder = replacePlaceholder + placeholder[i];
        }
      }
      //has this letter already been tried? we don't want to have any "dings" or show another "you win" if it has
      check = placeholder.indexOf(letter)>=0;

      //update placeholder value only if player hasn't already lost
      if (attemptsRem > 0) {
      placeholder = replacePlaceholder;
      }

      //play a ding sound because the player got a letter right
      if (attemptsRem > 0 && !check) {
      var ding = new Audio('Ding1.mp3')
      ding.play()
    }

      document.getElementById("placeHolder").innerHTML = placeholder;

      //if there are no more blanks left and the user wins, throw a "you win" message (only have the ding & message if the user hasn't already tried that letter)
      if (!(placeholder.indexOf('_') >= 0) && !check){
        overlay.classList.add('active')
        messageWin.classList.add('active')
      }

//if the player's guess is WRONG:
      } else {
        //keep a count of the number of letters attempted so you only throw the "you lose" message after the 10th wrong attempt (rather than the 11th,12th,etc)
        //before the play has lost only add to the counter with every NEW attempt
        isNew = !(wrongAttempts.indexOf(letter)>=0);
        if (attemptsRem > 0 && !(wrongAttempts.indexOf(letter)>=0)){
          counter++
        }
        //after the player has lost, add to the counter with every single wrong attempt
        if (attemptsRem == 0){
          counter++
        }
      //add to the "wrong attempts" String
      //subtract from attempts Remaining
      //update the hangman figure
        if (placeholder.indexOf('_')>=0 && attemptsRem > 0 && !(wrongAttempts.indexOf(letter) >=0)){
          wrongAttempts = wrongAttempts + letter
          document.getElementById("attempts").innerHTML = wrongAttempts;
          attemptsRem--
          document.getElementById("remaining").innerHTML = ('Attempts Remaining: ' + attemptsRem);
          //read how many attempts are in wrong attempts, call an image accordingly
          let im = document.getElementById("figure");
          im.src = "figure" + wrongAttempts.length + ".png";
        }

        //check to see if attempts remaining = 0...if so, show "YOU LOSE" (but don't keep showing message after player has lost once)
        if (attemptsRem == 0 && counter ==10){
          overlay.classList.add('active')
          document.getElementById("sorry").innerHTML = ('Sorry, you lose. <br> The correct answer is ' +answer);
          messageLose.classList.add('active')

          //play "uh oh" audiot because the player guessed incorrectly
        }
        //if player has not already won, and if player has not already gotten the "you lose" message, play "uh oh"
        if (counter<11 && placeholder.indexOf('_')>=0 && isNew){
        var uhoh = new Audio('uhoh1.mp3')
        uhoh.play()
        }

    }

  }
  })
  //reload the page on click of "Start Over" button
  var restart = document.getElementById('startOver')
  restart.addEventListener('click',function(){location.reload()});

  //exit the pop-up messages when the "x" button is clicked
  document.getElementById("close1").addEventListener('click', function(){
    overlay.classList.remove('active')
    messageWin.classList.remove('active')
  })

  document.getElementById("close2").addEventListener('click', function(){
    overlay.classList.remove('active')
    messageLose.classList.remove('active')
  })

  //exit the pop-up overlay when it is clicked on
  document.getElementById("overlay").addEventListener('click', function(){
    overlay.classList.remove('active')
    messageWin.classList.remove('active')
    messageLose.classList.remove('active')
  })
