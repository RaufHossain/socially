import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('users', function() {

    // in server/publish.js
    Meteor.publish(null, function (){
      return Meteor.roles.find({})
    });

    return Meteor.users.find({}, {
      fields: {
        emails: 1,
        username: 1,
        profile: 1,
        courses: 1,
        messages: 1
      }
    });
  });
}
