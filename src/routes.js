const { postPredictHandler } = require("../src/handler");

const routes = [
    {
        path: "/predict",
        method: 'POST',
        handler : postPredictHandler,
    }
];

module.exports = routes;

