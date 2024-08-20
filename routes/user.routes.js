import express from 'express';
import { createUser, DeleteUser, getUser, getUsers, UpdateUser } from '../controller/user.controller.js';


const UserRouter = express.Router();

UserRouter.get("/", getUsers);
UserRouter.post("/", createUser);
UserRouter.get("/:id", getUser);
UserRouter.put("/:id", UpdateUser);
UserRouter.delete("/:id", DeleteUser);


export default UserRouter;