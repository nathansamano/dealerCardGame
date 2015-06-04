/* cardTable.js
 * Nathan Samano
 * created 5/8/2015
 * contains the logic for the card game
 */

// where I store historic decks
var fakedb = [],
    hist_earned_points = 0,
    hist_possible_points = 0,
    hist_score = 0,
    count = 0;

card_table_form = function( jqueryMap ) {
  console.log("card_table_form");
  
  //-----------------BEGIN CARD GAME IMPLEMENTATION-----------------

  var deck  = [],           // standard 52 card deck
      board = [],           // the dealt out cards
      score_template  = [], // 100% score board template
      possible_points = 104,
      earned_points   =   0,
      SPADE   = 0,  
      DIAMOND = 1,  
      HEART   = 2,  
      CLUB    = 3,
      ACE     = 1,
      TEN     = 10,
      JACK    = 11,
      QUEEN   = 12,
      KING    = 13;

  function Card(value, suit) {
    this.value = value;
    this.suit = suit;
  }

  console.log("Making Deck And Template!");

  (function makeDeckAndTemplate() {
  	var maxCardValue = 13,
  	    numSuits = 4,
        tempCard, tempSuit, tempVal;

    // loop through all card values
  	for (var suit = 0; suit < numSuits; suit++) {
      // initialize scoring template matrix
      score_template[suit] = [];
      // loop through all 4 suits
      for (var value = 0; value < maxCardValue; value++) {
        // create card and push it to array
        tempCard = new Card(value + 1, suit);
        // set suits and face cards to string values
        if (tempCard.value == ACE) tempCard.value = "A";
        else if (tempCard.value == TEN) tempCard.value = "T";
        else if (tempCard.value == JACK) tempCard.value = "J";
        else if (tempCard.value == QUEEN) tempCard.value = "Q";
        else if (tempCard.value == KING) tempCard.value = "K";
        if (tempCard.suit == SPADE) tempCard.suit = "S";
        else if (tempCard.suit == DIAMOND) tempCard.suit = "D";
        else if (tempCard.suit == HEART) tempCard.suit = "H";
        else if (tempCard.suit == CLUB) tempCard.suit = "C";
        console.log(tempCard);
        deck.push(tempCard);

        // set the score_template as the cards are being created
        // since they're already being created in order
        score_template[suit][value] = tempCard;
        console.log(score_template[suit][value], suit, value, "score_template");
      }
  	} // end for

  })(); // makeDeckAndTemplate()


  // shuffle deck
  (function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  })(deck); // shuffle()

  console.log("suffling deck!");

  // print shuffled deck
  for (var i = 0; i < deck.length; i++) {
    console.log(deck[i], i);
  }

  console.log("Dealing Cards!");

  // matrix of 13 columns by 4 rows
  (function deal() {
    var numColumns = 13,
        numRows    = 4;
        colCount = 0;

    for (var row = 0; row < numRows; row++) {
      board[row] = [];
      for (var col = 0; col < numColumns; col++) {
        board[row][col] = deck[colCount++];
        console.log(board[row][col], row, col);
      }
    }
  })(); // deal()


 /********************* SCORING ********************
  *                                                *
  *       A  2  3  4  5  6  7  8  9  T  J  Q  K    *
  *   (S)[A][2][3][4][5][6][7][8][9][T][J][Q][K]   *
  *   (D)[A][2][3][4][5][6][7][8][9][T][J][Q][K]   *
  *   (H)[A][2][3][4][5][6][7][8][9][T][J][Q][K]   *
  *   (C)[A][2][3][4][5][6][7][8][9][T][J][Q][K]   *
  *                                                *
  *   One point is awarded if a given card's face  *
  *  value or suit matches its column or row value *
  *      with the above diagram respectively.      *
  **************************************************/

  console.log("<<<<<<<<<<<<<<<SCORING BOARD!>>>>>>>>>>>>>>>");

  var score = (function () {
    var numColumns = 13,
        numRows    = 4,
        score_pct;

    // compare board with score_template
    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numColumns; col++) {

        console.log("Comparing", board[row][col],
                    "with", score_template[row][col]);
        
        if (board[row][col].suit == score_template[row][col].suit){
          console.log("checking board suit", board[row][col].suit);
          earned_points++;
        }
        if (board[row][col].value == score_template[row][col].value) {
          console.log("checking board value", board[row][col].value);
          earned_points++;
        }
      }
    }

    return function () {return score_pct = Math.round((earned_points / possible_points) *100);}

  })(); // score()


  (function saveToFakeDB() {
    // fakedb[dealt deck & score][0=dealt deck, 1=score][row][col]
    console.log("fakedblength before", fakedb.length);
    var arr = [];
    arr[0] = board;
    arr[1] = score();
    fakedb[fakedb.length] = arr;
    console.log(fakedb[0][0][0][0], fakedb.toString());
    console.log("checking value and suit of first card " + fakedb[0][0][0][0].value, fakedb[0][0][0][0].suit);
    console.log("fakedblength after", fakedb.length);
  })();

  //-----------------END CARD GAME IMPLEMENTATION-----------------

  //-----------------BEGIN ADDING RESULTS TO SPA------------------

  // for current deck
  $('.cardTable').empty();
  $('.cardTable').append(
    '<p class="dealt_boardH"></p>'
  );

  // create divs for board
  var cardCount = 0;
  for (var row = 0; row < 4; row++) {
    $('.cardTable').append(
      '<div class="dealt_board'+row+'"></div>'
    );

    if (row == SPADE)   var dealt_board = "(S) ";
    if (row == DIAMOND) var dealt_board = "(D) ";
    if (row == HEART)   var dealt_board = "(H) ";
    if (row == CLUB)    var dealt_board = "(C) ";

    for (var col = 0; col < 14; col++) {
      $('.dealt_board'.concat(row)).append(
        '<div class="valuediv'+cardCount+'"></div>'
      );
      $('.valuediv'.concat(cardCount)).html(dealt_board);

      if (col < 13) {
        if (col == 0) var scol = col;
        else var scol = col - 1;

        /** Highlight adjacent pairs, triplets, and quads (hor,vert,diag) **/

        // value is matched
        if (dealt_board == score_template[row][scol].value + dealt_board[1].match(/[SDHC]/) + "-") {
          $('.valuediv'.concat(cardCount)).css("background-color","red");
        }
        // suit is matched
        if (dealt_board == dealt_board[0].match(/[0-9,TJQK]/) + score_template[row][scol].suit + "-") {
          $('.valuediv'.concat(cardCount)).css("background-color","yellow");
        }
        // both value and suit are matched
        if (dealt_board
          == score_template[row][scol].value + score_template[row][scol].suit + "-") {
            console.log(dealt_board + "<<<>>>><<<>>><<<>>" + score_template[row][col].value + score_template[row][col].suit + "-");
            $('.valuediv'.concat(cardCount)).css("background-color","green");
        }
   
        /*******************************************************************/

        // get board values to display
        dealt_board = board[row][col].value + board[row][col].suit + "-";

        console.log(score_template[row][col].value + score_template[row][col].suit + "-");

      }
      cardCount++;
    }
  }


  // if match is not adjacent to another match, unhighlight
  var traverse = cardCount;
  var bcolor = "white";

  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 14; col++) {

      // variables to test if div background color is white; if statements needed to stay in the defined range of divs from 0-52
      if (traverse >= 15)
        var topleft  = $('.valuediv'.concat(traverse-15)).css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i);
      if (traverse >= 14)
        var top      = $('.valuediv'.concat(traverse-14)).css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i);
      if (traverse >= 13)
        var topright = $('.valuediv'.concat(traverse-13)).css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i);
      
      if (traverse > 0)
        var left     = $('.valuediv'.concat(traverse-1)).css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i);
      
      if (traverse < 52)
        var right    = $('.valuediv'.concat(traverse+1)).css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i);
      
      if (traverse < 40)
        var botleft  = $('.valuediv'.concat(traverse+13)).css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i);
      if (traverse < 39)
        var bot      = $('.valuediv'.concat(traverse+14)).css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i);
      if (traverse < 38)
        var botright = $('.valuediv'.concat(traverse+15)).css("background-color").match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i);

      
      // top left corner
      if (traverse == 1) {
        if (right && bot && botright)
          $('.valuediv'.concat(traverse)).css("background-color", bcolor);
      }
      // top middle
      if (traverse > 1 && traverse < 13) {
        if (left && right && botleft && bot && botright)
          $('.valuediv'.concat(traverse)).css("background-color", bcolor);
      }
      // top right corner
      if (traverse == 13) {
        if (left && botleft && bot)
          $('.valuediv'.concat(traverse)).css("background-color", bcolor);
      }
      // left side
      if (traverse == 15 || traverse == 29) {
        if (top && topright && right && bot && botright)
          $('.valuediv'.concat(traverse)).css("background-color", bcolor);
      }
      // middle
      if (traverse > 15 && traverse < 41) {
        if (topleft && top && topright && left && right && botleft && bot && botright)
          $('.valuediv'.concat(traverse)).css("background-color", bcolor);
      }
      // right side
      if (traverse == 27 || traverse ==41) {
        if (topleft && top && left && botleft && bot)
          $('.valuediv'.concat(traverse)).css("background-color", bcolor);
      }
      // bottom left corner
      if (traverse == 43) {
        if (top && topright && right)
          $('.valuediv'.concat(traverse)).css("background-color", bcolor);
      }
      // bottom middle
      if (traverse > 43 && traverse < 52) {
        if (topleft && top && topright && left && right)
          $('.valuediv'.concat(traverse)).css("background-color", bcolor);
      }
      // bottom right corner
      if (traverse == 52) {
        if (topleft && top && left)
          $('.valuediv'.concat(traverse)).css("background-color", bcolor);
      }

      traverse--;
    }
  }


  // heading for board
  $('.dealt_boardH').html("(-)-A -2 -3 -4 -5 -6 -7 -8 -9 -T -J -Q -K");

  // get results and print them
  var results = score() + "% " + earned_points + "/" + possible_points;
  console.log(results);

  hist_earned_points   = hist_earned_points   + earned_points;
  hist_possible_points = hist_possible_points + possible_points;
  hist_score           = Math.round((hist_earned_points / hist_possible_points) * 100);
  
  var hist_results = hist_score + "% " + hist_earned_points + "/" + hist_possible_points;
  console.log(hist_results);
  $('.cardTable').append('<p class="results"></p>');
  $('.results').html("Current results: " + results + " - " + "Total average results: " + hist_results);


  /********************** For Historic Decks *********************/
  
  // keep track of number of deals
  count++;
  console.log(count);

  // for every board dealt
  for (var i = 0; i < count; i++) {

    if (i == 0) $('.histDecks').empty(); // empty so historic decks only appear once

  }

  // print out historic decks just like the current deck
  for (var i = 0; i < fakedb.length; i++) {
    $('.histDecks').append('<p class="hdealt_boardH"></p>');
    $('.hdealt_boardH').html("(-)-A -2 -3 -4 -5 -6 -7 -8 -9 -T -J -Q -K");

    // print dealt cards on SPA in 4 rows 13 columns
    for (var row = 0; row < 4; row++) {
      $('.histDecks').append(
        '<div class="hdealt_board'+row+i+'"></div>'
      )
      if (row == SPADE)   var dealt_board = "(S) ";
      if (row == DIAMOND) var dealt_board = "(D) ";
      if (row == HEART)   var dealt_board = "(H) ";
      if (row == CLUB)    var dealt_board = "(C) ";
      for (var col = 0; col < 14; col++) {

        $('.hdealt_board'.concat(row,i)).append(
          '<div class="valuediv'+cardCount+'"></div>'
        )
        $('.valuediv'.concat(cardCount)).html(dealt_board);
        if (col < 13)
          dealt_board = fakedb[i][0][row][col].value + fakedb[i][0][row][col].suit + "-";
        cardCount++;
      }
      console.log(dealt_board);
    }

    var results = fakedb[i][1];
    $('.histDecks').append('<p class="hresults'+i+'"></p>');
    $('.hresults'.concat(i)).html("This deal's results: " + results + "%");

  } // for fakedb

  //------------------END ADDING RESULTS TO SPA-------------------

} // end card_table_form

