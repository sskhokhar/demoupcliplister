import { Repository } from "typeorm";
import { AppDataSource } from "../../data-sources/pg-source";
import { unlinkSync } from "fs";
import { Asset } from "../entities";

export class AssetService {
  private assetRepo: Repository<Asset>;
  constructor() {
    this.assetRepo = AppDataSource.getRepository(Asset);
  }
  async getAssets(): Promise<Asset[]> {
    return this.assetRepo.find();
  }

  async getAssetById(id: number): Promise<Asset | null> {
    return this.assetRepo.findOne({ where: { id } });
  }

  async saveAsset(data: { fileName: string; filePath: string }) {
    return this.assetRepo.save(data);
  }

  async deleteAsset(id: number) {
    const asset = await this.assetRepo.findOne({ where: { id } });
    if (!asset) {
      throw new Error(`Asset with ID ${id} not found`);
    }
    const assetFile = asset.filePath;
    // delete the asset file
    unlinkSync(assetFile);
    await this.assetRepo.delete({ id });
    return true;
  }
}
