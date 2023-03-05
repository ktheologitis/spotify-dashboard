import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

const SongCardSkeleton = () => {
  const matchesDesktop = useMediaQuery("(min-width: 992px)");
  const matchesTablet = useMediaQuery(
    "(min-width: 768px, max-width: 991px)"
  );

  let size = 100;
  if (matchesTablet) {
    size = 150;
  } else if (matchesDesktop) {
    size = 180;
  }

  return (
    <Stack spacing={1}>
      <Skeleton
        animation="pulse"
        variant="rectangular"
        width={size}
        height={size}
        sx={{ bgcolor: "#272222" }}
      />
      <Skeleton
        animation="pulse"
        variant="text"
        sx={{ fontSize: "1.6rem", bgcolor: "#272222" }}
      />
      <Skeleton
        animation="pulse"
        variant="text"
        sx={{ fontSize: "1.6rem", bgcolor: "#272222" }}
      />
      <Skeleton
        animation="pulse"
        variant="text"
        sx={{ fontSize: "1.6rem", bgcolor: "#272222" }}
      />
      <Box sx={{ marginBottom: "10px" }} />
    </Stack>
  );
};

export default SongCardSkeleton;
