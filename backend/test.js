import { createConnection } from "mysql";

var con = createConnection({
  host: "localhost",
  user: "root",
  password: "Zzd12676890?",
  database: "cs409",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
