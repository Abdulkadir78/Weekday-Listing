import { useMemo } from "react";
import {
  Autocomplete,
  AutocompleteRenderGetTagProps,
  Box,
  Chip,
  TextField,
  capitalize,
} from "@mui/material";
import { Job } from "../queries";

interface FiltersProps {
  jobs: Job[];
  selectedFilters: Partial<Record<FilterKey, (string | number)[]>>;
  updateFilter: (key: FilterKey, value: (string | number)[]) => void;
  isLoading: boolean;
}

export type FilterKey =
  | "role"
  | "minExp"
  | "remoteOnSite"
  | "location"
  | "minPay";

export const Filters: React.FC<FiltersProps> = ({
  jobs,
  selectedFilters,
  updateFilter,
  isLoading,
}) => {
  // get filter options from jobs data
  const filterOptions = useMemo(() => {
    const roleOptions: string[] = [];
    const minExpOptions: number[] = [];
    const minPayOptions: number[] = [];
    const remoteOnSiteOptions: string[] = ["Remote", "On-site"];
    const locationOptions: string[] = [];

    jobs?.forEach((job) => {
      if (job.jobRole && !roleOptions.includes(job.jobRole)) {
        roleOptions.push(job.jobRole);
      }

      if (job.minExp && !minExpOptions.includes(job.minExp)) {
        minExpOptions.push(job.minExp);
      }

      if (
        job.location &&
        job.location !== "remote" &&
        !locationOptions.includes(job.location)
      ) {
        locationOptions.push(job.location);
      }

      if (job.minJdSalary && !minPayOptions.includes(job.minJdSalary)) {
        minPayOptions.push(job.minJdSalary);
      }
    });

    // sort in ascending order
    minExpOptions.sort((a, b) => a - b);
    minPayOptions.sort((a, b) => a - b);

    return {
      roleOptions,
      minExpOptions,
      remoteOnSiteOptions,
      locationOptions,
      minPayOptions,
    };
  }, [jobs]);

  return (
    <Box sx={{ my: "40px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Autocomplete
        multiple
        filterSelectedOptions
        limitTags={1}
        loading={isLoading}
        size="small"
        id="roles"
        sx={{ width: 240 }}
        options={filterOptions.roleOptions || []}
        getOptionLabel={(option) => capitalize(String(option))}
        renderInput={(params) => (
          <TextField {...params} label="Roles" placeholder="Select Roles" />
        )}
        renderTags={renderDropdownChip}
        value={selectedFilters.role || []}
        onChange={(_, value) => {
          updateFilter("role", value);
        }}
      />

      <Autocomplete
        multiple
        filterSelectedOptions
        limitTags={1}
        loading={isLoading}
        size="small"
        id="experience"
        sx={{ width: 200 }}
        options={filterOptions.minExpOptions || []}
        getOptionLabel={(option) => String(option)}
        renderInput={(params) => (
          <TextField {...params} label="Experience" placeholder="Experience" />
        )}
        renderTags={renderDropdownChip}
        value={selectedFilters.minExp || []}
        onChange={(_, value) => {
          updateFilter("minExp", value);
        }}
      />

      <Autocomplete
        multiple
        filterSelectedOptions
        limitTags={1}
        loading={isLoading}
        size="small"
        id="remote-onsite"
        sx={{ width: 240 }}
        options={filterOptions.remoteOnSiteOptions || []}
        getOptionLabel={(option) => String(option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Remote/On-Site"
            placeholder="Remote/On-Site"
          />
        )}
        renderTags={renderDropdownChip}
        value={selectedFilters.remoteOnSite || []}
        onChange={(_, value) => {
          updateFilter("remoteOnSite", value);
        }}
      />

      <Autocomplete
        multiple
        filterSelectedOptions
        limitTags={1}
        loading={isLoading}
        size="small"
        id="location"
        sx={{ width: 240 }}
        options={filterOptions.locationOptions || []}
        getOptionLabel={(option) => capitalize(String(option))}
        renderInput={(params) => (
          <TextField {...params} label="Location" placeholder="Location" />
        )}
        renderTags={renderDropdownChip}
        value={selectedFilters.location || []}
        onChange={(_, value) => {
          updateFilter("location", value);
        }}
      />

      <Autocomplete
        multiple
        filterSelectedOptions
        limitTags={1}
        loading={isLoading}
        size="small"
        id="min-pay"
        sx={{ width: 200 }}
        options={filterOptions.minPayOptions || []}
        getOptionLabel={(option) => String(option) + "L"}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Minimum Base Pay"
            placeholder="Min Base Pay"
          />
        )}
        renderTags={renderDropdownChip}
        value={selectedFilters.minPay || []}
        onChange={(_, value) => {
          updateFilter("minPay", value);
        }}
      />
    </Box>
  );
};

const renderDropdownChip = (
  tagValue: (string | number)[],
  getTagProps: AutocompleteRenderGetTagProps
) => {
  return tagValue.map((option, index) => (
    <Chip
      {...getTagProps({ index })}
      key={option}
      label={option}
      sx={{
        borderRadius: 0,
        "& .MuiSvgIcon-root": { fontSize: 16 },
      }}
    />
  ));
};
