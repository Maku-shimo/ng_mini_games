'use strict';

angular.module('Grid')
	.directive('tile',tileDirective);

function tileDirective(){
	var ddo = {
		restrict: 'A',
		scope:{
			// ngModel: '='
			tile: '=ngModel'
		},
		templateUrl:'src/game3/grid/tile.html'
	}
	return ddo;
}
