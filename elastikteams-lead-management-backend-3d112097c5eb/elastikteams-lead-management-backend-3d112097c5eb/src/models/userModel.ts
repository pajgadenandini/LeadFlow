import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { LeadModel } from "./leadModel";
import { ActivityModel } from "./activityModel";

@Table
export class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  password!: string;

  @Column
  email!: string;

  @HasMany(() => LeadModel)
  leads!: LeadModel[];

  @HasMany(() => ActivityModel)
  activities!: ActivityModel[];
}

export default UserModel;
