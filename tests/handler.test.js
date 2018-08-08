const tape = require('tape');

tape('test that tape is working',(t) => {
  t.equals("cat","cat","cat should equal cat");
  t.end();
})