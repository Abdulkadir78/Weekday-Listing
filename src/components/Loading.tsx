import { Box, CircularProgress } from "@mui/material";

export const Loading: React.FC<{ fullScreen?: boolean }> = ({ fullScreen }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: "40px",
        ...(fullScreen && { height: "100vh" }),
      }}
    >
      <CircularProgress size={32} />
    </Box>
  );
};
