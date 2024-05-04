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

const hasExtraCharacters = true;

export const JobCard = () => {
  return (
    <>
      <Card
        sx={{
          borderRadius: "12px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.08)",
        }}
      >
        <CardContent>
          <Chip
            label="⏳ Posted 4 days ago"
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
                src="/vite.svg"
                alt="company logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box>
              <Typography variant="b2" sx={{ color: "text.disabled" }}>
                Fampay
              </Typography>

              <Typography variant="s6">Backend Engineer</Typography>
              <Typography variant="b5" mt="4px">
                Bangalore | Exp: 5-5 years
              </Typography>
            </Box>
          </Box>

          <Typography variant="b2" sx={{ mt: "8px", color: "text.secondary" }}>
            Estimated Salary: ₹30 - 60 LPA ✅
          </Typography>

          <>
            <Typography variant="s5" sx={{ mt: "8px" }}>
              About Company:
            </Typography>

            <Typography variant="b1">About us</Typography>

            <Box sx={{ position: "relative" }}>
              <Box sx={{ maxHeight: 250, overflow: "hidden" }}>
                <Typography variant="b3">
                  FamPay is building India&apos;s first neo-bank exclusively
                  teens. FamPay helps teens make their own online and offline
                  payments through UPI, FamPay App and FamCard. Our aim is to
                  make banking cool for teens and to help them learn the value
                  of money, savings and spending wisely. We are on a mission to
                  raise a new, financially aware generation, and drive 250
                  Million+ Indian teenagers to kickstart their financial journey
                  super early in their life.
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
                    href="#"
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

          <Box mt="24px">
            <Typography variant="b2" sx={{ color: "text.disabled" }}>
              Skills
            </Typography>

            <Box
              sx={{ mt: "4px", display: "flex", gap: "4px", flexWrap: "wrap" }}
            >
              <Chip
                label="Senior Engineer"
                sx={{
                  fontSize: 10,
                  height: 16,
                  color: "primary.main",
                  backgroundColor: "secondary.light",
                }}
              />
              <Chip
                label="Founding Engineer"
                sx={{
                  fontSize: 10,
                  height: 16,
                  color: "primary.main",
                  backgroundColor: "secondary.light",
                }}
              />
              <Chip
                label="Typescript"
                sx={{
                  fontSize: 10,
                  height: 16,
                  color: "primary.main",
                  backgroundColor: "secondary.light",
                }}
              />
            </Box>
          </Box>

          <Box mt="12px">
            <Typography variant="b2" sx={{ color: "text.disabled" }}>
              Minimum Experience
            </Typography>

            <Typography variant="b3">5 years</Typography>
          </Box>

          <Box mt="16px">
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "100%" }}
            >
              ⚡ Easy Apply
            </Button>

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
