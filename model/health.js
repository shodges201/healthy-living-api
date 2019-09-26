const connection = require('../connection');

const db = {
    getAllCholesterol: function(username, cb){
        console.log(username);
        connection.query(`SELECT * FROM cholesterol WHERE user='${username}'`, function(err, data){
            if (err) {
                console.log(error);
                throw err;
              }
            cb(data);
    })
    }
}


module.exports = db;