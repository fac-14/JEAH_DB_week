const tape = require('tape');
const runDbBuild = require('../src/database/db_build');
const { offerWrite, requestWrite } = require('../src/postQueries')

tape("tape is working in database test file", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});


// database functions
  // test offerWrite
  // test requestWrite

    // tape('test offerWrite writes to database', (t)=> {
    //   runDbBuild( function(err, res) {
    //    // your test goes here
    //   })
    // })

