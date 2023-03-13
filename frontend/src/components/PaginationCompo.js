import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function PaginationCompo() {
  const navigate = useNavigate();
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const handleChange = (e, value) => {
    setPage(value);
    navigate(`/page/${page}`);
  };
  console.log(page);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/products");
      const productsData = await response.json();
      if (productsData.status === 200) {
        setTotalProducts(productsData.data.length);
      }
    };
    fetchData();
  }, []);

  return (
    <Stack spacing={2} sx={{ width: "60%", maxWidth: 500, mx: "auto" }}>
      <Pagination
        count={Math.ceil(totalProducts / 10)}
        showFirstButton
        showLastButton
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/${item.page === 1 ? "" : `page/${item.page}`}`}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
