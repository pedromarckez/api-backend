const { deleteFile } = require("../../utils/deleteFile");
const { generateSign } = require("../../utils/jwt");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json("Error");
    }
}

const getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).populate("teams");
        if (user) {
            return res.status(200).json(user);
        }else{
            return res.status(404).json("Not user found by this id");
        }
    } catch (error) {
        return res.status(500).json("Error")
    }
}

const registerUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body)

        if (req.file){ 
            newUser.img = req.file.path;
        }

        const emailDuplicated = await User.findOne({ email: req.body.email });
        const userNameDuplicated = await User.findOne({ userName: req.body.userName });

        if(emailDuplicated){
            return res.status(400).json("Email ya existente");
        } else if(userNameDuplicated){
            return res.status(400).json("Nombre de usuario ya existente");
        }

        const userSaved = await newUser.save();
        return res.status(201).json(userSaved);
    } catch (error) {
        return res.status(401).json("Error")        
    }
}

const login = async (req, res, next) => {
    try {
        
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        
        if(!user){
            return res.status(400).json("Usuario o contraseña incorrectos");
        }

        if (bcrypt.compareSync(password, user.password)){
            const token = generateSign(user._id);
            return res.status(200).json({ token, user });
        }else{
            return res.status(400).json("Usuario o contraseña incorrectos");
        }

    } catch (error) {
        return res.status(400).json("Error");
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userLogged = req.user.id;

        if (id !== userLogged) {
            return res.status(400).json("Solo puedes modificar tu propio usuario");
        }

        // Verificamos si el usuario existe
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json("Usuario no encontrado");
        }

        const userUpdated = await User.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(201).json(userUpdated);
    } catch (error) {
        return res.status(400).json("Error");
    }
}

const updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Verificamos que el rol sea válido
        if (role !== "user" && role !== "admin") {
            return res.status(400).json("Rol no válido. Debe ser 'user' o 'admin'");
        }

        const roleUpdated = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        );

        if (!roleUpdated) {
            return res.status(404).json("Usuario no encontrado");
        }

        return res.status(200).json(roleUpdated);
    } catch (error) {
        return res.status(500).json("Error al actualizar el rol del usuario");
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Verificamos si el usuario existe
        const userToDelete = await User.findById(id);
        if (!userToDelete) {
            return res.status(404).json("Usuario no encontrado");
        }

        // Verificamos los permisos: admin puede eliminar cualquier usuario, usuario normal solo puede eliminarse a sí mismo
        if (req.user.role !== "admin" && req.user._id.toString() !== id) {
            return res.status(403).json("No tienes permiso para eliminar este usuario");
        }

        // Verificamos si el usuario tiene imagen y eliminarla
        if (userToDelete.img) {
            await deleteFile(userToDelete.img);
        }

        const userDeleted = await User.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Usuario eliminado",
            element: userDeleted,
        });
    } catch (error) {
        return res.status(500).json("Error al eliminar el usuario");
    }
}

module.exports = {
    getUsers,
    getUserById,
    registerUser,
    login,
    updateUser,
    updateUserRole,
    deleteUser
}
