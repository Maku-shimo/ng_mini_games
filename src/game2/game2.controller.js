(function () {
  'use strict';

  angular.module("Game2")
    .controller("Game2Controller",Game2Controller);

  Game2Controller.$inject = ["$scope"];
  function Game2Controller($scope) {
    var g2Ctrl = this;
    //g2Ctrl.text = "this is TABBBB 2 ";
    g2Ctrl.gameOn 	   = false;
    g2Ctrl.startGame   = startGame;
    g2Ctrl.goodNumber  = 0;
		g2Ctrl.evilNumber  = 0;
    g2Ctrl.goodGuess   = 0;
		g2Ctrl.evilGuess   = 0;
    g2Ctrl.keyClick    = keyClick;
		g2Ctrl.btnOkClick  = btnOkClick;

    function getRandom(num){
      return Math.floor((Math.random()*num));
    }
    
    function startGame () {
      g2Ctrl.gameOn 	  = true;
      g2Ctrl.goodNumber = 0;
			g2Ctrl.evilNumber = 0;
			g2Ctrl.goodGuess  = 0;
			g2Ctrl.evilGuess  = 0;
			g2Ctrl.btnStart   = $('#g2-btn-start');
			g2Ctrl.btnOk	    = $('#GE-ok');

			for(var i=0; i<10; i++){
				g2Ctrl["gKey"+i] = $("#G-key-"+i);
				g2Ctrl["eKey"+i] = $("#E-key-"+i);

				g2Ctrl["gKey"+i].attr('disabled',false);
				g2Ctrl["eKey"+i].attr('disabled',false);
			}

			g2Ctrl.gKeyCancel = $("#G-key-cancel");
			g2Ctrl.eKeyCancel = $("#E-key-cancel");
			g2Ctrl.goodNumberField = $("#goodNumber");
			g2Ctrl.evilNumberField = $("#evilNumber");

			g2Ctrl.gKeyCancel.attr('disabled',false);
			g2Ctrl.eKeyCancel.attr('disabled',false);

			g2Ctrl.goodNumberField.removeClass("rightAnswer");
			g2Ctrl.goodNumberField.removeClass("wrongAnswer");
			g2Ctrl.evilNumberField.removeClass("rightAnswer");
			g2Ctrl.evilNumberField.removeClass("wrongAnswer");

			g2Ctrl.gSelected = false;
			g2Ctrl.eSelected = false;

			g2Ctrl.btnStart.attr('disabled', true);
			g2Ctrl.btnOk.attr('disabled',false);
    }

    function keyClick(good,value){
			if (g2Ctrl.gameOn){

				if (good){
					if(value == -1){
						for(var i=0;i<10;i++){
							g2Ctrl["eKey"+i].attr('disabled',false);
						}
						g2Ctrl.goodNumber = 0;
						g2Ctrl.gSelected  = false;
					}else{
						if (!g2Ctrl.gSelected){
							g2Ctrl["eKey"+value].attr('disabled',true);
							g2Ctrl.goodNumber = value;
							g2Ctrl.gSelected  = true;
						}
					}
				}else{
					if(value == -1){
						for(var i=0;i<10;i++){
							g2Ctrl["gKey"+i].attr('disabled',false);
						}
						g2Ctrl.evilNumber = 0;
						g2Ctrl.eSelected  = false;
					}else{
						if (!g2Ctrl.eSelected){
							g2Ctrl["gKey"+value].attr('disabled',true);
							g2Ctrl.evilNumber = value;
							g2Ctrl.eSelected  = true;
						}
					}
				} //if
			}//if
		} //keyClick

    function btnOkClick(){
			if (g2Ctrl.gameOn){
				guessNumbers();

				if(g2Ctrl.goodNumber == g2Ctrl.goodGuess){
					g2Ctrl.goodNumberField.addClass("rightAnswer");
				}else{
					g2Ctrl.goodNumberField.addClass("wrongAnswer");
				}

				if(g2Ctrl.evilNumber == g2Ctrl.evilGuess){
					g2Ctrl.evilNumberField.addClass("rightAnswer");
				}else{
					g2Ctrl.evilNumberField.addClass("wrongAnswer");
				}

				for (var i = 0; i<10;i++){
					g2Ctrl["gKey"+i].attr('disabled',true);
					g2Ctrl["eKey"+i].attr('disabled',true);
				}

				g2Ctrl.gKeyCancel.attr('disabled',true);
				g2Ctrl.eKeyCancel.attr('disabled',true);

			}
			g2Ctrl.gameOn = false;
			g2Ctrl.btnStart.attr('disabled',false);
			g2Ctrl.btnOk.attr('disabled',true);
		} //btnOkClick

    function guessNumbers(){
			var g = getRandom(10);
			var e = getRandom(10);
			while (g == e){
				e = getRandom(10);
			}
			g2Ctrl.goodGuess = g;
			g2Ctrl.evilGuess = e;
		}

  } // Game2Controller

})();
