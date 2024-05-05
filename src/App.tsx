import { useEffect, useRef, useState } from "react";
import { Box, ThemeProvider, Container, CssBaseline } from "@mui/material";

import { theme } from "./theme";
import { Loading } from "./components/Loading";
import { JobCard } from "./components/JobCard";
import { useIntersection } from "./hooks/useIntersection";
import { Job, getJobs } from "./queries";

const PER_PAGE = 12;

const App = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // using ref to store the total pages, so setting is does not trigger a re-render
  const totalPagesRef = useRef(0);

  // This will help us determine is we have reached the end of the list, to implement infinite scrolling
  const listEndRef = useRef<HTMLDivElement>(null);

  // 20% root margin to trigger the intersection observer callback just before the user reaches the end of the list
  const { isIntersecting } = useIntersection(listEndRef, { rootMargin: "20%" });

  // increment the page number when we reach the end of the list
  useEffect(() => {
    if (isIntersecting) {
      setIsLoading(true);

      setPageNo((prevPageNo) => {
        // increment the page number only if we haven't reached the last page yet
        if (prevPageNo < totalPagesRef.current) {
          return prevPageNo + 1;
        }

        return prevPageNo;
      });
    }
  }, [isIntersecting]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs(pageNo, PER_PAGE);
      setJobs((prevJobs) => [...prevJobs, ...(data?.jdList || [])]);

      // set total pages based on total count of jobs and PER_PAGE, if not already set
      if (totalPagesRef.current === 0) {
        totalPagesRef.current = Math.ceil((data?.totalCount || 1) / PER_PAGE);
      }

      setIsLoading(false);
    };

    fetchJobs();
  }, [pageNo]);

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
            {jobs.map((job, i) => {
              return <JobCard key={job.jdUid + i} job={job} />;
            })}
          </Box>

          <Box ref={listEndRef} />

          {isLoading && <Loading fullScreen={pageNo === 1} />}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
