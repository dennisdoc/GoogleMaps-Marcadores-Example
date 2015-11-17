# Logger

## Description 

This is a logger tool to log. Simple, efficient, it can take whatever input a conventional `console.log` or `console.error` can take.

*Logger* can be used both __server-side__ and __client-side__.

*Logger* is well designed, and let you know where the log is from in the code (*client-side*).

## Getting started

If you are using node:

    npm install --save https://github.com/jokesterfr/logger.git

If you are importing it in the browser

    bower install --save logger

## Available API

* Logger.prototype.emergency
* Logger.prototype.critical
* Logger.prototype.alert
* Logger.prototype.error
* Logger.prototype.warning
* Logger.prototype.notice
* Logger.prototype.info
* Logger.prototype.debug

## Alternatives

This logger tool is not designed to go much forward logging. A tool like [bunyan](https://github.com/trentm/node-bunyan) can be nice to play with - at least for *server-side* logging.

[Tracer](https://github.com/baryon/tracer) might be a good option for server-side logging.

## Contributing

This is a simple tool, it matches my/our needs, but you are very welcome to contribute.

Licenced under the [MIT Licence](./LICENCE).