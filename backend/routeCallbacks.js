const { MongoClient, ObjectId } = require("mongodb");
const { useParams } = require("react-router-dom");
const { sendResponse } = require("./utils");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = "wearable-shop";

const getLimitedDocsOfCollection = async (req, res) => {
  // #####################important: const client = new MongoClient(MONGO_URI, options) inside the callback, to make sure, creates a new MongoDB client and connects to the database each time it is called. This ensures that a new session is created for each database request, which helps to avoid the MongoExpiredSessionError error. ######################################### //
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  await client.connect();
  console.log(`${dbName} connected`);
  const { collectionName } = req.inputArg;
  try {
    const currPage = req.params.currPage;
    const allDocsOfCollection = await db
      .collection(collectionName)
      .find({})
      .skip(parseInt(currPage - 1) * 10)
      .limit(10)
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

const getManyDocsByIdsArr = async (req, res) => {
  // #####################important: const client = new MongoClient(MONGO_URI, options) inside the callback, to make sure, creates a new MongoDB client and connects to the database each time it is called. This ensures that a new session is created for each database request, which helps to avoid the MongoExpiredSessionError error. ######################################### //
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  await client.connect();
  console.log(`${dbName} connected`);
  const { collectionName } = req.inputArg;

  const allIds = Object.values(req.query);

  try {
    const allDocsOfCollection = await db
      .collection(collectionName)
      .find({ _id: { $in: allIds } })
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
const deleteOneDocById = async (req, res) => {
  // #####################important: const client = new MongoClient(MONGO_URI, options) inside the callback, to make sure, creates a new MongoDB client and connects to the database each time it is called. This ensures that a new session is created for each database request, which helps to avoid the MongoExpiredSessionError error. ######################################### //
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  await client.connect();
  console.log(`${dbName} connected`);
  const { collectionName } = req.inputArg;
  const id =
    collectionName === "products" ? req.params.id : new ObjectId(req.params.id);
  try {
    const deleteOneDoc = await db
      .collection(collectionName)
      .deleteOne({ _id: id });

    if (deleteOneDoc.deletedCount === 1) {
      sendResponse(res, 200, null, "deletion completed successfully");
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
    sendResponse(res, 400, null, err.message);
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
      sendResponse(
        res,
        200,
        allDocsOfCollection,
        `Welcome back, ${allDocsOfCollection[0].firstName} `
      );
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

const postNewOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  await client.connect();
  console.log(`${dbName} connected`);

  try {
    const {
      customerId,
      products,
      firstName,
      lastName,
      phone,
      address1,
      address2,
      city,
      state,
      postCode,
      country,
      cardName,
      cardNumber,
      discount,
      total,
    } = req.body;

    const addNewOrder = await db.collection("orders").insertOne({
      customerId: customerId,
      products: products,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address1: address1,
      address2: address2 || "",
      city: city,
      state: state || "",
      postCode: postCode,
      country: country,
      cardName: cardName,
      cardNumber: cardNumber,
      discount: discount,
      total: total,
      status: "confirmed",
      date: new Date(),
    });

    if (addNewOrder.acknowledged) {
      sendResponse(res, 200, addNewOrder.insertedId, "Your order confirmed!");
    } else {
      sendResponse(
        res,
        400,
        null,
        "Sorry, server error ocurred, please try again later."
      );
    }
  } catch (err) {
    sendResponse(res, 402, null, err.message);
  } finally {
    client.close();
    console.log(`${dbName} disconnected`);
  }
};

const postNewProductReview = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  await client.connect();
  console.log(`${dbName} connected`);
  try {
    const { customerId, rating, productId, text } = req.body;

    const addNewReview = await db.collection("reviews").insertOne({
      customerId: customerId,
      date: new Date(),
      rating: rating,
      productId: productId,
      text: text,
    });

    if (addNewReview.acknowledged) {
      sendResponse(
        res,
        200,
        addNewReview.insertedId,
        "Thanks for your product review!"
      );
    } else {
      sendResponse(
        res,
        400,
        null,
        "Sorry, server error ocurred, please try again later."
      );
    }
  } catch (err) {
    sendResponse(res, 402, null, err.message);
  } finally {
    client.close();
    console.log(`${dbName} disconnected`);
  }
};

const patchProductReview = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  await client.connect();
  console.log(`${dbName} connected`);
  try {
    const { reviewId, rating, text } = req.body;
    console.log(reviewId);

    const updateReview = await db.collection("reviews").updateOne(
      { _id: new ObjectId(reviewId) },
      {
        $set: {
          date: new Date(),
          rating: rating,
          text: text,
        },
      }
    );

    if (updateReview.modifiedCount === 1) {
      sendResponse(
        res,
        200,
        reviewId,
        "Your product review has been updated successfully!"
      );
    } else {
      sendResponse(
        res,
        400,
        null,
        "Sorry, server error ocurred, please try again later."
      );
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
  postNewOrder,
  postNewProductReview,
  patchProductReview,
  deleteOneDocById,
  getLimitedDocsOfCollection,
  getManyDocsByIdsArr,
};
