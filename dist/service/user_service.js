"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    generateNonce(publicAddress) {
        return Math.floor(Math.random() * 1000000);
    }
}
exports.default = UserService;
//# sourceMappingURL=user_service.js.map