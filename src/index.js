var Hapi = require('hapi');
var Path = require('path');
var Hapi = require('hapi');
var Hoek = require('hoek');
var server = new Hapi.Server();

server.connection({ port: process.env.PORT });

server.register(require('vision'), function (err) {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'views'
    });
    server.register(require('inert'), function (err) {

        Hoek.assert(!err,err);

        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                reply.view('index');
            }
        });

        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: __dirname + '/public'
                }
            }
        });

        server.start(function () {
            console.log('Server running at:', server.info.uri);
        });
    });
});
