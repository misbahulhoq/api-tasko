import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SwaggerDefinition } from "swagger-jsdoc";
const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.4",
  info: {
    title: "Task Management API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Development server",
    },
  ],
};

const options: Options = {
  swaggerDefinition,
  apis: ["./src/routes/*"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
