"use strict";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import { AppDataSource } from "./data-sources";
import { AssetModule } from "./asset";

const PORT = parseInt(process.env.PORT as string) || 3001;
const HOST = process.env.HOST || "0.0.0.0";

export const app = express();
app.use(cors());

/* Swagger integration */
const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs",
      version: "1.0.0",
    },
  },
  apis: ["./**/*.controller.ts"],
};
const openapiSpecification = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

/* Express Routes */
app.get("/", (req, res) => {
  res.json({ info: "App is running!" });
});
app.use("/assets", new AssetModule().router);

/* Error handler */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Oopsi, route not found");
});

bootstrap();
function bootstrap() {
  AppDataSource.initialize()
    .then(() => {
      console.log(`Connected to database`);
    })
    .catch((error) => console.log(error));
  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });
}
