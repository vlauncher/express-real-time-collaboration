# Sequelize Setup for Express Real-time Collaboration

This project has been configured with Sequelize ORM and Sequelize CLI for database migrations using **SQLite3** for development and **PostgreSQL** for production.

## Setup Complete ✅

The following has been configured:

### Dependencies Installed
- `sequelize` - Core ORM library
- `sequelize-cli` - Command line interface for migrations
- `sqlite3` - SQLite database driver for development
- `pg` and `pg-hstore` - PostgreSQL driver for production

### Configuration Files Created

1. **`.sequelizerc`** - Configuration file for Sequelize CLI
2. **`config/config.json`** - Database configuration for different environments
3. **`models/index.ts`** - Database connection and initialization
4. **`models/User.ts`** - User model (without username field)
5. **`migrations/20251115132200-create-users-table.js`** - User table migration
6. **Updated `package.json`** - Added Sequelize CLI scripts
7. **Updated `.env`** - Database configuration variables
8. **Updated `tsconfig.json`** - Added models directory to TypeScript compilation

### Database Configuration

The project uses different databases based on the environment:

#### Development Environment (.env)
```env
NODE_ENV=development
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
```

#### Production Environment (.env)
```env
NODE_ENV=production
# PostgreSQL DATABASE_URL
DATABASE_URL=postgresql://username:password@host:port/database_name
```

### Environment-Specific Configuration (config/config.json)

- **Development**: Uses SQLite3 with local file
- **Test**: Uses in-memory SQLite
- **Production**: Uses PostgreSQL with DATABASE_URL environment variable

### User Model Structure

The User model has the following fields:
- `id` - Primary key (auto-increment)
- `email` - User email (unique, required)
- `password` - Hashed password (required)
- `firstName` - Optional first name
- `lastName` - Optional last name  
- `isActive` - Boolean flag (default: true)
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### NPM Scripts Available

```bash
# Create database (SQLite: automatic, PostgreSQL: manual setup)
npm run db:create

# Run migrations (for current environment)
npm run db:migrate

# Undo last migration
npm run db:migrate:undo

# Undo all migrations
npm run db:migrate:undo:all

# Run seeders
npm run db:seed

# Undo seeders
npm run db:seed:undo

# Undo all seeders
npm run db:seed:undo:all
```

### Environment-Specific Usage

#### Development (SQLite3)
```bash
# Migrations will use SQLite database
npm run db:migrate

# Database file: ./database.sqlite
```

#### Production (PostgreSQL)
```bash
# Set DATABASE_URL environment variable
export DATABASE_URL="postgresql://username:password@host:port/database_name"

# Run migrations (will use PostgreSQL)
npm run db:migrate
```

### Example Usage

```typescript
import { User } from '../models/User';
import { sequelize } from '../models/index';

// Create a new user
const user = await User.create({
  email: 'john@example.com',
  password: 'hashedpassword',
  firstName: 'John',
  lastName: 'Doe'
});

// Find all users
const users = await User.findAll();

// Find user by primary key
const user = await User.findByPk(1);

// Find user by email
const user = await User.findOne({ where: { email: 'john@example.com' } });
```

### Creating New Models and Migrations

1. **Create a migration**:
   ```bash
   npx sequelize-cli migration:generate --name create-your-table
   ```

2. **Create a model**:
   ```bash
   npx sequelize-cli model:generate --name YourModel --attributes field1:string,field2:integer
   ```

3. **Run migrations** (uses current environment):
   ```bash
   npm run db:migrate
   ```

### Database Files and Locations

- **Development SQLite**: `./database.sqlite`
- **Test SQLite**: In-memory (`:memory:`)
- **Production PostgreSQL**: Defined by `DATABASE_URL` environment variable

### Production Setup Steps

1. **Set DATABASE_URL** in your production environment
2. **Create PostgreSQL database** manually or via hosting provider
3. **Run migrations** in production:
   ```bash
   npm run db:migrate
   ```

### Current Status ✅

- ✅ SQLite3 configured for development
- ✅ PostgreSQL configured for production with DATABASE_URL
- ✅ User model created (without username field)
- ✅ User table migration created and applied
- ✅ Database connection tested successfully
- ✅ Environment-specific configuration implemented

The Sequelize setup is now complete and ready for both development and production environments!