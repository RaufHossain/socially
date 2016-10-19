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
    // for (var index in this.users) {
    //   if(this.users[index]._id === Meteor.userId()){
    //     var user = this.users[index];
    //     break;
    //   }
    // }
    console.log(this.course.description);
    // var id = Meteor.userId();
    // const student = Roles.userIsInRole(id,
    // ['student'], 'default-group');

      this.$mdDialog.show({
        controller($mdDialog) {
          'ngInject';


          this.close = () => {
            $mdDialog.hide();
          }

          this.addCourse = (course) =>{
            //console.log("Working "+course.description);

            // var course ={
            //   courseId: this.course.courseId,
            //   credits: this.course.credits,
            //   description: this.course.description,
            //   name: this.course.name,
            //   ownerID: this.course.ownerID,
            // }
            // Meteor.call('update', course, this.course.studentID);

            $mdDialog.hide();
          }
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
