// Script to fix the seed user's password hash
const bcrypt = require('bcryptjs');
const { sequelize } = require('./config/db'); // use sequelize instance from config

async function fix() {
  try {
    const hash = await bcrypt.hash('password123', 10);
    console.log('Generated hash:', hash);

    const [results] = await sequelize.query(
      "UPDATE users SET password = ? WHERE email = 'test@example.com'",
      { replacements: [hash] }
    );
    console.log('Rows affected:', results.affectedRows);
    console.log('✅ Password updated! Login with: test@example.com / password123');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    process.exit(0);
  }
}

fix();
