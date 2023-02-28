const { MongoClient, ObjectId } = require("mongodb");
const { sendResponse } = require("./utils");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = "wearable-shop";

const getAllDocsOfCollection = async (req, res) => {
  // #####################important: const client = new MongoClient(MONGO_URI, options) inside the callback, to make sure, creates a new MongoDB client and connects to the database each time it is called. This ensures that a new session is created for each database request, which helps to avoid the MongoExpiredSessionError error. ######################################### //
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
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

    // await client.close();
    // console.log(`${dbName} disconnected`);
    return;
  } catch (err) {
    sendResponse(res, 402, null, err.message);
    // await client.close();
    // console.log(`${dbName} disconnected`);
    return;
  } finally {
    await client.close();
    console.log(`${dbName} disconnected`);
  }
};
const getDocByIdFromCollection = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
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

    return;
  } catch (err) {
    sendResponse(res, 402, null, err.message);

    return;
  } finally {
    client.close();
    console.log(`${dbName} disconnected`);
  }
};
const getDocByCustomerIdFromCollection = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  await client.connect();
  console.log(`${dbName} connected`);
  const { collectionName } = req.inputArg;
  const customerId = req.params.customerId;
  try {
    const allDocsOfCollection = await db
      .collection(collectionName)
      .find({ customerId: customerId })
      .toArray();

    if (allDocsOfCollection && allDocsOfCollection.length > 0) {
      sendResponse(res, 200, allDocsOfCollection, "");
    } else {
      sendResponse(
        res,
        404,
        null,
        `${customerId} not found in ${collectionName} database`
      );
    }

    return;
  } catch (err) {
    sendResponse(res, 402, null, err.message);

    return;
  } finally {
    client.close();
    console.log(`${dbName} disconnected`);
  }
};

module.exports = {
  getAllDocsOfCollection,
  getDocByIdFromCollection,
  getDocByCustomerIdFromCollection,
};
