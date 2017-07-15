'use strict';

const EventEmitter = require('events');

module.exports = function(listener) {
  const emitter = new EventEmitter();

  listener.on('message', function (m) {
    if (typeof m === 'string' || m instanceof String) {
      try {
        m = JSON.parse(m);
      } catch (e) {
        return emitter.emit('error', {
          content: 'Incorrect string format.',
          stack: e.stack.toString()
        });
      }
    }

    if (m.event) emitter.emit(m.event, m.body);
  })

  return emitter;
}