const mongoose = require("mongoose");
const Team = require("../../api/models/team.model");
const teams = require("../../data/teams");

// Enlazamos semilla con DB mediante .env
const lanzarSemilla = async () => {
    try {   
        await mongoose.connect(process.env(DB_URL)); //usamos .env para conectar semilla a la BBDD
        
        await Team.collection.drop();
        console.log("Equipos eliminados");

        await Team.insertMany(teams);
        console.log("Equipos añadidos");

        await mongoose.disconnect();
        console.log("Desconectamos semilla de la BBDD");     
        
        
    } catch (error) {
        console.log("Error lanzando semilla")
    }
}

lanzarSemilla();
