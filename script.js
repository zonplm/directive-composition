(function(angular) {
  'use strict';

  function setAppText(){
    var tabs = document.getElementById('tabs')
    var appText = document.getElementById('appText')
    appText.innerText = tabs.innerHTML;
  }
angular.module('docsTabsExample', [])
  .directive('myTabs', function() {
    alert('myTabs directive: compiling...')
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: ['$scope', function($scope) {
        alert('myTabls directive: controller construction...')
        setAppText();

        var panes = $scope.panes = [];

        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        };

        this.addPane = function(pane) {
          if (panes.length === 0) {
            $scope.select(pane);
          }
          panes.push(pane);
        };
      }],
      templateUrl: 'my-tabs.html'
    };
  })
  .directive('myPane', function() {
    alert('myPane compiling...');
    setAppText()
    return {
      require: '^myTabs',
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@'
      },
      link: function(scope, element, attrs, tabsCtrl) {
        alert('myPane linking...');
        setAppText();
        tabsCtrl.addPane(scope)
        alert('One pane added');
        setAppText();
        //reset appText in 3 seconds.
        setTimeout(setAppText, 3000);
      },
      templateUrl: 'my-pane.html'
    };
  });
})(window.angular);