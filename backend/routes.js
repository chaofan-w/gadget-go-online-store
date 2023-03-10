const { filterByCategory } = require("./filterCallbacks");
const {
  getAllDocsOfCollection,
  getDocByIdFromCollection,
  getDocByCustomerIdFromCollection,
  getLoginCustomer,
  postNewCustomer,
  postNewOrder,
  postNewProductReview,
  patchProductReview,
} = require("./routeCallbacks");

const router = require("express").Router();

function getMidWareGen(inputArg) {
  return (req, res, next) => {
    req.inputArg = inputArg;
    next();
  };
}

router.get("/", (req, res) => {
  res.send({ status: 200, data: "testing the backend data" });
});

// ################## categories ##############################################
// ################## categories ##############################################
// ################## categories ##############################################
// ################## categories ##############################################

router.get(
  "/api/categories",
  getMidWareGen({ collectionName: "categories" }),
  getAllDocsOfCollection
);
// router.get(
//   "/api/categories/:id",
//   getMidWareGen({ collectionName: "categories" }),
//   getDocByIdFromCollection
// );
// ################## bodyLocations ############################################
// ################## bodyLocations ############################################
// ################## bodyLocations ############################################
// ################## bodyLocations ############################################

router.get(
  "/api/bodylocations",
  getMidWareGen({ collectionName: "body_locations" }),
  getAllDocsOfCollection
);
// router.get(
//   "/api/bodylocations/:id",
//   getMidWareGen({ collectionName: "body_locations" }),
//   getDocByIdFromCollection
// );
// ################## carts ############################################
// ################## carts ############################################
// ################## carts ############################################
// ################## carts ############################################

router.get(
  "/api/carts",
  getMidWareGen({ collectionName: "carts" }),
  getAllDocsOfCollection
);

router.get(
  "/api/carts/:customerId",
  getMidWareGen({ collectionName: "carts" }),
  getDocByCustomerIdFromCollection
);
// router.get(
//   "/api/bodylocations/:id",
//   getMidWareGen({ collectionName: "body_locations" }),
//   getDocByIdFromCollection
// );

// ################## products ##############################################
// ################## products ##############################################
// ################## products ##############################################
// ################## products ##############################################

router.get(
  "/api/products",
  getMidWareGen({ collectionName: "products" }),
  getAllDocsOfCollection
);
router.get(
  "/api/products/:id",
  getMidWareGen({ collectionName: "products" }),
  getDocByIdFromCollection
);

router.get(
  "/api/products/category/:categoryValue",
  getMidWareGen({ collectionName: "products", filterFieldName: "category" }),
  filterByCategory
);
router.get(
  "/api/products/body_location/:categoryValue",
  getMidWareGen({
    collectionName: "products",
    filterFieldName: "body_location",
  }),
  filterByCategory
);
router.get(
  "/api/products/company/:categoryValue",
  getMidWareGen({ collectionName: "products", filterFieldName: "companyId" }),
  filterByCategory
);

// ################## orders ##############################################
// ################## orders ##############################################
// ################## orders ##############################################
// ################## orders ##############################################

router.get(
  "/api/orders",
  getMidWareGen({ collectionName: "orders" }),
  getAllDocsOfCollection
);

router.post("/api/orders", postNewOrder);

router.get(
  "/api/orders/:id",
  getMidWareGen({ collectionName: "orders" }),
  getDocByIdFromCollection
);

router.get(
  "/api/orders/customer/:categoryValue",
  getMidWareGen({ collectionName: "orders", filterFieldName: "customerId" }),
  filterByCategory
);
router.get(
  "/api/orders/status/:categoryValue",
  getMidWareGen({ collectionName: "orders", filterFieldName: "status" }),
  filterByCategory
);

// ################## customers ##############################################
// ################## customers ##############################################
// ################## customers ##############################################
// ################## customers ##############################################

router.get(
  "/api/customers",
  getMidWareGen({ collectionName: "customers" }),
  getAllDocsOfCollection
);
router.get(
  "/api/customers/:id",
  getMidWareGen({ collectionName: "customers" }),
  getDocByIdFromCollection
);
router.get(
  "/api/customers/state/:categoryValue",
  getMidWareGen({ collectionName: "customers", filterFieldName: "state" }),
  filterByCategory
);
router.get(
  "/api/customers/country/:categoryValue",
  getMidWareGen({ collectionName: "customers", filterFieldName: "country" }),
  filterByCategory
);

router.get(
  "/api/customers/login/:email/:password",
  getMidWareGen({ collectionName: "customers" }),
  getLoginCustomer
);

router.post("/api/customers", postNewCustomer);

// ################## reviews ##############################################
// ################## reviews ##############################################
// ################## reviews ##############################################
// ################## reviews ##############################################

router.get(
  "/api/reviews",
  getMidWareGen({ collectionName: "reviews" }),
  getAllDocsOfCollection
);
router.get(
  "/api/reviews/:id",
  getMidWareGen({ collectionName: "reviews" }),
  getDocByIdFromCollection
);
router.patch("/api/reviews/updateReview", patchProductReview);
router.get(
  "/api/reviews/customer/:categoryValue",
  getMidWareGen({ collectionName: "reviews", filterFieldName: "customerId" }),
  filterByCategory
);
router.get(
  "/api/reviews/rating/:categoryValue",
  getMidWareGen({ collectionName: "reviews", filterFieldName: "rating" }),
  filterByCategory
);
router.get(
  "/api/reviews/product/:categoryValue",
  getMidWareGen({ collectionName: "reviews", filterFieldName: "productId" }),
  filterByCategory
);
router.post("/api/reviews/postreview", postNewProductReview);

// ################## handle wrong url #############################
// ################## handle wrong url #############################
// ################## handle wrong url #############################
// ################## handle wrong url #############################

router.get("/*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

module.exports = router;
