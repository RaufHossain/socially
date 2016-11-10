import { Meteor } from 'meteor/meteor';
import { Parties } from '../api/parties/index';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Session } from 'meteor/session'

import {bcosc4} from "./database"

Meteor.startup(() => {
  if (Parties.find().count() === 0) {
    const parties = [{
      'name': 'Dubstep-Free Zone',
      'description': 'Fast just got faster with Nexus S.'
    }, {
      'name': 'All dubstep all the time',
      'description': 'Get it on!'
    }, {
      'name': 'Savage lounging',
      'description': 'Leisure suit required. And only fiercest manners.'
    }];

    parties.forEach((party) => {
      Parties.insert(party)
    });
  }

  Meteor.methods({

    register: function (credentials) {

      var id;

      id = Accounts.createUser(credentials);

      if(credentials.profile.student === 'false'){
        Roles.addUsersToRoles(id, 'professor', 'default-group');
        return true;
      }else{
        Roles.addUsersToRoles(id, 'student', 'default-group');
        return true;
      }
      return false;
    }
  });

  Meteor.methods({

    update: function (course, id) {

      Meteor.users.update(id, {
        $push: {
          courses: course
        }
      });
    }
  });

  Meteor.methods({
    message: function(course){

      Meteor.users.update(course.ownerID, {
        $push: {
          messages: course
        }
      });
    }

  });

  Meteor.methods({

    findStudents: function () {

      var userArray = Meteor.users.find({}).fetch();
      var id;
      var studentArray = [];
      var j =0;
      var student;
      for (i = 0; i < userArray.length; i++) {
         id = userArray[i]._id
        student = Roles.userIsInRole(id,
        ['student'], 'default-group');


        if(student){
          studentArray[j]=userArray[i];
          j++;
        }

      }
      return(studentArray);
    }
  });

  Meteor.methods({

    addDepartment: function (id, departmentName) {

      if(departmentName === "Genereal Computer Science"){

        Meteor.users.update(id, {
          $push: {
            department: bcosc4
          }
        });
      }else{

        // Meteor.users.update(course.ownerID, {
        //   $push: {
        //     department: bcosc.mse
        //   }
        // });
        console.log("bcosc.mse");

      }

    },
    get_first_year_Courses: function (id) {

      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].core_courses.first_year;

      return array;
    },
    set_first_year_Courses: function (array, id) {

      var first_year = [];
      var statusVariable = "";

      for(i=0;i<array.length;i++){
        first_year[i]={
          name: array[i].name,
          credits: array[i].credits,
          pre: array[i].pre,
          status: array[i].status,
          term: array[i].term
        }
      }


      Meteor.users.update({_id: Meteor.userId()},{
        $set: {
          "department.0.core_courses.first_year":first_year
        }
      },function(err, results){
          if(err) console.log(err);

      });
    },
    fourth_year_Courses: function (id) {

      var users = Meteor.users.find({_id:id}).fetch();
      var array = [];

      array[0] = users[0].department[0].core_courses.fourth_year[0];
      array[1] = users[0].department[0].core_courses.fourth_year[1];


      if(users[0].department[0].core_courses.fourth_year[2].status === "pending" || users[0].department[0].core_courses.fourth_year[2].status === "passed"){
        array[2] = users[0].department[0].core_courses.fourth_year[2];
        array[3] = users[0].department[0].core_courses.fourth_year[4];
      }else{
        if(users[0].department[0].core_courses.fourth_year[3].status === "pending" || users[0].department[0].core_courses.fourth_year[3].status === "passed"){
          array[2] = users[0].department[0].core_courses.fourth_year[3];
          array[3] = users[0].department[0].core_courses.fourth_year[4];
          array[4] = users[0].department[0].core_courses.fourth_year[5];
        }else{
        array[2] = users[0].department[0].core_courses.fourth_year[4];
        array[3] = users[0].department[0].core_courses.fourth_year[5];
        array[4] = users[0].department[0].core_courses.fourth_year[6];
        }
      }
      return array;
    },
    cosc_electives: function (id) {
      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].cosc_electives.courses;

      if (typeof array == 'undefined' && array.length == 0) {
        return true;
      }
      else{return false;}
    }
  });




});
