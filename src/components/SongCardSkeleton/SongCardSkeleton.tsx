import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

const SongCardSkeleton = () => {
  const matchesLarge = useMediaQuery("(min-width: 2048px)");
  const matchesBig = useMediaQuery("(min-width: 768px)");

  let size = 100;
  let fontSize = "1.2rem";
  if (matchesBig) {
    size = 150;
  } else if (matchesLarge) {
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
        sx={{ fontSize, bgcolor: "#272222" }}
      />
      <Skeleton
        animation="pulse"
        variant="text"
        sx={{ fontSize, bgcolor: "#272222" }}
      />
      <Skeleton
        animation="pulse"
        variant="text"
        sx={{ fontSize, bgcolor: "#272222" }}
      />
      <Box sx={{ marginBottom: "10px" }} />
    </Stack>
  );
};

export default SongCardSkeleton;
