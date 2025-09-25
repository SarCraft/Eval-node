const Post = require('../model/post.model');
const token = require('../middleware/auth');

exports.getAll = async (req,res) => {
    try{
        const posts = await Post.findAll();
        res.status(200).json(posts);
    }catch(e){
        res.status(400).json({error: "Impossible de récupérer les posts"})
    }
}

exports.getById = async (req,res) => {
    try{
        const post = await Post.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(post);
        }catch(e){
            res.status(400).json({e: "Impossible de récupérer le post"})
    }
}

exports.create = async (req,res) => {
    try{
        let post = await Post.create({
            title:req.body.title,
            content:req.body.content,
            userId:req.token.userId
        });
        res.status(201).json(post);
    }catch(e){
        res.status(400).json({error: "Impossible de créer le post"})
    }
}

exports.update = async (req,res) => {
    try {
        let post = await Post.findOne({
            where: {
                id: req.params.id,
            }
        });
        if(req.token.id !== post.id){
            return res.status(403).json("Vous n'avez pas le droit de modifier ce post");
        }
        if(req.body.title){
            post.title = req.body.title;
        }
        if(req.body.content){
            post.content = req.body.content;
        }
        
        post.save();
        res.status(201).json(post);
    }catch (e) {
        res.status(400).json({ error: "Impossible de modifier ce produit"})
    }
}

exports.delete = async (req,res) => {
    try {
        let post = await Post.findOne({
            where: {
                id: req.params.id,
            }
            
        });
        if(req.token.id !== post.id){
            return res.status(403).json("Vous n'avez pas le droit de supprimer ce post");
        }
        
        await Post.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({message: "Post supprimé"});
    } catch(e) {
        res.status(400).json({error: "Impossible de supprimer le post"})
    }
}