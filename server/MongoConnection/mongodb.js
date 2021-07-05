const { MongoClient } = require('mongodb');
const MONGODB_URL = "mongodb://localhost/ammoContent";
const MONGODB_DBNAME = 'ammoContent';
const MONGODB_COLLECTION_NAME = 'platforms';

module.exports = {
  insertRecord: async function (csvFileData) {
    const client = new MongoClient(MONGODB_URL);
    try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      const result = await client.db(MONGODB_DBNAME).collection(MONGODB_COLLECTION_NAME).insertMany(csvFileData);
      console.log(`New listing created with the following id: ${result.insertedId}`);
      return result;

    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  },
  fetchAllPlatforms: async function () {
    const client = new MongoClient(MONGODB_URL);
    try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      const cursor = client.db(MONGODB_DBNAME).collection(MONGODB_COLLECTION_NAME).find();
      return await cursor.toArray();

    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  },
  updatePlatforms: async function (filter, updateDocument) {
    const client = new MongoClient(MONGODB_URL);
    try {
      // Connect to the MongoDB cluster
      await client.connect();

      const options = { upsert: true };
      const updateDoc = {
        $set: updateDocument,
      }

      // Make the appropriate DB calls
      const result = client.db(MONGODB_DBNAME).collection(MONGODB_COLLECTION_NAME)
        .updateOne(filter, updateDoc, options);

      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );

      return result;

    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  },
}


