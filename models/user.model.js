var db = require('../utils/db');

module.exports = {
    userByID: (id) => {
        return db.load(`select * from user inner join category on user.CatID=category.CatID inner join role on user.Role=role.RoleID where role.RoleID!=1 and role.RoleID!=4 and user.ID = ${id}`);
    },
    all: ()=>{
        return db.load(`select * from user inner join category on user.CatID=category.CatID inner join role on user.Role=role.RoleID where role.RoleID!=1 and role.RoleID!=4`);
    },
    allSub: ()=>{
        return db.load(`select * from user inner join category on user.CatID=category.CatID inner join role on user.Role=role.RoleID where user.Role=1`);
    },
    allRole: ()=>{
        return db.load(`select * from role`)
    },
    subByID: id=>{
        return db.load(`select * from user where Role=1 and ID=${id}`)
    },
    updateUser: entity =>{
        return db.update('user', 'ID', entity);
    },
    deleteUser: id=>{
        return db.delete('user', 'ID', id);
    }
}