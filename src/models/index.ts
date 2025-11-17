import { Sequelize } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Sequelize with environment-specific configuration
let sequelize: Sequelize;

// Test and Development (SQLite3)
if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.NODE_ENV === 'test' ? ':memory:' : (process.env.DB_STORAGE || './database.sqlite'),
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}
// Production (PostgreSQL with DATABASE_URL)
else {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl && process.env.NODE_ENV === 'production') {
    console.error('DATABASE_URL is required for production environment');
    process.exit(1);
  }
  
  sequelize = new Sequelize(databaseUrl!, {
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : false
    }
  });
}

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connection established successfully (${process.env.NODE_ENV || 'development'}).`);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// Test connection immediately in development
if (process.env.NODE_ENV !== 'production') {
  testConnection();
}

export { sequelize, Sequelize };

// Export default for backward compatibility
export default sequelize;