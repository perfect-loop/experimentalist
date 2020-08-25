import React from "react";
import { SyntheticEvent } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FieldMetaState } from "react-final-form";

const CheckBoxAdapter = ({ input, meta, label, ...rest }: { input: any; meta: FieldMetaState<any>; label: string }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          {...rest}
          color="default"
          checked={!!input.value}
          onChange={(event: SyntheticEvent, isInputChecked) => {
            input.onChange(isInputChecked);
          }}
        />
      }
      label={label}
    />
  );
};

export default CheckBoxAdapter;
