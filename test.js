'use strict';

const assert = require('assert');
const cp = require('child_process');
const path = require('path');
const crypto = require('crypto');
const connWrapper = require('./');

function test(listener, child, done, data, opts) {
  if (!data) {
    data = {
      event: crypto.randomBytes(10).toString('hex'),
      body: crypto.randomBytes(10).toString('hex')
    }
  }

  let sendData = data;
  if (opts && opts.string) {
    sendData = JSON.stringify(sendData);
  }

  child.send(sendData);
  listener.once(data.event, function(body) {
    assert(body === data.body);
    done(); 
  });
}

describe('test', function() {
  const args = {
    env : { 
      FORK : 1 
    } 
  };

  const child = cp.fork(path.join(`${__dirname}`, 'child.js'), [], args);
  const listener = connWrapper(child);

  it('Pass json string', function(done) {
    test(listener, child, done);
  });

  it('Pass non-json string: expect error', function(done) {
    test(listener, child, done, 'hello world');
    listener.once('error', function () {
      done();
    })
  });

  it('Pass object', function(done) {
    test(listener, child, done);
  });
});