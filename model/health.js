const connection = require('../connection');

const db = {
  getAllCholesterol: function (userID, cb) {
    connection.query(`SELECT * FROM cholesterol WHERE user='${userID}' ORDER BY date ASC;`, function (err, data) {
      if (err) {
        console.log(err);
        throw err;
      }
      cb(data);
    })
  },
  addNewCholesterol: function (userID, date, amount, cb) {
    date = new Date(date).toLocaleDateString();
    let dateList = date.split('/');
    date = `${dateList[dateList.length - 1]}-${dateList[0]}-${dateList[1]}`
    connection.query(`INSERT INTO cholesterol(user, amount, date) VALUES('${userID}', ${amount}, DATE('${date}'))`, function (err, data) {
      if (err) {
        console.log(err);
        throw err;
      }
      cb(data);
    })
  },
  getAllHeartRate: function (userID, cb) {
    connection.query(`SELECT * FROM heartrate WHERE user='${userID}' ORDER BY date ASC;`, function (err, data) {
      if (err) {
        console.log(err);
        throw err;
      }
      cb(data);
    })
  },
  addNewHeartRate: function (userID, date, amount, cb) {
    date = new Date(date).toLocaleDateString();
    let dateList = date.split('/');
    date = `${dateList[dateList.length - 1]}-${dateList[0]}-${dateList[1]}`;
    console.log(date, amount);
    connection.query(`INSERT INTO heartrate(user, amount, date) VALUES('${userID}', ${amount}, DATE('${date}'))`, function (err, data) {
      if (err) {
        console.log(err);
        throw err;
      }
      cb(data);
    })
  }
}


module.exports = db;