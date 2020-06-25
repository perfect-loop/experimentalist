import React from "react";
import { SyntheticEvent } from "react";
import { Select, InputLabel, MenuItem } from "@material-ui/core";

// <Select> element, to be implemmented with react-final-form
const SelectAdapter = ({
  input,
  meta,
  label,
  options,
  ...rest
}: {
  input: any;
  label: any;
  options: any;
  meta: any;
}) => {
  return (
    <>
      <InputLabel id={label + "-label"}>{label}</InputLabel>
      <Select
        {...input}
        {...rest}
        labelId={label + "-label"}
        id={label}
        onChange={(event: SyntheticEvent) => {
          const target = event.target as HTMLSelectElement;
          const value = target.value;
          console.log(`value is ${value}`);
          input.onChange(value);
        }}
        errorText={meta.touched ? meta.error : ""}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option: any) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectAdapter;
