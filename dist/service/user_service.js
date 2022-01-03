"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ethUtil = __importStar(require("ethereumjs-util"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.filePath = __dirname + "/users.csv";
    }
    generateNonce(publicAddress) {
        let data = fs_1.default.readFileSync(this.filePath, { encoding: "utf8" });
        const rows = data.split("\n");
        let nonce = "";
        for (let index in rows) {
            if (index === "0") {
                continue;
            }
            let row = rows[index].split(",");
            if (row[0] === publicAddress) {
                nonce = row[1];
            }
        }
        if (nonce === "") {
            nonce = Math.floor(Math.random() * 1000000).toString();
            fs_1.default.appendFileSync(this.filePath, `${publicAddress},${nonce}\n`, { encoding: "utf8" });
        }
        return nonce;
    }
    login(publicAddress, signature) {
        let data = fs_1.default.readFileSync(this.filePath, { encoding: "utf8" });
        const rows = data.split("\n");
        let token = "";
        let id = 0;
        for (let index in rows) {
            if (index === "0") {
                continue;
            }
            let row = rows[index].split(",");
            if (row[0] === publicAddress) {
                id = parseInt(index);
                try {
                    const msg = `${row[1]}`;
                    // const msgBuffer = ethUtil.toBuffer(msg);
                    const msgBuffer = Buffer.from(msg);
                    const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
                    const sigParams = ethUtil.fromRpcSig(signature);
                    const publicKey = ethUtil.ecrecover(msgHash, sigParams.v, sigParams.r, sigParams.s);
                    const addressBuffer = ethUtil.publicToAddress(publicKey);
                    const address = ethUtil.bufferToHex(addressBuffer);
                    if (address.toLowerCase() === publicAddress.toLowerCase()) {
                        token = jsonwebtoken_1.default.sign({ userId: id }, "6we90uy61o9");
                        fs_1.default.writeFileSync(this.filePath, `publicAddress,nonce\n`, { encoding: "utf8" });
                        fs_1.default.appendFileSync(this.filePath, `${publicAddress},${Math.floor(Math.random() * 1000000).toString()}\n`, { encoding: "utf8" });
                    }
                    return token;
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
}
exports.default = UserService;
//# sourceMappingURL=user_service.js.map