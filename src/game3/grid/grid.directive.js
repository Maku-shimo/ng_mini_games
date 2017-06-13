'use strict';

angular.module('Grid')
	.directive('grid',gridDirective);

function gridDirective(){
	var ddo = {
		restrict: 'A',
		require: 'ngModel',
		scope:{
			ngModel: "="
		},
		templateUrl: 'src/game3/grid/grid.html'
	}

	return ddo;
}
