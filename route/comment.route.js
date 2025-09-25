const express = require('express');
const router = express.Router();
const token = require('../middleware/auth');
const commentController = require('../controller/comment.controller');

// Routes pour les commentaires liés aux posts
router.post('/posts/:id/comments', token, commentController.create);
router.get('/posts/:id/comments', commentController.getAll);

// Routes pour les commentaires individuels
router.put('/comments/:id', token, commentController.update);
router.delete('/comments/:id', token, commentController.delete);

module.exports = router;
