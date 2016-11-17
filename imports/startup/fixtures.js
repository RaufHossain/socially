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

  function resetCourses(remaining_courses, courses, id) {

    var all_required_course = remaining_courses.concat(courses);

    var updated_courses_array = [];
    var statusVariable = [];
    var course_pre_requisites= [];
    var pre_requisite_satisfied;


    for(i=0;i<courses.length;i++){

      course_pre_requisites = courses[i].pre;

      statusVariable[i] = {
        status: courses[i].status
      };

      pre_requisite_satisfied = true;

      for(j=0; j<course_pre_requisites.length;j++){


        for(k=0;k<all_required_course.length && pre_requisite_satisfied;k++){

          if(course_pre_requisites[j].name === all_required_course[k].name){


            if(all_required_course[k].status !== "passed"){
              pre_requisite_satisfied = false;

              all_required_course[remaining_courses.length+i].status = "";
              statusVariable[i] = {
                name: all_required_course[k].name,
                status: ""
              };
              break;
            }
          }
        }
      }

      updated_courses_array[i]={
        name: courses[i].name,
        credits: courses[i].credits,
        pre: courses[i].pre,
        status: statusVariable[i].status,
        term: courses[i].term
      }

    }
    console.log(statusVariable);


    var data_base_name_array;
    if(updated_courses_array[0].name.charAt(4) === '2'){

      Meteor.users.update({_id: id},{
        $set: {
          "department.0.core_courses.second_year":updated_courses_array
        }
      },function(err, results){
          if(err) console.log(err);

      });

    }else{

      if(updated_courses_array[0].name.charAt(4) === '3'){

        Meteor.users.update({_id: id},{
          $set: {
            "department.0.core_courses.third_year":updated_courses_array
          }
        },function(err, results){
            if(err) console.log(err);


        });
      }else{

        Meteor.users.update({_id: id},{
          $set: {
            "department.0.core_courses.fourth_year":updated_courses_array
          }
        },function(err, results){
            if(err) console.log(err);


        });

      }
    }

  }

  function removeCoscElectives(course, id) {
    console.log(course);

    Meteor.users.update({_id: id},{
      $pull: {
        "department.0.cosc_electives.courses":{name: course.name}
      }
    });

  }



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
    set_first_year_Courses: function (array,second_year_courses, id) {

      var first_year = [];

      for(i=0;i<array.length;i++){
        first_year[i]={
          name: array[i].name,
          credits: array[i].credits,
          pre: array[i].pre,
          status: array[i].status,
          term: array[i].term
        }
      }


      Meteor.users.update({_id: id},{
        $set: {
          "department.0.core_courses.first_year":first_year
        }
      },function(err, results){
          if(err) console.log(err);

      });

      resetCourses(first_year, second_year_courses, id);
    },
    get_second_year_Courses: function (id) {

      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].core_courses.second_year;

      return array;
    },
    set_second_year_Courses: function (first_year, second_year_courses, third_year, id) {

      var all_required_course = first_year.concat(second_year_courses);
      var second_year = [];
      var statusVariable = [];
      var second_year_course_pre_requisites= [];
      var pre_requisite_satisfied;


      for(i=0;i<second_year_courses.length;i++){

        second_year_course_pre_requisites = second_year_courses[i].pre;

        statusVariable[i] = {
          status: second_year_courses[i].status
        };

        pre_requisite_satisfied = true;

        for(j=0; j<second_year_course_pre_requisites.length;j++){


          for(k=0;k<all_required_course.length && pre_requisite_satisfied;k++){
            if(second_year_course_pre_requisites[j].name === all_required_course[k].name){

              if(all_required_course[k].status !== "passed"){
                pre_requisite_satisfied = false;

                statusVariable[i] = {
                  name: all_required_course[k].name,
                  status: ""
                };
                break;
              }
            }
          }
        }

        second_year[i]={
          name: second_year_courses[i].name,
          credits: second_year_courses[i].credits,
          pre: second_year_courses[i].pre,
          status: statusVariable[i].status,
          term: second_year_courses[i].term
        }
      }
      console.log(statusVariable);

      Meteor.users.update({_id: id},{
        $set: {
          "department.0.core_courses.second_year":second_year
        }
      },function(err, results){
          if(err) console.log(err);

      });

      all_required_course = first_year.concat(second_year);
      resetCourses(all_required_course, third_year, id);
    },
    get_third_year_Courses: function (id) {

      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].core_courses.third_year;

      return array;
    },
    set_third_year_Courses: function (first_year, second_year, third_year_courses, fourth_year,id) {

      var all_required_course = first_year.concat(second_year);
      all_required_course = all_required_course.concat(third_year_courses);
      var third_year = [];
      var statusVariable = [];
      var third_year_course_pre_requisites= [];
      var pre_requisite_satisfied;


      for(i=0;i<third_year_courses.length;i++){

        third_year_course_pre_requisites = third_year_courses[i].pre;

        statusVariable[i] = {
          status: third_year_courses[i].status
        };

        pre_requisite_satisfied = true;

        for(j=0; j<third_year_course_pre_requisites.length;j++){


          for(k=0;k<all_required_course.length && pre_requisite_satisfied;k++){
            if(third_year_course_pre_requisites[j].name === all_required_course[k].name){


              if(all_required_course[k].status !== "passed"){
                pre_requisite_satisfied = false;

                statusVariable[i] = {
                  name: all_required_course[k].name,
                  status: ""
                };
                break;
              }
            }
          }
        }

        third_year[i]={
          name: third_year_courses[i].name,
          credits: third_year_courses[i].credits,
          pre: third_year_courses[i].pre,
          status: statusVariable[i].status,
          term: third_year_courses[i].term
        }
      }
      console.log(statusVariable);

      Meteor.users.update({_id: id},{
        $set: {
          "department.0.core_courses.third_year":third_year
        }
      },function(err, results){
          if(err) console.log(err);

      });

      all_required_course = first_year.concat(second_year);
      all_required_course = all_required_course.concat(third_year);
      resetCourses(all_required_course, fourth_year, id);
    },
    set_fourth_year_Courses: function (all_required_course, cosc_electives,fourth_year_courses, id) {

      var fourth_year = [];
      var statusVariable = [];
      var fourth_year_course_pre_requisites= [];
      var pre_requisite_satisfied;

      if((fourth_year_courses[2].status === "passed" || fourth_year_courses[2].status === "pending") && fourth_year_courses[2].name === "COSC4235"){
        if(fourth_year_courses[3].status !== "passed" && fourth_year_courses[3].status !== "pending" ){
          for(i=0;i<cosc_electives.length;i++){
            if(cosc_electives[i].name.charAt(4) === '4' ){
              fourth_year_courses[3] = cosc_electives[i];
              removeCoscElectives(cosc_electives[i], id);
              break
            }
          }
        }
      }else{
        if(fourth_year_courses[3].status === "passed" || fourth_year_courses[3].status === "pending" ){
          if(fourth_year_courses[2].name === "COSC4235"){
            for(i=0,j=2;i<cosc_electives.length && j<=4;i++){
              if(cosc_electives[i].name.charAt(4) === '4' ){
                fourth_year_courses[j] = cosc_electives[i];
                removeCoscElectives(cosc_electives[i], id);
                j+=2;
              }
            }
          }else{
            console.log(typeof fourth_year_courses[4]==="undefined");
            if(typeof fourth_year_courses[4]==="undefined"){
              for(i=0;i<cosc_electives.length;i++){
                if(cosc_electives[i].name.charAt(4) === '4' ){
                  fourth_year_courses[4] = cosc_electives[i];
                  removeCoscElectives(cosc_electives[i], id);
                  break;
                }
              }
            }

          }

        }
      }





      for(i=0;i<fourth_year_courses.length;i++){

        fourth_year_course_pre_requisites = fourth_year_courses[i].pre;

        statusVariable[i] = {
          status: fourth_year_courses[i].status
        };

        pre_requisite_satisfied = true;

        for(j=0; j<fourth_year_course_pre_requisites.length;j++){


          for(k=0;k<all_required_course.length && pre_requisite_satisfied;k++){
            if(fourth_year_course_pre_requisites[j].name === all_required_course[k].name){


              if(all_required_course[k].status !== "passed"){
                pre_requisite_satisfied = false;

                statusVariable[i] = {
                  name: all_required_course[k].name,
                  status: ""
                };
                break;
              }
            }
          }
        }

        fourth_year[i]={
          name: fourth_year_courses[i].name,
          credits: fourth_year_courses[i].credits,
          pre: fourth_year_courses[i].pre,
          status: statusVariable[i].status,
          term: fourth_year_courses[i].term
        }
      }
      console.log(statusVariable);

      Meteor.users.update({_id: id},{
        $set: {
          "department.0.core_courses.fourth_year":fourth_year
        }
      },function(err, results){
          if(err) console.log(err);

      });
    },
    get_fourth_year_Courses: function (id) {


      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].core_courses.fourth_year;

      return array;
    },
    cosc_electives_empty: function (id) {
      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].cosc_electives.courses;

      if (typeof array == 'undefined' && array.length == 0) {
        return true;
      }
      else{return false;}
    },
    get_cosc_electives_courses: function (id) {
      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].cosc_electives.courses;

      return array;
    },
    update_cosc_electives: function (course, id) {

      Meteor.users.update({_id: id},{
        $push: {
          "department.0.cosc_electives.courses": course
        }
      },function(err, results){
          if(err) console.log(err);

      });

    },
    update_humanities: function (course, id) {

      Meteor.users.update({_id: id},{
        $push: {
          "department.0.humanities.courses": course
        }
      },function(err, results){
          if(err) console.log(err);

      });

    },
    update_social: function (course, id) {

      Meteor.users.update({_id: id},{
        $push: {
          "department.0.social_sciences.courses": course
        }
      },function(err, results){
          if(err) console.log(err);

      });

    },
    update_professional: function (course, id) {

      Meteor.users.update({_id: id},{
        $push: {
          "department.0.professional.courses": course
        }
      },function(err, results){
          if(err) console.log(err);

      });

    },
    humanities_empty: function (id) {
      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].humanities.courses;

      if (typeof array == 'undefined' || array.length == 0) {
        return true;
      }
      else{return false;}
    },
    get_humanities_courses: function (id) {
      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].humanities.courses;

      return array;
    },
    social_sciences_empty: function (id) {
      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].social_sciences.courses;

      if (typeof array == 'undefined' || array.length == 0) {
        return true;
      }
      else{return false;}
    },
    get_social_sciences_courses: function (id) {
      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].social_sciences.courses;

      return array;
    },
    professional_empty: function (id) {
      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].professional.courses;

      if (typeof array == 'undefined' || array.length == 0) {
        return true;
      }
      else{return false;}
    },
    get_professional_courses: function (id) {
      var users = Meteor.users.find({_id:id}).fetch();

      var array = users[0].department[0].professional.courses;

      return array;
    },
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
    },
    message: function(course){

      Meteor.users.update(course.ownerID, {
        $push: {
          messages: course
        }
      });
    },
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




});
