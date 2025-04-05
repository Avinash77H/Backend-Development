const { MongoClient } = require('mongodb');
// const url = "mongodb+srv://admin:admin%401234@cluster0.5hrsm.mongodb.net/";
const url = "mongodb+srv://admin:admin%401234@cluster0.5hrsm.mongodb.net/";


const client = new MongoClient(url);

const dbName = 'test';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('UsersTesting');

  // const user1 = { name: 'John Doe', age: 25 };
  const user2 = { name: 'avinash rakholiya', age: 24 , email:'arakholiya77H@gmail.com'};

  // insert

  const insertResult = await collection.insertMany([user2]);
  console.log('Inserted documents =>', insertResult);

  // read 
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  // the following code examples can be pasted here...
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());