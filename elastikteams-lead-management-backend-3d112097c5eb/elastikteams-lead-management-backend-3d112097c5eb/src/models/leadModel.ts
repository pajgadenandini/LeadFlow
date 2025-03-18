import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from "sequelize-typescript";
import { UserModel } from "./userModel";
import { ActivityModel } from "./activityModel";

@Table
export class LeadModel extends Model {
  static find(query: {}) {
    throw new Error("Method not implemented.");
  }
  static countDocuments(query: {}, arg1: (err: any, count: any) => any) {
    throw new Error("Method not implemented.");
  }
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  contactNo!: string;

  @Column
  clientName!: string;

  @Column
  clientEmail!: string;

  @Column
  urlLink!: string;

  @Column
  source!: string;

  @Column
  createdAt!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [["New", "Engaging", "Proposal", "Closed Win", "Closed Missed"]],
    },
  })
  currentStatus!: string;

  @ForeignKey(() => UserModel)
  @Column
  userId!: number;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @HasMany(() => ActivityModel, { onDelete: "CASCADE", hooks: true })
  activities!: ActivityModel[];
}

export default LeadModel;
