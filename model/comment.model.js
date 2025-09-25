const {DataTypes} = require('sequelize');
const db = require('./index');

const Comment = db.define('Comment',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    tableName: "comment"
});

module.exports = Comment;