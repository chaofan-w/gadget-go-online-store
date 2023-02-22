const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = "wearable-shop";
const client = new MongoClient(MONGO_URI, options);
const db = client.db(dbName);

const getAllIds = async (collectionName) => {
  const allItems = await db.collection(collectionName).find({}).toArray();
  let resIds = await allItems.reduce(
    (accum, curr) => accum.concat(curr._id.toString()),
    []
  );
  return resIds;
};

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
};

const randomElemsArr = (arr, amount) => {
  const elemArr = [];
  let i = 0;
  while (i < amount) {
    if (!elemArr.includes(arr[randomNum(0, arr.length)])) {
      elemArr.push(arr[randomNum(0, arr.length)]);
      i++;
    }
  }
  return elemArr;
};

const orderGenerator = async (total) => {
  client.connect();
  console.log(`${dbName} connected!`);
  try {
    for (let i = 0; i < total; i++) {
      const allProductIds = await getAllIds("products");
      const allCustomerIds = await getAllIds("customers");
      const randomCustomerId =
        allCustomerIds[randomNum(0, allCustomerIds.length)];
      const orderedProductArr = randomElemsArr(
        allProductIds.slice(),
        randomNum(0, 4) + 1
      );
      console.log(orderedProductArr);
      const startDate = new Date(2023, 0, 1);
      const endDate = new Date();
      const products = orderedProductArr.map((id) => {
        return {
          productId: id,
          quantity: randomNum(0, 4) + 1,
        };
      });
      const date = new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      );
      const status = ["pending", "shipped", "delivered"][randomNum(0, 3)];
      await db.collection("orders").insertOne({
        customerId: randomCustomerId,
        date: date,
        status: status,
        products: products,
      });
    }
  } catch (err) {
    console.log(err);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

// orderGenerator(20);
