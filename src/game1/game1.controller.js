(function () {
  'use strict';

  angular.module("Game1")
    .controller("Game1Controller",Game1Controller);

  Game1Controller.$inject = ["$scope"];
  function Game1Controller($scope) {
    var g1Ctrl = this;
    //g1Ctrl.text = "This is tab1";
    g1Ctrl.correctCount 		= 0;
		g1Ctrl.uncorrectCount 	= 0;
    g1Ctrl.resultCount		  = "0.0 %";
    g1Ctrl.blackClick       = blackClick;
    g1Ctrl.whiteClick       = whiteClick;

    g1Ctrl.used 				    = 0;
    g1Ctrl.resultClick      = resultClick;
    g1Ctrl.result           = "?";
    g1Ctrl.rightWrong       = "";

    g1Ctrl.atemptsOnChange  = atemptsOnChange;
    g1Ctrl.atempts          = 0;
    g1Ctrl.startGame1       = startGame1;
    g1Ctrl.status           = "";

    function getRandom(num){
      return Math.floor((Math.random()*num));
    }
    
    function blackClick () {
      if (g1Ctrl.gameOn){

				showAnswer();

				processClick(1);

				findResultCount();

				checkGame1Over();
			}
    }

    function whiteClick() {
      if (g1Ctrl.gameOn){

				showAnswer();

				processClick(0);

				findResultCount();

				checkGame1Over();
			}
    }

    function resultClick() {
      if (g1Ctrl.gameOn){
				g1Ctrl.color 		= -1;
				g1Ctrl.result 		= "?";
				g1Ctrl.rightWrong 	= "";
				showAnswer();
				prepareColor();
			}
    }

    function atemptsOnChange() {
      if (!g1Ctrl.btnStart){
				g1Ctrl.btnStart = $("#g1-btn-start");
			}

      console.log('atempts change',g1Ctrl.btnStart);

			if (!g1Ctrl.atemptsField){
				g1Ctrl.atemptsField = $("#atempts");
			}

			if (g1Ctrl.atempts < 0){
				g1Ctrl.atempts = 0;
			}

			console.log(g1Ctrl.atempts);

			if(g1Ctrl.atempts <= 0){
				g1Ctrl.btnStart.attr('disabled',true);
			}else{
				g1Ctrl.btnStart.attr('disabled',false);
			}
    }

    function startGame1() {
      if (g1Ctrl.atempts <= 0){
				g1Ctrl.status = "не указано всего попыток";
			}else{
				if (!g1Ctrl.gameOn){
					g1Ctrl.rightWrong 		  = "";
					g1Ctrl.used				      = 0;
					g1Ctrl.correctCount 	  = 0;
					g1Ctrl.uncorrectCount   = 0;
					g1Ctrl.resultCount		  = "0.0 %";
					g1Ctrl.status 			    = "ИГРА ИДЕТ";
					g1Ctrl.gameOn 			    = true;
					g1Ctrl.blackWhiteLocked = false;
					g1Ctrl.color			      = -1;
					g1Ctrl.result 			    = "?";

					g1Ctrl.btnStart.hide();
					g1Ctrl.atemptsField.attr("disabled",true);

					if(!g1Ctrl.fldResult){
						g1Ctrl.fldResult = $("#result");
					}

					showAnswer();
					prepareColor();
				}
			}
    }

    function prepareColor(){
			var a = getRandom(1000);

			if (a%2==0){
        g1Ctrl.color = 0;
      }
			else { g1Ctrl.color = 1; }

			g1Ctrl.blackWhiteLocked = false;
		}

    function showAnswer(){
			if(g1Ctrl.color == 0){
				g1Ctrl.fldResult.css('background-color','white');
			}else if (g1Ctrl.color == 1){
				g1Ctrl.fldResult.css('background-color','black');
			}else{
				g1Ctrl.fldResult.css('background-color','grey');
			}
		}

    function processClick(rightAnswer){
			if (!g1Ctrl.blackWhiteLocked){
				g1Ctrl.used += 1;

				if (g1Ctrl.color == rightAnswer){
					g1Ctrl.rightWrong = "icons/img_yes.bmp"//"Верно";
					g1Ctrl.correctCount += 1;
				}else{
					g1Ctrl.rightWrong = "icons/img_no1.bmp"//"Не верно";
					g1Ctrl.uncorrectCount += 1;
				}
			}
			g1Ctrl.blackWhiteLocked = true;
			g1Ctrl.result = "";
		}

    function findResultCount(){
    		g1Ctrl.resultCount = "" + (100*g1Ctrl.correctCount / g1Ctrl.used).toFixed(2) + " %";
    }

    function checkGame1Over(){
			if(g1Ctrl.used == g1Ctrl.atempts){
				g1Ctrl.gameOn = false;
				g1Ctrl.status = "ИГРА ЗАКОНЧЕНА";
				g1Ctrl.btnStart.show();
				g1Ctrl.atemptsField.attr("disabled",false);
			}
		}

  }
})();
