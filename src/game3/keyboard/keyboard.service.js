'use strict';

angular.module('Keyboard',[])
	.service('KeyboardService',keyboardService);

keyboardService.$inject = ['$document'];
function keyboardService($document) {

  var kbService = this;

  var UP    = 'up',
		DOWN  = 'down',
		RIGHT = 'right',
		LEFT  = 'left';

	var keyboardMap = {
		37: LEFT,
		38: UP,
		39: RIGHT,
		40: DOWN
	};

  // инициализирует обработчик нажатий
	kbService.init = function(){
		var self = kbService;
		kbService.keyEventHandlers = [];
		$document.bind('keydown',function(event){
			var key = keyboardMap[event.which];
			if(key){
				event.preventDefault();
				self._handleKeyEvent(key,event);
			}
		});

	};

  // привязывает обработчики, которые будут
  	// вызваны при нажатии кнопок
  	// cb - функция коллбэк, которая будет помещена
  	// в массив и потом вызвана
  	kbService.on = function(cb){
  		kbService.keyEventHandlers.push(cb);
  	};

  // вызываем каждый коллбэк из массива keyEventHandlers
	kbService._handleKeyEvent = function(key, event) {
		var callbacks = kbService.keyEventHandlers;
		if (!callbacks) {
		  return;
		}

		event.preventDefault();

		if (callbacks) {
		  for (var x = 0; x < callbacks.length; x++) {
			var cb = callbacks[x];
			cb(key, event);
      } //for
		} //if
  }; //_handleKeyEvent

} //keyboardService
