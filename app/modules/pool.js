import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool();

export const query = async (text, params) => {
    const client = await pool.connect();
    let res = undefined;
    try {
        await client.query('BEGIN');
        res = await client.query(text, params);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
    return res;
}
