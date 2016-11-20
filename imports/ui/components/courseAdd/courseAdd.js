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
    this.status_options = ["pending","passed"];
    this.category_options = ["Humanities","Social Sciences", "Professional", "Electives"];
    this.course = {
      category:"",
      status:"pending",
      term:"",
      pre:[]
    };
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

    console.log(this.id);
    //Un-hint it
    if(this.course.category !== ""){
      Meteor.call('update_hum_social_prof', this.course, this.id);
    }else{
      Meteor.call('update_cosc_electives', this.course, this.id);
    }
    // Meteor.call('update', this.course, this.id);
    // Meteor.call('emailInvite', course, this.course.studentID);
    console.log(this.course);

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
    id: '<',
    done: '&?'
  },
  controllerAs: name,
  controller: CourseAdd
});
