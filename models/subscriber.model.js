var db = require('../utils/db');

module.exports = {
    all:() =>{
        return db.load(`select * from user`);
    },
    single: id =>{
        return db.load(`select * from user where ID = ${id}`);
    },
    singleByEmail: email=>{
        return db.load(`select * from user where Email = '${email}'`);
    },
    add: entity => {
        return db.add('user',entity);
    },
    update: entity =>{
        return db.update('user','ID',entity);
    }

}