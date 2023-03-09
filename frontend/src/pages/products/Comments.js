import { Typography } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectAllCustomers } from "../../features/customers/customersSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const Comments = ({ review }) => {
  const [customer, setCustomer] = React.useState(null);
  const customerId = review.customerId;
  // console.log(customerId);
  // console.log(customer);

  React.useEffect(() => {
    const fetchCustomerById = async () => {
      try {
        if (customerId) {
          await fetch(`/api/customers/${customerId}`)
            .then((res) => res.json())
            .then((result) => {
              if (result.status === 200) {
                setCustomer(result.data[0]);
              } else {
                console.log(result.message);
              }
            });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomerById();
  }, []);

  return (
    <>
      {customer && (
        <>
          <ListItem alignItems="flex-start" sx={{ px: 1, py: 0 }}>
            <ListItemAvatar>
              <Avatar
                alt={customer.firstName + " " + customer.lastName}
                src="https://placebeard.it/30x30"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1">
                  {customer.firstName + " " + customer.lastName}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {new Date(review.date).toDateString()} - {review.text}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </>
      )}
    </>
  );
};

export default Comments;
