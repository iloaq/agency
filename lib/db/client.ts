// Source: https://github.com/sidorares/node-mysql2
import mysql from 'mysql2/promise';
import { getEnv } from '@/lib/config/env';

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (pool) {
    return pool;
  }

  const env = getEnv();

  if (env.DATABASE_URL) {
    pool = mysql.createPool(env.DATABASE_URL);
  } else {
    pool = mysql.createPool({
      host: env.DB_HOST || 'localhost',
      port: parseInt(env.DB_PORT || '3306'),
      user: env.DB_USER || 'root',
      password: env.DB_PASSWORD || '',
      database: env.DB_NAME || 'agency',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}

export async function closeDbConnection(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
