import { Router } from "express";
import { CreateNewsController } from "../controllers/news/CreateNews.controller";
import { DeleteNewsController } from "../controllers/news/DeleteNews.controller";
import { GetNewsController } from "../controllers/news/GetNews.controller";
import { UpdateNewsController } from "../controllers/news/UpdateNews.controller";
import { VerifyROLEMiddleware } from "../middlewares/VerifyRole.middleware";
import { VerifyTokenMiddleware } from "../middlewares/VerifyToken.middleware";
import { GetNewController } from '../controllers/news/GetNew.controller';

export const newsRouter = Router();

//Middlewares
const verifyTokenMiddleware = new VerifyTokenMiddleware();
const verifyRoleMiddleware = new VerifyROLEMiddleware();

//Controllers
const createNewsController = new CreateNewsController();
const getNewController = new GetNewController();
const getNewsController = new GetNewsController();

newsRouter.get("", getNewsController.run);
newsRouter.get(
  "/:uuid",
  [verifyTokenMiddleware.run, verifyRoleMiddleware.run],
  getNewController.run
  );
newsRouter.post(
  "",
  [verifyTokenMiddleware.run, verifyRoleMiddleware.run],
  createNewsController.run
);

newsRouter.put(
  "/:uuid",
  [verifyTokenMiddleware.run, verifyRoleMiddleware.run],
  new UpdateNewsController().run
);

newsRouter.delete(
  "/:uuid",
  [verifyTokenMiddleware.run, verifyRoleMiddleware.run],
  new DeleteNewsController().run
);
