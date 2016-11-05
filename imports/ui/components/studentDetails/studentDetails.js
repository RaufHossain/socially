import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';



import template from './studentDetails.html';

import { name as CourseAddButton } from '../courseAddButton/courseAddButton';
import { name as CourseAdd } from '../courseAdd/courseAdd';
import { Parties } from '../../../api/parties/index';


class StudentDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.studentId = $stateParams.studentId;


    this.subscribe('parties');
    this.subscribe('users');



    this.helpers({
      parties() {
        return Parties.find({});
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      isStudent() {
        var id = Meteor.userId();
        const student = Roles.userIsInRole(id,
        ['student'], 'default-group');
        if (student) {
          return true;
        }else{
          return false;
        };
      },
      currentUserId() {
        return Meteor.userId();
      },
      users() {
        console.log(Meteor.users.find({_id: $stateParams.studentId}).fetch());
        return Meteor.users.find({_id: $stateParams.studentId}).fetch();
      },
    });
  }

}

const name = 'studentDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  CourseAdd,
  CourseAddButton
]).component(name, {
  template,
  controllerAs: name,
  controller: StudentDetails
}).config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('studentDetails', {
      url: '/studentDetails/:studentId',
      template: '<student-details></student-details>',
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
