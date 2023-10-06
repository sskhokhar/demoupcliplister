import { Asset } from "src/asset/entities";
import { AppDataSource } from "src/data-sources";

import { Repository } from "typeorm";

describe("Asset", () => {
  let pgAssetRepo: Repository<Asset>;

  beforeAll(async () => {
    await AppDataSource.initialize();
    pgAssetRepo = AppDataSource.getRepository(Asset);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should create an asset", async () => {
    await pgAssetRepo.save({
      fileName: "test file",
      filePath: "test file path",
    });
    const assets = await pgAssetRepo.find();
    expect(assets[0].id).toEqual(1);
  });
});
