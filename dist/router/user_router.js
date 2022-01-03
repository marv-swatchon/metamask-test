"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = __importDefault(require("../service/user_service"));
const userService = new user_service_1.default();
const userRouter = express_1.default.Router();
userRouter.post("/nonce", (req, res, next) => {
    const publicAddress = req.body.publicAddress;
    const nonce = userService.generateNonce(publicAddress);
    res.send({ nonce });
});
userRouter.post("/login", (req, res, next) => {
    const publicAddress = req.body.publicAddress;
    const signature = req.body.signature;
    const token = userService.login(publicAddress, signature);
    if (token !== "") {
        res.send({ token });
    }
    else {
        res.status(400).send("Invalid Parameters");
    }
});
exports.default = userRouter;
//# sourceMappingURL=user_router.js.map