const upload = require("../../middlewares/file");
const { isAuth, isAdmin } = require("../../middlewares/isAuth");
const { getUsers, getUserById, registerUser, login, updateUser, deleteUser, updateUserRole } = require("../controllers/user.controller");

const userRouter = require("express").Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", upload.single("img"), registerUser);
userRouter.post("/login", login);
userRouter.put("/:id", isAuth, updateUser);
userRouter.put("/:id/role", isAuth, isAdmin, updateUserRole);
userRouter.delete("/:id", isAuth, deleteUser);

module.exports = userRouter;