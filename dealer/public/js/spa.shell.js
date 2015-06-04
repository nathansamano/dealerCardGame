/* 
 * spa.shell.js
 * Nathan Samano
 * Driver of the app
 * Node Dealer SPA
 */

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
 */

  spa.shell = (function () {
  
  //------------------BEGIN MODULE SCOPE VAR--------------
  
  var
    configMap = {
      main_html : String()
        + '<div class="container main-container" ng-app="dealerApp" ng-controller="dealCtrl">'
          + '<div class="container cardTable"></div>'
          + '<div class="container buttons">'
            + '<button class="dealbtn" ng-click="clickMe($event)">DEAL</button>'
            + '<button class="historicbtn" ng-click="clickMe($event)">SHOW HISTORIC DECKS</button>'
          + '</div>'
          + '<div class="container histDecks"></div>'
        + '</div>'
    },
    stateMap = { $container : null },
    jqueryMap = {},
    hideDiv,
    setJqueryMap, initModule;
  //------------------END MODULE SCOPE VAR----------------

  //------------------BEGIN UTILITY METHODS---------------

  //------------------END UTILITY METHODS-----------------

  //------------------BEGIN DOM METHODS-------------------

  setJqueryMap = function () {
    var $container = stateMap.$container;
    jqueryMap = {
      $container     : $container,
      $main          : $container.find('.main-container'),
      $cardTable     : $container.find('.cardTable'),
      $dealbtn       : $container.find('.dealbtn'),
      $historicbtn   : $container.find('.historicbtn'),
      $histDecks     : $container.find('.histDecks')
    }
  };  // end setJqueryMap

  //------------------END DOM METHODS---------------------
  
  //------------------BEGIN EVENT HANDLERS----------------
  
  // deal the cards
  deal = function( event ) {
    console.log("Deal clicked");

    // append the dealt out cards
    jqueryMap.$main.append(card_table_form( jqueryMap ));
    jqueryMap.$dealbtn.html("Deal Again");
  }

  showHistDecks = function( event ) {
    console.log("showHistDecks clicked");

    jqueryMap.$histDecks.show();
  }

  // deal method for angular button
  angular.module('dealerApp', [])
  .controller('dealCtrl', ['$scope', function($scope) {
    //$scope.message = "";

    $scope.clickMe = function(clickEvent) {

      $scope.clickEvent = deal(clickEvent);
      console.log(clickEvent, "kljfsdljljklflsjfd");

      //jqueryMap.$main.append(card_table_form( jqueryMap ));
      //$scope.message = "clicked deal";
      //console.log("logging click deal");
    };

    //$scope.deal();
  }]);

  //------------------END EVENT HANDLERS------------------
  
  //------------------BEGIN PUBLIC METHODS----------------
  
  initModule = function ( $container ) {
    stateMap.$container = $container;
    $container.html( configMap.main_html );
    setJqueryMap();

    //jqueryMap.$main.append(card_table_form( jqueryMap ));
    
    jqueryMap.$histDecks.hide();
    jqueryMap.$dealbtn.click(deal);
    jqueryMap.$historicbtn.click(showHistDecks);


    angular.module('dealerApp', [])
  .controller('dealCtrl', ['$scope', function($scope) {
    //$scope.message = "";

    $scope.clickMe = function(clickEvent) {

      $scope.clickEvent = deal(clickEvent);
      console.log(clickEvent);

      //jqueryMap.$main.append(card_table_form( jqueryMap ));
      //$scope.message = "clicked deal";
      //console.log("logging click deal");
    };

    //$scope.deal();
  }]);


    // deal method for angular button
    /*angular.module('dealerApp', [])
    .controller('dealCtrl', function($scope) {
      $scope.deal = function() {
        $scope.message = "clicked deal";
        console.log("logging click deal");
      };
      //$scope.deal();
    });*/

  };
  

  return { initModule : initModule };
  //------------------END PUBLIC METHODS------------------

}());
