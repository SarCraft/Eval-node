const Comment = require('../model/comment.model');

exports.getAll = async (req,res) => {
    try{
        const comments = await Comment.findAll({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(comments);
    }catch(e){
        res.status(400).json({error: "Impossible de récupérer les commentaires"})
    }
}

exports.getAll = async (req,res) => {
    try{
        const comment = await Comment.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(comment);
        }catch(e){
            res.status(400).json({e: "Impossible de récupérer le comment"})
    }
}

exports.create = async (req,res) => {
    try{
        let comment = await Comment.create({
            content: req.body.content,
            id: req.params.id,
            userId: req.token.id
        });
        res.status(201).json(comment);
    }catch(e){
        res.status(400).json({error: "Impossible de créer le comment"})
    }
}

exports.update= async (req,res) => {
    try {
        let comment = await Comment.findOne({
            where: {
                id: req.params.id,
            }
        });
        if(req.token.id !== comment.userId){
            return res.status(403).json("Vous n'avez pas le droit de modifier ce comment");
        }
        if(req.body.content){
            comment.content = req.body.content;
        }
        
        await comment.save();
        res.status(201).json(comment);
    }catch (e) {
        res.status(400).json({ error: "Impossible de modifier ce comment"})
    }
}

exports.delete = async (req,res) => {
    try {
        let comment = await Comment.findOne({
            where: {
                id: req.params.id,
            }
        });
        if(req.token.id !== comment.userId && req.token.id !== comment.id){
            return res.status(403).json("Vous n'avez pas le droit de supprimer ce comment");
        }
        await Comment.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({message: "Comment supprimé"});
    } catch(e) {
        res.status(400).json({error: "Impossible de supprimer le Comment"})
    }
}