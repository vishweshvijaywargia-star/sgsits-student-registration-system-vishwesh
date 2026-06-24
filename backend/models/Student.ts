import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface StudentAttributes {
  id?: number;
  name: string;
  enrollment_number: string;
  email: string;
  mobile_number: string;
  branch: string;
  created_at?: Date;
  updated_at?: Date;
}

class Student extends Model<StudentAttributes> implements StudentAttributes {
  public id!: number;
  public name!: string;
  public enrollment_number!: string;
  public email!: string;
  public mobile_number!: string;
  public branch!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    enrollment_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    mobile_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'students',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Student;
