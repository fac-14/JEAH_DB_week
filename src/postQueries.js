const offerSQL = ``;


const offerWrite = (name,email,skill) => {
  console.log('written offer');
  dbconnection.query(offerSQL, (err, requestData) => {
    if (err) throw err;
    else {
      console.log("sucessful offer write")
    }  
}

const requestWrite = (name,skill) => {
  console.log('written request')
}


module.exports = { offerWrite, requestWrite };