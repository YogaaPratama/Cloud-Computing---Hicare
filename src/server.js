require('dotenv').config();

const Hapi = require("@hapi/hapi");
const routes = require("../src/routes");

(async () => {
    const server = Hapi.server({
        port: 9000,
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
    console.log(`Server start at: ${server.info.uri}`);
})();



