import { Job } from "./types";

export const jobs: Job[] = [
  {
    id: "1",
    datePosted: "2021-10-01",
    company: {
      name: "Fampay",
      description:
        "FamPay is building India's first neo-bank exclusively teens. FamPay helps teens make their own online and offline payments through UPI, FamPay App and FamCard. Our aim is to make banking cool for teens and to help them learn the value of money, savings and spending wisely. We are on a mission to raise a new, financially aware generation, and drive 250 Million+ Indian teenagers to kickstart their financial journey super early in their life.",
      logo: "/vite.svg",
    },
    title: "Backend Engineer",
    location: "Bangalore",
    skills: ["Senior Engineer", "Founding Engineer", "Typescript"],
    experience: { min: 5, max: 5 },
    estimatedSalary: { min: 30, max: 60 },
    viewLink: "#",
    applyLink: "#",
  },
  {
    id: "2",
    datePosted: "2021-10-02",
    company: {
      name: "FlexWash Technologies",
      description:
        "Flex Wash is an operating system for the car wash industry. Our solutions help owners manage their operations and grow revenue. Our POS has a built-in CRM, allowing car washes to take advantage of their customer transaction history in order to funnel customers into subscriptions and higher margin wash packages..",
      logo: "/vite.svg",
    },
    title: "Frontend Engineer",
    location: "India",
    skills: [],
    experience: { min: 2 },
    estimatedSalary: { min: 20, max: 40 },
    viewLink: "#",
    applyLink: "#",
  },
];
