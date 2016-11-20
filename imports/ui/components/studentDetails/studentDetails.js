import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';



import template from './studentDetails.html';





import { name as CourseAddButton } from '../courseAddButton/courseAddButton';
import { name as CourseAdd } from '../courseAdd/courseAdd';
import { Parties } from '../../../api/parties/index';


class StudentDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.studentId = $stateParams.studentId;


    this.subscribe('parties');
    this.subscribe('users');

    this.first_year = [];
    this.second_year = [];
    this.third_year = [];
    this.fourth_year = [];
    this.cosc_electives= [];
    this.humanities= [];
    this.social_sciences = [];
    this.professional= [];
    this.electives= [];
    this.status_options = ["pending","passed"];
    this.term


    this.helpers({
      parties() {
        return Parties.find({});
      },
      isLoggedIn() {
        return !!Meteor.userId();
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
      currentUserId() {
        return Meteor.userId();
      },
      users() {
        return Meteor.users.find({_id: $stateParams.studentId}).fetch();
      },
      get_first_year(){
        Meteor.call("get_first_year_Courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("first_year_Courses", results);
        });
        this.first_year = Session.get("first_year_Courses");
        return this.first_year;
      },
      get_second_year(){
        Meteor.call("get_second_year_Courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("second_year_Courses", results);
        });
        this.second_year = Session.get("second_year_Courses");
        return this.second_year;
      },
      get_third_year(){
        Meteor.call("get_third_year_Courses", $stateParams.studentId ,function(err, results){
          if(err) return err;

          Session.set("third_year_Courses", results);
        });
        this.third_year = Session.get("third_year_Courses");
        return this.third_year;
      },
      get_fourth_year(){
        Meteor.call("get_fourth_year_Courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("fourth_year_Courses", results);
        });
        this.fourth_year = Session.get("fourth_year_Courses");
        return this.fourth_year;
      },
      cosc_electives_empty(){
        Meteor.call("cosc_electives_empty", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("cosc_electives_empty", results);
        });
        return Session.get("cosc_electives_empty");
      },
      get_cosc_electives_courses(){
        Meteor.call("get_cosc_electives_courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("get_cosc_electives_courses", results);
        });
        this.cosc_electives = Session.get("get_cosc_electives_courses");
        return this.cosc_electives;
      },
      humanities_empty(){
        Meteor.call("humanities_empty", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("humanities_empty", results);
        });
        return Session.get("humanities_empty");
      },
      get_humanities_courses(){
        Meteor.call("get_humanities_courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("get_humanities_courses", results);
        });
        this.humanities = Session.get("get_humanities_courses");
        return this.humanities;
      },
      social_sciences_empty(){
        Meteor.call("social_sciences_empty", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("social_sciences_empty", results);
        });
        return Session.get("social_sciences_empty");
      },
      get_social_sciences_courses(){
        Meteor.call("get_social_sciences_courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("get_social_sciences_courses", results);
        });
        this.social_sciences = Session.get("get_social_sciences_courses");
        return this.social_sciences;
      },
      professional_empty(){
        Meteor.call("professional_empty", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("professional_empty", results);
        });
        return Session.get("professional_empty");
      },
      get_professional_courses(){
        Meteor.call("get_professional_courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("get_professional_courses", results);
        });
        this.professional = Session.get("get_professional_courses");
        return this.professional;
      },
      electives_empty(){
        Meteor.call("electives_empty", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("electives_empty", results);
        });
        return Session.get("electives_empty");
      },
      get_electives_courses(){
        Meteor.call("get_electives_courses", $stateParams.studentId ,function(err, results){
          if(err) return err;
          Session.set("get_electives_courses", results);
        });
        this.electives = Session.get("get_electives_courses");
        return this.electives;
      }
    });
  }

  save(){
    // Define the pdf-document
    var array = [];
    var term = this.term;
    this.term = '';

    for(i = 0; i<this.first_year.length; i++){
     if(this.first_year[i].term === term){
       array.push(this.first_year[i].name);
     }
    }
    for(i = 0; i<this.second_year.length; i++){
     if(this.second_year[i].term === term){
       array.push(this.second_year[i].name);
     }
    }
    for(i = 0; i<this.third_year.length; i++){
     if(this.third_year[i].term === term){
       array.push(this.third_year[i].name);
     }
    }
    for(i = 0; i<this.fourth_year.length; i++){
     if(this.fourth_year[i].term === term){
       array.push(this.fourth_year[i].name);
     }
    }
    for(i = 0; i<this.cosc_electives.length; i++){
     if(this.cosc_electives[i].term === term){
       array.push(this.cosc_electives[i].name);
     }
    }
    for(i = 0; i<this.humanities.length; i++){
     if(this.humanities[i].term === term){
       array.push(this.humanities[i].name);
     }
    }
    for(i = 0; i<this.social_sciences.length; i++){
     if(this.social_sciences[i].term === term){
       array.push(this.social_sciences[i].name);
     }
    }
    for(i = 0; i<this.professional.length; i++){
     if(this.professional[i].term === term){
       array.push(this.professional[i].name);
     }
    }
    for(i = 0; i<this.electives.length; i++){
     if(this.electives[i].term === term){
       array.push(this.electives[i].name);
     }
    }

    for(i = 0; i<5; i++){
      if(typeof array[i] === 'undefined'){
        array[i] = '';
      }
    }


    var docDefinition = {
    	content: [
        { text: 'Tables', style: 'header' },
				'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
				{ text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
				'The following table has nothing more than a body array',
				{
						style: 'tableExample',
						table: {
								body: [
										['SPRING/SUMMER', 'FALL', 'WINTER'],
										[array[0], 'Another one here', 'OK?'],
                    [array[1], 'Another one here', 'OK?'],
                    [array[2], 'Another one here', 'OK?'],
                    [array[3], 'Another one here', 'OK?'],
                    [array[4], 'Another one here', 'OK?']
								]
						}
				}
      ]
    }

    // Start the pdf-generation process
    pdfMake.createPdf(docDefinition).getBuffer(function(result) {
      fs.writeFile('sample.pdf', result, function (err) {
      if (err) throw err;
      gui.Shell.openItem(afile);
      });
    });
  }
  set_first_year(){
    Meteor.call("set_first_year_Courses", this.first_year, this.second_year, this.studentId);
  }
  set_second_year(){

    Meteor.call("set_second_year_Courses", this.first_year, this.second_year, this.third_year, this.studentId);
  }
  set_third_year(){

    Meteor.call("set_third_year_Courses", this.first_year, this.second_year, this.third_year, this.fourth_year,this.studentId);
  }
  set_fourth_year(){
    var all_required_course = this.first_year.concat(this.second_year);
    all_required_course = all_required_course.concat(this.third_year);
    all_required_course = all_required_course.concat(this.fourth_year);
    Meteor.call("set_fourth_year_Courses", all_required_course, this.cosc_electives, this.fourth_year, this.studentId);
  }
  createPdf(credentials){
    Meteor.call("createPdf", "Rauf");

  }






}



const name = 'studentDetails';


// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  CourseAdd,
  CourseAddButton
]).component(name, {
  template,
  controllerAs: name,
  controller: StudentDetails
}).config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('studentDetails', {
      url: '/studentDetails/:studentId',
      template: '<student-details></student-details>',
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
