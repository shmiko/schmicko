"use strict";

angular.module('app')
	.controller('appController',
	[
	'$scope',
		function ($scope) {
			$scope.state = 'authorised';
			$scope.signIn = function () {
				$scope.state = 'authorised';
			};

		}



	])
	.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet) {
		$scope.alert = '';
		$scope.title = "Tripstomp";

		$scope.showGridBottomSheet = function($event) {
			$scope.alert = '';
			$mdBottomSheet.show({
				templateUrl: 'app/static/back_bottom.html',
				controller: 'GridBottomSheetCtrl',
				targetEvent: $event
			}).then(function(clickedItem) {
				$scope.alert = clickedItem.name + ' clicked!';
			});
		};
	})
	.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
		$scope.items = [
			{ name: 'Hangout', icon: 'hangout' },
			{ name: 'Mail', icon: 'mail' },
			{ name: 'Message', icon: 'message' },
			{ name: 'Copy', icon: 'copy2' },
			{ name: 'Facebook', icon: 'facebook' },
			{ name: 'Twitter', icon: 'twitter' },
		];
		$scope.listItemClick = function($index) {
			var clickedItem = $scope.items[$index];
			$mdBottomSheet.hide(clickedItem);
		};
	})
	.run(function($http, $templateCache) {
		var urls = [
			'img/icons/share-arrow.svg',
			'img/icons/upload.svg',
			'img/icons/copy.svg',
			'img/icons/print.svg',
			'img/icons/hangout.svg',
			'img/icons/mail.svg',
			'img/icons/message.svg',
			'img/icons/copy2.svg',
			'img/icons/facebook.svg',
			'img/icons/twitter.svg'
		];
		angular.forEach(urls, function(url) {
			$http.get(url, {cache: $templateCache});
		});
	});