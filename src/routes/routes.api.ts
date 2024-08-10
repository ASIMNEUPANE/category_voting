import express from "express";
const router = express.Router();
import { categoryRoutes } from "../modules/categories/category.route";
import { voteForCategory } from "../modules/vote/vote.controller";
// import blogRouter from '../modules/blog/blog.route'
// import authRouter from '../modules/auth/auth.routes'
// import userRouter from '../modules/users/user.routes'

router.use("/category", categoryRoutes);
router.use("vote", voteForCategory);
// router.use('/blogs',blogRouter);
// router.use('/auths',authRouter);
// router.use('/users',userRouter);

export default router;
