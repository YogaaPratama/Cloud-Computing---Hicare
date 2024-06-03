const {getTextbyNameHandler,getAllTextHandler,savetextHandler, postPredictHandler, getPredictHistoriesHandler
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
    {
      method : 'POST',
      path : '/predict',
      handler: postPredictHandler,
      options:{
        payload :{
          allow : "multipart/form-data",
          maxBytes : 1000000,
          multipart : true,
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
  