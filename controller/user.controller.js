const User = require('./../model/user.model'); //On importe le model user
const jwt = require ('jsonwebtoken'); //On importe la biblio qui gère les JWT
const bcryptjs = require ('bcryptjs'); //On importe la biblio pour hacher les mdp

// Pour récupèrer tous les users
// exports.getAll = async (res)=> {
//     try{
//         let userList = await User.findAll();
//         res.status(200).json(userList);
//     }catch(e){
//         res.status(400).json({error: "Impossible de récupérer les users"})
//     }
// }

//Pour récupérer un user par son id
exports.getById = async (req,res) => {
    try{
        let user = await User.findOne({
            where: {
                id: req.params.id //on filtre l'user par son id
            }
        });
        res.status(200).json(user);
    } catch(e){
        res.status(400).json({error: "Impossible de récupérer les users"})
    }
}

// Delete un user
// exports.delete = async (req, res) => {
//     try{
//         await User.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({message: "User supprimé"});
//     }catch(e){
//         res.status(400).json({error: "Impossible de supprimer le user"});
//         next(e);
//     }
// }

//Inscription
exports.signin = async (req, res, next) => {
    try {
        const hash = bcryptjs.hashSync(req.body.password, 10);
        let user = await User.create({
            email: req.body.email,
            username: req.body.username, // Ajouter le username
            password: hash
        });
        res.status(201).json({
            message: "Utilisateur créé avec succès",
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        });
    }catch(e){
        res.status(400).json({error: "Impossible de créer le compte"});
    }
}

// Connexion

exports.login = async (req, res) => {
    try{
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!user){
            return res.status(404).json({e: "Utilisateur non trouvé"});
        }
        if(!bcryptjs.compareSync(req.body.password, user.password)){
            return res.status(401).json({e: "Mot de passe incorrect"});
        }
        const token = jwt.sign({
            id:user.id,
        }, process.env.JWT_SECRET);
        res.status(200).json({user, token});
    }catch(e){
        res.status(400).json({error: "Impossible de se connecter"});
    }
}