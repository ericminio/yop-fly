let http = require('http');
var url = require('url');
var port = 5001;

let LocalServer = function (handler) {
    this.handler = handler;
};
LocalServer.prototype.wrapHandler = function () {
    if (typeof this.handler == 'function') {
        return this.handler;
    } else {
        let self = this;
        return function (request, response) {
            var parsed = url.parse(request.url, true);
            response.setHeader('Access-Control-Allow-Origin', '*');
            if (self.handler[parsed.pathname]) {
                response.write(self.handler[parsed.pathname]);
            } else {
                var pattern = /^\/(.*)\.js$/;
                if (pattern.test(parsed.pathname)) {
                    var path = require('path').join(
                        __dirname,
                        '..',
                        '..',
                        pattern.exec(parsed.pathname)[1] + '.js',
                    );
                    var content = require('fs').readFileSync(path).toString();
                    response.setHeader(
                        'Content-Type',
                        'application/javascript',
                    );
                    response.write(content);
                } else {
                    if (typeof self.handler == 'string') {
                        response.setHeader('Content-Type', 'text/html');
                        response.write(self.handler);
                    } else {
                        if (
                            self.handler.json &&
                            self.handler.json[request.url]
                        ) {
                            response.setHeader(
                                'Content-Type',
                                'application/json',
                            );
                            response.write(
                                JSON.stringify(self.handler.json[request.url]),
                            );
                        } else {
                            response.setHeader('Content-Type', 'text/plain');
                            response.statusCode = 404;
                            response.write('not found');
                        }
                    }
                }
            }
            response.end();
        };
    }
};
LocalServer.prototype.start = function (done) {
    let self = this;
    self.server = http.createServer(self.wrapHandler());
    self.server.on('error', (e) => {
        self.server.listen(++port);
    });
    self.server.on('listening', () => {
        self.port = port;
        done();
    });
    self.server.listen(++port);
};
LocalServer.prototype.stop = function (done) {
    if (this.server.listening) {
        this.server.close(done);
    } else {
        done();
    }
};

module.exports = LocalServer;
