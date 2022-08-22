import "./form-input.styles";
import { InputHTMLAttributes, FC } from "react";
import { FormInputCSS, FormInputLabel, Group } from "./form-input.styles";

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <FormInputCSS {...otherProps} />
      {label && (
        <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === "string" && otherProps.value.length)}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
