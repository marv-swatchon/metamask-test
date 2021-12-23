import express from "express";
import userRouter from "./user_router";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

router.use("/users", userRouter)

export default router;