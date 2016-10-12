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
import { name as PartiesSort } from '../partiesSort/partiesSort';
import { name as PartyCreator } from '../partyCreator/partyCreator';
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
        console.log(student);
        if (student) {
          return true;
        }else{
          return false;
        };
      },
      currentUserId() {
        return Meteor.userId();
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

  test(){
    var id = Meteor.userId();
    const canDelete = Roles.userIsInRole(id,
    ['student'], 'default-group');

    if (canDelete) {
      console.log("It is a student");
    }else("Professor");
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
  PartyCreator
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
