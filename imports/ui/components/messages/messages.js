import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';


import template from './messages.html';

class Messages {
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
      },
      messages: function(){
        return Meteor.users.findOne({"_id": Meteor.userId()});
      }
    });
  }
}

const name = 'messages';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: Messages
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('messages', {
    url: '/messages',
    template: '<messages></messages>',
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
