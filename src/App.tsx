import CssBaseline from "@mui/material/CssBaseline";
import { Box, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";

import { theme } from "./theme";
import { JobCard } from "./components/JobCard";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="xl">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: "32px",
            }}
          >
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
