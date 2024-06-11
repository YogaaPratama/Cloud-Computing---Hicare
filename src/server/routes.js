const {getTextbyNameHandler,getAllTextHandler,savetextHandler,postPredictHandler,getPredictHistoriesHandler} = require('./handler');
  
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
          allow: 'multipart/form-data',
          // maxBytes: 50 * 1024 * 1024, // 50 MB limit
          multipart: true,
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
  