const {getTextbyNameHandler,getAllTextHandler,savetextHandler
  } = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/texts',
      handler: savetextHandler
    },
    {
      method: 'GET',
      path: '/texts',
      handler: getAllTextHandler
    },
    {
      method: 'GET',
      path: '/texts/{textName}',
      handler: getTextbyNameHandler
    },
  ];
  
  module.exports = routes;
  