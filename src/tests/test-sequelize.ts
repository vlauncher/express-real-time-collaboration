import { User } from '../models/User';
import { sequelize } from '../models/index';

// Test Sequelize setup
const testSequelize = async () => {
  try {
    // Test database connection
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Test User model
    console.log('\nTesting User model...');
    console.log('User model structure:', {
      columns: Object.keys(User.getAttributes()),
      tableName: User.getTableName(),
    });

    // Sync models (create tables if they don't exist)
    console.log('\nSyncing database models...');
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized successfully.');

    // Test creating a user
    console.log('\nTesting user creation...');
    const testUser = await User.create({
      email: 'test@example.com',
      password: 'testpassword',
      first_name: 'Test',
      last_name: 'User'
    });
    console.log('✅ Test user created:', {
      id: testUser.id,
      email: testUser.email,
      first_name: testUser.first_name,
      last_name: testUser.last_name
    });

    // Clean up test user
    await User.destroy({ where: { id: testUser.id } });
    console.log('✅ Test user cleaned up.');

  } catch (error) {
    console.error('❌ Error testing Sequelize setup:', error);
  } finally {
    await sequelize.close();
  }
};

testSequelize();