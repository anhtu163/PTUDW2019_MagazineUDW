var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from post');
    },
    three_of_all: () => {
        return db.load('select * from post ORDER BY Date DESC LIMIT 1');
    },
    lastest: () => {
        return db.load(`select * from post where PostID = 6`);
    },
    detail: id =>{
        return db.load(`select * from post where PostID = ${id} `);
    }

}