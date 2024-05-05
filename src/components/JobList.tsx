import { Box, Typography } from "@mui/material";

import { Job } from "../queries";
import { JobCard } from "./JobCard";

interface JobListProps {
  jobs: Job[];
  isLoading: boolean;
}

export const JobList: React.FC<JobListProps> = ({ jobs = [], isLoading }) => {
  return (
    <>
      {jobs.length === 0 && !isLoading && (
        <Typography variant="b3" sx={{ color: "text.secondary", my: "40px" }}>
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
        {jobs.map((job, i) => {
          return <JobCard key={job.jdUid + i} job={job} />;
        })}
      </Box>
    </>
  );
};
