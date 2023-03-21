import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Pagination, PaginationItem } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function PaginationCompo({ filter }) {
  const [page, setPage] = React.useState(1);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const handleChange = async (e, value) => {
    console.log(value);
    await setPage(value);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const filterKey = filter && Object.keys(filter)[0];
      const filterValue = filter && filter[filterKey];
      const response = await fetch(
        `/api/productsPage/${filterKey}/${filterValue}`
      );
      const productsData = await response.json();
      if (productsData.status === 200) {
        setTotalProducts(productsData.data.length);
      }
    };
    fetchData();
  }, [filter]);

  console.log(page);

  return (
    <Stack spacing={2} sx={{ width: "60%", maxWidth: 500, mx: "auto", my: 4 }}>
      <Pagination
        count={Math.ceil(totalProducts / 10)}
        showFirstButton
        showLastButton
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/page/${item.page}`}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
