import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Roles } from 'meteor/alanning:roles';


import buttonTemplate from './partyAddButton.html';
import modalTemplate from './partyAddModal.html';
import partyAddModalNotAllowed from './partyAddModalNotAllowed.html';
import { name as PartyAdd } from '../partyAdd/partyAdd';

class PartyAddButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    this.users = Meteor.users.find().collection._docs._map;

  }

  open(event) {
    for (var index in this.users) {
      if(this.users[index]._id === Meteor.userId()){
        var user = this.users[index];
        break;
      }
    }


    var id = Meteor.userId();
    const student = Roles.userIsInRole(id,
    ['student'], 'default-group');
    if(!student){
      this.$mdDialog.show({
        controller($mdDialog) {
          'ngInject';

          this.close = () => {
            $mdDialog.hide();
          }
        },
        controllerAs: 'partyAddModal',
        template: modalTemplate,
        targetEvent: event,
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
      });
    }else{
      var party = this.party;
      this.$mdDialog.show({
        controller($mdDialog) {
          'ngInject';

          this.close = () => {
            $mdDialog.hide();
          }
          this.party = party;
        },
        controllerAs: 'partyAddModal',
        template: partyAddModalNotAllowed,
        targetEvent: event,
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
      });
    }
  }
}

const name = 'partyAddButton';

// create a module
export default angular.module(name, [
  angularMeteor,
  PartyAdd
]).component(name, {
  template: buttonTemplate,
  bindings: {
    party: '<'
  },
  controllerAs: name,
  controller: PartyAddButton
});
