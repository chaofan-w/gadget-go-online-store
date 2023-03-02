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
const getLoginCustomer = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  await client.connect();
  console.log(`${dbName} connected`);
  const { collectionName } = req.inputArg;
  const { email, password } = req.params;
  try {
    const allDocsOfCollection = await db
      .collection(collectionName)
      .find({ email: email, password: password })
      .toArray();

    if (allDocsOfCollection && allDocsOfCollection.length > 0) {
      sendResponse(res, 200, allDocsOfCollection, "");
    } else {
      sendResponse(
        res,
        404,
        null,
        "We're sorry, but the login information you provided is incorrect. Please double-check your email and password and try again."
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

const postNewCustomer = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  await client.connect();
  console.log(`${dbName} connected`);

  try {
    const { firstName, lastName, email, password } = req.body;
    const allDocsOfCollection = await db
      .collection("customers")
      .find({ email: email })
      .toArray();

    if (allDocsOfCollection.length > 0) {
      sendResponse(
        res,
        400,
        null,
        `The email: ${email} is already exists, please login use the email or change another email for sign up`
      );
    } else {
      const addNewCustomer = await db.collection("customers").insertOne({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: "",
        city: "",
        state: "",
        country: "",
        phone: "",
      });
      // when a new customer created, a new empty cart can be created at the same time, use the ObjectId of returned by 'insertedId', need to convert it toString first, then use it as the customerId in carts document
      if (addNewCustomer.acknowledged) {
        const createNewCart = await db.collection("carts").insertOne({
          customerId: addNewCustomer.insertedId.toString(),
          products: [],
        });
        sendResponse(
          res,
          200,
          addNewCustomer.insertedId,
          "Your account is registered successfully, you can login now"
        );
      } else {
        sendResponse(
          res,
          400,
          null,
          "Sorry, server error ocurred, please try again later."
        );
      }
    }
  } catch (err) {
    sendResponse(res, 402, null, err.message);
  } finally {
    client.close();
    console.log(`${dbName} disconnected`);
  }
};

module.exports = {
  getAllDocsOfCollection,
  getDocByIdFromCollection,
  getDocByCustomerIdFromCollection,
  getLoginCustomer,
  postNewCustomer,
};
