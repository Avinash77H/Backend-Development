const { MongoClient } = require("mongodb");

const url = "mongodb+srv://admin:admin%401234@cluster0.5hrsm.mongodb.net/";
const dbName = "cuteDB";

const client = new MongoClient(url);

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("documents");



  // read

  const finalResult = await collection.find({}).next();
  console.log("Found documents =>", finalResult);

  return "done.";
}

main()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => client.close());
