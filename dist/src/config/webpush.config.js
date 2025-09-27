"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpush = void 0;
const web_push_1 = __importDefault(require("web-push"));
exports.webpush = web_push_1.default;
const env_config_1 = __importDefault(require("./env.config"));
web_push_1.default.setVapidDetails("mailto:extraordinarymisbah@gmail.com", env_config_1.default.PUBLIC_VAPID_KEY, env_config_1.default.PRIVATE_VAPID_KEY);
exports.default = web_push_1.default;
