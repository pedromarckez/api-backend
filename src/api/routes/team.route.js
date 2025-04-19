const upload = require("../../middlewares/file");
const { isAdmin } = require("../../middlewares/isAuth");
const {getTeams, getTeamById, createTeam, updateTeam, deleteTeam } = require("../controllers/team.controller");

const teamsRouter = require("express").Router();

teamsRouter.get("/", getTeams);
teamsRouter.get("/:id", getTeamById);
teamsRouter.post("/", isAdmin, upload.single("img"), createTeam);
teamsRouter.put("/:id", isAdmin, updateTeam);
teamsRouter.delete("/:id", isAdmin, deleteTeam);


module.exports = teamsRouter;