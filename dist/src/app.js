"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const env_config_1 = __importDefault(require("./config/env.config"));
const db_config_1 = __importDefault(require("./config/db.config"));
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: env_config_1.default.CLIENT_ORIGIN,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
(0, db_config_1.default)();
exports.default = app;
