import dotenv from 'dotenv';
import { sequelize } from '../models/index';

// Load test environment variables
dotenv.config({ path: '.env' });

// Set test environment
process.env.NODE_ENV = 'test';

// Global test setup
beforeAll(async () => {
  // Create test database tables
  await sequelize.sync({ force: true });
});

// Global test teardown
afterAll(async () => {
  // Close database connection
  await sequelize.close();
});

// Global test setup for each test
beforeEach(async () => {
  // Clean up any data before each test
  // This will be handled by the individual test setup
});

// Global test teardown for each test
afterEach(async () => {
  // Clean up data after each test
  // This will be handled by the individual test setup
});

// Suppress console logs during tests unless debugging
const originalConsoleLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
});