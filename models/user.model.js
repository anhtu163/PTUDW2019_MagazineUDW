var db = require('../utils/db');

module.exports = {
    userByID: (id) => {
        return db.load('select * from user where id == id');
    },
}