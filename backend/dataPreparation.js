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
const items = require("./data/customers.json");
// const items = require("./data/items.json");
// const items = require("./data/companies.json");

const importData = async () => {
  client.connect();
  console.log(`${dbName} connected!`);
  try {
    // let companiesValue = [];
    // companies.forEach((company) => {
    //   companiesValue.push({
    //     _id: company._id || null,
    //     name: company.name || null,
    //     url: company.url || null,
    //     country: company.country || null,
    //   });
    // });
    // await db.collection("companies").insertMany(companiesValue);
    let itemsValue = [];
    // let categories = [];
    // let body_locations = [];
    // const getId = (collection, key, value) => {
    //   return collection.find((item) => item[key] === value)._id;
    // };

    items.forEach((item) => {
      // if (categories.every((i) => i.category !== item.category)) {
      //   categories.push({
      //     _id: categories.length + 1,
      //     category: item.category,
      //   });
      // }
      // if (body_locations.every((i) => i.body_location !== item.body_location)) {
      //   body_locations.push({
      //     _id: body_locations.length + 1,
      //     body_location: item.body_location,
      //   });
      // }

      itemsValue.push({
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        address: item.address,
        city: item.city,
        state: item.state,
        country: item.country,
        postcode: item.postcode,
        phone: item.phone,
        password: item.password,

        // _id: item._id.toString(),
        // category: getId(categories, "category", item.category) || "",
        // name: item.name || "",
        // price: Number(item.price.slice(1)) || 0,
        // body_location:
        //   getId(body_locations, "body_location", item.body_location) || "",
        // imageSrc: item.imageSrc || "",
        // numInStock: item.numInStock || 0,

        // companyId: item.companyId.toString() || "",
        //   name: item.name || "",
        //   url: item.url || "",
        //   country: item.country || "",
        //   _id: item._id.toString(),
        // });
      });
    });
    // console.log(itemsValue);

    await db.collection("customers").insertMany(itemsValue);
    // await db.collection("products").insertMany(itemsValue);
    // await db.collection("companies").insertMany(itemsValue);
    // await db.collection("categories").insertMany(categories);
    // await db.collection("body_locations").insertMany(body_locations);
  } catch (error) {
    console.log(error.message);
  }
  client.close();
  console.log(`${dbName} disconnected!`);
};

importData();
