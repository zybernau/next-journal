import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.uri || "";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = "journl";
const coll = "journals";



export async function insertJournal(journal) {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB server');

    const db = client.db(dbName);

    // Insert a document into the collection
    const collection = db.collection(coll);
    const result = await collection.insertOne(journal);
    console.log("result is", result);
    console.log(`Status: ${result.acknowledged}, \ninserted id: ${result.insertedId}  \t inserted into collection`);
    return result;
  } catch (err) {
    console.log('Error occurred while connecting to MongoDB', err);
  } finally {
    // Close the connection to the MongoDB server
    await client.close();
  }
}


export async function getJournals() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB server');

    const db = client.db(dbName);

    const collection = db.collection(coll);
    const jrnls = await collection.find().toArray();
    //   // let journals = [];
    // await cursor.forEach(row => journals.push(row));

    console.log("journals are -:", jrnls);
    return jrnls;

  } catch (err) {
    console.log('Error occurred while connecting to MongoDB', err);

  } finally {
    // Close the connection to the MongoDB server
    await client.close();
  }
}
