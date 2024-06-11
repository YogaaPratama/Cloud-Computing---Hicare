require("dotenv").config();

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const routes = require("../server/routes");
const loadModel = require("../services/loadModel");
const InputError = require("../exceptions/InputError");
const init = async () => {
  const server = Hapi.server({
    port: 9890,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(Inert);

      server.ext('onRequest', (request, h) => {
        console.log(`Received request: ${request.method.toUpperCase()} ${request.path}`);
        return h.continue;
    });

  const model = await loadModel();
  server.app.model = model;

  server.route(routes);
  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    if (response instanceof InputError) {
        const newResponse = h.response({
            status: "fail",
            message: response.message,
        });
        newResponse.code(400);
        return newResponse;
    }

    if (response.isBoom) {
        const newResponse = h.response({
            status: "fail",
            message: response.message,
        });
        newResponse.code(413);
        return newResponse;
    }

    return h.continue;
});

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
