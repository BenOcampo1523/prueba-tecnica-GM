const userSchema = `CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
)`;

module.exports = userSchema;