import express from 'express';
import UserRouter from './user.routes.js';

const Router = express.Router();

Router.use("/api/v1/user", UserRouter);


export default Router;