const User = require ('./user.model');
const Comment = require ('./comment.model');
const Post = require ('./post.model');

const relate = async () => {
    // hasMany => 1:N
    await User.hasMany(Post, {foreignKey: 'userId', as: 'posts'});
    await Post.hasMany(Comment, {foreignKey: 'id', as: 'comments'});
    await User.hasMany(Comment, {foreignKey: 'userId', as: 'comments'});

    // belongsTo => N:1
    await Post.belongsTo(User, {foreignKey: 'userId', as: 'author'});
    await Comment.belongsTo(Post, {foreignKey: 'id', as: 'post'});
    await Comment.belongsTo(User, {foreignKey: 'userId', as: 'author'});
}

module.exports = relate;