import angular from 'angular';
import angularMeteor from 'angular-meteor';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';

import template from './socially.html';
import { name as PartiesList } from '../partiesList/partiesList';
import { name as PartyDetails } from '../partyDetails/partyDetails';
import { name as Navigation } from '../navigation/navigation';
import { name as Auth } from '../auth/auth';
import { name as CompletedCourses } from '../completedCourses/completedCourses';
import { name as messages } from '../messages/messages';

class Socially {}

const name = 'socially';

// create a module
export default angular.module(name, [
  angularMeteor,
  ngMaterial,
  uiRouter,
  PartiesList,
  PartyDetails,
  Navigation,
  Auth,
  CompletedCourses,
  messages,
  'accounts.ui'
]).component(name, {
  template,
  controllerAs: name,
  controller: Socially
}).config(config)
  .run(run);

function config($locationProvider, $urlRouterProvider, $mdIconProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);


 const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

 $mdIconProvider
   .iconSet('social',
     iconPath + 'svg-sprite-social.svg')
   .iconSet('action',
     iconPath + 'svg-sprite-action.svg')
   .iconSet('communication',
     iconPath + 'svg-sprite-communication.svg')
   .iconSet('content',
     iconPath + 'svg-sprite-content.svg')
   .iconSet('toggle',
     iconPath + 'svg-sprite-toggle.svg')
   .iconSet('navigation',
     iconPath + 'svg-sprite-navigation.svg')
   .iconSet('image',
     iconPath + 'svg-sprite-image.svg');

  if(!!Meteor.userId()){
    $urlRouterProvider.otherwise('/parties');
  }else{
    $urlRouterProvider.otherwise('/login');
  }

}


function run($rootScope, $state) {
 'ngInject';

 $rootScope.$on('$stateChangeError',
   (event, toState, toParams, fromState, fromParams, error) => {
     if (error === 'AUTH_REQUIRED') {
       $state.go('login');
     }
   }
 );
}
