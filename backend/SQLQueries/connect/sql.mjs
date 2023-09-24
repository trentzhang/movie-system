import { createPool } from "mysql";

const pool = createPool({
  connectionLimit: 10,
  host: "149.248.8.180",
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
