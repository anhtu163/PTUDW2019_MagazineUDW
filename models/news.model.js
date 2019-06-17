var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join status on post.`IsPublish` = status.`ID` inner join user on post.`CreatorID` = user.`id` ORDER BY Date DESC ');
    },
    newsOrderByViewNum:() => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`id` ORDER BY ViewNum DESC LIMIT 5 OFFSET 1 ');
    },
    newsByBestViewNum: () => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`id` ORDER BY ViewNum DESC LIMIT 1 ');
    },
    lastest_news: () => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`id` ORDER BY Date DESC LIMIT 1');
    },
    top_news_1:()=>{
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`id` ORDER BY Date DESC LIMIT 1 OFFSET 1');
    },
    top_news_2: () => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`id` ORDER BY Date DESC LIMIT 1 OFFSET 2');
    },
    detail: id =>{
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join user on post.CreatorID = user.id where PostID = ${id} `);
    },
    newsByCat: id => {
        
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join user on post.CreatorID = user.id where post.CatID = ${id} `);
    },
    pageByCat: (id, limit, offset) => {
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join user on post.CreatorID = user.id where post.CatID = ${id} limit ${limit} offset ${offset}`);
    },
    countByCat: id =>{
        return db.load(`select count(*) as total from post where post.CatID = ${id} `);
    },
    addView: id =>{
        
        return db.load(`UPDATE post
        SET ViewNum = ViewNum + 1
        WHERE PostID = ${id}`);
        
    },
    newsByStatus: id =>{
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join status on post.IsPublish = status.ID inner join user on post.CreatorID = user.id where post.IsPublish = ${id} `);
    },
    updateNews: entity =>{
        return db.update('post', 'PostID', entity);
    },
    addNews: entity=>{
        return db.add('post', entity);
    }

    

}