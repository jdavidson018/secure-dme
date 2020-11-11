import React from "react";

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "./Radio";

const FormikRadioGroup = ({
  field,
  form: { touched, errors },
  name,
  options,
  onChange,
  ...props
}) => {
  const fieldName = name || field.name;

  return (
    <React.Fragment>
      <RadioGroup {...field} {...props} name={fieldName} row={props.horizontal === true ? true : false}>
        {options.map(option => (
          <Radio
            value={option.value}
            checked={field.value === option.value}
            onChange={field.onChange}
            label={option.label}
            id={fieldName}
          />
        ))}
      </RadioGroup>

      {touched[fieldName] && errors[fieldName] && (
        <React.Fragment>{errors[fieldName]}</React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FormikRadioGroup;
