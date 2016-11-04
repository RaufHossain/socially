import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { Parties } from '../../../api/parties/index';

import template from './courseAdd.html';

class CourseAdd {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    this.helpers({

      isStudent() {
        var id = Meteor.userId();
        const student = Roles.userIsInRole(id,
        ['student'], 'default-group');
        if (student) {
          return true;
        }else{
          return false;
        };
      }

    });

  }

  addCourse() {

    var course ={
      courseId: this.course.courseId,
      credits: this.course.credits,
      description: this.course.description,
      name: this.course.name,
      ownerID: this.course.ownerID,
    }
    //Un-hint it
    Meteor.call('update', course, this.course.studentID);
    Meteor.call('emailInvite', course, this.course.studentID);

    if(this.done) {
     this.done();
    }

  }


}

const name = 'courseAdd';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    course: '<',
    done: '&?'
  },
  controllerAs: name,
  controller: CourseAdd
});
