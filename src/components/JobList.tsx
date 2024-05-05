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
        <Box sx={{ textAlign: "center", mt: "80px" }}>
          <img
            src="/images/no-data.png"
            alt="no data"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />

          <Typography variant="s5" sx={{ mt: "24px" }}>
            No Jobs available for this category at the moment
          </Typography>
        </Box>
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
