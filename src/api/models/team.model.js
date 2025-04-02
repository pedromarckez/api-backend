const mongoose = require("mongoose");


const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        description: {
            type: String,
            require: true,
            trim: true
        },
        img: {
            type: String, 
            require: false,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);



const Team = mongoose.model("teams", teamSchema, "teams");
module.exports = Team;