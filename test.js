'use strict';

const assert = require('assert');
const cp = require('child_process');
const path = require('path');
const crypto = require('crypto');
const ConnWrapper = require('./');

function test(listener, done, data, opts) {
  if (!data) {
    data = {
      event: crypto.randomBytes(3).toString('hex'),
      body: crypto.randomBytes(3).toString('hex')
    }
  }

  listener.once(data.event, function(body) {
    assert(body === data.body);
    done(); 
  });

  let payload = data;
  if (opts && opts.string) {
    payload = JSON.stringify(payload);
  }

  listener.send(data.event, data.body);
}

describe('test', function() {
  const args = {
    env : { 
      FORK : 1 
    } 
  };

  const child = cp.fork(path.join(`${__dirname}`, 'child.js'), [], args);
  const listener = new ConnWrapper(child);

  it('Pass json string', function(done) {
    test(listener, done);
  });

  it('Pass non-json string: expect error', function(done) {
    listener.once('error', function () {
      done();
    })
    child.send('hello world')
  });

  it('Pass object', function(done) {
    test(listener, done);
  });
});