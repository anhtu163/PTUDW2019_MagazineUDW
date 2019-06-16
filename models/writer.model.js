var db = require('../utils/db');

module.exports = {
    userByID: (id) => {
        return db.load('select * from user where id == id');
    },
    insert_post: (post) => {
        return db.load(`INSERT INTO post VALUES ${post}`);
    } ,
    //update_post: (post) => {
    //    return db.load(`UPDATE post SET tbl_todo.title = ?, tbl_todo.completed = ? WHERE tbl_todo.id = ?`);
    //},
    delete_post: (postID) => {
        return db.load(`DELETE FROM post WHERE post.id = ${postID}`);
    } 
}