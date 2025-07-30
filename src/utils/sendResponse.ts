import { Response } from "express";

export const sendResponse = (
  res: Response,
  statusCode: number,
  data: object
): void => {
  res.status(statusCode).send(data);
};

export default sendResponse;
