import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import uiRouter from 'angular-ui-router';





import template from './register.html';

class Register {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.options = [
      {name:'Mobile Software Engineering', value: "BCOSC.MSE"},
      {name:'Genereal Computer Science', value: "BCOSC4", notAnOption: true}
    ];
    this.department = this.options[1];


    this.credentials = {
      email: '',
      password: '',
      username: '',
      profile: {
        student: 'false'
      }
    };


    this.error = '';
  }

  register() {

    var id =  Meteor.call("register", this.credentials, function(error, results){

      if(error) return error;

    });




    console.log(this.department);

    Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
      this.$bindToContext((err) => {
        if (err) {
          this.error = err;
        } else {


          if(this.department.name === "Genereal Computer Science"){
            Meteor.call("addDepartment", Meteor.userId(), this.department.name);
          }else{
            console.log("BCOSC.MSE");
          }
          this.$state.go('parties');
        }
      })
    );


  }
}

const name = 'register';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
])
  .component(name, {
    template,
    controllerAs: name,
    controller: Register
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider.state('register', {
    url: '/register',
    template: '<register></register>'
  });
}
