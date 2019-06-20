var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`ID` where IsPublish = 1 ORDER BY Date DESC ');
    },
    newsOrderByViewNum:() => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`ID` where IsPublish = 1 ORDER BY ViewNum DESC LIMIT 5 OFFSET 1 ');
    }, 
    newsByBestViewNum: () => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`ID` where IsPublish = 1 ORDER BY ViewNum DESC LIMIT 1 ');
    },
    lastest_news: () => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`ID` where IsPublish = 1 ORDER BY Date DESC LIMIT 1');
    },
    top_news_1:()=>{
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`ID` where IsPublish = 1 ORDER BY Date DESC LIMIT 1 OFFSET 1');
    },
    top_news_2: () => {
        return db.load('select * from post inner join category on post.`CatID` = category.`CatID` inner join user on post.`CreatorID` = user.`ID` where IsPublish = 1 ORDER BY Date DESC LIMIT 1 OFFSET 2');
    },
    detail: id =>{
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join user on post.CreatorID = user.ID where PostID = ${id} `);
    },
    news_relative_cat: id=>{
       
        
        return db.load(`SELECT * FROM post WHERE IsPublish = 1 and CatID = (select CatID from post as p1 where p1.CatID =  (select CatID from post as p2 where p1.PostID = ${id} LIMIT 1))`)
        //return db.load(`select * from post where CatID = ${id} LIMIT 5`);
    },
    newsByCat: id => {
        
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join user on post.CreatorID = user.ID where IsPublish = 1 and post.CatID = ${id} `);
    },
    pageByCat: (id, limit, offset) => {
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join user on post.CreatorID = user.ID where IsPublish = 1 and post.CatID = ${id} limit ${limit} offset ${offset}`);
    },
    countByCat: id =>{
        return db.load(`select count(*) as total from post where IsPublish = 1 and post.CatID = ${id} `);
    },
    addView: id =>{
        
        return db.load(`UPDATE post
        SET ViewNum = ViewNum + 1
        WHERE PostID = ${id}`);
        
    },
    search: str =>{
        return db.load(`select * from post inner join category ON post.CatID = category.CatID inner join user ON post.CreatorID = user.ID  where IsPublish = 1 and Title LIKE '%${str}%' or Content LIKE '%${str}%' Order by IsPremium Desc`);
    },
    topNewsByCat: ()=>{
        return db.load(`SELECT * FROM (SELECT * FROM post GROUP BY post.CatID DESC) AS p1 inner join category ON p1.CatID = category.CatID inner join user ON p1.CreatorID = user.ID `);
    },
    newsByStatus: id => {
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join status on post.IsPublish = status.ID inner join user on post.CreatorID = user.id where post.IsPublish = ${id} `);
    },
    newsByStatusAndCate: id => {
        return db.load(`select * from post inner join category on (post.CatID = category.CatID and post.CatID = ${id}) inner join status on post.IsPublish = status.ID inner join user on post.CreatorID = user.id where post.IsPublish = 2`);
    },
    allStatus: () => {
        return db.load(`select * from post inner join category on post.CatID = category.CatID inner join status on post.IsPublish = status.ID inner join user on post.CreatorID = user.id`);
    },
    updateNews: entity => {
        return db.update('post', 'PostID', entity);
    },
    addNews: entity => {
        return db.add('post', entity);
    },

    deleteNews: id => {
        return db.delete('post', 'PostID', id);
    }

    

}