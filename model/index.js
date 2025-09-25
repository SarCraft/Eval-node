const { Sequelize } = require("sequelize");
require('dotenv').config(); // appeler la librairie pour Charger le .env

const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST, //ici c'est sur localhost
        dialect: "mysql"
    }
)

db.authenticate()
.then(() => {
    console.log("✅ Connexion BDD OK");
})
.catch((e) => {
    console.error("❌ Error de connexion bdd : " + e.message);
});

module.exports = db;