const {getTextbyNameHandler,getAllTextHandler,savetextHandler
  ,getPredictHistoriesHandler,postPredictHandler} = require('./handler');
  
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

    {
      method : 'POST',
      path : '/predict',
      handler: postPredictHandler,
      options:{
        payload: {
          output: 'stream',
          parse: true,
          multipart: true,
          maxBytes: 10485760 // 10 MB
      },
      },
    },
    
    {
      method : 'GET',
      path : '/predict/histories',
      handler : getPredictHistoriesHandler
    }
  ];
  
  module.exports = routes;
  