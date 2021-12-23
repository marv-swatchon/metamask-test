"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
    }
    start() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)());
        this.app.use("/", router_1.default);
        this.app.listen(4000, () => console.log(`The process is running on 4000`));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map