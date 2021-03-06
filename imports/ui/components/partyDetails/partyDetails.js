import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';


import template from './partyDetails.html';
import { Parties } from '../../../api/parties/index';
import { name as PartyUninvited } from '../partyUninvited/partyUninvited';

class PartyDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.partyId = $stateParams.partyId;

    this.subscribe('parties');
    this.subscribe('users');

    this.helpers({
      party() {
        return Parties.findOne({
          _id: $stateParams.partyId
        });
      },
      users() {
        return Meteor.users.find({});
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
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });
  }

 save() {
   Parties.update({
     _id: this.party._id
   }, {
     $set: {
       name: this.party.name,
       description: this.party.description,
       public: this.party.public,
       credits: this.party.credits
     },
   }, (error) => {
    if (error) {
      console.log('Oops, unable to update the party...');
    } else {
      console.log('Done!');
    }
  });
 }

//need to update
  canInvite() {
    if (!this.party) {
      return false;
    }

    return !this.party.public && this.party.owner === Meteor.userId();
  }

}

const name = 'partyDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  PartyUninvited
]).component(name, {
  template,
  controllerAs: name,
  controller: PartyDetails
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('partyDetails', {
    url: '/parties/:partyId',
    template: '<party-details></party-details>',
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
