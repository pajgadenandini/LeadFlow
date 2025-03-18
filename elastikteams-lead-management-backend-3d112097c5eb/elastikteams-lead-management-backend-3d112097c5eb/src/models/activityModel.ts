import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { UserModel } from "./userModel";
import { LeadModel } from "./leadModel";
import { Sequelize } from "sequelize";

@Table
export class ActivityModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  timestamp!: Date;

  @Column
  comment!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [["New", "Engaging", "Proposal", "Closed Win", "Closed Missed"]],
    },
  })
  status!: string;

  @ForeignKey(() => UserModel)
  @Column
  userId!: number;

  @BelongsTo(() => UserModel)
  user!: UserModel;

  @ForeignKey(() => LeadModel)
  @Column
  leadId!: number;

  @BelongsTo(() => LeadModel, { onDelete: "CASCADE" })
  lead!: LeadModel;
}

export default ActivityModel;
