import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';


import template from './completedCourses.html';

class CompletedCourses {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);


    this.subscribe('users');

    this.helpers({
      users() {
        return Meteor.users.find({});
      },
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });
  }
}

const name = 'completedCourses';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: CompletedCourses
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('completedCourses', {
    url: '/completedCourses',
    template: '<completed-courses></completed-courses>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          return $q.reject('AUTH_REQUIRED');
        } else {
          return $q.resolve();
        }
      }
    }
  });
}
