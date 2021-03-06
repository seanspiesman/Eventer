import React from "react";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  input,
  width,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={
          input.value
            ? Object.prototype.toString.call(input.value) !== "[object Date]"
              ? input.value.toDate()
              : input.value
            : null
        }
        onChange={input.onChange}
        onBlur={(e, val) => input.onBlur(val)}
        onChangeRaw={(events) => events.preventDefault()}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
