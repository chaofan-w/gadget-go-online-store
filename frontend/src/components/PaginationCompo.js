import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Pagination, PaginationItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllProductsFilter,
  filterUpdated,
  filterReset,
} from "../features/productsFilter/productsFilterSlice";
import { fetchProducts } from "../features/products/productsSlice";

export default function PaginationCompo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filter = useSelector(selectAllProductsFilter);

  const [totalProducts, setTotalProducts] = React.useState(0);
  const handleChange = async (e, value) => {
    await dispatch(filterUpdated({ ...filter, currPage: value }));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const filterKey = filter.filterKey;
      const filterValue = filter.filterValue;
      const response = await fetch(
        `/api/productsPage/${filterKey}/${filterValue}`
      );
      const productsData = await response.json();
      if (productsData.status === 200) {
        setTotalProducts(productsData.data.length);
      }
    };
    fetchData();
  }, [filter, dispatch]);

  return (
    <Stack spacing={2} sx={{ width: "60%", maxWidth: 500, mx: "auto", my: 4 }}>
      <Pagination
        count={Math.ceil(totalProducts / 10)}
        showFirstButton
        showLastButton
        page={filter.currPage}
        onChange={handleChange}
        renderItem={(item) => <PaginationItem {...item} />}
      />
    </Stack>
  );
}
