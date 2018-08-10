const dbconnection = require('./database/db_connection'); // this is the pool

const requestQuery = `SELECT users.name, users.email, skill AS skill_requests FROM users INNER JOIN requests ON users.id = requests.user_id INNER JOIN skills ON requests.skill_id = skills.id;`;

const offerQuery = `SELECT users.name, users.email, skill AS skill_offers FROM users INNER JOIN offers ON users.id = offers.user_id INNER JOIN
skills ON offers.skill_id = skills.id;`;

const getDatabase = (callback) => {
  let result = {};
  dbconnection.query(requestQuery, (err, requestData) => {
    if (err) throw err;
    else {
      result.requests = requestData.rows;
      dbconnection.query(offerQuery, (err, offerData) => {
        result.offers = offerData.rows;
        callback(result);
      });
    }
  });
}

module.exports = getDatabase;