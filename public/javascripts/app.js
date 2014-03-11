angular.module('fairApp', [])
  .constant('SINGAPORE_MOBILE_REGEX', /[689]\d{7}/)
  //factory to handle XmlHttpRequests
  .factory('DataFactory',['$http', function($http) {
    return {
      postEntry: function(entry) {
        entry = angular.extend(entry, {created: new Date()});
        return $http.post('/api/entry', entry).then(function(data) {
          return data;
        }, function() {
          throw new Error('Error posting data')
        });
      }
    }
  }])
  .controller('FormCtrl', ['$scope', '$q', 'DataFactory', 'SINGAPORE_MOBILE_REGEX', 
  function($scope, $q, DataFactory, SINGAPORE_MOBILE_REGEX) {
    $scope.user = {};
    $scope.submitted = false;
    $scope.pattern = SINGAPORE_MOBILE_REGEX;

    $scope.submitForm = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        //after successful posting, resets form and form variables
        DataFactory.postEntry($scope.user).then(function(data) {
          alert('Your lucky draw entry has been successfully saved! Thank you!')
          $scope.user = {};
          $scope.submitted = false;
          $scope['userForm'].$setPristine();
        }, function() {
          alert('There has been an error submitting your lucky draw entry. Please look for our friendly staff for help!');
        })
      }
    }

  }])