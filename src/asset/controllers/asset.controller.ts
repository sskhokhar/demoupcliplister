import { Request, Response, Router } from "express";
import { param } from "express-validator";

import { AssetService } from "../services";
import { upload } from "../../utils/multer";
import multer from "multer";

export class AssetController {
  constructor(
    private service: AssetService,
    private router: Router,
  ) {
    this.router.get("/", this.getAssets.bind(this));
    this.router.get(
      "/:id",
      param("id").notEmpty(),
      this.getAssetById.bind(this),
    );
    this.router.post("/", this.uploadAsset.bind(this));
    this.router.delete(
      "/:id",
      param("id").notEmpty(),
      this.deleteAsset.bind(this),
    );
  }

  /**
   * @openapi
   * /assets:
   *   get:
   *     description: Get All Assets
   *     responses:
   *       200:
   *         description: success response.
   */
  async getAssets(req: Request, res: Response) {
    const assets = await this.service.getAssets();
    return res.json(assets);
  }

  /**
   * @openapi
   * /assets/{id}:
   *   get:
   *     description: Get a single asset
   *     parameters:
   *        - name: id
   *          in: path
   *          required: true
   *     responses:
   *       200:
   *         description: success response.
   */
  async getAssetById(req: Request, res: Response) {
    const asset = await this.service.getAssetById(parseInt(req.params.id));
    if (!asset) {
      return res
        .status(404)
        .send({ message: "Asset with the provided ID not found" });
    }
    return res.json(asset);
  }

  /**
   * @openapi
   * /assets:
   *   post:
   *     description: Upload an asset
   *     requestBody:
   *        content:
   *           multipart/form-data:
   *             schema:
   *               type: object
   *               properties:
   *                fileName:
   *                  type: string
   *                  name: File Name
   *                  required: true
   *                file:
   *                  type: string
   *                  name: File
   *                  required: true
   *                  format: binary
   *     responses:
   *       200:
   *         description: success response.
   */
  uploadAsset(req: Request, res: Response) {
    upload.single("file")(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
      } else if (err) {
      }
      const filePath = req.file?.path as string;
      const fileName = req.body.fileName;
      const asset = await this.service.saveAsset({
        fileName,
        filePath,
      });
      return res.json(asset);
    });
  }

  /**
   * @openapi
   * /assets/{id}:
   *   delete:
   *     description: Delete single asset
   *     parameters:
   *        - name: id
   *          in: path
   *          required: true
   *     responses:
   *       200:
   *         description: success response.
   */
  async deleteAsset(req: Request, res: Response) {
    try {
      await this.service.deleteAsset(parseInt(req.params.id));
      return res.json({ message: "Asset deleted successfully" });
    } catch (error: any) {
      return res.status(404).send({ message: error.message });
    }
  }
}
