import "./form-input.styles.jsx";
import { FormInputCSS, FormInputLabel, Group } from "./form-input.styles.jsx";

// type FormInputProps = {
//   label: string;
//   otherProps?: string |
// }

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <FormInputCSS {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
