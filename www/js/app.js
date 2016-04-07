
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.todo', {
    url: '/todo',
    views: {
      'tab-todo': {
        templateUrl: 'templates/tab-todo.html',
        controller: 'ToDoCtrl'
      }
    }
  })

  .state('tab.entry', {
      url: '/entry',
      views: {
        'tab-entry': {
          templateUrl: 'templates/tab-entry.html',
          controller: 'EntryCtrl'
        }
      }
    })


  .state('tab.filter', {
    url: '/filter',
    views: {
      'tab-filter': {
        templateUrl: 'templates/tab-filter.html',
        controller: 'filterCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/todo');

});