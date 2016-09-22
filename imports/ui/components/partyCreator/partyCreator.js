import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './partyCreator.html';


/**
 * PartyCreator component
 */
class PartyCreator {
  constructor($scope) {
    'ngInject';



    $scope.viewModel(this);
    $scope.subscribe('users');


    this.helpers({
      creator() {
        if (!this.party) {
          return '';
        }

        const owner = this.party.owner;


        if (Meteor.userId() !== null && owner === Meteor.userId()) {
          return 'me';
        }


        return Meteor.users.findOne(owner) || 'nobody';
      }
    });
  }
}

const name = 'partyCreator';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    party: '<'
  },
  controller: PartyCreator
});
