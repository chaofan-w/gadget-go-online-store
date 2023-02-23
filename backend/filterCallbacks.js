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

const filterByCategory = async (req, res) => {
  await client.connect();
  console.log(`${dbName} connected`);
  const { collectionName, filterFieldName } = req.inputArg;

  // req.params return the value in string type, if it is number in db, need to convert back to number
  const categoryValue = req.params.categoryValue;
  try {
    const allFilteredDocsOfCollection = await db
      .collection(collectionName)
      // convert string type categoryNum to number for match the field value
      //in this case the companyId is string in database, but category is number, body_location is number, so using $or to include both string or number in value
      .find({
        $or: [
          { [filterFieldName]: Number(categoryValue) },
          { [filterFieldName]: categoryValue },
        ],
      })
      .collation({ locale: "en", strength: 1 })
      .toArray();
    if (allFilteredDocsOfCollection.length > 0) {
      sendResponse(res, 200, allFilteredDocsOfCollection, "");
    } else {
      sendResponse(
        res,
        404,
        null,
        `${filterFieldName}:${categoryValue} not found in database ${collectionName}`
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
  filterByCategory,
};
