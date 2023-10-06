import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  fileName: string;

  @Column("text")
  filePath: string;
}
