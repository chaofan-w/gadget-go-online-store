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

const nagativeReviewsPool = [
  "This fitness watch was a waste of money. The heart rate monitor was completely inaccurate and the battery life was terrible.",

  "The app that came with this smart bracelet was buggy and difficult to use. I ended up returning it because it was more trouble than it was worth.",

  "I was really disappointed with this smartwatch. It was bulky and uncomfortable to wear, and the features didn't work as advertised.",

  "The touch screen on this fitness tracker was really unresponsive and made it difficult to use. I wouldn't recommend it.",

  "I had high hopes for this smart ring, but it was really underwhelming. The battery life was terrible and it didn't really offer any features beyond basic notifications.",

  "The design of this fitness watch was really clunky and not at all stylish. I ended up returning it because I just couldn't get used to wearing it.",

  "I found the GPS on this smartwatch to be really inaccurate, which made it pretty much useless for tracking my runs.",

  "The strap on this smart bracelet broke after only a few weeks of use. I was really disappointed with the quality.",

  "The notifications on this fitness tracker were really inconsistent and didn't always come through. It wasn't worth the money.",

  "I found the step tracker on this smart ring to be really inaccurate, which made it difficult to trust any of the other data it was giving me.",

  "This smartwatch was really expensive and didn't offer any features that I couldn't get on a much cheaper device. I regret the purchase.",

  "The battery life on this fitness tracker was terrible. I had to charge it every day, which was really inconvenient.",

  "I had trouble syncing this smart bracelet with my phone, and the customer support was not helpful in resolving the issue.",

  "I found the app that came with this smartwatch to be really clunky and hard to use. It was a hassle to navigate.",

  "The heart rate monitor on this fitness watch was completely inaccurate. I wouldn't trust any of the data it was giving me.",

  "This smart ring was really uncomfortable to wear and left a mark on my finger. I ended up returning it.",

  "The strap on this fitness tracker was really stiff and uncomfortable to wear. I wouldn't recommend it.",

  "The touch screen on this smartwatch was so small that it was difficult to use. I found myself constantly tapping the wrong thing.",

  "The sleep tracking feature on this smart bracelet was completely useless. It didn't offer any insights that I couldn't get on my own.",

  "The accuracy of the step tracker on this fitness watch was really inconsistent. I wouldn't recommend it for anyone who is serious about tracking their activity.",
];

const positiveReviewsPool = [
  "This fitness tracker has been a game-changer for me. I love how easy it is to use and how accurate the data is.",

  "I was hesitant to try a smartwatch, but this one has exceeded all my expectations. The battery life is amazing and the features are so useful.",

  "This smart ring is so stylish and I love how discreet it is. The notifications are helpful and the battery life is impressive.",

  "I've tried a lot of fitness watches, but this one is by far the best. The GPS is super accurate and the design is sleek and comfortable to wear.",

  "I love the step tracker on this smart bracelet. It's really accurate and has motivated me to be more active.",

  "This smartwatch is so intuitive and easy to use. I've been able to streamline so many tasks with it, like checking emails and making calls.",

  "The heart rate monitor on this fitness tracker is really accurate, which is important to me since I have a heart condition.",

  "The sleep tracking feature on this smart bracelet has been really helpful in identifying patterns and making changes to improve my sleep.",

  "I love the design of this smart ring. It's so sleek and stylish, and I get compliments on it all the time.",

  "This fitness watch has a ton of features, but they're all really easy to navigate. I'm constantly discovering new ways to use it.",

  "The battery life on this smartwatch is impressive. I can wear it all day and still have plenty of battery life left.",

  "This smart bracelet is really durable and has held up well to daily use. I appreciate the quality of the materials.",

  "The app that came with this fitness tracker is really user-friendly and has a ton of useful data to help me stay on track with my goals.",

  "This smart ring is so easy to set up and customize. I was up and running in no time.",

  "The touch screen on this smartwatch is really responsive and easy to use. It's a pleasure to interact with.",

  "I love that this fitness watch is waterproof, which means I can wear it in the pool and track my swims.",

  "This smart bracelet has a really long battery life, which is great for when I'm traveling and can't charge it as often.",

  "The accuracy of the GPS on this fitness tracker is really impressive. It's been really helpful in tracking my hikes and runs.",

  "The design of this smartwatch is so elegant and understated. It looks great with any outfit.",

  "I appreciate how lightweight and comfortable this smart ring is. I forget I'm even wearing it most of the time.",
];

const getAllIds = async (collectionName, fieldKey) => {
  const allItems = await db.collection(collectionName).find({}).toArray();
  // console.log(allItems);
  let resIds = await allItems.reduce(
    (accum, curr) => accum.concat(curr[fieldKey]),
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

const reviewGenerator = async (randomCustomerId) => {
  client.connect();
  console.log(`${dbName} connected!`);
  try {
    // const allCustomerIds = await getAllIds("orders", "customerId");
    // const randomCustomerId =
    //   allCustomerIds[randomNum(0, allCustomerIds.length)];

    const customerOrders = await db
      .collection("orders")
      .find({ customerId: randomCustomerId })
      .toArray();

    const orderedProducts = customerOrders.reduce((accum, curr) => {
      return accum.concat(curr.products);
    }, []);

    const orderedProductIds = orderedProducts.reduce((accum, curr) => {
      return accum.concat(curr.productId);
    }, []);

    // console.log(orderedProductIds);
    let insertReviews = [];
    orderedProductIds.forEach(async (productId) => {
      const startDate = new Date(2023, 0, 1);
      const endDate = new Date();
      const rating = randomNum(0, 5) + 1;
      insertReviews.push({
        customerId: randomCustomerId,
        date: new Date(
          startDate.getTime() +
            Math.random() * (endDate.getTime() - startDate.getTime())
        ),
        rating: rating,
        productId: productId,
        text:
          rating > 3
            ? positiveReviewsPool[randomNum(0, positiveReviewsPool.length)]
            : nagativeReviewsPool[randomNum(0, nagativeReviewsPool.length)],
      });
    });
    await db.collection("reviews").insertMany(insertReviews);
  } catch (err) {
    console.log(err);
  }
  // client.close();
  // console.log(`${dbName} disconnected!`);
};

const main = async () => {
  const allCustomerIds = await getAllIds("orders", "customerId");
  [...new Set(allCustomerIds)].forEach((id) => {
    reviewGenerator(id);
  });
};

// main();
