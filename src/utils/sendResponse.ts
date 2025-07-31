import { Response } from "express";
interface IResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: object | null;
}

export const sendResponse = (res: Response, data: IResponse): void => {
  res.status(data.statusCode).send({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
