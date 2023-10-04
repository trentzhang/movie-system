import { createPool } from "mysql";
import "dotenv/config";
const pool = createPool({
  connectionLimit: 10,
  host: process.env.MY_SQL_HOST,
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DATABASE,
});

export async function executeSqlQuery(statement, args) {
  const queryPromise = () => {
    return new Promise((resolve, reject) => {
      console.log(statement, args);
      pool.query(statement, args, (error, result) => {
        if (error) {
          console.log("error :>> ", error);
          return reject(error);
        }
        return resolve(result);
      });
    });
  };
  const result = await queryPromise();
  return result;
}
