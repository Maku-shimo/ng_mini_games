'use strict';

angular.module('Game',['Grid','ngCookies'])
	.service('GameManager',GameManager);

GameManager.$inject = ['GridService','$cookieStore'];
function GameManager(GridService, $cookieStore) {

  var game = this;
  game.grid 		 = GridService.grid;
  game.tiles 		 = GridService.tiles;
  game.winningValue  = 2048;

  // получает из кеша браузера ранее значение highScore
  game.getHighScore = function() {
    return parseInt($cookieStore.get('highScore')) || 0;
  };

  // создает новую игру
	game.newGame = function(){
		// создадим массивы tiles и grid
		GridService.buildEmptyGameBoard();
		// разместим в массиве tiles две новые плитки
		GridService.buildStartingPosition();
		// сбросим состояние иигры
		game.reinit();
	};

  // сбрасывает состояние игры
	game.reinit = function() {
		game.gameOver 		  = false;
		game.win 			  = false;
		game.currentScore 	  = 0;
		game.highScore 		  = game.getHighScore();
	};

	game.reinit();

	/*
   * Игровой цикл
   *
   * Тут мы будем запускать каждое событие,
   * которые перечислены в Keyboard service.
   * Для каждого события:
   *  1. Определим вектор движения
   *  2. Найдем самуй дальнюю локация для каждой плитки и
   *     следующую плитку
   *  3. Найдем все места, которые могут быть 'объединены'
   *    a. Если нашли место, которое может быть объединено:
   *      i. убираем обе плитки
   *      ii. добавляем новую плитку с новым значением
   *    b. если не нашли:
   *      i. двигаем плитку до самого дальнего места
   */
	game.move = function(key){
		var self = game;

		if (self.win){return false;}

		var positions 	= GridService.traversalDirections(key);
		var hasWon 			= false;
		var hasMoved 		= false;

		// обнулим сведения об объединениях с предыдущего хода
		GridService.prepareTiles();

		positions.x.forEach(function(x) {
			positions.y.forEach(function(y) {
				// console.log("x:",x,"y:",y);
		// 		var originalPosition = {x:x,y:y};
		// 		var tile = GridService.getCellAt(originalPosition);
    //
		// 		if (tile) {
		// 			// если плитка есть, вычислим самую дальнюю позицию
		// 			var cell = GridService.calculateNextPosition(tile, key),
		// 				next = cell.next;
    //
		// 			if (next &&
		// 				next.value === tile.value &&
		// 				!next.merged) {
    //
		// 			  // MERGE
		// 			  var newValue = tile.value * 2;
    //
		// 			  // создаем новую плитку
		// 			  var merged = GridService.newTile(tile, newValue);
		// 			  // сохраняем историю объединения в новой плитке
		// 			  merged.merged = [tile, cell.next];
    //
		// 			  // вставляем новую плитку в массив на ее позицию
		// 			  GridService.insertTile(merged);
		// 			  // удалит старую плитку
		// 			  GridService.removeTile(tile);
		// 			  // сместить новую плитку на новую позицию
		// 			  GridService.moveTile(merged, next);
		// 			  // обновить таблицу очков
		// 			  self.updateScore(self.currentScore + cell.next.value);
		// 			  // Проверит на выигрыш
		// 			  if(merged.value >= self.winningValue) {
		// 				hasWon = true;
		// 			  }
		// 			  // переместили с объединением
		// 			  hasMoved = true;
    //
		// 			} else {
		// 			  //i. двигаем плитку до самого дальнего места
		// 			  GridService.moveTile(tile, cell.newPosition);
		// 			}
    //
		// 			// Проверим, двигалась ли плитка
		// 			if (!GridService.samePositions(originalPosition,cell.newPosition)) {
		// 			  hasMoved = true;
		// 			}
		// 		}
		 	}); // for y
		 }); // for x

	  // если выиграли по очкам, возможим общий флаг win
		// if (hasWon && !self.win) {
		// 	self.win = true;
		// }
    //
		// // проверка окончания игры
		// if (hasMoved) {
		// 	// вставляем новую плитку
		// 	GridService.randomlyInsertNewTile();
    //
		// 	// игра окончвена, если нет возможных движений или есть выигрыша по очкам
		// 	if (self.win || !self.movesAvailable()) {
		// 		self.gameOver = true;
			//  }
		// }
	}; // move



}
