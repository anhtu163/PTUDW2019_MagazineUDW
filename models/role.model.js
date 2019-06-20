var db = require('../utils/db');

module.exports = {
    RoleByUser: ID => {
        return db.load(`select * from role where RoleID = ${ID} LIMIT 1`);
    }

}