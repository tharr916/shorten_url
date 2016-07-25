import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

Meteor.methods({
  'links.insert':function(url){
     check(url, Match.Where(url => validUrl.isUri(url)));

     //url valid, generate token and save url and token to db
     const token = Math.random().toString(36).slice(-8);
     Links.insert({ url, token, clicks: 0 }); //ES6 allows us to say just URL and TOKEN since same identifiers, while clicks is different
  }
});

export const Links = new Mongo.Collection('links');
