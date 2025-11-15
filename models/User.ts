import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isActive'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public first_name?: string;
  public last_name?: string;
  public isActive!: boolean;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'first_name'
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'last_name'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: true,
    // Map JavaScript camelCase to database snake_case
    underscored: false,
  }
);

export { User };

// Export the User model
export default User;