var db = require('../utils/db');

module.exports = {
    CommentByPostID: id =>{
        return db.load(`select * from subscriber_cmt_post inner join user on  user.ID = subscriber_cmt_post.SubID where PostID = ${id} `);
    }

}

