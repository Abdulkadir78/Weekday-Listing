import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  ThemeProvider,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";

import { theme } from "./theme";
import { Loading } from "./components/Loading";
import { JobCard } from "./components/JobCard";
import { FilterKey, Filters } from "./components/Filters";
import { useIntersection } from "./hooks/useIntersection";
import { Job, getJobs } from "./queries";
// import { jobs as jobsData } from "./data";

const PER_PAGE = 12;

const App = () => {
  // const [jobs, setJobs] = useState<Job[]>(jobsData); // using static data for development

  const [jobs, setJobs] = useState<Job[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<
    Partial<Record<FilterKey, (string | number)[]>>
  >({});

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

  const updateFilter = (key: FilterKey, value: (string | number)[]) => {
    setFilters((prevFilters) => {
      return { ...prevFilters, [key]: value };
    });
  };

  // memo is used so we don't filter jobs on every render, only when jobs or filters change
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      return Object.entries(filters).every(([key, value]) => {
        // filter only if there filters applied, otherwise return all jobs
        if (value.length) {
          if (key === "role") {
            return value.includes(job.jobRole);
          }

          if (key === "minExp" && job.minExp) {
            return value.includes(job.minExp);
          }

          if (key === "remoteOnSite") {
            // since this field in not present in the job data, we need to check manually for both values
            if (value.includes("Remote") && value.includes("On-site")) {
              return true;
            }

            if (value.includes("Remote")) {
              return job.location === "remote";
            } else {
              return job.location !== "remote";
            }
          }

          if (key === "location") {
            return value.includes(job.location);
          }

          if (key === "minPay" && job.minJdSalary) {
            return value.includes(job.minJdSalary);
          }
        }

        return true;
      });
    });
  }, [jobs, filters]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container maxWidth="xl" sx={{ my: "40px" }}>
          <Filters
            jobs={jobs}
            selectedFilters={filters}
            updateFilter={updateFilter}
          />

          {filteredJobs.length === 0 && !isLoading && (
            <Typography
              variant="b3"
              sx={{ color: "text.secondary", my: "40px" }}
            >
              There are no jobs matching the criteria
            </Typography>
          )}

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
            {filteredJobs.map((job, i) => {
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
