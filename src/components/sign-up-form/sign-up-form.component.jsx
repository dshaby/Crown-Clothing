import "./sign-up-form.styles.scss";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

// export type DefaultFormFields = {
//   displayName: string;
//   email: string;
//   password: string
// }

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      // const { user } = await createAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      // createUserDocFromAuth(user, { displayName });
      dispatch(signUpStart(email, password, displayName)); //reduxSaga
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Your email already exists. Try logging in instead. ");
      } else {
        console.log("error creating user" + err.message);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2 className="title">Don't have an account?</h2>
      <span>Sign up with an email and password</span>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <FormInput
          label="Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
