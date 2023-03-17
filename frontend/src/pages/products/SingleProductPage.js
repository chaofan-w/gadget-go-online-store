import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Stack,
  List,
  IconButton,
  Typography,
  Divider,
  ListItemButton,
  ListItem,
  Grid,
} from "@mui/material";
import { BiBody } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { BsBagPlusFill, BsFillBagDashFill } from "react-icons/bs";
import AddToCartBtn from "../../components/AddToCartBtn";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../features/categories/categoriesSlice";
import { selectAllBodyLocations } from "../../features/body_locations/bodyLocationsSlice";
import { selectAllReviews } from "../../features/reviews/reviewsSlice";
import { selectAllCarts } from "../../features/carts/cartsSlice";
import { selectLoginCustomer } from "../../features/loginCustomer/loginCustomerSlice";
import Spinner from "../../components/Spinner";
import Comments from "./Comments";
import RatingStars from "./Rating";

export default function SingleProductPage({ loginCustomer }) {
  // console.log(productId);

  const categories = useSelector(selectAllCategories);
  const body_locations = useSelector(selectAllBodyLocations);
  const reviews = useSelector(selectAllReviews);
  const carts = useSelector(selectAllCarts);
  const [product, setProduct] = React.useState(null);
  const [productImg, setProductImg] = React.useState("");
  const { productId } = useParams();
  // console.log(product);

  React.useEffect(() => {
    const fetchProductById = async () => {
      try {
        if (productId) {
          await fetch(`/api/products/${productId}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.status === 200) {
                setProduct(result.data[0]);
                setProductImg(result.data[0].imageSrc);
              } else {
                console.log(result.message);
              }
            });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductById();
  }, [productId, setProduct]);

  const compareDate = new Date(2023, 1, 10);
  const [quantity, setQuantity] = React.useState(0);

  const reviewsByProduct =
    reviews.length > 0 &&
    reviews.filter((review) => review.productId === productId);

  return (
    <>
      {product && (
        <Grid
          container
          component="main"
          sx={{
            // width: "100%",
            // minWidth: "100vw",
            // minHeight: "100vh",
            height: "fit-content",
            pt: "2vh",
            pb: "2vh",
            bgcolor: "primary.light",
          }}
        >
          <Grid item xs={12}>
            <Card
              sx={{
                width: { xs: 340, sm: 560 },
                maxWidth: 560,
                minWidth: 300,
                my: 3,
                mx: "auto",
                height: { xs: "fit-content", sm: 500 },
              }}
            >
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  <Box
                    sx={{
                      width: "100%",
                      height: "fit-content",
                      overflow: "auto",
                    }}
                  >
                    <Typography variant="h6" sx={{ lineHeight: 1 }}>
                      {product.name}
                    </Typography>
                  </Box>
                }
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={"flex-start"}
                justifyContent={"space-between"}
                sx={{
                  width: "100%",
                  p: 2,
                  height: { xs: "fit-content", sm: 340 },
                  position: "relative",
                }}
              >
                {product.promotionPrice && (
                  <Box
                    sx={{
                      width: 60,
                      height: 30,
                      bgcolor: "secondary.main",
                      position: "absolute",
                      top: 30,
                      left: 16,
                      zIndex: 10,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption" sx={{ lineHeight: "30px" }}>
                      {`${Math.round(
                        ((product.price - product.promotionPrice) /
                          product.price) *
                          100
                      )}% OFF`}
                    </Typography>
                  </Box>
                )}
                {new Date(product.arrivalDate) > compareDate && (
                  <Box
                    sx={{
                      width: 40,
                      height: 70,
                      bgcolor: "secondary.main",
                      position: "absolute",
                      top: 16,
                      left: 260,
                      zIndex: 10,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption" sx={{ lineHeight: "30px" }}>
                      New Arrival
                    </Typography>
                  </Box>
                )}
                <CardMedia
                  component="img"
                  sx={{ height: 300, width: 300 }}
                  image={productImg}
                  // image={product.imageSrc}
                  alt={`Id: ${product._id}`}
                />

                <List
                  sx={{
                    ml: { xs: 0, sm: 2 },
                    mt: { xs: 2, sm: 0 },
                    width: { xs: 300, sm: 60 },
                    p: 0,
                    height: { xs: 60, sm: 300 },
                    display: "flex",
                    flexDirection: { xs: "row", sm: "column" },
                    gap: 1,
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  {[1, 2, 3].map((img) => (
                    <ListItem
                      key={`alternativeImg-${img}`}
                      sx={{ width: 60, height: 60, m: 0, p: 0 }}
                    >
                      <ListItemButton
                        sx={{ width: 60, height: 60, m: 0, p: 0 }}
                        onClick={() =>
                          setProductImg(
                            `https://loremflickr.com/320/240/gadget?${product._id}-${img}`
                          )
                        }
                      >
                        <img
                          src={`https://loremflickr.com/320/240/gadget?${product._id}-${img}`}
                          style={{
                            width: 60,
                            height: 60,
                            filter:
                              productImg ===
                              `https://loremflickr.com/320/240/gadget?${product._id}-${img}`
                                ? "grayscale(0)"
                                : "grayscale(100%)",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem sx={{ width: 60, height: 60, m: 0, p: 0 }}>
                    <ListItemButton
                      sx={{ width: 60, height: 60, m: 0, p: 0 }}
                      onClick={() => setProductImg(product.imageSrc)}
                    >
                      <img
                        src={product.imageSrc}
                        style={{
                          width: 60,
                          height: 60,
                          filter:
                            productImg === product.imageSrc
                              ? "grayscale(0)"
                              : "grayscale(100%)",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
                <Stack
                  direction={"column"}
                  alignItems="flex-end"
                  justifyContent={"space-between"}
                  sx={{ height: 300, flex: 1 }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ pt: 1, mx: { xs: 0, sm: 1 } }}
                  >
                    {categories && categories.length > 0 && (
                      <Typography
                        variant="caption"
                        fontWeight={"bold"}
                        sx={{
                          color: "secondary.main",
                          display: "flex",
                          flexDirection: "row",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <GoTasklist />{" "}
                        {
                          categories.find(
                            (category) => category._id === product.category
                          ).category
                        }
                        {/* {categories &&
                      categories.length > 0 &&
                      categories.find(
                        (category) => category._id === product.category
                      ).category} */}
                      </Typography>
                    )}
                    {body_locations && body_locations.length > 0 && (
                      <Typography
                        variant="caption"
                        fontWeight={"bold"}
                        sx={{
                          color: "secondary.main",
                          display: "flex",
                          flexDirection: "row",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <BiBody />{" "}
                        {
                          body_locations.find(
                            (location) => location._id === product.body_location
                          ).body_location
                        }
                        {/* {body_locations &&
                      body_locations.length > 0 &&
                      body_locations.find(
                        (location) => location._id === product.body_location
                      ).body_location} */}
                      </Typography>
                    )}
                  </Stack>
                  <CardContent
                    sx={{
                      width: { xs: 300, sm: 160 },
                      m: 0,
                      pt: { xs: 2 },
                      px: { xs: 0 },
                      display: "flex",
                      alignItems: { sm: "flex-end" },
                      justifyContent: { sm: "flex-end" },
                    }}
                  >
                    <Stack
                      sx={{
                        width: { xs: 300, sm: 100 },
                        m: 0,
                      }}
                      direction={{ xs: "row", sm: "column" }}
                      alignItems={{ xs: "flex-end", sm: "flex-end" }}
                      justifyContent={{ xs: "flex-start", sm: "center" }}
                    >
                      <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ mr: { xs: 2, sm: 0 } }}
                      >
                        {`$ ${
                          product.promotionPrice
                            ? product.promotionPrice
                            : product.price
                        }
                    `}
                      </Typography>
                      {product.promotionPrice && (
                        <Typography
                          variant="subtitle1"
                          sx={{
                            textDecoration: "line-through",
                            // border: "1px solid red",
                            color: "red",
                          }}
                        >{`$ ${product.price}`}</Typography>
                      )}
                    </Stack>
                  </CardContent>
                  <Box width={{ xs: 300, sm: 140 }}>
                    <AddToCartBtn
                      carts={carts}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      product={product}
                    />
                  </Box>
                </Stack>
              </Stack>

              <CardActions
                disableSpacing
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ p: 1 }}>
                  <Stack direction={"row"} alignItems="center">
                    {/* <FavoriteIcon
                    sx={{
                      color:
                        reviewsByProduct.length > 0 ? "secondary.main" : "grey",
                    }}
                  /> */}
                    {reviewsByProduct.length > 0 && (
                      <Stack direciton="column" alignItems={"flex-start"}>
                        <RatingStars
                          ratingValue={Math.round(
                            reviewsByProduct.reduce(
                              (accum, curr) => accum + curr.rating,
                              0
                            ) / reviewsByProduct.length,
                            1
                          )}
                        />

                        <Typography
                          variant="body2"
                          fontWeight={"medium"}
                        >{`${reviewsByProduct.length} reviews`}</Typography>
                      </Stack>
                    )}
                  </Stack>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Divider
              orientation="horizontal"
              variant="middle"
              textAlign="center"
              sx={{ maxWidth: 560, mx: "auto" }}
            >
              <Typography variant="subtitle2">Reviews</Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <List
              sx={{
                maxWidth: 560,
                minWidth: 300,
                my: 3,
                mx: "auto",
                bgcolor: "background.paper",
              }}
            >
              {reviewsByProduct &&
                reviewsByProduct.map((review) => (
                  <Comments review={review} key={review._id} />
                ))}
            </List>
          </Grid>
        </Grid>
      )}
    </>
  );
}
