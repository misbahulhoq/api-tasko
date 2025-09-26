"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    res.status(data.statusCode).send({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        data: data.data,
    });
};
exports.sendResponse = sendResponse;
exports.default = exports.sendResponse;
