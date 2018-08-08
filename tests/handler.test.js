const tape = require('tape');
const supertest = require('supertest')
const router = require('../src/router')

tape('test that tape is working',(t) => {
  t.equals("cat","cat","cat should equal cat");
  t.end();
}) 

tape('Check Home routes returns status code 200', (t) => {
  supertest(router)
  .get("/")
  .expect(200)
  .expect("Content-Type", /html/)
  .end((err,res) => {
    t.error(err, "no error");
    t.equal(res.statusCode, 200, "Should return 200");
    t.end();
  })
});

