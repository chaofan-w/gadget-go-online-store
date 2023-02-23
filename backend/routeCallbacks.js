const { MongoClient, ObjectId } = require("mongodb");
const { sendResponse } = require("./utils");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = "wearable-shop";
const client = new MongoClient(MONGO_URI, options);
const db = client.db(dbName);

const getAllDocsOfCollection = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected`);
  const { collectionName } = req.inputArg;
  try {
    const allDocsOfCollection = await db
      .collection(collectionName)
      .find({})
      .toArray();

    if (allDocsOfCollection.length > 0) {
      sendResponse(res, 200, allDocsOfCollection, "");
    } else {
      sendResponse(
        res,
        404,
        null,
        `not found in our ${collectionName} database`
      );
    }

    client.close();
    console.log(`${dbName} disconnected`);
    return;
  } catch (err) {
    sendResponse(res, 402, null, err.message);
    client.close();
    console.log(`${dbName} disconnected`);
    return;
  }
};
const getDocByIdFromCollection = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected`);
  const { collectionName } = req.inputArg;
  const id =
    collectionName === "products" ? req.params.id : new ObjectId(req.params.id);
  try {
    const allDocsOfCollection = await db
      .collection(collectionName)
      .find({ _id: id })
      .toArray();

    if (allDocsOfCollection.length > 0) {
      sendResponse(res, 200, allDocsOfCollection, "");
    } else {
      sendResponse(
        res,
        404,
        null,
        `${req.params.id} not found in ${collectionName} database`
      );
    }

    client.close();
    console.log(`${dbName} disconnected`);
    return;
  } catch (err) {
    sendResponse(res, 402, null, err.message);
    client.close();
    console.log(`${dbName} disconnected`);
    return;
  }
};

module.exports = {
  getAllDocsOfCollection,
  getDocByIdFromCollection,
};
