import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Stack } from "@mui/material";
import { BiBody } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import { BsBagPlusFill, BsFillBagDashFill } from "react-icons/bs";
import AddToCartBtn from "../../components/AddToCartBtn";

export default function ProductDetailCard({
  product,
  categories,
  body_locations,
  reviews,
  carts,
}) {
  const compareDate = new Date(2023, 1, 10);
  const [quantity, setQuantity] = React.useState(0);

  const reviewsByProduct = reviews.filter(
    (review) => review.productId === product._id
  );

  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 300,
        flex: 1,
        my: 1,
        position: "relative",
      }}
    >
      {product.promotionPrice && (
        <Box
          sx={{
            width: 60,
            height: 30,
            bgcolor: "primary.main",
            position: "absolute",
            top: 120,
            left: 0,
            zIndex: 10,
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="caption" sx={{ lineHeight: "30px" }}>
            {`${Math.round(
              ((product.price - product.promotionPrice) / product.price) * 100
            )}% OFF`}
          </Typography>
        </Box>
      )}
      {new Date(product.arrivalDate) > compareDate && (
        <Box
          sx={{
            width: 40,
            height: 70,
            bgcolor: "primary.main",
            position: "absolute",
            top: 120,
            right: 10,
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
              height: 60,
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" sx={{ lineHeight: 1 }}>
              {product.name}
            </Typography>
          </Box>
        }
        subheader={
          <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
            {/* <Typography variant="caption">{`Product Id: ${product._id}`}</Typography> */}
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
                categories.find((category) => category._id === product.category)
                  .category
              }
            </Typography>
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
            </Typography>
          </Stack>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={product.imageSrc}
        alt={`Id: ${product._id}`}
      />
      <CardContent>
        <Stack direction={"row"} alignItems="center">
          <Typography variant="h6" color="text.secondary" sx={{ mr: 2 }}>
            {`$ ${
              product.promotionPrice ? product.promotionPrice : product.price
            }
                `}
          </Typography>
          {product.promotionPrice && (
            <Typography
              variant="body1"
              sx={{
                textDecoration: "line-through",
                // border: "1px solid red",
                color: "red",
              }}
            >{`$ ${product.price}`}</Typography>
          )}
        </Stack>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton aria-label="add to favorites">
          <Stack direction={"row"} alignItems="center">
            <FavoriteIcon
              sx={{
                color: reviewsByProduct.length > 0 ? "secondary.main" : "grey",
              }}
            />
            {reviewsByProduct.length > 0 && (
              <React.Fragment>
                <Typography
                  variant="body2"
                  fontWeight={"medium"}
                  sx={{ mr: 1 }}
                >
                  {Math.round(
                    reviewsByProduct.reduce(
                      (accum, curr) => accum + curr.rating,
                      0
                    ) / reviewsByProduct.length,
                    1
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={"medium"}
                >{`(${reviewsByProduct.length})`}</Typography>
              </React.Fragment>
            )}
          </Stack>
        </IconButton>

        <Box width={100}>
          <AddToCartBtn
            carts={carts}
            quantity={quantity}
            setQuantity={setQuantity}
            product={product}
          />
        </Box>
      </CardActions>
    </Card>
  );
}
