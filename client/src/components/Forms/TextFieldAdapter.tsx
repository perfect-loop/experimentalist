import React from "react";
import { SyntheticEvent } from "react";
import { TextField } from "@material-ui/core";
import { FieldMetaState } from "react-final-form";

const TextFieldAdapter = ({ input, meta, ...rest }: { input: any; meta: FieldMetaState<any> }) => {
  return (
    <TextField
      {...input}
      {...rest}
      onChange={(event: SyntheticEvent) => {
        const target = event.target as HTMLTextAreaElement;
        const value = target.value;
        console.log(`value is ${value}`);
        input.onChange(value);
      }}
      errorText={meta.touched ? meta.error : ""}
    />
  );
};

export default TextFieldAdapter;
