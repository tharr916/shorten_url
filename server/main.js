import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

//runs when user visits a route like localhost:3000/abcdefg
function onRoute(req, res, next) {
  //extract token and search for match in links collections
  const link = Links.findOne({ token: req.params.token });

  if (link) {
    //if link obj found,
    //increment count
    Links.update(link, { $inc: { clicks: 1}});
    // now redirect user there
    res.writeHead(307, { 'Location': link.url });
    res.end();
  }
  else {
    //if no link obj, send user thru to app
    next();

  }
}

const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);
