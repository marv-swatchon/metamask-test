import express from "express";
import UserService from "../service/user_service";

const userService = new UserService();
const userRouter = express.Router();

userRouter.post("/nonce", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const publicAddress = req.body.publicAddress;
  const nonce = userService.generateNonce(publicAddress);

  res.send({ nonce });
});

userRouter.post("/login", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const publicAddress = req.body.publicAddress;
  const signature = req.body.signature;

  res.send({ publicAddress, signature });
});

export default userRouter;