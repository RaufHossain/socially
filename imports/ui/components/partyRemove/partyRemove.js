import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Parties } from '../../../api/parties/index';

import template from './partyRemove.html';

class PartyRemove {
  remove() {
    if (this.party) {
      Parties.remove(this.party._id);
    }
  }
}

const name = 'partyRemove';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  bindings: {
   party: '<'
  },
  controllerAs: name,
  controller: PartyRemove
});
