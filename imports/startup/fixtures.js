import { Meteor } from 'meteor/meteor';
import { Parties } from '../api/parties/index';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

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

});
