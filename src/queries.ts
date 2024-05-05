export interface Job {
  companyName: string;
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp: number;
  maxJdSalary: number;
  minExp: number;
  minJdSalary: number | null;
  salaryCurrencyCode: string;
}

interface GetJobsResponse {
  totalCount: number;
  jdList: Job[];
}

export const getJobs: (
  pageNo: number,
  perPage?: number
) => Promise<GetJobsResponse | void> = async (pageNo = 1, perPage = 12) => {
  const offset = (pageNo - 1) * perPage;

  try {
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ limit: perPage, offset }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<GetJobsResponse>;
  } catch (error) {
    console.log(error);
  }
};
