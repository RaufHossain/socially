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
    this.users = Meteor.users.find().collection._docs._map;
  }

  open(event) {

    console.log(this.course.description);
      var course = this.course;
      this.$mdDialog.show({
        controller($mdDialog) {
          'ngInject';


          this.close = () => {
            $mdDialog.hide();
          }
          this.course = course;

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
    course: '<'
  },
  controllerAs: name,
  controller: CourseAddButton
});
