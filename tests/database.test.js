const tape = require('tape');
const runDbBuild = require('../src/database/db_build');
const { addToDatabase, checkUsers, checkSkill, updateDB } = require('../src/postQueries')

tape("tape is working in database test file", t => {
  t.equals(1, 1, "one equals one");
  t.end();
});


// database functions
  // test offerWrite
  // test requestWrite

    // tape('test updateDB with non-existent user throws error', (t)=> {
    //   runDbBuild( function(err, res) {
    //     updateDB('George','george@me.com','Jungle','request', () => {
    //       t.throws(Error, /violates not-null constraint/, 'updateDB with not listed user should throw error' )
    //     });
    //   })
    // })

