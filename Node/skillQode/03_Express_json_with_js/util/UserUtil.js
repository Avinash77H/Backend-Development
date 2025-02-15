import path from "path";
import jsonfile from 'jsonfile'
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export class UserUtil {
  // static userJsonPath = path.join(__dirname, "..", "db", "user.json");
  static userJsonPath = "D:/programing/Backend-Development/Node/skillQode/03_Express_json_with_js/db/users.json"
  static getAllUserFromDB() {
    return new Promise((resolve, reject) => {
      jsonfile.readFile(this.userJsonPath, (err, data) => {
        if (err) {
          reject("Server Error");
        } else {
          resolve(data);
        }
      });
    });
  }
}
