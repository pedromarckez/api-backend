const mongoose = require("mongoose");
const Team = require("../../api/models/team.model");
const teams = require("../../data/teams");


const lanzarSemilla = async () => {
    try {   
        await mongoose.connect("mongodb+srv://pedromarquez93:wrs3M2AH57XCV5WD@cluster0.muoct4g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        
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