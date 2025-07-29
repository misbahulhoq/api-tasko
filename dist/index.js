"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const env_config_1 = __importDefault(require("./src/config/env.config"));
app_1.default.listen(env_config_1.default.PORT, () => {
    console.log(`Server is running on port ${env_config_1.default.PORT}`);
});
