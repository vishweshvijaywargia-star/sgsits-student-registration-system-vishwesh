import { Sequelize } from 'sequelize';

// Use SQLite for development/preview, but structure it for MySQL compatibility
// This ensures the preview works immediately without requiring a standalone MySQL instance setup.
// To switch to MySQL, uncomment the MySQL connection and comment out the SQLite one.

/* 
// MySQL Configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || 'student_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);
*/

// SQLite Configuration for AI Studio preview
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

export default sequelize;
