import { User } from '../../models/User';
import { Op } from 'sequelize';

describe('User Model', () => {
  beforeEach(async () => {
    // Clean up before each test
    await User.destroy({ where: {}, truncate: false });
  });

  describe('User creation', () => {
    it('should create a user with valid email and password', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'testpassword123',
        firstName: 'Test',
        lastName: 'User'
      };

      const user = await User.create(userData);

      expect(user.id).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.password).toBe(userData.password);
      expect(user.firstName).toBe(userData.firstName);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.isActive).toBe(true);
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    it('should create a user with minimal required fields', async () => {
      const userData = {
        email: 'minimal@example.com',
        password: 'password123'
      };

      const user = await User.create(userData);

      expect(user.id).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.password).toBe(userData.password);
      expect(user.isActive).toBe(true);
    });

    it('should fail to create user with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123'
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should fail to create user with duplicate email', async () => {
      const userData = {
        email: 'duplicate@example.com',
        password: 'password123'
      };

      // Create first user
      await User.create(userData);

      // Try to create second user with same email
      await expect(User.create(userData)).rejects.toThrow();
    });
  });

  describe('User retrieval', () => {
    beforeEach(async () => {
      // Create test users
      await User.bulkCreate([
        {
          email: 'user1@example.com',
          password: 'password1',
          firstName: 'User',
          lastName: 'One'
        },
        {
          email: 'user2@example.com',
          password: 'password2',
          firstName: 'User',
          lastName: 'Two',
          isActive: false
        },
        {
          email: 'user3@example.com',
          password: 'password3',
          firstName: 'User',
          lastName: 'Three'
        }
      ]);
    });

    it('should find all users', async () => {
      const users = await User.findAll();
      
      expect(users).toHaveLength(3);
      expect(users[0]).toBeInstanceOf(User);
    });

    it('should find user by primary key', async () => {
      const createdUser = await User.create({
        email: 'findby@example.com',
        password: 'password'
      });

      const user = await User.findByPk(createdUser.id);
      
      expect(user).toBeInstanceOf(User);
      expect(user?.id).toBe(createdUser.id);
      expect(user?.email).toBe(createdUser.email);
    });

    it('should return null when user not found', async () => {
      const user = await User.findByPk(99999);
      expect(user).toBeNull();
    });

    it('should find user by email', async () => {
      const user = await User.findOne({ 
        where: { email: 'user1@example.com' } 
      });
      
      expect(user).toBeInstanceOf(User);
      expect(user?.email).toBe('user1@example.com');
    });

    it('should filter active users only', async () => {
      const activeUsers = await User.findAll({
        where: { isActive: true }
      });
      
      expect(activeUsers).toHaveLength(2);
      activeUsers.forEach((user: any) => {
        expect(user.isActive).toBe(true);
      });
    });
  });

  describe('User updates', () => {
    it('should update user first name', async () => {
      const user = await User.create({
        email: 'update@example.com',
        password: 'password',
        firstName: 'Old',
        lastName: 'Name'
      });

      await user.update({ firstName: 'New' });
      
      expect(user.firstName).toBe('New');
    });

    it('should update user last name', async () => {
      const user = await User.create({
        email: 'updatelast@example.com',
        password: 'password'
      });

      await user.update({ lastName: 'UpdatedLastName' });
      
      expect(user.lastName).toBe('UpdatedLastName');
    });

    it('should deactivate user', async () => {
      const user = await User.create({
        email: 'deactivate@example.com',
        password: 'password'
      });

      expect(user.isActive).toBe(true);
      
      await user.update({ isActive: false });
      
      expect(user.isActive).toBe(false);
    });
  });

  describe('User deletion', () => {
    it('should delete user', async () => {
      const user = await User.create({
        email: 'delete@example.com',
        password: 'password'
      });

      const userId = user.id;
      
      await user.destroy();
      
      const deletedUser = await User.findByPk(userId);
      expect(deletedUser).toBeNull();
    });

    it('should bulk delete users by email pattern', async () => {
      await User.create({
        email: 'bulk1@example.com',
        password: 'password'
      });

      await User.create({
        email: 'bulk2@example.com',
        password: 'password'
      });

      const count = await User.destroy({
        where: { email: { [Op.like]: 'bulk%' } }
      });
      
      expect(count).toBe(2);
    });

    it('should bulk delete all users', async () => {
      // Create users
      await User.create({
        email: 'bulkdelete1@example.com',
        password: 'password'
      });

      await User.create({
        email: 'bulkdelete2@example.com',
        password: 'password'
      });

      // Delete all
      const count = await User.destroy({
        where: {}
      });
      
      expect(count).toBe(2);

      // Verify no users left
      const remaining = await User.findAll();
      expect(remaining).toHaveLength(0);
    });
  });
});