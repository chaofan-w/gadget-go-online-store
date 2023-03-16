import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";
import OrderDetailDrawer from "./OrderDetailDrawer";
import { Fade, Slide } from "@mui/material";

import {
  getOrdersByCustomerId,
  selectAllOrders,
} from "../../features/orders/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginCustomer } from "../../features/loginCustomer/loginCustomerSlice";
import { style } from "@mui/system";
import Spinner from "../../components/Spinner";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "orderId",
    numeric: false,
    disablePadding: true,
    label: "Order Id",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "products",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "discount",
    numeric: true,
    disablePadding: false,
    label: "Discount",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "detail",
    numeric: false,
    disablePadding: false,
    label: "Details",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all orders",
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           My Orders
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const ordersStatus = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const loginCustomer = useSelector(selectLoginCustomer);
  const [reviewOrderId, setReviewOrderId] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      try {
        if (ordersStatus === "idle" && loginCustomer.length > 0) {
          const response = await getOrdersByCustomerId(loginCustomer[0]._id);
          dispatch(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [dispatch, loginCustomer]);

  // console.log(orders);

  // the filter method is effect directly on source data of each table cell, unrelated to the render output
  // in this case, the order of total, will compare data of item.total, even if the rendering table cell output is a string with dollar sign; or for discount, it will compare data of item.discount but output a string of '##% off'
  //so before return the tablecells, firstly to define the tablesheet data for filter method's source data, i.e., rows below.

  const rows = orders.map((item) => {
    return {
      orderId: item._id,
      date: item.date,
      products: item.products.reduce((accum, curr) => accum + curr.quantity, 0),
      discount: 1 - item.discount,
      // number.toFixed() method converts a number to fixed-point notation with the indicated number of decimalPlaces (rounding the result where necessary) and then returns its value as a string.
      total: Number(
        (
          item.products.reduce(
            (accum, curr) => accum + curr.price * curr.quantity,
            0
          ) * item.discount
        ).toFixed(2)
      ),
      status: item.status,
      detail: (
        <Button variant="text" onClick={() => setReviewOrderId(item._id)}>
          <Typography variant="body2" color={"primary"}>
            review details
          </Typography>
        </Button>
      ),
    };
  });

  // console.log(reviewOrderId);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    // console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = orders.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, orderId) => {
    const selectedIndex = selected.indexOf(orderId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, orderId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (orderId) => selected.indexOf(orderId) !== -1;

  // Avoid a layout jump when reaching the last page with empty orders.
  const emptyRows =
    page > 0 && orders.length > 0
      ? Math.max(0, (1 + page) * rowsPerPage - orders.length)
      : 0;

  const [drawerState, setDrawerState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };
  const anchor = "right";

  return (
    <>
      {ordersStatus === "loading" ? (
        <Spinner />
      ) : (
        <Box
          sx={{
            width: "100%",
            px: 5,
            bgcolor: "primary.light",
            minHeight: "90vh",
            pt: "2vh",
            pb: "2vh",
          }}
        >
          {rows && rows.length > 0 ? (
            <>
              <Paper sx={{ width: "100%", mb: 2, pl: 4, py: 2 }}>
                <Typography variant="h5">My Orders</Typography>
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? "small" : "medium"}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}
                    />
                    <TableBody>
                      {stableSort(rows, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => {
                          const isItemSelected = isSelected(item.orderId);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              onClick={(event) =>
                                handleClick(event, item.orderId)
                              }
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={item.orderId}
                              selected={isItemSelected}
                            >
                              {/* <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                />
                              </TableCell> */}
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="order"
                                padding="none"
                              >
                                {item.orderId}
                              </TableCell>
                              <TableCell align="right">
                                {new Date(item.date).toDateString()}
                                {/* {new Date(item.date).toDateString()} */}
                              </TableCell>
                              <TableCell align="right">
                                {item.products}
                                {/* {item.products.reduce(
                              (accum, curr) => accum + curr.quantity,
                              0
                            )} */}
                              </TableCell>
                              <TableCell align="right">
                                {item.discount === 0.0
                                  ? "N/A"
                                  : `${(item.discount * 100).toFixed()}% OFF`}
                                {/* {(1 - item.discount).toFixed(2)} */}
                              </TableCell>
                              <TableCell align="right">
                                {`$${item.total}`}
                                {/* {(
                              item.products.reduce(
                                (accum, curr) =>
                                  accum + curr.price * curr.quantity,
                                0
                              ) * item.discount
                            ).toFixed(2)} */}
                              </TableCell>
                              <TableCell align="left">{item.status}</TableCell>
                              <TableCell align="left">{item.detail}</TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
              <FormControlLabel
                control={
                  <Switch checked={dense} onChange={handleChangeDense} />
                }
                label="Dense padding"
              />
            </>
          ) : (
            <Typography>No Orders</Typography>
          )}
          {reviewOrderId && (
            <SwipeableDrawer
              anchor={anchor}
              open={reviewOrderId ? true : false}
              onClose={() => setReviewOrderId(null)}
              onOpen={toggleDrawer(anchor, true)}
            >
              <Box
                sx={{
                  minWidth: 360,
                  width: "40vw",
                  height: "100vh",
                  p: 3,
                }}
              >
                <OrderDetailDrawer
                  order={orders.find((i) => i._id === reviewOrderId) || {}}
                  orderId={reviewOrderId}
                  loginCustomer={loginCustomer}
                />
              </Box>
            </SwipeableDrawer>
          )}
        </Box>
      )}
    </>
  );
}
