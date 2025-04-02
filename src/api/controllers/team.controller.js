const { deleteFile } = require("../../utils/deleteFile");
const Team = require("../models/team.model");



const getTeams = async (req, res, next) => {
    try {
        const teams = await Team.find();
        return res.status(200).json(teams);
    } catch (error) {
        return res.status(400).json("Error");
    }
}

const getTeamById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const team = await Team.findById(id)

        return res.status(200).json(team);
    } catch (error) {
        return res.status(400).json("Error");
    }
}

const createTeam = async (req, res, next) => {
    try {
        const newTeam = req.body;

        if (req.file){
            newTeam.img = req.file.path;
        }

        const teamDuplicate = await newTeam.findOne({name: req.body.name});

        if(teamDuplicate){
            return res.status(400).json("Este equipo ya existe");
            
        }

        const saveTeam = await newTeam.save();

        return res.status(201).json(saveTeam);
    } catch (error) {
        return res.status(400).json("Error")        
    }
}

const updateTeam = async (req, res, next) =>  {
    try {
        const { id } = req.params;
        const newTeam = new Team(req.body);

        newTeam._id = id;

        const teamUpdated = Team.findByIdAndUpdate(id, newTeam, { new: true });

        return res.status(201).json(teamUpdated);
    } catch (error) {
        return res.status(400).json("Error")
    }
}

const deleteTeam = async (req, res, next) => {
    try {
        const { id } = req.params;

        const teamDeleted = Team.findByIdAndDelete(id);

        deleteFile(teamDeleted.img);

        return res.status(200).json({
            message: "Equipo eliminado",
            element: teamDeleted,
        });
    } catch (error) {
        return res.status(400).json("Error")
    }
}

module.exports = {
    getTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam
}