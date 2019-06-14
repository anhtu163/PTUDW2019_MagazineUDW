var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from category');
    },
    catById : id=>{
        return db.load(`select * from category where CatID = ${id}`);
    },
    catByGroupID :id => {
        return db.load(`select * from category where GroupID = ${id} `);
    },
    
    

}