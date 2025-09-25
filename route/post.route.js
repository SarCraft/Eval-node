const express = require('express');
const router = express.Router();
const token = require('../middleware/auth');
const postController = require('../controller/post.controller');
const upload = require('../middleware/image');

router.get('/', postController.getAll);
router.get('/:id', postController.getById);

// Créer un post (avec ou sans image)
router.post('/', token, upload.single('image'), postController.create);

router.put('/:id', token, postController.update);
router.delete('/:id', token, postController.delete);

module.exports = router;
