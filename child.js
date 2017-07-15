'use strict';

if (process.env.FORK) {
  process.on('message', function(m) {
    process.send(m);
  });
}