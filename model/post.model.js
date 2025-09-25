const {DataTypes} = require('sequelize');
const db = require('./index');

const Post = db.define('Post',{ 
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    tableName: "post"
});

module.exports = Post;