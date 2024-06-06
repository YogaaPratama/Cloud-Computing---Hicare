require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("../server/routes");
// const loadModel = require("../services/loadModel");
// const InputError = require("../exceptions/InputError");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // const model = await loadModel();
  // server.app.model = model;

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
