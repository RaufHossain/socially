import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Roles } from 'meteor/alanning:roles';


import buttonTemplate from './courseAddButton.html';
import modalTemplate from './courseAddModal.html';

class CourseAddButton {
  constructor($mdDialog, $mdMedia) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
  }

  open(event) {

      var id = this.id;
      this.$mdDialog.show({
        controller($mdDialog) {
          'ngInject';


          this.close = () => {
            $mdDialog.hide();
          }
          this.id = id;

        },
        controllerAs: 'courseAddModal',
        template: modalTemplate,
        targetEvent: event,
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: this.$mdMedia('sm') || this.$mdMedia('xs')
      });

  }
}

const name = 'courseAddButton';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template: buttonTemplate,
  bindings: {
    id: '<'
  },
  controllerAs: name,
  controller: CourseAddButton
});
