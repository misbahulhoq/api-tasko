"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("ts-jest");
const config = Object.assign(Object.assign({}, (0, ts_jest_1.createDefaultPreset)()), { testMatch: ["**/*.test.ts"] });
exports.default = config;
