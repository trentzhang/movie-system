import { createPool } from "mysql";

const pool = createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Zzd12676890?",
  database: "cs409",
});

export async function executeSqlQuery(statement, args) {
  const queryPromise = () => {
    return new Promise((resolve, reject) => {
      console.log(statement, args);
      pool.query(statement, args, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  };
  const result = await queryPromise();
  return result;
}
