var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`id`');
    },
    lastest_news: () => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`id` ORDER BY Date DESC LIMIT 1');
    },
    lastest: () => {
        return db.load(`select * from post where PostID = 6`);
    },
    detail: id =>{
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join user on post.CreatorID = user.id where PostID = ${id} `);
    },
    newsByCat: id => {
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join user on post.CreatorID = user.id where post.CatID = ${id} `);
    },
    

}