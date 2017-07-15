# conn-wrapper

A simple wrapper for connections which only allows passing string.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

## Usecase

There are a lots of times communication through connections and processes require dynamic Event Emitter rather than only listening on `message` event. This module allows dev to create events dynamicly through those connections.

## Installation

```
  npm install --save conn-wrapper
```

## Usage

### Vanila

```js
const cp = require('child_process');

const child = cp.fork(path.join('./child.js'));

child.on('message', function(message) {
  m = JSON.parse(message);

  if (m.event === 'event1') {
    // Do something
  } else if (m.event === 'event2') {
    // Do something
  } else if (m.event === 'event2') {
    ...
  }
  ...
})
```

### With conn-wrapper


```js
const connWrapper = require('conn-wrapper');
const cp = require('child_process');

const child = cp.fork(path.join('./child.js'));
const listener = connWrapper(child);

listener.on('event1', function(body) {
  // Do something
})

listener.on('event3', function(body) {
  // Do something
})

listener.on('event2', function(body) {
  // Do something
})
```

To achieve this, the `message` sent by `conn.send()` must be a json or json format string. All other type will be ignored. 

The message has 2 fields: `event` (name of the event to be listened on) and `body` (optinal, main content).


## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## Created with
[Yeoman](https://npmjs.org/package/yo) and [Generator-simple-package](https://npmjs.org/package/generator-simple-package)

## License
MIT © [nghiattran]()

[npm-image]: https://badge.fury.io/js/conn-wrapper.svg
[npm-url]: https://npmjs.org/package/conn-wrapper
[travis-image]: https://travis-ci.org/nghiattran/conn-wrapper.svg?branch=master
[travis-url]: https://travis-ci.org/nghiattran/conn-wrapper
[daviddm-image]: https://david-dm.org/nghiattran/conn-wrapper.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/nghiattran/conn-wrapper
[coveralls-image]: https://coveralls.io/repos/nghiattran/conn-wrapper/badge.svg
[coveralls-url]: https://coveralls.io/github/nghiattran/conn-wrapper
