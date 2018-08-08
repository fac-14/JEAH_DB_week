const tape = require('tape');
const supertest = require('supertest');
const router = require('../src/router');

tape('test that tape is working',(t) => {
  t.equals("cat","cat","cat should equal cat");
  t.end();
})

tape('test css route is working',(t)=>{
  supertest(router)
  .get('/public/main.css')
  .expect(200)
  .expect("Content-Type",/css/)
  .end(function(err, res) {
    if (err) throw err;
    t.equals(res.statusCode, 200, "CSS request should respond with code 200")
    t.end();
  });
})

tape('test app.js route is working',(t)=>{
  supertest(router)
  .get('/public/app.js')
  .expect(200)
  .expect('Content-Type',/javascript/ig)
  .end(function(err, res) {
    if (err) throw err;
    t.equals(res.statusCode, 200, "app.js request should respond with code 200")
    t.end();
  });
})






