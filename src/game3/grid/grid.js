'use strict';

angular.module('Grid',[])
	.factory('GenerateUniqueId',GenerateUniqueIdFactory)
	.factory('TileModel',TileModelFactory)
	.provider('GridService',GridService);

function GenerateUniqueIdFactory(){
  var generateUid = function() {
  	var d = new Date().getTime();
  	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
  		var r = (d + Math.random()*16)%16 | 0;
  		d = Math.floor(d/16);
  		return (c === 'x' ? r : (r&0x7|0x8)).toString(16);
  	});
  	return uuid;
  };

  return {
  	next: function() { return generateUid(); }
  };

}

TileModelFactory.$inject = ['GenerateUniqueId'];
function TileModelFactory(GenerateUniqueId){
	var Tile = function( pos,val){
		this.x 		   = pos.x,
		this.y 		   = pos.y,
		this.value 	 = val || 2;
		this.merged  = null;
		this.id 	   = GenerateUniqueId.next();
	};

	// устанавливает новые координаты x и y
	Tile.prototype.updatePosition = function(newPosition) {
    this.x = newPosition.x;
    this.y = newPosition.y;
	};

	// сохраняет текущие значения x и y
	Tile.prototype.savePosition = function() {
		this.originalX = this.x;
		this.originalY = this.y;
	};

	// обнуляет свойство объединения
	Tile.prototype.reset = function() {
		this.merged = null;
	};

	return Tile;
}

function GridService(){
  var _provider = this;
  // размер игрового поля
  _provider.size  = 4;
  // количество ячеек на старте
  _provider.startingTileNumber = 2;

  _provider.setSize = function(sz) {
  		_provider.size = sz ? sz : 0;
  };

  // _provider.$get = function(TileModel){
	_provider.$get = ['TileModel',function(TileModel){
    var gridSrv = this;
    gridSrv.grid  =[];
		gridSrv.tiles =[];

    var vectors = {
			'left': {x: -1, y: 0},
			'right':{x: 1,  y: 0},
			'up':	  {x: 0,  y: -1},
			'down':	{x: 0,  y: 1}
		};

    // забиваем массивы grid и tiles нулями
    gridSrv.buildEmptyGameBoard = function() {
    	var self = gridSrv;
    	// инициализаровали сетку
    	// забили массив grid нулями
    	for (var i = 0; i < _provider.size * _provider.size; i++) {
    		gridSrv.grid[i] = null;
    	}

    	// прогнали цикл по всем клеткам сетки
    	// раз в параметре колбэк, используем self
    	// забили массив плиток (tiles) нулями (null)
    	gridSrv.forEach(function(x,y) {
    		self.setTileAt({x:x,y:y}, null);
    	});
    }; //buildEmptyGameBoard

    // Случайным образом размещает две плитки на поле
    gridSrv.buildStartingPosition = function() {
      for (var x = 0; x < _provider.startingTileNumber; x++) {
    	   gridSrv.randomlyInsertNewTile();
      }
    };

    // Это функция цикл по всем плиткам массива tiles
		// cb - это колбэк - функция, которую нужно применить над каждым элементом
		gridSrv.forEach = function(cb) {
		  //var totalSize = _provider.size * _provider.size;
		  for (var i = 0; i < _provider.size * _provider.size; i++) {
			     var pos = gridSrv._positionToCoordinates(i);
			     cb(pos.x, pos.y, gridSrv.tiles[i]);
		  }// for
		}; // forEach

    // Переводит позицию в цикле в координаты на сетке
    gridSrv._positionToCoordinates = function(i) {
      var x = i % _provider.size,
    	    y = (i - x) / _provider.size;
      return {
    			x: x,
    			y: y
    		  };
    }; //_positionToCoordinates

    // конвертирует пару x,y  в значение индекса в массиве сетки
    gridSrv._coordinatesToPosition = function(pos) {
      return (pos.y * _provider.size) + pos.x;
    };

    // помещает плитку (tile) в массив плиток (tiles)
    // на место (индекс в массиве), которое соответствует
    // переданным координатам (pos) x,y
    gridSrv.setTileAt = function(pos, tile) {
      if (gridSrv.withinGrid(pos)) {
    	   var xPos = gridSrv._coordinatesToPosition(pos);
  		   gridSrv.tiles[xPos] = tile;
      }
		};// setCellAt

    // получает плитку по позиции из массива плиток (tiles)
    gridSrv.getTileAt = function(pos) {
      if (gridSrv.withinGrid(pos)) {
    	   var x = gridSrv._coordinatesToPosition(pos);
    	    return gridSrv.tiles[x];
      } else {
    		  return null;
      }
    };

    // проверяет, присутствует ли x/y в сетке
		// т.е если сетка 4 х 4, тогда значения x и y
		// должны быть от 0 до 4 каждое
		gridSrv.withinGrid = function(cell) {
		  return cell.x >= 0 && cell.x < _provider.size &&
				     cell.y >= 0 && cell.y < _provider.size;
		};

    // случайным образом вставляет новую плитку
   	gridSrv.randomlyInsertNewTile = function() {
   	  var freePos = gridSrv.randomAvailablePos(),
   		    tile = gridSrv.newTile(freePos, 2);
   	  gridSrv.insertTile(tile);
   	};// randomlyInsertNewTile

    // случайным образом получает ячейку из всех доступных ячеек
		gridSrv.randomAvailablePos = function() {
		  var poss = gridSrv.availablePoss();
		  if (poss.length > 0) {
			return poss[Math.floor(Math.random() * poss.length)];
		  }
		}; //randomAvailablePos

    // получает все доступные плитки
		// и вернем их позиции массивом
		gridSrv.availablePoss = function() {
		  var freePoss = [],
			    self = gridSrv;

		  // в цикле по всем возможным плиткам
		  // найдем все нулевые (null)
		  //
		  gridSrv.forEach(function(x,y) {
			  var foundTile = self.getTileAt({x:x, y:y});
			  if (!foundTile) {
			     freePoss.push({x:x,y:y});
			  }
		  });
		  return freePoss;
		}; // availablePoss

    // возвращает новый экземпляр TileModel
    gridSrv.newTile = function(pos, value) {
      return new TileModel(pos, value);
    };

    // вставляет плитку на указанное место в массиве плиток
		gridSrv.insertTile = function(tile) {
		  var pos = gridSrv._coordinatesToPosition(tile);
		  gridSrv.tiles[pos] = tile;
		};

    return gridSrv;
  }];

}