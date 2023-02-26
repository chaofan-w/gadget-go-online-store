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

export default function ProductDetailCard({
  product,
  categories,
  body_locations,
}) {
  const compareDate = new Date(2023, 1, 10);
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
              // border: "1px solid red",
            }}
          >
            <Typography variant="h6" sx={{ lineHeight: 1 }}>
              {product.name}
            </Typography>
          </Box>
        }
        subheader={
          <Stack direction="row" spacing={2}>
            {/* <Typography variant="caption">{`Product Id: ${product._id}`}</Typography> */}
            <Typography variant="caption">
              {`Category: ${
                categories.find((category) => category._id === product.category)
                  .category
              }`}
            </Typography>
            <Typography variant="caption">
              {`Body Location: ${
                body_locations.find(
                  (location) => location._id === product.body_location
                ).body_location
              }`}
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
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
