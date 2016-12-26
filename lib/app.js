'use strict'

const defaults = require('defaults');

function RouteManager(options, json, messages ){
  options = defaults(options, {
     roles: ['ADMIN', 'MODERATOR', 'USER', 'GUEST']
  });
  
  if (typeof options.role !== 'array')
    throw new Error('Role is not valid.');
  
  function routeMangaer(req, res, next){
    let userRole = req.role;

    if(userRole === "ADMIN")
      return next();

    let newUri = `${req.originalMethod} ${req.originalUrl}`;
    for(var index in req.params) {
      newUri = newUri.replace(req.params[index], '%s');
    }
    
    if(json[newUri][userRole])
      return next();

    return res.status(401).json({message: messages.api.unauthorized});
  }
}

module.exports = RouteManager;