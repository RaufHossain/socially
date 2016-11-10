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

    this.first_year = [];
    this.second_year = [];
    this.status_options = ["pending","passed"];


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
        return Meteor.users.find({_id: $stateParams.studentId}).fetch();
      },
      get_first_year(){
        Meteor.call("get_first_year_Courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("first_year_Courses", results);
        });
        this.first_year = Session.get("first_year_Courses");
        return this.first_year;
      },
      get_second_year(){
        Meteor.call("get_second_year_Courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("second_year_Courses", results);
        });
        this.second_year = Session.get("second_year_Courses");
        return this.second_year;
      },
      fourth_year(){
        Meteor.call("fourth_year_Courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("fourth_year_Courses", results);
        });
        return Session.get("fourth_year_Courses");
      },
      cosc_electives(){
        Meteor.call("cosc_electives", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("cosc_electives", results);
        });
        return Session.get("cosc_electives");
      }
    });
  }

  save(){
    console.log("working");
  }
  set_first_year(){
    Meteor.call("set_first_year_Courses", this.first_year, this.studentId);
  }
  set_second_year(){
    var all_required_course = this.first_year.concat(this.second_year);
    Meteor.call("set_second_year_Courses", all_required_course, this.second_year, this.studentId);
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
