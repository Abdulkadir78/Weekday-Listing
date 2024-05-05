import { useEffect, useMemo, useRef, useState } from "react";
import { Box, ThemeProvider, Container, CssBaseline } from "@mui/material";

import { theme } from "./theme";
import { Loading } from "./components/Loading";
import { FilterKey, Filters } from "./components/Filters";
import { useIntersection } from "./hooks/useIntersection";
import { Job, getJobs } from "./queries";
import { JobList } from "./components/JobList";
import { debounce } from "./utils";
// import { jobs as jobsData } from "./data";

const PER_PAGE = 12;

const App = () => {
  /* static data for development */
  // const [jobs, setJobs] = useState<Job[]>(jobsData);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<
    Partial<Record<FilterKey, (string | number)[]>>
  >({});

  const [searchTerm, setSearchTerm] = useState("");

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

  const updateSearchTerm = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, 500);

  // memo is used so we don't filter jobs on every render, only when jobs or filters change
  const filteredJobs = useMemo(() => {
    let filteredJobs = jobs.filter((job) => {
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

    if (searchTerm) {
      filteredJobs = filteredJobs.filter((job) => {
        return job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return filteredJobs;
  }, [jobs, filters, searchTerm]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          sx={{
            p: "40px 24px 24px 24px",
            position: "sticky",
            top: 0,
            backgroundColor: "#FFFFFF",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: { xs: "16px", sm: "8px" },
              flexWrap: "wrap",
            }}
          >
            <Filters
              jobs={jobs}
              selectedFilters={filters}
              updateFilter={updateFilter}
              isLoading={isLoading}
              updateSearchTerm={updateSearchTerm}
            />
          </Box>
        </Box>

        <Container maxWidth="xl" sx={{ mt: "10px", mb: "40px" }}>
          <JobList jobs={filteredJobs} isLoading={isLoading} />

          <Box ref={listEndRef} />

          {isLoading && <Loading fullScreen={pageNo === 1} />}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
