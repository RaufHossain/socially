import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import { Parties } from '../../../api/parties/index';

import template from './partyAdd.html';

class PartyAdd {
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

    this.party = {};
  }

  submit() {
    var id = Meteor.userId();
    const student = Roles.userIsInRole(id,
    ['student'], 'default-group');

    if(!student){
      this.party.owner = Meteor.user()._id;
      Parties.insert(this.party);
    }else{

      const student = Meteor.users.findOne({_id:id});
      const course = {
        courseId: this.course._id,
        ownerID: this.course.owner,
        studentID: id,
        studentName: student.username,
        name: this.course.name,
        description: this.course.description,
        credits: this.course.credits,
      };

      Meteor.call('message', course);
    }

    if(this.done) {
     this.done();
    }

    this.reset();
  }



  reset() {
    this.party = {};
  }
}

const name = 'partyAdd';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
    done: '&?',
    course: '<'
  },
  controllerAs: name,
  controller: PartyAdd
});
