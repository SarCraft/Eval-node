const express = require('express');
const userRoutes = require('./route/user.route');
const postRoutes = require('./route/post.route');
const commentRoutes = require('./route/comment.route');
require('./model/index');
const relate = require('./model/relate');

const app = express();

relate();

app.use(express.json());

app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);

module.exports = app;
