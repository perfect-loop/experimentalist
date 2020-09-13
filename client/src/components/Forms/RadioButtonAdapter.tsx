import React from "react";
import Radio from "@material-ui/core/Radio";
import { FieldMetaState } from "react-final-form";

const RadioWrapper = ({
  input: { checked, value, name, onChange, ...restInput },
  meta,
  ...rest
}: {
  input: any;
  meta: FieldMetaState<any>;
}) => <Radio {...rest} name={name} inputProps={restInput} onChange={onChange} checked={checked} value={value} />;

export default RadioWrapper;
