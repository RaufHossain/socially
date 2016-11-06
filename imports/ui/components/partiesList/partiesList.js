import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';
import { Roles } from 'meteor/alanning:roles';

import { Counts } from 'meteor/tmeasday:publish-counts';


import template from './partiesList.html';
import paginationTemplate from './customPagination.tpl.html';
import { name as PartyAdd } from '../partyAdd/partyAdd';
import { name as PartyRemove } from '../partyRemove/partyRemove';
import { name as PartyAddButton } from '../partyAddButton/partyAddButton';
import { name as CourseAddButton } from '../courseAddButton/courseAddButton';
import { name as CourseAdd } from '../courseAdd/courseAdd';
import { name as PartiesSort } from '../partiesSort/partiesSort';
import { name as PartyCreator } from '../partyCreator/partyCreator';
import { name as StudentDetails } from '../studentDetails/studentDetails';
import { Parties } from '../../../api/parties/index';


class PartiesList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.perPage = 3;
    this.page = 1;
    this.sort = {
      name: 1
    };
    this.searchText = '';

    this.subscribe('parties', () => [{
      limit: parseInt(this.perPage),
      skip: parseInt((this.getReactively('page') - 1) * this.perPage),
      sort: this.getReactively('sort')
    },  this.getReactively('searchText')
    ]);
    this.subscribe('users');



    this.helpers({
      parties() {
        return Parties.find({}, {
          sort : this.getReactively('sort')
        });
      },
      partiesCount() {
        return Counts.get('numberOfParties');
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
      showButton(){
        return !Meteor.isCordova;
      },
      users() {
        Meteor.call("findStudents", function(err, results){
          if(err) return err;
          Session.set("findStudents", results);
        });
        return Session.get("findStudents");
      }
    });
  }

  isOwner(party) {
    return this.isLoggedIn && party.owner === this.currentUserId;
  }
  pageChanged(newPage) {
   this.page = newPage;
  }


  sortChanged(sort) {
    this.sort = sort;
  }

  detectDepartment(user){

    if (typeof user.department === "undefined") {
      // Meteor.call("addDepartment", user._id);
      // this.$state.go('department');
    }else{
      console.log(user);
    }

  }


  test(user){
    // var users = Meteor.users.find().collection._docs._map;
    var users = Meteor.users.find({_id:Meteor.userId()}).fetch();
    var array = [];

    array[0] = users[0].department[0].core_courses.fourth_year[0];
    array[1] = users[0].department[0].core_courses.fourth_year[1];


    if(users[0].department[0].core_courses.fourth_year[2].status === "pending" || users[0].department[0].core_courses.fourth_year[2].status === "passed"){
      array[2] = users[0].department[0].core_courses.fourth_year[2];
      array[3] = users[0].department[0].core_courses.fourth_year[4];
    }else{
      if(users[0].department[0].core_courses.fourth_year[3].status === "pending" || users[0].department[0].core_courses.fourth_year[3].status === "passed"){
        array[2] = users[0].department[0].core_courses.fourth_year[3];
        array[3] = users[0].department[0].core_courses.fourth_year[4];
        array[4] = users[0].department[0].core_courses.fourth_year[5];
      }else{
      array[2] = users[0].department[0].core_courses.fourth_year[4];
      array[3] = users[0].department[0].core_courses.fourth_year[5];
      array[4] = users[0].department[0].core_courses.fourth_year[6];
      }
    }


    for (index = 0; index < array.length; index++) {

      console.log(array[index].name);
    }

    // Meteor.call("findStudents", function(err, results){
    //   if(err) return err;
    //
    //   Session.set("findStudents", results);
    //   console.log(results);
    //
    // });

    const student = Meteor.users.findOne({_id:Meteor.userId()});


    console.log(student);
  }




}

const name = 'partiesList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  PartyAdd,
  PartyAddButton,
  PartyRemove,
  PartiesSort,
  PartyCreator,
  CourseAdd,
  CourseAddButton,
  StudentDetails
]).component(name, {
  template,
  controllerAs: name,
  controller: PartiesList
}).config(config);

function config($stateProvider, paginationTemplateProvider) {
  'ngInject';

  paginationTemplateProvider.setString('<div class="my-page-links">...</div>');
  paginationTemplateProvider.setString(paginationTemplate);
  $stateProvider
    .state('parties', {
      url: '/parties',
      template: '<parties-list></parties-list>',
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
