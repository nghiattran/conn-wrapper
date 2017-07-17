'use strict';

const EventEmitter = require('events');

module.exports = class Emitter extends EventEmitter {
  /**
   * Contructor
   * @param  {Object} conn Connection to be wrapped around.
   */
  constructor(conn) {
    super();
    
    let self = this;

    this.conn = conn;

    this.conn.on('message', function (m) {
      if (typeof m === 'string' || m instanceof String) {
        try {
          m = JSON.parse(m);
        } catch (e) {
          return self.emit('error', {
            content: 'Incorrect string format.',
            stack: e.stack.toString()
          });
        }
      }

      if (m.event) self.emit(m.event, m.body);
    });
  }

  /**
   * Send data through connection.
   * @param  {String} event Event name.
   * @param  {Any}    body  Payload to be sent.
   */
  send(event, body) {
    this.conn.send({
      event: event,
      body: body
    })
  }
}