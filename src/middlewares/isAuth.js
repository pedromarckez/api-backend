const User = require("../api/models/user.model");
const { verifyJwt } = require("../utils/jwt");


const isAuth = async (req, res, next) => {
    try {
        const [, token] = req.headers.authorization.split(" ");

        const { id } = verifyJwt(token);

        const user = await User.findById(id);
        
        if (!user) {
            return res.status(401).json("Usuario no encontrado");
        }

        user.password = null;
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json("Unauthorized")
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin"){
            return res.status(403).json("Acceso denegado. Se requieren permisos de administrador")
        }
        next()
    } catch (error) {
        return res.status(401).json("Unauthorized");
    }
}


module.exports = { isAuth, isAdmin }