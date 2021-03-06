const tape = require('tape');
const supertest = require('supertest');
const router = require('../src/router');
const runDbBuild = require('../src/database/db_build');


tape('test that tape is working in handler test file',(t) => {
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

tape('test bad public request returns 500', (t) => {
  supertest(router)
    .get('/public/notafile.css')
    .expect(500)
    .expect('Content-Type',/html/)
  .end(function(err, res) {
    if (err) throw err;
    t.equals(res.statusCode, 500, "bad public request should respond with code 500")
    t.end();
  });
})

tape('test bad url returns 404', (t) => {
  supertest(router)
    .get(`/catsarecool`)
    .expect(404)
    .expect('Content-Type',/html/)
    .end(function(err, res) {
      if (err) throw err;
      t.equals(res.statusCode, 404, "bad url should respond with code 404");
      t.end();
    });
});    

  // test /users
tape('user route returns data - JSON', (t) => {
  supertest(router)
    .get('/users')
    .expect(200)
    .expect('Content-Type', /json/)
    .end( (err, res) => {
      if (err) throw err;
      t.equals(res.statusCode, 200, "users route returns status code 200");
      t.end();
    });
});

  // test /submit offer
tape('submit route returns 302 redirect', (t) => {
  runDbBuild( (err, res) => {
    if (err) {
      throw err;
    } else {
      supertest(router)
      .post('/submit')
      .send('name=john&email=john@gmail.com&skill=CSS&option=offer')
      .expect(302)
      .end( (err, res) => {
          if (err) throw (err);
          t.equals(res.statusCode, 302, "/submit route returns redirect");
          t.end();
      });
    }
  })
  
})

tape('submit route returns 302 redirect', (t) => {
  runDbBuild( (err, res) => {
    if (err) {
      throw err;
    } else {
      supertest(router)
      .post('/submit')
      .send('name=Ron&email=Ron@weasley.com&skill=magic&option=request')
      .expect(302)
      .end( (err, res) => {
          if (err) throw (err);
          t.equals(res.statusCode, 302, "/submit route returns redirect");
          t.end();
      });
    }
  })
  
})