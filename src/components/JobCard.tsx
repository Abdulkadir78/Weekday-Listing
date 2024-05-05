import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Link,
  Typography,
} from "@mui/material";

import { Job } from "../queries";

const MAX_CHARS = 440;

export const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  // to show the blur effect if the description is more than MAX_CHARS characters
  const hasExtraCharacters = job.jobDetailsFromCompany?.length > MAX_CHARS;

  return (
    <>
      <Card
        sx={{
          borderRadius: "12px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.08)",
          ":hover": { transform: "scale(1.01)" },
          transition: "transform .3s ease",
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Chip
            /*
              ***** Date of job posting is not provided in the API response,
              otherwise we could use dayjs (2Kb library) to show the relative time *****
            */

            label={"⏳ " + "4 days ago"}
            // label={"⏳ " + dayjs(job.datePosted)?.fromNow()}
            variant="outlined"
            sx={{
              height: 20,
              fontSize: 10,
              fontWeight: 400,
              py: 1.5,
              color: "text.secondary",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.08)",
              borderWidth: "0.5px",
            }}
          />

          <Box sx={{ mt: "16px", display: "flex", gap: "10px" }}>
            <Box sx={{ width: 32, height: 32 }}>
              <img
                src={job.logoUrl}
                alt="company logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box>
              <Link href={job.jdLink} underline="hover">
                <Typography variant="b2" sx={{ color: "text.disabled" }}>
                  {job.companyName}
                </Typography>
              </Link>

              <Typography variant="s6" textTransform="capitalize">
                {job.jobRole}
              </Typography>

              <Typography variant="b5" mt="4px" textTransform="capitalize">
                {job.location}

                {job.minExp &&
                  " | Exp: " +
                    job.minExp +
                    (job.maxExp && "-" + job.maxExp) +
                    " years"}
              </Typography>
            </Box>
          </Box>

          {/* ***** LPA is used because salaries are provided as 2 digits ***** */}
          <Typography variant="b2" sx={{ mt: "8px", color: "text.secondary" }}>
            Estimated Salary: {job.salaryCurrencyCode} {job.minJdSalary}{" "}
            {job.maxJdSalary && job.minJdSalary && "-"} {job.maxJdSalary} LPA ✅
          </Typography>

          <>
            <Typography variant="s5" sx={{ mt: "8px" }}>
              About Company:
            </Typography>

            <Typography variant="b1">About us</Typography>

            <Box sx={{ position: "relative" }}>
              {/* <Box sx={{ maxHeight: 250, overflow: "hidden" }}> */}
              <Box sx={{ maxHeight: 250, overflow: "hidden" }}>
                <Typography variant="b3">
                  {job.jobDetailsFromCompany}
                </Typography>
              </Box>

              {hasExtraCharacters && (
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      "&:before": {
                        content: "''",
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 150,
                        background:
                          "linear-gradient(180deg, rgba(139,167,32,0) 0%, rgba(255,255,255,1) 100%)",
                      },
                    }}
                  />

                  <Link
                    href={job.jdLink}
                    color="primary"
                    variant="b3"
                    underline="none"
                    sx={{
                      textAlign: "center",
                      mt: "4px",
                      position: "absolute",
                      bottom: -4,
                      width: "100%",
                    }}
                  >
                    View Job
                  </Link>
                </Box>
              )}
            </Box>
          </>

          {/* ***** Required skills were not provided in the API response, otherwise they would be shown as chips ***** */}

          {/* {!!job.skills?.length && (
            <Box mt="24px">
              <Typography variant="b2" sx={{ color: "text.disabled" }}>
                Skills
              </Typography>

              <Box
                sx={{
                  mt: "4px",
                  display: "flex",
                  gap: "4px",
                  flexWrap: "wrap",
                }}
              >
                {job.skills.map((skill) => {
                  return (
                    <Chip
                      key={skill}
                      label={skill}
                      sx={{
                        fontSize: 10,
                        height: 16,
                        color: "primary.main",
                        backgroundColor: "secondary.light",
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          )} */}

          {job.minExp && (
            <Box mt="12px">
              <Typography variant="b2" sx={{ color: "text.disabled" }}>
                Minimum Experience
              </Typography>

              <Typography variant="b3">
                {job.minExp} {job.minExp > 1 ? "years" : "year"}
              </Typography>
            </Box>
          )}

          <Box mt="auto">
            <a href={job.jdLink}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: "100%", mt: "16px" }}
              >
                ⚡ Easy Apply
              </Button>
            </a>

            <Button
              variant="contained"
              sx={{ mt: "10px", width: "100%", fontWeight: 400, fontSize: 14 }}
            >
              <Avatar
                alt="user 1"
                src="https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group.png"
                sx={{ width: 30, height: 30, mr: "2px" }}
              />
              <Avatar
                alt="user 2"
                src="https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group(1).png"
                sx={{ width: 30, height: 30, mr: "8px" }}
              />
              Unlock referral Asks
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
