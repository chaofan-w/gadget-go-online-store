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

async function getAllDocs(collectionName) {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  client.connect();
  console.log("connected");
  const allItems = await db.collection(collectionName).find({}).toArray();
  console.log(allItems.length);
  client.close();
  console.log("disconnected");
  return allItems;
}

function getAllIds(arr) {
  let resIds = arr.reduce(
    (accum, curr) => accum.concat(curr._id.toString()),
    []
  );
  return resIds;
}

const productInfo = (allItems, productId) => {
  const product = allItems.find((item) => item._id === productId);
  return {
    productId: productId,
    price: product.promotionPrice ? product.promotionPrice : product.price,
  };
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

const emptyCartsGenerator = async () => {
  const allCustomers = await getAllDocs("customers");
  const allCustomerIds = allCustomers.reduce(
    (accum, curr) => accum.concat(curr._id.toString()),
    []
  );

  const allEmpty = allCustomerIds.map((id) => {
    return { customerId: id, products: [] };
  });

  const client = new MongoClient(MONGO_URI, options);
  const db = client.db(dbName);
  client.connect();
  console.log("connected");
  await db.collection("carts").insertMany(allEmpty);
  client.close();
};

emptyCartsGenerator();
