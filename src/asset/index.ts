import { Router } from "express";
import { AssetController } from "./controllers";
import { AssetService } from "./services";

export class AssetModule {
  public assetController: AssetController;
  public assetService: AssetService;
  public router: Router;
  constructor() {
    this.router = Router();
    this.assetService = new AssetService();

    this.assetController = new AssetController(this.assetService, this.router);
  }
}
