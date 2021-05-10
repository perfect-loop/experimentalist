import React from "react";
import { FieldMetaState } from "react-final-form";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { dateTimePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";

const DateTimePickerAdaptor = ({ input, meta, ...rest }: { input: any; meta: FieldMetaState<any> }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        {...input}
        {...rest}
        format="yyyy/MM/dd HH:mm"
        ampm={false}
        disablePast
        onChange={(date: Date, value: string) => {
          input.onChange(date);
        }}
        helperText={meta.touched ? meta.error : ""}
        clearable={true}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePickerAdaptor;
