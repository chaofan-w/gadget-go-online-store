const { MongoClient } = require("mongodb");
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

const addPromotionPrice = async () => {
  client.connect();
  console.log(`${dbName} connected!`);
  try {
    const allProductIds = await getAllIds("products");
    const promotionIds = await randomElemsArr(allProductIds, 116);
    for (let i = 0; i < allProductIds.length; i++) {
      // const startDate = new Date(2023, 0, 1);
      // const endDate = new Date();
      await db.collection("products").updateOne({ _id: promotionIds[i] }, [
        {
          $set: {
            promotionPrice: {
              $round: [
                {
                  $multiply: [
                    "$price",
                    (100 - (Math.floor(Math.random() * 13) + 3) * 5) / 100,
                  ],
                },
                2,
              ],
            },

            // arrivalDate: new Date(
            //   startDate.getTime() +
            //     Math.random() * (endDate.getTime() - startDate.getTime())
            // ),
          },
        },
      ]);
    }
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

addPromotionPrice();
