(function(){
"use strict"

	//console.log("ANGULAR");
	
	angular.module('makushimoGames',[])
	
	.controller("mainController",mainController)
	//GAME Black & White
	.controller("game1Controller",game1Controller)
	//GAME Good & Evil
	.controller("game2Controller",game2Controller);
	
	function getRandom(num){
		return Math.floor((Math.random()*num));
	}
	
	mainController.$inject = ['$scope','$window'];
	function mainController($scope,$window){
		
		var mainCtrl = this;
		
		var tabs 	= $("#tabs");
		var content = $("#tabsContent");
		
		tabs.delegate("li","click",function(){
				var tabName = $(this).attr("data-tab");
				tabs.trigger("change.tabs",tabName);
			});
			
			tabs.bind("change.tabs",function(e,tabName){
				tabs.find("li").removeClass("active");
				tabs.find(">[data-tab='"+tabName+"']").addClass("active");
				
				content.find(">[data-tab]").removeClass("active");
				content.find(">[data-tab='"+tabName+"']").addClass("active");
				
				$window.location.hash = tabName;
			});
			
			var firstTab = tabs.find("li:first").attr("data-tab");
			tabs.trigger("change.tabs",firstTab);
			
			$(window).bind("hashchange",function(){
				var tabName = $window.location.hash.slice(1);
				tabs.trigger("change.tabs",tabName);
			});
	
	}; //mainController
	
	game1Controller.$inject = ['$scope'];
	function game1Controller($scope){
		
		var game1 = this;
		
		game1.rightWrong 		= "";
		game1.used 				= 0;
		game1.result 			= "?";
		game1.resultClick		= resultClick;
		game1.atempts 			= 0;
		game1.atemptsOnChange	= atemptsOnChange;
		game1.startGame1 		= startGame1;
		game1.status			= "";
		game1.correctCount 		= 0;
		game1.uncorrectCount 	= 0;
		game1.resultCount		= "0.0 %";
		game1.blackClick		= blackClick;
		game1.whiteClick		= whiteClick;
		game1.gameOn			= false;
		
		function atemptsOnChange(){
			
			if (!game1.btnStart){
				game1.btnStart = $("#g1-btn-start");				
			}
			
			if (!game1.atemptsField){
				game1.atemptsField = $("#atempts");
			}
			
			if (game1.atempts < 0){
				game1.atempts = 0;
			}
				
			console.log(game1.atempts);		
				
			if(game1.atempts <= 0){
				game1.btnStart.attr('disabled',true);				
			}else{
				game1.btnStart.attr('disabled',false);
			}
		}
		
		function startGame1(){
			if (game1.atempts <= 0){
				game1.status = "не указано всего попыток";
			}else{
				if (!game1.gameOn){
					game1.rightWrong 		= "";
					game1.used				= 0;
					game1.correctCount 	= 0;
					game1.uncorrectCount 	= 0;
					game1.resultCount		= "0.0 %";
					game1.status 			= "ИГРА ИДЕТ";
					game1.gameOn 			= true;
					game1.blackWhiteLocked = false;
					game1.color			= -1;
					game1.result 			= "?";
					
					game1.btnStart.hide();					
					game1.atemptsField.attr("disabled",true);
					
					if(!game1.fldResult){
						game1.fldResult = $("#result");
					}
					
					showAnswer();	
					prepareColor();
				}
			}
		}
		
		function resultClick(){
			if (game1.gameOn){
				game1.color 		= -1;
				game1.result 		= "?";
				game1.rightWrong 	= "";
				showAnswer();
				prepareColor();
			}			
		}
		
		function blackClick(){
			if (game1.gameOn){

				showAnswer();
				
				processClick(1);
									
				findResultCount();
					
				checkGame1Over();
			}
		}
		
		function whiteClick(){
			if (game1.gameOn){
			
				showAnswer();
			
				processClick(0);
												
				findResultCount();
				
				checkGame1Over();
			}			
		} //whiteClick		
		
		function prepareColor(){
			var a = getRandom(1000);
			
			if (a%2==0){game1.color = 0;}
			else { game1.color = 1; }
			
			game1.blackWhiteLocked = false;
		}
		
		function showAnswer(){
			if(game1.color == 0){
				game1.fldResult.css('background-color','white');
			}else if (game1.color == 1){
				game1.fldResult.css('background-color','black');
			}else{
				game1.fldResult.css('background-color','grey');
			}
		}
		
		function processClick(rightAnswer){
			if (!game1.blackWhiteLocked){
				game1.used += 1;				
						
				if (game1.color == rightAnswer){
					game1.rightWrong = "icons/img_yes.bmp"//"Верно";
					game1.correctCount += 1;
				}else{
					game1.rightWrong = "icons/img_no1.bmp"//"Не верно";
					game1.uncorrectCount += 1;
				}
			}
			game1.blackWhiteLocked = true;
			game1.result = "";
		}
		
		function checkGame1Over(){
			if(game1.used == game1.atempts){
				game1.gameOn = false;
				game1.status = "ИГРА ЗАКОНЧЕНА";
				game1.btnStart.show();
				game1.atemptsField.attr("disabled",false);
			}				
		}
		
		function findResultCount(){
			game1.resultCount = "" + (100*game1.correctCount / game1.used).toFixed(2) + " %";
		}
		
	} // game1Controller
	
	game2Controller.$inject = ['$scope'];
	function game2Controller($scope){
		
		var game2 = this;
		
		game2.goodNumber = 0;
		game2.evilNumber = 0;
		game2.goodGuess  = 0;
		game2.evilGuess  = 0;
		game2.gameOn 	  = false;
		
		game2.startGame2 = startGame2;
		game2.keyClick   = keyClick;
		game2.btnOkClick = btnOkClick;
		
		function startGame2(){
			game2.goodNumber = 0;
			game2.evilNumber = 0;
			game2.goodGuess  = 0;
			game2.evilGuess  = 0;	
			game2.btnStart   = $('#g2-btn-start');
			game2.btnOk	  = $('#GE-ok');
			game2.gameOn 	  = true;
				
			for(var i=0;i<10;i++){
				game2["gKey"+i] = $("#G-key-"+i);
				game2["eKey"+i] = $("#E-key-"+i);
				
				game2["gKey"+i].attr('disabled',false);
				game2["eKey"+i].attr('disabled',false);
			}
			
			game2.gKeyCancel = $("#G-key-cancel");
			game2.eKeyCancel = $("#E-key-cancel");
			game2.goodNumberField = $("#goodNumber");
			game2.evilNumberField = $("#evilNumber");

			game2.gKeyCancel.attr('disabled',false);
			game2.eKeyCancel.attr('disabled',false);			
			
			game2.goodNumberField.removeClass("rightAnswer");
			game2.goodNumberField.removeClass("wrongAnswer");
			game2.evilNumberField.removeClass("rightAnswer");
			game2.evilNumberField.removeClass("wrongAnswer");
						
			game2.gSelected = false;
			game2.eSelected = false;
						
			game2.btnStart.attr('disabled', true);
			game2.btnOk.attr('disabled',false);
		};
	
		function guessNumbers(){
			var g = getRandom(10);
			var e = getRandom(10);
			while (g == e){
				e = getRandom(10);
			}
			game2.goodGuess = g;
			game2.evilGuess = e;
		}
	
		function keyClick(good,value){
			if (game2.gameOn){
				
				if (good){
					if(value == -1){
						for(var i=0;i<10;i++){
							game2["eKey"+i].attr('disabled',false);
						}				
						game2.goodNumber 	= 0;
						game2.gSelected = false;
					}else{
						if (!game2.gSelected){
							game2["eKey"+value].attr('disabled',true);
							game2.goodNumber = value;
							game2.gSelected = true;
						}
					}
				}else{
					if(value == -1){						
						for(var i=0;i<10;i++){
							game2["gKey"+i].attr('disabled',false);
						}
						game2.evilNumber = 0;
						game2.eSelected = false;
					}else{
						if (!game2.eSelected){
							game2["gKey"+value].attr('disabled',true);
							game2.evilNumber = value;
							game2.eSelected = true;
						}
					}
				}
				
			}
		};
	
		function btnOkClick(){
			if (game2.gameOn){
				guessNumbers();
				
				if(game2.goodNumber == game2.goodGuess){
					game2.goodNumberField.addClass("rightAnswer");
				}else{
					game2.goodNumberField.addClass("wrongAnswer");
				}
				
				if(game2.evilNumber == game2.evilGuess){
					game2.evilNumberField.addClass("rightAnswer");
				}else{
					game2.evilNumberField.addClass("wrongAnswer");
				}
				
				for (var i = 0; i<10;i++){			
					game2["gKey"+i].attr('disabled',true);
					game2["eKey"+i].attr('disabled',true);
				}
				
				game2.gKeyCancel.attr('disabled',true);
				game2.eKeyCancel.attr('disabled',true);			
				
			}
			game2.gameOn = false;
			game2.btnStart.attr('disabled',false);
			game2.btnOk.attr('disabled',true);
		};
	
	}; //game2Controller
	
		
})();
