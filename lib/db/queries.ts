import mysql from 'mysql2/promise';
import { getDbPool } from './client';

export async function executeQuery<T = unknown>(
  query: string,
  params?: unknown[]
): Promise<T[]> {
  const pool = getDbPool();
  const [rows] = await pool.execute(query, params);
  return rows as T[];
}

export async function executeTransaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const pool = getDbPool();
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
